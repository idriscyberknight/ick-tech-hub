import { createServerFn } from '@tanstack/react-start';
import { getRequestHeader } from '@tanstack/react-start/server';
import { createRateLimiter, gateAdvisor, isAdvisorEnabled, validateChallenge, type AdvisorResult } from './topic-advisor';

const allow = createRateLimiter();

export const suggestConsultationTopics = createServerFn({ method: 'POST' })
  .validator((data: unknown) => {
    if ((data as { consent?: unknown })?.consent !== true) throw new Error('Please confirm the notice before continuing.');
    const v = validateChallenge((data as { text?: unknown })?.text);
    if (!v.ok) throw new Error(v.error);
    return { text: v.text };
  })
  .handler(async ({ data }): Promise<{ ok: true; result: AdvisorResult } | { ok: false; error: string; paused?: boolean }> => {
    return gateAdvisor(process.env['TOPIC_ADVISOR_ENABLED'], async () => {
    const ip = getRequestHeader('cf-connecting-ip') ?? getRequestHeader('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
    if (!allow(ip)) return { ok: false as const, error: 'You have reached the limit for now. Please try again in about 10 minutes.' };
    const { suggestTopics, AdvisorError } = await import('./topic-advisor.server');
    try {
      return { ok: true as const, result: await suggestTopics(data.text) };
    } catch (e) {
      return { ok: false as const, error: e instanceof AdvisorError ? e.message : 'We could not generate suggestions.' };
    }
    });
  });

// Lets the page know whether to show the form. Reads only the server flag; never touches the AI gateway.
export const getAdvisorStatus = createServerFn({ method: 'GET' }).handler(async () => ({ enabled: isAdvisorEnabled(process.env['TOPIC_ADVISOR_ENABLED']) }));
