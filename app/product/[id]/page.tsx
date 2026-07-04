import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { productsData } from '@/data/products';
import ProductClient from '@/views/Product/Product';
import {
  JsonLd,
  productSchema,
  breadcrumbSchema,
  SITE_URL,
} from '@/lib/seo/jsonLd';

interface Props {
  params: Promise<{ id: string }>;
}

/** Pre-build all product pages as static HTML at build time */
export async function generateStaticParams() {
  return Object.keys(productsData).map((id) => ({ id }));
}

/** Per-product SEO metadata */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = productsData[id];

  if (!product) {
    return {
      title: 'Product Not Found',
      robots: { index: false, follow: false },
    };
  }

  const techStackStr = product.techStack.join(', ');
  const categoriesStr = product.categories.join(', ');
  const url = `${SITE_URL}/product/${id}`;

  return {
    title: `${product.title}, ${categoriesStr}`,
    description: `${product.subtitle} Tech stack: ${techStackStr}. Built by BuildspaceLabs for ${product.client}.`,
    alternates: { canonical: `/product/${id}` },
    openGraph: {
      title: `${product.title} | BuildspaceLabs`,
      description: product.subtitle,
      url,
      type: 'article',
      locale: 'en_IN',
      siteName: 'BuildspaceLabs',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.title} | BuildspaceLabs`,
      description: product.subtitle,
    },
    keywords: [
      product.title,
      ...product.categories,
      ...product.techStack,
      product.client,
      'BuildspaceLabs',
      'AI product',
    ],
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = productsData[id];

  if (!product) {
    notFound();
  }

  return (
    <>
      <JsonLd data={productSchema(product)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Portfolio', url: `${SITE_URL}/portfolio` },
          { name: product.title, url: `${SITE_URL}/product/${id}` },
        ])}
      />
      <ProductClient productId={id} />
    </>
  );
}
