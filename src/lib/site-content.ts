import { Code2, Cpu, ShieldCheck } from 'lucide-react';

export const services = [
  { title: 'Software Development', path: '/services/software-development', icon: Code2, number: '01', description: 'Websites, applications, and business software shaped around real-world needs.', topics: ['Websites', 'Web applications', 'Business software', 'Mobile application solutions'] },
  { title: 'Artificial Intelligence', path: '/services/ai-solutions', icon: Cpu, number: '02', description: 'Exploring intelligent tools that simplify work and open new possibilities.', topics: ['AI integrations', 'AI assistants', 'Business automation', 'Intelligent workflows'] },
  { title: 'Cybersecurity & ICT', path: '/services/cybersecurity-ict', icon: ShieldCheck, number: '03', description: 'A considered approach to digital security, technology, and trust.', topics: ['Security assessments', 'Security awareness', 'ICT consulting', 'Technical support'] },
] as const;
export const values = ['Integrity', 'Innovation', 'Security & Trust', 'Accessibility', 'Excellence', 'Accountability'];
export const purpose = 'To advance technology and human progress by creating solutions that expand opportunities, unlock human potential, and improve lives.';
export const valuePerspectives = [
  'Be honest about what is possible, what is known, and what still needs to be explored.',
  'Explore new ideas with real human needs as the starting point.',
  'Consider risks, privacy, and trust from the beginning—not as an afterthought.',
  'Think about the different people, abilities, and circumstances a solution should serve.',
  'Value thoughtful design, careful decisions, and work that is fit for its purpose.',
  'Take ownership of decisions and be clear about responsibilities and limitations.',
];
export const approach = [
  { title: 'Understand the need', description: 'Begin with the people, the problem, and the context. Listen before deciding what technology might help.' },
  { title: 'Explore the possibilities', description: 'Consider practical options, accessibility, security, and constraints—not just the newest technology.' },
  { title: 'Define a responsible scope', description: 'Clarify feasibility, availability, responsibilities, and expectations before any delivery commitment.' },
  { title: 'Review before moving forward', description: 'Any future delivery would need an agreed scope and appropriate review. Progress should be deliberate, not assumed.' },
] as const;
export const vision = 'To shape a future where technology advances human potential, empowers businesses, and creates meaningful progress for communities worldwide.';
export const mission = 'To design, develop, and deliver secure, intelligent, and accessible technologies that solve real-world problems, connect people with opportunities, and enable businesses to grow.';
export function pageHead(title: string, description: string) {
  const fullTitle = `${title} — ICK Technologies`;
  return { meta: [{ title: fullTitle }, { name: 'description', content: description }, { property: 'og:title', content: fullTitle }, { property: 'og:description', content: description }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] };
}
