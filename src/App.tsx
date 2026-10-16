import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { DemoModal } from './components/DemoModal';
import { HomePage } from './pages/HomePage';
const PlatformPage = lazy(() => import('./pages/PlatformPage').then((m) => ({ default: m.PlatformPage })));
const HumanOsPage = lazy(() => import('./pages/HumanOsPage').then((m) => ({ default: m.HumanOsPage })));
const HumanOsSystemPage = lazy(() => import('./pages/HumanOsSystemPage').then((m) => ({ default: m.HumanOsSystemPage })));

// Industries
const ProviderPage = lazy(() => import('./pages/industries/ProviderPage').then((m) => ({ default: m.ProviderPage })));
const PayerPage = lazy(() => import('./pages/industries/PayerPage').then((m) => ({ default: m.PayerPage })));
const PublicSectorPage = lazy(() => import('./pages/industries/PublicSectorPage').then((m) => ({ default: m.PublicSectorPage })));
const LifeSciencesPage = lazy(() => import('./pages/industries/LifeSciencesPage').then((m) => ({ default: m.LifeSciencesPage })));
const DiagnosticLabsPage = lazy(() => import('./pages/industries/DiagnosticLabsPage').then((m) => ({ default: m.DiagnosticLabsPage })));
const ClinicsPage = lazy(() => import('./pages/industries/ClinicsPage').then((m) => ({ default: m.ClinicsPage })));
const HospitalsPage = lazy(() => import('./pages/industries/HospitalsPage').then((m) => ({ default: m.HospitalsPage })));
const SupplementsPage = lazy(() => import('./pages/industries/SupplementsPage').then((m) => ({ default: m.SupplementsPage })));

// Solutions
const GravityPage = lazy(() => import('./pages/solutions/GravityPage').then((m) => ({ default: m.GravityPage })));
const FlowPage = lazy(() => import('./pages/solutions/FlowPage').then((m) => ({ default: m.FlowPage })));
const AtlasPage = lazy(() => import('./pages/solutions/AtlasPage').then((m) => ({ default: m.AtlasPage })));
const GalaxyPage = lazy(() => import('./pages/solutions/GalaxyPage').then((m) => ({ default: m.GalaxyPage })));
const CuredPage = lazy(() => import('./pages/solutions/CuredPage').then((m) => ({ default: m.CuredPage })));
const CometPage = lazy(() => import('./pages/solutions/CometPage').then((m) => ({ default: m.CometPage })));
const PQSPage = lazy(() => import('./pages/solutions/PQSPage').then((m) => ({ default: m.PQSPage })));
const StoryHealthPage = lazy(() => import('./pages/solutions/StoryHealthPage').then((m) => ({ default: m.StoryHealthPage })));
const HospitalsPlatformPage = lazy(() => import('./pages/solutions/HospitalsPlatformPage').then((m) => ({ default: m.HospitalsPlatformPage })));
const HumbiPage = lazy(() => import('./pages/solutions/HumbiPage').then((m) => ({ default: m.HumbiPage })));
const SolutionsEngineeringPage = lazy(() => import('./pages/solutions/SupplementsPage').then((m) => ({ default: m.SupplementsPage })));
const FrontDeskPage = lazy(() => import('./pages/solutions/FrontDeskPage').then((m) => ({ default: m.FrontDeskPage })));

// Core Pages
const PricingPage = lazy(() => import('./pages/PricingPage').then((m) => ({ default: m.PricingPage })));
const SecurityPage = lazy(() => import('./pages/SecurityPage').then((m) => ({ default: m.SecurityPage })));
const ClinicalPage = lazy(() => import('./pages/ClinicalPage').then((m) => ({ default: m.ClinicalPage })));
const CompanyPage = lazy(() => import('./pages/CompanyPage').then((m) => ({ default: m.CompanyPage })));
const DemoPage = lazy(() => import('./pages/DemoPage').then((m) => ({ default: m.DemoPage })));

export const App: React.FC = () => {
  const [demoModalOpen, setDemoModalOpen] = React.useState(false);
  const location = useLocation();

  // Scroll to top on route change, or to the anchor when the URL has a hash
  useEffect(() => {
    const target = location.hash ? document.getElementById(decodeURIComponent(location.hash.slice(1))) : null;
    if (target) target.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-ink-950 text-white flex flex-col justify-between">
      <div>
        <Navbar onOpenDemo={() => setDemoModalOpen(true)} />
        <main className="w-full">
          <Suspense fallback={<div className="min-h-[70vh]" aria-busy="true" />}>
          <Routes>
            <Route path="/" element={<HomePage onOpenDemo={() => setDemoModalOpen(true)} />} />
            <Route path="/platform" element={<PlatformPage />} />

            {/* Human OS */}
            <Route path="/human-os" element={<HumanOsPage />} />
            <Route path="/human-os/:slug" element={<HumanOsSystemPage />} />
            
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
          </Suspense>
        </main>
      </div>

      <Footer />

      {/* Global accessible Demo Modal */}
      <DemoModal isOpen={demoModalOpen} onClose={() => setDemoModalOpen(false)} />
    </div>
  );
};

export default App;
