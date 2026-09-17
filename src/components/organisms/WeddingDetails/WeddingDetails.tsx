import { memo } from 'react';
import { events, VENUE, VENUE_MAP_URL } from '@data/content';
import { detailsInstax } from '@data/photos';
import { InstaxPhoto } from '@atoms/InstaxPhoto/InstaxPhoto';
import { MapButton } from '@atoms/MapButton/MapButton';
import { Icon } from '@atoms/Icon/Icon';
import { SectionHeading } from '@atoms/SectionHeading/SectionHeading';
import { EventCard } from '@molecules/EventCard/EventCard';
import './WeddingDetails.less';

export const WeddingDetails = memo(() => (
  <section className="details" id="details">
    <div className="panel">
      {detailsInstax.map((shot, index) => (
        <InstaxPhoto
          key={shot.src}
          src={shot.src}
          caption={shot.caption}
          className={`details__instax details__instax--${index === 0 ? 'first' : 'second'}`}
        />
      ))}
      <SectionHeading eyebrow="Kde & kedy" title="Svadobný deň" />
      <div className="details__grid">
        {events.map((event) => (
          <EventCard key={event.title} event={event} />
        ))}
      </div>
      <div className="details__map reveal">
        <MapButton href={VENUE_MAP_URL} />
        <span className="details__map-venue">{VENUE}</span>
      </div>
      <p className="details__dress reveal">
        Dress code: elegantné oblečenie — odtiene bielej a krémovej prosím vynechajte
        <Icon name="heart" className="details__heart" decorative={false} title="srdce" />
      </p>
    </div>
  </section>
));

WeddingDetails.displayName = 'WeddingDetails';
