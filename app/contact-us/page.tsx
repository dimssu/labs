import type { Metadata } from 'next';
import ContactClient from '@/views/Contact/Contact';
import { JsonLd, breadcrumbSchema, SITE_URL, SITE_NAME } from '@/lib/seo/jsonLd';

export const metadata: Metadata = {
  title: 'Contact Us, Start a Project with BuildspaceLabs',
  description:
    'Get in touch with BuildspaceLabs to start a project. Email aryan@vruoom.com, WhatsApp +91 834 071 1366, or fill out the form. We reply within one business day.',
  keywords: [
    'contact BuildspaceLabs',
    'start AI project',
    'hire AI developers',
    'AI consulting India',
  ],
  alternates: { canonical: '/contact-us' },
  openGraph: {
    title: 'Contact BuildspaceLabs',
    description:
      'Start a project with BuildspaceLabs. Custom AI builds, ready-to-deploy products, fractional CTO. We reply within one business day.',
    url: `${SITE_URL}/contact-us`,
    type: 'website',
  },
};

const contactPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: `Contact ${SITE_NAME}`,
  url: `${SITE_URL}/contact-us`,
  description:
    'Reach BuildspaceLabs via email, WhatsApp, or the contact form. Replies within one business day.',
  mainEntity: {
    '@type': 'Organization',
    name: SITE_NAME,
    email: 'aryan@vruoom.com',
    telephone: '+91-834-071-1366',
    url: SITE_URL,
  },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={contactPageSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Contact', url: `${SITE_URL}/contact-us` },
        ])}
      />
      <ContactClient />
    </>
  );
}
