import SiteHeader from '../../src/components/site-header.jsx';
import SiteFooter from '../../src/components/site-footer.jsx';
import CodeBlock from '../../src/components/code-block.jsx';

export const metadata = {
  title: 'Install — OpenMate Docs',
  description: 'Add the OpenMate assistant to any website in one script tag. Guides for HTML, React, Next.js, Vue, and Angular.',
};

const SCRIPT = '<script src="http://localhost:8080/widget.js" data-bot-id="YOUR_BOT_ID" defer></script>';

// Platforms share one shape: get the tag into the page's HTML. Each entry says where.
const PLATFORMS = [
  {
    id: 'html',
    title: 'Plain HTML / CSS / JavaScript',
    blurb: 'Paste the tag before the closing </body> tag on every page (or in your shared layout/footer).',
    code: `<!DOCTYPE html>
<html>
  <body>
    <!-- your page content -->

    <script
      src="http://localhost:8080/widget.js"
      data-bot-id="YOUR_BOT_ID"
      defer
    ></script>
  </body>
</html>`,
    note: 'No build step, no framework. If your site has a shared footer file, add it there once and every page gets it.',
  },
  {
    id: 'react',
    title: 'React (Vite / CRA / plain)',
    blurb: 'Add it once to the public index.html — Vite and CRA both serve this file unchanged.',
    code: `<!-- index.html (Vite) or public/index.html (CRA) -->
<body>
  <div id="root"></div>

  <script
    src="http://localhost:8080/widget.js"
    data-bot-id="YOUR_BOT_ID"
    defer
  ></script>
</body>`,
    note: 'Keep it outside <div id="root">: React only manages its own root, so the widget is never touched by re-renders.',
  },
  {
    id: 'react-inject',
    title: 'React — inject at runtime',
    blurb: 'No HTML file to edit? Load the script from a top-level component with an effect.',
    code: `import { useEffect } from 'react';

export default function OpenMateWidget() {
  useEffect(() => {
    const s = document.createElement('script');
    s.src = 'http://localhost:8080/widget.js';
    s.setAttribute('data-bot-id', 'YOUR_BOT_ID');
    s.defer = true;
    document.body.appendChild(s);

    return () => s.remove();
  }, []);

  return null;
}`,
    note: 'Render <OpenMateWidget /> once in App. The cleanup removes the tag on unmount so a hot reload cannot mount two.',
  },
  {
    id: 'next',
    title: 'Next.js (App Router)',
    blurb: 'Use next/script in the root layout so it loads once for the whole app.',
    code: `// app/layout.js
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script
          src="http://localhost:8080/widget.js"
          data-bot-id="YOUR_BOT_ID"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}`,
    note: 'strategy="afterInteractive" keeps the site fast: the widget loads after the page is usable.',
  },
  {
    id: 'next-pages',
    title: 'Next.js (Pages Router)',
    blurb: 'Put it in _app.js so it appears on every route.',
    code: `// pages/_app.js
import Script from 'next/script';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Script
        src="http://localhost:8080/widget.js"
        data-bot-id="YOUR_BOT_ID"
        strategy="afterInteractive"
      />
    </>
  );
}`,
  },
  {
    id: 'vue',
    title: 'Vue (Vite / Vue CLI)',
    blurb: 'Add it to index.html — the Vue app mounts into #app, so the tag sits alongside it.',
    code: `<!-- index.html -->
<body>
  <div id="app"></div>

  <script
    src="http://localhost:8080/widget.js"
    data-bot-id="YOUR_BOT_ID"
    defer
  ></script>
  <script type="module" src="/src/main.js"></script>
</body>`,
    note: 'For Nuxt, put the same tag in nuxt.config or app.html.',
  },
  {
    id: 'angular',
    title: 'Angular',
    blurb: 'Add the tag to src/index.html. Angular only manages <app-root>.',
    code: `<!-- src/index.html -->
<body>
  <app-root></app-root>

  <script
    src="http://localhost:8080/widget.js"
    data-bot-id="YOUR_BOT_ID"
    defer
  ></script>
</body>`,
    note: 'The widget needs no Angular module. If your CSP is strict, allow the script origin (see the checklist below).',
  },
];

