import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { HUMAN_OS_PATH, numberWord, totalLive, totalSystems } from '../../content/human-os';
import { Container, focusRing } from '../home/shared';
import { Reveal } from '../home/motion';
import { ProductWindow } from './ProductWindow';

export const Hero: React.FC = () => (
  <section className="relative overflow-hidden -mt-16 pt-16">
    <div aria-hidden="true" className="absolute inset-0 dk-grid dk-fade-mask" />
    <div aria-hidden="true" className="absolute left-1/2 -translate-x-1/2 -top-56 w-[1200px] max-w-[180vw] h-[760px] bg-[radial-gradient(closest-side,rgba(245,217,123,0.16),transparent)]" />

    <Container className="relative pt-16 sm:pt-24 pb-20 sm:pb-28">
      <div className="text-center flex flex-col items-center">
        <Reveal>
          <Link
            to={HUMAN_OS_PATH}
            className={`group inline-flex items-center gap-2 rounded-full dk-card pl-1.5 pr-4 py-1.5 text-xs sm:text-sm text-white/75 hover:text-white hover:border-white/20 transition-colors ${focusRing}`}
          >
            <span className="rounded-full bg-hos-yellow text-ink-950 text-[11px] font-semibold px-2.5 py-0.5">Human OS</span>
            {totalLive} live modules across {numberWord(totalSystems).toLowerCase()} systems
            <ArrowRight aria-hidden="true" className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Reveal>

        <Reveal delay={80}>
          {/* TODO(copy): subhead below is new */}
          <h1 className="mt-8 font-display font-semibold text-[46px] leading-[1.14] sm:text-7xl sm:leading-[1.12] lg:text-[92px] lg:leading-[1.12] tracking-[-0.04em] max-w-5xl pb-2">
            <span className="block sm:whitespace-nowrap">
              <span className="dk-text-gradient">Enabling </span>
              <span className="dk-text-sun">super intelligence</span>
            </span>
            <span className="block dk-text-gradient">for healthcare</span>
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-7 text-lg sm:text-xl text-white/60 leading-relaxed max-w-2xl">
            Nostavia turns lab reports, wearable data, meal photos and phone calls into health AI your customers use every day. One integration, {numberWord(totalSystems).toLowerCase()} systems, and your name on everything.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link to="/demo" className={`inline-flex items-center gap-2 bg-white hover:bg-hos-yellow text-ink-950 text-sm font-semibold px-6 py-3.5 rounded-full transition-colors ${focusRing}`}>
              Request a demo
              <ArrowRight aria-hidden="true" className="w-4 h-4" />
            </Link>
            <a href="#platform" className={`inline-flex items-center gap-2 dk-card hover:border-white/25 text-white text-sm font-semibold px-6 py-3.5 rounded-full transition-colors ${focusRing}`}>
              See the platform
            </a>
          </div>
        </Reveal>
      </div>

      <Reveal delay={320} className="relative mt-16 sm:mt-20 max-w-6xl mx-auto">
        <div aria-hidden="true" className="absolute inset-x-0 -bottom-24 h-64 bg-[radial-gradient(closest-side,rgba(245,217,123,0.2),transparent)]" />
        <ProductWindow />
      </Reveal>
    </Container>
  </section>
);
