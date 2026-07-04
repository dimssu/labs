'use client';

import { useId, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import styles from './Accordion.module.scss';

interface AccordionProps {
  question: string;
  answer: string;
}

/**
 * Accordion — a calm datasheet row. Hairline-separated, no box: the question is
 * the trigger button, with a +/- affordance that resolves to a minus on open
 * (the one accent touch). The answer measures + animates its own height;
 * reduced motion composes it instantly and always renders it visible.
 */
export default function Accordion({ question, answer }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const reduce = useReducedMotion();
  const uid = useId();
  const panelId = `${uid}-panel`;
  const triggerId = `${uid}-trigger`;

  return (
    <div className={`${styles.row} ${isOpen ? styles.open : ''}`}>
      <button
        id={triggerId}
        type="button"
        className={styles.trigger}
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <span className={styles.question}>{question}</span>
        <span className={styles.toggle} aria-hidden="true">
          <span className={`${styles.toggleBar} ${styles.toggleBarH}`} />
          <span className={`${styles.toggleBar} ${styles.toggleBarV}`} />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="panel"
            id={panelId}
            role="region"
            aria-labelledby={triggerId}
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={
              reduce ? { duration: 0 } : { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
            }
            style={{ overflow: 'hidden' }}
          >
            <div className={styles.answerWrap}>
              <p className={styles.answer}>{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
