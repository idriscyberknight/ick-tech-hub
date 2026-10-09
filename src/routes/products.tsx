import { createFileRoute } from '@tanstack/react-router';
import { PendingPage } from '@/components/site/page-intro';
import { pageHead } from '@/lib/site-content';
export const Route = createFileRoute('/products')({ head: () => pageHead('Products', 'Explore the product associated with ICK Technologies.'), component: Page });
function Page() { return <PendingPage title='Products with a distinct purpose.' description='Explore the product associated with ICK Technologies.'><h2 className="section-heading mb-5">ICK Opportunities</h2><p className="body-copy">ICK Opportunities is an existing product associated with ICK Technologies. It remains separate from this corporate website.</p><p className="body-copy mt-4">Verified product details and an approved external link are pending. No product integration is included here.</p></PendingPage>; }
