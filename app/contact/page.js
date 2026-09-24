import SiteHeader from '../../src/components/site-header.jsx';
import SiteFooter from '../../src/components/site-footer.jsx';

// TODO(human): set the real contact address. While this is null the page states that the channel is
// being set up rather than printing a fabricated address.
const CONTACT_EMAIL = null;

export const metadata = {
  title: 'Contact — OpenMate',
  description: 'Get in touch with the OpenMate team.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 py-24 sm:px-8">
        <h1 className="font-display text-4xl leading-tight tracking-tight sm:text-5xl">Contact</h1>
        {CONTACT_EMAIL ? (
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            Reach us at{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent underline underline-offset-4">
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        ) : (
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            Our contact channel is being set up. Check back shortly, or start free and we will reach out
            as your assistant goes live.
          </p>
        )}
        <a
          href="/#cta"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
        >
          Start free
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M4 10h11M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </main>
      <SiteFooter />
    </div>
  );
}
