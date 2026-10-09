import { createFileRoute } from '@tanstack/react-router';
import { ServiceDetail } from '@/components/site/service-detail';
import { pageHead } from '@/lib/site-content';
export const Route = createFileRoute('/services/ai-solutions')({ head: () => pageHead('Artificial Intelligence', 'Explore AI assistants, workflow automation, integrations, and responsible AI with data considerations, human oversight, and clear limitations.'), component: () => <ServiceDetail index={1} /> });
