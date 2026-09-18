/** @type {import('next').NextConfig} */
const nextConfig = {
  // Linting belongs to the `npm run lint` gate and the shared flat config, so the build does not
  // re-run Next's own (deprecated) lint path against a different ruleset.
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
