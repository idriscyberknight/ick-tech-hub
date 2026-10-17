import { describe, expect, it, vi } from "vitest";

import { checkFounderAuthorization } from "../lib/founder-authorization.server";
import { checkFounderSession } from "../lib/founder-session.server";
import { getSupabaseServerClient } from "../lib/supabase-server.server";

vi.mock("../lib/founder-session.server", () => ({
  checkFounderSession: vi.fn(),
}));

vi.mock("../lib/supabase-server.server", () => ({
  getSupabaseServerClient: vi.fn(),
}));

describe("Founder Authorization Security", () => {
  it("denies access when admin features are disabled", async () => {
    const result = await checkFounderAuthorization();

    expect(result).toEqual({
      authorized: false,
      reason: "feature_disabled",
    });

    expect(checkFounderSession).not.toHaveBeenCalled();

    expect(getSupabaseServerClient).not.toHaveBeenCalled();
  });
});
