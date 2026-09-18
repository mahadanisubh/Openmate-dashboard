import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Linting belongs to the `npm run lint` gate and the shared flat config, so the build does not
  // re-run Next's own (deprecated) lint path against a different ruleset.
  eslint: { ignoreDuringBuilds: true },
  // Lockfiles exist above this repo; without this Next guesses a workspace root from the nearest
  // one and traces the wrong file set.
  outputFileTracingRoot: dirname(fileURLToPath(import.meta.url)),
};

export default nextConfig;
