import { memo } from 'react';
import { COUPLE_NAMES, WEDDING_DATE_SHORT } from '@data/content';
import './EnvelopeCard.less';

export interface EnvelopeCardProps {
  recipient: string;
}

export const EnvelopeCard = memo(({ recipient }: EnvelopeCardProps) => {
  const [first, second] = COUPLE_NAMES;

  return (
    <div className="envelope-card">
      <p className="envelope-card__eyebrow">Svadobná pozvánka</p>
      <p className="envelope-card__monogram">
        {first.charAt(0)}
        <span className="envelope-card__amp">&amp;</span>
        {second.charAt(0)}
      </p>
      <span className="envelope-card__divider" />
      <p className="envelope-card__recipient">{recipient}</p>
      <p className="envelope-card__date">{WEDDING_DATE_SHORT}</p>
    </div>
  );
});

EnvelopeCard.displayName = 'EnvelopeCard';
