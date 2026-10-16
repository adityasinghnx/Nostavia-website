import React from 'react';

import { LogoTrustBar } from '../components/LogoTrustBar';
import { Hero } from '../components/home2/Hero';
import { CapabilityBento } from '../components/home2/CapabilityBento';
import { HumanOsExplorer } from '../components/home2/HumanOsExplorer';
import { Industries } from '../components/home2/Industries';
import { ShipItYourWay } from '../components/home2/ShipItYourWay';
import { Developers } from '../components/home2/Developers';
import { Customers } from '../components/home2/Customers';
import { EnterpriseReady } from '../components/home2/EnterpriseReady';
import { FinalCta } from '../components/home2/FinalCta';

/* Dark redesign: new structure and copy. The light homepage is kept on the light-theme-v1 branch. */
export const HomePage: React.FC<{ onOpenDemo?: () => void }> = () => (
  <div className="flex flex-col text-white overflow-x-clip bg-ink-950">
    <Hero />
    <LogoTrustBar />
    <CapabilityBento />
    <HumanOsExplorer />
    <Industries />
    <ShipItYourWay />
    <Developers />
    <Customers />
    <EnterpriseReady />
    <FinalCta />
  </div>
);
