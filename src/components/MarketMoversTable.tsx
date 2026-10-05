import React, { useState } from 'react';
import { ACTIVE_STOCKS } from '../data/marketData';
import { StockScreenerItem } from '../types/market';
import { ExternalLink, Filter } from 'lucide-react';

interface MarketMoversTableProps {
  onSelectStock: (ticker: string) => void;
  onOpenScreener: () => void;
}

export const MarketMoversTable: React.FC<MarketMoversTableProps> = ({
  onSelectStock,
  onOpenScreener,
}) => {
  const [filterTab, setFilterTab] = useState<'active' | 'gainers' | 'losers'>('active');

  const filteredStocks = [...ACTIVE_STOCKS].sort((a, b) => {
    if (filterTab === 'gainers') return b.changePercent - a.changePercent;
    if (filterTab === 'losers') return a.changePercent - b.changePercent;
    // active: by volume descending
    return parseFloat(b.volume) - parseFloat(a.volume);
  });

  return (
    <section id="screener-section" className="py-12 sm:py-16 bg-[#0a0d14] border-t border-[#1e222d]" data-purpose="market-movers-table">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Most Active US Stocks
            </h2>
            <p className="text-xs text-[#868993] mt-0.5">
              Real-time price feed and trading volume
            </p>
          </div>

          <div className="flex items-center space-x-3">
            {/* Quick Segmented Filter */}
            <div className="flex items-center bg-[#131722] p-1 rounded-lg border border-[#2a2e39] text-xs">
              <button
                onClick={() => setFilterTab('active')}
                className={`px-3 py-1 rounded transition cursor-pointer ${
                  filterTab === 'active' ? 'bg-[#1e222d] text-white font-medium' : 'text-[#868993] hover:text-white'
                }`}
              >
                Most Active
              </button>
              <button
                onClick={() => setFilterTab('gainers')}
                className={`px-3 py-1 rounded transition cursor-pointer ${
                  filterTab === 'gainers' ? 'bg-[#1e222d] text-white font-medium' : 'text-[#868993] hover:text-white'
                }`}
              >
                Top Gainers
              </button>
              <button
                onClick={() => setFilterTab('losers')}
                className={`px-3 py-1 rounded transition cursor-pointer ${
                  filterTab === 'losers' ? 'bg-[#1e222d] text-white font-medium' : 'text-[#868993] hover:text-white'
                }`}
              >
                Top Losers
              </button>
            </div>

            <button
              onClick={onOpenScreener}
              className="text-xs font-semibold text-[#d1d4dc] hover:text-white bg-[#1e222d] hover:bg-[#2a2e39] border border-[#2a2e39] px-3.5 py-1.5 rounded-lg transition cursor-pointer flex items-center space-x-1.5 whitespace-nowrap shadow-sm"
            >
              <span>View full stock screener</span>
              <ExternalLink className="w-3 h-3 text-[#868993]" />
            </button>
          </div>
        </div>

        {/* Modern Data Table */}
        <div className="overflow-x-auto border border-[#2a2e39] rounded-xl bg-[#131722] shadow-xl">
          <table className="w-full text-left border-collapse text-xs sm:text-sm font-sans">
            <thead>
              <tr className="border-b border-[#2a2e39] text-[#868993] bg-[#10131b]">
                <th className="py-3.5 px-4 sm:px-6 font-medium">Ticker & Company</th>
                <th className="py-3.5 px-4 font-medium text-right">Price</th>
                <th className="py-3.5 px-4 font-medium text-right">Change %</th>
                <th className="py-3.5 px-4 font-medium text-right">Volume</th>
                <th className="py-3.5 px-4 font-medium text-right hidden sm:table-cell">Market Cap</th>
                <th className="py-3.5 px-4 font-medium text-center">Analyst Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2a2e39]/60 font-mono">
              {filteredStocks.map((stock) => {
                const isPositive = stock.changePercent >= 0;

                return (
                  <tr
                    key={stock.ticker}
                    onClick={() => onSelectStock(stock.ticker)}
                    className="hover:bg-[#1e222d]/70 transition-colors cursor-pointer group"
                  >
                    {/* Ticker & Company */}
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-6 h-6 rounded ${stock.logoColor} font-black text-[11px] flex items-center justify-center font-sans shadow-sm shrink-0`}
                        >
                          {stock.initial}
                        </div>
                        <div>
                          <div className="flex items-center space-x-1.5">
                            <span className="font-bold text-white group-hover:text-blue-400 transition-colors">
                              {stock.ticker}
                            </span>
                            <span className="text-[10px] text-[#787b86] font-mono px-1 rounded bg-[#1e222d]">
                              {stock.sector}
                            </span>
                          </div>
                          <span className="block text-[11px] text-[#868993] font-sans truncate max-w-[150px] sm:max-w-none">
                            {stock.name}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="py-3.5 px-4 text-right font-semibold text-white tracking-tight">
                      ${stock.price.toFixed(2)}
                    </td>

                    {/* Change % */}
                    <td
                      className={`py-3.5 px-4 text-right font-semibold ${
                        isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                      }`}
                    >
                      {isPositive ? `+${stock.changePercent.toFixed(2)}%` : `${stock.changePercent.toFixed(2)}%`}
                    </td>

                    {/* Volume */}
                    <td className="py-3.5 px-4 text-right text-[#d1d4dc] font-mono">
                      {stock.volume}
                    </td>

                    {/* Market Cap */}
                    <td className="py-3.5 px-4 text-right text-[#868993] hidden sm:table-cell font-mono">
                      {stock.marketCap}
                    </td>

                    {/* Analyst Rating */}
                    <td className="py-3.5 px-4 text-center font-sans">
                      <span className={`px-2.5 py-1 rounded text-[11px] font-semibold tracking-wide ${stock.ratingColor}`}>
                        {stock.rating}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
