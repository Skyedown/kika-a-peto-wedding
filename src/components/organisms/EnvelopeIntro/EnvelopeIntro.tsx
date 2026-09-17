import { useRef, useState } from 'react';
import { IntroVideo } from '@molecules/IntroVideo/IntroVideo';
import { EnvelopeLayers } from '@molecules/EnvelopeLayers/EnvelopeLayers';
import { TapHint } from '@atoms/TapHint/TapHint';
import { useEnvelopeSequence } from '@hooks/useEnvelopeSequence';
import { pickIntroVariant } from './EnvelopeIntro.helpers';
import './EnvelopeIntro.less';

export interface EnvelopeIntroProps {
  recipient: string;
  onReveal: () => void;
  onComplete: () => void;
}

export const EnvelopeIntro = ({ recipient, onReveal, onComplete }: EnvelopeIntroProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [variant] = useState(pickIntroVariant);
  const { phase, handleOpen, handleVideoPlaying, handleVideoEnded, handleVideoError } = useEnvelopeSequence({
    rootRef,
    videoRef,
    zoom: variant.zoom,
    onReveal,
    onComplete,
  });

  return (
    <div className={`intro intro--${variant.name}`} ref={rootRef}>
      <div className="intro__frame">
        <EnvelopeLayers variant={variant} recipient={recipient} />
        <IntroVideo
          ref={videoRef}
          variant={variant}
          onPlaying={handleVideoPlaying}
          onEnded={handleVideoEnded}
          onError={handleVideoError}
        />
        <div className="intro__track">
          <p className="intro__label">
            <span className="intro__label-pre">pre</span>
            {recipient}
          </p>
        </div>
        <div className="intro__sheen" aria-hidden="true" />
      </div>
      <TapHint loading={phase === 'loading'} />
      <button
        className="intro__trigger"
        type="button"
        onClick={handleOpen}
        disabled={phase !== 'idle'}
        aria-label={`Otvoriť pozvánku pre ${recipient}`}
      />
    </div>
  );
};
