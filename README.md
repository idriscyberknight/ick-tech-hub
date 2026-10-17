# ICK Technologies — Corporate Website

ICK Technologies is an emerging, Nigeria-first, Africa-rooted technology initiative with global aspirations. Corporate philosophy: **Integrated Technology & Human Progress**. This repository uses **TanStack Start / TanStack Router, React, TypeScript, Vite and Tailwind CSS**. Consultation topics are not promises of available services; no legal status, clients, awards or team credentials are implied.

## Current snapshot — as of 2026-10-17

Local source was inspected for this documentation update. External infrastructure, PR and hosting facts below come from the founder's verified Phase 03 audit, not fresh remote checks in this docs-only step.

| Area | Current state |
| --- | --- |
| Corporate pages | Home, About, Services, three service detail pages, Products, Discuss Project, Contact, Privacy, Terms and 404 exist on main. Controlled Home/About/Services refinement followed Sprint 04. |
| Project inquiry | Non-operational preview: `inquiryPreviewPolicy` has `submissionEnabled=false`, `backendEnabled=false`, `persistenceEnabled=false`. No contact intake is enabled. |
| AI Topic Finder | Added October 15; Option A on October 16 made it default OFF. Server-only `TOPIC_ADVISOR_ENABLED` must equal literal `"true"` before gateway code is imported/called. The UI hides text input when OFF or status is unavailable and retains static topic links. Server capability exists in code; inference and activation are not authorized. |
| Logo and favicon | Approved monogram integrated October 17 at `public/ick-monogram.png`, used in shared Header/Footer. Root head declares `rel=icon` for `/favicon.png` (`public/favicon.png`). Do not recreate assets. |
| Legal and launch | Privacy and Terms are drafts pending legal review. Website was unpublished at the last pre-change check; no production-readiness claim. No payment, login or analytics is enabled. |

Do not enter confidential or personal project information into previews. If explicitly enabled later, AI text would be sent to Lovable AI Gateway and its model provider; third-party retention and training practices are not verified. No centralized/distributed rate limiter or verified spending ceiling is in place. Google Fonts may make third-party requests. AI Option B and any rollout require separate approval.

## Internal code vs external infrastructure

Lovable Cloud database remains disabled. A separate external Supabase project exists; this is not a claim that this frontend accepts inquiries or that branch-only admin code is deployed.

- External Supabase already has three applied Sprint 05 migrations: `project_inquiries` default deny, private admin allowlist default deny, and single active founder limit. RLS has no policies intentionally (deny by default). These three migrations are missing from tracked GitHub main and PR #2; source-of-truth reconciliation is pending. Do not apply migrations now.
- External Edge Function `submit-project-inquiry` v3 is deployed but CLOSED BY DESIGN: POST returns 503 and accepts no inquiries. No active admin member exists; `public.is_founder_admin()` RPC is not deployed.
- PR [#2](https://github.com/idriscyberknight/ick-tech-hub/pull/2), **Sprint 05: Founder Admin Security Scaffold — Review Required**, is OPEN and UNMERGED on `feature/sprint-05-admin-auth`, reported head `74bf7eae3fc1971154927be5bd25db6d1368e096`. Admin auth scaffold and `20261011130000_founder_admin_authorization.sql` exist only in that branch, not main and not applied to Supabase. One Supabase Preview check is skipped; app CI security verification remains pending. Main has later Lovable work beyond the PR's old fork point; there is no merge approval.

ICK Opportunities is strictly separate and paused: no integration or modification is authorized, regardless of older product wording.

## Validation and documentation boundaries

Historical reported results: Option A had 45 focused tests passing with scoped formatting lint debt; Logo Phase 02 had 35 focused tests passing, TypeScript and automatic preview build OK, and 21 targeted formatting lint errors. The refinement report's 234 errors / 6 warnings describe its earlier lint run, not today's count. None establishes current all-tests-green status or production readiness; tests, TypeScript, lint and app build were not rerun for this docs-only patch.

Pending gates include legitimate source-of-truth and external migration reconciliation, PR #2 review, app CI, secret scan, privacy/legal approval, accessibility/performance verification and controlled launch approvals.

Workspace knowledge v1 remains overarching business direction. Project knowledge is currently empty according to the founder's Phase 03 audit; this patch does not update either knowledge store. A future v2 project knowledge draft requires separate founder approval.

## Development

Install dependencies using the project lockfile and run:

```sh
bun install --frozen-lockfile
bun run dev
bunx vitest run
bun run lint
bun run build
```

These existing local commands are for development, not deployment authorization. No dependencies were installed for this documentation update.

[SPRINT-01](SPRINT-01.md), [SPRINT-02](SPRINT-02.md), [SPRINT-03](SPRINT-03.md), [SPRINT-04](SPRINT-04.md) and [FRONTEND-REFINEMENT](FRONTEND-REFINEMENT.md) are historical snapshots of their respective work, not current status; they remain unchanged. See [roadmap](roadmap.md) for later phases and pending approvals. This update authorizes no activation, migration, merge, deployment or publishing.
