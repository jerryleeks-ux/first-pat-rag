import React from 'react';
import { ASTRONAUT_IMAGE } from '../../data/marketData';
import { X, Globe2, Rocket, ExternalLink, ShieldCheck } from 'lucide-react';

interface SpaceStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SpaceStoryModal: React.FC<SpaceStoryModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-[#131722] border border-[#2a2e39] rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2a2e39] bg-[#1a1e29]">
          <div className="flex items-center space-x-2.5">
            <Rocket className="w-5 h-5 text-[#2962ff]" />
            <h3 className="text-base font-bold text-white">
              TradingView in Orbit: The Polaris Dawn Mission
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#868993] hover:text-white rounded-lg hover:bg-[#2a2e39] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          <div className="flex items-center space-x-4 bg-[#0a0d14] p-4 rounded-xl border border-[#2a2e39]">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#2962ff] shrink-0 bg-slate-800">
              <img
                src={ASTRONAUT_IMAGE}
                alt="Scott Kidd Poteet"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-base font-bold text-white">Lt. Col. Scott "Kidd" Poteet</span>
                <ShieldCheck className="w-4 h-4 text-[#089981]" />
              </div>
              <div className="text-xs text-[#868993] mt-0.5">
                Mission Pilot, Polaris Dawn • USAF Thunderbird Veteran
              </div>
              <div className="text-[11px] text-[#2962ff] font-mono mt-1">
                Apogee: 1,400.7 km • Orbital Speed: 27,500 km/h
              </div>
            </div>
          </div>

          <div className="space-y-4 text-sm text-[#d1d4dc] leading-relaxed">
            <blockquote className="border-l-2 border-[#2962ff] pl-4 italic text-white text-base">
              "When you are looking down at Earth from 700 miles in high orbit, you realize that global trade and markets connect every human being on the planet."
            </blockquote>

            <p>
              In September 2024, the Polaris Dawn mission achieved the highest Earth orbit flown by humans since the Apollo program. Aboard SpaceX Dragon <em>Resilience</em>, Mission Pilot Scott "Kidd" Poteet tested TradingView's lightweight client-side charting engines over satellite laser link.
            </p>

            <div className="grid grid-cols-2 gap-3 p-3.5 bg-[#10131b] rounded-xl border border-[#2a2e39] text-xs font-mono">
              <div>
                <span className="text-[#868993] font-sans block">Laser Bandwidth</span>
                <span className="text-white font-bold">100+ Mbps Starlink Optical</span>
              </div>
              <div>
                <span className="text-[#868993] font-sans block">Chart Latency</span>
                <span className="text-[#089981] font-bold">~28 ms to terrestrial hub</span>
              </div>
            </div>

            <p className="text-xs text-[#868993]">
              TradingView was engineered from day one to operate with zero server-side rendering overhead, rendering tens of thousands of data points at 60 FPS directly in hardware WebGL shaders—even on battery-constrained spaceflight hardware.
            </p>
          </div>

          <div className="pt-2 border-t border-[#2a2e39] flex justify-end">
            <button
              onClick={onClose}
              className="bg-[#2962ff] hover:bg-[#1e53e5] text-white px-5 py-2 rounded-xl text-xs font-semibold transition"
            >
              Back to Markets
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
