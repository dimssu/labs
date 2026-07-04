import type { Metadata } from 'next';
import PortfolioClient from '@/views/Portfolio/Portfolio';
import { productsData } from '@/data/products';
import {
  JsonLd,
  itemListSchema,
  breadcrumbSchema,
  SITE_URL,
} from '@/lib/seo/jsonLd';

export const metadata: Metadata = {
  title: 'Portfolio, Production AI & Software Projects',
  description:
    'Explore BuildspaceLabs\' portfolio: AI clinical notes, fleet management, EV charging, lease management, web scraping APIs, edge AI engines and more. All live. All in production.',
  keywords: [
    'AI portfolio',
    'AI case studies',
    'production AI projects',
    'BuildspaceLabs portfolio',
    'AI products India',
  ],
  alternates: { canonical: '/portfolio' },
  openGraph: {
    title: 'Portfolio, BuildspaceLabs',
    description:
      'Production AI and software projects across healthcare, logistics, real estate, government and more.',
    url: `${SITE_URL}/portfolio`,
    type: 'website',
  },
};

export default function PortfolioPage() {
  const items = Object.values(productsData).map((p) => ({
    name: p.title,
    url: `${SITE_URL}/product/${p.id}`,
    description: p.subtitle,
  }));

  return (
    <>
      <JsonLd data={itemListSchema(items, 'BuildspaceLabs Portfolio')} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Portfolio', url: `${SITE_URL}/portfolio` },
        ])}
      />
      <PortfolioClient />
    </>
  );
}
