import { memo } from 'react';
import './TapHint.less';

export interface TapHintProps {
  loading: boolean;
}

export const TapHint = memo(({ loading }: TapHintProps) => (
  <div className={loading ? 'intro__hint tap-hint tap-hint--loading' : 'intro__hint tap-hint'} aria-live="polite">
    <span className="tap-hint__spinner intro__spinner" aria-hidden="true" />
    <span className="tap-hint__label tap-hint__label--touch">Ťuknite pre otvorenie</span>
    <span className="tap-hint__label tap-hint__label--pointer">Kliknite pre otvorenie</span>
  </div>
));

TapHint.displayName = 'TapHint';
