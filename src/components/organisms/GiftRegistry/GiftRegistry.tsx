import { memo } from 'react';
import { Icon } from '@atoms/Icon/Icon';
import { giftInstax } from '@data/photos';
import { InstaxPhoto } from '@atoms/InstaxPhoto/InstaxPhoto';
import './GiftRegistry.less';

export const GiftRegistry = memo(() => (
  <section className="gift" id="gift">
    <div className="gift__inner panel panel--olive">
      {giftInstax.map((shot, index) => (
        <InstaxPhoto
          key={shot.src}
          src={shot.src}
          caption={shot.caption}
          className={`gift__instax gift__instax--${index === 0 ? 'first' : 'second'}`}
        />
      ))}
      <svg className="gift__envelope reveal" viewBox="0 0 64 48" aria-hidden="true">
        <rect x="2" y="4" width="60" height="40" rx="3" />
        <path d="M2 7 L32 28 L62 7" />
      </svg>
      <h2 className="h2 h2--center reveal">Váš darček</h2>
      <p className="gift__msg reveal">
        Naša domácnosť je už zariadená, a preto by sme vás poprosili, ak sa rozhodnete nás obdarovať, aby ste
        uprednostnili finančný dar. Každý príspevok použijeme na stavbu nášho vysnívaného domova, v ktorom Vás radi po
        jeho dokončení samozrejme privítame a pohostíme. Ďakujeme vám z celého srdca.
        <Icon name="heart" className="gift__heart" decorative={false} title="srdce" />
      </p>
    </div>
  </section>
));

GiftRegistry.displayName = 'GiftRegistry';
