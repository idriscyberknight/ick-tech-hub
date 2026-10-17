# ICK Technologies — Sprint 05 Admin Login UI Starter

## State: SCAFFOLD ONLY — NOT AN AUTHENTICATION IMPLEMENTATION

This feature introduces a minimal `/admin/login` information page. **It is not an Admin Login yet.** It does not accept credentials, call Supabase Auth, store sessions, verify MFA, or fetch any confidential data. No secret keys are needed; no environment variables are changed.

The explicit `founderAdminAuthPolicy` flags are all `false`. The page has a deliberately disabled button. Merely changing a flag will NOT implement authentication or authorization.

## Why this sequencing?

The Supabase project's Auth Site URL is `http://localhost:3000` and no redirect URL was configured at the time of review. No founder identity had been provisioned. Issuing a real invitation now could direct the user to an invalid page. The private `ick_private.admin_members` table has no enabled members, no public access, and `public.project_inquiries` remains closed.

## Files (all new)

- `src/routes/admin.login.tsx`: file-based TanStack Router page `/admin/login`, noindex metadata.
- `src/lib/admin-auth-policy.ts`: deny-by-default sign-in policy.
- `src/test/admin-auth-policy.test.ts`: three policy unit tests.
- `SPRINT-05-ADMIN-UI.md`: this document.

## Installation safety

Create a new branch `feature/sprint-05-admin-auth` from updated `origin/main` first. Keep Sprint 04 untracked ZIPs and `package-lock.json` intact. Upload the ZIP to the repository root in Codespaces. Extract with `unzip -n` so existing files are never overwritten.

**Do not push or merge until you have reviewed the added files and completed checks.** TanStack Router generates `src/routeTree.gen.ts` during `npm run dev` or `npm run build`; do not hand-edit it.

## Checks after installing dependencies

```
# focused lint (may be impacted by existing repository formatting)
npx eslint src/routes/admin.login.tsx src/lib/admin-auth-policy.ts src/test/admin-auth-policy.test.ts
npm run test -- --run
npm run build
```

Expected behavior after a successful dev/build: `/admin/login` displays a disabled information panel, **not** a usable sign-in. Keep Supabase Auth invitation and redirect configuration unchanged.

## Remaining phases

1. Build and test server-side authorization tied to verified `auth.users` identity and the private single-founder allowlist.
2. Implement working MFA enrollment/challenge and enforce the `aal2` claim on protected server actions.
3. Build secure auth callback and hardened session/cookie behavior.
4. Configure a controlled HTTPS origin and exact Auth redirect URLs. Test callback in an approved development environment.
5. Provision founder via secure invitation after settings and callback work; approve the specific user ID and enable the allowlist row.
6. Add audit logging and authorization tests (anonymous, normal user, founder with/without MFA, revoked admin), then review prior to opening confidential admin access.

Inquiry intake remains closed. Do not change ICK Opportunities.
