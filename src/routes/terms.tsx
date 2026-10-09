import { createFileRoute } from '@tanstack/react-router';
import { PendingPage } from '@/components/site/page-intro';
import { pageHead } from '@/lib/site-content';
export const Route = createFileRoute('/terms')({ head: () => pageHead('Terms', 'A dedicated place for the website’s future terms.'), component: Page });
function Page() { return <PendingPage title='Website terms' description='A dedicated place for the website’s future terms.'><h2 className="section-heading mb-5">Terms pending review.</h2><p className="body-copy">This is a placeholder, not approved legal terms. The appropriate company details, jurisdiction, and website terms must be verified and reviewed before publication.</p><p className="body-copy mt-4">Consultation topics are not commitments to deliver services. No orders, payments, or project submissions are accepted here.</p></PendingPage>; }
