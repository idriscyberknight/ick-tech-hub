import { createFileRoute } from '@tanstack/react-router';
import { PageIntro } from '@/components/site/page-intro';
import { ValuesSection, ApproachSection, ExploreBand } from '@/components/site/corporate-sections';
import { mission, vision, purpose, pageHead } from '@/lib/site-content';

export const Route = createFileRoute('/about')({
  head: () => pageHead('About our purpose & principles', 'Learn about ICK Technologies: an emerging Africa-rooted technology initiative guided by an approved purpose, vision, mission, and six core values.'),
  component: AboutPage,
});

function AboutPage() {
  return <div className="refined-page refined-about">
    <PageIntro title="About ICK Technologies." eyebrow="Our purpose & principles" description="Africa-rooted. Nigeria-first. Globally accessible by ambition. An emerging technology initiative guided by a belief that meaningful progress starts with people." />

    <section className="section-band" aria-labelledby="story-heading"><div className="site-container purpose-layout"><div><p className="eyebrow mb-4 text-primary">Our story</p><h2 id="story-heading" className="section-heading">A human perspective.<br />A technology focus.</h2></div><div><p className="purpose-statement">ICK Technologies is an emerging Africa-rooted technology initiative exploring how practical, secure, intelligent, and accessible technology can support human progress.</p><p className="body-copy mt-6">Our direction is shaped by the possibilities technology can create for individuals, businesses, and communities. The starting point is a real-world need: something to understand before proposing a solution.</p><p className="body-copy mt-4">With global ambitions, our focus remains grounded: explore thoughtfully, be transparent about limitations, and take a responsible approach to any future work.</p></div></div></section>

    <section className="corporate-purpose-band" aria-labelledby="about-purpose-heading"><div className="site-container"><p className="eyebrow mb-5 text-enterprise-muted">Why we exist</p><h2 id="about-purpose-heading" className="text-xl font-medium">Our purpose</h2><p className="purpose-quote mt-6">{purpose}</p><div className="mt-10 border-t border-on-enterprise/20 pt-6"><h3 className="text-sm font-medium text-enterprise-muted">Our corporate philosophy</h3><p className="mt-3 font-display text-xl font-medium">Integrated Technology & Human Progress</p></div></div></section>

    <section className="section-band" aria-labelledby="direction-heading"><div className="site-container"><p className="eyebrow mb-4 text-primary">Our direction</p><h2 id="direction-heading" className="section-heading mb-10">The future we envision.<br />The purpose we work toward.</h2><div className="grid gap-9 md:grid-cols-2"><article className="direction-item"><span className="text-xs text-primary">01 / Vision</span><h3 className="mb-5 mt-4 text-2xl font-semibold">Our vision</h3><p className="body-copy text-base">{vision}</p></article><article className="direction-item"><span className="text-xs text-primary">02 / Mission</span><h3 className="mb-5 mt-4 text-2xl font-semibold">Our mission</h3><p className="body-copy text-base">{mission}</p></article></div></div></section>

    <ValuesSection />
    <ApproachSection about />
    <ExploreBand about />
  </div>;
}
