import { createFileRoute } from '@tanstack/react-router';
import { PageIntro } from '@/components/site/page-intro';
import { ServiceGrid } from '@/components/site/service-grid';
import { pageHead } from '@/lib/site-content';
export const Route = createFileRoute('/services/')({ head: () => pageHead('Consultation topics', 'Explore software development, artificial intelligence, and cybersecurity & ICT consultation topics at ICK Technologies.'), component: ServicesPage });
function ServicesPage() { return <><PageIntro title="A conversation about possibilities." eyebrow="Consultation topics" description="Explore our strategic areas of focus. Each begins with understanding the problem, the people it affects, and the possibilities ahead." /><section className="section-band"><div className="site-container"><ServiceGrid /><p className="body-copy mt-8">These categories represent strategic capabilities and consultation topics, not a promise that every service is currently available. Scope and availability would be established through discussion.</p></div></section></>; }
