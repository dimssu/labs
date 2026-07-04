import type { Metadata, Viewport } from 'next';
import { Source_Serif_4 } from 'next/font/google';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import '../src/styles/global.scss';
import { JsonLd, organizationSchema, SITE_URL } from '@/lib/seo/jsonLd';
import MotionProvider from '@/components/MotionProvider';
import ScrollProgress from '@/components/ScrollProgress';

// Statement face — a contemporary optical-size serif used ONLY for the hero H1
// and section H2s. Reads as established/editorial (McKinsey / Stripe Press
// grade) rather than the "trying too hard" of a novelty grotesque.
const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
});

// Body + mono are Geist (self-hosted via next/font, zero layout shift). Geist
// Sans carries all UI/body/functional headings; Geist Mono is near-zero.

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'BuildspaceLabs, India\'s First AI-Native Product Studio',
    template: '%s | BuildspaceLabs',
  },
  description:
    'BuildspaceLabs is India\'s AI-native product studio and engineering lab. We build custom AI solutions, intelligent automation, and production-ready software for enterprises worldwide.',
  applicationName: 'BuildspaceLabs',
  keywords: [
    'AI product studio',
    'India AI engineering',
    'custom AI solutions',
    'AI agents',
    'LLM development',
    'machine learning',
    'software development',
    'fractional CTO',
    'AI automation',
    'BuildspaceLabs',
  ],
  authors: [{ name: 'BuildspaceLabs', url: SITE_URL }],
  creator: 'BuildspaceLabs',
  publisher: 'BuildspaceLabs',
  category: 'technology',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: 'BuildspaceLabs',
    title: 'BuildspaceLabs, India\'s First AI-Native Product Studio',
    description:
      'We build custom AI solutions, intelligent automation, and production-ready software, designed and shipped by a senior team.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BuildspaceLabs, AI-Native Product Studio',
    description: 'India\'s AI-native engineering lab. Custom AI and production software, built by a senior team.',
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  formatDetection: { email: false, address: false, telephone: false },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FBFBFC' },
    { media: '(prefers-color-scheme: dark)', color: '#0B0D12' },
  ],
  colorScheme: 'light',
};

// Runs before first paint so a saved theme is applied synchronously, kills the
// flash-of-wrong-theme when a returning visitor has toggled to dark. Light is
// the default when nothing is stored.
const noFlashTheme = `(function(){try{var e=document.documentElement;e.classList.add('js');var t=localStorage.getItem('app-theme');if(t!=='dark'&&t!=='light'){t='light';}e.setAttribute('data-theme',t);e.style.colorScheme=t;}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable} ${sourceSerif.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashTheme }} />
      </head>
      <body>
        <JsonLd data={organizationSchema()} />
        <MotionProvider>
          <ScrollProgress />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
