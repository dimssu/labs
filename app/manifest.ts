import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'BuildspaceLabs, India\'s First AI-Native Product Studio',
    short_name: 'BuildspaceLabs',
    description:
      'AI-native product studio and engineering lab. Custom AI solutions, intelligent automation, and production-ready software.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#0a0a0a',
    theme_color: '#0a0a0a',
    lang: 'en',
    categories: ['business', 'technology', 'productivity'],
    icons: [
      { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
      { src: '/favicon-light.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/favicon-dark.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
  };
}
