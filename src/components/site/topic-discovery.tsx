import { discoverySteps } from '@/lib/consultation-content';

export function TopicDiscovery() {
  return <section className="section-band bg-secondary" aria-labelledby="discovery-heading"><div className="site-container">
    <div className="section-lead"><div><p className="eyebrow mb-4 text-primary">Discovery before commitment</p><h2 id="discovery-heading" className="section-heading">A thoughtful starting point.</h2></div><p className="body-copy max-w-sm">An intended approach for a future discussion—not evidence of established service delivery.</p></div>
    <ol className="approach-grid">{discoverySteps.map((step, index) => <li className="approach-step" key={step.title}><span className="step-number" aria-hidden="true">0{index + 1}</span><h3 className="mb-3 mt-6 text-lg font-semibold">{step.title}</h3><p className="body-copy">{step.description}</p></li>)}</ol>
  </div></section>;
}