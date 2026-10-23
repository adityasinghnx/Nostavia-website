import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { HERO_HEADLINE, HERO_SUB } from '../../content/site';
import { parts } from '../../content/superintelligence';
import { HiveSwarm } from '../hive/HiveSwarm';
import { Button } from '../ui/primitives';
import { EASE, SplitHeading } from '../ui/motion';
import { INTRO_DELAY, Magnetic } from '../ui/effects';

export const Hero: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const swarmY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const swarmOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);

  return (
    <section ref={ref} data-theme="ink" aria-labelledby="hero-title" className="relative min-h-[100svh] overflow-hidden flex flex-col">
      {/* Warm light behind the hive */}
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(55%_55%_at_78%_36%,rgba(242,210,122,0.11),transparent_70%)] max-md:bg-[radial-gradient(80%_45%_at_50%_24%,rgba(242,210,122,0.10),transparent_70%)]" />
      <div aria-hidden="true" className="absolute inset-0 grid-lines opacity-60 mask-fade-b" />

      <motion.div style={reduce ? undefined : { y: swarmY, opacity: swarmOpacity }} className="absolute inset-0">
        <HiveSwarm anchor={{ x: 0.78, y: 0.36 }} mobileAnchor={{ x: 0.5, y: 0.24 }} scale={0.12} avoidLeft={0.5} />
      </motion.div>

      <motion.div style={reduce ? undefined : { y: copyY }} className="wrap relative flex-1 flex flex-col justify-end pt-[44vh] md:pt-40 pb-12 md:pb-16">
        <SplitHeading
          id="hero-title"
          as="h1"
          trigger="mount"
          delay={0.25 + INTRO_DELAY}
          stagger={0.06}
          className="max-w-[10em] text-[clamp(1.9rem,8.4vw,6.4rem)] leading-[0.95] tracking-[-0.045em] font-[480]"
          text={HERO_HEADLINE}
        />

        <div className="mt-10 md:mt-12 grid md:grid-cols-12 gap-8 items-end">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.9 + INTRO_DELAY }}
            className="t-lead text-fg/65 md:col-span-7 lg:col-span-6 max-w-[52ch] text-pretty"
          >
            {HERO_SUB}
          </motion.p>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 1.05 + INTRO_DELAY }}
            className="md:col-span-5 lg:col-span-6 flex flex-wrap md:justify-end gap-3"
          >
            <Magnetic>
              <Button to="/demo" size="lg">
                Book a demo
              </Button>
            </Magnetic>
            <Button href="#structure" size="lg" variant="secondary">
              See how it works
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* The three parts, as an index */}
      <motion.nav
        aria-label="On this page"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.3 + INTRO_DELAY }}
        className="relative border-t border-fg/[0.08]"
      >
        <ol className="wrap grid grid-cols-3">
          {parts.map((p, i) => (
            <li key={p.id} className={i > 0 ? 'border-l border-fg/[0.08]' : ''}>
              <a href="#structure" className={`group flex flex-col md:flex-row md:items-center gap-1 md:gap-4 py-4 md:py-5 transition-colors ${i > 0 ? 'pl-3 md:pl-5' : ''}`}>
                <span className="font-mono text-[11px] text-accent">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-[14px] md:text-[15px] text-fg/90 group-hover:text-fg">{p.name}</span>
                <span className="hidden md:inline text-[14px] text-fg/40 group-hover:text-fg/60 transition-colors">{p.verb}</span>
              </a>
            </li>
          ))}
        </ol>
      </motion.nav>
    </section>
  );
};
