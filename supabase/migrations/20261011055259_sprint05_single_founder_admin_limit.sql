-- ICK Technologies Sprint 05 Phase 05 — enforce single enabled founder.
-- No accounts created; no permissions granted; existing deny-by-default remains.
CREATE UNIQUE INDEX IF NOT EXISTS admin_members_single_enabled_idx
 ON ick_private.admin_members ((enabled))
 WHERE enabled IS TRUE;
COMMENT ON INDEX ick_private.admin_members_single_enabled_idx IS
 'Only one enabled founder-admin may exist. Does not authorize access.';
