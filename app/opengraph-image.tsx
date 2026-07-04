import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'BuildspaceLabs, India\'s First AI-Native Product Studio';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          backgroundColor: '#FBFBFC',
          backgroundImage:
            'radial-gradient(1100px 650px at 18% 8%, rgba(37,99,235,0.08) 0%, rgba(251,251,252,0) 58%)',
          color: '#0E1116',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              display: 'flex',
              fontSize: 44,
              fontWeight: 800,
              fontFamily: 'monospace',
              letterSpacing: -2,
            }}
          >
            <span style={{ color: '#2563EB' }}>{'{'}</span>
            <span style={{ color: '#0E1116' }}>bs</span>
            <span style={{ color: '#2563EB' }}>{'}'}</span>
          </div>
          <div style={{ display: 'flex', fontSize: 32, fontWeight: 600, letterSpacing: -0.5 }}>
            BuildspaceLabs
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              display: 'flex',
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 1000,
            }}
          >
            India&apos;s First AI-Native Product Studio
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 30,
              color: '#565D6B',
              lineHeight: 1.3,
              maxWidth: 900,
            }}
          >
            Custom AI · Intelligent automation · Production software · 24h prototypes
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 22,
            color: '#8A909E',
            width: '100%',
          }}
        >
          <div style={{ display: 'flex' }}>buildspacelabs.com</div>
          <div style={{ display: 'flex' }}>AI-Native · Engineering Lab</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
