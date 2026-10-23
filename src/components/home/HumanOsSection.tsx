import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { categories, statusLabel, systemPath, systemsIn, type CategoryId, type HumanOsSystem } from '../../content/human-os';
import { FLAGS } from '../../content/site';
import { cn } from '../../lib/cn';
import { Arrow, Label, StatusDot, TextLink } from '../ui/primitives';
import { EASE, Reveal, SplitHeading } from '../ui/motion';

export const CategorySwitch: React.FC<{ value: CategoryId; onChange: (id: CategoryId) => void; id: string }> = ({ value, onChange, id }) => (
  <div role="tablist" aria-label="Human OS categories" className="inline-flex rounded-full border border-fg/10 p-1 bg-fg/[0.02]">
    {categories.map((c) => (
      <button
        key={c.id}
        role="tab"
        id={`${id}-tab-${c.id}`}
        aria-selected={value === c.id}
        aria-controls={`${id}-panel`}
        onClick={() => onChange(c.id)}
        className={cn('relative h-10 px-4 sm:px-5 rounded-full text-[14px] transition-colors duration-300', value === c.id ? 'text-ink' : 'text-fg/60 hover:text-fg')}
      >
        {value === c.id && <motion.span layoutId={`${id}-pill`} transition={{ type: 'spring', stiffness: 380, damping: 34 }} className="absolute inset-0 rounded-full bg-honey" />}
        <span className="relative">{c.name}</span>
      </button>
    ))}
  </div>
);

export const ModuleList: React.FC<{ system: HumanOsSystem; dense?: boolean }> = ({ system, dense }) => (
  <ul className="divide-y divide-fg/[0.07]">
    {system.modules.map((m) => (
      <li key={m.name} className={cn('flex items-center justify-between gap-4', dense ? 'py-2' : 'py-2.5')}>
        <span className="flex items-center gap-3 text-[14.5px] text-fg/85">
          {FLAGS.SHOW_MODULE_STATUS && <StatusDot status={m.status} />}
          {m.name}
        </span>
        {FLAGS.SHOW_MODULE_STATUS && <span className={cn('font-mono text-[10.5px] uppercase tracking-[0.1em]', m.status === 'live' ? 'text-signal-live/80' : 'text-fg/35')}>{statusLabel[m.status]}</span>}
      </li>
    ))}
  </ul>
);

export const HumanOsSection: React.FC = () => {
  const [category, setCategory] = useState<CategoryId>('person');
  const list = systemsIn(category);
  const [activeSlug, setActiveSlug] = useState(list[0].slug);
  const active = list.find((s) => s.slug === activeSlug) ?? list[0];

  const switchTo = (id: CategoryId) => {
    setCategory(id);
    setActiveSlug(systemsIn(id)[0].slug);
  };

  return (
    <section id="human-os" data-theme="ink" aria-labelledby="hos-title" className="relative py-[clamp(6rem,11vw,10.5rem)]">
      <div className="wrap">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <Label index="02">Human OS</Label>
            <SplitHeading id="hos-title" className="t-h1 mt-6" text="What we've *built.*" />
          </div>
          <Reveal className="lg:col-span-5 flex flex-col gap-6">
            <p className="t-lead text-fg/60 text-pretty">
              Ready-made modules for the people you serve and the team that serves them. Pick what you need, get it through the SDK Portal, and the Bees run it in Hive.
            </p>
            <TextLink to="/human-os">Explore every module</TextLink>
          </Reveal>
        </div>

        <Reveal className="mt-14 md:mt-20 flex flex-col sm:flex-row sm:items-center justify-between gap-5 border-b border-fg/10 pb-6">
          <CategorySwitch id="home-hos" value={category} onChange={switchTo} />
          <p className="text-[14px] text-fg/45 max-w-[52ch]">{categories.find((c) => c.id === category)!.summary}</p>
        </Reveal>

        <div id="home-hos-panel" role="tabpanel" aria-labelledby={`home-hos-tab-${category}`} className="grid lg:grid-cols-12 gap-x-10">
          <ul className="lg:col-span-7">
            {list.map((s) => {
              const isActive = s.slug === active.slug;
              return (
                <li key={s.slug} className="border-b border-fg/10" onMouseEnter={() => setActiveSlug(s.slug)}>
                  <Link
                    to={systemPath(s.slug)}
                    onFocus={() => setActiveSlug(s.slug)}
                    className="group grid grid-cols-[3rem_1fr_auto] items-baseline gap-x-4 py-7 md:py-8"
                  >
                    <span className={cn('font-mono text-[12px] transition-colors duration-500', isActive ? 'text-accent' : 'text-fg/35')}>{s.number}</span>
                    <span>
                      <span className={cn('block text-[clamp(1.6rem,3vw,2.6rem)] leading-[1.05] tracking-[-0.03em] transition-colors duration-500', isActive ? 'text-fg' : 'text-fg/45')}>{s.name}</span>
                      <span className="mt-2 block text-[15px] text-fg/50">{s.plain}</span>
                    </span>
                    <Arrow className={cn('w-5 h-5 transition-all duration-500 ease-out', isActive ? 'text-accent translate-x-0 opacity-100' : '-translate-x-2 opacity-0')} />
                  </Link>
                  {/* Narrow screens show modules inline */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        className="lg:hidden overflow-hidden"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: EASE }}
                      >
                        <div className="pb-7 pl-[4rem]">
                          <ModuleList system={s} dense />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>

          <div className="hidden lg:block lg:col-span-5 pt-8">
            <div className="sticky top-28">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.slug}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="rounded-2xl border border-fg/10 bg-[radial-gradient(120%_70%_at_100%_0%,rgba(242,210,122,0.08),transparent_60%)] p-7"
                >
                  <p className="t-label text-fg/45">
                    {active.number} · {active.bestFit}
                  </p>
                  <p className="mt-5 text-[30px] leading-[1.08] tracking-[-0.02em]">
                    <span className="em">{active.promise}</span>
                  </p>
                  <p className="mt-4 text-[15px] text-fg/60 leading-relaxed">{active.description}</p>
                  <div className="mt-6">
                    <ModuleList system={active} />
                  </div>
                  <Link to={systemPath(active.slug)} className="mt-6 inline-flex items-center gap-2 text-[14px] text-fg hover:text-accent transition-colors">
                    Open {active.name} <Arrow className="w-3.5 h-3.5" />
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
