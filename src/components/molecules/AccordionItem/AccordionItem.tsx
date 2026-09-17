import { Fragment, useRef, useState } from 'react';
import type { FaqEntry } from '@data/content';
import { Icon } from '@atoms/Icon/Icon';
import './AccordionItem.less';

export interface AccordionItemProps {
  entry: FaqEntry;
}

export const AccordionItem = ({ entry }: AccordionItemProps) => {
  const [open, setOpen] = useState(false);
  const answerRef = useRef<HTMLDivElement>(null);
  const heartToken = '{{heart}}';

  const renderAnswer = (answer: string) => {
    if (!answer.includes(heartToken)) return answer;

    const parts = answer.split(heartToken);
    return parts.map((part, index) => (
      <Fragment key={`${part}-${index}`}>
        {part}
        {index < parts.length - 1 && (
          <Icon name="heart" className="acc__inline-icon" decorative={false} title="srdce" />
        )}
      </Fragment>
    ));
  };

  const toggle = (): void => {
    const answer = answerRef.current;
    if (!answer) return;

    if (open) {
      // auto → measured px → 0, so the height transition has a value to animate.
      answer.style.height = `${answer.scrollHeight}px`;
      requestAnimationFrame(() => {
        answer.style.height = '0px';
      });
      setOpen(false);
    } else {
      setOpen(true);
      answer.style.height = `${answer.scrollHeight}px`;
      const onEnd = (): void => {
        if (answerRef.current) answerRef.current.style.height = 'auto';
        answer.removeEventListener('transitionend', onEnd);
      };
      answer.addEventListener('transitionend', onEnd);
    }
  };

  return (
    <div className={open ? 'acc acc--open' : 'acc'}>
      <button className="acc__q" type="button" onClick={toggle} aria-expanded={open}>
        {entry.question}
        <span className="acc__sign" aria-hidden="true" />
      </button>
      <div className="acc__a" ref={answerRef}>
        <p>{renderAnswer(entry.answer)}</p>
      </div>
    </div>
  );
};
