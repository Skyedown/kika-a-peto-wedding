import { useEffect, useState } from 'react';
import { COUPLE_NAMES, VENUE, WEDDING_DATE_ISO, WEDDING_DATE_SHORT } from '@data/content';
import { Countdown } from '@molecules/Countdown/Countdown';
import './Hero.less';

const SplitName = ({ name }: { name: string }) => (
  <span className="hero__name">
    {Array.from(name).map((char, index) => (
      <span className="char" key={`${char}-${index}`}>
        {char}
      </span>
    ))}
  </span>
);

export interface HeroProps {
  compact?: boolean;
  singular?: boolean;
}

export const Hero = ({ compact = false, singular = false }: HeroProps) => {
  const [hintHidden, setHintHidden] = useState(false);
  const [first, second] = COUPLE_NAMES;

  useEffect(() => {
    const onScroll = (): void => setHintHidden(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToStory = (): void => {
    document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={compact ? 'hero hero--compact' : 'hero'} id="hero">
      <div className="hero__inner">
        <p className="hero__eyebrow reveal">{singular ? 'S láskou Ťa pozývame' : 'S láskou Vás pozývame'}</p>
        {!compact && (
          <svg className="hero__ring reveal" viewBox="0 0 120 120" aria-hidden="true">
            <circle className="hero__ring-circle" cx="60" cy="60" r="46" />
            <path className="hero__ring-leaf" d="M60 14 C 48 26, 48 38, 60 46 C 72 38, 72 26, 60 14 Z" />
          </svg>
        )}
        <h1 className="hero__title">
          <SplitName name={first} />
          <span className="hero__amp">&amp;</span>
          <SplitName name={second} />
        </h1>
        <p className="hero__date reveal">
          {WEDDING_DATE_SHORT} — {VENUE}
        </p>
        <Countdown targetIso={WEDDING_DATE_ISO} className="hero__countdown reveal" />
      </div>
      {!compact && (
        <button
          className={hintHidden ? 'hero__scroll hero__scroll--hidden' : 'hero__scroll'}
          type="button"
          onClick={scrollToStory}
          aria-label="Posunúť nadol"
        >
          <span>nahliadnite</span>
          <svg viewBox="0 0 24 24">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      )}
    </section>
  );
};
