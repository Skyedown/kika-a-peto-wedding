import { Grain } from '@atoms/Grain/Grain';
import { Hero } from '@organisms/Hero/Hero';
import { OurStory } from '@organisms/OurStory/OurStory';
import { WeddingDetails } from '@organisms/WeddingDetails/WeddingDetails';
import { Schedule } from '@organisms/Schedule/Schedule';
import { Accommodation } from '@organisms/Accommodation/Accommodation';
import { GiftRegistry } from '@organisms/GiftRegistry/GiftRegistry';
import { FAQ } from '@organisms/FAQ/FAQ';
import { Footer } from '@organisms/Footer/Footer';
import { CountdownBanner } from '@organisms/CountdownBanner/CountdownBanner';
import { SilkBackdrop } from '@organisms/SilkBackdrop/SilkBackdrop';
import { EnvelopeIntro } from '@organisms/EnvelopeIntro/EnvelopeIntro';
import { InviteBlock } from '@molecules/InviteBlock/InviteBlock';
import { AudioToggle } from '@atoms/AudioToggle/AudioToggle';
import { useRevealAnimations } from '@hooks/useRevealAnimations';
import { useIntroFlow } from '@hooks/useIntroFlow';
import { DEFAULT_FORM_URL, type Gender } from '@data/guests';
import './WeddingLayout.less';

export interface InviteDetails {
  names: string;
  formUrl: string;
  singular?: boolean;
  gender?: Gender | undefined;
}

export interface WeddingLayoutProps {
  invite?: InviteDetails;
  rsvpUrl?: string;
}

export const WeddingLayout = ({ invite, rsvpUrl = DEFAULT_FORM_URL }: WeddingLayoutProps) => {
  const { introOpen, openingReady, handleReveal, handleComplete, handleReplay } = useIntroFlow(Boolean(invite));
  useRevealAnimations(openingReady);

  return (
    <>
      <Grain />
      <SilkBackdrop />
      <AudioToggle />

      {invite && introOpen && (
        <EnvelopeIntro recipient={invite.names} onReveal={handleReveal} onComplete={handleComplete} />
      )}

      {invite && (
        <div className="opening">
          <Hero compact singular={invite.singular ?? false} />
          <InviteBlock
            names={invite.names}
            formUrl={invite.formUrl}
            singular={invite.singular ?? false}
            gender={invite.gender}
            onReplay={handleReplay}
          />
        </div>
      )}

      <main id="content">
        {!invite && <Hero />}
        <OurStory />
        <WeddingDetails />
        <Schedule rsvpUrl={rsvpUrl} />
        <Accommodation />
        <GiftRegistry />
        <CountdownBanner rsvpUrl={rsvpUrl} />
        <FAQ />
        <Footer rsvpUrl={rsvpUrl} />
      </main>
    </>
  );
};
