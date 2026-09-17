import { memo } from 'react';
import './SilkBackdrop.less';

export const SilkBackdrop = memo(() => (
  <div className="silk" aria-hidden="true">
    <div className="silk__layer silk__layer--base" />
    <div className="silk__layer silk__layer--ripple" />
    <div className="silk__tint" />
    <div className="silk__sheen" />
  </div>
));

SilkBackdrop.displayName = 'SilkBackdrop';
