import SiteHeader from '../../src/components/site-header.jsx';
import SiteFooter from '../../src/components/site-footer.jsx';

export const metadata = {
  title: 'Docs — OpenMate',
  description: 'Documentation for installing and running OpenMate on your website.',
};

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 py-24 sm:px-8">
        <h1 className="font-display text-4xl leading-tight tracking-tight sm:text-5xl">Documentation</h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
          The full documentation is being written. In the meantime, the homepage explains how OpenMate
          works end to end — from the one-script install to how your knowledge is handled.
        </p>
        <a
          href="/#usecases"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
        >
          See how it works
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M4 10h11M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </main>
      <SiteFooter />
    </div>
  );
}
