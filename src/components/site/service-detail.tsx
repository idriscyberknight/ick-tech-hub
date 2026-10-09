import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageIntro } from './page-intro';
import { services } from '@/lib/site-content';
export function ServiceDetail({ index }: { index: number }) {
  const service = services[index];
  if (!service) return null;
  return <><PageIntro title={service.title} description={service.description} eyebrow="Consultation topic" /><section className="section-band"><div className="site-container grid gap-10 md:grid-cols-2"><div><h2 className="section-heading mb-5">Areas to explore</h2><p className="body-copy">Potential topics for a future consultation. Delivery scope and availability have not been confirmed.</p></div><ul>{service.topics.map((topic, i) => <li key={topic} className="value-item"><span className="text-xs text-primary">0{i+1}</span><span className="font-display text-lg font-medium">{topic}</span></li>)}</ul></div><div className="site-container mt-10"><Button asChild variant="outline"><Link to="/services">All consultation topics <ArrowRight aria-hidden="true" /></Link></Button></div></section></>;
}
