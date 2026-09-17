import { useCallback, useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';
import {
  createIdleTween,
  createOpenTimeline,
  prefersReducedMotion,
  settleFrame,
  trackVideoZoom,
} from '@organisms/EnvelopeIntro/EnvelopeIntro.helpers';
import type { IntroPhase } from '@organisms/EnvelopeIntro/EnvelopeIntro.helpers';
import type { IntroZoom } from '@data/intro';

const LOADING_FALLBACK_MS = 4000;
const PLAYBACK_FALLBACK_MS = 9000;

export interface EnvelopeSequenceOptions {
  rootRef: RefObject<HTMLDivElement>;
  videoRef: RefObject<HTMLVideoElement>;
  zoom?: IntroZoom | undefined;
  onReveal: () => void;
  onComplete: () => void;
}

export interface EnvelopeSequence {
  phase: IntroPhase;
  handleOpen: () => void;
  handleVideoPlaying: () => void;
  handleVideoEnded: () => void;
  handleVideoError: () => void;
}

export function useEnvelopeSequence({
  rootRef,
  videoRef,
  zoom,
  onReveal,
  onComplete,
}: EnvelopeSequenceOptions): EnvelopeSequence {
  const [phase, setPhase] = useState<IntroPhase>('idle');
  const phaseRef = useRef<IntroPhase>('idle');
  const idleRef = useRef<ReturnType<typeof createIdleTween> | null>(null);
  const timelineRef = useRef<ReturnType<typeof createOpenTimeline> | null>(null);
  const zoomRef = useRef<(() => void) | null>(null);
  const fallbackRef = useRef(0);

  const stopZoomTracking = useCallback(() => {
    zoomRef.current?.();
    zoomRef.current = null;
  }, []);

  const goTo = useCallback((next: IntroPhase) => {
    phaseRef.current = next;
    setPhase(next);
  }, []);

  const startOpening = useCallback(() => {
    const root = rootRef.current;
    if (!root || phaseRef.current === 'opening' || phaseRef.current === 'done') return;
    window.clearTimeout(fallbackRef.current);
    videoRef.current?.pause();
    stopZoomTracking();
    goTo('opening');
    timelineRef.current = createOpenTimeline({
      scope: root,
      reducedMotion: prefersReducedMotion(),
      onReveal,
      onComplete: () => {
        goTo('done');
        onComplete();
      },
    });
  }, [goTo, onComplete, onReveal, rootRef, stopZoomTracking, videoRef]);

  const handleOpen = useCallback(() => {
    const root = rootRef.current;
    const video = videoRef.current;
    if (!root || phaseRef.current !== 'idle') return;
    idleRef.current?.kill();
    settleFrame(root);

    if (!video || prefersReducedMotion()) {
      startOpening();
      return;
    }
    goTo('loading');
    fallbackRef.current = window.setTimeout(startOpening, LOADING_FALLBACK_MS);
    video.play().catch(startOpening);
  }, [goTo, rootRef, startOpening, videoRef]);

  const handleVideoPlaying = useCallback(() => {
    if (phaseRef.current !== 'loading') return;
    const root = rootRef.current;
    const video = videoRef.current;
    window.clearTimeout(fallbackRef.current);
    goTo('playing');
    if (zoom && root && video && !zoomRef.current) {
      zoomRef.current = trackVideoZoom({ scope: root, video, zoom });
    }
    fallbackRef.current = window.setTimeout(startOpening, PLAYBACK_FALLBACK_MS);
  }, [goTo, rootRef, startOpening, videoRef, zoom]);

  const handleVideoError = useCallback(() => {
    if (phaseRef.current === 'loading' || phaseRef.current === 'playing') startOpening();
  }, [startOpening]);

  useEffect(() => {
    const root = rootRef.current;
    if (root && !prefersReducedMotion()) idleRef.current = createIdleTween(root);
    return () => {
      idleRef.current?.kill();
      timelineRef.current?.kill();
      stopZoomTracking();
      window.clearTimeout(fallbackRef.current);
    };
  }, [rootRef, stopZoomTracking]);

  return { phase, handleOpen, handleVideoPlaying, handleVideoEnded: startOpening, handleVideoError };
}
