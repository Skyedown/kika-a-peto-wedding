import { Fragment, memo, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WEDDING_DATE_ISO } from '@data/content';
import { Button } from '@atoms/Button/Button';
import { useCountdown } from '@hooks/useCountdown';
import { COUNTDOWN_UNITS, padUnit } from '@molecules/Countdown/Countdown.helpers';
import './CountdownBanner.less';

export interface CountdownBannerProps {
  rsvpUrl: string;
}

export const CountdownBanner = memo(({ rsvpUrl }: CountdownBannerProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const timeLeft = useCountdown(WEDDING_DATE_ISO);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.countdown-banner__photo',
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      );
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section className="countdown-banner" id="countdown" ref={sectionRef}>
      <picture className="countdown-banner__media" aria-hidden="true">
        <source media="(orientation: portrait)" srcSet="/photos/countdown-portrait.webp" />
        <img
          className="countdown-banner__photo"
          src="/photos/countdown-wide.webp"
          alt=""
          loading="lazy"
          decoding="async"
        />
      </picture>
      <div className="countdown-banner__shade" aria-hidden="true" />

      <div className="countdown-banner__content reveal">
        <p className="countdown-banner__eyebrow">Vidíme sa o</p>
        <div className="countdown-banner__clock" role="timer" aria-label="Odpočet do svadby">
          {COUNTDOWN_UNITS.map((unit, index) => (
            <Fragment key={unit.key}>
              {index > 0 && (
                <span className="countdown-banner__colon" aria-hidden="true">
                  :
                </span>
              )}
              <div className="countdown-banner__unit">
                <span className="countdown-banner__value">{padUnit(timeLeft[unit.key])}</span>
                <span className="countdown-banner__label">{unit.label}</span>
              </div>
            </Fragment>
          ))}
        </div>
        <div className="countdown-banner__cta">
          <Button href={rsvpUrl} variant="light" external>
            Potvrdiť účasť
          </Button>
        </div>
      </div>
    </section>
  );
});

CountdownBanner.displayName = 'CountdownBanner';
