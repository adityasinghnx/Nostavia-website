import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, ChevronDown } from 'lucide-react';
import { useSeo } from '../lib/useSeo';
import { newRefId, submitLead } from '../lib/leads';
import { CAREERS_PATH, careerAreas, careerValues } from '../content/company';
import { REGIONS } from '../content/site';
import { PageHero, RuledList, SectionHead } from '../components/page/PageKit';
import { GlobalSection } from '../components/home/GlobalSection';
import { Button } from '../components/ui/primitives';
import { EASE, Reveal } from '../components/ui/motion';
import { CodeField } from '../components/ui/CodeField';
import { cn } from '../lib/cn';

const field =
  'w-full h-12 rounded-xl border border-fg/15 bg-fg/[0.03] px-4 text-[15px] text-fg placeholder:text-fg/30 transition-colors focus:outline-none focus:border-accent/70 aria-[invalid=true]:border-signal-alert/70';

const required = [
  { id: 'name', label: 'Name', type: 'text', auto: 'name', error: 'Please add your name.' },
  { id: 'email', label: 'Email', type: 'email', auto: 'email', error: 'Please add a valid email.' },
] as const;

const ApplyForm: React.FC = () => {
  const [area, setArea] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<'idle' | 'sending' | 'done'>('idle');
  const [ref, setRef] = useState('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const values = Object.fromEntries(['name', 'email', 'region', 'link', 'build'].map((k) => [k, String(data.get(k) ?? '').trim()]));
    const next: Record<string, string> = {};
    required.forEach((f) => {
      const ok = f.id === 'email' ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) : !!values[f.id];
      if (!ok) next[f.id] = f.error;
    });
    setErrors(next);
    if (Object.keys(next).length) {
      document.getElementById(Object.keys(next)[0])?.focus();
      return;
    }
    const id = newRefId();
    setState('sending');
    await submitLead(`Careers ${id}: ${values.name}${area ? ` (${area})` : ''}`, { ref: id, ...values, area, source: 'Website careers page' });
    setRef(id);
    setState('done');
  };

  return (
    <div className="rounded-[24px] border border-fg/10 bg-surface/60 p-6 sm:p-9">
      <AnimatePresence mode="wait">
        {state === 'done' ? (
          <motion.div key="done" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }} className="py-10 flex flex-col items-start gap-6" role="status">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-honey text-ink">
              <Check className="w-5 h-5" />
            </span>
            <h3 className="t-h2">Thank you. We read every note.</h3>
            <p className="text-fg/60">
              Your reference is <span className="font-mono text-fg">{ref}</span>. If there is a fit, we will be in touch.
            </p>
          </motion.div>
        ) : (
          <motion.form key="form" noValidate onSubmit={onSubmit} exit={{ opacity: 0, y: -10 }} className="flex flex-col gap-5" aria-describedby="careers-note">
            <div className="grid sm:grid-cols-2 gap-5">
              {required.map((f) => (
                <div key={f.id} className="flex flex-col gap-2">
                  <label htmlFor={f.id} className="text-[13.5px] text-fg/70">
                    {f.label}
                  </label>
                  <input id={f.id} name={f.id} type={f.type} autoComplete={f.auto} aria-invalid={!!errors[f.id]} aria-describedby={errors[f.id] ? `${f.id}-error` : undefined} className={field} />
                  {errors[f.id] && (
                    <p id={`${f.id}-error`} className="text-[12.5px] text-signal-alert">
                      {errors[f.id]}
                    </p>
                  )}
                </div>
              ))}
            </div>
            <fieldset className="flex flex-col gap-3">
              <legend className="text-[13.5px] text-fg/70 mb-2">What you do</legend>
              <div className="flex flex-wrap gap-2">
                {careerAreas.map((t) => {
                  const on = area === t;
                  return (
                    <label key={t} className={cn('cursor-pointer select-none inline-flex items-center gap-2 h-10 px-4 rounded-full border text-[14px] transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent', on ? 'border-honey bg-honey text-ink' : 'border-fg/15 text-fg/70 hover:border-fg/35')}>
                      <input type="radio" name="area" value={t} className="sr-only" checked={on} onChange={() => setArea(t)} />
                      {on && <Check className="w-3.5 h-3.5" />}
                      {t}
                    </label>
                  );
                })}
              </div>
            </fieldset>
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="region" className="text-[13.5px] text-fg/70">
                  Where you are
                </label>
                <div className="relative">
                  <select id="region" name="region" defaultValue="" className={cn(field, 'appearance-none pr-10 [&>option]:bg-[#1a1a1a]')}>
                    <option value="" disabled>
                      Choose a region
                    </option>
                    {[...REGIONS.map((r) => r.name), 'Elsewhere'].map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                  <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-fg/40" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="link" className="text-[13.5px] text-fg/70">
                  LinkedIn, portfolio or CV link
                </label>
                <input id="link" name="link" type="url" inputMode="url" placeholder="https://" className={field} />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="build" className="text-[13.5px] text-fg/70">
                What would you want to build here?
              </label>
              <textarea id="build" name="build" rows={4} className={cn(field, 'h-auto py-3 resize-none')} />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <p id="careers-note" className="text-[12.5px] text-fg/40 max-w-[34ch]">
                We only use these details to consider you for a role.
              </p>
              <Button type="submit" size="lg" disabled={state === 'sending'}>
                {state === 'sending' ? 'Sending' : 'Send'}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

const CareersPage: React.FC = () => {
  useSeo({
    title: 'Careers at Nostavia | Build health AI with us',
    description: 'Build health AI that labs, clinics, hospitals and health apps rely on, next to clinicians and scientists. Tell us what you would build.',
    path: CAREERS_PATH,
  });

  return (
    <>
      <PageHero
        label="Careers"
        display
        title="Build the health AI *people rely on.*"
        intro="We build software that sits between health data and the people it is about. If you want your work to reach patients, and to be careful about how it does, we would like to hear from you."
        actions={
          <Button href="#apply" size="lg">
            Tell us about you
          </Button>
        }
      />

      <section data-theme="paper" aria-labelledby="values-title" className="relative isolate py-[clamp(5rem,9vw,8.5rem)]">
        <CodeField />
        <div className="wrap">
          <SectionHead id="values-title" label="Working here" title="What the work *is like.*" />
          <RuledList items={careerValues} columns={2} />
        </div>
      </section>

      <GlobalSection index="" />

      <section id="apply" data-theme="ink" aria-labelledby="apply-title" className="relative isolate py-[clamp(5rem,9vw,8.5rem)] scroll-mt-20">
        <CodeField />
        <div className="wrap grid lg:grid-cols-12 gap-14 lg:gap-10">
          <div className="lg:col-span-5">
            <SectionHead id="apply-title" label="Apply" title="Tell us what *you would build.*" className="lg:!grid-cols-1 !mb-8" />
            <Reveal>
              <p className="text-[16px] leading-relaxed text-fg/60 max-w-[40ch]">
                We hire across engineering, AI, clinical work, product and partnerships. Tell us what you do and what you would want to work on. A link to your work says more than a CV.
              </p>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.2}>
            <ApplyForm />
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default CareersPage;
