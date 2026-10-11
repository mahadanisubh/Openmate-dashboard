# Openmate-dashboard

Tenant administration: document upload, bot appearance, origin allowlisting, webhook management, and
embed-tag copy. Next.js App Router, deployed to Vercel. Plain ESM JavaScript, no TypeScript
([ADR-008](https://github.com/mahadanisubh/Openmate/blob/main/10-DECISION-LOG.md)).

The dashboard talks to the API through a small hand-written client in `src/lib/api-client.js`
(`apiGet` / `apiPut` / `apiPost` / `apiUpload`). It treats every response as a value —
`{ ok, status, data }` — so a config surface can branch on a machine error code and render a
specific notice rather than a generic failure.

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

Implemented.

- **Marketing homepage at `/`** — server components by default with the interactive work isolated to
  small islands (chat preview, scroll reveal, count-up, header scroll state), so the page reads end
  to end with JavaScript disabled. `/pricing`, `/docs`, `/contact`, and `/create-assistant` complete
  the public surface.
- **Tenant dashboard under `/dashboard`** — overview (usage against the tier cap, recent documents,
  embed-tag copy), `/documents`, `/appearance`, `/origins`, `/webhooks`, `/embed`, and
  `/create-assistant`, each writing through to the API via server actions in `src/actions/`.
- **Auth** — email/password plus Google sign-in (`app/api/auth/google/`), with the session carried in
  a cookie that `middleware.js` uses to gate `/dashboard/*`.
- **API client** — `src/lib/api-client.js` treats errors as values (`{ ok, data, error }`) so a
  config surface can render a specific notice rather than a generic failure.
