import type { WeddingEvent } from '@data/content';
import { Icon } from '@atoms/Icon/Icon';
import './EventCard.less';

export interface EventCardProps {
  event: WeddingEvent;
}

export const EventCard = ({ event }: EventCardProps) => (
  <article className="event reveal">
    <span className="event__icon">
      <Icon name={event.icon} className="event__icon-svg" decorative={false} title={event.title} />
    </span>
    <h3 className="event__title">{event.title}</h3>
    <p className="event__time">{event.time}</p>
    <p className="event__venue">{event.venue}</p>
    <p className="event__addr">{event.address}</p>
  </article>
);
