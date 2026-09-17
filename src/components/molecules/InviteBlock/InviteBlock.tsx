import { useCallback, useMemo } from 'react';
import { Button } from '@atoms/Button/Button';
import type { Gender } from '@data/guests';
import { getInviteCopy } from './InviteBlock.helpers';
import './InviteBlock.less';

export interface InviteBlockProps {
  names: string;
  formUrl: string;
  singular?: boolean;
  gender?: Gender | undefined;
  onReplay: () => void;
}

export const InviteBlock = ({ names, formUrl, singular = false, gender, onReplay }: InviteBlockProps) => {
  const copy = useMemo(() => getInviteCopy(singular, gender), [singular, gender]);

  const scrollToContent = useCallback(() => {
    document.getElementById('content')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <section className="invite" id="invite" aria-label="Pozvánka">
      <div className="invite__card">
        <figure className="invite__photo">
          <img src="/photos/invite.webp" alt="Kika & Peťo" />
          <figcaption className="invite__photo-caption">Ideme sa brať!</figcaption>
        </figure>
        <p className="invite__eyebrow">{copy.eyebrow}</p>
        <h2 className="invite__greet">
          {copy.salutation} <em>{names}</em>
        </h2>
        <span className="invite__divider" />
        <p className="invite__text">{copy.text}</p>
        <Button href={formUrl} variant="solid" external>
          Potvrdiť účasť
        </Button>
        <button
          className="invite__replay"
          type="button"
          onClick={onReplay}
          aria-label="Znova prehrať otvorenie obálky"
          title="Znova prehrať"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 12a9 9 0 1 0 3-6.7" />
            <path d="M3 4v4h4" />
          </svg>
        </button>
      </div>

      <button className="invite__scroll-hint" type="button" onClick={scrollToContent} aria-label="Posunúť nadol">
        <span>Pozrite si detaily svadby</span>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
    </section>
  );
};
