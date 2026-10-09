import { createFileRoute } from '@tanstack/react-router';
import { ServiceDetail } from '@/components/site/service-detail';
import { pageHead } from '@/lib/site-content';
export const Route = createFileRoute('/services/cybersecurity-ict')({ head: () => pageHead('Cybersecurity & ICT', 'Security assessments, security awareness, ICT consulting, and technical support as consultation topics.'), component: () => <ServiceDetail index={2} /> });
