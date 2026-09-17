import { hotels } from '@data/content';
import { stayInstax } from '@data/photos';
import { InstaxPhoto } from '@atoms/InstaxPhoto/InstaxPhoto';
import { MapButton } from '@atoms/MapButton/MapButton';
import { SectionHeading } from '@atoms/SectionHeading/SectionHeading';
import { HotelCard } from '@molecules/HotelCard/HotelCard';
import './Accommodation.less';

export const Accommodation = () => (
  <section className="stay" id="stay">
    <div className="panel">
      {stayInstax.map((shot, index) => (
        <InstaxPhoto
          key={shot.src}
          src={shot.src}
          caption={shot.caption}
          tape={index === 0 ? 'top' : 'corner'}
          className={`stay__instax stay__instax--${index === 0 ? 'first' : 'second'}`}
        />
      ))}
      <SectionHeading eyebrow="Ako sa dostať & kde spať" title="Ubytovanie" />
      <div className="stay__grid">
        {hotels.map((hotel) => (
          <HotelCard key={hotel.name} hotel={hotel} />
        ))}
      </div>
      <div className="stay__map reveal">
        {hotels.map((hotel) => (
          <MapButton key={hotel.name} href={hotel.mapUrl} />
        ))}
      </div>
      <p className="stay__note reveal">
        Parkovanie je k dispozícii priamo v areáli ubytovania, alebo pri ceste popri svadobnom stane. Pre lokálnych
        hostí zabezpečíme odvoz do blízkeho okolia. Pre ubytovaných v Centre poznávania je ubytovanie dostupné na pešo
        (cca 300m).
      </p>
    </div>
  </section>
);
