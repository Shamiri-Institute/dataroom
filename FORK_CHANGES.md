# Shamiri Dataroom — Fork Customizations

This repo is Shamiri Institute's self-hosted fork of [Papermark](https://github.com/mfts/papermark).
This document is the canonical list of intentional differences from upstream. **Read it before
every upstream sync** — many of these changes live in code upstream refactors freely, so they can
be silently lost in a merge. Last reconciled with upstream: 2026-07-07 (branch `sync-upstream`).

## Policy decisions (confirmed by maintainer, 2026-07-07)

- **Plan gating**: keep the hardcoded-override approach (below), NOT a DB-plan approach.
- **Tinybird**: track upstream's pipe versions; deploy matching pipes to the Shamiri workspace.
- **Email**: hardcoded `replyTo: osborn@shamiri.institute` for all mail and removal of the
  test-mode redirect are intentional — keep as-is.

## 1. Plan gating / billing — everything unlocked

The deployment runs as an unlimited "datarooms-plus" instance:

- `lib/swr/use-billing.ts` — `usePlan()` hardcoded: `isFree/isStarter/isPro/isBusiness = false`,
  `isDatarooms = true`, `isDataroomsPlus = true`, regardless of DB plan.
- `ee/limits/swr-handler.ts` — `useLimits()` hardcoded: `canAddDocuments/canAddLinks/canAddUsers
  = true`, `showUpgradePlanModal = false`, sidebar limits `undefined`.
