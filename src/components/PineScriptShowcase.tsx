import React from 'react';
import { PINE_SCRIPTS } from '../data/marketData';
import { PineScriptItem } from '../types/market';
import { ChevronRight, Code2, Star } from 'lucide-react';

interface PineScriptShowcaseProps {
  onSelectScript: (script: PineScriptItem) => void;
  onExploreAll: () => void;
}

export const PineScriptShowcase: React.FC<PineScriptShowcaseProps> = ({
  onSelectScript,
  onExploreAll,
}) => {
  return (
    <section
      id="pinescript-section"
      className="py-12 sm:py-16 border-t border-[#1e222d] bg-[#000000]"
      data-purpose="pine-script-community"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <span className="text-xs font-semibold text-[#2962ff] uppercase tracking-wider block">
              TradingView Community Scripts
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1 tracking-tight">
              Pine Script™ Indicators
            </h2>
            <p className="text-sm text-[#868993] mt-1">
              Thousands of custom community indicators and algorithmic strategies created with code.
            </p>
          </div>

          <button
            onClick={onExploreAll}
            className="text-xs font-medium text-[#2962ff] hover:text-blue-400 mt-3 md:mt-0 flex items-center transition cursor-pointer self-start md:self-auto group"
          >
            <span>Explore all 100,000+ indicators</span>
            <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-0.5 transition" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PINE_SCRIPTS.map((script) => (
            <div
              key={script.id}
              onClick={() => onSelectScript(script)}
              className="bg-[#131722] p-5 rounded-xl border border-[#2a2e39] hover:border-[#434651] transition-all duration-200 cursor-pointer group flex flex-col justify-between hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-0.5"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#868993] mb-3">
                  <span className="font-mono bg-[#1e222d] px-2 py-0.5 rounded text-white text-[11px] font-semibold border border-[#2a2e39]">
                    {script.category}
                  </span>
                  <div className="flex items-center space-x-1 text-[#868993]">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="text-xs">{script.boosts}</span>
                  </div>
                </div>

                <h4 className="text-base font-bold text-white mb-2 group-hover:text-[#2962ff] transition-colors leading-snug">
                  {script.title}
                </h4>

                <p className="text-xs text-[#868993] leading-relaxed mb-4">
                  {script.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#2a2e39]/60 text-[11px] text-[#787b86]">
                <div>
                  By <span className="text-[#d1d4dc] font-semibold">{script.author}</span> • {script.version}
                </div>
                <div className="flex items-center text-[#2962ff] opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                  <Code2 className="w-3.5 h-3.5 mr-1" />
                  <span>View Code</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
