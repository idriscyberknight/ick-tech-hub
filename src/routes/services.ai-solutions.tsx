import { createFileRoute } from '@tanstack/react-router';
import { ServiceDetail } from '@/components/site/service-detail';
import { pageHead } from '@/lib/site-content';
export const Route = createFileRoute('/services/ai-solutions')({ head: () => pageHead('Artificial Intelligence', 'AI integrations, assistants, automation, and intelligent workflows as consultation topics.'), component: () => <ServiceDetail index={1} /> });
