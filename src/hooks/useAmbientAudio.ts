import { useCallback, useEffect, useSyncExternalStore } from 'react';
import { AMBIENT_FADE_MS, AMBIENT_STORAGE_KEY, AMBIENT_VOLUME, ambientTrack } from '@data/audio';

// ─────────────────────────────────────────────────────────────────────────────
// Ambientna hudba - jeden zdielany prehravac na cely web.
//
// Stav zije mimo Reactu (modulovy singleton), takze prechod medzi / a /:slug
// hudbu nepreusi a nerestartuje.
//
// Autoplay so zvukom je v prehliadacoch zakazany, kym pouzivatel nespravi
// nejake gesto. Preto: skusime hrat hned ako sa da, a ak nas prehliadac
// odmietne, pockame na prve kliknutie / dotyk / klavesu / scroll a skusime
// znova. Ziadne dalsie pokusy - ak host hudbu vypne, respektujeme to natrvalo.
// ─────────────────────────────────────────────────────────────────────────────

type Listener = (playing: boolean) => void;

const listeners = new Set<Listener>();
const GESTURES = ['pointerdown', 'keydown', 'touchstart', 'wheel', 'scroll'] as const;

let el: HTMLAudioElement | null = null;
let playing = false;
let armed = false;
let booted = false;
let fadeFrame = 0;
// Poistka: ked stopa chyba alebo sa neda dekodovat, play() padne pri kazdom
// gestte. Po troch neuspechoch to vzdame, nech neblokujeme kazdy klik.
let failures = 0;
const MAX_FAILURES = 3;

function emit(): void {
  listeners.forEach((fn) => fn(playing));
}

function readPreference(): 'on' | 'off' | null {
  try {
    const value = window.localStorage.getItem(AMBIENT_STORAGE_KEY);
    return value === 'on' || value === 'off' ? value : null;
  } catch {
    // Private mode / zablokovane site data - hudba proste nebude mat pamat.
    return null;
  }
}

function writePreference(value: 'on' | 'off'): void {
  try {
    window.localStorage.setItem(AMBIENT_STORAGE_KEY, value);
  } catch {
    /* nevadi */
  }
}

function ensureElement(): HTMLAudioElement {
  if (el) return el;
  const audio = new Audio();
  audio.src = ambientTrack;
  audio.loop = true;
  audio.preload = 'auto';
  audio.volume = 0;
  // iOS Safari: bez toho sa stopa na niektorych zariadeniach nezacne bufferovat.
  audio.setAttribute('playsinline', '');
  // Host moze hudbu zastavit aj cez systemove ovladanie media - drzime stav.
  audio.addEventListener('play', () => {
    playing = true;
    emit();
  });
  audio.addEventListener('pause', () => {
    if (document.hidden) return; // pauza pri prepnuti tabu nie je volba hosta
    playing = false;
    emit();
  });
  el = audio;
  return audio;
}

function fadeTo(target: number, ms: number, done?: () => void): void {
  const audio = el;
  if (!audio) return;
  cancelAnimationFrame(fadeFrame);
  const from = audio.volume;
  const delta = target - from;
  if (Math.abs(delta) < 0.001 || ms <= 0) {
    audio.volume = target;
    done?.();
    return;
  }
  const start = performance.now();
  const step = (now: number): void => {
    const t = Math.min(1, (now - start) / ms);
    // easeInOutSine - nabeh bez skoku na zaciatku aj na konci
    const eased = 0.5 - Math.cos(Math.PI * t) / 2;
    audio.volume = Math.max(0, Math.min(1, from + delta * eased));
    if (t < 1) {
      fadeFrame = requestAnimationFrame(step);
      return;
    }
    done?.();
  };
  fadeFrame = requestAnimationFrame(step);
}

function disarm(): void {
  if (!armed) return;
  armed = false;
  GESTURES.forEach((type) => window.removeEventListener(type, onGesture, true));
}

function onGesture(): void {
  disarm();
  void attempt();
}

function arm(): void {
  if (armed || playing || failures >= MAX_FAILURES) return;
  armed = true;
  GESTURES.forEach((type) => window.addEventListener(type, onGesture, { capture: true, once: true, passive: true }));
}

async function attempt(): Promise<void> {
  if (readPreference() === 'off') return;
  const audio = ensureElement();
  try {
    audio.volume = 0;
    await audio.play();
    failures = 0;
    playing = true;
    emit();
    fadeTo(AMBIENT_VOLUME, AMBIENT_FADE_MS);
  } catch {
    // Autoplay zamietnuty - pockame na prve gesto hosta.
    failures += 1;
    playing = false;
    emit();
    arm();
  }
}

function stop(remember: boolean): void {
  disarm();
  const audio = el;
  if (!audio) {
    if (remember) writePreference('off');
    return;
  }
  fadeTo(0, 600, () => audio.pause());
  playing = false;
  emit();
  if (remember) writePreference('off');
}

export function toggleAmbient(): void {
  if (playing) {
    stop(true);
    return;
  }
  writePreference('on');
  void attempt();
}

// Pri prepnuti tabu hudbu stisime - nikto nechce hrajucu zalozku na pozadi.
function onVisibility(): void {
  const audio = el;
  if (!audio) return;
  if (document.hidden) {
    if (playing) audio.pause();
    return;
  }
  if (playing && readPreference() !== 'off') void audio.play().catch(() => undefined);
}

/**
 * Zavola sa raz za zivot stranky. Prvy pokus o prehratie odkladame az za
 * window.load a idle callback, aby stahovanie stopy nesutazilo s obrazkami
 * a videom o pasmo pocas nacitania.
 */
export function bootAmbient(): void {
  if (booted || typeof window === 'undefined') return;
  booted = true;
  document.addEventListener('visibilitychange', onVisibility);

  const start = (): void => {
    const idle = (
      window as unknown as {
        requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      }
    ).requestIdleCallback;
    if (typeof idle === 'function') idle(() => void attempt(), { timeout: 3000 });
    else window.setTimeout(() => void attempt(), 1200);
  };

  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start, { once: true });
}

export interface AmbientAudio {
  playing: boolean;
  toggle: () => void;
}

// Prehravac je modulovy singleton, teda z pohladu Reactu externy store. Cez
// useSyncExternalStore sa nan napojime bez setState v efekte - a zaroven tym
// zmizne okno medzi renderom a efektom, v ktorom sa dala stratit zmena stavu.
function subscribeAmbient(onStoreChange: () => void): () => void {
  const listener: Listener = () => onStoreChange();
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getAmbientSnapshot(): boolean {
  return playing;
}

export function useAmbientAudio(): AmbientAudio {
  const isPlaying = useSyncExternalStore(subscribeAmbient, getAmbientSnapshot, () => false);

  useEffect(() => {
    bootAmbient();
  }, []);

  const toggle = useCallback(() => toggleAmbient(), []);

  return { playing: isPlaying, toggle };
}