const STEPS = [
  { n: 1, title: 'Create your assistant', body: 'Sign up and copy your bot id — the public identifier you paste into the tag.' },
  { n: 2, title: 'Register your website origin', body: 'Add your exact site origin (for example https://acme.com) in the dashboard’s Origins page. Without it, the widget refuses to load.' },
  { n: 3, title: 'Paste the script tag', body: 'Add the tag to your site using the guide for your stack below. One tag, once.' },
  { n: 4, title: 'Check it loads', body: 'Open your site, look for the chat button bottom-right, and ask it a question.' },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 py-24 sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Docs</p>
        <h1 className="mt-3 font-display text-4xl leading-tight tracking-tight sm:text-5xl">Install OpenMate</h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
          One script tag adds the assistant to your website. It works on any stack — pick your platform
          below and copy the snippet.
        </p>

        {/* The single tag every platform uses, so a reader can copy it before choosing a guide. */}
        <div className="mt-10">
          <CodeBlock code={SCRIPT} label="Copy tag" />
        </div>
        <p className="mt-3 text-sm text-muted">
          Paste your own <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-xs ring-1 ring-line">data-bot-id</code>{' '}
          where it says <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-xs ring-1 ring-line">YOUR_BOT_ID</code>.
        </p>

        {/* Before the platform guides: the four steps in plain language. */}
        <h2 className="mt-16 font-display text-2xl font-semibold tracking-tight">In four steps</h2>
        <ol className="mt-6 grid gap-4 sm:grid-cols-2">
          {STEPS.map((s) => (
            <li key={s.n} className="rounded-2xl border border-line bg-surface p-5">
              <div className="flex items-center gap-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent text-xs font-semibold text-white">
                  {s.n}
                </span>
                <h3 className="font-display text-base font-semibold tracking-tight">{s.title}</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
            </li>
          ))}
        </ol>

        <h2 className="mt-16 font-display text-2xl font-semibold tracking-tight">Choose your platform</h2>
        <p className="mt-2 text-sm text-muted">The install is the same tag in every case — only the file changes.</p>

        <div id="platforms" className="mt-8 flex flex-col gap-10">
          {PLATFORMS.map((p) => (
            <section key={p.id} id={p.id} className="scroll-mt-24">
              <h3 className="font-display text-xl font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.blurb}</p>
              <div className="mt-4">
                <CodeBlock code={p.code} />
              </div>
              {p.note ? (
                <p className="mt-3 flex gap-2 text-sm text-muted">
                  <span className="mt-0.5 text-accent" aria-hidden="true">✓</span>
                  {p.note}
                </p>
              ) : null}
            </section>
          ))}
        </div>

        {/* The two things that actually stop an install from working. */}
        <h2 className="mt-16 font-display text-2xl font-semibold tracking-tight">Troubleshooting</h2>
        <dl className="mt-6 flex flex-col gap-5">
          <div className="rounded-2xl border border-line bg-surface p-5">
            <dt className="font-medium">Nothing appears on the page</dt>
            <dd className="mt-1.5 text-sm leading-relaxed text-muted">
              Check the browser console. <strong>&ldquo;ORIGIN_NOT_ALLOWED&rdquo;</strong> means your site&rsquo;s origin is not
              registered — add it in the dashboard&rsquo;s Origins page. The origin must match exactly
              (scheme + host + optional port, no trailing slash).
            </dd>
          </div>
          <div className="rounded-2xl border border-line bg-surface p-5">
            <dt className="font-medium">Blocked by a Content-Security-Policy</dt>
            <dd className="mt-1.5 text-sm leading-relaxed text-muted">
              Allow your OpenMate host in <code className="rounded bg-paper px-1.5 py-0.5 font-mono text-xs ring-1 ring-line">script-src</code>{' '}
              and <code className="rounded bg-paper px-1.5 py-0.5 font-mono text-xs ring-1 ring-line">frame-src</code>.
              The widget mounts a sandboxed iframe, so the frame origin must be allowed too.
            </dd>
          </div>
          <div className="rounded-2xl border border-line bg-surface p-5">
            <dt className="font-medium">It loaded once but disappeared</dt>
            <dd className="mt-1.5 text-sm leading-relaxed text-muted">
              A single-page-app re-render replaced the DOM. Load the script once from an HTML file or a root
              layout (as the guides above do), not inside a component that unmounts.
            </dd>
          </div>
        </dl>

        <div className="mt-16 rounded-2xl border border-accent/30 bg-accent-soft/40 p-6">
          <h2 className="font-display text-xl font-semibold tracking-tight">Ready to add your bot id?</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Create an assistant to get your bot id, then register the site you will embed it on.
          </p>
          <a
            href="/create-assistant"
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent to-mint px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_36px_-12px_rgba(15,122,90,0.9)] transition-transform duration-200 hover:-translate-y-0.5"
          >
            Create your assistant
          </a>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
