'use client';

import {
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from 'react';
import Reveal from '../../components/Reveal';
import Parallax from '../../components/Parallax';
import Image from 'next/image';
import { ArrowRight, Check } from 'lucide-react';
import styles from './Contact.module.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Eyebrow from '../../components/Eyebrow';

/* Real leadership contacts used across the site. Do not invent addresses. */
const DIRECTOR_EMAIL = 'aryan@vruoom.com'; // Director
const STUDIO_EMAIL = 'priyanshu@vruoom.com'; // CTO — also the form-error fallback address

type ServiceKey = 'custom' | 'modules' | 'fractional_cto' | 'other';

/* Engagement radiogroup — labels map EXACTLY to the API service keys. */
const ENGAGEMENTS: { value: ServiceKey; label: string }[] = [
  { value: 'custom', label: 'Custom build' },
  { value: 'modules', label: 'Productised modules' },
  { value: 'fractional_cto', label: 'Fractional CTO' },
  { value: 'other', label: 'Not sure yet' },
];

/* Left-column coordinates datasheet. */
const COORDS: { key: string; value: ReactNode }[] = [
  {
    key: 'Director',
    value: (
      <a href={`mailto:${DIRECTOR_EMAIL}`} className={styles.coordLink}>
        {DIRECTOR_EMAIL}
      </a>
    ),
  },
  {
    key: 'CTO',
    value: (
      <a href={`mailto:${STUDIO_EMAIL}`} className={styles.coordLink}>
        {STUDIO_EMAIL}
      </a>
    ),
  },
  { key: 'Studio', value: 'India, working globally' },
  { key: 'Response', value: 'Within one business day' },
  { key: 'Parent', value: 'Vruoom' },
];

type FormState = { name: string; email: string; message: string };
type FieldKey = keyof FormState;
type Errors = Partial<Record<FieldKey | 'service', string>>;
type Status = 'idle' | 'submitting' | 'error';

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

/* A stable-ish reference for the confirmation register. */
function makeRef() {
  const ref = Date.now().toString(36).toUpperCase().slice(-5);
  return `BL-${ref}`;
}

/* UTC timestamp. */
function stamp() {
  return `${new Date().toISOString().replace('T', ' ').slice(0, 16)} UTC`;
}

/* Soft, once-only entrance. Renders fully visible under reduced motion. */
export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' });
  const [service, setService] = useState<ServiceKey | ''>('');
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<{ ref: string; at: string } | null>(null);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const serviceRef = useRef<HTMLDivElement>(null);

  const errId = useMemo(
    () => ({
      name: 'contact-name-error',
      email: 'contact-email-error',
      message: 'contact-message-error',
      service: 'contact-service-error',
    }),
    []
  );

  const setField = (key: FieldKey, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const pickService = (value: ServiceKey) => {
    setService(value);
    if (errors.service) setErrors((prev) => ({ ...prev, service: undefined }));
  };

  const validate = (): Errors => {
    const next: Errors = {};
    if (!form.name.trim()) next.name = 'Enter your name.';
    if (!form.email.trim()) next.email = 'Enter an email.';
    else if (!isEmail(form.email)) next.email = 'That email does not look right.';
    if (!form.message.trim()) next.message = 'Tell us what you are building.';
    else if (form.message.trim().length < 10) next.message = 'A sentence or two, please.';
    if (!service) next.service = 'Pick an engagement type.';
    return next;
  };

  const focusFirst = (next: Errors) => {
    if (next.name) nameRef.current?.focus();
    else if (next.email) emailRef.current?.focus();
    else if (next.message) messageRef.current?.focus();
    else if (next.service) serviceRef.current?.focus();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'submitting') return;

    const next = validate();
    if (Object.keys(next).length > 0) {
      setErrors(next);
      focusFirst(next);
      return;
    }

    setStatus('submitting');
    setSubmitError(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          service,
          message: form.message,
        }),
      });
      const data: { ok?: boolean; error?: string } = await res
        .json()
        .catch(() => ({ ok: false }));

      if (!res.ok || !data.ok) {
        setStatus('error');
        setSubmitError(data.error ?? 'Something went wrong on our end.');
        return;
      }

      setReceipt({ ref: makeRef(), at: stamp() });
      setStatus('idle');
      setForm({ name: '', email: '', message: '' });
      setService('');
      setErrors({});
    } catch {
      setStatus('error');
      setSubmitError('Network error. Your message did not go through.');
    }
  };

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <section className={styles.section} aria-labelledby="contact-title">
          <span className={styles.heroGlow} aria-hidden="true" />
          <div className={styles.shell}>
            {/* Masthead */}
            <header className={styles.masthead}>
              <Reveal delay={0.02}>
                <Eyebrow>New enquiry</Eyebrow>
              </Reveal>
              <Reveal variant="blur" delay={0.08}>
                <h1 id="contact-title" className={styles.title}>
                  Start a build.
                </h1>
              </Reveal>
              <Reveal delay={0.18}>
                <p className={styles.lede}>
                  A senior builder replies, usually within a day. No SDRs, no
                  discovery-call gauntlet.
                </p>
              </Reveal>
            </header>

            {/* Two-column body */}
            <div className={styles.split}>
              {/* Left — narrative + coordinates */}
              <Reveal className={styles.info} delay={0.06}>
                <p className={styles.narrative}>
                  Send the shape of what you are trying to ship — a product, a
                  drop-in module, or a technical call you are weighing. Every
                  enquiry is read by a senior builder and answered directly.
                </p>

                <dl className={styles.coords}>
                  {COORDS.map((row) => (
                    <div key={row.key} className={styles.coordRow}>
                      <dt className={styles.coordKey}>{row.key}</dt>
                      <dd className={styles.coordVal}>{row.value}</dd>
                    </div>
                  ))}
                </dl>

                <Parallax amount={16} className={styles.infoVisual}>
                  <span className={styles.infoVisualGrid} aria-hidden="true" />
                  <Image
                    src="/media/contact.webp"
                    alt="Send the shape of what you want to build and a senior builder ships it"
                    fill
                    sizes="(max-width: 900px) 92vw, 420px"
                    className={styles.infoImg}
                  />
                </Parallax>
              </Reveal>

              {/* Right — the form */}
              <Reveal className={styles.formCol} delay={0.14}>
                {/* aria-live region announces the in-place confirmation */}
                <div aria-live="polite" className={styles.liveRegion}>
                  {receipt && (
                    <div className={styles.receipt} role="status">
                      <span className={styles.receiptMark} aria-hidden="true">
                        <Check size={20} strokeWidth={2.5} />
                      </span>
                      <h2 className={styles.receiptHead}>Message received</h2>
                      <p className={styles.receiptBody}>
                        Logged and routed to a senior builder. Expect a reply
                        within one business day.
                      </p>
                      <dl className={styles.receiptMeta}>
                        <div className={styles.receiptMetaRow}>
                          <dt>Reference</dt>
                          <dd>{receipt.ref}</dd>
                        </div>
                        <div className={styles.receiptMetaRow}>
                          <dt>Logged</dt>
                          <dd>{receipt.at}</dd>
                        </div>
                      </dl>
                      <button
                        type="button"
                        className={styles.sendAnother}
                        onClick={() => setReceipt(null)}
                      >
                        Send another
                        <ArrowRight size={16} aria-hidden="true" />
                      </button>
                    </div>
                  )}
                </div>

                {!receipt && (
                  <form className={styles.form} onSubmit={handleSubmit} noValidate>
                    <div className={styles.fieldRow}>
                      <label
                        className={styles.field}
                        data-error={errors.name ? 'true' : undefined}
                      >
                        <span className={styles.fieldLabel}>Name</span>
                        <input
                          ref={nameRef}
                          type="text"
                          name="name"
                          autoComplete="name"
                          className={styles.input}
                          value={form.name}
                          onChange={(e) => setField('name', e.target.value)}
                          aria-invalid={errors.name ? 'true' : undefined}
                          aria-describedby={errors.name ? errId.name : undefined}
                        />
                        {errors.name && (
                          <span id={errId.name} className={styles.fieldError}>
                            <span aria-hidden="true">! </span>
                            {errors.name}
                          </span>
                        )}
                      </label>

                      <label
                        className={styles.field}
                        data-error={errors.email ? 'true' : undefined}
                      >
                        <span className={styles.fieldLabel}>Email</span>
                        <input
                          ref={emailRef}
                          type="email"
                          name="email"
                          autoComplete="email"
                          inputMode="email"
                          className={styles.input}
                          value={form.email}
                          onChange={(e) => setField('email', e.target.value)}
                          aria-invalid={errors.email ? 'true' : undefined}
                          aria-describedby={errors.email ? errId.email : undefined}
                        />
                        {errors.email && (
                          <span id={errId.email} className={styles.fieldError}>
                            <span aria-hidden="true">! </span>
                            {errors.email}
                          </span>
                        )}
                      </label>
                    </div>

                    <label
                      className={`${styles.field} ${styles.fieldWide}`}
                      data-error={errors.message ? 'true' : undefined}
                    >
                      <span className={styles.fieldLabel}>What are you building?</span>
                      <textarea
                        ref={messageRef}
                        name="message"
                        rows={5}
                        className={`${styles.input} ${styles.textarea}`}
                        value={form.message}
                        onChange={(e) => setField('message', e.target.value)}
                        aria-invalid={errors.message ? 'true' : undefined}
                        aria-describedby={errors.message ? errId.message : undefined}
                      />
                      {errors.message && (
                        <span id={errId.message} className={styles.fieldError}>
                          <span aria-hidden="true">! </span>
                          {errors.message}
                        </span>
                      )}
                    </label>

                    <div
                      className={styles.segmentField}
                      data-error={errors.service ? 'true' : undefined}
                    >
                      <span className={styles.fieldLabel} id="engagement-label">
                        Engagement type
                      </span>
                      <div
                        ref={serviceRef}
                        className={styles.segments}
                        role="radiogroup"
                        aria-labelledby="engagement-label"
                        aria-describedby={errors.service ? errId.service : undefined}
                        tabIndex={-1}
                      >
                        {ENGAGEMENTS.map((opt) => {
                          const active = service === opt.value;
                          return (
                            <button
                              key={opt.value}
                              type="button"
                              role="radio"
                              aria-checked={active}
                              className={styles.segment}
                              data-active={active ? 'true' : undefined}
                              onClick={() => pickService(opt.value)}
                            >
                              {opt.label}
                            </button>
                          );
                        })}
                      </div>
                      {errors.service && (
                        <span id={errId.service} className={styles.fieldError}>
                          <span aria-hidden="true">! </span>
                          {errors.service}
                        </span>
                      )}
                    </div>

                    <div className={styles.actions}>
                      <button
                        type="submit"
                        className={styles.submitBtn}
                        disabled={status === 'submitting'}
                      >
                        <span className={styles.sheen} aria-hidden="true" />
                        <span>{status === 'submitting' ? 'Sending' : 'Send'}</span>
                        <ArrowRight size={18} aria-hidden="true" className={styles.submitArrow} />
                      </button>
                    </div>

                    {submitError && (
                      <p className={styles.submitError} role="alert">
                        <span aria-hidden="true">! </span>
                        {submitError} Email us at{' '}
                        <a href={`mailto:${STUDIO_EMAIL}`} className={styles.errorLink}>
                          {STUDIO_EMAIL}
                        </a>
                        .
                      </p>
                    )}
                  </form>
                )}
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
