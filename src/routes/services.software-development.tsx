import { createFileRoute } from '@tanstack/react-router';
import { ServiceDetail } from '@/components/site/service-detail';
import { pageHead } from '@/lib/site-content';
export const Route = createFileRoute('/services/software-development')({ head: () => pageHead('Software Development', 'Explore websites, web applications, business software, and possible mobile apps: use cases, discovery, accessibility, and scope considerations.'), component: () => <ServiceDetail index={0} /> });
