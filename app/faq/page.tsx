import type { Metadata } from 'next';
import FAQClient from '@/views/FAQ/FAQ';
import { faqs } from '@/data/faq';
import {
  JsonLd,
  faqSchema,
  breadcrumbSchema,
  SITE_URL,
} from '@/lib/seo/jsonLd';

export const metadata: Metadata = {
  title: 'FAQ, Frequently Asked Questions',
  description:
    'Answers to common questions about BuildspaceLabs: what we do, AI automation capabilities, engagement timelines, and how to work with us.',
  keywords: [
    'BuildspaceLabs FAQ',
    'AI agent development',
    'AI engagement timeline',
    'MVP timeline',
    'AI automation questions',
  ],
  alternates: { canonical: '/faq' },
  openGraph: {
    title: 'FAQ, BuildspaceLabs',
    description:
      'Answers to questions about BuildspaceLabs services, timelines, AI capabilities, and engagement models.',
    url: `${SITE_URL}/faq`,
    type: 'website',
  },
};

export default function FAQPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'FAQ', url: `${SITE_URL}/faq` },
        ])}
      />
      <FAQClient />
    </>
  );
}
