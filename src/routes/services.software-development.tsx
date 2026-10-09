import { createFileRoute } from '@tanstack/react-router';
import { ServiceDetail } from '@/components/site/service-detail';
import { pageHead } from '@/lib/site-content';
export const Route = createFileRoute('/services/software-development')({ head: () => pageHead('Software Development', 'Websites, web applications, business software, and mobile application solutions as consultation topics.'), component: () => <ServiceDetail index={0} /> });
