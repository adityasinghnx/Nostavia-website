import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { nav, CONTACT_EMAIL, FLAGS } from '../../content/site';
import { families, HUMAN_OS_PATH } from '../../content/human-os';
import { useLenis } from '../../lib/smooth-scroll';
import { cn } from '../../lib/cn';
import { Arrow, Button } from '../ui/primitives';
import { HiveMark, Wordmark } from '../ui/marks';
import { EASE } from '../ui/motion';

type Tone = 'ink' | 'paper';

/** Which section theme sits under the bar, so the bar can match it. */
const toneUnder = (bar: HTMLElement | null): Tone => {
  const els = document.elementsFromPoint(window.innerWidth / 2, 34);
  const host = els.find((el) => !bar?.contains(el))?.closest('[data-theme]');
  return host?.getAttribute('data-theme') === 'paper' ? 'paper' : 'ink';
};

const HumanOsMenu: React.FC<{ onNavigate: () => void }> = ({ onNavigate }) => (
  <motion.div
    initial={{ opacity: 0, y: -8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -6, transition: { duration: 0.18 } }}
    transition={{ duration: 0.45, ease: EASE }}
    style={{ x: '-50%' }}
    className="fixed left-1/2 top-[56px] pt-3 w-[min(920px,calc(100vw-2rem))]"
  >
    <div data-theme="ink" className="rounded-2xl border border-fg/10 !bg-ink-900/95 backdrop-blur-xl shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] p-2 grid grid-cols-[1fr_2.4fr] gap-2">
      <Link
        to={HUMAN_OS_PATH}
        onClick={onNavigate}
        className="group relative overflow-hidden rounded-xl bg-[radial-gradient(120%_90%_at_0%_0%,rgba(242,210,122,0.16),transparent_60%)] border border-fg/[0.07] p-5 flex flex-col justify-between min-h-[250px]"
      >
        <div>
          <p className="t-label text-accent">Human OS</p>
          <p className="mt-3 text-[22px] leading-tight tracking-[-0.02em]">
            Ready-made <span className="em">health AI</span>
          </p>
          <p className="mt-2 text-[13.5px] text-fg/55 leading-relaxed">Modules for your customers and your care team. Switch one on without a new app release.</p>
        </div>
        <span className="inline-flex items-center gap-2 text-[13.5px] text-fg/80 group-hover:text-accent transition-colors">
          Explore Human OS <Arrow className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </Link>
      <ul className="grid grid-cols-2 gap-1 p-2">
        {families.map((f) => (
          <li key={f.id}>
            <Link to={`${HUMAN_OS_PATH}#${f.id}`} onClick={onNavigate} className="group flex h-full flex-col rounded-lg px-3 py-2.5 hover:bg-fg/[0.05] transition-colors">
              <span className="flex items-baseline gap-2.5">
                <span className="font-mono text-[10.5px] text-accent">{f.number}</span>
                <span className="text-[14px] text-fg/90 group-hover:text-fg">{f.name}</span>
              </span>
              <span className="mt-1 pl-[1.6rem] text-[12.5px] text-fg/45 leading-snug">{FLAGS.SHOW_MODULE_NAMES ? f.modules.map((m) => m.name).join(' · ') : f.does}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </motion.div>
);

export const Nav: React.FC = () => {
  const location = useLocation();
  const lenis = useLenis();
  const bar = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [tone, setTone] = useState<Tone>('ink');
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [hover, setHover] = useState<string | null>(null);

  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      setScrolled(y > 12);
      if (Math.abs(y - last) > 8) {
        setHidden(y > last && y > 520);
        last = y;
      }
      setTone(toneUnder(bar.current));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const settle = window.setTimeout(update, 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
      window.clearTimeout(settle);
    };
  }, [location.pathname]);

  useEffect(() => {
    setOpen(false);
    setMenu(false);
    setHidden(false);
  }, [location.pathname]);

  // Lock the page behind the mobile menu
  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
    document.documentElement.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, lenis]);

  const barTone: Tone = open ? 'ink' : tone;

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-honey focus:text-ink focus:px-4 focus:py-2 focus:text-sm">
        Skip to content
      </a>
      <header
        ref={bar}
        data-theme={barTone}
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-500 ease-out border-b',
          scrolled && !open ? 'bg-bg/70 backdrop-blur-xl backdrop-saturate-150 border-fg/[0.07]' : 'bg-transparent border-transparent',
          hidden && !open && !menu ? '-translate-y-full' : 'translate-y-0',
        )}
      >
        <div className="wrap h-[68px] flex items-center justify-between gap-6">
          <Link to="/" aria-label="Nostavia home" className="relative z-[2] shrink-0">
            <Wordmark tone={barTone === 'ink' ? 'light' : 'dark'} className="h-[21px] sm:h-[22px]" />
          </Link>

          <nav aria-label="Main" className="hidden lg:block absolute left-1/2 -translate-x-1/2">
            <ul className="flex items-center" onMouseLeave={() => setHover(null)}>
              {nav.map((item) => {
                const hasMenu = item.to === HUMAN_OS_PATH;
                return (
                  <li
                    key={item.to}
                    className="relative"
                    onMouseEnter={() => {
                      setHover(item.to);
                      setMenu(hasMenu);
                    }}
                    onMouseLeave={() => hasMenu && setMenu(false)}
                    onFocus={() => setMenu(hasMenu)}
                    onBlur={(e) => hasMenu && !e.currentTarget.contains(e.relatedTarget as Node) && setMenu(false)}
                  >
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        cn(
                          'relative z-[1] flex items-center gap-1.5 px-3 xl:px-4 h-9 rounded-full text-[14px] tracking-[-0.005em] transition-colors duration-300',
                          isActive || location.pathname.startsWith(item.to) ? 'text-fg' : 'text-fg/65 hover:text-fg',
                        )
                      }
                    >
                      {item.to === '/hive' && <HiveMark className="w-3.5 h-3.5 text-accent" />}
                      {item.label}
                      {location.pathname.startsWith(item.to) && (
                        <span aria-hidden="true" className="absolute left-1/2 -bottom-1 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-accent" />
                      )}
                    </NavLink>
                    {hover === item.to && (
                      <motion.span layoutId="nav-hover" aria-hidden="true" transition={{ type: 'spring', stiffness: 420, damping: 36 }} className="absolute inset-0 rounded-full bg-fg/[0.07]" />
                    )}
                    <AnimatePresence>{hasMenu && menu && <HumanOsMenu onNavigate={() => setMenu(false)} />}</AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2 relative z-[2]">
            <Button to="/demo" size="sm" className="hidden sm:inline-flex">
              Book a demo
            </Button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="lg:hidden relative h-10 w-10 -mr-2 grid place-items-center rounded-full"
            >
              <span className={cn('absolute h-px w-5 bg-fg transition-transform duration-500 ease-out', open ? 'rotate-45' : '-translate-y-[4px]')} />
              <span className={cn('absolute h-px w-5 bg-fg transition-transform duration-500 ease-out', open ? '-rotate-45' : 'translate-y-[4px]')} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            data-theme="ink"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.5, ease: EASE } }}
            transition={{ duration: 0.7, ease: EASE }}
            className="fixed inset-0 z-40 lg:hidden flex flex-col pt-[88px] pb-8"
          >
            <nav aria-label="Mobile" className="wrap flex-1">
              <ul className="border-t border-fg/10">
                {[{ label: 'Home', to: '/' }, ...nav].map((item, i) => (
                  <motion.li
                    key={item.to}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.05, duration: 0.7, ease: EASE }}
                    className="border-b border-fg/10"
                  >
                    <Link to={item.to} className="flex items-center justify-between py-4 text-[30px] leading-none tracking-[-0.03em]">
                      {item.label}
                      <Arrow className="w-5 h-5 text-fg/40" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="wrap flex flex-col gap-5">
              <Button to="/demo" size="lg" className="w-full">
                Book a demo
              </Button>
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-center text-sm text-fg/55">
                {CONTACT_EMAIL}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
