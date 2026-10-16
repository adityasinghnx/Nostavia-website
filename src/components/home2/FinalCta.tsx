import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Container, focusRing } from '../home/shared';
import { Reveal } from '../home/motion';
import { LayerStack } from '../home/ClosingCtaSection';

export const FinalCta: React.FC = () => (
  <section aria-labelledby="final-cta-heading" className="relative overflow-hidden bg-ink-950 py-24 sm:py-32 border-t border-white/[0.06]">
    <div aria-hidden="true" className="absolute inset-0 dk-grid dk-fade-mask opacity-70" />
    <div aria-hidden="true" className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[1100px] max-w-[180vw] h-[700px] bg-[radial-gradient(closest-side,rgba(245,217,123,0.14),transparent)]" />
    <Container className="relative flex flex-col items-center text-center">
      <Reveal className="w-full max-w-[340px] opacity-90">
        <LayerStack />
      </Reveal>
      <Reveal delay={100}>
        {/* TODO(copy): closing headline */}
        <h2 id="final-cta-heading" className="mt-6 font-display font-semibold text-4xl sm:text-6xl tracking-[-0.03em] leading-[1.04] max-w-3xl">
          <span className="dk-text-gradient">Launch your health AI. </span>
          <span className="dk-text-sun">Keep your brand.</span>
        </h2>
      </Reveal>
      <Reveal delay={180}>
        <p className="mt-6 text-lg text-white/60 max-w-xl leading-relaxed">
          Thirty minutes on live product, not slides. Tell us what you want built, and we'll show you the fastest way to launch it.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link to="/demo" className={`inline-flex items-center gap-2 bg-white hover:bg-hos-yellow text-ink-950 text-sm font-semibold px-6 py-3.5 rounded-full transition-colors ${focusRing}`}>
            Request a demo
            <ArrowRight aria-hidden="true" className="w-4 h-4" />
          </Link>
          <Link to="/pricing" className={`inline-flex items-center gap-2 dk-card hover:border-white/25 text-white text-sm font-semibold px-6 py-3.5 rounded-full transition-colors ${focusRing}`}>
            See pricing
          </Link>
        </div>
      </Reveal>
    </Container>
  </section>
);
