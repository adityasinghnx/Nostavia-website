import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BarChart3,
  ClipboardList,
  FileText,
  GitBranch,
  Hourglass,
  MessageCircle,
  PhoneCall,
  RefreshCw,
  Utensils,
  Code2,
  Smartphone,
  Hammer,
} from 'lucide-react';
import { findModule, systemPath } from '../../content/human-os';
import { Container, Eyebrow, focusRing } from './shared';
import { Reveal } from './motion';

/* Live products, by module name. Copy is the first sentence of each module description in human-os.ts. */
const products: { name: string; icon: React.FC<{ className?: string }> }[] = [
  { name: 'Smart Reports', icon: FileText },
  { name: 'Re-Test Recall Engine', icon: RefreshCw },
  { name: 'AI Voice Agent', icon: PhoneCall },
  { name: 'Clinical Intake Briefs', icon: ClipboardList },
  { name: 'AI Health Companion', icon: MessageCircle },
  { name: 'Biological Age', icon: Hourglass },
  { name: 'Food Intelligence', icon: Utensils },
  { name: 'Adaptive Protocols', icon: GitBranch },
  { name: 'B2B Analytics Dashboard', icon: BarChart3 },
];

const firstSentence = (s: string) => {
  const i = s.indexOf('. ');
  return i === -1 ? s : s.slice(0, i + 1);
};

/* Photos: Unsplash, free licence (photo-1549692520, photo-1653762379954, photo-1557804506). Lines reuse the site navigation copy. */
const launchOptions = [
  { name: 'SDK', line: 'Add health AI to the app you already have.', to: '/solutions/gravity', icon: Code2, photo: '/photos/home-sdk-developer.jpg', w: 1600, h: 2402, alt: 'A developer writing code at a desk' },
  { name: 'White Label', line: 'Our ready-made products, launched as yours.', to: '/solutions/storyhealth', icon: Smartphone, photo: '/photos/home-whitelabel-phone.jpg', w: 1600, h: 1067, alt: 'A woman smiling at her phone in a cafe' },
  { name: 'Custom Build', line: 'Designed and built from scratch for you.', to: '/solutions/engineering', icon: Hammer, photo: '/photos/home-custom-team.jpg', w: 1600, h: 1200, alt: 'A team planning a product at a whiteboard' },
];

export const ProductsSection: React.FC = () => (
  <section aria-labelledby="home-products-heading" className="bg-ink-950 py-20 sm:py-28">
    <Container className="space-y-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
        <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-24 self-start">
          <Eyebrow>Products</Eyebrow>
          {/* TODO(copy): products heading and intro */}
          <h2 id="home-products-heading" className="font-display font-semibold text-3xl sm:text-5xl tracking-tight leading-[1.08] text-white">
            Health AI your customers see as yours.
          </h2>
          <p className="text-base sm:text-lg text-white/60 leading-relaxed">
            Pick the products that fit your business and switch them on from one console. Every one runs under your brand.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              to="/demo"
              className={`inline-flex items-center justify-center bg-white hover:bg-hos-yellow text-ink-950 text-sm font-semibold px-6 py-3.5 rounded-full transition-colors ${focusRing}`}
            >
              Request a demo
            </Link>
            <Link
              to="/human-os"
              className={`inline-flex items-center justify-center gap-2 border border-white/[0.08] hover:border-white/40 text-white text-sm font-semibold px-6 py-3.5 rounded-full transition-colors ${focusRing}`}
            >
              All products
              <ArrowRight aria-hidden="true" className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <ul className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
          {products.map(({ name, icon: Icon }, i) => {
            const mod = findModule(name)!;
            return (
              <li key={name}>
                <Reveal delay={(i % 3) * 90} className="h-full">
                <Link
                  to={systemPath(mod.system.slug)}
                  className={`group flex flex-col gap-3 h-full rounded-[12px] border border-white/[0.08] bg-white/[0.03] p-5 hover:border-white/25 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-24px_rgba(0,0,0,0.7)] transition-all duration-300 ${focusRing}`}
                >
                  <span className="flex items-center justify-between">
                    <span className="w-9 h-9 rounded-[10px] bg-white/[0.04] border border-white/[0.08] flex items-center justify-center transition-colors duration-300 group-hover:bg-hos-yellow group-hover:border-hos-yellow/40">
                      <Icon aria-hidden="true" className="w-4 h-4 text-white transition-colors duration-300 group-hover:text-ink-950" />
                    </span>
                  </span>
                  <span>
                    <span className="block font-display font-bold text-base text-white">{name}</span>
                    <span className="block font-mono text-[10px] font-bold uppercase tracking-widest text-white/55 mt-0.5">{mod.system.name}</span>
                  </span>
                  <span className="text-sm text-white/60 leading-relaxed">{firstSentence(mod.description)}</span>
                </Link>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <h3 className="font-display font-semibold text-2xl sm:text-3xl text-white tracking-tight">Launch it your way</h3>
          <Link
            to="/pricing"
            className={`inline-flex items-center gap-1.5 text-sm font-bold text-white underline underline-offset-4 decoration-hos-yellow decoration-2 hover:decoration-white ${focusRing}`}
          >
            See pricing
            <ArrowRight aria-hidden="true" className="w-4 h-4" />
          </Link>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {launchOptions.map(({ name, line, to, icon: Icon, photo, w, h, alt }, i) => (
            <li key={name}>
              <Reveal delay={i * 100} className="h-full">
              <Link
                to={to}
                className={`group flex flex-col h-full rounded-[16px] bg-white/[0.03] border border-white/[0.08] overflow-hidden hover:border-hos-yellow/60 hover:shadow-card transition-all ${focusRing}`}
              >
                <span className="block overflow-hidden">
                  <img
                    src={photo}
                    alt={alt}
                    width={w}
                    height={h}
                    loading="lazy"
                    decoding="async"
                    className="w-full aspect-[16/10] object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </span>
                <span className="flex flex-col gap-3 p-6 flex-1">
                  <span className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-[10px] bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
                      <Icon aria-hidden="true" className="w-4 h-4 text-white" />
                    </span>
                    <span className="font-display font-bold text-lg text-white">{name}</span>
                  </span>
                  <span className="text-sm text-white/60 leading-relaxed">{line}</span>
                  <span className="mt-auto pt-2 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white">
                    Explore {name}
                    <ArrowRight aria-hidden="true" className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </span>
              </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  </section>
);
