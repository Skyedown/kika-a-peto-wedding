import { useEffect, useState } from 'react';
import { getTimeLeft } from '@molecules/Countdown/Countdown.helpers';
import type { TimeLeft } from '@molecules/Countdown/Countdown.helpers';

export function useCountdown(targetIso: string): TimeLeft {
  const target = new Date(targetIso).getTime();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft(target, Date.now()));

  useEffect(() => {
    const id = window.setInterval(() => setTimeLeft(getTimeLeft(target, Date.now())), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  return timeLeft;
}
