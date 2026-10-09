import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageIntro } from './page-intro';
import { services } from '@/lib/site-content';
import { consultationPolicy, consultationTopics } from '@/lib/consultation-content';
import { TopicDiscovery } from './topic-discovery';
export function ServiceDetail({ index }: { index: number }) {
  const service = services[index];
  const topic = consultationTopics[index];
  if (!service || !topic) return null;
  const Icon = service.icon;
  return <><PageIntro title={topic.title} description={topic.description} eyebrow="Consultation topic" />
    <section className="section-band" aria-labelledby="context-heading"><div className="site-container grid gap-10 lg:grid-cols-[1fr_1.4fr]">
      <div><span className="service-icon mb-6"><Icon aria-hidden="true" /></span><p className="eyebrow mb-4 text-primary">{topic.label}</p><h2 id="context-heading" className="section-heading mb-5">{topic.context}</h2><p className="body-copy">{topic.contextDescription}</p></div>
      <div><h2 className="mb-6 text-sm font-semibold text-primary">Possible use cases</h2><div className="grid gap-x-8 sm:grid-cols-2">{topic.useCases.map((useCase, i) => <article key={useCase.title} className="border-t border-border py-6"><span className="text-xs text-muted-foreground" aria-hidden="true">0{i + 1}</span><h3 className="mb-3 mt-3 text-xl font-semibold">{useCase.title}</h3><p className="body-copy">{useCase.description}</p></article>)}</div></div>
    </div></section>
    <TopicDiscovery />
    <section className="section-band" aria-labelledby="considerations-heading"><div className="site-container"><p className="eyebrow mb-4 text-primary">Before moving forward</p><h2 id="considerations-heading" className="section-heading mb-9">Considerations & limits.</h2><div className="grid gap-8 md:grid-cols-3">{topic.considerations.map(item => <article key={item.title} className="direction-item"><h3 className="mb-3 text-xl font-semibold">{item.title}</h3><p className="body-copy">{item.description}</p></article>)}</div>
      <aside aria-label="Consultation limitations" className="mt-10 border-l-2 border-teal bg-secondary p-6"><h3 className="mb-3 text-base font-semibold">What this page does not promise</h3><p className="body-copy">{topic.limit}</p>{!consultationPolicy.availabilityConfirmed && <p className="body-copy mt-3">Scope and availability have not been confirmed.</p>}</aside>
      <div className="mt-9 flex flex-wrap gap-4"><Button asChild variant="outline"><Link to="/services">All consultation topics <ArrowRight aria-hidden="true" /></Link></Button><Button asChild variant="ghost"><Link to="/about">About ICK Technologies <ArrowRight aria-hidden="true" /></Link></Button></div>
    </div></section></>;
}
