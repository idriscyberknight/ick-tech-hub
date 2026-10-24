import { describe, expect, it } from "vitest";
import { adminAccessReady, founderAdminAuthPolicy } from "@/lib/admin-auth-policy";

describe("Founder admin access is closed by default", () => {
  it("keeps login and public signup unavailable", () => {
    expect(founderAdminAuthPolicy.loginEnabled).toBe(false);
    expect(founderAdminAuthPolicy.signupEnabled).toBe(false);
  });

  it("does not enable session, MFA, or admin data APIs", () => {
    expect(founderAdminAuthPolicy.sessionHandlingEnabled).toBe(false);
    expect(founderAdminAuthPolicy.mfaEnforced).toBe(false);
    expect(founderAdminAuthPolicy.adminApiEnabled).toBe(false);
  });

  it("rejects readiness until every mandatory security control exists", () => {
    expect(adminAccessReady()).toBe(false);
  });
});
