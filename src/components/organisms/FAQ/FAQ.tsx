import { memo } from 'react';
import { faqs } from '@data/content';
import { faqInstax } from '@data/photos';
import { InstaxPhoto } from '@atoms/InstaxPhoto/InstaxPhoto';
import { SectionHeading } from '@atoms/SectionHeading/SectionHeading';
import { AccordionItem } from '@molecules/AccordionItem/AccordionItem';
import './FAQ.less';

export const FAQ = memo(() => (
  <section className="faq" id="faq">
    <div className="panel faq__panel">
      {faqInstax.map((shot, index) => (
        <InstaxPhoto
          key={shot.src}
          src={shot.src}
          caption={shot.caption}
          tape={index === 1 ? 'corner' : 'top'}
          className={`faq__instax faq__instax--${index + 1}`}
        />
      ))}
      <SectionHeading eyebrow="Dobré vedieť" title="Časté otázky" />
      <div className="accordion" id="accordion">
        {faqs.map((entry) => (
          <AccordionItem key={entry.question} entry={entry} />
        ))}
      </div>
    </div>
  </section>
));

FAQ.displayName = 'FAQ';
