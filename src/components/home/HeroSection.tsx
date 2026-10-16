import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Layers, Zap } from 'lucide-react';
import { HUMAN_OS_PATH, numberWord, totalSystems } from '../../content/human-os';
import { Container, focusRing } from './shared';
import { Reveal } from './motion';
import { IntakeBriefCard, SmartReportCard, VoiceCallCard } from './LiveCards';

/** Dark hero: original headline and hero image, framed with live product screens. */
export const HeroSection: React.FC = () => (
  <section className="relative overflow-hidden -mt-16 pt-16">
    {/* Background: fine grid fading out, one soft accent glow */}
    <div aria-hidden="true" className="absolute inset-0 dk-grid dk-fade-mask" />
    <div aria-hidden="true" className="absolute left-1/2 -translate-x-1/2 -top-56 w-[1200px] max-w-[180vw] h-[760px] bg-[radial-gradient(closest-side,rgba(245,217,123,0.16),transparent)]" />

    <Container className="relative pt-16 sm:pt-24 text-center flex flex-col items-center">
      <Reveal>
        <Link
          to={HUMAN_OS_PATH}
          className={`group inline-flex items-center gap-2 rounded-full dk-card pl-1.5 pr-4 py-1.5 text-xs sm:text-sm text-white/75 hover:text-white hover:border-white/20 transition-colors ${focusRing}`}
        >
          <span className="rounded-full bg-hos-yellow text-ink-950 text-[11px] font-semibold px-2.5 py-0.5">New</span>
          Human OS: {numberWord(totalSystems).toLowerCase()} systems, one integration
          <ArrowRight aria-hidden="true" className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </Reveal>

      <Reveal delay={80}>
        <h1 className="mt-8 font-display font-semibold text-[44px] leading-[1.02] sm:text-7xl lg:text-[92px] tracking-[-0.035em] max-w-5xl">
          <span className="dk-text-gradient">Enabling </span>
          <span className="dk-text-sun">autonomous intelligence</span>
          <span className="dk-text-gradient"> for healthcare</span>
        </h1>
      </Reveal>

      <Reveal delay={160}>
        <p className="mt-7 text-lg sm:text-xl text-white/60 leading-relaxed max-w-2xl">
          We design and build custom health AI products for labs, clinics, hospitals and health apps, from scratch or on top of our White Label products and SDK. All under your brand.
        </p>
      </Reveal>

      <Reveal delay={240}>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/demo"
            className={`inline-flex items-center gap-2 bg-white hover:bg-hos-yellow text-ink-950 text-sm font-semibold px-6 py-3.5 rounded-full transition-colors ${focusRing}`}
          >
            Request a demo
            <ArrowRight aria-hidden="true" className="w-4 h-4" />
          </Link>
          <Link
            to={HUMAN_OS_PATH}
            className={`inline-flex items-center gap-2 dk-card hover:border-white/25 text-white text-sm font-semibold px-6 py-3.5 rounded-full transition-colors ${focusRing}`}
          >
            Explore Human OS
          </Link>
        </div>
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-white/55">
          <li className="inline-flex items-center gap-2">
            <Layers aria-hidden="true" className="w-4 h-4 text-hos-yellow" />
            Under your brand
          </li>
          <li className="inline-flex items-center gap-2">
            <Zap aria-hidden="true" className="w-4 h-4 text-hos-yellow" />
            Live on the next API call
          </li>
          <li className="inline-flex items-center gap-2">
            <ShieldCheck aria-hidden="true" className="w-4 h-4 text-hos-yellow" />
            DPDP Act aligned
          </li>
        </ul>
      </Reveal>

      {/* Showcase: hero image in a glowing frame, with sample product screens around it */}
      <Reveal delay={300} className="relative w-full max-w-6xl mt-16 sm:mt-20">
        <div aria-hidden="true" className="absolute inset-x-0 -bottom-24 h-64 bg-[radial-gradient(closest-side,rgba(245,217,123,0.22),transparent)]" />
        <div className="relative rounded-[28px] p-2 dk-card shadow-[0_60px_140px_-50px_rgba(0,0,0,0.9)]">
          <div className="relative rounded-[22px] overflow-hidden aspect-[16/10] sm:aspect-[16/8] bg-ink-900">
            <img
              src="/hero-bg.jpg"
              alt="Nostavia Digital Health Intelligence Layer Visual"
              width={1440}
              height={1800}
              {...{ fetchpriority: 'high' }}
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/10 to-ink-950/30" />

            {/* Sample screens: decorative on mobile, shown around the image on larger screens */}
            <div aria-hidden="true" className="hidden lg:block absolute left-6 top-6">
              <SmartReportCard />
            </div>
            <div aria-hidden="true" className="hidden lg:block absolute right-6 top-10">
              <IntakeBriefCard />
            </div>
            <div aria-hidden="true" className="absolute left-1/2 -translate-x-1/2 bottom-4 sm:bottom-6 w-[min(320px,calc(100%-2rem))]">
              <VoiceCallCard className="w-full" />
            </div>
          </div>
        </div>
      </Reveal>
    </Container>
  </section>
);
