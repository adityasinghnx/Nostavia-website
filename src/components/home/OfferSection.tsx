import React from 'react';
import { Link } from 'react-router-dom';
import { products, ways } from '../../content/offer';
import { bees } from '../../content/bees';
import { Arrow, Label } from '../ui/primitives';
import { Reveal, SplitHeading } from '../ui/motion';
import { HiveMark } from '../ui/marks';
import { ReportCard } from '../visuals/ReportCard';
import { BrandedApp } from '../visuals/BrandedApp';
import { BeeAvatar } from '../hive/HiveConsole';

/* ─────────────────────────────────────────────────────────────────────────────
 * The positioning in one screen: two products side by side, and underneath,
 * the two ways to use them (Hive, or your own app through the API).
 * ──────────────────────────────────────────────────────────────────────────── */

const [humanOs, studio] = products;
const [hive, api] = ways;

const ProductCard: React.FC<{ p: (typeof products)[number]; visual: React.ReactNode; delay?: number }> = ({ p, visual, delay = 0 }) => (
  <Reveal delay={delay} className="h-full">
    <Link to={p.to} className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-fg/10 bg-[linear-gradient(180deg,rgb(var(--fg)/0.035),transparent_55%)] transition-colors duration-500 hover:border-fg/25">
      <div className="p-7 md:p-9">
        <div className="flex items-center justify-between">
          <p className="t-label text-accent">{p.tag}</p>
          <Arrow className="w-5 h-5 text-fg/30 transition-all duration-500 group-hover:text-accent group-hover:translate-x-1" />
        </div>
        <h3 className="mt-5 text-[clamp(2rem,3.4vw,3rem)] leading-none tracking-[-0.035em]">{p.name}</h3>
        <p className="mt-4 text-[clamp(1.1rem,1.4vw,1.3rem)] leading-snug tracking-[-0.015em] text-fg/85 max-w-[26ch]">{p.headline}</p>
        <p className="mt-3 text-[15px] leading-relaxed text-fg/55 max-w-[46ch]">{p.body}</p>
      </div>
      <div className="relative mt-auto flex justify-center px-7 md:px-9 pb-0">
        <div className="relative w-full transition-transform duration-700 ease-out group-hover:-translate-y-2">{visual}</div>
      </div>
    </Link>
  </Reveal>
);

export const OfferSection: React.FC = () => (
  <section id="offer" data-theme="ink" aria-labelledby="offer-title" className="relative py-[clamp(6rem,11vw,10rem)]">
    <div className="wrap">
      <div className="grid lg:grid-cols-12 gap-8 items-end mb-12 md:mb-16">
        <div className="lg:col-span-8">
          <Label index="01">What we offer</Label>
          <SplitHeading id="offer-title" className="t-h1 mt-6 max-w-[14ch]" text="Two products. One place to run them." />
        </div>
        <Reveal className="lg:col-span-4">
          <p className="text-[16px] leading-relaxed text-fg/60">Start with what is ready, have us build what is not, and run all of it the same way.</p>
        </Reveal>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <ProductCard
          p={humanOs}
          visual={
            <div className="mx-auto w-full max-w-[480px] translate-y-[12%] -mb-[6%]">
              <ReportCard />
            </div>
          }
        />
        <ProductCard
          p={studio}
          delay={0.08}
          visual={
            <div className="mx-auto w-[46%] max-w-[224px] translate-y-[10%] -mb-[16%]">
              <BrandedApp />
            </div>
          }
        />
      </div>

      {/* How you use them */}
      <Reveal delay={0.1} className="mt-4">
        <Link to={hive.to} className="group relative block overflow-hidden rounded-[28px] border border-accent/25 bg-[radial-gradient(70%_120%_at_0%_0%,rgba(242,210,122,0.12),transparent_60%)] p-7 md:p-9 transition-colors duration-500 hover:border-accent/50">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5">
              <p className="t-label text-accent flex items-center gap-2">
                <HiveMark className="w-4 h-4" /> How you use them
              </p>
              <h3 className="mt-5 text-[clamp(2rem,3.4vw,3rem)] leading-none tracking-[-0.035em]">{hive.headline}</h3>
              <p className="mt-4 text-[15.5px] leading-relaxed text-fg/60 max-w-[44ch]">{hive.body}</p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <p className="self-end max-w-[90%] rounded-2xl rounded-br-md bg-fg/[0.07] px-4 py-2.5 text-[14px] text-fg/85">Every morning at 7, send me yesterday’s numbers.</p>
              <p className="flex items-start gap-3 text-[14px] text-fg/75">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent/15">
                  <HiveMark className="h-3 w-3 text-accent" />
                </span>
                Done. A Bee will send them every morning at 7.
              </p>
            </div>
            <div className="lg:col-span-3 flex items-center lg:justify-end gap-4">
              <span className="flex -space-x-3">
                {bees.slice(0, 5).map((b) => (
                  <BeeAvatar key={b.id} id={b.id} size={46} className="ring-2 ring-bg" />
                ))}
              </span>
              <Arrow className="w-5 h-5 text-fg/30 transition-all duration-500 group-hover:text-accent group-hover:translate-x-1" />
            </div>
          </div>
        </Link>
      </Reveal>

      <Reveal delay={0.15} className="mt-6">
        <Link to={api.to} className="group inline-flex flex-wrap items-center gap-x-3 gap-y-1 text-[15px] text-fg/60 hover:text-fg transition-colors">
          <span className="text-fg">{api.headline}</span>
          {api.body}
          <Arrow className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </Reveal>
    </div>
  </section>
);
