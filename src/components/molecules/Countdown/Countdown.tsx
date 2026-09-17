import { memo } from 'react';
import { useCountdown } from '@hooks/useCountdown';
import { COUNTDOWN_UNITS, padUnit } from './Countdown.helpers';
import './Countdown.less';

export interface CountdownProps {
  targetIso: string;
  className?: string;
}

export const Countdown = memo(({ targetIso, className = '' }: CountdownProps) => {
  const timeLeft = useCountdown(targetIso);

  return (
    <div className={`countdown ${className}`} role="timer" aria-label="Odpočet do svadby">
      {COUNTDOWN_UNITS.map((unit) => (
        <div className="countdown__unit" key={unit.key}>
          <span className="countdown__value">{padUnit(timeLeft[unit.key])}</span>
          <span className="countdown__label">{unit.label}</span>
        </div>
      ))}
    </div>
  );
});

Countdown.displayName = 'Countdown';
