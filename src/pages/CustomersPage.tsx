import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useSeo } from '../lib/useSeo';
import { customerTypes, type CustomerType } from '../content/customers';
import { getBee } from '../content/bees';
import { PageHero } from '../components/page/PageKit';
import { FinalCta } from '../components/home/FinalCta';
import { LogoStrip } from '../components/home/LogoStrip';
import { BeeAvatar } from '../components/hive/HiveConsole';
import { Arrow, Label } from '../components/ui/primitives';
import { Reveal } from '../components/ui/motion';
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
            <h2 id={`${c.id}-title`} className="t-h2 mt-6 max-w-[18ch]">
              {c.headline}
            </h2>
            <div className="mt-10 grid sm:grid-cols-2 gap-8 border-t border-fg/[0.12] pt-8">
              <div>
                <p className="t-label text-fg/45">What it helps with</p>
                <ul className="mt-4 flex flex-col gap-3">
                  {c.helps.map((h) => (
                    <li key={h} className="flex items-start gap-2.5 text-[15.5px] text-fg/80">
                      <span aria-hidden="true" className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="t-label text-fg/45">Bees that usually start</p>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {c.bees.map((id) => (
                    <li key={id} className="flex items-center gap-3 text-[15px] text-fg/80">
                      <BeeAvatar id={id} size={30} />
                      {getBee(id).job}
                    </li>
                  ))}
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
    title: 'Customers: labs, clinics, health apps and hospitals | Nostavia',
    description: 'What Nostavia Superintelligence helps diagnostic labs, clinics, wellness and health apps, and hospitals with.',
    path: '/customers',
  });

  return (
    <>
      <PageHero
        label="Customers"
        title="Built for the businesses that keep people healthy."
        intro="Four kinds of health business, one intelligence. Here is what it helps each with, and the Bees that usually start the work."
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
      {/* Renders nothing until FLAGS.SHOW_CLIENT_LOGOS is on, after written permission */}
      <LogoStrip />
      {customerTypes.map((c, i) => (
        <TypeSection key={c.id} c={c} i={i} />
      ))}
      <FinalCta />
    </>
  );
};

export default CustomersPage;
