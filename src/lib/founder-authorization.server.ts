import { founderAdminAuthPolicy } from "./admin-auth-policy";
import { checkFounderSession } from "./founder-session.server";
import { getSupabaseServerClient } from "./supabase-server.server";

export type FounderAuthorizationResult =
  | { authorized: true }
  | {
      authorized: false;
      reason: "feature_disabled" | "identity_not_verified" | "permission_denied";
    };

export async function checkFounderAuthorization(): Promise<FounderAuthorizationResult> {
  // Never authorize when the admin system is disabled.
  if (
    !founderAdminAuthPolicy.loginEnabled ||
    !founderAdminAuthPolicy.sessionHandlingEnabled ||
    !founderAdminAuthPolicy.mfaEnforced ||
    !founderAdminAuthPolicy.adminApiEnabled
  ) {
    return {
      authorized: false,
      reason: "feature_disabled",
    };
  }

  // Authentication and MFA must succeed first.
  const session = await checkFounderSession();

  if (session.status !== "authorization_pending") {
    return {
      authorized: false,
      reason: "identity_not_verified",
    };
  }

  try {
    const supabase = getSupabaseServerClient();

    // This database function has NOT been created yet.
    const { data, error } = await supabase.rpc("is_founder_admin");

    if (error || data !== true) {
      return {
        authorized: false,
        reason: "permission_denied",
      };
    }

    return { authorized: true };
  } catch {
    return {
      authorized: false,
      reason: "permission_denied",
    };
  }
}
