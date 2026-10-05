import React, { useState } from 'react';
import { COMMUNITY_IDEAS } from '../data/marketData';
import { CommunityIdea } from '../types/market';
import { Rocket, MessageSquare } from 'lucide-react';

interface CommunityIdeasSectionProps {
  onSelectIdea: (idea: CommunityIdea) => void;
}

export const CommunityIdeasSection: React.FC<CommunityIdeasSectionProps> = ({
  onSelectIdea,
}) => {
  const [filter, setFilter] = useState<'editors' | 'popular' | 'streams'>('editors');
  const [boostedIdeas, setBoostedIdeas] = useState<{ [id: string]: number }>({});

  const handleBoost = (e: React.MouseEvent, ideaId: string, currentBoosts: number) => {
    e.stopPropagation();
    setBoostedIdeas((prev) => ({
      ...prev,
      [ideaId]: (prev[ideaId] || currentBoosts) + 1,
    }));
  };

  return (
    <section id="community-ideas-section" className="py-12 sm:py-16 px-4 sm:px-6 max-w-[1400px] mx-auto" data-purpose="community-ideas">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Community ideas
          </h2>
          <p className="text-sm text-[#868993] mt-1">
            Trading set-ups, market analyses, and technical perspectives from leading contributors
          </p>
        </div>

        {/* Tab filters */}
        <div className="flex items-center space-x-1 sm:space-x-2 bg-[#131722] p-1 rounded-lg border border-[#2a2e39] text-xs font-medium self-start md:self-auto">
          <button
            onClick={() => setFilter('editors')}
            className={`px-3 py-1.5 rounded transition cursor-pointer ${
              filter === 'editors'
                ? 'bg-[#1e222d] text-white shadow-sm'
                : 'text-[#868993] hover:text-white'
            }`}
          >
            Editors' picks
          </button>
          <button
            onClick={() => setFilter('popular')}
            className={`px-3 py-1.5 rounded transition cursor-pointer ${
              filter === 'popular'
                ? 'bg-[#1e222d] text-white shadow-sm'
                : 'text-[#868993] hover:text-white'
            }`}
          >
            Popular
          </button>
          <button
            onClick={() => setFilter('streams')}
            className={`px-3 py-1.5 rounded transition cursor-pointer ${
              filter === 'streams'
                ? 'bg-[#1e222d] text-white shadow-sm'
                : 'text-[#868993] hover:text-white'
            }`}
          >
            Streams
          </button>
        </div>
      </div>

      {/* 4 Idea Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {COMMUNITY_IDEAS.map((idea) => {
          const isShort = idea.type === 'SHORT';
          const currentBoosts = boostedIdeas[idea.id] ?? idea.boosts;
          const isBoosted = boostedIdeas[idea.id] !== undefined;

          return (
            <article
              key={idea.id}
              onClick={() => onSelectIdea(idea)}
              className="bg-[#131722] border border-[#2a2e39] rounded-xl overflow-hidden hover:border-[#434651] transition-all duration-200 flex flex-col justify-between group cursor-pointer hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-0.5"
            >
              <div>
                {/* Thumbnail Graphic */}
                <div className="h-44 bg-[#1e222d] relative overflow-hidden">
                  <img
                    alt={idea.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    src={idea.imageUrl}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback gradient if hotlink fails
                      (e.currentTarget as HTMLElement).style.display = 'none';
                    }}
                  />
                  {/* Position Badge: LONG / SHORT */}
                  <span
                    className={`absolute top-2.5 left-2.5 backdrop-blur-md px-2 py-0.5 rounded text-[11px] font-mono font-semibold ${
                      isShort
                        ? 'bg-black/80 text-[#f23645]'
                        : 'bg-black/80 text-[#089981]'
                    }`}
                  >
                    {idea.type}
                  </span>

                  {/* Symbol & Timeframe */}
                  <span className="absolute top-2.5 right-2.5 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded text-[11px] font-mono text-white">
                    {idea.symbol} • {idea.timeframe}
                  </span>
                </div>

                {/* Body Content */}
                <div className="p-4">
                  <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
                    {idea.title}
                  </h3>
                  <p className="text-xs text-[#868993] mt-2 line-clamp-2 leading-relaxed">
                    {idea.description}
                  </p>
                </div>
              </div>

              {/* Author & Interactions Footer */}
              <div className="px-4 py-3 border-t border-[#2a2e39] flex items-center justify-between text-xs text-[#868993] bg-[#10131c]/60">
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-5 h-5 rounded-full ${idea.author.avatarColor} text-white font-bold flex items-center justify-center text-[10px] shrink-0`}
                  >
                    {idea.author.initial}
                  </div>
                  <span className="text-white font-medium text-[11px] truncate max-w-[110px]">
                    {idea.author.handle}
                  </span>
                </div>

                <div className="flex items-center space-x-2.5">
                  <button
                    onClick={(e) => handleBoost(e, idea.id, idea.boosts)}
                    className={`flex items-center space-x-1 text-[11px] transition cursor-pointer ${
                      isBoosted ? 'text-[#2962ff] font-semibold' : 'text-[#868993] hover:text-white'
                    }`}
                    title="Boost idea"
                  >
                    <Rocket className="w-3 h-3" />
                    <span>{currentBoosts}</span>
                  </button>
                  <span className="text-[11px] text-[#787b86]">{idea.postedAgo}</span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
