import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { customerTypes, type CustomerType } from '../../content/customers';
import { cn } from '../../lib/cn';
import { Label, TextLink } from '../ui/primitives';
import { EASE, Reveal, SplitHeading } from '../ui/motion';
import { BeeGlyph } from '../ui/marks';

const PanelBody: React.FC<{ c: CustomerType }> = ({ c }) => (
  <>
    <h3 className="text-[clamp(1.5rem,2.4vw,2.25rem)] leading-[1.05] tracking-[-0.03em] text-white max-w-[18ch]">{c.headline}</h3>
    <p className="mt-3 text-[15px] leading-relaxed text-white/70 max-w-[46ch]">{c.body}</p>
    <ul className="mt-5 flex flex-col gap-2">
      {c.beeJobs.map((j) => (
        <li key={j} className="flex items-center gap-2.5 text-[13.5px] text-white/80">
          <BeeGlyph className="w-3.5 h-3.5 text-honey" />
          {j}
        </li>
      ))}
    </ul>
    <p className="mt-5 t-label text-white/45">Most start with</p>
    <p className="mt-2 text-[13.5px] text-white/75 leading-relaxed">{c.startsWith.join(' · ')}</p>
  </>
);

export const CustomersSection: React.FC = () => {
  const [active, setActive] = useState(0);

  return (
    <section id="customers" data-theme="ink" aria-labelledby="customers-title" className="relative py-[clamp(6rem,11vw,10.5rem)] overflow-hidden">
      <div className="wrap">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <Label index="04">Customers</Label>
            <SplitHeading id="customers-title" className="t-h1 mt-6" text="For the businesses that keep people healthy." />
          </div>
          <Reveal className="lg:col-span-4 flex flex-col gap-6">
            <p className="text-[16px] leading-relaxed text-fg/60">Labs, clinics, hospitals, wellness apps and insurers. Different work, the same Hive.</p>
            <TextLink to="/customers">See what each one gets</TextLink>
          </Reveal>
        </div>

        {/* Wide screens: panels that open on hover */}
        <Reveal className="hidden lg:flex mt-16 h-[620px] gap-3">
          {customerTypes.map((c, i) => {
            const open = i === active;
            return (
              <motion.button
                key={c.id}
                type="button"
                layout
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-expanded={open}
                aria-label={c.name}
                transition={{ layout: { duration: 0.8, ease: EASE } }}
                className={cn('group relative overflow-hidden rounded-[20px] text-left', open ? 'flex-[5]' : 'flex-[1]')}
              >
                <img
                  src={c.photo}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className={cn('photo absolute inset-0 h-full w-full object-cover', open ? 'scale-100' : 'scale-110')}
                />
                <div className={cn('absolute inset-0 transition-colors duration-700', open ? 'bg-black/10' : 'bg-black/45')} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />
                <span className="absolute left-5 top-5 font-mono text-[12px] text-honey">{String(i + 1).padStart(2, '0')}</span>
                {!open && (
                  <span className="absolute inset-x-0 bottom-6 flex justify-center">
                    <span className="text-[17px] tracking-[-0.01em] text-white/85 whitespace-nowrap [writing-mode:vertical-rl] rotate-180">{c.short}</span>
                  </span>
                )}
                <AnimatePresence>
                  {open && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0, transition: { delay: 0.25, duration: 0.7, ease: EASE } }}
                      exit={{ opacity: 0, transition: { duration: 0.15 } }}
                      className="absolute inset-x-0 bottom-0 p-8 min-w-[520px]"
                    >
                      <p className="t-label text-honey/90 mb-4">{c.name}</p>
                      <PanelBody c={c} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </Reveal>
      </div>

      {/* Narrow screens: a swipeable row */}
      <div className="lg:hidden mt-12" data-lenis-prevent-touch>
        <ul className="flex gap-3 overflow-x-auto snap-x snap-mandatory px-[clamp(1rem,4vw,3rem)] pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {customerTypes.map((c, i) => (
            <li key={c.id} className="snap-start shrink-0 w-[84vw] sm:w-[60vw] relative overflow-hidden rounded-[18px] min-h-[560px] flex flex-col justify-end">
              <img src={c.photo} alt="" loading="lazy" decoding="async" className="photo absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
              <span className="absolute left-5 top-5 font-mono text-[12px] text-honey">{String(i + 1).padStart(2, '0')}</span>
              <div className="relative p-6">
                <p className="t-label text-honey/90 mb-3">{c.name}</p>
                <PanelBody c={c} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
