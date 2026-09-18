import { test } from 'node:test';
import assert from 'node:assert/strict';

import { DASHBOARD_VERSION } from '../src/version.js';

test('dashboard exposes its version surface', () => {
  assert.equal(typeof DASHBOARD_VERSION, 'string');
  assert.match(DASHBOARD_VERSION, /^\d+\.\d+\.\d+/);
});
