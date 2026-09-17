import Lenis from 'lenis';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';

// Lenis smooth scroll driven through the GSAP ticker.
export function useSmoothScroll(locked = false): RefObject<Lenis | null> {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenisRef.current = lenis;
    lenis.scrollTo(0, { immediate: true, force: true });

    const tick = (time: number): void => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current;
    document.documentElement.classList.toggle('is-scroll-locked', locked);
    if (locked) {
      lenis?.stop();
      lenis?.scrollTo(0, { immediate: true, force: true });
    } else {
      lenis?.start();
      lenis?.scrollTo(0, { immediate: true, force: true });
    }
  }, [locked]);

  return lenisRef;
}
