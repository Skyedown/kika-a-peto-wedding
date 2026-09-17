import { createContext, useContext } from 'react';

export type SetScrollLocked = (locked: boolean) => void;

function noopScrollLock(): void {}

export const ScrollLockContext = createContext<SetScrollLocked>(noopScrollLock);

export function useScrollLock(): SetScrollLocked {
  return useContext(ScrollLockContext);
}
