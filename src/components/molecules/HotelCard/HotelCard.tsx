import type { Hotel } from '@data/content';
import { MapButton } from '@atoms/MapButton/MapButton';
import './HotelCard.less';

export interface HotelCardProps {
  hotel: Hotel;
}

export const HotelCard = ({ hotel }: HotelCardProps) => (
  <article className="hotel reveal">
    <h3 className="hotel__name">{hotel.name}</h3>
    <p className="hotel__meta">{hotel.meta}</p>
    <MapButton href={hotel.mapUrl} />
  </article>
);
