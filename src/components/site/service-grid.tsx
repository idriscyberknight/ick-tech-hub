import { Link } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';
import { services } from '@/lib/site-content';

export function ServiceGrid() {
  return <div className="grid gap-5 md:grid-cols-3">{services.map(({ title, path, icon: Icon, description, number }) => <Link key={path} to={path} className="service-item group">
    <div className="flex items-center justify-between"><span className="service-icon"><Icon size={24} strokeWidth={1.5} aria-hidden="true" /></span><span className="text-xs text-muted-foreground">{number}</span></div>
    <h3 className="mt-7 text-xl font-semibold">{title}</h3><p className="body-copy mt-3 mb-7">{description}</p>
    <span className="mt-auto flex items-center justify-between text-sm font-medium">Explore the topic <ArrowUpRight size={18} aria-hidden="true" /></span>
  </Link>)}</div>;
}
