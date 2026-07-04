'use client';

import Reveal from '../../components/Reveal';
import Parallax from '../../components/Parallax';
import styles from './Product.module.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import Eyebrow from '../../components/Eyebrow';
import ScreenshotFrame from '../../components/ScreenshotFrame';
import { productsData } from '../../data/products';

interface ProductProps {
  productId: string;
}

const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(' ');

/* --- Shared section head ------------------------------------------------ */

function SectionHead({
  eyebrow,
  title,
  standfirst,
  id,
}: {
  eyebrow: string;
  title: string;
  standfirst?: string;
  id?: string;
}) {
  return (
    <header className={styles.sectionHead}>
      <Reveal><Eyebrow>{eyebrow}</Eyebrow></Reveal>
      <Reveal delay={0.06}><h2 id={id} className={styles.sectionTitle}>{title}</h2></Reveal>
      {standfirst && <Reveal delay={0.12}><p className={styles.sectionStandfirst}>{standfirst}</p></Reveal>}
    </header>
  );
}

/* --- Page --------------------------------------------------------------- */

export default function Product({ productId }: ProductProps) {
  const product = productsData[productId];
  if (!product) return null;

  const statusLabel = product.status === 'live' ? 'Live' : 'Prototype';
  const category = product.categories.join(' · ');

  const hasImage = Boolean(product.coverImage);
  const hasMetrics = Boolean(product.metrics && product.metrics.length > 0);
  const hasHighlights = Boolean(product.highlights && product.highlights.length > 0);
  const hasFeatures = Boolean(product.features && product.features.length > 0);
  const hasOutcomes = Boolean(product.outcomes && product.outcomes.length > 0);
  const hasEngagement = Boolean(product.engagement);

  // Additional screenshots for the gallery — drop any that repeat the hero cover
  // so the same shot never appears twice on the page.
  const galleryItems = (product.gallery ?? []).filter(
    (g) => !product.coverImage || g.src !== product.coverImage.src,
  );
  const hasGallery = galleryItems.length > 0;

  // Close-section datasheet: prefer the real engagement record; otherwise fall
  // back to the product's own coordinates. No invented values.
  const coords = product.engagement
    ? [
        { k: 'Duration', v: product.engagement.duration },
        { k: 'Scope', v: product.engagement.scope },
        { k: 'Team', v: product.engagement.team },
      ]
    : [
        { k: 'Client', v: product.client },
        { k: 'Category', v: product.categories.join(', ') },
        { k: 'Status', v: statusLabel },
      ];

  return (
    <div className={styles.page}>
      <Header />
      <main>

        {/* ── Masthead ──────────────────────────────────────── */}
        <section className={styles.hero} aria-labelledby="product-title">
          <span className={styles.heroGlow} aria-hidden="true" />
          <div className={styles.shell}>
            <div className={styles.heroText}>
              <Reveal delay={0.02}><Eyebrow>{category}</Eyebrow></Reveal>
              <Reveal variant="blur" delay={0.08}>
                <h1 id="product-title" className={styles.heroTitle}>{product.title}</h1>
              </Reveal>
              <Reveal delay={0.18}>
                <p className={styles.heroLede}>{product.subtitle}</p>
              </Reveal>

              <Reveal delay={0.26}>
                <div className={styles.heroMeta}>
                  <span className={styles.statusPill}>
                    <span className={styles.statusDotMark} aria-hidden="true" />
                    {statusLabel}
                  </span>
                  <span className={styles.heroClient}>For {product.client}</span>
                </div>
              </Reveal>

              <Reveal delay={0.34}>
                <div className={styles.heroActions}>
                  <Button href="/contact-us" variant="primary">Start a build</Button>
                  <Button href="/portfolio" variant="text">Back to all work</Button>
                </div>
              </Reveal>
            </div>

            {hasImage && (
              <Reveal variant="scale" delay={0.12} className={styles.heroShot}>
                <div className={styles.heroStage}>
                  <span className={styles.heroStageGrid} aria-hidden="true" />
                  <Parallax amount={14} className={styles.heroShotFrame}>
                    <ScreenshotFrame
                      src={product.coverImage!.src}
                      alt={product.coverImage!.alt}
                      aspect="16 / 10"
                      reveal={false}
                      priority
                      sizes="(max-width: 1024px) 92vw, 1180px"
                    />
                  </Parallax>
                </div>
                {product.coverImage!.caption && (
                  <p className={styles.heroShotCaption}>{product.coverImage!.caption}</p>
                )}
              </Reveal>
            )}
          </div>
        </section>

        {/* ── Metrics datasheet ─────────────────────────────── */}
        {hasMetrics && (
          <section className={styles.metrics} aria-label="Results in production">
            <div className={styles.shell}>
              <ul className={styles.metricsRow}>
                {product.metrics.map((m, i) => (
                  <Reveal as="li" key={i} className={styles.metricCell} delay={i * 0.08}>
                    <span className={cx(styles.metricValue, 'tnum')}>{m.value}</span>
                    <span className={styles.metricLabel}>{m.label}</span>
                  </Reveal>
                ))}
              </ul>
              <p className={styles.metricsNote}>
                Measured on this product&apos;s own deployment for {product.client}.
              </p>
            </div>
          </section>
        )}

        {/* ── Overview (+ highlights) ───────────────────────── */}
        <section className={styles.section} aria-labelledby="overview-title">
          <div className={styles.shell}>
            <SectionHead
              id="overview-title"
              eyebrow="Overview"
              title="What it does"
              standfirst={product.overview}
            />

            {hasHighlights && (
              <ul className={styles.highlights}>
                {product.highlights!.map((h, i) => (
                  <Reveal as="li" key={i} className={styles.highlightItem} delay={i * 0.06}>
                    <span className={styles.highlightTick} aria-hidden="true" />
                    <span className={styles.highlightText}>{h}</span>
                  </Reveal>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* ── Capabilities: features + stack ────────────────── */}
        {hasFeatures && (
          <section className={styles.bandSection} aria-labelledby="capabilities-title">
            <div className={styles.shell}>
              <SectionHead
                id="capabilities-title"
                eyebrow="Capabilities"
                title="Features and stack"
                standfirst="What ships in the product, and the stack it runs on."
              />
              <div className={styles.capGrid}>
                <ul className={styles.featureList}>
                  {product.features.map((f, i) => (
                    <Reveal as="li" key={i} className={styles.featureItem} delay={i * 0.04}>
                      <span className={styles.featureTick} aria-hidden="true" />
                      <span className={styles.featureText}>{f}</span>
                    </Reveal>
                  ))}
                </ul>

                <Reveal delay={0.08}>
                  <aside className={styles.stack} aria-label="Tech stack">
                    <p className={styles.stackLabel}>Tech stack</p>
                    <div className={styles.tagRow}>
                      {product.techStack.map((t, i) => (
                        <span key={i} className={styles.tag}>{t}</span>
                      ))}
                    </div>
                  </aside>
                </Reveal>
              </div>
            </div>
          </section>
        )}

        {/* ── Gallery ───────────────────────────────────────── */}
        {hasGallery && (
          <section className={styles.section} aria-labelledby="gallery-title">
            <div className={styles.shell}>
              <SectionHead
                id="gallery-title"
                eyebrow="Inside the product"
                title="A closer look"
              />
              <div className={styles.gallery}>
                {galleryItems.map((g, i) => (
                  <Reveal
                    key={i}
                    variant="clip"
                    className={styles.galleryItem}
                    delay={i * 0.05}
                  >
                    <div className={styles.galleryStage}>
                      <span className={styles.galleryStageGrid} aria-hidden="true" />
                      <Parallax amount={i % 2 === 0 ? 14 : -14} className={styles.galleryFrame}>
                        <ScreenshotFrame
                          src={g.src}
                          alt={g.alt}
                          aspect="16 / 10"
                          reveal={false}
                          sizes="(max-width: 1024px) 92vw, 1040px"
                        />
                      </Parallax>
                    </div>
                    {g.caption && <p className={styles.galleryCaption}>{g.caption}</p>}
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Outcomes ──────────────────────────────────────── */}
        {hasOutcomes && (
          <section className={styles.bandSection} aria-labelledby="outcomes-title">
            <div className={styles.shell}>
              <SectionHead
                id="outcomes-title"
                eyebrow="Outcomes"
                title="Results in production"
              />
              <ul className={styles.outcomes}>
                {product.outcomes!.map((o, i) => (
                  <Reveal as="li" key={i} className={styles.outcomeItem} delay={i * 0.06}>
                    <span className={styles.outcomeTick} aria-hidden="true" />
                    <span className={styles.outcomeText}>{o}</span>
                  </Reveal>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* ── Close ─────────────────────────────────────────── */}
        <section className={styles.close} aria-labelledby="close-title">
          <div className={styles.shell}>
            <Reveal variant="scale" className={styles.closePanel}>
              <span className={styles.closeGrid2} aria-hidden="true" />
              <span className={styles.closeGlow} aria-hidden="true" />
              <div className={styles.closeInner}>
                <div className={styles.closeMain}>
                  <Eyebrow>Start here</Eyebrow>
                  <h2 id="close-title" className={styles.closeTitle}>Building something in this space?</h2>
                  <p className={styles.closeLede}>
                    A short call is enough for us to understand your situation and tell you
                    whether we are the right team. If we are, a usable version follows inside
                    the first two weeks.
                  </p>
                  <div className={styles.closeActions}>
                    <Button href="/contact-us" variant="primary">Start a build</Button>
                    <Button href="/portfolio" variant="text">See more work</Button>
                  </div>
                </div>

                <dl className={styles.closeCoords}>
                  {coords.map((row) => (
                    <div key={row.k} className={styles.coordRow}>
                      <dt className={styles.coordKey}>{row.k}</dt>
                      <dd className={styles.coordVal}>{row.v}</dd>
                    </div>
                  ))}
                  {hasEngagement && (
                    <div className={styles.coordRow}>
                      <dt className={styles.coordKey}>Status</dt>
                      <dd className={styles.coordVal}>{statusLabel}</dd>
                    </div>
                  )}
                </dl>
              </div>
            </Reveal>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
