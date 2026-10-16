// Browser-safe rules for the AI topic suggestion tool. Visitor text is never stored.
export const ADVISOR_MIN_CHARS = 20;
export const ADVISOR_MAX_CHARS = 1200;
export const ADVISOR_MAX_REQUESTS = 5;
export const ADVISOR_WINDOW_MS = 10 * 60 * 1000;
export const ADVISOR_MAX_QUESTIONS = 5;

export const advisorTopicIds = ['software-development', 'ai-solutions', 'cybersecurity-ict'] as const;
export type AdvisorTopicId = (typeof advisorTopicIds)[number];

export type AdvisorResult = {
  topics: { id: AdvisorTopicId; reason: string }[];
  questions: string[];
  note: string;
};

export function validateChallenge(input: unknown): { ok: true; text: string } | { ok: false; error: string } {
  if (typeof input !== 'string') return { ok: false, error: 'Please describe your challenge.' };
  const text = input.trim();
  if (text.length < ADVISOR_MIN_CHARS) return { ok: false, error: `Please write at least ${ADVISOR_MIN_CHARS} characters.` };
  if (text.length > ADVISOR_MAX_CHARS) return { ok: false, error: `Please keep it under ${ADVISOR_MAX_CHARS} characters.` };
  return { ok: true, text };
}

export function createRateLimiter(max = ADVISOR_MAX_REQUESTS, windowMs = ADVISOR_WINDOW_MS) {
  const hits = new Map<string, number[]>();
  return (key: string, now = Date.now()) => {
    const recent = (hits.get(key) ?? []).filter(t => now - t < windowMs);
    if (recent.length >= max) { hits.set(key, recent); return false; }
    recent.push(now);
    hits.set(key, recent);
    if (hits.size > 5000) hits.clear();
    return true;
  };
}

export function normalizeAdvisorResult(raw: unknown): AdvisorResult {
  const r = (raw ?? {}) as Partial<AdvisorResult>;
  const seen = new Set<string>();
  const topics = (Array.isArray(r.topics) ? r.topics : [])
    .filter(t => t && advisorTopicIds.includes(t.id as AdvisorTopicId) && !seen.has(t.id) && seen.add(t.id))
    .map(t => ({ id: t.id, reason: String(t.reason ?? '').slice(0, 400) }));
  const questions = (Array.isArray(r.questions) ? r.questions : [])
    .map(q => String(q).trim()).filter(Boolean).slice(0, ADVISOR_MAX_QUESTIONS).map(q => q.slice(0, 300));
  return { topics, questions, note: String(r.note ?? '').slice(0, 400) };
}

// Kill switch: AI requests stay off unless the server env flag is exactly "true".
export function isAdvisorEnabled(flag: string | undefined): boolean {
  return flag === 'true';
}
export const ADVISOR_PAUSED_MESSAGE = 'The AI topic finder is paused while privacy and cost safeguards are reviewed. You can still explore the three topics below.';

// Runs `run` only when the flag is exactly "true"; otherwise returns the paused result without touching `run`.
export async function gateAdvisor<T>(flag: string | undefined, run: () => Promise<T>): Promise<T | { ok: false; paused: true; error: string }> {
  if (!isAdvisorEnabled(flag)) return { ok: false, paused: true, error: ADVISOR_PAUSED_MESSAGE };
  return run();
}
