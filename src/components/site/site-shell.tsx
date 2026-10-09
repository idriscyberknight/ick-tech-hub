import { Link, useRouterState } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [{ to: '/', label: 'Home' }, { to: '/about', label: 'About' }, { to: '/services', label: 'Services' }, { to: '/products', label: 'Products' }, { to: '/contact', label: 'Contact' }] as const;
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: s => s.location.pathname });
  useEffect(() => { setOpen(false); }, [pathname]);
  const links = navItems.map(({to, label}) => <Link key={to} to={to} className="nav-link" data-active={to === '/' ? pathname === '/' : pathname === to || pathname.startsWith(`${to}/`)} aria-current={(to === '/' ? pathname === '/' : pathname === to) ? 'page' : undefined}>{label}</Link>);
  return <><a className="skip-link" href="#main-content">Skip to content</a><header className="site-header"><div className="site-container flex h-20 items-center justify-between gap-6">
    <Link to="/" className="wordmark" aria-label="ICK Technologies home">ICK <span>Technologies</span></Link>
    <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">{links}</nav>
    <Button asChild className="hidden lg:inline-flex"><Link to="/discuss-project">Discuss a project <ArrowUpRight aria-hidden="true" /></Link></Button>
    <Button variant="ghost" size="icon" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)} className="lg:hidden">{open ? <X /> : <Menu />}</Button>
  </div>{open && <nav id="mobile-navigation" aria-label="Mobile navigation" className="mobile-nav lg:hidden" onKeyDown={e => { if (e.key === 'Escape') setOpen(false); }}>{links}<Button asChild className="mt-4 w-full"><Link to="/discuss-project">Discuss a project <ArrowUpRight aria-hidden="true" /></Link></Button></nav>}</header></>;
}
export function SiteFooter() {
  return <footer className="site-footer"><div className="site-container"><div className="grid gap-9 pb-10 md:grid-cols-[2fr_1fr_1fr]">
    <div><Link to="/" className="wordmark">ICK <span>Technologies</span></Link><p className="body-copy mt-4 max-w-sm">An emerging African technology brand.<br />Built around technology and human progress.</p></div>
    <div><h2 className="mb-3 text-sm font-semibold">Explore</h2><nav aria-label="Footer company navigation" className="flex flex-col items-start"><Link className="footer-link" to="/about">About ICK Technologies</Link><Link className="footer-link" to="/services">Consultation topics</Link><Link className="footer-link" to="/products">Products</Link></nav></div>
    <div><h2 className="mb-3 text-sm font-semibold">Connect</h2><nav aria-label="Footer contact navigation" className="flex flex-col items-start"><Link className="footer-link" to="/discuss-project">Discuss a project</Link><Link className="footer-link" to="/contact">Contact</Link></nav></div>
  </div><div className="flex flex-col gap-4 border-t border-border py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getUTCFullYear()} ICK Technologies</p><nav aria-label="Legal navigation" className="flex gap-6"><Link className="footer-link" to="/privacy">Privacy</Link><Link className="footer-link" to="/terms">Terms</Link></nav></div></div></footer>;
}
