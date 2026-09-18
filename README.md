# Openmate-dashboard

Tenant administration: document upload, bot appearance, origin allowlisting, webhook management, and
embed-tag copy. Next.js App Router, deployed to Vercel. Plain ESM JavaScript, no TypeScript
([ADR-008](https://github.com/mahadanisubh/Openmate/blob/main/10-DECISION-LOG.md)).

The dashboard's API client is generated from the API repo's OpenAPI spec rather than hand-written,
so the two repos stay in step through a machine-checked artifact (ADR-003 §3).

## Scripts

```bash
npm install        # dependencies + dev toolchain — run once after cloning
npm run lint       # ESLint (flat config)
npm run build      # next build
npm test           # node:test, no test framework dependency
npm run dev        # local dev server
npm run format     # Prettier
```

## Why Next 15 and not 14

The spec calls for "Next.js 14+" (07-REPO-TOPOLOGY.md). ESLint 9 uses the flat config format, which
Next 14 cannot read, so the dashboard pins Next 15.1+ — still within the documented range — and lints
through the same shared flat config as the other three repos. In `next.config.mjs` the build is told
not to run its own lint pass: linting is the `npm run lint` gate's job, run in CI before the build
against that same config, so nothing is unchecked — it is just not checked twice by two rulesets.

## Status

Scaffold only. `app/` has a root layout and a placeholder page; the real configuration surfaces
arrive with roadmap M5.
