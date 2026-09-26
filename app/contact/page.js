import SiteHeader from '../../src/components/site-header.jsx';
import SiteFooter from '../../src/components/site-footer.jsx';
import ContactForm from '../../src/components/contact-form.jsx';
import { hasSession } from '../../src/lib/session.js';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Contact — OpenMate',
  description: 'Send the OpenMate team a query or a suggestion.',
};

export default async function ContactPage() {
  const signedIn = await hasSession();
  return (
    <div className="min-h-screen bg-paper text-ink">
      <SiteHeader signedIn={signedIn} />
      <main className="mx-auto max-w-2xl px-5 py-24 sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Contact us</p>
        <h1 className="mt-3 font-display text-4xl leading-tight tracking-tight sm:text-5xl">Talk to us</h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
          Send us a <strong>query</strong> if you have a question, or a <strong>suggestion</strong> if
          there is something we could do better. We read every message.
        </p>

        <div className="mt-10">
          <ContactForm />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
