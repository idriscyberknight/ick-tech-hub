<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Architecture
- Keep the existing TanStack Start/Vite routing foundation; do not replace the framework for this frontend sprint.
- Shared site chrome wraps one main element and the Outlet in the root route, so all content pages have consistent accessible navigation.
- Use services.tsx as an Outlet layout with services.index.tsx as its content leaf, so service detail pages render correctly.
- Keep corporate data and metadata helpers in a browser-safe shared module to avoid inconsistent content between pages.
- Keep corporate content informational, the inquiry form a non-operational preview, and the Services AI capability default OFF; these distinct boundaries prevent code presence from being mistaken for authorized intake or live services.
- Reuse corporate values and intended approach sections across Home and About, with canonical statements in the shared content module, to keep approved content consistent.
- Keep consultation-detail and product-direction content in a separate browser-safe module with a reusable discovery section, so topic refinements leave approved Home/About wording unchanged.
- Scope corporate refinement styles beneath the existing page wrappers and reuse established site components, so unrelated routes and the inquiry preview retain their presentation and behavior.
- The Services topic finder is the only AI feature: it calls Lovable AI Gateway from a server function, never stores visitor text, and enforces length and per-visitor rate limits from a shared rules module, so cost and privacy boundaries stay testable. It stays off unless the server flag TOPIC_ADVISOR_ENABLED is exactly "true" and requires explicit visitor consent, so it fails closed.

## Current / do-not-touch boundaries — 2026-10-17
- AI stays default OFF: server-only `TOPIC_ADVISOR_ENABLED` must be literal `"true"` before gateway import/call; UI defaults OFF and hides text entry when status is OFF/unavailable. Do not set the flag, add bypasses or make inference calls without separate approval. Current in-memory limits are not centralized/distributed protection or a verified spending ceiling.
- Preserve `inquiryPreviewPolicy`: `submissionEnabled=false`, `backendEnabled=false`, `persistenceEnabled=false`; no inquiry/contact intake, login, payment or analytics activation is authorized. Privacy/Terms are drafts; do not guarantee provider retention/training behavior or legal approval.
- Reuse the approved raster `public/ick-monogram.png` in shared Header/Footer and existing `public/favicon.png` via root `rel=icon`; do not regenerate assets or redesign branding.
- External Supabase is separate from disabled Lovable Cloud DB. Founder audit reports three already-applied Sprint 05 migrations (inquiries default deny, private admin allowlist default deny, single active founder limit), missing from tracked main/PR. Preserve intentional no-policy RLS deny-by-default; do not apply SQL, alter DB/RLS/auth, enable Cloud or modify the deployed-but-closed `submit-project-inquiry` v3 (POST 503). No active admin member or deployed `public.is_founder_admin()` RPC is reported.
- PR #2, `Sprint 05: Founder Admin Security Scaffold — Review Required`, remains OPEN/UNMERGED on `feature/sprint-05-admin-auth` (reported head `74bf7eae3fc1971154927be5bd25db6d1368e096`). Admin scaffold and `20261011130000_founder_admin_authorization.sql` are branch-only, not main or applied DB state. Do not modify admin/founder/session/Supabase code, PRs or branches, merge, rebase, force push or deploy without explicit approval. Reconcile external migrations and review app CI separately; a skipped Supabase Preview check is not security verification.
- Keep ICK Opportunities strictly separate and paused; do not integrate or modify it. Preserve approved corporate statements and consultation-first language; never invent legal status, customers, awards, staff or live service availability.
- Treat historical sprint/refinement reports and test/lint counts as dated evidence, not current validation. Website was unpublished at the last pre-change check; no publish/deploy or production-readiness claim is authorized.
- - Knowledge synchronization completed on 2026-10-18:
  Lovable Workspace Knowledge V2.2 and Ick Tech Hub
  Project Knowledge V2.2 were updated with explicit
  Founder authorization and verified after writing.
  Both knowledge stores now contain approved governance
  instructions.

- This synchronization updated knowledge instructions
  only. It did not modify source code, database schemas,
  authentication systems, feature flags, deployment
  configurations, or production services.

- ICK Technologies Master Project Knowledge V2.2
  is the Founder-approved internal corporate governance
  reference. Its full confidential contents must not
  be committed to this public repository.

## Corporate Governance V2.2 — Approved 2026-10-18

### Corporate Identity

Company: ICK Technologies

Corporate Philosophy:
Integrated Technology & Human Progress.

Corporate Identity:
Version 3.0 — Founder Approved.

The six approved Core Values are:

1. Truth & Integrity
2. Knowledge & Learning
3. Service & Community
4. Innovation & Excellence
5. Security & Responsibility
6. Collaboration & Respect

### Governance Authority

The Founder-approved Master Project Knowledge V2.2
is the corporate governance reference.

Lovable Workspace Knowledge V2.2 governs
cross-project corporate instructions.

Ick Tech Hub Project Knowledge V2.2 governs
project-specific development requirements.

Project-level instructions must not contradict
approved corporate governance.

### AI Development Rules

AI assistants must:

- Preserve existing security boundaries.
- Follow the principle of least privilege.
- Distinguish verified facts from assumptions.
- Avoid inventing company credentials or achievements.
- Explain security and privacy implications.
- Respect Founder approval requirements.
- Avoid unnecessary dependencies and expenses.
- Never expose confidential information or secrets.

### Protected Systems

The following operations require separate,
explicit authorization:

- Production deployment.
- GitHub pull request merging.
- Database migrations.
- Authentication activation.
- AI service activation.
- Project inquiry activation.
- Payment integration.
- Changes to security controls.
- Publishing the corporate website.

### Existing Security Restrictions

Maintain these restrictions:

- Inquiry submission remains disabled.
- Inquiry backend and persistence remain disabled.
- AI Topic Finder remains default OFF.
- Founder Admin remains non-operational.
- PR #2 remains subject to separate review.
- ICK Opportunities remains separate.
- Supabase migrations must not be rerun.
- Secrets must never be exposed.

### Change Management

Corporate knowledge updates do not automatically
authorize changes to application code.

Any future implementation must identify:

- Proposed changes.
- Affected files.
- Security implications.
- Expected costs.
- Testing requirements.
- Approval requirements.
- Rollback considerations.

Do not modify unrelated systems.

END OF CORPORATE GOVERNANCE V2.2