import { forwardRef, memo } from 'react';
import type { IntroVariant } from '@data/intro';
import './IntroVideo.less';

export interface IntroVideoProps {
  variant: IntroVariant;
  onPlaying: () => void;
  onEnded: () => void;
  onError: () => void;
}

export const IntroVideo = memo(
  forwardRef<HTMLVideoElement, IntroVideoProps>(({ variant, onPlaying, onEnded, onError }, ref) => (
    <video
      ref={ref}
      className="intro__video"
      poster={variant.poster}
      muted
      playsInline
      preload="auto"
      disablePictureInPicture
      disableRemotePlayback
      onPlaying={onPlaying}
      onEnded={onEnded}
      onError={onError}
      aria-hidden="true"
    >
      {variant.sources.map((source) => (
        <source key={source.src} src={source.src} type={source.type} onError={onError} />
      ))}
    </video>
  )),
);

IntroVideo.displayName = 'IntroVideo';
