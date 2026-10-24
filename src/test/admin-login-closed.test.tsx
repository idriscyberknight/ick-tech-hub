import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { AnchorHTMLAttributes, ComponentType } from "react";

// Test the real page component without introducing a live router or auth session.
vi.mock("@tanstack/react-router", () => ({
  createFileRoute: (path: string) => (options: unknown) => ({ path, options }),
  Link: ({ to, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }) => (
    <a href={to} {...props} />
  ),
}));

import { Route } from "@/routes/admin.login";

type AdminRoute = {
  path: string;
  options: {
    component: ComponentType;
    head: () => { meta: Array<{ title?: string; name?: string; content?: string }> };
  };
};

const adminRoute = Route as unknown as AdminRoute;
const AdminPage = adminRoute.options.component;
const renderAdminPage = () => render(<AdminPage />);

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("Founder admin page remains closed (no working authentication)", () => {
  it("declares the intended admin login route", () => {
    expect(adminRoute.path).toBe("/admin/login");
  });

  it("prevents search engine indexing using route metadata", () => {
    const robots = adminRoute.options.head().meta.find((entry) => entry.name === "robots");
    expect(robots).toEqual({ name: "robots", content: "noindex, nofollow" });
  });

  it("shows an explicit administrator access restriction instead of a sign-in form", () => {
    renderAdminPage();
    expect(screen.getByRole("heading", { level: 1, name: "Founder admin access" })).toBeVisible();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Administrator sign-in is not open",
      }),
    ).toBeVisible();
  });

  it("has a disabled sign-in button with an accessible disabled state", () => {
    renderAdminPage();
    const button = screen.getByRole("button", { name: "Sign-in not yet available" });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-disabled", "true");
  });

  it("does not render any credential, MFA, or other input control", () => {
    const { container } = renderAdminPage();
    expect(container.querySelector("input, textarea, select")).toBeNull();
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });

  it("has no form or submit control that could accept credentials", () => {
    const { container } = renderAdminPage();
    expect(container.querySelector("form")).toBeNull();
    expect(container.querySelector('[type="submit"]')).toBeNull();
  });

  it("does not offer an active login or registration destination", () => {
    renderAdminPage();
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(2);
    expect(links.every((link) => link.getAttribute("href") === "/")).toBe(true);
  });

  it("announces the restriction in an accessible status region", () => {
    renderAdminPage();
    expect(screen.getByRole("status")).toHaveTextContent("Access is disabled by default.");
  });

  it("warns visitors not to enter passwords or verification codes", () => {
    renderAdminPage();
    expect(
      screen.getByText(/Do not enter a password or verification code on this page/i),
    ).toBeVisible();
  });

  it("labels the policy as closed", () => {
    renderAdminPage();
    expect(screen.getByText(/Current policy: closed/i)).toBeVisible();
  });

  it("does not initiate a fetch request on render or attempted button activation", () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    renderAdminPage();
    fireEvent.click(screen.getByRole("button", { name: "Sign-in not yet available" }));
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("does not write credentials or session state into browser storage", () => {
    const writeSpy = vi.spyOn(Storage.prototype, "setItem");
    renderAdminPage();
    fireEvent.click(screen.getByRole("button", { name: "Sign-in not yet available" }));
    expect(writeSpy).not.toHaveBeenCalled();
  });
});
