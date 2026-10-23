import React, { Suspense, lazy, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Nav } from './components/layout/Nav';
import { Footer } from './components/layout/Footer';
import { SmoothScroll, scrollToTop, useLenis } from './lib/smooth-scroll';
import { STUDIO_PATH } from './content/site';
import { HomePage } from './pages/HomePage';
import { Intro } from './components/ui/effects';

const HivePage = lazy(() => import('./pages/HivePage'));
const HumanOsPage = lazy(() => import('./pages/HumanOsPage'));
const StudioPage = lazy(() => import('./pages/StudioPage'));
const CustomersPage = lazy(() => import('./pages/CustomersPage'));
const DevelopersPage = lazy(() => import('./pages/DevelopersPage'));
const DemoPage = lazy(() => import('./pages/DemoPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

/* Old routes. Mirrored as 301s in vercel.json. */
const redirects: [string, string][] = [
  ['/superintelligence', '/'],
  ['/platform', '/'],
  ['/human-os/*', '/human-os'],
  ['/company', '/'],
  ['/security', '/#principles'],
  ['/industries/*', '/customers'],
  ['/solutions/engineering', STUDIO_PATH],
  ['/solutions/supplements', STUDIO_PATH],
  ['/solutions/gravity', '/developers'],
  ['/solutions/front-desk', '/hive'],
  ['/solutions/ai-agents', '/hive'],
  ['/solutions/voice-agents', '/hive'],
  ['/solutions/hospitals', '/customers'],
  ['/solutions/hospitals-front-door', '/customers'],
  ['/solutions/*', '/human-os'],
  ['/pricing', '/demo'],
  ['/clinical', '/'],
];

/** Scrolls to a #hash target once a page has mounted. */
const HashScroll: React.FC = () => {
  const { hash, pathname } = useLocation();
  const lenis = useLenis();
  useEffect(() => {
    if (!hash) return;
    const t = window.setTimeout(() => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (!el) return;
      if (lenis) lenis.scrollTo(el, { offset: -80 });
      else el.scrollIntoView();
    }, 120);
    return () => window.clearTimeout(t);
  }, [hash, pathname, lenis]);
  return null;
};

const Shell: React.FC = () => {
  const location = useLocation();
  const lenis = useLenis();

  return (
    <>
      <Nav />
      <HashScroll />
      <main id="main" data-theme="ink" className="relative min-h-screen">
        <AnimatePresence mode="wait" onExitComplete={() => scrollToTop(lenis)}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } }}
            exit={{ opacity: 0, transition: { duration: 0.25, ease: 'easeIn' } }}
          >
            <Suspense fallback={<div className="min-h-screen" aria-busy="true" />}>
              <Routes location={location}>
                <Route path="/" element={<HomePage />} />
                <Route path="/hive" element={<HivePage />} />
                <Route path="/human-os" element={<HumanOsPage />} />
                <Route path={STUDIO_PATH} element={<StudioPage />} />
                <Route path="/customers" element={<CustomersPage />} />
                <Route path="/developers" element={<DevelopersPage />} />
                <Route path="/demo" element={<DemoPage />} />
                {redirects.map(([from, to]) => (
                  <Route key={from} path={from} element={<Navigate to={to} replace />} />
                ))}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <div className="grain" aria-hidden="true" />
      <Intro />
    </>
  );
};

const App: React.FC = () => (
  <SmoothScroll>
    <Shell />
  </SmoothScroll>
);

export default App;
