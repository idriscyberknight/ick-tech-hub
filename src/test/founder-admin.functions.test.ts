import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  checkFounderAuthorization: vi.fn(),
}));

vi.mock("@tanstack/react-start", () => ({
  createServerFn: () => ({
    handler: (fn: () => Promise<{ authorized: boolean }>) => fn,
  }),
}));

vi.mock("../lib/founder-authorization.server", () => ({
  checkFounderAuthorization: mocks.checkFounderAuthorization,
}));

import { checkFounderAdminAccess } from "../lib/founder-admin.functions";

describe("Founder Admin Server Function", () => {
  beforeEach(() => {
    mocks.checkFounderAuthorization.mockReset();
  });

  it("denies access when authorization fails", async () => {
    mocks.checkFounderAuthorization.mockResolvedValue({
      authorized: false,
    });

    await expect(checkFounderAdminAccess()).resolves.toEqual({
      authorized: false,
    });
  });

  it("denies access when authorization throws", async () => {
    mocks.checkFounderAuthorization.mockRejectedValue(new Error("Authorization unavailable"));

    await expect(checkFounderAdminAccess()).resolves.toEqual({
      authorized: false,
    });
  });

  it("allows access only when authorization succeeds", async () => {
    mocks.checkFounderAuthorization.mockResolvedValue({
      authorized: true,
    });

    await expect(checkFounderAdminAccess()).resolves.toEqual({
      authorized: true,
    });
  });
});
