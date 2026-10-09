import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ServiceGrid } from '@/components/site/service-grid';
import { ValuesSection, ApproachSection, ExploreBand } from '@/components/site/corporate-sections';
import { pageHead, purpose } from '@/lib/site-content';

export const Route = createFileRoute('/')({
  head: () => pageHead('Technology & human progress', 'Meet ICK Technologies, an emerging Africa-rooted technology initiative. Discover our purpose, values, responsible approach, and technology consultation topics.'),
  component: HomePage,
});

function HomePage() {
  return <>
    <section className="home-hero corporate-hero" aria-labelledby="home-heading">
      <div className="hero-blueprint" aria-hidden="true" />
      <div className="site-container relative">
        <div className="flex items-center justify-between gap-4"><p className="eyebrow text-enterprise-muted">African roots. Global ambitions.</p><span className="hidden text-xs text-enterprise-muted md:block">Technology with a human perspective</span></div>
        <h1 id="home-heading" className="hero-title">ICK Technologies</h1>
        <p className="hero-statement">Technology shaped around<br className="hidden md:block" /> human possibility.</p>
        <p className="hero-description mt-6">An emerging technology initiative rooted in Africa, with a focus on practical ideas, meaningful opportunities, and human progress.</p>
        <div className="mt-8 flex flex-wrap gap-3"><Button asChild size="lg"><Link to="/services">Explore consultation topics <ArrowUpRight aria-hidden="true" /></Link></Button><Button asChild size="lg" variant="enterpriseOutline"><Link to="/about">Discover our purpose <ArrowRight aria-hidden="true" /></Link></Button></div>
        <div className="hero-bottom"><p className="text-xs text-enterprise-muted">Our corporate philosophy</p><p className="font-display text-sm font-medium leading-relaxed md:text-base">Integrated Technology & Human Progress</p></div>
      </div>
    </section>

    <section className="section-band border-b border-border" aria-labelledby="purpose-heading"><div className="site-container purpose-layout"><div><p className="eyebrow mb-4 text-primary">Our purpose</p><h2 id="purpose-heading" className="section-heading">Human progress<br />is the starting point.</h2></div><div><p className="purpose-statement">{purpose}</p><p className="body-copy mt-6">We see technology as a means to serve people—not an end in itself. That perspective shapes the questions we ask and the possibilities we explore.</p><Button asChild variant="link" className="mt-5 px-0"><Link to="/about">Our vision, mission & values <ArrowRight aria-hidden="true" /></Link></Button></div></div></section>

    <section className="section-band" aria-labelledby="topics-heading"><div className="site-container"><div className="section-lead"><div><p className="eyebrow mb-4 text-primary">Consultation topics</p><h2 id="topics-heading" className="section-heading">Three areas. A people-first perspective.</h2></div><Button asChild variant="link" className="px-0"><Link to="/services">View all topics <ArrowRight aria-hidden="true" /></Link></Button></div><ServiceGrid /><p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">These are strategic areas of focus, not a promise of current service availability. Feasibility, scope, and availability would need to be established through discussion.</p></div></section>

    <ValuesSection />
    <ApproachSection />
    <ExploreBand />
  </>;
}
