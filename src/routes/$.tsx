import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { pageHead } from '@/lib/site-content';
export const Route = createFileRoute('/$')({ head: () => ({ ...pageHead('Page not found', 'The requested ICK Technologies page could not be found.'), meta: [...pageHead('Page not found', 'The requested ICK Technologies page could not be found.').meta, { name: 'robots', content: 'noindex' }] }), component: NotFound });
function NotFound() {
  return <section className="section-band"><div className="site-container py-12"><p className="eyebrow mb-6 text-primary">404 · Page not found</p><h1 className="page-title">A different direction.</h1><p className="page-description mb-8">The page you’re looking for doesn’t exist or may have moved.</p><Button asChild><Link to="/"><ArrowLeft aria-hidden="true" /> Back to home</Link></Button></div></section>;
}