import React from 'react';
import { motion, useReducedMotion, type Variants } from 'motion/react';
import { cn } from '../../lib/cn';

export const EASE = [0.22, 1, 0.36, 1] as const;

/* ── Fade-up on first view ── */

export const Reveal: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: 'div' | 'li' | 'section' | 'span';
}> = ({ children, className, delay = 0, y = 28, as = 'div' }) => {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 1.1, ease: EASE, delay }}
    >
      {children}
    </Tag>
  );
};

/* ── Headline with a word-by-word masked reveal. Wrap words in *asterisks* for the serif accent. ── */

const parse = (text: string) =>
  text.split('*').flatMap((chunk, i) =>
    chunk
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => ({ word, em: i % 2 === 1 })),
  );

const plain = (text: string) => text.replace(/\*/g, '');

const wordVariants: Variants = {
  hidden: { y: '115%' },
  show: { y: '0%', transition: { duration: 1.05, ease: EASE } },
};

export const SplitHeading: React.FC<{
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p';
  className?: string;
  delay?: number;
  /** "mount" animates on load (heroes); "view" waits until scrolled into view. */
  trigger?: 'mount' | 'view';
  stagger?: number;
  id?: string;
}> = ({ text, as = 'h2', className, delay = 0, trigger = 'view', stagger = 0.045, id }) => {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  const words = parse(text);
  const container: Variants = { hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } };
  const play = trigger === 'mount' ? { animate: 'show' } : { whileInView: 'show', viewport: { once: true, margin: '0px 0px -10% 0px' } };

  return (
    <Tag id={id} className={cn('text-balance', className)} aria-label={plain(text)} initial={reduce ? false : 'hidden'} variants={container} {...play}>
      {words.map(({ word, em }, i) => (
        <React.Fragment key={i}>
          <span aria-hidden="true" className="inline-block overflow-hidden align-top pb-[0.16em] -mb-[0.16em] pr-[0.04em] -mr-[0.04em]">
            <motion.span variants={wordVariants} className={cn('inline-block', em && 'em')}>
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 && ' '}
        </React.Fragment>
      ))}
    </Tag>
  );
};

/** Renders *asterisk* accents without animation, for small headings. */
export const Accent: React.FC<{ text: string }> = ({ text }) => (
  <>
    {text.split('*').map((chunk, i) =>
      i % 2 === 1 ? (
        <span key={i} className="em">
          {chunk}
        </span>
      ) : (
        <React.Fragment key={i}>{chunk}</React.Fragment>
      ),
    )}
  </>
);
