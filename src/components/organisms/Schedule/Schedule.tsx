import { schedule } from '@data/content';
import { scheduleInstax } from '@data/photos';
import { Button } from '@atoms/Button/Button';
import { InstaxPhoto } from '@atoms/InstaxPhoto/InstaxPhoto';
import { SectionHeading } from '@atoms/SectionHeading/SectionHeading';
import { TimelineItem } from '@molecules/TimelineItem/TimelineItem';
import './Schedule.less';

export interface ScheduleProps {
  rsvpUrl: string;
}

export const Schedule = ({ rsvpUrl }: ScheduleProps) => (
  <section className="schedule" id="schedule">
    <div className="panel schedule__panel">
      {scheduleInstax.map((shot, index) => (
        <InstaxPhoto
          key={shot.src}
          src={shot.src}
          caption={shot.caption}
          tape={index === 0 ? 'top' : 'corner'}
          className={`schedule__instax schedule__instax--${index === 0 ? 'first' : 'second'}`}
        />
      ))}
      <SectionHeading eyebrow="Program dňa" title="Ako pôjde čas" />
      <ol className="timeline" id="timeline">
        {schedule.map((entry) => (
          <TimelineItem key={entry.time + entry.title} entry={entry} />
        ))}
      </ol>
      <div className="schedule__cta reveal">
        <p className="schedule__cta-text">Tešíme sa na každú chvíľu s vami</p>
        <Button href={rsvpUrl} variant="light" external>
          Potvrdiť účasť
        </Button>
      </div>
    </div>
  </section>
);
