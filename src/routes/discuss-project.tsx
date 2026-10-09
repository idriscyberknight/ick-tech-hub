import { createFileRoute } from '@tanstack/react-router';
import { PendingPage } from '@/components/site/page-intro';
import { pageHead } from '@/lib/site-content';
export const Route = createFileRoute('/discuss-project')({ head: () => pageHead('Discuss a project', 'A place for future project conversations.'), component: Page });
function Page() { return <PendingPage title='Let’s start with your idea.' description='A place for future project conversations.'><h2 className="section-heading mb-5">Project inquiries are not open yet.</h2><p className="body-copy">Online inquiry submissions are not available. No form is connected and no project information can be submitted through this page.</p><p className="body-copy mt-4">A secure inquiry process is planned for a later phase, subject to approval.</p></PendingPage>; }
