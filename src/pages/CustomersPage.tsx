import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useSeo } from '../lib/useSeo';
import { customerTypes, type CustomerType } from '../content/customers';
import { findModule, systemPath } from '../content/human-os';
import { STUDIO, STUDIO_PATH } from '../content/site';
import { PageHero } from '../components/page/PageKit';
import { LogoStrip } from '../components/home/LogoStrip';
import { FinalCta } from '../components/home/FinalCta';
import { Arrow, Label } from '../components/ui/primitives';
import { Reveal } from '../components/ui/motion';
import { BeeGlyph } from '../components/ui/marks';
import { BlurIn } from '../components/ui/effects';
import { cn } from '../lib/cn';

const TypeSection: React.FC<{ c: CustomerType; i: number }> = ({ c, i }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const flip = i % 2 === 1;

  return (
    <section id={c.id} data-theme={i % 2 ? 'paper' : 'ink'} aria-labelledby={`${c.id}-title`} className="py-[clamp(5rem,9vw,8.5rem)] scroll-mt-20">
      <div className="wrap grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <BlurIn className={cn('lg:col-span-6', flip && 'lg:order-2')}>
          <div ref={ref} className="relative overflow-hidden rounded-[20px] aspect-[5/4]">
            <motion.img src={c.photo} alt="" loading="lazy" decoding="async" style={reduce ? undefined : { y, scale: 1.18 }} className="photo absolute inset-0 h-full w-full object-cover" />
            <span className="absolute left-5 top-5 font-mono text-[12px] text-honey">{String(i + 1).padStart(2, '0')}</span>
          </div>
        </BlurIn>
        <div className={cn('lg:col-span-6', flip && 'lg:order-1')}>
          <Label>{c.name}</Label>
          <Reveal>
            <h2 id={`${c.id}-title`} className="t-h2 mt-6 max-w-[16ch]">
              {c.headline}
            </h2>
            <p className="mt-6 t-lead text-fg/60 max-w-[46ch]">{c.body}</p>

            <div className="mt-10 grid sm:grid-cols-2 gap-8 border-t border-fg/[0.12] pt-8">
              <div>
                <p className="t-label text-fg/45">What Bees take on</p>
                <ul className="mt-4 flex flex-col gap-3">
                  {c.beeJobs.map((j) => (
                    <li key={j} className="flex items-start gap-2.5 text-[15px] text-fg/80">
                      <BeeGlyph className="w-3.5 h-3.5 mt-1 shrink-0 text-accent" />
                      {j}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="t-label text-fg/45">Most start with</p>
                <ul className="mt-4 flex flex-col gap-2">
                  {c.startsWith.map((name) => {
                    const m = findModule(name);
                    return (
                      <li key={name}>
                        {m ? (
                          <Link to={systemPath(m.system.slug)} className="group inline-flex items-center gap-2 text-[15px] text-fg/80 hover:text-accent transition-colors">
                            {name}
                            <Arrow className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                          </Link>
                        ) : (
                          <span className="text-[15px] text-fg/80">{name}</span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const CustomersPage: React.FC = () => {
  useSeo({
    title: 'Customers: labs, clinics, hospitals, wellness apps and insurers | Nostavia',
    description: 'What Hive and Human OS do for diagnostic labs, clinics and longevity centres, hospitals, wellness platforms and insurers, and where each one usually starts.',
    path: '/customers',
  });

  return (
    <>
      <PageHero
        label="Customers"
        title="For the businesses that keep people healthy."
        intro={
          <>
            Different businesses, different work, the same Hive. Here is what Bees take on for each, and the modules most start with. Anything that is yours alone, <Link to={STUDIO_PATH} className="text-fg underline decoration-fg/30 underline-offset-4 hover:decoration-accent">{STUDIO}</Link> builds.
          </>
        }
        aside={
          <nav aria-label="Jump to" className="flex flex-col border-t border-fg/10">
            {customerTypes.map((c, i) => (
              <a key={c.id} href={`#${c.id}`} className="group flex items-center justify-between py-3 border-b border-fg/10 text-[15px] text-fg/70 hover:text-fg transition-colors">
                <span className="flex items-baseline gap-4">
                  <span className="font-mono text-[11.5px] text-accent">{String(i + 1).padStart(2, '0')}</span>
                  {c.name}
                </span>
                <Arrow className="w-4 h-4 rotate-90 text-fg/30 group-hover:text-accent transition-colors" />
              </a>
            ))}
          </nav>
        }
      />
      <LogoStrip />
      {customerTypes.map((c, i) => (
        <TypeSection key={c.id} c={c} i={i} />
      ))}
      <FinalCta title="See Hive with *your* work in it." body="Tell us what kind of business you run. We'll show you what the Bees would take on first." />
    </>
  );
};

export default CustomersPage;
