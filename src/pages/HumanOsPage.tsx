import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Smartphone } from 'lucide-react';
import { useSeo } from '../lib/useSeo';
import { families, groups, HUMAN_OS_SUB, usage } from '../content/human-os';
import { FLAGS, SAFETY_LINE } from '../content/site';
import { PageHero, SectionHead } from '../components/page/PageKit';
import { FinalCta } from '../components/home/FinalCta';
import { ReportCard } from '../components/visuals/ReportCard';
import { Arrow, Button, Label, Section } from '../components/ui/primitives';
import { Reveal } from '../components/ui/motion';
import { HiveMark } from '../components/ui/marks';
import { cn } from '../lib/cn';

const usageIcons = [<HiveMark key="h" className="h-6 w-6" />, <Code2 key="c" className="h-6 w-6" strokeWidth={1.4} />, <Smartphone key="s" className="h-6 w-6" strokeWidth={1.4} />];

const HumanOsPage: React.FC = () => {
  useSeo({
    title: 'Human OS: ready-made health AI | Nostavia',
    description: `${HUMAN_OS_SUB} Modules for your customers and for your care team.`,
    path: '/human-os',
  });

  return (
    <>
      <PageHero
        label="Human OS · Ready-made"
        display
        title="Ready-made *health AI.*"
        intro={HUMAN_OS_SUB}
        actions={
          <>
            <Button to="/demo" size="lg">
              Book a demo
            </Button>
            <Button to="/developers" size="lg" variant="secondary">
              Read the docs
            </Button>
          </>
        }
        aside={
          <div className="mx-auto w-full max-w-[460px] lg:rotate-[1.5deg]">
            <ReportCard />
          </div>
        }
      />

      <Section theme="paper" labelledBy="groups-title" tight>
        <div className="wrap grid md:grid-cols-12 gap-10 items-start">
          <h2 id="groups-title" className="md:col-span-4 t-h2">Two groups.</h2>
          <dl className="md:col-span-8 grid sm:grid-cols-2 border-t border-fg/[0.12]">
            {groups.map((g, i) => (
              <Reveal key={g.id} delay={i * 0.06} className={cn('pt-6 pb-2', i > 0 && 'sm:border-l sm:border-fg/[0.12] sm:pl-8')}>
                <dt className="text-[clamp(1.35rem,2vw,1.75rem)] tracking-[-0.025em]">{g.name}</dt>
                <dd className="mt-3 text-[15.5px] leading-relaxed text-fg/60 max-w-[40ch]">{g.body}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </Section>

      <Section labelledBy="families-title">
        <div className="wrap">
          <SectionHead id="families-title" label="What it covers" title="Five families of modules." intro="Switch on the modules that fit your business. Add more whenever you like, without a new app release." />
          {families.map((f) => (
            <article key={f.id} id={f.id} aria-labelledby={`${f.id}-title`} className="grid lg:grid-cols-12 gap-x-10 gap-y-6 py-14 border-t border-fg/10 scroll-mt-28">
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-32">
                  <p className="font-mono text-[12px] text-accent">{f.number}</p>
                  <h3 id={`${f.id}-title`} className="mt-3 text-[clamp(1.75rem,2.8vw,2.5rem)] leading-[1.05] tracking-[-0.03em]">
                    {f.name}
                  </h3>
                  <p className="mt-3 text-[15.5px] leading-relaxed text-fg/55 max-w-[36ch]">{f.does}</p>
                  <p className="mt-5 flex flex-wrap gap-2">
                    {f.groups.map((g) => (
                      <span key={g} className="rounded-full border border-fg/15 px-2.5 py-1 text-[12px] text-fg/55">
                        {groups.find((x) => x.id === g)!.name}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
              {FLAGS.SHOW_MODULE_NAMES && (
                <ul className="lg:col-span-8 grid sm:grid-cols-2 gap-3">
                  {f.modules.map((m, i) => (
                    <Reveal as="li" key={m.name} delay={(i % 2) * 0.05} className="group rounded-2xl border border-fg/10 bg-[linear-gradient(180deg,rgb(var(--fg)/0.03),transparent)] p-6 min-h-[150px] flex flex-col justify-between gap-6 hover:border-fg/25 transition-colors">
                      <h4 className="text-[18px] tracking-[-0.015em]">{m.name}</h4>
                      <p className="text-[14.5px] leading-relaxed text-fg/60">{m.body}</p>
                    </Reveal>
                  ))}
                </ul>
              )}
            </article>
          ))}
          <p className="mt-6 max-w-[80ch] text-[13px] leading-relaxed text-fg/45">{SAFETY_LINE}</p>
        </div>
      </Section>

      <Section theme="paper" labelledBy="usage-title">
        <div className="wrap">
          <Label>Three ways to use it</Label>
          <h2 id="usage-title" className="t-h1 mt-6 max-w-[21ch] text-balance">
            Run it in Hive, build it in, or have us build around it.
          </h2>
          <ul className="mt-14 grid md:grid-cols-3 gap-3">
            {usage.map((u, i) => (
              <Reveal as="li" key={u.title} delay={i * 0.06}>
                <Link to={u.to} className="group flex h-full min-h-[260px] flex-col justify-between rounded-[24px] border border-fg/[0.12] bg-surface/60 p-7 md:p-8 hover:border-accent/50 transition-colors">
                  <span className="text-accent">{usageIcons[i]}</span>
                  <span>
                    <span className="flex items-center justify-between gap-4 text-[clamp(1.4rem,2vw,1.75rem)] tracking-[-0.025em]">
                      {u.title}
                      <Arrow className="w-5 h-5 text-fg/30 transition-all group-hover:text-accent group-hover:translate-x-1" />
                    </span>
                    <span className="mt-2 block text-[15px] leading-relaxed text-fg/60">{u.body}</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <FinalCta title="Find the modules that *fit you.*" body="Tell us what you need and we will show you how it fits your product." />
    </>
  );
};

export default HumanOsPage;
