import React from 'react';
import { useSeo } from '../lib/useSeo';
import { ONE_LINER } from '../content/site';
import { Hero } from '../components/home/Hero';
import { ConsoleShowcase } from '../components/home/ConsoleShowcase';
import { ProblemSection } from '../components/home/ProblemSection';
import { Structure } from '../components/home/Structure';
import { PrinciplesSection } from '../components/home/PrinciplesSection';
import { BeesSection } from '../components/home/BeesSection';
import { CustomersSection } from '../components/home/CustomersSection';
import { FinalCta } from '../components/home/FinalCta';

export const HomePage: React.FC = () => {
  useSeo({ title: 'Nostavia: healthcare’s superintelligence', description: ONE_LINER, path: '/' });
  return (
    <>
      <Hero />
      <ConsoleShowcase />
      <ProblemSection />
      <Structure />
      <PrinciplesSection />
      <BeesSection />
      <CustomersSection />
      <FinalCta />
    </>
  );
};
