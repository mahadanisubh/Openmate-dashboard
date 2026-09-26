import SiteHeader from '../src/components/site-header.jsx';
import Hero from '../src/components/hero.jsx';
import Marquee from '../src/components/marquee.jsx';
import UseCases from '../src/components/use-cases.jsx';
import WhyOpenMate from '../src/components/why-openmate.jsx';
import BeforeAfter from '../src/components/before-after.jsx';
// Parked for the v1 launch. Re-enable together with the /privacy and /terms routes:
//   import ProofPrivacy from '../src/components/proof-privacy.jsx';
//   import Numbers from '../src/components/numbers.jsx';
//   import ForAgencies from '../src/components/for-agencies.jsx';
import FinalCta from '../src/components/final-cta.jsx';
import SiteFooter from '../src/components/site-footer.jsx';
import { hasSession } from '../src/lib/session.js';

export const dynamic = 'force-dynamic';

// The marketing homepage. Server components by default; the only interactive
// islands are the chat widget preview, the reveal wrapper, the count-up, and the
// header's scroll state. Reads end to end with JavaScript disabled through pricing.
export default async function Page() {
  // A display hint only: a signed-in visitor sees "Go to dashboard" instead of the create CTA. The
  // tenant is still verified by the API on every dashboard request.
  const signedIn = await hasSession();
  return (
    <div className="relative min-h-screen bg-paper text-ink">
      <a
        href="#usecases"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>
      <SiteHeader overlay signedIn={signedIn} />
      <main>
        <Hero signedIn={signedIn} />
        <Marquee />
        <UseCases />
        <WhyOpenMate />
        <BeforeAfter />
        {/* Parked for the v1 launch — re-enable when /privacy and /terms ship. */}
        {/* <ProofPrivacy /> */}
        {/* <Numbers /> */}
        {/* <ForAgencies /> */}
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  );
}
