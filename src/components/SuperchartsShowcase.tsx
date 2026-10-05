import React, { useState, useRef } from 'react';
import { CHART_ASSETS } from '../data/marketData';
import { MousePointer, TrendingUp, Sliders, ArrowUpDown, Trash2, BarChart2, CandlestickChart, Activity } from 'lucide-react';

interface SuperchartsShowcaseProps {
  activeSymbol: string;
  onChangeSymbol: (symbol: string) => void;
  onLaunchFullChart: () => void;
}

export const SuperchartsShowcase: React.FC<SuperchartsShowcaseProps> = ({
  activeSymbol,
  onChangeSymbol,
  onLaunchFullChart,
}) => {
  const [timeframe, setTimeframe] = useState<'1D' | '1W' | '1M' | '1Y'>('1W');
  const [chartType, setChartType] = useState<'area' | 'candles'>('area');
  const [activeTool, setActiveTool] = useState<'cursor' | 'trendline' | 'fibonacci' | 'position'>('cursor');
  const [showEMA, setShowEMA] = useState(true);
  const [showVolume, setShowVolume] = useState(true);

  // Mouse tracking state for crosshair
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const chartContainerRef = useRef<HTMLDivElement>(null);

  // Fallback to AAPL if activeSymbol doesn't exist
  const asset = CHART_ASSETS[activeSymbol] || CHART_ASSETS['AAPL'];
  const chartData = asset.data[timeframe] || asset.data['1W'];

  const timeframes: ('1D' | '1W' | '1M' | '1Y')[] = ['1D', '1W', '1M', '1Y'];
  const quickSymbols = ['AAPL', 'NVDA', 'BTCUSD'];

  // Handle crosshair calculation
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!chartContainerRef.current) return;
    const rect = chartContainerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width - 64, e.clientX - rect.left)); // leave 64px for right axis
    const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top));
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos(null);
  };

  // Price calculations for axis
  const minPrice = Math.min(...chartData.map((d) => d.low)) * 0.985;
  const maxPrice = Math.max(...chartData.map((d) => d.high)) * 1.015;
  const priceRange = maxPrice - minPrice || 1;

  // Approximate price under mouse
  const hoverPrice = mousePos && chartContainerRef.current
    ? maxPrice - (mousePos.y / chartContainerRef.current.clientHeight) * priceRange
    : null;

  return (
    <section id="supercharts-section" className="py-12 sm:py-16 px-4 sm:px-6 max-w-[1400px] mx-auto" data-purpose="supercharts-preview">
      <div className="border border-[#2a2e39] rounded-2xl bg-[#0a0d14] overflow-hidden shadow-2xl">
        {/* Top header bar of chart module */}
        <div className="border-b border-[#2a2e39] bg-[#131722] px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <div>
              <div className="flex items-center space-x-2.5 sm:space-x-3">
                <span className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  {asset.name}
                </span>
                <span className="px-2 py-0.5 rounded text-xs font-mono bg-[#1e222d] text-white border border-[#2a2e39]">
                  {asset.exchange}
                </span>
                <span className="text-xs text-[#089981] font-mono font-medium">
                  +{asset.changePts.toFixed(2)} (+{asset.changePercent.toFixed(2)}%)
                </span>
              </div>
              <p className="text-xs text-[#868993] mt-0.5 hidden sm:block">
                {asset.description}
              </p>
            </div>

            {/* Quick Symbol Switcher */}
            <div className="flex items-center space-x-1.5 pt-1 sm:pt-0 sm:pl-3 sm:border-l sm:border-[#2a2e39]">
              {quickSymbols.map((sym) => (
                <button
                  key={sym}
                  onClick={() => onChangeSymbol(sym)}
                  className={`px-2 py-1 text-[11px] font-mono rounded transition cursor-pointer ${
                    activeSymbol === sym
                      ? 'bg-[#2962ff]/20 text-[#2962ff] font-bold border border-[#2962ff]/40'
                      : 'text-[#868993] hover:text-white bg-[#1e222d]'
                  }`}
                >
                  {sym}
                </button>
              ))}
            </div>
          </div>

          {/* Timeframe & Full Chart controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Chart type toggle */}
            <div className="hidden sm:flex items-center bg-[#1e222d] p-0.5 rounded border border-[#2a2e39]">
              <button
                onClick={() => setChartType('area')}
                title="Area / Line View"
                className={`p-1.5 rounded transition ${chartType === 'area' ? 'bg-[#2962ff] text-white' : 'text-[#868993] hover:text-white'}`}
              >
                <Activity className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setChartType('candles')}
                title="Candlestick View"
                className={`p-1.5 rounded transition ${chartType === 'candles' ? 'bg-[#2962ff] text-white' : 'text-[#868993] hover:text-white'}`}
              >
                <CandlestickChart className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Timeframe buttons */}
            <div className="flex items-center space-x-1">
              {timeframes.map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`text-xs px-2.5 py-1 rounded transition cursor-pointer ${
                    timeframe === tf
                      ? 'bg-[#2962ff] text-white font-medium shadow-sm'
                      : 'bg-[#1e222d] text-[#d1d4dc] hover:text-white'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>

            <button
              onClick={onLaunchFullChart}
              className="text-xs font-semibold text-white bg-[#2962ff] hover:bg-[#1e53e5] px-3.5 py-1.5 rounded-md transition shadow-md shadow-blue-500/20 hover:shadow-blue-500/30 cursor-pointer whitespace-nowrap"
            >
              Launch full chart
            </button>
          </div>
        </div>

        {/* Financial Chart Graphic Viewport */}
        <div
          ref={chartContainerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative w-full h-[400px] bg-[#131722] p-4 sm:p-6 flex flex-col justify-between overflow-hidden cursor-crosshair select-none"
        >
          {/* Subtle Background Grid Lines */}
          <div className="absolute inset-0 grid grid-rows-6 grid-cols-8 pointer-events-none opacity-20">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="border-b border-r border-[#2a2e39]" />
            ))}
          </div>

          {/* SVG Vector Chart */}
          <svg className="w-full h-full pr-16" preserveAspectRatio="none" viewBox="0 0 1000 320">
            <defs>
              <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#2962ff" stopOpacity="0.38" />
                <stop offset="100%" stopColor="#2962ff" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Area Chart Mode */}
            {chartType === 'area' && (
              <>
                {/* Shaded Area fill */}
                <path
                  d="M 0 240 Q 150 210 250 250 T 450 180 T 650 120 T 800 140 T 1000 70 L 1000 320 L 0 320 Z"
                  fill="url(#chartGradient)"
                />
                {/* Main Trend Line */}
                <path
                  d="M 0 240 Q 150 210 250 250 T 450 180 T 650 120 T 800 140 T 1000 70"
                  fill="none"
                  stroke="#2962ff"
                  strokeWidth="3"
                />
              </>
            )}

            {/* Candlestick Mode */}
            {chartType === 'candles' && (
              <g>
                {[
                  { x: 50, o: 245, h: 235, l: 260, c: 240, up: false },
                  { x: 150, o: 240, h: 220, l: 248, c: 225, up: true },
                  { x: 250, o: 225, h: 215, l: 255, c: 250, up: false },
                  { x: 350, o: 250, h: 200, l: 252, c: 208, up: true },
                  { x: 450, o: 208, h: 175, l: 212, c: 180, up: true },
                  { x: 550, o: 180, h: 140, l: 185, c: 148, up: true },
                  { x: 650, o: 148, h: 110, l: 155, c: 120, up: true },
                  { x: 750, o: 120, h: 105, l: 145, c: 138, up: false },
                  { x: 850, o: 138, h: 95, l: 140, c: 102, up: true },
                  { x: 950, o: 102, h: 65, l: 105, c: 70, up: true },
                ].map((candle, idx) => {
                  const color = candle.up ? '#089981' : '#f23645';
                  const top = Math.min(candle.o, candle.c);
                  const height = Math.max(4, Math.abs(candle.o - candle.c));
                  return (
                    <g key={idx}>
                      {/* Wick */}
                      <line
                        x1={candle.x}
                        y1={candle.h}
                        x2={candle.x}
                        y2={candle.l}
                        stroke={color}
                        strokeWidth="1.5"
                      />
                      {/* Body */}
                      <rect
                        x={candle.x - 8}
                        y={top}
                        width="16"
                        height={height}
                        fill={color}
                        rx="1"
                      />
                    </g>
                  );
                })}
              </g>
            )}

            {/* EMA 20 Moving Average (Orange dashed line) */}
            {showEMA && (
              <path
                d="M 0 260 Q 200 240 400 200 T 700 160 T 1000 110"
                fill="none"
                stroke="#ff9800"
                strokeDasharray="4 4"
                strokeWidth="1.8"
              />
            )}

            {/* Volume Histogram at bottom */}
            {showVolume && (
              <g opacity="0.3">
                {[
                  { x: 20, h: 40, up: true },
                  { x: 80, h: 60, up: false },
                  { x: 140, h: 75, up: true },
                  { x: 200, h: 50, up: true },
                  { x: 260, h: 90, up: false },
                  { x: 320, h: 45, up: true },
                  { x: 380, h: 80, up: true },
                  { x: 440, h: 105, up: true },
                  { x: 500, h: 70, up: false },
                  { x: 560, h: 85, up: true },
                  { x: 620, h: 110, up: true },
                  { x: 680, h: 65, up: false },
                  { x: 740, h: 95, up: false },
                  { x: 800, h: 125, up: true },
                  { x: 860, h: 115, up: true },
                  { x: 920, h: 140, up: true },
                  { x: 980, h: 130, up: true },
                ].map((vol, i) => (
                  <rect
                    key={i}
                    x={vol.x}
                    y={320 - vol.h}
                    width="12"
                    height={vol.h}
                    fill={vol.up ? '#089981' : '#f23645'}
                    rx="1"
                  />
                ))}
              </g>
            )}

            {/* Indicator Point & Callout Tag on latest price */}
            <circle cx="800" cy="140" fill="#2962ff" r="5" stroke="#ffffff" strokeWidth="2" />
          </svg>

          {/* Interactive Mouse Crosshair Overlay */}
          {mousePos && (
            <>
              {/* Horizontal Crosshair Line */}
              <div
                className="absolute left-0 right-16 border-b border-dashed border-[#868993]/60 pointer-events-none z-10"
                style={{ top: `${mousePos.y}px` }}
              />
              {/* Vertical Crosshair Line */}
              <div
                className="absolute top-0 bottom-0 border-r border-dashed border-[#868993]/60 pointer-events-none z-10"
                style={{ left: `${mousePos.x}px` }}
              />
              {/* Crosshair Price Callout on Right Axis */}
              {hoverPrice && (
                <div
                  className="absolute right-0 bg-[#2962ff] text-white text-[10px] font-mono px-1.5 py-0.5 rounded-l z-20 pointer-events-none shadow"
                  style={{ top: `${Math.max(10, Math.min(370, mousePos.y - 10))}px` }}
                >
                  ${hoverPrice.toFixed(2)}
                </div>
              )}
            </>
          )}

          {/* Right Side Price Axis mock */}
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-[#131722]/85 backdrop-blur border-l border-[#2a2e39] flex flex-col justify-between py-6 text-[11px] font-mono text-[#868993] text-right pr-2 pointer-events-none">
            <span>$238.00</span>
            <span>$234.00</span>
            <span className="bg-[#089981] text-white px-1 py-0.5 rounded font-bold text-[10px] self-end shadow-sm">
              ${asset.currentPrice.toFixed(2)}
            </span>
            <span>$228.00</span>
            <span>$224.00</span>
            <span>$220.00</span>
          </div>

          {/* Left Drawing Tools Toolbar */}
          <div className="absolute left-3 top-8 flex flex-col space-y-2 bg-[#1e222d]/95 p-1.5 rounded-lg border border-[#2a2e39] text-[#868993] shadow-lg backdrop-blur z-20">
            <button
              onClick={() => setActiveTool('cursor')}
              className={`p-1.5 rounded transition cursor-pointer ${
                activeTool === 'cursor' ? 'bg-[#2962ff] text-white' : 'hover:text-white hover:bg-[#2a2e39]'
              }`}
              title="Crosshair Cursor"
            >
              <MousePointer className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTool('trendline')}
              className={`p-1.5 rounded transition cursor-pointer ${
                activeTool === 'trendline' ? 'bg-[#2962ff] text-white' : 'hover:text-white hover:bg-[#2a2e39]'
              }`}
              title="Trend Line"
            >
              <TrendingUp className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTool('fibonacci')}
              className={`p-1.5 rounded transition cursor-pointer ${
                activeTool === 'fibonacci' ? 'bg-[#2962ff] text-white' : 'hover:text-white hover:bg-[#2a2e39]'
              }`}
              title="Fibonacci Retracement"
            >
              <Sliders className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTool('position')}
              className={`p-1.5 rounded transition cursor-pointer ${
                activeTool === 'position' ? 'bg-[#2962ff] text-white' : 'hover:text-white hover:bg-[#2a2e39]'
              }`}
              title="Long/Short Position Risk Box"
            >
              <ArrowUpDown className="w-4 h-4" />
            </button>
            <div className="border-t border-[#2a2e39] my-0.5" />
            <button
              onClick={() => {
                setShowEMA(!showEMA);
              }}
              className={`p-1.5 rounded transition cursor-pointer ${
                showEMA ? 'text-[#ff9800] bg-[#ff9800]/10' : 'hover:text-white'
              }`}
              title="Toggle EMA 20 (Orange)"
            >
              <span className="text-[10px] font-bold font-mono">EMA</span>
            </button>
            <button
              onClick={() => setShowVolume(!showVolume)}
              className={`p-1.5 rounded transition cursor-pointer ${
                showVolume ? 'text-[#089981] bg-[#089981]/10' : 'hover:text-white'
              }`}
              title="Toggle Volume Bars"
            >
              <BarChart2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
