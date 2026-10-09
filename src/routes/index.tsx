import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ServiceGrid } from '@/components/site/service-grid';
import { pageHead } from '@/lib/site-content';
export const Route = createFileRoute('/')({ head: () => pageHead('Technology & human progress', 'ICK Technologies is an emerging African technology brand focused on solutions that expand opportunities, unlock human potential, and improve lives.'), component: HomePage });
function HomePage() {
  return <><section className="home-hero"><div className="hero-blueprint" aria-hidden="true" /><div className="site-container relative">
    <div className="flex items-center justify-between gap-4"><p className="eyebrow text-enterprise-muted">Technology with purpose</p><span className="hidden text-xs text-enterprise-muted md:block">African roots. Global ambitions.</span></div>
    <h1 className="hero-title">ICK Technologies</h1><p className="mb-5 font-display text-3xl font-medium leading-snug md:text-4xl">Advancing technology.<br />Empowering human potential.</p>
    <p className="hero-description">Creating solutions that expand opportunities, unlock human potential, and improve lives.</p>
    <div className="mt-8 flex flex-wrap gap-3"><Button asChild size="lg"><Link to="/services">Explore consultation topics <ArrowUpRight aria-hidden="true" /></Link></Button><Button asChild size="lg" variant="enterpriseOutline"><Link to="/about">Discover our purpose <ArrowRight aria-hidden="true" /></Link></Button></div>
    <div className="hero-bottom"><p className="max-w-sm text-sm leading-relaxed text-enterprise-muted">An emerging African technology brand<br />with a human-centered perspective.</p><Link to="/about" className="flex items-center gap-3 text-xs text-enterprise-muted">Our philosophy <span className="text-on-enterprise">Integrated Technology & Human Progress</span><ArrowUpRight size={16} aria-hidden="true" /></Link></div>
  </div></section>
  <section className="section-band"><div className="site-container"><div className="mb-9 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="eyebrow mb-4 text-primary">Areas of focus</p><h2 className="section-heading">Ideas today. Possibilities tomorrow.</h2></div><Link to="/services" className="inline-flex items-center gap-2 text-sm font-medium text-primary">Explore all topics <ArrowRight size={17} aria-hidden="true" /></Link></div><ServiceGrid /><p className="mt-5 text-xs leading-relaxed text-muted-foreground">These are consultation topics. Scope and availability would be established through discussion.</p></div></section>
  <section className="section-band border-t border-border bg-secondary"><div className="site-container grid gap-8 md:grid-cols-2"><div><p className="eyebrow mb-4 text-teal">Our purpose</p><h2 className="section-heading max-w-lg">Progress starts with people.</h2></div><div><p className="body-copy text-base">To advance technology and human progress by creating solutions that expand opportunities, unlock human potential, and improve lives.</p><Button asChild variant="link" className="mt-5 px-0"><Link to="/about">Our vision, mission & values <ArrowRight aria-hidden="true" /></Link></Button></div></div></section>
  </>;
}
