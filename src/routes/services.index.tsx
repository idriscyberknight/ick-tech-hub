import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/site/page-intro";
import { ServiceGrid } from "@/components/site/service-grid";
import { pageHead } from "@/lib/site-content";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TopicDiscovery } from "@/components/site/topic-discovery";
import { TopicAdvisor } from "@/components/site/topic-advisor";
export const Route = createFileRoute("/services/")({
  head: () =>
    pageHead(
      "Services & consultation topics",
      "Explore possible software, responsible AI, and authorized cybersecurity & ICT consultation topics, with discovery considerations and clear limits.",
    ),
  component: ServicesPage,
});
function ServicesPage() {
  return (
    <div className="refined-page refined-services">
      <PageIntro
        title="Services & consultation topics."
        eyebrow="Our areas of focus"
        description="Software Development, Artificial Intelligence, and Cybersecurity & ICT. Explore our strategic focus, possible applications, and the considerations behind responsible technology decisions."
      />
      <section className="section-band" aria-labelledby="topics-heading">
        <div className="site-container">
          <div className="section-lead">
            <div>
              <p className="eyebrow mb-4 text-primary">Explore the possibilities</p>
              <h2 id="topics-heading" className="section-heading">
                Three areas. A considered approach.
              </h2>
            </div>
            <p className="body-copy max-w-sm">
              Consultation topics—not verified operational offerings. Each topic sets out possible
              use cases, practical considerations, and limits.
            </p>
          </div>
          <ServiceGrid />
          <p className="body-copy mt-8 border-l-2 border-teal pl-5">
            Scope, feasibility, and availability would need to be established before any commitment.
            No service delivery or outcome is promised here.
          </p>
        </div>
      </section>
      <TopicAdvisor />
      <TopicDiscovery />
      <section className="section-band" aria-labelledby="boundaries-heading">
        <div className="site-container grid gap-10 md:grid-cols-2">
          <div>
            <p className="eyebrow mb-4 text-primary">Clear expectations</p>
            <h2 id="boundaries-heading" className="section-heading">
              Possibilities, not promises.
            </h2>
          </div>
          <div>
            <p className="body-copy">
              A future discussion would need to account for your context, permissions, data,
              dependencies, and practical limits. Security assessments require explicit
              authorization; AI needs appropriate human oversight.
            </p>
            <p className="body-copy mt-4">
              Project inquiry and contact submissions are not available on this website. You can
              continue learning about our topics and the principles behind ICK Technologies.
            </p>
            <Button asChild variant="outline" className="mt-6">
              <Link to="/about">
                Our purpose & principles <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
