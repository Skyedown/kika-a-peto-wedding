import { useCallback, useEffect, useState } from 'react';
import { useScrollLock } from '@hooks/useScrollLock';

export interface IntroFlow {
  introOpen: boolean;
  openingReady: boolean;
  handleReveal: () => void;
  handleComplete: () => void;
  handleReplay: () => void;
}

export function useIntroFlow(hasIntro: boolean): IntroFlow {
  const setScrollLocked = useScrollLock();
  const [introOpen, setIntroOpen] = useState(hasIntro);
  const [openingReady, setOpeningReady] = useState(!hasIntro);

  useEffect(() => {
    setScrollLocked(introOpen);
  }, [introOpen, setScrollLocked]);

  useEffect(() => () => setScrollLocked(false), [setScrollLocked]);

  const handleReveal = useCallback(() => {
    setOpeningReady(true);
  }, []);

  const handleComplete = useCallback(() => setIntroOpen(false), []);

  const handleReplay = useCallback(() => {
    setOpeningReady(false);
    setIntroOpen(true);
  }, []);

  return { introOpen, openingReady, handleReveal, handleComplete, handleReplay };
}
