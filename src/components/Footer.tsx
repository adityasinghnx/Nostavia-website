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
            
            <div className="flex flex-wrap gap-2 mt-2">
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
          </div>

          <div className="flex flex-col gap-3">
            <div className="font-display font-bold text-xs text-[#0F172A] uppercase tracking-wider">PLATFORM</div>
            <Link to="/platform#intelligence-sdk" className="hover:text-[#2563EB] transition-colors">Intelligence SDK</Link>
            <Link to="/platform#wearables-sdk" className="hover:text-[#2563EB] transition-colors">Wearables SDK</Link>
            <Link to="/platform#white-label-app" className="hover:text-[#2563EB] transition-colors">White-Label App</Link>
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
