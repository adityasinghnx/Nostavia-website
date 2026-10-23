import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useSeo } from '../lib/useSeo';
import { categories, statusLabel, systemPath, systemsIn, type CategoryId } from '../content/human-os';
import { DISCLAIMER, FLAGS } from '../content/site';
import { PageHero, SectionHead } from '../components/page/PageKit';
import { CategorySwitch } from '../components/home/HumanOsSection';
import { FinalCta } from '../components/home/FinalCta';
import { Arrow, Button, Section, StatusDot } from '../components/ui/primitives';
import { Reveal } from '../components/ui/motion';
import { cn } from '../lib/cn';

const howSteps = [
  { title: 'Pick modules', body: 'Start with the few that match your business. Add more whenever you like.' },
  { title: 'Get your keys', body: 'API keys and docs come from the SDK Portal.' },
  { title: 'Try them first', body: 'Every module can be tried in a sandbox with fictional data.' },
  { title: 'Bees run them', body: 'Once switched on, they show up in Hive and the Bees run them.' },
];

const HumanOsPage: React.FC = () => {
  useSeo({
    title: "Human OS: what we've built | Nostavia",
    description: 'Ready-made health AI modules for your customers and for your care team. Pick what you need, get it through the SDK Portal, and run it in Hive.',
    path: '/human-os',
  });

  const [category, setCategory] = useState<CategoryId>('person');
  const [query, setQuery] = useState('');
  const [liveOnly, setLiveOnly] = useState(false);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return systemsIn(category)
      .map((s) => ({
        system: s,
        modules: s.modules.filter(
          (m) => (!liveOnly || m.status === 'live') && (!q || m.name.toLowerCase().includes(q) || m.description.toLowerCase().includes(q) || s.name.toLowerCase().includes(q)),
        ),
      }))
      .filter((r) => r.modules.length > 0);
  }, [category, query, liveOnly]);

  return (
    <>
      <PageHero
        label="Human OS"
        display
        title="What we've *built.*"
        intro="Ready-made modules for the people you serve and the team that serves them. Pick the ones you need, get them through the SDK Portal, and the Bees run them in Hive."
        actions={
          <>
            <Button to="/demo" size="lg">
              Book a demo
            </Button>
            <Button to="/developers" size="lg" variant="secondary">
              For developers
            </Button>
          </>
        }
        aside={
          <dl className="grid grid-cols-2 border-t border-fg/10">
            {categories.map((c, i) => (
              <div key={c.id} className={cn('pt-5', i > 0 && 'border-l border-fg/10 pl-5')}>
                <dt className="text-[15px]">{c.name}</dt>
                <dd className="mt-2 text-[13.5px] leading-relaxed text-fg/50">{c.summary}</dd>
              </div>
            ))}
          </dl>
        }
      />

      <Section labelledBy="catalogue" className="!pt-0">
        <div className="wrap">
          <h2 id="catalogue" className="sr-only">
            Module catalogue
          </h2>
          <div className="sticky top-[68px] z-20 -mx-[clamp(1rem,4vw,3rem)] px-[clamp(1rem,4vw,3rem)] py-4 bg-bg/85 backdrop-blur-xl border-y border-fg/[0.07] flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CategorySwitch id="catalogue" value={category} onChange={setCategory} />
            <div className="flex items-center gap-3">
              {FLAGS.SHOW_MODULE_STATUS && (
                <label className="inline-flex items-center gap-2 text-[13.5px] text-fg/60 cursor-pointer select-none">
                  <input type="checkbox" checked={liveOnly} onChange={(e) => setLiveOnly(e.target.checked)} className="peer sr-only" />
                  <span className="relative h-5 w-9 rounded-full bg-fg/15 transition-colors peer-checked:bg-honey peer-focus-visible:ring-2 peer-focus-visible:ring-accent after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-bone after:transition-transform peer-checked:after:translate-x-4" />
                  Live only
                </label>
              )}
              <label className="relative flex-1 md:flex-none">
                <span className="sr-only">Search modules</span>
                <Search aria-hidden="true" className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-fg/35" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search modules"
                  className="h-10 w-full md:w-64 rounded-full border border-fg/15 bg-fg/[0.03] pl-10 pr-4 text-[14px] placeholder:text-fg/35 focus:outline-none focus:border-accent/60"
                />
              </label>
            </div>
          </div>

          <div id="catalogue-panel" role="tabpanel" aria-labelledby={`catalogue-tab-${category}`} aria-live="polite">
            {results.length === 0 && <p className="py-20 text-center text-fg/50">No modules match “{query}”.</p>}
            {results.map(({ system, modules }) => (
              <article key={system.slug} className="grid lg:grid-cols-12 gap-x-10 gap-y-6 py-14 border-b border-fg/10">
                <div className="lg:col-span-4">
                  <div className="lg:sticky lg:top-44">
                    <p className="font-mono text-[12px] text-accent">{system.number}</p>
                    <h3 className="mt-3 text-[clamp(1.75rem,2.6vw,2.4rem)] leading-[1.05] tracking-[-0.03em]">{system.name}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-fg/55 max-w-[36ch]">{system.description}</p>
                    <p className="mt-4 text-[13px] text-fg/40">Best for: {system.bestFit}</p>
                    <Link to={systemPath(system.slug)} className="group mt-6 inline-flex items-center gap-2 text-[14px] hover:text-accent transition-colors">
                      Open {system.name} <Arrow className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
                <ul className="lg:col-span-8 grid sm:grid-cols-2 gap-3">
                  {modules.map((m) => (
                    <li key={m.name} className="rounded-2xl border border-fg/10 bg-fg/[0.015] p-6 flex flex-col gap-3 hover:border-fg/25 transition-colors">
                      <div className="flex items-center justify-between gap-3">
                        <h4 className="text-[17px] tracking-[-0.015em]">{m.name}</h4>
                        {FLAGS.SHOW_MODULE_STATUS && (
                          <span className="inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.1em] text-fg/45">
                            <StatusDot status={m.status} />
                            {statusLabel[m.status]}
                          </span>
                        )}
                      </div>
                      <p className="text-[14.5px] leading-relaxed text-fg/60">{m.description}</p>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className="mt-10 max-w-[80ch] text-[13px] leading-relaxed text-fg/45">{DISCLAIMER}</p>
        </div>
      </Section>

      <Section theme="paper" labelledBy="hos-how">
        <div className="wrap">
          <SectionHead id="hos-how" label="Getting started" title="From picking a module to Bees running it." />
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 border-t border-fg/[0.12] pt-10">
            {howSteps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.06}>
                <p className="font-mono text-[12px] text-accent">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="mt-4 t-h3">{s.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-fg/60 max-w-[30ch]">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      <FinalCta title="Find the modules that *fit you.*" body="Tell us about your business and we'll show you the few modules worth starting with." />
    </>
  );
};

export default HumanOsPage;
