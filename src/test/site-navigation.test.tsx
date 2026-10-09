import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { AnchorHTMLAttributes } from 'react';

const location = vi.hoisted(() => ({ pathname: '/' }));
vi.mock('@tanstack/react-router', () => ({
  Link: ({ to, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }) => <a href={to} {...props} />,
  useRouterState: ({ select }: { select: (state: { location: { pathname: string } }) => unknown }) => select({ location }),
}));
import { SiteHeader } from '@/components/site/site-shell';

afterEach(() => { cleanup(); location.pathname = '/'; });
describe('Mobile navigation behavior', () => {
  it('returns focus to the trigger when Escape closes the menu', () => {
    render(<SiteHeader />);
    const trigger = screen.getByRole('button', { name: 'Open navigation' });
    fireEvent.click(trigger);
    const menu = screen.getByRole('navigation', { name: 'Mobile navigation' });
    const link = menu.querySelector('a');
    link?.focus();
    fireEvent.keyDown(menu, { key: 'Escape' });
    expect(trigger).toHaveFocus();
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
  });
  it('closes an open menu when the current page changes', () => {
    const { rerender } = render(<SiteHeader />);
    const trigger = screen.getByRole('button', { name: 'Open navigation' });
    fireEvent.click(trigger);
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    location.pathname = '/about';
    rerender(<SiteHeader />);
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
  });
  it('toggles closed when the trigger is pressed a second time', () => {
    render(<SiteHeader />);
    const trigger = screen.getByRole('button', { name: 'Open navigation' });
    fireEvent.click(trigger);
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    fireEvent.click(trigger);
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
  });
});