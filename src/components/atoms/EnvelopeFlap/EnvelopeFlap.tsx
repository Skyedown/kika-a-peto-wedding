import { memo } from 'react';
import './EnvelopeFlap.less';

export type FlapSide = 'top' | 'right' | 'bottom' | 'left';

export interface EnvelopeFlapProps {
  side: FlapSide;
  image: string;
}

export const EnvelopeFlap = memo(({ side, image }: EnvelopeFlapProps) => (
  <div className={`flap flap--${side}`}>
    <img className="flap__face flap__face--front" src={image} alt="" decoding="async" />
    <div className="flap__face flap__face--back" />
  </div>
));

EnvelopeFlap.displayName = 'EnvelopeFlap';
