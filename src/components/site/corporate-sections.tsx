import { Link } from '@tanstack/react-router';
import { ArrowRight, Fingerprint, Lightbulb, ShieldCheck, Accessibility, Sparkles, CircleCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { values, valuePerspectives, approach } from '@/lib/site-content';

const valueIcons = [Fingerprint, Lightbulb, ShieldCheck, Accessibility, Sparkles, CircleCheck];

export function ValuesSection() {
  return <section className="section-band bg-secondary" aria-labelledby="values-heading"><div className="site-container">
    <div className="section-lead"><div><p className="eyebrow mb-4 text-primary">Our values</p><h2 id="values-heading" className="section-heading">The principles behind the possibilities.</h2></div><p className="body-copy max-w-sm">Six values guide how we think, make decisions, and approach technology.</p></div>
    <div className="corporate-values">{values.map((value, index) => {
      const Icon = valueIcons[index];
      return <article key={value} className="corporate-value"><div className="mb-5 flex items-center justify-between"><span className="value-symbol">{Icon && <Icon size={23} strokeWidth={1.5} aria-hidden="true" />}</span><span className="text-xs text-muted-foreground">0{index + 1}</span></div><h3 className="mb-3 text-xl font-semibold">{value}</h3><p className="body-copy">{valuePerspectives[index]}</p></article>;
    })}</div>
  </div></section>;
}

export function ApproachSection({ about = false }: { about?: boolean }) {
  return <section className="section-band" aria-labelledby="approach-heading"><div className="site-container">
    <div className="section-lead"><div><p className="eyebrow mb-4 text-primary">A responsible approach</p><h2 id="approach-heading" className="section-heading">Listen first. Think carefully.<br />Move forward with clarity.</h2></div><p className="body-copy max-w-sm">{about ? 'This is the approach we intend to bring to future consultations and any agreed delivery.' : 'Our intended approach starts with understanding—not a promise to deliver every idea.'}</p></div>
    <ol className="approach-grid">{approach.map(({ title, description }, index) => <li key={title} className="approach-step"><span className="step-number">0{index + 1}</span><h3 className="mb-3 mt-6 text-lg font-semibold">{title}</h3><p className="body-copy">{description}</p></li>)}</ol>
    <p className="mt-8 border-t border-border pt-6 text-sm leading-relaxed text-muted-foreground">Consultation topics describe areas of focus. They do not confirm current availability, delivery timelines, or service commitments.</p>
  </div></section>;
}

export function ExploreBand({ about = false }: { about?: boolean }) {
  return <section className="explore-band" aria-labelledby="explore-heading"><div className="site-container flex flex-col justify-between gap-8 md:flex-row md:items-center"><div><p className="eyebrow mb-4 text-enterprise-muted">Continue exploring</p><h2 id="explore-heading" className="section-heading">{about ? 'Explore the possibilities.' : 'Get to know ICK Technologies.'}</h2><p className="mt-4 max-w-lg text-sm leading-relaxed text-enterprise-muted">{about ? 'Software, artificial intelligence, and cybersecurity & ICT—view our consultation topics.' : 'Discover the purpose and principles behind our Africa-rooted technology initiative.'}</p></div><Button asChild variant="enterpriseOutline" size="lg"><Link to={about ? '/services' : '/about'}>{about ? 'View consultation topics' : 'More about us'}<ArrowRight aria-hidden="true" /></Link></Button></div></section>;
}