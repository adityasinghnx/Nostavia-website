import React from 'react';
import { Link } from 'react-router-dom';
import {
  FlaskConical,
  Stethoscope,
  Building2,
  Pill,
  Smartphone,
  ShieldCheck,
  Landmark,
  Microscope,
  Beaker
} from 'lucide-react';

export const IndustryGridSection: React.FC = () => {
  const industries = [
    {
      icon: FlaskConical,
      label: 'Diagnostic Labs',
      link: '/industries/diagnostic-labs'
    },
    {
      icon: Stethoscope,
      label: 'Longevity Clinics',
      link: '/industries/clinics'
    },
    {
      icon: Building2,
      label: 'Hospitals & Health Systems',
      link: '/industries/hospitals'
    },
    {
      icon: Pill,
      label: 'Supplement Brands',
      link: '/industries/supplements'
    },
    {
      icon: Smartphone,
      label: 'Wellness & Health Apps',
      link: '/industries/provider'
    },
    {
      icon: ShieldCheck,
      label: 'Insurance & Payers',
      link: '/industries/payer'
    },
    {
      icon: Landmark,
      label: 'Public Health & CSR',
      link: '/industries/public-sector'
    },
    {
      icon: Microscope,
      label: 'Life Sciences',
      link: '/industries/life-sciences'
    },
    {
      icon: Beaker,
      label: 'Pharma & Research',
      link: '/industries/life-sciences'
    }
  ];

  return (
    <section className="w-full font-body text-[#0F172A] py-12 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-10">
        <div className="space-y-4">
          <div className="font-mono text-xs font-bold uppercase tracking-widest text-[#64748B]">
            WHO IT'S FOR
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#0F172A] tracking-tight">
            Built for companies powering the health economy
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <Link
                key={index}
                to={industry.link}
                className="p-4 sm:p-5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] hover:border-[#CBD5E1] transition-all flex items-center gap-3 hover:-translate-y-0.5 hover:shadow-sm"
              >
                <div className="w-9 h-9 rounded-[2px] bg-[#0F172A] text-white flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="font-display font-bold text-sm text-[#0F172A]">
                  {industry.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
