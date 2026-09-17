import './SectionHeading.less';

export interface SectionHeadingProps {
  eyebrow: string;
  title: string;
}

export const SectionHeading = ({ eyebrow, title }: SectionHeadingProps) => (
  <header className="section-head reveal">
    <p className="eyebrow">{eyebrow}</p>
    <h2 className="h2">{title}</h2>
  </header>
);
