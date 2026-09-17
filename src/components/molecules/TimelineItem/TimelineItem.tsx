import type { ScheduleEntry } from '@data/content';
import './TimelineItem.less';

export interface TimelineItemProps {
  entry: ScheduleEntry;
}

export const TimelineItem = ({ entry }: TimelineItemProps) => (
  <li className="timeline__item">
    <div className="timeline__time-col">
      <span className="timeline__time">{entry.time}</span>
      {entry.date && <span className="timeline__date">{entry.date}</span>}
    </div>
    <span className="timeline__dot" />
    <div className="timeline__body">
      <h3>{entry.title}</h3>
      {(entry.location || entry.duration) && (
        <div className="timeline__meta">
          {entry.location && <span className="timeline__location">{entry.location}</span>}
          {entry.duration && <span className="timeline__duration">{entry.duration}</span>}
        </div>
      )}
      {entry.detail && <p>{entry.detail}</p>}
    </div>
  </li>
);
