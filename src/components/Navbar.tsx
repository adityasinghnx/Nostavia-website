import React, { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Activity, Stethoscope, Smartphone, Layers, Cpu, ShieldCheck, FileText, RefreshCw, Code, Heart, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenDemo?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDemo }) => {
  const [activeMenu, setActiveMenu] = useState<'solutions' | 'customers' | 'stories' | 'resources' | 'company' | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const closeMenus = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setActiveMenu(null);
    setMobileMenuOpen(false);
  };

  const handleMouseEnter = (menu: 'solutions' | 'customers') => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 200);
  };

  return (
    <>
      {/* ========================================================================= */}
      {/* TOP HERO ANNOUNCEMENT BANNER */}
      {/* ========================================================================= */}
      <div className="w-full bg-white font-body">
        <div className="relative overflow-hidden bg-[linear-gradient(90deg,#FFF7ED_0%,#FFEDD5_35%,#FED7AA_70%,#FDE68A_100%)] pt-16 pb-24 px-4 sm:px-6 text-center select-none">
          
          {/* Soft Ambient Glow Overlay */}
          <div className="absolute -top-36 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-amber-200/40 blur-3xl pointer-events-none rounded-full" />

          <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-3">
            <h2 className="font-display font-bold text-2xl sm:text-4xl lg:text-5xl text-[#0F172A] tracking-tight leading-[1.15]">
              Custom Health AI Infrastructure. <br className="hidden sm:inline" />
              Built directly by our founding engineers.
            </h2>

            <p className="text-xs sm:text-base text-[#475569] font-semibold max-w-2xl px-2">
              Solutions Engineering — bespoke health intelligence modules, EHR integrations, and custom clinical deployments for enterprise health systems.
            </p>

            <div className="pt-3">
              <Link
                to="/solutions/supplements"
                className="inline-block bg-[#0F172A] hover:bg-black text-white font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-widest px-5 sm:px-6 py-2.5 rounded-[2px] transition-all shadow-md"
              >
                EXPLORE SOLUTIONS ENGINEERING
              </Link>
            </div>
          </div>

          {/* SMOOTH SINE WAVE / ECG PEAK SVG BOTTOM EDGE */}
          <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none">
            <svg
              className="relative block w-full h-10 sm:h-16 text-white"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              fill="currentColor"
            >
              <path d="M0,40 C150,90 350,10 500,60 C650,110 850,20 1000,70 C1100,95 1150,50 1200,30 L1200,120 L0,120 Z" />
            </svg>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* STICKY MAIN NAVIGATION HEADER */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-50 bg-white border-b border-[#E5E7EB] font-body shadow-sm">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          
          {/* Official Brand Logo Image */}
          <Link to="/" onClick={closeMenus} className="flex items-center group shrink-0">
            <img
              src="/logo.png"
              alt="Nostavia Health"
              className="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </Link>

          {/* Nav Items */}
          <div className="hidden lg:flex items-center gap-1 font-display text-xs font-bold uppercase tracking-wider text-[#334155]">
            <div
              className="relative py-3"
              onMouseEnter={() => handleMouseEnter('solutions')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => setActiveMenu(activeMenu === 'solutions' ? null : 'solutions')}
                className={`px-3.5 py-2 rounded-[4px] flex items-center gap-1 transition-colors ${
                  activeMenu === 'solutions' || location.pathname.startsWith('/solutions') || location.pathname === '/platform'
                    ? 'text-[#0F172A] bg-[#E5E7EB] font-extrabold'
                    : 'hover:text-[#0F172A] hover:bg-[#F8FAFC]'
                }`}
              >
                PLATFORM & SERVICES
              </button>
            </div>

            <Link
              to="/clinical"
              onClick={closeMenus}
              className={`px-3.5 py-2 rounded-[4px] transition-colors ${
                location.pathname === '/clinical' ? 'text-[#0F172A] bg-[#E5E7EB] font-extrabold' : 'hover:text-[#0F172A] hover:bg-[#F8FAFC]'
              }`}
            >
              CLINICAL EVIDENCE
            </Link>

            <Link
              to="/security"
              onClick={closeMenus}
              className={`px-3.5 py-2 rounded-[4px] transition-colors ${
                location.pathname === '/security' ? 'text-[#0F172A] bg-[#E5E7EB] font-extrabold' : 'hover:text-[#0F172A] hover:bg-[#F8FAFC]'
              }`}
            >
              SECURITY & PRIVACY
            </Link>

            <Link
              to="/company"
              onClick={closeMenus}
              className={`px-3.5 py-2 rounded-[4px] transition-colors ${
                location.pathname === '/company' ? 'text-[#0F172A] bg-[#E5E7EB] font-extrabold' : 'hover:text-[#0F172A] hover:bg-[#F8FAFC]'
              }`}
            >
              COMPANY
            </Link>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            <Link
              to="/security"
              className="hidden sm:inline-flex items-center justify-center bg-[#B45309] hover:bg-[#92400E] text-white text-[11px] font-mono font-bold uppercase px-5 py-2.5 rounded-[2px] shadow-sm transition-all"
            >
              CONTEXT 2026
            </Link>

            <Link
              to="/demo"
              onClick={closeMenus}
              className="bg-[#000000] hover:bg-[#1A1A1A] text-white font-display text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-[4px] transition-all shadow-sm"
            >
              REQUEST A DEMO
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#334155] hover:text-[#0F172A] bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* EXACT REPLICATION: NOSTAVIA HEALTH INFRASTRUCTURE MEGAMENU DROPDOWN */}
        {/* ========================================================================= */}
        {(activeMenu === 'solutions' || activeMenu === 'customers') && (
          <div
            className="hidden lg:block absolute top-full left-0 w-full bg-white border-b border-[#E5E7EB] shadow-2xl transition-all duration-200 z-50 before:content-[''] before:absolute before:-top-4 before:h-4 before:w-full before:left-0"
            onMouseEnter={() => handleMouseEnter(activeMenu || 'solutions')}
            onMouseLeave={handleMouseLeave}
          >
            <div className="max-w-[1280px] mx-auto p-8 space-y-8 font-body">
              
              {/* TOP SECTION: TARGET BUYERS & INDUSTRIES (4 Main Pillars) */}
              <div>
                <div className="eyebrow text-[#94A3B8] mb-3 text-[10px] uppercase tracking-widest font-mono font-bold">TARGET BUYERS & SECTORS</div>
                <div className="grid grid-cols-4 gap-4">
                  
                  <Link
                    to="/industries/diagnostic-labs"
                    onClick={closeMenus}
                    className="p-3.5 bg-[#F1F5F9] rounded-[6px] hover:bg-[#E2E8F0] transition-all flex items-center justify-between group border border-transparent"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-[4px] bg-[#2563EB] text-white flex items-center justify-center font-bold shadow-sm">
                        <Activity className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="font-display font-bold text-sm text-[#0F172A]">Diagnostic Labs</div>
                        <div className="text-[11px] text-[#64748B]">Smart Reports & Re-Test Recall</div>
                      </div>
                    </div>
                    <span className="text-[#0F172A] text-xs font-bold">▶</span>
                  </Link>

                  <Link
                    to="/industries/clinics"
                    onClick={closeMenus}
                    className="p-3.5 bg-[#F1F5F9] rounded-[6px] hover:bg-[#E2E8F0] transition-all flex items-center justify-between group border border-transparent"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-[4px] bg-[#4ADE80] text-white flex items-center justify-center font-bold shadow-sm">
                        <Stethoscope className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="font-display font-bold text-sm text-[#0F172A]">Clinics & Longevity</div>
                        <div className="text-[11px] text-[#64748B]">Dubai Law 17/2026 Protocols</div>
                      </div>
                    </div>
                    <span className="text-[#0F172A] text-xs font-bold">▶</span>
                  </Link>

                  <Link
                    to="/industries/supplements"
                    onClick={closeMenus}
                    className="p-3.5 bg-[#F1F5F9] rounded-[6px] hover:bg-[#E2E8F0] transition-all flex items-center justify-between group border border-transparent"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-[4px] bg-[#EC4899] text-white flex items-center justify-center font-bold shadow-sm">
                        <Smartphone className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="font-display font-bold text-sm text-[#0F172A]">Wellness & Apps</div>
                        <div className="text-[11px] text-[#64748B]">Wearables & Food Scanning</div>
                      </div>
                    </div>
                    <span className="text-[#0F172A] text-xs font-bold">▶</span>
                  </Link>

                  <Link
                    to="/industries/payer"
                    onClick={closeMenus}
                    className="p-3.5 bg-[#F1F5F9] rounded-[6px] hover:bg-[#E2E8F0] transition-all flex items-center justify-between group border border-transparent"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-[4px] bg-[#F97316] text-white flex items-center justify-center font-bold shadow-sm">
                        <ShieldCheck className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="font-display font-bold text-sm text-[#0F172A]">Insurers & Payers</div>
                        <div className="text-[11px] text-[#64748B]">Risk Scoring & MLR Lowering</div>
                      </div>
                    </div>
                    <span className="text-[#0F172A] text-xs font-bold">▶</span>
                  </Link>

                </div>
              </div>

              {/* SECOND SECTION: NOSTAVIA PLATFORM & INTEGRATION MODES */}
              <div className="pt-2 border-t border-[#E5E7EB]">
                <div className="eyebrow text-[#94A3B8] mb-3 text-[10px] uppercase tracking-widest font-mono font-bold">EMBEDDABLE PLATFORM & SDKs</div>
                <div className="grid grid-cols-4 gap-4">
                  <Link to="/solutions/gravity" onClick={closeMenus} className="p-3.5 border border-[#E5E7EB] rounded-[8px] bg-white hover:border-[#2563EB] flex items-center gap-3 transition-all shadow-sm group">
                    <div className="w-8 h-8 rounded-full bg-blue-500/10 text-[#2563EB] flex items-center justify-center font-bold">
                      <Code className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-display font-bold text-xs text-[#0F172A] group-hover:text-[#2563EB]">Intelligence SDK</div>
                      <div className="text-[10px] text-[#64748B]">Lab parsing, food scans & AI concierge</div>
                    </div>
                  </Link>

                  <Link to="/solutions/galaxy" onClick={closeMenus} className="p-3.5 border border-[#E5E7EB] rounded-[8px] bg-white hover:border-[#2563EB] flex items-center gap-3 transition-all shadow-sm group">
                    <div className="w-8 h-8 rounded-full bg-purple-500/10 text-purple-600 flex items-center justify-center font-bold">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-display font-bold text-xs text-[#0F172A] group-hover:text-[#2563EB]">Wearables SDK</div>
                      <div className="text-[10px] text-[#64748B]">Single API for Apple, Oura, WHOOP</div>
                    </div>
                  </Link>

                  <Link to="/solutions/storyhealth" onClick={closeMenus} className="p-3.5 border border-[#E5E7EB] rounded-[8px] bg-white hover:border-[#2563EB] flex items-center gap-3 transition-all shadow-sm group">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                      <Smartphone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-display font-bold text-xs text-[#0F172A] group-hover:text-[#2563EB]">White-Label App</div>
                      <div className="text-[10px] text-[#64748B]">Complete iOS & Android app under your brand</div>
                    </div>
                  </Link>

                  <Link to="/solutions/pqs" onClick={closeMenus} className="p-3.5 border border-[#E5E7EB] rounded-[8px] bg-white hover:border-[#2563EB] flex items-center gap-3 transition-all shadow-sm group">
                    <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-display font-bold text-xs text-[#0F172A] group-hover:text-[#2563EB]">SOMA Dual-Brain</div>
                      <div className="text-[10px] text-[#64748B]">On-device SOMA-1B + 70B Cloud Model</div>
                    </div>
                  </Link>
                </div>
              </div>

              {/* THIRD SECTION: SPECIALISED SERVICES */}
              <div className="space-y-3 pt-2 border-t border-[#E5E7EB]">
                <div className="eyebrow text-[#94A3B8] mb-3 text-[10px] uppercase tracking-widest font-mono font-bold">SPECIALISED SERVICES</div>
                <div className="grid grid-cols-4 gap-y-3 gap-x-8 text-xs font-display font-medium text-[#334155]">
                  
                  <Link to="/solutions/comet" onClick={closeMenus} className="flex items-center justify-between hover:text-[#2563EB] py-1.5 border-b border-slate-100">
                    <span className="flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-[#2563EB]" />
                      Smart Report as a Service
                    </span>
                    <span className="text-[10px] text-[#0F172A]">▶</span>
                  </Link>

                  <Link to="/solutions/comet" onClick={closeMenus} className="flex items-center justify-between hover:text-[#2563EB] py-1.5 border-b border-slate-100">
                    <span className="flex items-center gap-2">
                      <Stethoscope className="w-3.5 h-3.5 text-[#059669]" />
                      Clinical Intake Briefs
                    </span>
                    <span className="text-[10px] text-[#0F172A]">▶</span>
                  </Link>

                  <Link to="/solutions/cured" onClick={closeMenus} className="flex items-center justify-between hover:text-[#2563EB] py-1.5 border-b border-slate-100">
                    <span className="flex items-center gap-2">
                      <RefreshCw className="w-3.5 h-3.5 text-[#D97706]" />
                      Re-Test Recall Campaigns
                    </span>
                    <span className="text-[10px] text-[#0F172A]">▶</span>
                  </Link>

                  <Link to="/solutions/gravity" onClick={closeMenus} className="flex items-center justify-between hover:text-[#2563EB] py-1.5 border-b border-slate-100">
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#9333EA]" />
                      Solutions Engineering
                    </span>
                    <span className="text-[10px] text-[#0F172A]">▶</span>
                  </Link>

                </div>
              </div>

            </div>
          </div>
        )}
        {/* ========================================================================= */}
        {/* RESPONSIVE MOBILE NAVIGATION DRAWER */}
        {/* ========================================================================= */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-[#E5E7EB] shadow-2xl max-h-[calc(100vh-4rem)] overflow-y-auto font-body">
            <div className="px-4 py-6 space-y-6">
              
              {/* Quick Action Buttons */}
              <div className="flex flex-col gap-2.5 pb-4 border-b border-[#E2E8F0]">
                <Link
                  to="/demo"
                  onClick={closeMenus}
                  className="w-full text-center bg-[#000000] hover:bg-[#1A1A1A] text-white font-display text-xs font-bold uppercase tracking-wider py-3 rounded-[4px] shadow-sm"
                >
                  REQUEST A DEMO
                </Link>
                <Link
                  to="/security"
                  onClick={closeMenus}
                  className="w-full text-center bg-[#B45309] hover:bg-[#92400E] text-white text-xs font-mono font-bold uppercase py-2.5 rounded-[2px] shadow-sm"
                >
                  CONTEXT 2026
                </Link>
              </div>

              {/* Main Nav Links */}
              <div className="space-y-4">
                <div>
                  <div className="eyebrow text-[#94A3B8] mb-2 text-[10px] uppercase tracking-widest font-mono font-bold">PLATFORM & SERVICES</div>
                  <div className="grid grid-cols-1 gap-2">
                    <Link to="/solutions/gravity" onClick={closeMenus} className="p-3 bg-[#F8FAFC] rounded-[6px] flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Code className="w-4 h-4 text-[#2563EB]" />
                        <div>
                          <div className="font-display font-bold text-xs text-[#0F172A]">Intelligence SDK</div>
                          <div className="text-[10px] text-[#64748B]">Lab parsing & AI concierge</div>
                        </div>
                      </div>
                      <span className="text-xs text-[#64748B]">▶</span>
                    </Link>
                    <Link to="/solutions/galaxy" onClick={closeMenus} className="p-3 bg-[#F8FAFC] rounded-[6px] flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Layers className="w-4 h-4 text-purple-600" />
                        <div>
                          <div className="font-display font-bold text-xs text-[#0F172A]">Wearables SDK</div>
                          <div className="text-[10px] text-[#64748B]">Unified API for Apple & Oura</div>
                        </div>
                      </div>
                      <span className="text-xs text-[#64748B]">▶</span>
                    </Link>
                    <Link to="/solutions/storyhealth" onClick={closeMenus} className="p-3 bg-[#F8FAFC] rounded-[6px] flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Smartphone className="w-4 h-4 text-emerald-600" />
                        <div>
                          <div className="font-display font-bold text-xs text-[#0F172A]">White-Label App</div>
                          <div className="text-[10px] text-[#64748B]">Branded mobile app for health systems</div>
                        </div>
                      </div>
                      <span className="text-xs text-[#64748B]">▶</span>
                    </Link>
                    <Link to="/solutions/pqs" onClick={closeMenus} className="p-3 bg-[#F8FAFC] rounded-[6px] flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Cpu className="w-4 h-4 text-amber-600" />
                        <div>
                          <div className="font-display font-bold text-xs text-[#0F172A]">SOMA Dual-Brain</div>
                          <div className="text-[10px] text-[#64748B]">On-device & Cloud models</div>
                        </div>
                      </div>
                      <span className="text-xs text-[#64748B]">▶</span>
                    </Link>
                  </div>
                </div>

                <div>
                  <div className="eyebrow text-[#94A3B8] mb-2 text-[10px] uppercase tracking-widest font-mono font-bold">COMPANY & RESOURCES</div>
                  <div className="flex flex-col gap-1 text-sm font-display font-semibold text-[#334155]">
                    <Link to="/clinical" onClick={closeMenus} className="py-2 px-3 hover:bg-[#F8FAFC] rounded-[4px]">
                      Clinical Evidence
                    </Link>
                    <Link to="/security" onClick={closeMenus} className="py-2 px-3 hover:bg-[#F8FAFC] rounded-[4px]">
                      Security & Privacy
                    </Link>
                    <Link to="/company" onClick={closeMenus} className="py-2 px-3 hover:bg-[#F8FAFC] rounded-[4px]">
                      Company
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}
      </header>
    </>
  );
};
