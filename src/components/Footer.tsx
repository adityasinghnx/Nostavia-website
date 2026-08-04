import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#F8FAFC] border-t border-[#E5E7EB] pt-16 pb-12 font-body text-xs text-[#475569]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-[#E2E8F0]">
          
          <div className="md:col-span-2 flex flex-col gap-4">
            <Link to="/" className="flex items-center">
              <img
                src="/logo.png"
                alt="Nostavia Health"
                className="h-8 w-auto object-contain"
              />
            </Link>
            <p className="text-xs text-[#64748B] max-w-sm leading-relaxed">
              Nostavia is the intelligence layer health companies embed inside their own products. Continuous biomarker interpretation, SOMA dual-brain architecture, and adaptive clinical protocols.
            </p>
            <div className="flex flex-col gap-1 text-[11px] font-mono text-[#94A3B8]">
              <span>Nostavia Technologies Pvt. Ltd.</span>
              <span>Headquartered in Lucknow, India · Serving India & UAE</span>
            </div>
            
            {/* Compliance Badges */}
            <div className="flex flex-wrap gap-2 mt-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded border border-[#E2E8F0] bg-white font-mono text-[10px] text-[#059669] shadow-sm">
                <Lock className="w-3 h-3 text-[#059669]" />
                SOMA Edge Privacy
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded border border-[#E2E8F0] bg-white font-mono text-[10px] text-[#2563EB] shadow-sm">
                <ShieldCheck className="w-3 h-3 text-[#2563EB]" />
                DPDP 2023 Aligned
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded border border-[#E2E8F0] bg-white font-mono text-[10px] text-[#334155] shadow-sm">
                <Globe className="w-3 h-3" />
                Dubai Law 17/2026 Ready
              </span>
            </div>

            {/* Mobile App Store & Google Play Badges */}
            <div className="pt-2 space-y-2">
              <div className="eyebrow text-[#94A3B8] text-[10px] uppercase tracking-widest font-mono font-bold">
                GET THE NOSTAVIA HEALTH APP
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="https://apps.apple.com/us/app/nostavia-health/id6760108353"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-[4px] bg-[#0F172A] hover:bg-black text-white transition-all shadow-sm group"
                >
                  <svg className="w-4 h-4 fill-current shrink-0 text-white" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.32c.67-.82 1.13-1.97.99-3.12-.98.04-2.18.66-2.87 1.46-.62.72-1.16 1.89-.99 3.01 1.1.09 2.22-.53 2.87-1.35z"/>
                  </svg>
                  <div className="flex flex-col text-left leading-none font-body">
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 font-mono font-medium">Download on the</span>
                    <span className="text-xs font-bold font-display text-white mt-0.5">App Store</span>
                  </div>
                </a>

                <a
                  href="https://play.google.com/store/apps/details?id=com.nostavia.nostavia_health&hl=en_IN"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-[4px] bg-[#0F172A] hover:bg-black text-white transition-all shadow-sm group"
                >
                  <svg className="w-4 h-4 fill-current shrink-0 text-white" viewBox="0 0 512 512">
                    <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
                  </svg>
                  <div className="flex flex-col text-left leading-none font-body">
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 font-mono font-medium">GET IT ON</span>
                    <span className="text-xs font-bold font-display text-white mt-0.5">Google Play</span>
                  </div>
                </a>
              </div>
            </div>

          </div>

          <div className="flex flex-col gap-3">
            <div className="font-display font-bold text-xs text-[#0F172A] uppercase tracking-wider">PLATFORM</div>
            <Link to="/platform#intelligence-sdk" className="hover:text-[#2563EB] transition-colors">Intelligence SDK</Link>
            <Link to="/platform#wearables-sdk" className="hover:text-[#2563EB] transition-colors">Wearables SDK</Link>
            <Link to="/platform#white-label-app" className="hover:text-[#2563EB] transition-colors">White-Label App</Link>
            <Link to="/solutions/front-desk" className="hover:text-[#2563EB] transition-colors">AI Agents (Voice & Chat)</Link>
            <Link to="/platform#services" className="hover:text-[#2563EB] transition-colors">Specialised Services</Link>
          </div>

          <div className="flex flex-col gap-3">
            <div className="font-display font-bold text-xs text-[#0F172A] uppercase tracking-wider">INDUSTRIES</div>
            <Link to="/industries/diagnostic-labs" className="hover:text-[#2563EB] transition-colors">Diagnostic Labs</Link>
            <Link to="/industries/clinics" className="hover:text-[#2563EB] transition-colors">Clinics & Longevity</Link>
            <Link to="/industries/hospitals" className="hover:text-[#2563EB] transition-colors">Hospitals</Link>
            <Link to="/industries/supplements" className="hover:text-[#2563EB] transition-colors">Supplements</Link>
          </div>

          <div className="flex flex-col gap-3">
            <div className="font-display font-bold text-xs text-[#0F172A] uppercase tracking-wider">COMPANY</div>
            <Link to="/pricing" className="hover:text-[#2563EB] transition-colors">Pricing</Link>
            <Link to="/security" className="hover:text-[#2563EB] transition-colors">Security & Privacy</Link>
            <Link to="/clinical" className="hover:text-[#2563EB] transition-colors">Clinical Governance</Link>
            <Link to="/company" className="hover:text-[#2563EB] transition-colors">About & Founders</Link>
            <Link to="/demo" className="hover:text-[#2563EB] transition-colors">Book a Demo</Link>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-[#94A3B8]">
          <div>© 2026 Nostavia Technologies Pvt. Ltd. All rights reserved.</div>
          <div>Built for precision longevity & population health.</div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
