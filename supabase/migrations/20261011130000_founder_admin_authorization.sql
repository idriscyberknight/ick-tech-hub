-- ICK Technologies — Sprint 05
-- Founder Admin Authorization
--
-- PURPOSE:
-- Verify founder authorization without exposing private admin records.
--
-- SECURITY:
-- Deny access unless the caller has an authenticated identity,
-- Supabase AAL2, and an enabled admin membership.
--
-- DO NOT EXECUTE without database security review and approval.

BEGIN;

CREATE FUNCTION public.is_founder_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $function$

  SELECT EXISTS (
    SELECT 1
    FROM ick_private.admin_members AS member
    WHERE member.user_id = auth.uid()
      AND member.enabled IS TRUE
      AND auth.uid() IS NOT NULL
      AND (auth.jwt() ->> 'aal') = 'aal2'
  );

$function$;

-- Remove default function execution permissions.
REVOKE ALL ON FUNCTION public.is_founder_admin()
FROM PUBLIC;

-- Anonymous users must not execute this function.
REVOKE ALL ON FUNCTION public.is_founder_admin()
FROM anon;

-- Authenticated users may request an authorization decision.
-- This does not give direct access to admin_members.
GRANT EXECUTE ON FUNCTION public.is_founder_admin()
TO authenticated;

COMMENT ON FUNCTION public.is_founder_admin()
IS 'Returns true only for an authenticated AAL2 user with enabled founder admin membership.';

COMMIT;
