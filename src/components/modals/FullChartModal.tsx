import React, { useState } from 'react';
import { CHART_ASSETS, ACTIVE_STOCKS } from '../../data/marketData';
import {
  X,
  Maximize2,
  Minimize2,
  TrendingUp,
  MousePointer,
  Sliders,
  ArrowUpDown,
  BarChart2,
  DollarSign,
  Activity,
  Layers,
  ChevronDown,
  Plus,
  Minus,
  CheckCircle2,
} from 'lucide-react';

interface FullChartModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeSymbol: string;
  onSelectSymbol: (symbol: string) => void;
}

export const FullChartModal: React.FC<FullChartModalProps> = ({
  isOpen,
  onClose,
  activeSymbol,
  onSelectSymbol,
}) => {
  const [timeframe, setTimeframe] = useState<'1m' | '5m' | '15m' | '1h' | '4h' | '1D' | '1W'>('1D');
  const [sidebarTab, setSidebarTab] = useState<'trade' | 'watchlist' | 'depth'>('trade');
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market');
  const [orderSide, setOrderSide] = useState<'buy' | 'sell'>('buy');
  const [quantity, setQuantity] = useState(10);
  const [orderFeedback, setOrderFeedback] = useState<string | null>(null);

  const asset = CHART_ASSETS[activeSymbol] || CHART_ASSETS['AAPL'];

  if (!isOpen) return null;

  const handlePlaceOrder = () => {
    const total = (asset.currentPrice * quantity).toFixed(2);
    setOrderFeedback(`Order Executed! ${orderSide.toUpperCase()} ${quantity} shares of ${activeSymbol} at $${asset.currentPrice} ($${total})`);
    setTimeout(() => setOrderFeedback(null), 3500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md overflow-hidden animate-in fade-in duration-150">
      <div className="w-full h-full flex flex-col bg-[#05070a] text-[#f0f3fa] select-none">
        {/* Workstation Top Navigation Bar */}
        <div className="h-[52px] bg-[#131722] border-b border-[#2a2e39] px-4 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Symbol Identifier & Selector */}
            <div className="flex items-center space-x-2 bg-[#1e222d] border border-[#2a2e39] px-2.5 py-1 rounded-lg">
              <span className="font-bold text-white font-mono text-sm">{activeSymbol}</span>
              <span className="text-[10px] text-[#868993]">{asset.exchange}</span>
            </div>

            {/* Quick Timeframes */}
            <div className="hidden sm:flex items-center space-x-1 text-xs font-mono">
              {(['1m', '5m', '15m', '1h', '4h', '1D', '1W'] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-2 py-1 rounded transition cursor-pointer ${
                    timeframe === tf
                      ? 'bg-[#2962ff] text-white font-bold'
                      : 'text-[#868993] hover:text-white hover:bg-[#1e222d]'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>

            {/* Current Price & % Change */}
            <div className="flex items-center space-x-2 font-mono">
              <span className="text-sm font-bold text-white">${asset.currentPrice.toFixed(2)}</span>
              <span className="text-xs text-[#089981] font-semibold">
                +{asset.changePts.toFixed(2)} (+{asset.changePercent.toFixed(2)}%)
              </span>
            </div>
          </div>

          {/* Right Utility Buttons */}
          <div className="flex items-center space-x-2">
            <div className="hidden md:flex items-center space-x-2 text-xs text-[#868993] bg-[#1e222d] px-3 py-1 rounded-lg border border-[#2a2e39]">
              <span className="w-2 h-2 rounded-full bg-[#089981] live-dot" />
              <span>CME Data Live</span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-[#868993] hover:text-white hover:bg-[#1e222d] rounded-lg transition cursor-pointer"
              title="Close Full Chart (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Workstation Layout */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Vertical Drawing Palette */}
          <div className="w-12 bg-[#131722] border-r border-[#2a2e39] flex flex-col items-center py-3 space-y-3 shrink-0">
            <button className="p-2 text-white bg-[#2962ff] rounded-lg transition" title="Crosshair">
              <MousePointer className="w-4 h-4" />
            </button>
            <button className="p-2 text-[#868993] hover:text-white hover:bg-[#1e222d] rounded-lg transition" title="Trend Line">
              <TrendingUp className="w-4 h-4" />
            </button>
            <button className="p-2 text-[#868993] hover:text-white hover:bg-[#1e222d] rounded-lg transition" title="Fibonacci">
              <Sliders className="w-4 h-4" />
            </button>
            <button className="p-2 text-[#868993] hover:text-white hover:bg-[#1e222d] rounded-lg transition" title="Long / Short Risk Box">
              <ArrowUpDown className="w-4 h-4" />
            </button>
            <button className="p-2 text-[#868993] hover:text-white hover:bg-[#1e222d] rounded-lg transition" title="Volume Profile">
              <BarChart2 className="w-4 h-4" />
            </button>
            <div className="w-6 border-b border-[#2a2e39]" />
            <button className="p-2 text-[#868993] hover:text-white hover:bg-[#1e222d] rounded-lg transition" title="Indicators">
              <Layers className="w-4 h-4" />
            </button>
          </div>

          {/* Central Chart Viewport */}
          <div className="flex-1 flex flex-col bg-[#0a0d14] relative overflow-hidden">
            {/* Notification Toast for Paper Trade */}
            {orderFeedback && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 bg-[#089981] text-white px-4 py-2 rounded-xl shadow-xl flex items-center space-x-2 text-xs font-semibold animate-in fade-in slide-in-from-top-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>{orderFeedback}</span>
              </div>
            )}

            {/* Simulated Full Chart SVG */}
            <div className="flex-1 relative p-6">
              {/* Grid Background */}
              <div className="absolute inset-0 grid grid-rows-8 grid-cols-12 pointer-events-none opacity-15">
                {Array.from({ length: 96 }).map((_, i) => (
                  <div key={i} className="border-b border-r border-[#2a2e39]" />
                ))}
              </div>

              {/* Chart SVG Canvas */}
              <svg className="w-full h-full pr-18" preserveAspectRatio="none" viewBox="0 0 1200 480">
                <defs>
                  <linearGradient id="fullChartGrad" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#2962ff" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#2962ff" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Shaded Area */}
                <path
                  d="M 0 360 Q 200 320 350 380 T 600 240 T 900 180 T 1100 210 T 1200 120 L 1200 480 L 0 480 Z"
                  fill="url(#fullChartGrad)"
                />

                {/* Main Trend Line */}
                <path
                  d="M 0 360 Q 200 320 350 380 T 600 240 T 900 180 T 1100 210 T 1200 120"
                  fill="none"
                  stroke="#2962ff"
                  strokeWidth="3.5"
                />

                {/* Orange EMA 20 */}
                <path
                  d="M 0 390 Q 250 350 500 300 T 850 240 T 1200 160"
                  fill="none"
                  stroke="#ff9800"
                  strokeDasharray="5 5"
                  strokeWidth="2"
                />

                {/* Purple SMA 50 */}
                <path
                  d="M 0 420 Q 300 390 600 340 T 1000 280 T 1200 220"
                  fill="none"
                  stroke="#9c27b0"
                  strokeWidth="1.8"
                />

                {/* Latest Price Callout point */}
                <circle cx="1200" cy="120" fill="#2962ff" r="6" stroke="#ffffff" strokeWidth="2.5" />
              </svg>

              {/* Price Axis on Right */}
              <div className="absolute right-0 top-0 bottom-0 w-18 bg-[#131722]/90 border-l border-[#2a2e39] flex flex-col justify-between py-6 px-2 text-[11px] font-mono text-[#868993] text-right pointer-events-none">
                <span>$245.00</span>
                <span>$240.00</span>
                <span>$235.00</span>
                <span className="bg-[#089981] text-white px-1.5 py-0.5 rounded font-bold text-[10px] self-end shadow">
                  ${asset.currentPrice.toFixed(2)}
                </span>
                <span>$230.00</span>
                <span>$225.00</span>
                <span>$220.00</span>
                <span>$215.00</span>
              </div>
            </div>

            {/* Bottom Sub-window: RSI (14) indicator */}
            <div className="h-28 bg-[#10131b] border-t border-[#2a2e39] p-3 flex flex-col justify-between relative">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#868993] z-10">
                <span className="font-semibold text-white">RSI (14, close)</span>
                <span className="text-purple-400 font-bold">58.42</span>
              </div>
              <svg className="w-full h-16 pr-18" preserveAspectRatio="none" viewBox="0 0 1000 60">
                <line x1="0" y1="18" x2="1000" y2="18" stroke="#f23645" strokeDasharray="3 3" opacity="0.4" />
                <line x1="0" y1="42" x2="1000" y2="42" stroke="#089981" strokeDasharray="3 3" opacity="0.4" />
                <path
                  d="M 0 35 Q 150 25 300 45 T 600 20 T 900 35 T 1000 24"
                  fill="none"
                  stroke="#ab47bc"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>

          {/* Right Workstation Sidebar */}
          <div className="w-72 sm:w-80 bg-[#131722] border-l border-[#2a2e39] flex flex-col shrink-0">
            {/* Sidebar Tabs */}
            <div className="flex border-b border-[#2a2e39] text-xs font-medium">
              <button
                onClick={() => setSidebarTab('trade')}
                className={`flex-1 py-2.5 text-center transition cursor-pointer ${
                  sidebarTab === 'trade'
                    ? 'text-white border-b-2 border-[#2962ff] bg-[#1e222d]'
                    : 'text-[#868993] hover:text-white'
                }`}
              >
                Paper Trade
              </button>
              <button
                onClick={() => setSidebarTab('watchlist')}
                className={`flex-1 py-2.5 text-center transition cursor-pointer ${
                  sidebarTab === 'watchlist'
                    ? 'text-white border-b-2 border-[#2962ff] bg-[#1e222d]'
                    : 'text-[#868993] hover:text-white'
                }`}
              >
                Watchlist
              </button>
              <button
                onClick={() => setSidebarTab('depth')}
                className={`flex-1 py-2.5 text-center transition cursor-pointer ${
                  sidebarTab === 'depth'
                    ? 'text-white border-b-2 border-[#2962ff] bg-[#1e222d]'
                    : 'text-[#868993] hover:text-white'
                }`}
              >
                Order Book
              </button>
            </div>

            {/* Sidebar Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {sidebarTab === 'trade' && (
                <div className="space-y-4">
                  {/* Buy / Sell Toggle Buttons */}
                  <div className="grid grid-cols-2 gap-2 p-1 bg-[#0a0d14] rounded-xl border border-[#2a2e39]">
                    <button
                      onClick={() => setOrderSide('buy')}
                      className={`py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                        orderSide === 'buy'
                          ? 'bg-[#089981] text-white shadow-md'
                          : 'text-[#868993] hover:text-white'
                      }`}
                    >
                      BUY
                    </button>
                    <button
                      onClick={() => setOrderSide('sell')}
                      className={`py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                        orderSide === 'sell'
                          ? 'bg-[#f23645] text-white shadow-md'
                          : 'text-[#868993] hover:text-white'
                      }`}
                    >
                      SELL
                    </button>
                  </div>

                  {/* Order Type */}
                  <div className="flex rounded-lg bg-[#1e222d] p-0.5 text-xs">
                    <button
                      onClick={() => setOrderType('market')}
                      className={`flex-1 py-1.5 rounded transition ${
                        orderType === 'market' ? 'bg-[#2962ff] text-white font-medium' : 'text-[#868993]'
                      }`}
                    >
                      Market
                    </button>
                    <button
                      onClick={() => setOrderType('limit')}
                      className={`flex-1 py-1.5 rounded transition ${
                        orderType === 'limit' ? 'bg-[#2962ff] text-white font-medium' : 'text-[#868993]'
                      }`}
                    >
                      Limit
                    </button>
                  </div>

                  {/* Quantity Stepper */}
                  <div>
                    <label className="text-xs text-[#868993] block mb-1">Quantity (Units)</label>
                    <div className="flex items-center border border-[#2a2e39] rounded-xl bg-[#0a0d14] overflow-hidden">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-2.5 text-[#868993] hover:text-white hover:bg-[#1e222d]"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="flex-1 bg-transparent text-center font-mono font-bold text-white text-sm focus:outline-none"
                      />
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-2.5 text-[#868993] hover:text-white hover:bg-[#1e222d]"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="p-3 rounded-xl bg-[#0a0d14] border border-[#2a2e39] space-y-2 text-xs font-mono">
                    <div className="flex justify-between text-[#868993]">
                      <span>Execution Price:</span>
                      <span className="text-white">${asset.currentPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-[#868993]">
                      <span>Estimated Total:</span>
                      <span className="text-white font-bold">
                        ${(asset.currentPrice * quantity).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-[#868993]">
                      <span>Commission:</span>
                      <span className="text-[#089981]">$0.00 (Paper)</span>
                    </div>
                  </div>

                  <button
                    onClick={handlePlaceOrder}
                    className={`w-full py-3 rounded-xl text-sm font-bold text-white shadow-xl transition cursor-pointer ${
                      orderSide === 'buy'
                        ? 'bg-[#089981] hover:bg-[#078570] shadow-emerald-500/20'
                        : 'bg-[#f23645] hover:bg-[#d92c3a] shadow-red-500/20'
                    }`}
                  >
                    Place {orderSide.toUpperCase()} Order
                  </button>
                </div>
              )}

              {sidebarTab === 'watchlist' && (
                <div className="space-y-1">
                  {ACTIVE_STOCKS.map((stock) => (
                    <button
                      key={stock.ticker}
                      onClick={() => onSelectSymbol(stock.ticker)}
                      className={`w-full p-2 rounded-lg text-left transition flex items-center justify-between cursor-pointer ${
                        activeSymbol === stock.ticker ? 'bg-[#1e222d] border border-[#2962ff]/40' : 'hover:bg-[#1e222d]'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-xs text-white">{stock.ticker}</div>
                        <div className="text-[11px] text-[#868993] truncate max-w-[120px]">{stock.name}</div>
                      </div>
                      <div className="text-right font-mono">
                        <div className="text-xs font-bold text-white">${stock.price.toFixed(2)}</div>
                        <div className={`text-[11px] ${stock.changePercent >= 0 ? 'text-[#089981]' : 'text-[#f23645]'}`}>
                          {stock.changePercent >= 0 ? `+${stock.changePercent}%` : `${stock.changePercent}%`}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {sidebarTab === 'depth' && (
                <div className="space-y-3 font-mono text-xs">
                  <div className="text-[#868993] text-[11px] font-sans">Level 2 Depth of Market</div>
                  {/* Asks */}
                  <div className="space-y-1 text-right text-[#f23645]">
                    <div className="flex justify-between">
                      <span className="text-[#868993] font-sans">Price</span>
                      <span className="text-[#868993] font-sans">Size</span>
                    </div>
                    {[
                      { p: (asset.currentPrice + 0.45).toFixed(2), s: '1,450' },
                      { p: (asset.currentPrice + 0.3).toFixed(2), s: '2,820' },
                      { p: (asset.currentPrice + 0.15).toFixed(2), s: '4,100' },
                    ].map((row, i) => (
                      <div key={i} className="flex justify-between hover:bg-[#1e222d] px-1 py-0.5 rounded">
                        <span>${row.p}</span>
                        <span>{row.s}</span>
                      </div>
                    ))}
                  </div>

                  <div className="py-1 px-2 bg-[#0a0d14] rounded border border-[#2a2e39] text-center font-bold text-white">
                    Spread: $0.02
                  </div>

                  {/* Bids */}
                  <div className="space-y-1 text-right text-[#089981]">
                    {[
                      { p: (asset.currentPrice - 0.05).toFixed(2), s: '5,200' },
                      { p: (asset.currentPrice - 0.2).toFixed(2), s: '3,450' },
                      { p: (asset.currentPrice - 0.35).toFixed(2), s: '1,980' },
                    ].map((row, i) => (
                      <div key={i} className="flex justify-between hover:bg-[#1e222d] px-1 py-0.5 rounded">
                        <span>${row.p}</span>
                        <span>{row.s}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
