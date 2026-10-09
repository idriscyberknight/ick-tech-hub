import { createFileRoute } from '@tanstack/react-router';
import { ServiceDetail } from '@/components/site/service-detail';
import { pageHead } from '@/lib/site-content';
export const Route = createFileRoute('/services/cybersecurity-ict')({ head: () => pageHead('Cybersecurity & ICT', 'Explore security awareness, explicitly authorized assessments, ICT consultation, and technical support topics without security guarantees.'), component: () => <ServiceDetail index={2} /> });
