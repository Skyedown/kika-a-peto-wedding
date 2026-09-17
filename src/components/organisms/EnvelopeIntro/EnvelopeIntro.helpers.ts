import gsap from 'gsap';
import { LANDSCAPE_QUERY, introVariants } from '@data/intro';
import type { IntroVariant, IntroZoom } from '@data/intro';

export type IntroPhase = 'idle' | 'loading' | 'playing' | 'opening' | 'done';

export interface ZoomTrackerOptions {
  scope: HTMLElement;
  video: HTMLVideoElement;
  zoom: IntroZoom;
}

export interface OpenTimelineOptions {
  scope: HTMLElement;
  reducedMotion: boolean;
  onReveal: () => void;
  onComplete: () => void;
}

const FLAP_OPEN = 1.05;
const FLAP_EASE = 'power2.inOut';

export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function pickIntroVariant(): IntroVariant {
  return window.matchMedia(LANDSCAPE_QUERY).matches ? introVariants.landscape : introVariants.portrait;
}

export function createIdleTween(scope: HTMLElement): gsap.core.Tween {
  // Ramec sa NESMIE skalovat: obsahuje video, poster aj koncovy obrazok a kazda
  // zmena mierky sposobi, ze pri prepnuti medzi nimi vidno zmenu velkosti
  // (najviditelnejsie na jemnom monograme). "Zivot" drzi CSS animacia lesku
  // (.intro__sheen), ktora nehybe geometriou - tu len jemne pulzujeme jej silu.
  return gsap.to(scope.querySelector('.intro__sheen'), {
    opacity: 0.45,
    duration: 3.2,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
  });
}

// Drzi venovanie a lesk na tom istom mieste obalky, kym z nej video odzoomuva.
// Meni sa iba mierka, nikdy font-size ani left/top - inak by sa text kazdy snimok
// prelayoutoval a riadky by poskakovali po pixeloch. Riadi sa video.currentTime,
// nie vlastnym casovacom, takze pri zasekanom prehravani nikdy neutecie dopredu.
export function trackVideoZoom({ scope, video, zoom }: ZoomTrackerOptions): () => void {
  const frame = scope.querySelector<HTMLElement>('.intro__frame');
  if (!frame) return () => {};

  frame.style.setProperty('--zoom-origin-x', `${zoom.originX}%`);
  frame.style.setProperty('--zoom-origin-y', `${zoom.originY}%`);
  let frameId = 0;

  const tick = (): void => {
    const x = Math.min(1, Math.max(0, video.currentTime / zoom.duration));
    const progress = 1 - Math.pow(1 - x, zoom.ease);
    frame.style.setProperty('--zoom-x', `${1 + (zoom.scaleX - 1) * progress}`);
    frame.style.setProperty('--zoom-y', `${1 + (zoom.scaleY - 1) * progress}`);
    frameId = requestAnimationFrame(tick);
  };

  tick();
  return () => cancelAnimationFrame(frameId);
}

export function settleFrame(scope: HTMLElement): void {
  // Poistka: ramec drzime na presnej mierke 1, aby video, poster aj koncovy
  // obrazok sedeli pixel na pixel.
  gsap.set(scope.querySelector('.intro__frame'), { scale: 1, overwrite: true });
  gsap.to(scope.querySelectorAll('.intro__hint, .intro__sheen'), { autoAlpha: 0, duration: 0.4 });
}

export function createOpenTimeline({
  scope,
  reducedMotion,
  onReveal,
  onComplete,
}: OpenTimelineOptions): gsap.core.Timeline {
  const q = gsap.utils.selector(scope);
  const pace = reducedMotion ? 0.3 : 1;
  const flap = { duration: FLAP_OPEN * pace, ease: FLAP_EASE };
  const tl = gsap.timeline({ onComplete });

  // Video dohasne do 0.12 s, chlopna sa hybe az od 0.15 s - bez prekryvu,
  // inak cez doznievajuce video presvita otacajuca sa chlopna.
  tl.to(q('.intro__video'), { autoAlpha: 0, duration: 0.12 * pace }, 0)
    .to(q('.intro__label, .intro__hint, .intro__spinner'), { autoAlpha: 0, duration: 0.35 * pace }, 0)
    .to(q('.flap--top'), { rotationX: 179, ...flap }, 0.15 * pace)
    .to(q('.flap--left'), { rotationY: -179, ...flap }, 0.7 * pace)
    .to(q('.flap--right'), { rotationY: 179, ...flap }, 0.8 * pace)
    .to(q('.flap--bottom'), { rotationX: -179, ...flap }, 1.3 * pace)
    .fromTo(q('.envelope-card'), { scale: 1 }, { scale: 1.04, duration: 0.6 * pace, ease: 'power2.out' }, 2.2 * pace)
    .addLabel('zoom', 2.5 * pace)
    .to(q('.intro__frame'), { scale: reducedMotion ? 1.3 : 5, duration: 1.3 * pace, ease: 'power2.in' }, 'zoom')
    .to(scope, { autoAlpha: 0, duration: 0.6 * pace, ease: 'power1.inOut' }, `zoom+=${0.7 * pace}`)
    .call(onReveal, [], `zoom+=${1.05 * pace}`);

  return tl;
}
