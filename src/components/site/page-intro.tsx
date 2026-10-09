import type { ReactNode } from 'react';
import { Link } from '@tanstack/react-router';
import { ChevronRight } from 'lucide-react';
export function PageIntro({ title, description, eyebrow = 'ICK Technologies' }: { title: string; description: string; eyebrow?: string }) {
  return <section className="page-intro"><div className="site-container">
    <nav aria-label="Breadcrumb" className="mb-9 flex items-center gap-2 text-xs text-muted-foreground"><Link to="/" className="hover:text-primary">Home</Link><ChevronRight size={13} aria-hidden="true" /><span aria-current="page">{title}</span></nav>
    <p className="eyebrow text-primary">{eyebrow}</p><h1 className="page-title">{title}</h1><p className="page-description">{description}</p>
  </div></section>;
}
export function PendingPage({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return <><PageIntro title={title} description={description} /><section className="section-band"><div className="site-container"><div className="max-w-3xl">{children}</div></div></section></>;
}
