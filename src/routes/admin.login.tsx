import { createFileRoute, Link } from "@tanstack/react-router";
import { LockKeyhole, ShieldCheck } from "lucide-react";
import { PageIntro } from "@/components/site/page-intro";
import { pageHead } from "@/lib/site-content";
import { founderAdminAuthPolicy } from "@/lib/admin-auth-policy";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      ...pageHead(
        "Founder admin access",
        "Restricted ICK Technologies administrator entry. Login is not active.",
      ).meta,
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: FounderAdminLoginPage,
});

function FounderAdminLoginPage() {
  // Intentionally no password, OTP, session, browser-storage or network handlers.
  // This is a CLOSED scaffold, not a usable authentication experience.
  return (
    <>
      <PageIntro
        title="Founder admin access"
        description="A restricted entry point for the future ICK Technologies administration experience."
      />
      <section className="section-band" aria-labelledby="admin-auth-heading">
        <div className="site-container">
          <div className="mx-auto max-w-xl rounded-xl border border-border bg-background p-6 shadow-sm sm:p-9">
            <div className="mb-6 flex items-center gap-3 text-primary">
              <LockKeyhole className="h-7 w-7" aria-hidden="true" />
              <span className="eyebrow">Restricted access</span>
            </div>
            <h2 id="admin-auth-heading" className="text-2xl font-semibold text-foreground">
              Administrator sign-in is not open
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              The founder-only authentication system is under development. No login, account
              creation, MFA verification, or access to project inquiries is available from this page
              yet.
            </p>
            <div className="mt-6 rounded-lg border border-border bg-secondary/40 p-4" role="status">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <p className="text-sm leading-6 text-foreground">
                  Access is disabled by default. Real sign-in requires a verified founder account,
                  secure redirects, multi-factor authentication, and server-side authorization.
                </p>
              </div>
            </div>
            <button
              type="button"
              disabled
              aria-disabled="true"
              className="mt-7 w-full cursor-not-allowed rounded-md bg-primary/60 px-5 py-3 text-sm font-semibold text-primary-foreground"
            >
              Sign-in not yet available
            </button>
            <p className="mt-4 text-xs leading-6 text-muted-foreground">
              Current policy: {founderAdminAuthPolicy.loginEnabled ? "review required" : "closed"}.
              Do not enter a password or verification code on this page.
            </p>
            <Link
              to="/"
              className="mt-6 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              Return to the corporate website
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
