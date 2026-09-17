import { COUPLE_NAMES, HASHTAG, VENUE, WEDDING_DATE_LONG } from '@data/content';
import { DEFAULT_FORM_URL } from '@data/guests';
import { footerCollage } from '@data/photos';
import { Icon } from '@atoms/Icon/Icon';
import './Footer.less';

export interface FooterProps {
  rsvpUrl?: string;
}

export const Footer = ({ rsvpUrl = DEFAULT_FORM_URL }: FooterProps) => (
  <footer className="footer" id="footer">
    <div className="footer__collage">
      {footerCollage.map((photo) => (
        <figure key={photo.src} className={`footer__photo footer__photo--${photo.slot} reveal`}>
          <img
            src={photo.src}
            alt=""
            loading="lazy"
            decoding="async"
            style={{ objectPosition: `50% ${photo.focus}%` }}
          />
        </figure>
      ))}

      <div className="footer__inner">
        <h2 className="footer__names">{COUPLE_NAMES.join(' & ')}</h2>
        <p className="footer__date">
          {WEDDING_DATE_LONG} · {VENUE}
        </p>
        <p className="footer__hash">{HASHTAG}</p>
        <div className="footer__links">
          <a href="#hero">Späť hore</a>
          <span aria-hidden="true">·</span>
          <a className="footer__rsvp" href={rsvpUrl} target="_blank" rel="noopener">
            Potvrdiť účasť
          </a>
        </div>
        <p className="footer__credit">
          Vytvorené s láskou
          <Icon name="heart" className="footer__heart" decorative={false} title="srdce" />
        </p>
      </div>
    </div>
  </footer>
);
