import { ImageResponse } from 'next/og';
import { productsData } from '@/data/products';

export const alt = 'BuildspaceLabs product';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export async function generateStaticParams() {
  return Object.keys(productsData).map((id) => ({ id }));
}

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductOgImage({ params }: Props) {
  const { id } = await params;
  const product = productsData[id];
  const title = product?.title ?? 'BuildspaceLabs';
  const subtitle =
    product?.subtitle ??
    'AI-native product studio building custom AI solutions and production software.';
  const categories = product?.categories?.join(' · ') ?? 'AI · Engineering';
  const status = product?.status === 'live' ? 'Live in production' : 'Prototype';
  const statusColor = product?.status === 'live' ? '#16A34A' : '#B45309';

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
            'radial-gradient(900px 500px at 82% 0%, rgba(37,99,235,0.08) 0%, rgba(251,251,252,0) 58%)',
          color: '#0E1116',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                display: 'flex',
                fontSize: 38,
                fontWeight: 800,
                fontFamily: 'monospace',
                letterSpacing: -2,
              }}
            >
              <span style={{ color: '#2563EB' }}>{'{'}</span>
              <span style={{ color: '#0E1116' }}>bs</span>
              <span style={{ color: '#2563EB' }}>{'}'}</span>
            </div>
            <div style={{ display: 'flex', fontSize: 26, fontWeight: 600 }}>BuildspaceLabs</div>
          </div>
          <div
            style={{
              display: 'flex',
              padding: '8px 16px',
              borderRadius: 999,
              fontSize: 18,
              color: statusColor,
              backgroundColor: 'rgba(15,18,26,0.04)',
              border: '1px solid rgba(15,18,26,0.10)',
            }}
          >
            {status}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div
            style={{
              display: 'flex',
              fontSize: 26,
              color: '#2563EB',
              textTransform: 'uppercase',
              letterSpacing: 3,
            }}
          >
            {categories}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 80,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 1040,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 28,
              color: '#565D6B',
              lineHeight: 1.35,
              maxWidth: 1040,
            }}
          >
            {subtitle}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 22, color: '#8A909E', width: '100%' }}>
          <div style={{ display: 'flex' }}>buildspacelabs.com/product/{id}</div>
          <div style={{ display: 'flex' }}>AI-Native Engineering</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
