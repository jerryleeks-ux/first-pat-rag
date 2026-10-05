import React, { useState } from 'react';
import { ACTIVE_STOCKS } from '../../data/marketData';
import { X, Search, Download, ArrowUpDown, Filter, Check } from 'lucide-react';

interface StockScreenerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectStock: (symbol: string) => void;
}

export const StockScreenerModal: React.FC<StockScreenerModalProps> = ({
  isOpen,
  onClose,
  onSelectStock,
}) => {
  const [search, setSearch] = useState('');
  const [sector, setSector] = useState<string>('All');
  const [ratingFilter, setRatingFilter] = useState<string>('All');
  const [sortField, setSortField] = useState<'price' | 'changePercent' | 'peRatio'>('changePercent');
  const [sortAsc, setSortAsc] = useState(false);
  const [exported, setExported] = useState(false);

  if (!isOpen) return null;

  const sectors = ['All', 'Technology', 'Automotive', 'Consumer Cyclical', 'Communication Services'];
  const ratings = ['All', 'Strong Buy', 'Buy', 'Hold'];

  const filtered = ACTIVE_STOCKS.filter((stock) => {
    const matchesSearch =
      !search ||
      stock.ticker.toLowerCase().includes(search.toLowerCase()) ||
      stock.name.toLowerCase().includes(search.toLowerCase());
    const matchesSector = sector === 'All' || stock.sector === sector;
    const matchesRating = ratingFilter === 'All' || stock.rating === ratingFilter;
    return matchesSearch && matchesSector && matchesRating;
  }).sort((a, b) => {
    const diff = (a[sortField] as number) - (b[sortField] as number);
    return sortAsc ? diff : -diff;
  });

  const handleExportCSV = () => {
    const headers = 'Ticker,Name,Price,Change %,Volume,Market Cap,Rating,Sector,PE Ratio\n';
    const rows = filtered
      .map(
        (s) =>
          `"${s.ticker}","${s.name}",${s.price},${s.changePercent},"${s.volume}","${s.marketCap}","${s.rating}","${s.sector}",${s.peRatio}`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'tradingview_screener_export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setExported(true);
    setTimeout(() => setExported(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-hidden animate-in fade-in duration-200">
      <div
        className="w-full max-w-5xl bg-[#131722] border border-[#2a2e39] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2a2e39] bg-[#1a1e29]">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              TradingView Stock Screener
            </h3>
            <p className="text-xs text-[#868993]">
              Real-time multi-metric screening with technical & fundamental criteria
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleExportCSV}
              className="text-xs font-semibold bg-[#1e222d] hover:bg-[#2a2e39] text-[#d1d4dc] hover:text-white px-3 py-1.5 rounded-lg border border-[#2a2e39] transition flex items-center space-x-1.5 cursor-pointer"
            >
              {exported ? <Check className="w-3.5 h-3.5 text-[#089981]" /> : <Download className="w-3.5 h-3.5" />}
              <span>{exported ? 'Downloaded' : 'Export CSV'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-[#868993] hover:text-white rounded-lg hover:bg-[#2a2e39] transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="p-4 bg-[#10131b] border-b border-[#2a2e39] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2 flex-1 min-w-[200px] max-w-sm bg-[#1e222d] border border-[#2a2e39] px-3 py-1.5 rounded-lg">
            <Search className="w-4 h-4 text-[#868993]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search ticker or company..."
              className="bg-transparent text-white placeholder-[#868993] focus:outline-none w-full text-xs"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Sector select */}
            <div className="flex items-center space-x-1">
              <span className="text-[#868993]">Sector:</span>
              <select
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                className="bg-[#1e222d] text-white border border-[#2a2e39] rounded px-2 py-1 text-xs focus:outline-none"
              >
                {sectors.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Rating select */}
            <div className="flex items-center space-x-1">
              <span className="text-[#868993]">Analyst:</span>
              <select
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
                className="bg-[#1e222d] text-white border border-[#2a2e39] rounded px-2 py-1 text-xs focus:outline-none"
              >
                {ratings.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Screener Table */}
        <div className="overflow-x-auto flex-1 p-4">
          <table className="w-full text-left border-collapse text-xs font-sans">
            <thead>
              <tr className="border-b border-[#2a2e39] text-[#868993] bg-[#0a0d14]">
                <th className="py-2.5 px-3 font-medium">Symbol & Name</th>
                <th
                  onClick={() => {
                    setSortField('price');
                    setSortAsc(sortField === 'price' ? !sortAsc : false);
                  }}
                  className="py-2.5 px-3 font-medium text-right cursor-pointer hover:text-white"
                >
                  Price {sortField === 'price' && (sortAsc ? '↑' : '↓')}
                </th>
                <th
                  onClick={() => {
                    setSortField('changePercent');
                    setSortAsc(sortField === 'changePercent' ? !sortAsc : false);
                  }}
                  className="py-2.5 px-3 font-medium text-right cursor-pointer hover:text-white"
                >
                  Change % {sortField === 'changePercent' && (sortAsc ? '↑' : '↓')}
                </th>
                <th className="py-2.5 px-3 font-medium text-right">52W Range</th>
                <th
                  onClick={() => {
                    setSortField('peRatio');
                    setSortAsc(sortField === 'peRatio' ? !sortAsc : false);
                  }}
                  className="py-2.5 px-3 font-medium text-right cursor-pointer hover:text-white"
                >
                  P/E {sortField === 'peRatio' && (sortAsc ? '↑' : '↓')}
                </th>
                <th className="py-2.5 px-3 font-medium text-right">Volume</th>
                <th className="py-2.5 px-3 font-medium text-right">Market Cap</th>
                <th className="py-2.5 px-3 font-medium text-center">Consensus</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2a2e39]/60 font-mono">
              {filtered.map((stock) => {
                const isPos = stock.changePercent >= 0;
                return (
                  <tr
                    key={stock.ticker}
                    onClick={() => {
                      onSelectStock(stock.ticker);
                      onClose();
                    }}
                    className="hover:bg-[#1e222d] transition cursor-pointer group"
                  >
                    <td className="py-3 px-3">
                      <div className="flex items-center space-x-2">
                        <div className={`w-5 h-5 rounded ${stock.logoColor} font-black text-[10px] flex items-center justify-center font-sans`}>
                          {stock.initial}
                        </div>
                        <div>
                          <span className="font-bold text-white group-hover:text-blue-400">
                            {stock.ticker}
                          </span>
                          <span className="block text-[11px] text-[#868993] font-sans">
                            {stock.name}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-right font-bold text-white">
                      ${stock.price.toFixed(2)}
                    </td>
                    <td className={`py-3 px-3 text-right font-bold ${isPos ? 'text-[#089981]' : 'text-[#f23645]'}`}>
                      {isPos ? `+${stock.changePercent}%` : `${stock.changePercent}%`}
                    </td>
                    <td className="py-3 px-3 text-right text-[11px] text-[#868993]">
                      ${stock.low52} - ${stock.high52}
                    </td>
                    <td className="py-3 px-3 text-right text-[#d1d4dc]">{stock.peRatio}</td>
                    <td className="py-3 px-3 text-right text-[#d1d4dc]">{stock.volume}</td>
                    <td className="py-3 px-3 text-right text-[#868993]">{stock.marketCap}</td>
                    <td className="py-3 px-3 text-center font-sans">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${stock.ratingColor}`}>
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
    </div>
  );
};
