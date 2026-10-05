import React, { useState, useEffect, useRef } from 'react';
import { Search, X, TrendingUp, Cpu, Coins, Globe, Code2, ArrowRight } from 'lucide-react';
import { ACTIVE_STOCKS, COMMUNITY_IDEAS, PINE_SCRIPTS } from '../../data/marketData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSymbol: (symbol: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectSymbol,
}) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<'all' | 'stocks' | 'crypto' | 'ideas' | 'scripts'>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Keyboard shortcut listener: Cmd/Ctrl+K and Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Filter items
  const cleanQ = query.trim().toLowerCase();

  const matchedStocks = ACTIVE_STOCKS.filter(
    (s) =>
      !cleanQ ||
      s.ticker.toLowerCase().includes(cleanQ) ||
      s.name.toLowerCase().includes(cleanQ) ||
      s.sector.toLowerCase().includes(cleanQ)
  );

  const matchedIdeas = COMMUNITY_IDEAS.filter(
    (i) =>
      !cleanQ ||
      i.title.toLowerCase().includes(cleanQ) ||
      i.symbol.toLowerCase().includes(cleanQ) ||
      i.author.name.toLowerCase().includes(cleanQ)
  );

  const matchedScripts = PINE_SCRIPTS.filter(
    (sc) =>
      !cleanQ ||
      sc.title.toLowerCase().includes(cleanQ) ||
      sc.author.toLowerCase().includes(cleanQ) ||
      sc.description.toLowerCase().includes(cleanQ)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-[#131722] border border-[#2a2e39] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#2a2e39] bg-[#1a1e29]">
          <Search className="w-5 h-5 text-[#868993] mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search symbol, company, crypto, idea, or Pine Script..."
            className="w-full bg-transparent text-white placeholder-[#868993] text-sm focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#868993] hover:text-white mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 rounded bg-[#2a2e39] text-[11px] text-[#d1d4dc] hover:text-white"
          >
            ESC
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-1 px-4 py-2 bg-[#10131b] border-b border-[#2a2e39] overflow-x-auto no-scrollbar text-xs">
          {[
            { id: 'all', label: 'All' },
            { id: 'stocks', label: 'Stocks' },
            { id: 'crypto', label: 'Crypto & Forex' },
            { id: 'ideas', label: 'Community Ideas' },
            { id: 'scripts', label: 'Pine Scripts' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCategory(tab.id as any)}
              className={`px-3 py-1 rounded-md transition cursor-pointer whitespace-nowrap ${
                category === tab.id
                  ? 'bg-[#2962ff] text-white font-medium'
                  : 'text-[#868993] hover:text-white hover:bg-[#1e222d]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-3 space-y-4 divide-y divide-[#2a2e39]/50">
          {/* Stocks Section */}
          {(category === 'all' || category === 'stocks') && matchedStocks.length > 0 && (
            <div className="pt-2 first:pt-0">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#868993] px-2 mb-1.5 flex items-center">
                <Cpu className="w-3.5 h-3.5 mr-1.5 text-[#2962ff]" />
                Stocks & Equities
              </div>
              <div className="space-y-1">
                {matchedStocks.slice(0, 5).map((stock) => (
                  <button
                    key={stock.ticker}
                    onClick={() => {
                      onSelectSymbol(stock.ticker);
                      onClose();
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-[#1e222d] transition flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-7 h-7 rounded ${stock.logoColor} font-black text-xs flex items-center justify-center`}>
                        {stock.initial}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-white group-hover:text-blue-400">
                            {stock.ticker}
                          </span>
                          <span className="text-[10px] bg-[#1e222d] px-1.5 py-0.5 rounded text-[#868993]">
                            {stock.sector}
                          </span>
                        </div>
                        <span className="text-xs text-[#868993]">{stock.name}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-bold text-white">${stock.price.toFixed(2)}</div>
                      <div
                        className={`text-xs font-mono ${
                          stock.changePercent >= 0 ? 'text-[#089981]' : 'text-[#f23645]'
                        }`}
                      >
                        {stock.changePercent >= 0 ? `+${stock.changePercent}%` : `${stock.changePercent}%`}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Crypto / Forex Section */}
          {(category === 'all' || category === 'crypto') && (
            <div className="pt-3">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#868993] px-2 mb-1.5 flex items-center">
                <Coins className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
                Crypto & Currencies
              </div>
              <div className="space-y-1">
                {[
                  { sym: 'BTCUSD', name: 'Bitcoin / US Dollar', price: '68,420.0', change: '+2.31%', pos: true },
                  { sym: 'ETHUSD', name: 'Ethereum / US Dollar', price: '2,648.5', change: '+2.85%', pos: true },
                  { sym: 'EURUSD', name: 'Euro / US Dollar', price: '1.0864', change: '-0.18%', pos: false },
                ]
                  .filter((c) => !cleanQ || c.sym.toLowerCase().includes(cleanQ) || c.name.toLowerCase().includes(cleanQ))
                  .map((item) => (
                    <button
                      key={item.sym}
                      onClick={() => {
                        onSelectSymbol(item.sym);
                        onClose();
                      }}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-[#1e222d] transition flex items-center justify-between group cursor-pointer"
                    >
                      <div>
                        <div className="font-bold text-white group-hover:text-blue-400">{item.sym}</div>
                        <div className="text-xs text-[#868993]">{item.name}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono font-bold text-white">{item.price}</div>
                        <div className={`text-xs font-mono ${item.pos ? 'text-[#089981]' : 'text-[#f23645]'}`}>
                          {item.change}
                        </div>
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* Community Ideas Section */}
          {(category === 'all' || category === 'ideas') && matchedIdeas.length > 0 && (
            <div className="pt-3">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#868993] px-2 mb-1.5 flex items-center">
                <TrendingUp className="w-3.5 h-3.5 mr-1.5 text-[#089981]" />
                Trading Setups & Ideas
              </div>
              <div className="space-y-1">
                {matchedIdeas.slice(0, 3).map((idea) => (
                  <button
                    key={idea.id}
                    onClick={() => {
                      onSelectSymbol(idea.symbol);
                      onClose();
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-[#1e222d] transition flex items-center justify-between group cursor-pointer"
                  >
                    <div className="pr-4">
                      <div className="text-xs font-bold text-white group-hover:text-blue-400 line-clamp-1">
                        {idea.title}
                      </div>
                      <div className="text-[11px] text-[#868993] mt-0.5">
                        {idea.symbol} • by {idea.author.name} ({idea.postedAgo})
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#868993] group-hover:text-white shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Pine Scripts Section */}
          {(category === 'all' || category === 'scripts') && matchedScripts.length > 0 && (
            <div className="pt-3">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#868993] px-2 mb-1.5 flex items-center">
                <Code2 className="w-3.5 h-3.5 mr-1.5 text-purple-400" />
                Pine Script Indicators
              </div>
              <div className="space-y-1">
                {matchedScripts.map((sc) => (
                  <button
                    key={sc.id}
                    onClick={() => {
                      onClose();
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-[#1e222d] transition flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-blue-400">
                        {sc.title}
                      </div>
                      <div className="text-[11px] text-[#868993]">
                        {sc.category} • by {sc.author} ({sc.boosts})
                      </div>
                    </div>
                    <span className="text-[10px] bg-[#1e222d] text-[#2962ff] px-2 py-0.5 rounded font-mono">
                      v5
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
