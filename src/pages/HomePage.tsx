import React from 'react';
import { useSeo } from '../lib/useSeo';
import { FLAGS, ONE_LINER } from '../content/site';
import { Hero } from '../components/home/Hero';
import { LogoStrip } from '../components/home/LogoStrip';
import { TrustBar } from '../components/home/TrustBar';
import { OfferSection } from '../components/home/OfferSection';
import { ProblemSection } from '../components/home/ProblemSection';
import { HumanOsSection } from '../components/home/HumanOsSection';
import { StudioSection } from '../components/home/StudioSection';
import { HiveSection } from '../components/home/HiveSection';
import { PrinciplesSection } from '../components/home/PrinciplesSection';
import { TrustSection } from '../components/home/TrustSection';
import { GlobalSection } from '../components/home/GlobalSection';
import { CustomersSection } from '../components/home/CustomersSection';
import { FinalCta } from '../components/home/FinalCta';

export const HomePage: React.FC = () => {
  useSeo({ title: 'Nostavia: healthcare’s superintelligence, ready-made or built for you', description: ONE_LINER, path: '/' });
  return (
    <>
      <Hero />
      <LogoStrip />
      <TrustBar />
      <OfferSection />
      <ProblemSection />
      <HumanOsSection />
      <StudioSection />
      {FLAGS.SHOW_HIVE && <HiveSection />}
      <PrinciplesSection />
      <TrustSection />
      <GlobalSection />
      <CustomersSection />
      <FinalCta />
    </>
  );
};
