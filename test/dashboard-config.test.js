import { test } from 'node:test';
import assert from 'node:assert/strict';

import { apiBase } from '../src/lib/api-client.js';
import { friendlyApiError } from '../src/lib/api-errors.js';
import { buildEmbedTag, widgetBase } from '../src/lib/embed.js';

// T-015: the dashboard's half of the contract. The pages are server components exercised by the
// build; these are the pure seams the pages depend on — the API base, the error mapping a tenant
// sees, and the one embed tag the tenant copies.

const BOT_ID = 'bot_abc123';

test('the api base has no trailing slash', () => {
  process.env.OPENMATE_API_BASE = 'https://api.example.com///';
  assert.equal(apiBase(), 'https://api.example.com');
  delete process.env.OPENMATE_API_BASE;
  assert.equal(apiBase(), 'http://localhost:8080');
});

test('the embed tag is omitted until the tenant has a public bot id', () => {
  assert.equal(buildEmbedTag(''), '');
  assert.equal(buildEmbedTag(null), '');
});

test('the embed tag points at the widget loader and escapes the bot id', () => {
  process.env.OPENMATE_WIDGET_BASE = 'https://cdn.example.com/';
  const tag = buildEmbedTag(BOT_ID);

  assert.equal(
    tag,
    '<script src="https://cdn.example.com/widget.js" data-bot-id="bot_abc123" defer></script>',
  );

  const hostile = buildEmbedTag('bot_"></script><b>x');
  assert.doesNotMatch(hostile, /<\/script><b>x/);
  assert.ok(hostile.includes('data-bot-id="bot_&quot;&gt;&lt;/script&gt;&lt;b&gt;x"'));

  delete process.env.OPENMATE_WIDGET_BASE;
});

test('the widget base falls back to the api base', () => {
  process.env.OPENMATE_API_BASE = 'https://api.example.com/';
  assert.equal(widgetBase(), 'https://api.example.com');
  delete process.env.OPENMATE_API_BASE;
  assert.equal(widgetBase(), 'http://localhost:8080');
});

test('api errors become the message a tenant can act on', () => {
  assert.equal(friendlyApiError({ error: 'INVALID_API_KEY' }, 'fallback'), 'That API key was not recognised.');
  assert.equal(friendlyApiError({ error: 'QUOTA_EXCEEDED' }, 'fallback'), 'This upload would exceed the tenant’s document quota.');
  assert.equal(friendlyApiError({ error: 'MONTHLY_QUOTA_EXCEEDED', message: 'the limit was reached' }, 'fallback'), 'the limit was reached');
  assert.equal(friendlyApiError(null, 'fallback'), 'fallback');
});
