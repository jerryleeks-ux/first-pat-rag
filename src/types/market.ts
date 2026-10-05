export interface TickerData {
  symbol: string;
  name: string;
  category: string;
  price: number;
  changePercent: number;
  changePts: number;
  currency: string;
  sparkline: number[];
  unit?: string;
  digits?: number;
}

export interface ChartDataPoint {
  date: string;
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  ema20?: number;
  sma50?: number;
  rsi?: number;
  upperBand?: number;
  lowerBand?: number;
}

export interface CommunityIdea {
  id: string;
  title: string;
  description: string;
  fullAnalysis: string;
  symbol: string;
  exchange: string;
  timeframe: string;
  type: 'LONG' | 'SHORT' | 'NEUTRAL';
  imageUrl: string;
  author: {
    name: string;
    handle: string;
    avatarColor: string;
    initial: string;
    followers: string;
  };
  postedAgo: string;
  boosts: number;
  commentsCount: number;
  entryPrice?: number;
  targetPrice?: number;
  stopLoss?: number;
}

export interface PineScriptItem {
  id: string;
  title: string;
  category: 'STRATEGY' | 'INDICATOR' | 'OSCILLATOR';
  boosts: string;
  description: string;
  author: string;
  version: string;
  codeSnippet: string;
  tags: string[];
}

export interface StockScreenerItem {
  ticker: string;
  name: string;
  price: number;
  changePercent: number;
  volume: string;
  marketCap: string;
  rating: 'Strong Buy' | 'Buy' | 'Hold' | 'Sell';
  ratingColor: string;
  logoColor: string;
  initial: string;
  sector: string;
  peRatio: number;
  high52: number;
  low52: number;
}
