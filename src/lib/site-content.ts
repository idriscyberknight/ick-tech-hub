import { Code2, Cpu, ShieldCheck } from 'lucide-react';

export const services = [
  { title: 'Software Development', path: '/services/software-development', icon: Code2, number: '01', description: 'Websites, applications, and business software shaped around real-world needs.', topics: ['Websites', 'Web applications', 'Business software', 'Mobile application solutions'] },
  { title: 'Artificial Intelligence', path: '/services/ai-solutions', icon: Cpu, number: '02', description: 'Exploring intelligent tools that simplify work and open new possibilities.', topics: ['AI integrations', 'AI assistants', 'Business automation', 'Intelligent workflows'] },
  { title: 'Cybersecurity & ICT', path: '/services/cybersecurity-ict', icon: ShieldCheck, number: '03', description: 'A considered approach to digital security, technology, and trust.', topics: ['Security assessments', 'Security awareness', 'ICT consulting', 'Technical support'] },
] as const;
export const values = ['Integrity', 'Innovation', 'Security & Trust', 'Accessibility', 'Excellence', 'Accountability'];
export const vision = 'To shape a future where technology advances human potential, empowers businesses, and creates meaningful progress for communities worldwide.';
export const mission = 'To design, develop, and deliver secure, intelligent, and accessible technologies that solve real-world problems, connect people with opportunities, and enable businesses to grow.';
export function pageHead(title: string, description: string) {
  const fullTitle = `${title} — ICK Technologies`;
  return { meta: [{ title: fullTitle }, { name: 'description', content: description }, { property: 'og:title', content: fullTitle }, { property: 'og:description', content: description }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] };
}
