# Openmate-dashboard

Tenant administration: document upload, bot appearance, origin allowlisting, webhook management, and
embed-tag copy. Next.js App Router, deployed to Vercel.
([ADR-008](https://github.com/mahadanisubh/Openmate/blob/main/10-DECISION-LOG.md)).

The dashboard talks to the API through a small hand-written client in `src/lib/api-client.js`
(`apiGet` / `apiPut` / `apiPost` / `apiUpload`). It treats every response as a value —
`{ ok, status, data }` — so a config surface can branch on a machine error code and render a
specific notice rather than a generic failure.

## Scripts

```bash
npm install        # dependencies + dev toolchain — run once after cloning
npm run build      # next build
npm run dev        # local dev server
```

## Status

Implemented.

- **Homepage at `/`** — server components by default with the interactive work isolated to
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
