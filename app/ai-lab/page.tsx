import type { Metadata } from 'next';
import AILabClient from '@/views/AILab/AILab';
import { JsonLd, breadcrumbSchema, SITE_URL } from '@/lib/seo/jsonLd';

export const metadata: Metadata = {
  title: 'AI Lab, Research, Models & Technical Papers',
  description:
    'BuildspaceLabs AI Lab: SLM360 (39ms on-device NLU), Med360 (multilingual medical AI for Indian healthcare), AgentGuard (deadlock prevention for multi-agent systems), VAJRA and KAVACH defence AI. Research meets engineering.',
  keywords: [
    'AI research India',
    'small language models',
    'SLM360',
    'Med360',
    'AgentGuard',
    'multi-agent systems',
    'on-device NLU',
    'defence AI',
  ],
  alternates: { canonical: '/ai-lab' },
  openGraph: {
    title: 'AI Lab, BuildspaceLabs',
    description:
      'Foundation models, research papers, and technical deep-dives from BuildspaceLabs. SLM360, Med360, AgentGuard and more.',
    url: `${SITE_URL}/ai-lab`,
    type: 'website',
  },
  robots: { index: false, follow: false },
};

export default function AILabPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'AI Lab', url: `${SITE_URL}/ai-lab` },
        ])}
      />
      <AILabClient />
    </>
  );
}
