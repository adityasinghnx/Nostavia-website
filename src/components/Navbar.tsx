import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  ArrowUpRight,
  Activity,
  Stethoscope,
  Smartphone,
  Building2,
  Layers,
  Code2,
  Headset,
  FileText,
} from 'lucide-react';
import { HUMAN_OS_PATH, hospitalProgrammes, numberWord, rings, systemPath, systemsInRing, totalSystems } from '../content/human-os';

interface NavbarProps {
  onOpenDemo?: () => void;
}

type MenuId = 'products' | 'humanos' | null;

const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hos-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950';

const industries = [
  { to: '/industries/diagnostic-labs', label: 'Diagnostic Labs', line: 'Smart Reports and re-test recall', icon: Activity },
  { to: '/industries/clinics', label: 'Clinics & Longevity', line: 'Intake briefs and biological age', icon: Stethoscope },
  { to: '/industries/supplements', label: 'Wellness & Apps', line: 'Wearables and food scanning', icon: Smartphone },
  { to: '/industries/hospitals', label: 'Hospitals & Health Systems', line: `${hospitalProgrammes.length} patient programmes`, icon: Building2 },
];

const products = [
  { to: '/solutions/engineering', label: 'Custom Build', line: 'Designed and built from scratch for you', icon: Layers },
  { to: '/solutions/storyhealth', label: 'White Label', line: 'Our ready-made products, launched as yours', icon: Smartphone },
  { to: '/solutions/gravity', label: 'SDK', line: 'Add health AI to the app you already have', icon: Code2 },
  { to: '/solutions/front-desk', label: 'AI Front Desk Agent', line: 'Answers every call and books the visit', icon: Headset },
  { to: '/solutions/hospitals', label: 'Hospital Programmes', line: `${hospitalProgrammes.length} white-label patient programmes`, icon: Building2 },
  { to: '/solutions/comet', label: 'Smart Reports & Re-Test Recall', line: 'Branded reports that bring patients back', icon: FileText },
];

const links = [
  { to: '/pricing', label: 'Pricing' },
  { to: '/clinical', label: 'Clinical' },
  { to: '/security', label: 'Security' },
  { to: '/company', label: 'Company' },
];

