import './Icon.less';

export type IconName = 'church' | 'toast' | 'dinner' | 'heart' | 'pin';

export interface IconProps {
  name: IconName;
  className?: string;
  decorative?: boolean;
  title?: string;
}

const iconViewBox = '0 0 24 24';

export const Icon = ({ name, className, decorative = true, title }: IconProps) => {
  const ariaHidden = decorative ? true : undefined;
  const role = decorative ? undefined : 'img';
  const label = decorative ? undefined : title;
  const classes = className ? `icon ${className}` : 'icon';

  if (name === 'pin') {
    return (
      <svg className={classes} viewBox={iconViewBox} aria-hidden={ariaHidden} role={role} aria-label={label}>
        <path
          fill="currentColor"
          d="M12 2a7 7 0 0 1 7 7c0 4.7-5.6 11.4-6.3 12.2a1 1 0 0 1-1.4 0C10.6 20.4 5 13.7 5 9a7 7 0 0 1 7-7Zm0 2a5 5 0 0 0-5 5c0 3.2 3.5 8.1 5 10 1.5-1.9 5-6.8 5-10a5 5 0 0 0-5-5Zm0 2.5A2.5 2.5 0 1 1 12 11a2.5 2.5 0 0 1 0-4.5Z"
        />
      </svg>
    );
  }

  if (name === 'church') {
    return (
      <svg className={classes} viewBox={iconViewBox} aria-hidden={ariaHidden} role={role} aria-label={label}>
        <path
          fill="currentColor"
          d="M11 2h2v3h2v2h-2v2h-2V7H9V5h2V2Zm1 8 7 4v8h-5v-5H10v5H5v-8l7-4Zm0 2.2L7 15v5h1v-5h8v5h1v-5l-5-2.8Z"
        />
      </svg>
    );
  }

  if (name === 'toast') {
    return (
      <svg className={classes} viewBox={iconViewBox} aria-hidden={ariaHidden} role={role} aria-label={label}>
        <path
          fill="currentColor"
          d="M7.5 3h2.8l2.2 6.8H9.8l-.7 2.2h2.7V14H8.5l-2.2 7H4l2-7H4v-2h2.6l.7-2.2H4.8L7.5 3Zm8.8 0H19l-2.8 6.8h-2.7L16.3 3ZM15 12h5v2h-5v6h-2v-6h-1v-2h1v-2h2v2Z"
        />
      </svg>
    );
  }

  if (name === 'dinner') {
    return (
      <svg className={classes} viewBox={iconViewBox} aria-hidden={ariaHidden} role={role} aria-label={label}>
        <path
          fill="currentColor"
          d="M4 2h2v6a2 2 0 0 1-2 2v12H2V10A2 2 0 0 1 0 8V2h2v5h2V2Zm15 0c2 0 3 1.8 3 4v16h-2v-7h-3v7h-2V6c0-2.2 1-4 4-4Zm0 2c-1.4 0-2 .9-2 2v7h3V6c0-1.1-.6-2-1-2Zm-7 3a7 7 0 1 1 0 14 7 7 0 0 1 0-14Zm0 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z"
        />
      </svg>
    );
  }

  return (
    <svg className={classes} viewBox={iconViewBox} aria-hidden={ariaHidden} role={role} aria-label={label}>
      <path
        fill="currentColor"
        d="M12 21s-6.7-4.4-9.2-8.1C.6 9.7 2.2 5 6.4 4.3A5.7 5.7 0 0 1 12 7a5.7 5.7 0 0 1 5.6-2.7c4.2.7 5.8 5.4 3.6 8.6C18.7 16.6 12 21 12 21Z"
      />
    </svg>
  );
};