- Server-side checks commented out (kept commented, not deleted, so they're easy to restore):
  dataroom creation plan/count caps (`pages/api/teams/[teamId]/datarooms/index.ts`), add document
  to dataroom, add folder to dataroom, generate dataroom file index, team invite seat caps,
  viewers API free-plan 404, custom-domain paid-plan check (`lib/team/helper.ts`).
- UI de-gating: sidebar Datarooms/Visitors always enabled; Pro banners, upgrade modals, and
  dataroom-trial CTAs removed; branding page always saveable.
- `lib/utils/get-file-size-limits.ts` — limits hardcoded: video 500 MB, document 1000 MB,
  image 1000 MB, excel 40 MB, maxFiles 500, maxPages 500 (per-team overrides bypassed).

**Sync hazard**: new upstream plan-gated features silently take the datarooms-plus path via the
hardcoded `usePlan()`; new *server-side* gates in flows we use must be neutralized manually.

## 2. Auth

- `pages/api/auth/[...nextauth].ts` — `signIn` callback allows only emails ending in
  `@shamiri.institute` or `@shamirihealth.com` (all providers).
- Providers: Google + magic-link email only. Hanko/passkey and LinkedIn login removed.
- Session cookie domain derived from `NEXT_PUBLIC_BASE_URL` hostname (not `.papermark.com`).

## 3. Branding

- App title "Shamiri Dataroom"; Papermark OG/Twitter meta removed; `metadataBase` =
  `https://dataroom.shamiri.institute`; per-link `CustomMetaTag` on viewer pages disabled.
- Email links point at `dataroom.shamiri.institute`; OTP email says "Shamiri".
- `middleware.ts` treats `shamiri.institute` hosts as first-party.
- Plausible analytics domain `shamiri.institute`; PlausibleProvider removed from app router layout.

## 4. Email (lib/resend.ts)

- From: marketing/default `Tom from Shamiri <dataroom@shamiri.institute>`, system/verify
  `Shamiri <dataroom@shamiri.institute>`, scheduled `Tom Osborn <dataroom@shamiri.institute>`.
- `replyTo` hardcoded to `osborn@shamiri.institute` for ALL email (intentional).
- Test-mode `delivered@resend.dev` redirect removed (intentional).
- Support mailto: `support-papermark@shamiri.institute`.
- `nodemailer` + `@types/nodemailer` are fork-added dependencies.

## 5. Infra

- **S3** (`ee/features/storage/config.ts`): single storage config — the `_US` env-var suffix
  logic for `us-east-2` is removed; always use unsuffixed `NEXT_PRIVATE_UPLOAD_*` vars.
  `af-south-1` added to `StorageRegion`. (Deletes upstream's dual-region capability — intended.)
- **trigger.dev** (`trigger.config.ts`): project ref `proj_yjzqjdmwcponnojesbcw`; public access
  token expiration `1hr`.
- **Tinybird**: pipes follow upstream versions; deploy matching pipe definitions to the Shamiri
  workspace when upstream bumps them. Repo has tinybird-cli tooling (`pyproject.toml`, uv).
- `.gitignore` ignores `.claude/`.

## Upstream sync procedure (what worked in 2026-07)

1. `git fetch upstream` (`upstream` = https://github.com/mfts/papermark.git), merge
   `upstream/main` on a branch.
2. Resolve conflicts: adopt upstream structure, re-apply the behaviors above.
3. **Audit beyond conflicts**: check every item above against the merged tree — upstream moves
   code, so customizations can vanish without a conflict.
4. Take upstream's `package-lock.json`, re-add fork deps to `package.json`, run `npm install`.
5. Typecheck/build before merging to `main`.

## Private EE modules (discovered 2026-07 sync)

Upstream now develops in a private superset repo; the public repo's pages import
modules that are NOT published. **Upstream `main` does not build standalone.**
Two strategies used here, in order of preference:

1. **Stub the missing module** (keeps upstream's newer components). Stubs live at
   the exact import paths and are marked with `// Shamiri stub:`:
   `ee/features/branding/lib/{dataroom-viewer-layout,dataroom-banner,use-logo-tone,resolve-public-link-meta,use-branding-preview-params,dataroom-preview-presets}`,
   `ee/features/conversations/components/viewer/conversation-sidebar-provider`,
   `ee/features/request-lists/{components/viewer/*,lib/events,lib/swr/use-viewer-request-list}`,
   `ee/features/permissions/components/confidential-view/{-overlay,-section}`,
   `ee/stripe/currency`, `lib/oauth/scopes`, `lib/api/errors`.
2. **Pin the file to the fork-era version** when upstream's version is an editor/UI
   for a wholly private feature: both branding pages + both branding API routes
   (`pages/branding.tsx`, `pages/datarooms/[id]/branding/index.tsx`,
   `pages/api/teams/[teamId]/branding.ts`, `.../datarooms/[id]/branding.ts`),
   `pages/settings/tokens.tsx` + `pages/api/teams/[teamId]/tokens/index.ts`,
   `pages/api/teams/index.ts`, `remove-teammate.ts`, `datarooms/trial.ts`,
   `domains/[domain]/verify.ts`, `pages/settings/presets/*`,
   `pages/datarooms/[id]/settings/index.tsx`. Deleted: request-list tasks page,
   dataroom questions API, conversation-mention job, passkey/security pages.
   (The ppreview demo pages were initially deleted too, but the pinned branding
   pages embed them in preview iframes — they were re-adopted verbatim from
   upstream with the two branding stubs above backing them.)

## Build requirements (self-hosted)

- Several upstream modules threw at import time without env vars; made lazy in
  the fork: OpenAI clients (`lib/openai.ts`, `ee/features/ai/lib/models/openai.ts`),
  Slack (`lib/integrations/slack/events.ts`), Stripe (`ee/stripe/index.ts` —
  clients memoized inside `stripeInstance()`; the eager `new Stripe("")` threw at
  import and 500'd every `/api/auth/*` route when `STRIPE_SECRET_KEY*` are unset).
  Host-gated rules in `next.config.mjs` are emitted only when their env vars are set.
- `npm run build` works without any env vars (Upstash/QStash warnings are
  non-fatal). Type-checking is clean (`npx tsc --noEmit`) — keep it that way;
  upstream's public repo is NOT type-clean, so expect to patch new type errors
  (usually `as any` casts in Stripe/billing code) on every sync.
- Fork-added deps: `nodemailer`, `@types/nodemailer`, `@react-email/components`
  (upstream's ee email templates import it but their public package.json lost it).
