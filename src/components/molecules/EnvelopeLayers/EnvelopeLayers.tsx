import { memo } from 'react';
import type { IntroVariant } from '@data/intro';
import { EnvelopeCard } from '@molecules/EnvelopeCard/EnvelopeCard';
import { EnvelopeFlap } from '@atoms/EnvelopeFlap/EnvelopeFlap';
import type { FlapSide } from '@atoms/EnvelopeFlap/EnvelopeFlap';
import './EnvelopeLayers.less';

const FLAP_SIDES: FlapSide[] = ['bottom', 'left', 'right', 'top'];

export interface EnvelopeLayersProps {
  variant: IntroVariant;
  recipient: string;
}

export const EnvelopeLayers = memo(({ variant, recipient }: EnvelopeLayersProps) => (
  <div className="intro__layers" aria-hidden="true">
    <img className="intro__still" src={variant.endFrame} alt="" decoding="async" />
    <div className="intro__lining" />
    <EnvelopeCard recipient={recipient} />
    {FLAP_SIDES.map((side) => (
      <EnvelopeFlap key={side} side={side} image={variant.endFrame} />
    ))}
  </div>
));

EnvelopeLayers.displayName = 'EnvelopeLayers';
