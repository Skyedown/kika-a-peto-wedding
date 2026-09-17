import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect } from 'react';

// Reveal progress follows the scroll both ways; clamp() keeps elements at the very
// bottom of the page able to finish.
const SCRUB_RANGE = { start: 'top bottom', end: 'clamp(top 80%)', scrub: 0.4 } as const;

// Scroll-linked reveals are set up once on mount; the opening (hero + invite card)
// choreography waits until the envelope intro hands over (`openingReady`).
export function useRevealAnimations(openingReady: boolean): void {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
        if (el.closest('.hero, .invite')) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, ease: 'power2.out', scrollTrigger: { trigger: el, ...SCRUB_RANGE } },
        );
      });

      gsap.utils.toArray<HTMLElement>('.timeline__item').forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: i % 2 ? 50 : -50 },
          { opacity: 1, x: 0, ease: 'power2.out', scrollTrigger: { trigger: el, ...SCRUB_RANGE } },
        );
      });
    });

    const refresh = (): void => ScrollTrigger.refresh();
    if (document.fonts?.ready) {
      void document.fonts.ready.then(refresh);
    }
    window.addEventListener('load', refresh);

    return () => {
      window.removeEventListener('load', refresh);
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    if (!openingReady) return;
    ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });
      tl.fromTo(
        '.hero__name .char',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.04, ease: 'power3.out' },
      ).to(
        gsap.utils.toArray('.hero__eyebrow, .hero__ring, .hero__date, .hero__countdown'),
        { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power2.out' },
        0.5,
      );

      const inviteTargets = gsap.utils.toArray<HTMLElement>('.invite__card, .invite__scroll-hint');
      if (inviteTargets.length > 0) {
        tl.fromTo(
          inviteTargets,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1.1, stagger: 0.2, ease: 'power3.out' },
          0.9,
        );
      }
    });

    return () => ctx.revert();
  }, [openingReady]);
}
