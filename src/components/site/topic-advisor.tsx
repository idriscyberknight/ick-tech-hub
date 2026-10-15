import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { suggestConsultationTopics } from '@/lib/topic-advisor.functions';
import { ADVISOR_MAX_CHARS, validateChallenge, type AdvisorResult } from '@/lib/topic-advisor';
import { consultationTopics } from '@/lib/consultation-content';

const topicLinks = {
  'software-development': { to: '/services/software-development', title: consultationTopics[0].title },
  'ai-solutions': { to: '/services/ai-solutions', title: consultationTopics[1].title },
  'cybersecurity-ict': { to: '/services/cybersecurity-ict', title: consultationTopics[2].title },
} as const;

export function TopicAdvisor() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AdvisorResult | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const v = validateChallenge(text);
    if (!v.ok) { setError(v.error); return; }
    setLoading(true); setError(null); setResult(null);
    try {
      const res = await suggestConsultationTopics({ data: { text: v.text } });
      if (res.ok) setResult(res.result); else setError(res.error);
    } catch (err) {
      setError(err instanceof Error && err.message ? err.message : 'We could not generate suggestions.');
    } finally { setLoading(false); }
  }

  return <section className="section-band border-t border-border" aria-labelledby="advisor-heading"><div className="site-container grid gap-10 lg:grid-cols-[1fr_1.3fr]">
    <div>
      <p className="eyebrow mb-4 text-primary">AI-powered topic finder</p>
      <h2 id="advisor-heading" className="section-heading">Not sure where to start?</h2>
      <p className="body-copy mt-5">Describe a technology challenge in a few sentences. An AI model will suggest which consultation topics may be relevant and questions worth thinking about.</p>
      <p className="body-copy mt-4 text-sm">Your text is not saved or sent to ICK Technologies—it is used only to generate these suggestions. Do not include personal, confidential or security-sensitive details. Suggestions are automated and may be wrong; they are not advice or a service offer.</p>
    </div>
    <div>
      <form onSubmit={onSubmit} noValidate>
        <label htmlFor="advisor-text" className="mb-2 block text-sm font-semibold">Your technology challenge</label>
        <Textarea id="advisor-text" value={text} onChange={e => setText(e.target.value)} maxLength={ADVISOR_MAX_CHARS} rows={5} aria-describedby="advisor-count" placeholder="For example: our small shop tracks orders in notebooks and we often lose track of deliveries." />
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <span id="advisor-count" className="text-xs text-muted-foreground">{text.length}/{ADVISOR_MAX_CHARS} characters</span>
          <Button type="submit" disabled={loading}>{loading ? <><Loader2 className="animate-spin" aria-hidden="true" /> Thinking…</> : 'Suggest topics'}</Button>
        </div>
      </form>
      <div aria-live="polite" className="mt-6">
        {error && <p role="alert" className="border-l-2 border-destructive pl-4 text-sm">{error}</p>}
        {result && <div className="space-y-6">
          {result.topics.length > 0 && <div><h3 className="mb-3 text-lg font-semibold">Possibly relevant topics</h3><ul className="space-y-3">{result.topics.map(t => <li key={t.id} className="border-t border-border pt-3"><Link to={topicLinks[t.id].to} className="inline-flex items-center gap-1 font-semibold text-primary underline-offset-4 hover:underline">{topicLinks[t.id].title} <ArrowRight className="size-4" aria-hidden="true" /></Link><p className="body-copy mt-1">{t.reason}</p></li>)}</ul></div>}
          {result.questions.length > 0 && <div><h3 className="mb-3 text-lg font-semibold">Questions to reflect on</h3><ol className="list-decimal space-y-2 pl-5">{result.questions.map(q => <li key={q} className="body-copy">{q}</li>)}</ol></div>}
          {result.note && <p className="border-l-2 border-teal bg-secondary p-4 text-sm">{result.note}</p>}
        </div>}
      </div>
    </div>
  </div></section>;
}
