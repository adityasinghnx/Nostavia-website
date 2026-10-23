import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Check } from 'lucide-react';
import { useSeo } from '../lib/useSeo';
import { newRefId, submitLead } from '../lib/leads';
import { CALENDAR_URL, CONTACT_EMAIL, STUDIO } from '../content/site';
import { customerTypes } from '../content/customers';
import { Button, Label } from '../components/ui/primitives';
import { EASE, Reveal, SplitHeading } from '../components/ui/motion';
import { cn } from '../lib/cn';

const interests = [
  { id: 'hive', label: 'Hive' },
  { id: 'human-os', label: 'Human OS' },
  { id: 'studio', label: STUDIO },
  { id: 'developers', label: 'SDK Portal' },
];

const expect = [
  { title: 'We listen', body: 'Fifteen minutes on your business and where your team loses time.' },
  { title: 'We show you Hive', body: 'With the modules that fit you, running on sample data.' },
  { title: 'You get a plan', body: 'What Bees would take on first, and what we would build.' },
];

const field =
  'w-full h-12 rounded-xl border border-fg/15 bg-fg/[0.03] px-4 text-[15px] text-fg placeholder:text-fg/30 transition-colors focus:outline-none focus:border-accent/70 aria-[invalid=true]:border-signal-alert/70';

