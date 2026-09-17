import type { ReactNode } from 'react';
import './Button.less';

export type ButtonVariant = 'ghost' | 'solid' | 'light';

export interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  external?: boolean;
}

export const Button = ({ href, children, variant = 'ghost', external = false }: ButtonProps) => {
  const className = `btn btn--${variant}`;

  if (external) {
    return (
      <a className={className} href={href} target="_blank" rel="noopener">
        {children}
      </a>
    );
  }

  return (
    <a className={className} href={href}>
      {children}
    </a>
  );
};
