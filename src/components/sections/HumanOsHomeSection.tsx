import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { HUMAN_OS_PATH, numberWord, systemsInRing, totalSystems } from '../../content/human-os';
import { RingVisual } from '../human-os/RingVisual';
import { eyebrow, primaryCta } from '../human-os/styles';

export const HumanOsHomeSection: React.FC = () => {
  const personCount = numberWord(systemsInRing('person').length);
  const teamCount = numberWord(systemsInRing('team').length);

  return (
    <section aria-labelledby="home-human-os-heading" className="w-full font-body text-hos-black py-16 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
          <div className={eyebrow}>Human OS</div>
          <h2
            id="home-human-os-heading"
            className="font-display font-extrabold text-4xl sm:text-5xl text-hos-black tracking-tight leading-[1.05]"
          >
            Human OS: {numberWord(totalSystems).toLowerCase()} systems, one integration
          </h2>
          <div className="w-16 h-1 bg-hos-yellow" aria-hidden="true" />
          <p className="text-base sm:text-lg text-[#475569] leading-relaxed max-w-md">
            {personCount} systems that live with the person. {teamCount} that run the team serving them.
          </p>
          <Link to={HUMAN_OS_PATH} className={primaryCta}>
            Explore Human OS
            <ArrowRight aria-hidden="true" className="w-4 h-4" />
          </Link>
        </div>
        <div className="lg:col-span-8">
          <RingVisual compact />
        </div>
      </div>
    </section>
  );
};

export default HumanOsHomeSection;