export const Navbar: React.FC<NavbarProps> = () => {
  const [activeMenu, setActiveMenu] = useState<MenuId>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setActiveMenu(null);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const closeMenus = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setActiveMenu(null);
    setMobileMenuOpen(false);
  };
  const open = (menu: MenuId) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setActiveMenu(menu);
  };
  const scheduleClose = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => setActiveMenu(null), 180);
  };

  const frontDeskBanner = ['front-desk', 'ai-agents', 'voice-agents', 'hospitals'].some((p) => location.pathname.includes(p));
  const isActive = (to: string) => location.pathname === to || location.pathname.startsWith(`${to}/`);
  const productsActive = location.pathname.startsWith('/solutions') || location.pathname.startsWith('/industries') || location.pathname === '/platform';

  const navBtn = (active: boolean) =>
    `inline-flex items-center gap-1 px-3 py-2 rounded-full text-[13px] font-medium transition-colors ${focusRing} ${
      active ? 'text-white bg-white/[0.08]' : 'text-white/65 hover:text-white hover:bg-white/[0.05]'
    }`;

  return (
    <>
      {/* Announcement bar */}
      <div className="relative z-50 bg-ink-950 border-b border-white/[0.06]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-center gap-3 text-center">
          {frontDeskBanner ? (
            <Link to="/solutions/front-desk" className={`group inline-flex items-center gap-2 text-xs sm:text-[13px] text-white/75 hover:text-white ${focusRing} rounded`}>
              <span className="w-1.5 h-1.5 rounded-full bg-hos-yellow shrink-0" aria-hidden="true" />
              <span>
                <span className="font-semibold text-white">Nostavia Front Desk:</span> an always-on voice agent that turns hospital phone enquiries into booked visits
              </span>
              <ArrowRight aria-hidden="true" className="w-3.5 h-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" />
            </Link>
          ) : (
            <a
              href="https://lnkd.in/p/dBqTFF95"
              target="_blank"
              rel="noopener noreferrer"
              className={`group inline-flex items-center gap-2 text-xs sm:text-[13px] text-white/75 hover:text-white ${focusRing} rounded`}
            >
              <span className="hidden sm:inline-flex items-center rounded-full border border-hos-yellow/40 bg-hos-yellow/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-hos-yellow">
                News
              </span>
              <span>
                <span className="font-semibold text-white">Nostavia Health raises ₹50 Lakh in funding.</span> Read the full story
              </span>
              <ArrowUpRight aria-hidden="true" className="w-3.5 h-3.5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>

      {/* Sticky header */}
      <header
        className={`sticky top-0 z-50 transition-colors duration-300 ${
          scrolled || activeMenu || mobileMenuOpen ? 'bg-ink-950/85 backdrop-blur-xl border-b border-white/[0.08]' : 'bg-ink-950/0 border-b border-transparent'
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6">
          <Link to="/" onClick={closeMenus} className={`flex items-center shrink-0 rounded ${focusRing}`}>
            {/* The wordmark file is dark; render it white for the dark theme */}
            <img src="/logo.png" alt="Nostavia Health" width={140} height={36} className="h-7 sm:h-8 w-auto object-contain brightness-0 invert" />
          </Link>

          <nav aria-label="Main" className="hidden lg:flex items-center gap-1">
            <div onMouseEnter={() => open('products')} onMouseLeave={scheduleClose}>
              <button
                type="button"
                onClick={() => setActiveMenu(activeMenu === 'products' ? null : 'products')}
                onKeyDown={(e) => e.key === 'Escape' && setActiveMenu(null)}
                aria-expanded={activeMenu === 'products'}
                aria-controls="products-menu"
                className={navBtn(activeMenu === 'products' || productsActive)}
              >
                Products
                <ChevronDown aria-hidden="true" className={`w-3.5 h-3.5 transition-transform ${activeMenu === 'products' ? 'rotate-180' : ''}`} />
              </button>
            </div>
            <div onMouseEnter={() => open('humanos')} onMouseLeave={scheduleClose}>
              <button
                type="button"
                onClick={() => setActiveMenu(activeMenu === 'humanos' ? null : 'humanos')}
                onKeyDown={(e) => e.key === 'Escape' && setActiveMenu(null)}
                aria-expanded={activeMenu === 'humanos'}
                aria-controls="human-os-menu"
                className={navBtn(activeMenu === 'humanos' || location.pathname.startsWith(HUMAN_OS_PATH))}
              >
                Human OS
                <ChevronDown aria-hidden="true" className={`w-3.5 h-3.5 transition-transform ${activeMenu === 'humanos' ? 'rotate-180' : ''}`} />
              </button>
            </div>
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={closeMenus} className={navBtn(isActive(l.to))}>
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/demo"
              onClick={closeMenus}
              className={`hidden sm:inline-flex items-center gap-1.5 bg-white hover:bg-hos-yellow text-ink-950 text-[13px] font-semibold px-4 py-2 rounded-full transition-colors ${focusRing}`}
            >
              Request a demo
              <ArrowRight aria-hidden="true" className="w-3.5 h-3.5" />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-full text-white/80 hover:text-white hover:bg-white/[0.06] ${focusRing}`}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Products mega menu */}
        {activeMenu === 'products' && (
          <div
            id="products-menu"
            className="hidden lg:block absolute top-full inset-x-0 border-b border-white/[0.08] bg-ink-950/95 backdrop-blur-xl"
            onMouseEnter={() => open('products')}
            onMouseLeave={scheduleClose}
            onKeyDown={(e) => e.key === 'Escape' && setActiveMenu(null)}
          >
            <div className="max-w-[1280px] mx-auto px-6 py-8 grid grid-cols-12 gap-8">
              <div className="col-span-5">
                <div className="text-[11px] font-semibold uppercase tracking-widest text-white/50 mb-3">Who it's for</div>
                <ul className="grid grid-cols-1 gap-1">
                  {industries.map(({ to, label, line, icon: Icon }) => (
                    <li key={to}>
                      <Link to={to} onClick={closeMenus} className={`group flex items-center gap-3 rounded-xl p-3 hover:bg-white/[0.05] transition-colors ${focusRing}`}>
                        <span className="w-9 h-9 rounded-lg dk-card flex items-center justify-center text-hos-yellow">
                          <Icon aria-hidden="true" className="w-4 h-4" />
                        </span>
                        <span>
                          <span className="block text-sm font-semibold text-white">{label}</span>
                          <span className="block text-xs text-white/50">{line}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-span-7">
                <div className="text-[11px] font-semibold uppercase tracking-widest text-white/50 mb-3">Products</div>
                <ul className="grid grid-cols-2 gap-1">
                  {products.map(({ to, label, line, icon: Icon }) => (
                    <li key={to}>
                      <Link to={to} onClick={closeMenus} className={`group flex items-center gap-3 rounded-xl p-3 hover:bg-white/[0.05] transition-colors ${focusRing}`}>
                        <span className="w-9 h-9 rounded-lg dk-card flex items-center justify-center text-white/80 group-hover:text-hos-yellow transition-colors">
                          <Icon aria-hidden="true" className="w-4 h-4" />
                        </span>
                        <span>
                          <span className="block text-sm font-semibold text-white">{label}</span>
                          <span className="block text-xs text-white/50">{line}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex items-center gap-4 border-t border-white/[0.08] pt-4 text-xs">
                  <Link to="/platform" onClick={closeMenus} className={`inline-flex items-center gap-1.5 text-white/60 hover:text-white rounded ${focusRing}`}>
                    Technology <ArrowRight aria-hidden="true" className="w-3 h-3" />
                  </Link>
                  <Link to="/pricing" onClick={closeMenus} className={`inline-flex items-center gap-1.5 text-white/60 hover:text-white rounded ${focusRing}`}>
                    Pricing <ArrowRight aria-hidden="true" className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Human OS menu: seven systems grouped by ring */}
        {activeMenu === 'humanos' && (
          <div
            id="human-os-menu"
            className="hidden lg:block absolute top-full inset-x-0 border-b border-white/[0.08] bg-ink-950/95 backdrop-blur-xl"
            onMouseEnter={() => open('humanos')}
            onMouseLeave={scheduleClose}
            onKeyDown={(e) => e.key === 'Escape' && setActiveMenu(null)}
          >
            <div className="max-w-[1280px] mx-auto px-6 py-8 grid grid-cols-12 gap-8">
              <div className="col-span-3 space-y-3 border-r border-white/[0.08] pr-8">
                <div className="text-[11px] font-semibold uppercase tracking-widest text-hos-yellow">Human OS</div>
                <p className="text-lg font-semibold text-white leading-snug">{numberWord(totalSystems)} systems, one integration.</p>
                <Link to={HUMAN_OS_PATH} onClick={closeMenus} className={`inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white rounded ${focusRing}`}>
                  Human OS overview <ArrowRight aria-hidden="true" className="w-3.5 h-3.5" />
                </Link>
              </div>
              {rings.map((ring) => (
                <div key={ring.id} className={ring.id === 'person' ? 'col-span-5' : 'col-span-4'}>
                  <div className="text-[11px] font-semibold uppercase tracking-widest text-white/50 mb-3">
                    {ring.name} · {ring.audience}
                  </div>
                  <ul className={`grid gap-1 ${ring.id === 'person' ? 'grid-cols-2' : 'grid-cols-1'}`}>
                    {systemsInRing(ring.id).map((system) => (
                      <li key={system.slug}>
                        <Link to={systemPath(system.slug)} onClick={closeMenus} className={`block rounded-xl p-3 hover:bg-white/[0.05] transition-colors ${focusRing}`}>
                          <span className="flex items-center gap-2 text-sm font-semibold text-white">
                            <span className="font-mono text-[10px] text-hos-yellow">{system.number}</span>
                            {system.name}
                          </span>
                          <span className="block text-xs text-white/50 mt-0.5">{system.promise}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mobile drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/[0.08] bg-ink-950 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="px-4 py-6 space-y-7">
              <Link to="/demo" onClick={closeMenus} className={`flex items-center justify-center gap-2 w-full bg-white text-ink-950 text-sm font-semibold py-3 rounded-full ${focusRing}`}>
                Request a demo <ArrowRight aria-hidden="true" className="w-4 h-4" />
              </Link>

              {[
                { title: "Who it's for", items: industries },
                { title: 'Products', items: products },
              ].map((group) => (
                <div key={group.title}>
                  <div className="text-[11px] font-semibold uppercase tracking-widest text-white/50 mb-2 px-1">{group.title}</div>
                  <ul className="space-y-1">
                    {group.items.map(({ to, label, line, icon: Icon }) => (
                      <li key={to}>
                        <Link to={to} onClick={closeMenus} className={`flex items-center gap-3 rounded-xl p-3 hover:bg-white/[0.05] ${focusRing}`}>
                          <Icon aria-hidden="true" className="w-4 h-4 text-hos-yellow shrink-0" />
                          <span>
                            <span className="block text-sm font-semibold text-white">{label}</span>
                            <span className="block text-xs text-white/50">{line}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div>
                <div className="text-[11px] font-semibold uppercase tracking-widest text-white/50 mb-2 px-1">Human OS</div>
                <Link to={HUMAN_OS_PATH} onClick={closeMenus} className={`block rounded-xl p-3 dk-card mb-2 ${focusRing}`}>
                  <span className="block text-sm font-semibold text-white">Human OS overview</span>
                  <span className="block text-xs text-white/50">{numberWord(totalSystems)} systems, one integration</span>
                </Link>
                {rings.map((ring) => (
                  <div key={ring.id} className="mt-2">
                    <div className="text-[10px] font-semibold uppercase tracking-widest text-white/50 px-3 mb-1">{ring.name}</div>
                    {systemsInRing(ring.id).map((system) => (
                      <Link key={system.slug} to={systemPath(system.slug)} onClick={closeMenus} className={`flex items-center gap-2 rounded-lg py-2 px-3 text-sm text-white/80 hover:bg-white/[0.05] ${focusRing}`}>
                        <span className="font-mono text-[10px] text-hos-yellow">{system.number}</span>
                        {system.name}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2 border-t border-white/[0.08] pt-5">
                {[...links, { to: '/platform', label: 'Technology' }].map((l) => (
                  <Link key={l.to} to={l.to} onClick={closeMenus} className={`rounded-lg py-2 px-3 text-sm text-white/80 hover:bg-white/[0.05] ${focusRing}`}>
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
