import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from '@pages/HomePage';
import { InvitePage } from '@pages/InvitePage';
import { NotFoundPage } from '@pages/NotFoundPage';
import { useSmoothScroll } from '@hooks/useSmoothScroll';
import { ScrollLockContext } from '@hooks/useScrollLock';

export const App = () => {
  const [scrollLocked, setScrollLocked] = useState(false);
  // Lenis smooth scroll, wired into the GSAP ticker — same feel as the prototype.
  useSmoothScroll(scrollLocked);

  return (
    <ScrollLockContext.Provider value={setScrollLocked}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:slug" element={<InvitePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ScrollLockContext.Provider>
  );
};
