import { useParams } from 'react-router-dom';
import { findGuest, resolveFormUrl } from '@data/guests';
import { WeddingLayout } from '@pages/WeddingLayout';
import { NotFoundPage } from '@pages/NotFoundPage';

// Private personalised invite at /:slug — shows the full site plus a
// personalised RSVP banner. Unknown slugs fall through to the 404 page.
export const InvitePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const guest = slug ? findGuest(slug) : undefined;

  if (!guest) {
    return <NotFoundPage />;
  }

  const formUrl = resolveFormUrl(guest);
  const singular = !guest.slug.includes('-a-');

  return <WeddingLayout invite={{ names: guest.names, formUrl, singular, gender: guest.gender }} rsvpUrl={formUrl} />;
};
