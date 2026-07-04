import type { Metadata } from 'next';
import ServicesClient from '@/views/Services/Services';
import {
  JsonLd,
  itemListSchema,
  breadcrumbSchema,
  SITE_URL,
} from '@/lib/seo/jsonLd';

export const metadata: Metadata = {
  title: 'Our Services, Custom AI Builds, Products & Fractional CTO',
  description:
    'Three ways to work with BuildspaceLabs: custom software builds, ready-to-deploy AI products live in about a week, or fractional CTO partnership. AI-native engineering.',
  keywords: [
    'custom AI development',
    'AI products',
    'fractional CTO',
    'AI engineering services',
    'BuildspaceLabs services',
    'enterprise AI',
  ],
  alternates: { canonical: '/our-services' },
  openGraph: {
    title: 'Our Services, BuildspaceLabs',
    description:
      'Custom software builds, ready-to-deploy AI products, and Fractional CTO partnerships. AI-native engineering for enterprises.',
    url: `${SITE_URL}/our-services`,
    type: 'website',
  },
};

const services = [
  {
    name: 'Custom AI Builds',
    url: `${SITE_URL}/our-services#custom`,
    description: 'Bespoke AI systems and enterprise software, built from scratch, end to end.',
  },
  {
    name: 'Ready-to-Deploy AI Products',
    url: `${SITE_URL}/our-services#products`,
    description: 'Pre-built AI products live in your stack in about a week.',
  },
  {
    name: 'Fractional CTO',
    url: `${SITE_URL}/our-services#fractional-cto`,
    description: 'Senior engineering leadership embedded in your team.',
  },
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={itemListSchema(services, 'BuildspaceLabs Services')} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Our Services', url: `${SITE_URL}/our-services` },
        ])}
      />
      <ServicesClient />
    </>
  );
}
