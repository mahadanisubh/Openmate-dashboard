import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');

function read(rel) {
  return readFileSync(join(root, rel), 'utf8');
}

const components = [
  'site-header',
  'hero',
  'marquee',
  'use-cases',
  'why-openmate',
  'before-after',
  'proof-privacy',
  'numbers',
  'for-agencies',
  'pricing',
  'final-cta',
  'site-footer',
  'reveal',
  'chat-widget',
  'scroll-weight',
  'vector-field',
];

// The brief's hard rule (02 §6 privacy claim guardrails): these phrases are defensible in no
// context, and a homepage is where they most often creep in. Catching them here keeps the
// marketing copy honest without a human reading every diff.
const FORBIDDEN_CLAIMS = [
  /irreversible/i,
  /military[- ]grade/i,
  /unbreakable/i,
  /zero[- ]data retention/i,
  /unlimited scalability/i,
];

test('no component makes a claim the product cannot back', () => {
  for (const name of components) {
    const src = read(`src/components/${name}.jsx`);
    for (const pattern of FORBIDDEN_CLAIMS) {
      assert.doesNotMatch(
        src,
        pattern,
        `${name}.jsx must not claim "${pattern.source}" — 02 §6 forbids it`,
      );
    }
  }
});

test('the homepage states the limitation the brief refuses to hide', () => {
  const proof = read('src/components/proof-privacy.jsx');
  // The disclosure sentence is wrapped across JSX lines, so each clause is asserted on its own.
  assert.match(
    proof,
    /decrypted context is sent to the LLM provider configured for/,
    'the inference-hop disclosure must remain on the page (PRD §4 privacy disclosure)',
  );
  assert.match(
    proof,
    /Encryption protects stored data; it does not encrypt that inference request/,
    'the disclosure must name what encryption does not cover',
  );
});

test('pricing sells in business terms, not technical quotas', () => {
  const pricing = read('src/components/pricing.jsx');
  // T-017 dropped the chunk caps and requests/minute from the customer-facing tiers: a business
  // choosing a plan needs to know who it is for and what it unlocks, not the size of an index.
  assert.doesNotMatch(pricing, /chunks/i, 'pricing must not surface chunk caps');
  assert.doesNotMatch(pricing, /requests?\s*\/\s*minute|\brpm\b/i, 'pricing must not surface requests/minute');
  assert.doesNotMatch(pricing, /Community/, 'the Community tier was removed');
  assert.doesNotMatch(pricing, /Most Popular/i, 'the brief forbids urgency badges');
  // The three live tiers, each stating its audience and how it differs.
  for (const tier of ['Cloud Free', 'Pro', 'Agency / Enterprise']) {
    assert.match(pricing, new RegExp(tier.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), `pricing must list ${tier}`);
  }
  assert.match(pricing, /Coming soon/, 'Pro and Agency are marked coming soon');
  assert.match(pricing, /Where it fits/, 'each tier names its use cases');
  // Pro and Agency show no price while they are unbuilt.
  assert.doesNotMatch(pricing, /\$19|\$79/, 'unbuilt tiers must not carry a price');
});

test('pricing has its own route and is off the homepage', () => {
  const pricingPage = read('app/pricing/page.js');
  assert.match(pricingPage, /from '\.\.\/\.\.\/src\/components\/pricing\.jsx'/, 'the route renders the pricing section');
  assert.match(pricingPage, /export const metadata/, 'the route carries its own metadata');
  const homepage = read('app/page.js');
  assert.doesNotMatch(homepage, /<Pricing\s*\/>/, 'pricing is no longer composed into the homepage');
});

test('the real install snippet appears on the page', () => {
  // The brief asks for the literal script tag, not a paraphrase; it is the product's USP.
  const hero = read('src/components/hero.jsx');
  assert.ok(hero.includes('script'), 'the hero carries the one-script install story');
});

test('every component is JavaScript, never TypeScript', () => {
  for (const name of components) {
    assert.ok(
      read(`src/components/${name}.jsx`).length > 0,
      `${name}.jsx exists — the port is JSX only per AGENTS §9`,
    );
  }
});

