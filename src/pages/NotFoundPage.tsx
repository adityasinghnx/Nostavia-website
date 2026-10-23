import React from 'react';
import { useSeo } from '../lib/useSeo';
import { nav } from '../content/site';
import { HiveSwarm } from '../components/hive/HiveSwarm';
import { Button, TextLink } from '../components/ui/primitives';
import { SplitHeading } from '../components/ui/motion';

const NotFoundPage: React.FC = () => {
  useSeo({ title: 'Page not found | Nostavia', description: 'This page does not exist.', path: '/404' });

  return (
    <section data-theme="ink" aria-labelledby="page-title" className="relative min-h-[100svh] overflow-hidden flex items-end">
      <HiveSwarm anchor={{ x: 0.72, y: 0.42 }} mobileAnchor={{ x: 0.5, y: 0.3 }} scale={0.12} />
      <div className="wrap relative pb-20 pt-[45vh] md:pt-40">
        <p className="t-label text-accent">404</p>
        <SplitHeading id="page-title" as="h1" trigger="mount" className="t-display mt-6 max-w-[10ch]" text="This cell is *empty.*" />
        <p className="mt-8 t-lead text-fg/60 max-w-[40ch]">The page you were looking for has moved or never existed. Every Bee is accounted for, though.</p>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Button to="/" size="lg">
            Back to home
          </Button>
          {nav.slice(0, 3).map((n) => (
            <TextLink key={n.to} to={n.to}>
              {n.label}
            </TextLink>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
