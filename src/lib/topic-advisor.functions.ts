import { createServerFn } from '@tanstack/react-start';
import { getRequestHeader } from '@tanstack/react-start/server';
import { createRateLimiter, validateChallenge, type AdvisorResult } from './topic-advisor';

const allow = createRateLimiter();

export const suggestConsultationTopics = createServerFn({ method: 'POST' })
  .validator((data: unknown) => {
    const v = validateChallenge((data as { text?: unknown })?.text);
    if (!v.ok) throw new Error(v.error);
    return { text: v.text };
  })
  .handler(async ({ data }): Promise<{ ok: true; result: AdvisorResult } | { ok: false; error: string }> => {
    const ip = getRequestHeader('cf-connecting-ip') ?? getRequestHeader('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
    if (!allow(ip)) return { ok: false, error: 'You have reached the limit for now. Please try again in about 10 minutes.' };
    const { suggestTopics, AdvisorError } = await import('./topic-advisor.server');
    try {
      return { ok: true, result: await suggestTopics(data.text) };
    } catch (e) {
      return { ok: false, error: e instanceof AdvisorError ? e.message : 'We could not generate suggestions.' };
    }
  });
