import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { DemoModal } from './components/DemoModal';
import { HomePage } from './pages/HomePage';
import { PlatformPage } from './pages/PlatformPage';

// Industries
import { ProviderPage } from './pages/industries/ProviderPage';
import { PayerPage } from './pages/industries/PayerPage';
import { PublicSectorPage } from './pages/industries/PublicSectorPage';
import { LifeSciencesPage } from './pages/industries/LifeSciencesPage';
import { DiagnosticLabsPage } from './pages/industries/DiagnosticLabsPage';
import { ClinicsPage } from './pages/industries/ClinicsPage';
import { HospitalsPage } from './pages/industries/HospitalsPage';
import { SupplementsPage } from './pages/industries/SupplementsPage';

// Solutions
import { GravityPage } from './pages/solutions/GravityPage';
import { FlowPage } from './pages/solutions/FlowPage';
import { AtlasPage } from './pages/solutions/AtlasPage';
import { GalaxyPage } from './pages/solutions/GalaxyPage';
import { CuredPage } from './pages/solutions/CuredPage';
import { CometPage } from './pages/solutions/CometPage';
import { PQSPage } from './pages/solutions/PQSPage';
import { StoryHealthPage } from './pages/solutions/StoryHealthPage';
import { HospitalsPlatformPage } from './pages/solutions/HospitalsPlatformPage';
import { HumbiPage } from './pages/solutions/HumbiPage';
import { SupplementsPage as SolutionsEngineeringPage } from './pages/solutions/SupplementsPage';
import { FrontDeskPage } from './pages/solutions/FrontDeskPage';

// Core Pages
import { PricingPage } from './pages/PricingPage';
import { SecurityPage } from './pages/SecurityPage';
import { ClinicalPage } from './pages/ClinicalPage';
import { CompanyPage } from './pages/CompanyPage';
import { DemoPage } from './pages/DemoPage';

export const App: React.FC = () => {
  const [demoModalOpen, setDemoModalOpen] = React.useState(false);
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white text-[#0F172A] flex flex-col justify-between selection:bg-[#2563EB] selection:text-white">
      <div>
        <Navbar onOpenDemo={() => setDemoModalOpen(true)} />
        <main className="w-full">
          <Routes>
            <Route path="/" element={<HomePage onOpenDemo={() => setDemoModalOpen(true)} />} />
            <Route path="/platform" element={<PlatformPage />} />
            
            {/* Industries Routes */}
            <Route path="/industries/provider" element={<ProviderPage />} />
            <Route path="/industries/payer" element={<HospitalsPage />} />
            <Route path="/industries/payers" element={<HospitalsPage />} />
            <Route path="/industries/public-sector" element={<PublicSectorPage />} />
            <Route path="/industries/life-sciences" element={<LifeSciencesPage />} />
            <Route path="/industries/diagnostic-labs" element={<DiagnosticLabsPage />} />
            <Route path="/industries/clinics" element={<ClinicsPage />} />
            <Route path="/industries/hospitals" element={<HospitalsPage />} />
            <Route path="/industries/supplements" element={<SupplementsPage />} />

            {/* Solutions Routes */}
            <Route path="/solutions/gravity" element={<GravityPage />} />
            <Route path="/solutions/flow" element={<FlowPage />} />
            <Route path="/solutions/atlas" element={<AtlasPage />} />
            <Route path="/solutions/galaxy" element={<GalaxyPage />} />
            <Route path="/solutions/cured" element={<CuredPage />} />
            <Route path="/solutions/comet" element={<CometPage />} />
            <Route path="/solutions/pqs" element={<PQSPage />} />
            <Route path="/solutions/storyhealth" element={<StoryHealthPage />} />
            <Route path="/solutions/hospitals" element={<HospitalsPlatformPage />} />
            <Route path="/solutions/hospitals-front-door" element={<HospitalsPlatformPage />} />
            <Route path="/solutions/humbi" element={<HumbiPage />} />
            <Route path="/solutions/supplements" element={<SolutionsEngineeringPage />} />
            <Route path="/solutions/engineering" element={<SolutionsEngineeringPage />} />
            <Route path="/solutions/front-desk" element={<FrontDeskPage />} />
            <Route path="/solutions/ai-agents" element={<FrontDeskPage />} />
            <Route path="/solutions/voice-agents" element={<FrontDeskPage />} />

            {/* Core Pages */}
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/security" element={<SecurityPage />} />
            <Route path="/clinical" element={<ClinicalPage />} />
            <Route path="/company" element={<CompanyPage />} />
            <Route path="/demo" element={<DemoPage />} />
            
            {/* Fallback */}
            <Route path="*" element={<HomePage onOpenDemo={() => setDemoModalOpen(true)} />} />
          </Routes>
        </main>
      </div>

      <Footer />

      {/* Global accessible Demo Modal */}
      <DemoModal isOpen={demoModalOpen} onClose={() => setDemoModalOpen(false)} />
    </div>
  );
};

export default App;
