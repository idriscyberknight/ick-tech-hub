-- ICK Technologies Sprint 05 Phase 05 — admin enrollment foundation, CLOSED by default.
-- No account is created and no person is granted any access by this migration.
CREATE SCHEMA IF NOT EXISTS ick_private;
REVOKE ALL ON SCHEMA ick_private FROM PUBLIC, anon, authenticated;

CREATE TABLE IF NOT EXISTS ick_private.admin_members (
    user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    enabled boolean NOT NULL DEFAULT false,
    created_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE ick_private.admin_members IS
  'Private admin allowlist. Phase 05 setup only; contains no members until separately approved. No public API access.';
ALTER TABLE ick_private.admin_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE ick_private.admin_members FORCE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE ick_private.admin_members FROM PUBLIC, anon, authenticated;

-- Privileges inherited from future defaults must not expose new private objects.
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA ick_private
  REVOKE ALL ON TABLES FROM PUBLIC, anon, authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA ick_private
  REVOKE ALL ON FUNCTIONS FROM PUBLIC, anon, authenticated;

-- Preserve existing hard-deny posture of project_inquiries.
-- No policies, no grants, no intake, no admin log-in/API endpoints introduced.