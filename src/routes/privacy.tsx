import { createFileRoute } from '@tanstack/react-router';
import { PendingPage } from '@/components/site/page-intro';
import { pageHead } from '@/lib/site-content';
export const Route = createFileRoute('/privacy')({ head: () => pageHead('Privacy', 'A dedicated place for the website’s future privacy notice.'), component: Page });
function Page() { return <PendingPage title='Privacy notice' description='A dedicated place for the website’s future privacy notice.'><h2 className="section-heading mb-5">Privacy notice pending review.</h2><p className="body-copy">This is a placeholder, not an approved privacy policy. Data-handling details, contact information, and applicable requirements must be confirmed before a final notice is published.</p><p className="body-copy mt-4">There is currently no inquiry submission or account creation feature. Fonts are loaded from Google Fonts, which requires a request to that external service.</p></PendingPage>; }
