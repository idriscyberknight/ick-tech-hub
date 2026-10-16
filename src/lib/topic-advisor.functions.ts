import { createServerFn } from '@tanstack/react-start';
import { getRequestHeader } from '@tanstack/react-start/server';
import { ADVISOR_PAUSED_MESSAGE, createRateLimiter, isAdvisorEnabled, validateChallenge, type AdvisorResult } from './topic-advisor';

const allow = createRateLimiter();

export const suggestConsultationTopics = createServerFn({ method: 'POST' })
  .validator((data: unknown) => {
    if ((data as { consent?: unknown })?.consent !== true) throw new Error('Please confirm the notice before continuing.');
    const v = validateChallenge((data as { text?: unknown })?.text);
    if (!v.ok) throw new Error(v.error);
    return { text: v.text };
  })
  .handler(async ({ data }): Promise<{ ok: true; result: AdvisorResult } | { ok: false; error: string; paused?: boolean }> => {
    if (!isAdvisorEnabled(process.env['TOPIC_ADVISOR_ENABLED'])) return { ok: false, paused: true, error: ADVISOR_PAUSED_MESSAGE };
    const ip = getRequestHeader('cf-connecting-ip') ?? getRequestHeader('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
    if (!allow(ip)) return { ok: false, error: 'You have reached the limit for now. Please try again in about 10 minutes.' };
    const { suggestTopics, AdvisorError } = await import('./topic-advisor.server');
    try {
      return { ok: true, result: await suggestTopics(data.text) };
    } catch (e) {
      return { ok: false, error: e instanceof AdvisorError ? e.message : 'We could not generate suggestions.' };
    }
  });
