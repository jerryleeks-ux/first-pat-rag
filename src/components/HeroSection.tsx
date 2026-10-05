import React from 'react';
import { ChevronRight } from 'lucide-react';
import { ASTRONAUT_IMAGE } from '../data/marketData';

interface HeroSectionProps {
  onOpenAuth: (mode?: 'signup' | 'signin') => void;
  onOpenSpaceStory: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenAuth,
  onOpenSpaceStory,
}) => {
  return (
    <section
      className="relative min-h-[540px] lg:min-h-[620px] flex flex-col items-center justify-center text-center px-4 pt-14 pb-16 overflow-hidden bg-black"
      data-purpose="hero-banner"
    >
      {/* Subtle gradient glow in backdrop */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[380px] bg-gradient-to-b from-[#1e222d]/40 via-[#2962ff]/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.08] select-none text-balance">
          Where the world does markets
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-[#868993] max-w-2xl font-normal leading-relaxed mb-10 text-balance">
          Join 100 million traders and investors taking the future into their own hands.
        </p>

        {/* Primary Action CTA Button: Stylized Slanted Pill */}
        <div className="flex flex-col items-center">
          <button
            onClick={() => onOpenAuth('signup')}
            className="tv-skew-cta bg-white text-black font-bold px-10 py-4 text-base md:text-lg flex items-center justify-center tracking-normal shadow-2xl hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <span className="tv-skew-inner block font-bold text-black tracking-tight">
              Get started for free
            </span>
          </button>
          <span className="text-xs text-[#868993] mt-3.5 font-normal tracking-wide">
            $0 forever, no credit card needed
          </span>
        </div>
      </div>

      {/* Space Story Astronaut Floating Badge */}
      <div className="mt-16 md:mt-22">
        <button
          onClick={onOpenSpaceStory}
          className="group flex items-center space-x-3.5 bg-[#131722]/90 hover:bg-[#1e222d] border border-[#2a2e39] hover:border-[#434651] px-4 py-2.5 rounded-full transition-all duration-300 shadow-xl cursor-pointer text-left"
        >
          {/* Astronaut Scott Poteet Avatar */}
          <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20 flex-shrink-0 bg-slate-800">
            <img
              alt="Astronaut Scott Kidd Poteet"
              className="w-full h-full object-cover"
              src={ASTRONAUT_IMAGE}
              referrerPolicy="no-referrer"
              onError={(e) => {
                // In case of any network restriction, fallback to stylized space avatar icon
                (e.currentTarget as HTMLElement).style.display = 'none';
              }}
            />
          </div>

          {/* Content text */}
          <div className="text-left text-xs leading-snug">
            <div className="flex items-center text-white font-medium group-hover:text-[#2962ff] transition">
              <span>See our space story</span>
              <ChevronRight className="w-3.5 h-3.5 ml-0.5 transform group-hover:translate-x-0.5 transition" />
            </div>
            <div className="text-[#868993] text-[11px]">With astronaut Scott "Kidd" Poteet</div>
          </div>
        </button>
      </div>
    </section>
  );
};
