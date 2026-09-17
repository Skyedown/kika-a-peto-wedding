import type { Hotel } from '@data/content';
import { Button } from '@atoms/Button/Button';
import './HotelCard.less';

export interface HotelCardProps {
  hotel: Hotel;
}

export const HotelCard = ({ hotel }: HotelCardProps) => (
  <article className="hotel reveal">
    <h3 className="hotel__name">{hotel.name}</h3>
    <p className="hotel__meta">{hotel.meta}</p>
    <Button href={hotel.bookingUrl} variant="ghost" external>
      Mapa
    </Button>
  </article>
);