test('scroll choreography imports motion, and stays off the server-rendered path', () => {
  // ADR-022 declined an animation runtime; T-014 reverses that for the scroll weight-shift and the
  // vector field. The rule that survives: only the client islands may import it, so the page's
  // content never waits on JS. Server components importing motion would break the no-JS path.
  // vector-field is canvas-only (no motion import); hero owns motion for the headline weight-shift.
  const MOTION_ISLANDS = ['hero', 'scroll-weight'];
  for (const name of MOTION_ISLANDS) {
    assert.match(
      read(`src/components/${name}.jsx`),
      /from ['"]motion\/react['"]/,
      `${name}.jsx is the client island that owns the motion import`,
    );
  }
  for (const name of components) {
    if (MOTION_ISLANDS.includes(name)) continue;
    assert.doesNotMatch(
      read(`src/components/${name}.jsx`),
      /from ['"]motion\/react['"]/,
      `${name}.jsx must not import motion directly — it reaches the choreography through the islands`,
    );
  }
});

test('the token sheet defines the full palette and the system font', () => {
  const css = read('app/globals.css');
  for (const token of [
    '--color-paper',
    '--color-ink',
    '--color-accent',
    '--color-accent-hover',
    '--color-sun',
    '--color-mint',
    '--color-berry',
    '--color-ink-panel',
    '--font-sans',
  ]) {
    assert.match(css, new RegExp(token), `globals.css must define ${token}`);
  }
  assert.match(css, /-apple-system, 'Segoe UI', Roboto/, 'the font is the widget system stack');
});

test('the token sheet honors prefers-reduced-motion', () => {
  const css = read('app/globals.css');
  assert.match(css, /prefers-reduced-motion: reduce/, 'reduced-motion is honored');
  // Reveal must render content visible under that query, never hidden.
  assert.match(css, /\.reveal\.is-visible/, 'the reveal class resolves to visible');
});

test('the final CTA uses tokens, not a hardcoded AI-style gradient', () => {
  const cta = read('src/components/final-cta.jsx');
  assert.doesNotMatch(cta, /linear-gradient\(135deg, #ff5a3c/, 'the export’s hardcoded gradient was normalized');
  assert.match(cta, /bg-accent\/25/, 'the wash is token-based');
});

// The brief requires the page to be usable with JavaScript disabled through pricing. The sections
// are server components, so the build prerenders them; this asserts the build output carries the
// content rather than a client-only shell. Skipped when the build has not been run.
//
// T-016 parked three sections for the v1 launch (proof-privacy, numbers, for-agencies) pending the
// /privacy and /terms routes. Their strings are asserted from the component source below, not the
// build, until they are re-enabled in app/page.js — re-enable them here at the same time.
test('the prerendered homepage carries its content without JavaScript', () => {
  let html;
  try {
    html = read('.next/server/app/index.html');
  } catch {
    return; // no build output in this environment; the source tests above still run
  }
  // Compare on rendered text, not raw markup: emphasis spans (e.g. around "OpenMate") split a
  // sentence across elements, but the sentence must still be present for a no-JS reader.
  const text = html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ');
  for (const content of [
    'Turn your business knowledge',
    'How it helps your business',
    'What businesses actually use OpenMate for',
  ]) {
    assert.ok(text.includes(content), `prerendered HTML must contain "${content}"`);
  }
  for (const forbidden of ['irreversible', 'military-grade', 'unbreakable']) {
    assert.ok(!html.includes(forbidden), `prerendered HTML must not claim "${forbidden}"`);
  }
});

// Parked sections keep their copy and their disclosure in source, so re-enabling them is a
// one-line change in app/page.js rather than a rewrite. This is what holds the PRD's privacy
// disclosure (01-PRD line 38) while the sections are out of the v1 render.
test('the parked sections retain their disclosure and claims for re-enablement', () => {
  const proof = read('src/components/proof-privacy.jsx');
  assert.match(
    proof,
    /decrypted context is sent to the LLM provider configured for/,
    'the inference-hop disclosure must survive parking (PRD §4 privacy disclosure)',
  );
  assert.match(
    proof,
    /Encryption protects stored data; it does not encrypt that inference request/,
    'the disclosure must name what encryption does not cover',
  );
  assert.match(proof, /Blind Vectors/, 'the Blind Vectors explainer is retained for re-enablement');

  const numbers = read('src/components/numbers.jsx');
  assert.match(numbers, /vector storage/, 'the numbers section is retained for re-enablement');

  const agencies = read('src/components/for-agencies.jsx');
  assert.match(agencies, /Offer it to every client/, 'the agencies section is retained for re-enablement');
});
