import { describe, expect, it } from 'vitest';
import { createRateLimiter, normalizeAdvisorResult, validateChallenge } from '@/lib/topic-advisor';

describe('topic advisor rules', () => {
  it('rejects text shorter than 20 characters', () => expect(validateChallenge('too short').ok).toBe(false));
  it('rejects text longer than 1200 characters', () => expect(validateChallenge('a'.repeat(1201)).ok).toBe(false));
  it('accepts a normal description', () => expect(validateChallenge('We lose track of customer orders every week.').ok).toBe(true));
  it('allows 5 requests per visitor per 10 minutes', () => {
    const allow = createRateLimiter();
    for (let i = 0; i < 5; i++) expect(allow('v', 0)).toBe(true);
    expect(allow('v', 1000)).toBe(false);
    expect(allow('v', 10 * 60 * 1000 + 1)).toBe(true);
  });
  it('drops unknown topics and caps questions at 5', () => {
    const r = normalizeAdvisorResult({ topics: [{ id: 'payments', reason: 'x' }, { id: 'ai-solutions', reason: 'y' }], questions: ['1', '2', '3', '4', '5', '6'], note: '' });
    expect(r.topics.map(t => t.id)).toEqual(['ai-solutions']);
    expect(r.questions).toHaveLength(5);
  });
});
