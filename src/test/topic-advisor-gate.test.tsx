import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { AnchorHTMLAttributes } from 'react';
import { gateAdvisor } from '@/lib/topic-advisor';

const fns = vi.hoisted(() => ({ getAdvisorStatus: vi.fn(), suggestConsultationTopics: vi.fn() }));
vi.mock('@/lib/topic-advisor.functions', () => fns);
vi.mock('@tanstack/react-router', () => ({
  Link: ({ to, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }) => <a href={to} {...props} />,
}));
import { TopicAdvisor } from '@/components/site/topic-advisor';

afterEach(() => { cleanup(); vi.clearAllMocks(); });

describe('AI topic finder kill switch', () => {
  it.each([undefined, '', 'false', 'TRUE', '1'])('server gate with flag %s never loads the AI code', async flag => {
    const run = vi.fn();
    const res = await gateAdvisor(flag, run);
    expect(run).not.toHaveBeenCalled();
    expect(res).toMatchObject({ ok: false, paused: true });
  });
  it('server gate runs only for the literal "true"', async () => {
    const run = vi.fn().mockResolvedValue('ran');
    expect(await gateAdvisor('true', run)).toBe('ran');
  });
  it('shows no text box and sends nothing when the server says off', async () => {
    fns.getAdvisorStatus.mockResolvedValue({ enabled: false });
    render(<TopicAdvisor />);
    await waitFor(() => expect(fns.getAdvisorStatus).toHaveBeenCalled());
    expect(screen.queryByRole('textbox')).toBeNull();
    expect(screen.queryByRole('button', { name: /suggest topics/i })).toBeNull();
    expect(screen.getAllByRole('link')).toHaveLength(3);
    expect(fns.suggestConsultationTopics).not.toHaveBeenCalled();
  });
  it('stays off when the status check fails', async () => {
    fns.getAdvisorStatus.mockRejectedValue(new Error('offline'));
    render(<TopicAdvisor />);
    await waitFor(() => expect(fns.getAdvisorStatus).toHaveBeenCalled());
    expect(screen.queryByRole('textbox')).toBeNull();
  });
});