const DemoPage: React.FC = () => {
  useSeo({
    title: 'Book a demo | Nostavia',
    description: 'See Hive running the work of a business like yours. Thirty minutes with the people who build it.',
    path: '/demo',
  });

  const [params] = useSearchParams();
  const initial = interests.some((i) => i.id === params.get('interest')) ? [params.get('interest')!] : ['hive'];
  const [picked, setPicked] = useState<string[]>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<'idle' | 'sending' | 'done'>('idle');
  const [ref, setRef] = useState('');

  const toggle = (id: string) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const values = Object.fromEntries(['name', 'email', 'company', 'business', 'message'].map((k) => [k, String(data.get(k) ?? '').trim()]));
    const next: Record<string, string> = {};
    if (!values.name) next.name = 'Please add your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = 'Please add a valid work email.';
    if (!values.company) next.company = 'Please add your company.';
    setErrors(next);
    if (Object.keys(next).length) {
      document.getElementById(Object.keys(next)[0])?.focus();
      return;
    }
    const id = newRefId();
    setState('sending');
    await submitLead(`Demo request ${id}: ${values.company}`, { ref: id, ...values, interests: picked.join(', '), source: 'Website demo page' });
    setRef(id);
    setState('done');
  };

  return (
    <section data-theme="ink" aria-labelledby="page-title" className="relative overflow-hidden pt-36 md:pt-44 pb-[clamp(5rem,10vw,9rem)]">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[700px] bg-[radial-gradient(50%_70%_at_15%_0%,rgba(242,210,122,0.09),transparent_70%)]" />
      <div className="wrap relative grid lg:grid-cols-12 gap-14 lg:gap-10">
        <div className="lg:col-span-5">
          <Label>Book a demo</Label>
          <SplitHeading id="page-title" as="h1" trigger="mount" delay={0.1} className="t-h1 mt-7 max-w-[11ch]" text="See Hive with *your* work in it." />
          <Reveal delay={0.4}>
            <p className="mt-8 t-lead text-fg/60 max-w-[40ch]">Thirty minutes with the people who build it. No slides about the future; the product, on work like yours.</p>
            <ol className="mt-12 border-t border-fg/10">
              {expect.map((x, i) => (
                <li key={x.title} className="grid grid-cols-[2.25rem_1fr] gap-3 py-5 border-b border-fg/10">
                  <span className="font-mono text-[12px] text-accent pt-1">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <p className="text-[17px] tracking-[-0.01em]">{x.title}</p>
                    <p className="mt-1 text-[14.5px] text-fg/55">{x.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-[14.5px] text-fg/55">
              Prefer to pick a slot now?{' '}
              <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer" className="text-fg underline decoration-fg/30 underline-offset-4 hover:decoration-accent">
                Open the calendar<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </p>
          </Reveal>
        </div>

        <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.3}>
          <div className="rounded-[24px] border border-fg/10 bg-surface/60 p-6 sm:p-9">
            <AnimatePresence mode="wait">
              {state === 'done' ? (
                <motion.div key="done" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }} className="py-10 flex flex-col items-start gap-6" role="status">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-honey text-ink">
                    <Check className="w-5 h-5" />
                  </span>
                  <h2 className="t-h2">Thank you. We'll be in touch to set a time.</h2>
                  <p className="text-fg/60">
                    Your reference is <span className="font-mono text-fg">{ref}</span>. If anything is urgent, write to{' '}
                    <a href={`mailto:${CONTACT_EMAIL}`} className="text-fg underline decoration-fg/30 underline-offset-4">
                      {CONTACT_EMAIL}
                    </a>
                    .
                  </p>
                  <Button href={CALENDAR_URL} variant="secondary">
                    Pick a time now
                  </Button>
                </motion.div>
              ) : (
                <motion.form key="form" noValidate onSubmit={onSubmit} exit={{ opacity: 0, y: -10 }} className="flex flex-col gap-5" aria-describedby="form-note">
                  <div className="grid sm:grid-cols-2 gap-5">
                    {[
                      { id: 'name', label: 'Your name', type: 'text', auto: 'name' },
                      { id: 'email', label: 'Work email', type: 'email', auto: 'email' },
                    ].map((f) => (
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
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="company" className="text-[13.5px] text-fg/70">
                        Company
                      </label>
                      <input id="company" name="company" type="text" autoComplete="organization" aria-invalid={!!errors.company} aria-describedby={errors.company ? 'company-error' : undefined} className={field} />
                      {errors.company && (
                        <p id="company-error" className="text-[12.5px] text-signal-alert">
                          {errors.company}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="business" className="text-[13.5px] text-fg/70">
                        Type of business
                      </label>
                      <select id="business" name="business" defaultValue="" className={cn(field, 'appearance-none bg-[url("data:image/svg+xml;utf8,<svg xmlns=%27http://www.w3.org/2000/svg%27 width=%2712%27 height=%278%27><path d=%27M1 1l5 5 5-5%27 stroke=%27%23F2EDE3%27 stroke-opacity=%27.5%27 fill=%27none%27 stroke-width=%271.5%27/></svg>")] bg-no-repeat bg-[right_1rem_center]')}>
                        <option value="" disabled>
                          Choose one
                        </option>
                        {customerTypes.map((c) => (
                          <option key={c.id} value={c.name} className="bg-ink-900">
                            {c.name}
                          </option>
                        ))}
                        <option value="Other" className="bg-ink-900">
                          Something else
                        </option>
                      </select>
                    </div>
                  </div>
                  <fieldset className="flex flex-col gap-3">
                    <legend className="text-[13.5px] text-fg/70 mb-2">Interested in</legend>
                    <div className="flex flex-wrap gap-2">
                      {interests.map((i) => {
                        const on = picked.includes(i.id);
                        return (
                          <label key={i.id} className={cn('cursor-pointer select-none inline-flex items-center gap-2 h-10 px-4 rounded-full border text-[14px] transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent', on ? 'border-honey bg-honey text-ink' : 'border-fg/15 text-fg/70 hover:border-fg/35')}>
                            <input type="checkbox" className="sr-only" checked={on} onChange={() => toggle(i.id)} />
                            {on && <Check className="w-3.5 h-3.5" />}
                            {i.label}
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-[13.5px] text-fg/70">
                      What should we know? <span className="text-fg/35">(optional)</span>
                    </label>
                    <textarea id="message" name="message" rows={4} className={cn(field, 'h-auto py-3 resize-none')} placeholder="Where your team loses the most time, what you'd want Bees to take on first…" />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                    <p id="form-note" className="text-[12.5px] text-fg/40 max-w-[34ch]">
                      We only use these details to reply to you.
                    </p>
                    <Button type="submit" size="lg" disabled={state === 'sending'}>
                      {state === 'sending' ? 'Sending' : 'Book a demo'}
                    </Button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default DemoPage;
