import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, Plus } from 'lucide-react';
import { bees, beeImage, type BeeId } from '../../content/bees';
import { customerTypes } from '../../content/customers';
import { cn } from '../../lib/cn';
import { EASE } from '../ui/motion';

/* ─────────────────────────────────────────────────────────────────────────────
 * "Choose your starting team": pick a type of business, Hive suggests Bees,
 * you add or remove them and can give each one a name. Nothing is saved.
 * ──────────────────────────────────────────────────────────────────────────── */

export const TeamBuilder: React.FC = () => {
  const [typeId, setTypeId] = useState(customerTypes[0].id);
  const type = customerTypes.find((t) => t.id === typeId)!;
  const [team, setTeam] = useState<BeeId[]>(type.bees);
  const [names, setNames] = useState<Partial<Record<BeeId, string>>>({});

  const pickType = (id: string) => {
    setTypeId(id);
    setTeam(customerTypes.find((t) => t.id === id)!.bees);
  };
  const toggle = (id: BeeId) => setTeam((t) => (t.includes(id) ? t.filter((x) => x !== id) : [...t, id]));

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 border-b border-fg/10 pb-6">
        <div role="radiogroup" aria-label="Type of business" className="inline-flex flex-wrap rounded-full border border-fg/10 p-1 bg-fg/[0.02]">
          {customerTypes.map((t) => (
            <button
              key={t.id}
              type="button"
              role="radio"
              aria-checked={typeId === t.id}
              onClick={() => pickType(t.id)}
              className={cn('relative h-10 px-4 rounded-full text-[14px] transition-colors duration-300', typeId === t.id ? 'text-ink' : 'text-fg/60 hover:text-fg')}
            >
              {typeId === t.id && <motion.span layoutId="team-type" transition={{ type: 'spring', stiffness: 380, damping: 34 }} className="absolute inset-0 rounded-full bg-honey" />}
              <span className="relative">{t.short}</span>
            </button>
          ))}
        </div>
        <p className="text-[14px] text-fg/55" aria-live="polite">
          Suggested for {type.name.toLowerCase()}: <span className="text-fg">{type.bees.length} Bees</span> · your team: <span className="text-fg">{team.length}</span>
        </p>
      </div>

      <ul className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
        {bees.map((b) => {
          const on = team.includes(b.id);
          const suggested = type.bees.includes(b.id);
          return (
            <li key={b.id}>
              <motion.div
                layout
                className={cn('relative h-full rounded-[20px] border p-3 pb-4 flex flex-col transition-colors duration-500', on ? 'border-fg/20 bg-fg/[0.04]' : 'border-fg/[0.07] bg-transparent')}
              >
                <button type="button" onClick={() => toggle(b.id)} aria-pressed={on} aria-label={`${on ? 'Remove' : 'Add'} the ${b.job} Bee`} className="group relative block">
                  <span aria-hidden="true" className="absolute inset-[12%] rounded-full transition-opacity duration-700" style={{ background: `radial-gradient(closest-side, ${b.color}${on ? '50' : '14'}, transparent)` }} />
                  <img src={beeImage(b.id, true)} alt="" loading="lazy" className={cn('relative mx-auto w-[82%] transition-[transform,filter,opacity] duration-500 ease-out', on ? 'scale-100' : 'scale-90 opacity-40 grayscale-[0.7]', 'group-hover:scale-[1.03]')} />
                  <span className={cn('absolute right-0 top-0 grid h-7 w-7 place-items-center rounded-full border transition-colors', on ? 'bg-honey border-honey text-ink' : 'border-fg/20 text-fg/60')}>
                    {on ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                  </span>
                </button>
                <p className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.12em] text-fg/45 flex items-center gap-1.5">
                  {b.job}
                  {suggested && <span className="h-1 w-1 rounded-full bg-accent" title="Suggested" />}
                </p>
                <p className={cn('mt-1.5 text-[13px] leading-snug transition-colors', on ? 'text-fg/75' : 'text-fg/40')}>{b.line}</p>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.label initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.35, ease: EASE }} className="mt-auto block overflow-hidden pt-3">
                      <span className="sr-only">Name for the {b.job} Bee</span>
                      <input
                        type="text"
                        maxLength={18}
                        value={names[b.id] ?? ''}
                        onChange={(e) => setNames((n) => ({ ...n, [b.id]: e.target.value }))}
                        placeholder="Give it a name"
                        className="w-full h-8 rounded-lg border border-fg/10 bg-transparent px-2.5 text-[12.5px] text-fg placeholder:text-fg/30 focus:outline-none focus:border-accent/60"
                      />
                    </motion.label>
                  )}
                </AnimatePresence>
              </motion.div>
            </li>
          );
        })}
      </ul>
      <p className="mt-6 flex items-center gap-2 font-mono text-[11px] tracking-[0.04em] text-fg/40">
        <span className="h-1 w-1 rounded-full bg-accent" /> Suggested for this business. Add or remove any Bee; names are yours to choose.
      </p>
    </div>
  );
};
