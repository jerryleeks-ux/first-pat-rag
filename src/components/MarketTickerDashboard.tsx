import React, { useState, useEffect } from 'react';
import { MARKET_CATEGORIES } from '../data/marketData';
import { TickerData } from '../types/market';
import { Activity } from 'lucide-react';

interface MarketTickerDashboardProps {
  onSelectTicker: (symbol: string) => void;
  selectedSymbol?: string;
}

export const MarketTickerDashboard: React.FC<MarketTickerDashboardProps> = ({
  onSelectTicker,
  selectedSymbol,
}) => {
  const [activeCategoryId, setActiveCategoryId] = useState('indices');
  const [liveMode, setLiveMode] = useState(true);
  const [tickerOverrides, setTickerOverrides] = useState<{ [key: string]: { price: number; flash: 'up' | 'down' | null } }>({});

  const activeCategory = MARKET_CATEGORIES.find((c) => c.id === activeCategoryId) || MARKET_CATEGORIES[0];

  // Subtle real-time price fluctuation simulation (TradingView style micro-ticks)
  useEffect(() => {
    if (!liveMode) return;

    const interval = setInterval(() => {
      // Pick random ticker to tick
      const tickers = activeCategory.tickers;
      const randomIdx = Math.floor(Math.random() * tickers.length);
      const target = tickers[randomIdx];
      const deltaPercent = (Math.random() - 0.49) * 0.001; // tiny tick
      const newPrice = target.price * (1 + deltaPercent);
      const isUp = newPrice >= target.price;

      setTickerOverrides((prev) => ({
        ...prev,
        [target.symbol]: {
          price: Number(newPrice.toFixed(target.digits ?? 2)),
          flash: isUp ? 'up' : 'down',
        },
      }));

      // Clear flash after 800ms
      setTimeout(() => {
        setTickerOverrides((prev) => {
          if (!prev[target.symbol]) return prev;
          return {
            ...prev,
            [target.symbol]: {
              ...prev[target.symbol],
              flash: null,
            },
          };
        });
      }, 800);
    }, 3200);

    return () => clearInterval(interval);
  }, [liveMode, activeCategory]);

  // Helper to render sparkline SVG with smooth path
  const renderSparkline = (data: number[], isPositive: boolean) => {
    if (!data || data.length < 2) return null;
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const width = 100;
    const height = 36;
    const padding = 4;

    const points = data
      .map((val, idx) => {
        const x = (idx / (data.length - 1)) * width;
        const y = height - padding - ((val - min) / range) * (height - padding * 2);
        return `${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(' L ');

    const strokeColor = isPositive ? '#089981' : '#f23645';

    return (
      <svg className="w-18 h-8 sparkline-svg shrink-0" viewBox={`0 0 ${width} ${height}`} fill="none">
        <path
          d={`M ${points}`}
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  return (
    <section id="market-dashboard-section" className="border-t border-[#1e222d] bg-[#0a0d14] py-8" data-purpose="market-indices-carousel">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        {/* Market Tabs Navigation */}
        <div className="flex items-center justify-between border-b border-[#1e222d] pb-3 mb-6 overflow-x-auto no-scrollbar gap-4">
          <div className="flex space-x-6 text-sm font-medium whitespace-nowrap">
            {MARKET_CATEGORIES.map((cat) => {
              const isActive = cat.id === activeCategoryId;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategoryId(cat.id)}
                  className={`pb-3 -mb-[13px] font-medium transition cursor-pointer ${
                    isActive
                      ? 'text-white border-b-2 border-white font-semibold'
                      : 'text-[#868993] hover:text-[#d1d4dc] border-b-2 border-transparent'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center space-x-4 shrink-0">
            {/* Live toggle */}
            <button
              onClick={() => setLiveMode(!liveMode)}
              className="hidden sm:flex items-center space-x-1.5 text-xs text-[#868993] hover:text-white transition px-2 py-1 rounded bg-[#131722] border border-[#2a2e39]"
              title="Toggle live price simulation"
            >
              <Activity className={`w-3.5 h-3.5 ${liveMode ? 'text-[#089981]' : 'text-[#868993]'}`} />
              <span className="text-[11px]">{liveMode ? 'Live Ticks On' : 'Paused'}</span>
            </button>

            <div className="flex items-center space-x-2 text-xs text-[#868993]">
              <span className="w-2 h-2 rounded-full bg-[#089981] live-dot" />
              <span className="hidden sm:inline">Markets are open</span>
              <span className="sm:hidden">Open</span>
            </div>
          </div>
        </div>

        {/* Ticker Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {activeCategory.tickers.map((ticker) => {
            const isPositive = ticker.changePercent >= 0;
            const override = tickerOverrides[ticker.symbol];
            const currentPrice = override?.price ?? ticker.price;
            const flash = override?.flash;
            const isSelected = selectedSymbol === ticker.name || selectedSymbol === ticker.symbol;

            return (
              <div
                key={ticker.symbol}
                onClick={() => onSelectTicker(ticker.name)}
                className={`bg-[#131722] hover:bg-[#1e222d] border rounded-xl p-3.5 transition group cursor-pointer flex flex-col justify-between select-none relative ${
                  isSelected
                    ? 'border-[#2962ff] shadow-lg shadow-blue-500/10'
                    : 'border-[#2a2e39] hover:border-[#434651]'
                } ${
                  flash === 'up'
                    ? 'ring-1 ring-[#089981]/50 bg-[#089981]/5'
                    : flash === 'down'
                    ? 'ring-1 ring-[#f23645]/50 bg-[#f23645]/5'
                    : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-semibold text-sm text-white group-hover:text-blue-400 transition-colors">
                      {ticker.symbol}
                    </div>
                    <div className="text-[11px] text-[#868993] font-mono tracking-tight">
                      {ticker.name} • {ticker.category}
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-mono font-medium px-1.5 py-0.5 rounded ${
                      isPositive
                        ? 'bg-[#089981]/20 text-[#089981]'
                        : 'bg-[#f23645]/20 text-[#f23645]'
                    }`}
                  >
                    {isPositive ? `+${ticker.changePercent.toFixed(2)}%` : `${ticker.changePercent.toFixed(2)}%`}
                  </span>
                </div>

                <div className="my-3 flex items-center justify-between">
                  <span
                    className={`text-lg font-bold font-mono tracking-tight transition-colors duration-300 ${
                      flash === 'up' ? 'text-[#089981]' : flash === 'down' ? 'text-[#f23645]' : 'text-white'
                    }`}
                  >
                    {currentPrice.toLocaleString('en-US', {
                      minimumFractionDigits: ticker.digits ?? (currentPrice < 10 ? 3 : 2),
                      maximumFractionDigits: ticker.digits ?? (currentPrice < 10 ? 3 : 2),
                    })}
                    {ticker.unit || ''}
                  </span>
                  {renderSparkline(ticker.sparkline, isPositive)}
                </div>

                <div
                  className={`text-[11px] font-mono ${
                    isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                  }`}
                >
                  {isPositive
                    ? `+${Math.abs(ticker.changePts).toFixed(ticker.digits ?? 2)} ${ticker.currency}`
                    : `-${Math.abs(ticker.changePts).toFixed(ticker.digits ?? 2)} ${ticker.currency}`}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
