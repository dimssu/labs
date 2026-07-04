import type { Metadata } from 'next';
import HomeClient from '@/views/Home/Home';
import { JsonLd, websiteSchema, SITE_URL } from '@/lib/seo/jsonLd';

export const metadata: Metadata = {
  title: 'BuildspaceLabs, India\'s First AI-Native Product Studio',
  description:
    'BuildspaceLabs is India\'s AI-native product studio and engineering lab. We build custom AI solutions, intelligent automation, and production-ready software for enterprises worldwide, designed and shipped by a senior team.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'BuildspaceLabs, India\'s First AI-Native Product Studio',
    description:
      'AI-native engineering lab. Custom AI and production software, built by a senior team. Serving healthcare, logistics, real estate & more.',
    url: SITE_URL,
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={websiteSchema()} />
      <HomeClient />
    </>
  );
}
