# Sprint 04 — Project Inquiry Preview (Frontend Only)

## Status
**PARTIAL — implementation prepared; runtime verification pending.** This is a handoff patch, not an assertion of deployment or production readiness.

## Objectives and delivery
- `/discuss-project` displays a responsive, non-operational preview with name, email, optional organization, service category, project description, optional exploratory budget and timeline, and a preview acknowledgment checkbox.
- Required-field validation rules, format checks and character limits are in `src/lib/inquiry-preview.ts`; messages appear on blur and are linked to their controls. Validation is intentionally illustrative: there is no submission action.
- Submit button is **disabled** and the form also prevents the browser's default submit event as defense in depth.
- Prominent notice states no information is sent or saved and advises against entering sensitive information.
- Existing pages and ICK Opportunities were not changed. Supabase remains disabled; no backend, authentication, email, analytics, payments or deployment introduced.

## Files changed
- `src/routes/discuss-project.tsx` — new inquiry preview UI.
- `src/lib/inquiry-preview.ts` — fields, choices, validation and explicit policy flags (new).
- `src/styles.css` — scoped preview styles.
- `src/test/inquiry-preview.test.ts` — validation and boundary unit tests (new).
- `README.md` — updated project overview and status.
- `roadmap.md` — Sprint 04 checklist; verification remains open.
- `SPRINT-04.md` — this report (new).

## Security and privacy boundaries
- Form data is kept only in transient React component state while the page is open. There is no persistence or network submission code in this implementation.
- This does **not** mean that the whole website makes no external requests; existing Google Fonts behavior is unchanged.
- No real data processing consent, approved privacy notice or server-side validation exists. Do not solicit real inquiries through this preview.

## Verification
- Source inspection performed for disabled submission and absence of storage/network handlers in the new form.
- Automated tests, lint, build and visual viewport verification must be run on an environment with project dependencies available. **Do not mark Sprint 04 PASS until these checks succeed.**
- Suggested commands: `bun install --frozen-lockfile`, `bunx vitest run`, `bun run lint`, `bun run build`.
- Browser checks still required at 390px, 768px, and 1280px; verify keyboard, focus, labels, no horizontal overflow and disabled button.

## Deferred to Sprint 05 (requires explicit approval)
Secure server-side validation, anti-spam/rate limiting, privacy and retention review, protected storage and authorization, actual submission handling, and deployment decisions.

## Founder approvals outstanding
Approval of inquiry copy, exploratory budget categories and privacy language; approval to initiate any backend, storage or publishing.

**STOP: No Sprint 05 work authorized.**
