import { createFileRoute } from '@tanstack/react-router';
import { PendingPage } from '@/components/site/page-intro';
import { pageHead } from '@/lib/site-content';
export const Route = createFileRoute('/contact')({ head: () => pageHead('Contact', 'Contact information will be shared once verified.'), component: Page });
function Page() { return <PendingPage title='Connect with ICK Technologies.' description='Contact information will be shared once verified.'><h2 className="section-heading mb-5">Verified contact details are pending.</h2><p className="body-copy">No email address, telephone number, or office address has been published here. Contact and inquiry submissions are not available on this website yet.</p></PendingPage>; }
