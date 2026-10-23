import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { familiesIn, groups, HUMAN_OS_PATH, usage, type Family, type GroupId } from '../../content/human-os';
import { FLAGS } from '../../content/site';
import { cn } from '../../lib/cn';
import { Arrow, Label, TextLink } from '../ui/primitives';
import { EASE, Reveal, SplitHeading } from '../ui/motion';

export const GroupSwitch: React.FC<{ value: GroupId; onChange: (id: GroupId) => void; id: string }> = ({ value, onChange, id }) => (
  <div role="tablist" aria-label="Human OS groups" className="inline-flex rounded-full border border-fg/10 p-1 bg-fg/[0.02]">
    {groups.map((g) => (
      <button
        key={g.id}
        role="tab"
        id={`${id}-tab-${g.id}`}
        aria-selected={value === g.id}
        aria-controls={`${id}-panel`}
        onClick={() => onChange(g.id)}
        className={cn('relative h-10 px-4 sm:px-5 rounded-full text-[14px] transition-colors duration-300', value === g.id ? 'text-ink' : 'text-fg/60 hover:text-fg')}
      >
        {value === g.id && <motion.span layoutId={`${id}-pill`} transition={{ type: 'spring', stiffness: 380, damping: 34 }} className="absolute inset-0 rounded-full bg-honey" />}
        <span className="relative">{g.name}</span>
      </button>
    ))}
  </div>
);

/** Module names and one-liners for a family, or just the family line when module names are switched off. */
export const FamilyModules: React.FC<{ family: Family; dense?: boolean }> = ({ family, dense }) =>
  FLAGS.SHOW_MODULE_NAMES ? (
    <ul className="divide-y divide-fg/[0.07]">
      {family.modules.map((m) => (
        <li key={m.name} className={cn('grid gap-1', dense ? 'py-2.5' : 'py-3.5')}>
          <span className="text-[15px] text-fg/90">{m.name}</span>
          {!dense && <span className="text-[13.5px] leading-snug text-fg/50">{m.body}</span>}
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-[15px] leading-relaxed text-fg/60">{family.does}</p>
  );

export const HumanOsSection: React.FC = () => {
  const [group, setGroup] = useState<GroupId>('customers');
  const list = familiesIn(group);
  const [activeId, setActiveId] = useState(list[0].id);
  const active = list.find((f) => f.id === activeId) ?? list[0];

  const switchTo = (id: GroupId) => {
    setGroup(id);
    setActiveId(familiesIn(id)[0].id);
  };

  return (
    <section id="human-os" data-theme="ink" aria-labelledby="hos-title" className="relative py-[clamp(6rem,11vw,10.5rem)]">
      <div className="wrap">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <Label index="03">Human OS · Ready-made</Label>
            <SplitHeading id="hos-title" className="t-h1 mt-6 max-w-[14ch]" text="Health AI modules, ready to switch on." />
          </div>
          <Reveal className="lg:col-span-5 flex flex-col gap-6">
            <p className="t-lead text-fg/60 text-pretty">Modules for the people you serve and the team that serves them. Switch one on through our API, without a new app release.</p>
            <TextLink to={HUMAN_OS_PATH}>Explore Human OS</TextLink>
          </Reveal>
        </div>

        <Reveal className="mt-14 md:mt-20 flex flex-col sm:flex-row sm:items-center justify-between gap-5 border-b border-fg/10 pb-6">
          <GroupSwitch id="home-hos" value={group} onChange={switchTo} />
          <p className="text-[14px] text-fg/45 max-w-[52ch]">{groups.find((g) => g.id === group)!.body}</p>
        </Reveal>

        <div id="home-hos-panel" role="tabpanel" aria-labelledby={`home-hos-tab-${group}`} className="grid lg:grid-cols-12 gap-x-10">
          <ul className="lg:col-span-7">
            {list.map((f) => {
              const isActive = f.id === active.id;
              return (
                <li key={f.id} className="border-b border-fg/10" onMouseEnter={() => setActiveId(f.id)}>
                  <Link to={`${HUMAN_OS_PATH}#${f.id}`} onFocus={() => setActiveId(f.id)} className="group grid grid-cols-[3rem_1fr_auto] items-baseline gap-x-4 py-7 md:py-8">
                    <span className={cn('font-mono text-[12px] transition-colors duration-500', isActive ? 'text-accent' : 'text-fg/35')}>{f.number}</span>
                    <span>
                      <span className={cn('block text-[clamp(1.6rem,3vw,2.6rem)] leading-[1.05] tracking-[-0.03em] transition-colors duration-500', isActive ? 'text-fg' : 'text-fg/45')}>{f.name}</span>
                      <span className="mt-2 block text-[15px] text-fg/50 max-w-[48ch]">{f.does}</span>
                    </span>
                    <Arrow className={cn('w-5 h-5 transition-all duration-500 ease-out', isActive ? 'text-accent translate-x-0 opacity-100' : '-translate-x-2 opacity-0')} />
                  </Link>
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div className="lg:hidden overflow-hidden" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease: EASE }}>
                        <div className="pb-7 pl-[4rem]">
                          <FamilyModules family={f} dense />
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
                  key={active.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="rounded-2xl border border-fg/10 bg-[radial-gradient(120%_70%_at_100%_0%,rgba(242,210,122,0.08),transparent_60%)] p-7"
                >
                  <p className="t-label text-fg/45">
                    {active.number} · {active.name}
                  </p>
                  <div className="mt-4">
                    <FamilyModules family={active} />
                  </div>
                  <div className="mt-6 border-t border-fg/10 pt-5">
                    <p className="t-label text-fg/40">Use it</p>
                    <p className="mt-3 flex flex-wrap gap-2">
                      {usage.map((u) => (
                        <Link key={u.title} to={u.to} className="rounded-full border border-fg/15 px-3 py-1.5 text-[13px] text-fg/75 hover:border-accent/60 hover:text-fg transition-colors">
                          {u.title}
                        </Link>
                      ))}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
