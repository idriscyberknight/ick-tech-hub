import { getSupabaseServerClient } from "./supabase-server.server";

export type FounderSessionStatus =
  | { status: "not_authenticated" }
  | { status: "mfa_required" }
  | { status: "authorization_pending" };

export async function checkFounderSession(): Promise<FounderSessionStatus> {
  try {
    const supabase = getSupabaseServerClient();

    const { data, error } = await supabase.auth.getClaims();

    if (error || !data?.claims?.sub) {
      return { status: "not_authenticated" };
    }

    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || userData.user?.id !== data.claims.sub || !userData.user.email_confirmed_at) {
      return { status: "not_authenticated" };
    }

    if (data.claims.aal !== "aal2") {
      return { status: "mfa_required" };
    }

    return { status: "authorization_pending" };
  } catch {
    return { status: "not_authenticated" };
  }
}
