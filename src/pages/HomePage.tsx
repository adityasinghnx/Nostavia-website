import React from 'react';
import { useSeo } from '../lib/useSeo';
import { ONE_LINER } from '../content/site';
import { Hero } from '../components/home/Hero';
import { ConsoleShowcase } from '../components/home/ConsoleShowcase';
import { LogoStrip } from '../components/home/LogoStrip';
import { Structure } from '../components/home/Structure';
import { HumanOsSection } from '../components/home/HumanOsSection';
import { StudioSection } from '../components/home/StudioSection';
import { CustomersSection } from '../components/home/CustomersSection';
import { DevelopersSection } from '../components/home/DevelopersSection';
import { TrustSection } from '../components/home/TrustSection';
import { FinalCta } from '../components/home/FinalCta';

export const HomePage: React.FC = () => {
  useSeo({ title: 'Nostavia: one place where AI Bees run your health business', description: ONE_LINER, path: '/' });
  return (
    <>
      <Hero />
      <ConsoleShowcase />
      <LogoStrip />
      <Structure />
      <HumanOsSection />
      <StudioSection />
      <CustomersSection />
      <DevelopersSection />
      <TrustSection />
      <FinalCta />
    </>
  );
};
