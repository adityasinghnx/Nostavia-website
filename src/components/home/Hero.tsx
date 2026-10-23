import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { STUDIO } from '../../content/site';
import { HiveSwarm } from '../hive/HiveSwarm';
import { Button } from '../ui/primitives';
import { EASE, SplitHeading } from '../ui/motion';
import { INTRO_DELAY, Magnetic } from '../ui/effects';

const index = [
  { n: '01', name: 'Hive', line: 'One place to work', href: '#structure' },
  { n: '02', name: 'Human OS', line: "What we've built", href: '#human-os' },
  { n: '03', name: STUDIO, line: 'What we build for you', href: '#studio' },
];

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
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(60%_55%_at_72%_46%,rgba(242,210,122,0.10),transparent_70%)] max-md:bg-[radial-gradient(80%_45%_at_50%_30%,rgba(242,210,122,0.10),transparent_70%)]" />
      <div aria-hidden="true" className="absolute inset-0 grid-lines opacity-60 mask-fade-b" />

      <motion.div style={reduce ? undefined : { y: swarmY, opacity: swarmOpacity }} className="absolute inset-0">
        <HiveSwarm anchor={{ x: 0.72, y: 0.45 }} mobileAnchor={{ x: 0.5, y: 0.25 }} scale={0.13} />
      </motion.div>

      <motion.div style={reduce ? undefined : { y: copyY }} className="wrap relative flex-1 flex flex-col justify-end pt-[46vh] md:pt-40 pb-12 md:pb-16">
        <SplitHeading id="hero-title" as="h1" trigger="mount" delay={0.25 + INTRO_DELAY} stagger={0.06} className="t-display max-w-[12ch]" text="Your health business, *run from one place.*" />

        <div className="mt-10 md:mt-12 grid md:grid-cols-12 gap-8 items-end">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.9 + INTRO_DELAY }}
            className="t-lead text-fg/65 md:col-span-6 lg:col-span-5 max-w-[46ch] text-pretty"
          >
            Hive is where AI <span className="text-fg">Bees</span> run your care and customer work, on top of products we've built and ones we build for you.
          </motion.p>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 1.05 + INTRO_DELAY }}
            className="md:col-span-6 lg:col-span-7 flex flex-wrap md:justify-end gap-3"
          >
            <Magnetic>
              <Button to="/demo" size="lg">
                Book a demo
              </Button>
            </Magnetic>
            <Button to="/hive" size="lg" variant="secondary">
              See how Hive works
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* The structure, as an index */}
      <motion.nav
        aria-label="On this page"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.3 + INTRO_DELAY }}
        className="relative border-t border-fg/[0.08]"
      >
        <ol className="wrap grid grid-cols-3">
          {index.map((item, i) => (
            <li key={item.n} className={i > 0 ? 'border-l border-fg/[0.08]' : ''}>
              <a href={item.href} className={`group flex flex-col md:flex-row md:items-center gap-1 md:gap-4 py-4 md:py-5 transition-colors ${i > 0 ? 'pl-3 md:pl-5' : ''}`}>
                <span className="font-mono text-[11px] text-accent">{item.n}</span>
                <span className="text-[14px] md:text-[15px] text-fg/90 group-hover:text-fg">{item.name}</span>
                <span className="hidden md:inline text-[14px] text-fg/40 group-hover:text-fg/60 transition-colors">{item.line}</span>
              </a>
            </li>
          ))}
        </ol>
      </motion.nav>
    </section>
  );
};
