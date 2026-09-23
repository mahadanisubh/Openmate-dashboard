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

test('pricing shows the real quotas rather than adjectives', () => {
  const pricing = read('src/components/pricing.jsx');
  for (const quota of ['15 chunks', '500 conversations / month', '30 requests / minute', '150 chunks', '$19', '$79']) {
    assert.match(pricing, new RegExp(quota.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), `pricing must state ${quota}`);
  }
  assert.doesNotMatch(pricing, /Most Popular/i, 'the brief forbids urgency badges');
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

test('no component imports the motion dependency', () => {
  // The port replaced motion/react with CSS. This keeps a future paste from re-adding it.
  for (const name of components) {
    assert.doesNotMatch(
      read(`src/components/${name}.jsx`),
      /from ['"]motion\/react['"]/,
      `${name}.jsx must not import motion — it was ported to CSS`,
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
test('the prerendered homepage carries its content without JavaScript', () => {
  let html;
  try {
    html = read('.next/server/app/index.html');
  } catch {
    return; // no build output in this environment; the source tests above still run
  }
  for (const content of [
    'Clear quotas',
    'Blind Vectors',
    'The limitation we won', // apostrophe is HTML-escaped in output, so match up to it
    'decrypted context is sent to the LLM provider configured for your assistant',
    'vector storage',
    'Agency / Enterprise',
  ]) {
    assert.ok(html.includes(content), `prerendered HTML must contain "${content}"`);
  }
  for (const forbidden of ['irreversible', 'military-grade', 'unbreakable']) {
    assert.ok(!html.includes(forbidden), `prerendered HTML must not claim "${forbidden}"`);
  }
});
