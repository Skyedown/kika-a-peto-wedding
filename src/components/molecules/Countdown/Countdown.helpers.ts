export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface CountdownUnit {
  key: keyof TimeLeft;
  label: string;
}

export const COUNTDOWN_UNITS: CountdownUnit[] = [
  { key: 'days', label: 'dní' },
  { key: 'hours', label: 'hodín' },
  { key: 'minutes', label: 'minút' },
  { key: 'seconds', label: 'sekúnd' },
];

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export function getTimeLeft(target: number, now: number): TimeLeft {
  const diff = Math.max(target - now, 0);
  return {
    days: Math.floor(diff / DAY),
    hours: Math.floor((diff % DAY) / HOUR),
    minutes: Math.floor((diff % HOUR) / MINUTE),
    seconds: Math.floor((diff % MINUTE) / SECOND),
  };
}

export function padUnit(value: number): string {
  return String(value).padStart(2, '0');
}
