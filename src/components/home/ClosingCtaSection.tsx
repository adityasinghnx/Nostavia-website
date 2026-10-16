import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Container } from './shared';
import { Reveal } from './motion';

/** Isometric layer stack, after the deck cover: two dark layers under a yellow one. */
export const LayerStack: React.FC = () => {
  const cx = 260;
  const w = 200;
  const h = 100;
  const t = 14;
  const face = (y: number) => `${cx},${y - h} ${cx + w},${y} ${cx},${y + h} ${cx - w},${y}`;
  const side = (y: number) => `${cx - w},${y} ${cx},${y + h} ${cx + w},${y} ${cx + w},${y + t} ${cx},${y + h + t} ${cx - w},${y + t}`;
  const tile = (x: number, y: number, s = 26) => `${x},${y - s / 2} ${x + s},${y} ${x},${y + s / 2} ${x - s},${y}`;
  const tileSide = (x: number, y: number, s = 26, d = 8) => `${x - s},${y} ${x},${y + s / 2} ${x + s},${y} ${x + s},${y + d} ${x},${y + s / 2 + d} ${x - s},${y + d}`;

  return (
    <svg aria-hidden="true" viewBox="0 0 520 470" className="w-full max-w-[520px] h-auto">
      {/* lower layers */}
      <g className="hos-anim" style={{ animation: 'hos-float 7s ease-in-out 0.6s infinite' }}>
        <polygon points={side(360)} fill="#0E1426" />
        <polygon points={face(360)} fill="#141B33" stroke="#2A3557" />
      </g>
      <g className="hos-anim" style={{ animation: 'hos-float 7s ease-in-out 0.3s infinite' }}>
        <polygon points={side(300)} fill="#0E1426" />
        <polygon points={face(300)} fill="#182042" stroke="#2A3557" />
        {[-60, 0, 60].map((dx) => (
          <line key={dx} x1={cx + dx} y1={300 + h - Math.abs(dx) / 2} x2={cx + dx} y2={360 + h - Math.abs(dx) / 2} stroke="#F5D97B" strokeOpacity="0.5" strokeDasharray="2 4" />
        ))}
      </g>
      {/* yellow layer with modules */}
      <g className="hos-anim" style={{ animation: 'hos-float 7s ease-in-out infinite' }}>
        <polygon points={side(220)} fill="#C9A94F" />
        <polygon points={face(220)} fill="#F5D97B" />
        {[
          [200, 200],
          [270, 172],
          [330, 214],
          [258, 244],
        ].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="3" fill="#121A31" />
        ))}
        {[
          [220, 150],
          [300, 130],
          [350, 168],
          [270, 190],
        ].map(([x, y]) => (
          <g key={`t-${x}-${y}`}>
            <polygon points={tileSide(x, y)} fill="#D9D6CC" />
            <polygon points={tile(x, y)} fill="#FFFFFF" />
          </g>
        ))}
      </g>
      {/* wireframe outline above */}
      <polygon points={face(120)} fill="none" stroke="#FFFFFF" strokeOpacity="0.35" />
    </svg>
  );
};

/** Dark close, styled after the deck cover. */
export const ClosingCtaSection: React.FC = () => (
  <section aria-labelledby="home-close-heading" className="relative overflow-hidden bg-ink-950 text-white py-24 sm:py-32">
    <span aria-hidden="true" className="absolute right-0 top-0 w-[60%] h-full bg-[radial-gradient(ellipse_at_center,rgba(245,217,123,0.10),transparent_60%)] pointer-events-none" />

    <Container className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <Reveal className="space-y-8">
        <h2 id="home-close-heading" className="font-display font-semibold text-4xl sm:text-6xl tracking-tight leading-[1.05]">
          Launch under your brand. <span className="text-hos-yellow">Your users never see us.</span>
        </h2>
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
          Thirty minutes on live product, not slides. Tell us what you want built. We'll scope a Custom Build, or show you the White Label product or SDK that already fits.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            to="/demo"
            className="inline-flex items-center gap-2 bg-white hover:bg-hos-yellow text-ink-950 text-sm font-semibold px-6 py-3.5 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hos-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
          >
            Request a demo
            <ArrowRight aria-hidden="true" className="w-4 h-4" />
          </Link>
          <Link
            to="/pricing"
            className="inline-flex items-center gap-2 border border-white/25 hover:border-white text-white text-sm font-semibold px-6 py-3.5 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hos-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
          >
            See pricing
          </Link>
        </div>
      </Reveal>
      <div className="hidden sm:flex justify-center lg:justify-end">
        <LayerStack />
      </div>
    </Container>
  </section>
);
