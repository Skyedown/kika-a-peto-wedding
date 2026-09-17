import { memo } from 'react';
import './InstaxPhoto.less';

export interface InstaxPhotoProps {
  src: string;
  caption?: string | undefined;
  className?: string;
}

export const InstaxPhoto = memo(({ src, caption, className = '' }: InstaxPhotoProps) => (
  <figure className={`instax ${className}`}>
    <span className="instax__window">
      <img className="instax__img" src={src} alt="" loading="lazy" decoding="async" />
    </span>
    <figcaption className="instax__caption">{caption}</figcaption>
  </figure>
));

InstaxPhoto.displayName = 'InstaxPhoto';
