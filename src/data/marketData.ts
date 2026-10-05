import { TickerData, CommunityIdea, PineScriptItem, StockScreenerItem, ChartDataPoint } from '../types/market';

export const ASTRONAUT_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuCYsavI9xVrPufu2pJ2bPJ-53m9vTV7KHXwCu-T1XiCLMpcS4w_Wd--DmNntxlaAj1PiXKe76551DY9jhWp4arSmRLipy_cqLhe0WDoQAux85cxABwNntGMWkF6kXzCm2C5JkbPTC0NCI3QgHeyQvEYs5XSEnK8PflSz817Whxu4GOkmeIPltg0-z3L5kepicH9ZR8HFqCqe75R_J06wzOQlBdGnLLwIqfHe_oCZ_13e_QSDdPlQqd8pA";

export const MARKET_CATEGORIES: { id: string; label: string; tickers: TickerData[] }[] = [
  {
    id: 'indices',
    label: 'Major indices',
    tickers: [
      {
        symbol: 'S&P 500',
        name: 'SPX',
        category: 'INDEX',
        price: 5864.67,
        changePercent: 0.48,
        changePts: 28.21,
        currency: 'pts',
        sparkline: [5820, 5835, 5825, 5845, 5850, 5864.67],
      },
      {
        symbol: 'Nasdaq 100',
        name: 'NDX',
        category: 'INDEX',
        price: 20387.2,
        changePercent: 0.74,
        changePts: 149.80,
        currency: 'pts',
        sparkline: [20180, 20240, 20210, 20310, 20350, 20387.2],
      },
      {
        symbol: 'Bitcoin',
        name: 'BTCUSD',
        category: 'CRYPTO',
        price: 68420.0,
        changePercent: 2.31,
        changePts: 1542.00,
        currency: 'USD',
        sparkline: [66500, 67200, 66900, 67800, 68100, 68420.0],
      },
      {
        symbol: 'Gold',
        name: 'GC1!',
        category: 'FUTURES',
        price: 2721.4,
        changePercent: 1.12,
        changePts: 30.10,
        currency: 'USD',
        sparkline: [2685, 2692, 2701, 2698, 2715, 2721.4],
      },
      {
        symbol: 'Crude Oil',
        name: 'CL1!',
        category: 'FUTURES',
        price: 70.62,
        changePercent: -1.42,
        changePts: -1.02,
        currency: 'USD',
        sparkline: [72.1, 71.8, 71.2, 71.5, 70.9, 70.62],
      },
      {
        symbol: 'US 10Y Yield',
        name: 'US10Y',
        category: 'BOND',
        price: 4.078,
        changePercent: -0.65,
        changePts: -0.027,
        currency: 'pts',
        unit: '%',
        digits: 3,
        sparkline: [4.12, 4.10, 4.09, 4.11, 4.085, 4.078],
      },
    ],
  },
  {
    id: 'crypto',
    label: 'Crypto market cap',
    tickers: [
      {
        symbol: 'Total Crypto Cap',
        name: 'TOTAL',
        category: 'CRYPTO',
        price: 2.38,
        changePercent: 3.42,
        changePts: 0.08,
        currency: 'T USD',
        sparkline: [2.28, 2.30, 2.31, 2.34, 2.36, 2.38],
      },
      {
        symbol: 'Ethereum',
        name: 'ETHUSD',
        category: 'CRYPTO',
        price: 2648.5,
        changePercent: 2.85,
        changePts: 73.40,
        currency: 'USD',
        sparkline: [2560, 2580, 2570, 2610, 2635, 2648.5],
      },
      {
        symbol: 'Solana',
        name: 'SOLUSD',
        category: 'CRYPTO',
        price: 154.20,
        changePercent: 5.12,
        changePts: 7.50,
        currency: 'USD',
        sparkline: [144, 147, 146, 150, 152, 154.2],
      },
      {
        symbol: 'BTC Dominance',
        name: 'BTC.D',
        category: 'RATIO',
        price: 58.74,
        changePercent: 0.22,
        changePts: 0.13,
        currency: '%',
        unit: '%',
        sparkline: [58.4, 58.5, 58.6, 58.5, 58.7, 58.74],
      },
      {
        symbol: 'BNB',
        name: 'BNBUSD',
        category: 'CRYPTO',
        price: 598.40,
        changePercent: -0.84,
        changePts: -5.10,
        currency: 'USD',
        sparkline: [608, 604, 602, 600, 599, 598.4],
      },
      {
        symbol: 'XRP',
        name: 'XRPUSD',
        category: 'CRYPTO',
        price: 0.548,
        changePercent: 1.15,
        changePts: 0.006,
        currency: 'USD',
        digits: 3,
        sparkline: [0.535, 0.538, 0.542, 0.540, 0.545, 0.548],
      },
    ],
  },
  {
    id: 'dxy',
    label: 'US Dollar index',
    tickers: [
      {
        symbol: 'DXY Index',
        name: 'DXY',
        category: 'CURRENCY',
        price: 103.48,
        changePercent: 0.14,
        changePts: 0.15,
        currency: 'pts',
        sparkline: [103.1, 103.2, 103.35, 103.25, 103.4, 103.48],
      },
      {
        symbol: 'EUR / USD',
        name: 'EURUSD',
        category: 'FOREX',
        price: 1.0864,
        changePercent: -0.18,
        changePts: -0.002,
        currency: 'USD',
        digits: 4,
        sparkline: [1.089, 1.088, 1.087, 1.0875, 1.0868, 1.0864],
      },
      {
        symbol: 'USD / JPY',
        name: 'USDJPY',
        category: 'FOREX',
        price: 149.52,
        changePercent: 0.28,
        changePts: 0.42,
        currency: 'JPY',
        digits: 2,
        sparkline: [148.9, 149.1, 149.0, 149.3, 149.4, 149.52],
      },
      {
        symbol: 'GBP / USD',
        name: 'GBPUSD',
        category: 'FOREX',
        price: 1.3045,
        changePercent: -0.09,
        changePts: -0.0012,
        currency: 'USD',
        digits: 4,
        sparkline: [1.307, 1.306, 1.305, 1.3055, 1.3048, 1.3045],
      },
      {
        symbol: 'USD / CAD',
        name: 'USDCAD',
        category: 'FOREX',
        price: 1.3812,
        changePercent: 0.11,
        changePts: 0.0015,
        currency: 'CAD',
        digits: 4,
        sparkline: [1.378, 1.379, 1.380, 1.3805, 1.381, 1.3812],
      },
      {
        symbol: 'AUD / USD',
        name: 'AUDUSD',
        category: 'FOREX',
        price: 0.6705,
        changePercent: -0.32,
        changePts: -0.0022,
        currency: 'USD',
        digits: 4,
        sparkline: [0.674, 0.673, 0.672, 0.6715, 0.671, 0.6705],
      },
    ],
  },
  {
    id: 'futures',
    label: 'Futures',
    tickers: [
      {
        symbol: 'E-Mini S&P 500',
        name: 'ES1!',
        category: 'FUTURES',
        price: 5892.25,
        changePercent: 0.52,
        changePts: 30.50,
        currency: 'USD',
        sparkline: [5845, 5860, 5855, 5878, 5885, 5892.25],
      },
      {
        symbol: 'E-Mini Nasdaq',
        name: 'NQ1!',
        category: 'FUTURES',
        price: 20495.0,
        changePercent: 0.81,
        changePts: 164.75,
        currency: 'USD',
        sparkline: [20280, 20350, 20320, 20420, 20460, 20495.0],
      },
      {
        symbol: 'Natural Gas',
        name: 'NG1!',
        category: 'FUTURES',
        price: 2.258,
        changePercent: -2.15,
        changePts: -0.05,
        currency: 'USD',
        digits: 3,
        sparkline: [2.34, 2.31, 2.29, 2.28, 2.27, 2.258],
      },
      {
        symbol: 'Copper',
        name: 'HG1!',
        category: 'FUTURES',
        price: 4.382,
        changePercent: 1.45,
        changePts: 0.063,
        currency: 'USD',
        digits: 3,
        sparkline: [4.28, 4.30, 4.32, 4.35, 4.37, 4.382],
      },
      {
        symbol: 'Silver',
        name: 'SI1!',
        category: 'FUTURES',
        price: 33.74,
        changePercent: 3.12,
        changePts: 1.02,
        currency: 'USD',
        digits: 2,
        sparkline: [32.4, 32.7, 33.0, 33.2, 33.5, 33.74],
      },
      {
        symbol: 'Corn',
        name: 'ZC1!',
        category: 'FUTURES',
        price: 404.25,
        changePercent: -0.37,
        changePts: -1.50,
        currency: 'USd',
        digits: 2,
        sparkline: [407, 406, 405.5, 405, 404.8, 404.25],
      },
    ],
  },
  {
    id: 'bonds',
    label: 'US 10Y yield',
    tickers: [
      {
        symbol: 'US 2Y Yield',
        name: 'US02Y',
        category: 'BOND',
        price: 3.952,
        changePercent: -0.45,
        changePts: -0.018,
        currency: '%',
        unit: '%',
        digits: 3,
        sparkline: [3.98, 3.97, 3.965, 3.96, 3.955, 3.952],
      },
      {
        symbol: 'US 5Y Yield',
        name: 'US05Y',
        category: 'BOND',
        price: 3.886,
        changePercent: -0.58,
        changePts: -0.023,
        currency: '%',
        unit: '%',
        digits: 3,
        sparkline: [3.92, 3.91, 3.90, 3.895, 3.89, 3.886],
      },
      {
        symbol: 'US 10Y Yield',
        name: 'US10Y',
        category: 'BOND',
        price: 4.078,
        changePercent: -0.65,
        changePts: -0.027,
        currency: '%',
        unit: '%',
        digits: 3,
        sparkline: [4.12, 4.10, 4.09, 4.11, 4.085, 4.078],
      },
      {
        symbol: 'US 30Y Yield',
        name: 'US30Y',
        category: 'BOND',
        price: 4.381,
        changePercent: -0.39,
        changePts: -0.017,
        currency: '%',
        unit: '%',
        digits: 3,
        sparkline: [4.41, 4.40, 4.395, 4.39, 4.385, 4.381],
      },
      {
        symbol: 'Germany 10Y Bund',
        name: 'DE10Y',
        category: 'BOND',
        price: 2.184,
        changePercent: -0.92,
        changePts: -0.020,
        currency: '%',
        unit: '%',
        digits: 3,
        sparkline: [2.22, 2.21, 2.20, 2.195, 2.19, 2.184],
      },
      {
        symbol: 'UK 10Y Gilt',
        name: 'GB10Y',
        category: 'BOND',
        price: 4.048,
        changePercent: -0.34,
        changePts: -0.014,
        currency: '%',
        unit: '%',
        digits: 3,
        sparkline: [4.07, 4.065, 4.06, 4.055, 4.05, 4.048],
      },
    ],
  },
  {
    id: 'inflation',
    label: 'US annual inflation rate',
    tickers: [
      {
        symbol: 'US CPI (YoY)',
        name: 'USCPI',
        category: 'MACRO',
        price: 2.4,
        changePercent: -0.10,
        changePts: -0.10,
        currency: '%',
        unit: '%',
        digits: 1,
        sparkline: [3.4, 3.2, 3.0, 2.9, 2.5, 2.4],
      },
      {
        symbol: 'Core CPI (YoY)',
        name: 'USCCPI',
        category: 'MACRO',
        price: 3.3,
        changePercent: 0.00,
        changePts: 0.00,
        currency: '%',
        unit: '%',
        digits: 1,
        sparkline: [3.8, 3.6, 3.5, 3.4, 3.3, 3.3],
      },
      {
        symbol: 'US PPI (YoY)',
        name: 'USPPI',
        category: 'MACRO',
        price: 1.8,
        changePercent: -0.20,
        changePts: -0.20,
        currency: '%',
        unit: '%',
        digits: 1,
        sparkline: [2.4, 2.3, 2.1, 2.0, 1.9, 1.8],
      },
      {
        symbol: 'Fed Funds Rate',
        name: 'FEDFUNDS',
        category: 'MACRO',
        price: 4.83,
        changePercent: -0.50,
        changePts: -0.50,
        currency: '%',
        unit: '%',
        digits: 2,
        sparkline: [5.33, 5.33, 5.33, 5.33, 4.83, 4.83],
      },
      {
        symbol: 'Eurozone CPI',
        name: 'EUCPI',
        category: 'MACRO',
        price: 1.7,
        changePercent: -0.50,
        changePts: -0.50,
        currency: '%',
        unit: '%',
        digits: 1,
        sparkline: [2.6, 2.5, 2.4, 2.2, 1.8, 1.7],
      },
      {
        symbol: 'UK CPI',
        name: 'UKCPI',
        category: 'MACRO',
        price: 1.7,
        changePercent: -0.50,
        changePts: -0.50,
        currency: '%',
        unit: '%',
        digits: 1,
        sparkline: [2.3, 2.2, 2.2, 2.0, 1.8, 1.7],
      },
    ],
  },
];

export const CHART_ASSETS: {
  [symbol: string]: {
    name: string;
    exchange: string;
    currentPrice: number;
    changePts: number;
    changePercent: number;
    currency: string;
    description: string;
    data: { [timeframe: string]: ChartDataPoint[] };
  };
} = {
  AAPL: {
    name: 'Apple Inc. (AAPL)',
    exchange: 'NASDAQ',
    currentPrice: 231.41,
    changePts: 1.45,
    changePercent: 0.63,
    currency: 'USD',
    description: 'Supercharts with hundreds of built-in indicators and intelligent drawing tools',
    data: {
      '1D': [
        { date: '09:30', time: '09:30', open: 229.8, high: 230.4, low: 229.5, close: 230.1, volume: 3400000, ema20: 229.7, sma50: 229.4 },
        { date: '10:30', time: '10:30', open: 230.1, high: 231.0, low: 229.9, close: 230.8, volume: 4200000, ema20: 230.0, sma50: 229.6 },
        { date: '11:30', time: '11:30', open: 230.8, high: 231.2, low: 230.3, close: 230.6, volume: 2900000, ema20: 230.3, sma50: 229.9 },
        { date: '12:30', time: '12:30', open: 230.6, high: 231.5, low: 230.5, close: 231.2, volume: 2600000, ema20: 230.6, sma50: 230.1 },
        { date: '13:30', time: '13:30', open: 231.2, high: 231.9, low: 231.0, close: 231.7, volume: 3800000, ema20: 230.9, sma50: 230.4 },
        { date: '14:30', time: '14:30', open: 231.7, high: 232.0, low: 231.2, close: 231.41, volume: 5100000, ema20: 231.1, sma50: 230.7 },
      ],
      '1W': [
        { date: 'Mon', time: 'Mon', open: 225.4, high: 227.1, low: 224.8, close: 226.5, volume: 24500000, ema20: 224.2, sma50: 222.0 },
        { date: 'Tue', time: 'Tue', open: 226.5, high: 228.2, low: 225.9, close: 227.8, volume: 28100000, ema20: 225.0, sma50: 222.8 },
        { date: 'Wed', time: 'Wed', open: 227.8, high: 229.5, low: 227.0, close: 228.9, volume: 26900000, ema20: 226.1, sma50: 223.7 },
        { date: 'Thu', time: 'Thu', open: 228.9, high: 230.6, low: 228.2, close: 229.96, volume: 31200000, ema20: 227.4, sma50: 224.8 },
        { date: 'Fri', time: 'Fri', open: 229.9, high: 232.0, low: 229.4, close: 231.41, volume: 38400000, ema20: 228.8, sma50: 226.1 },
      ],
      '1M': [
        { date: 'W1', time: 'W1', open: 218.2, high: 222.5, low: 217.0, close: 221.4, volume: 110000000, ema20: 216.5, sma50: 212.0 },
        { date: 'W2', time: 'W2', open: 221.4, high: 225.8, low: 220.1, close: 224.9, volume: 125000000, ema20: 219.0, sma50: 214.5 },
        { date: 'W3', time: 'W3', open: 224.9, high: 228.4, low: 223.2, close: 227.6, volume: 118000000, ema20: 222.0, sma50: 218.0 },
        { date: 'W4', time: 'W4', open: 227.6, high: 232.0, low: 226.5, close: 231.41, volume: 142000000, ema20: 225.5, sma50: 221.2 },
      ],
      '1Y': [
        { date: 'Nov 23', time: 'Nov 23', open: 189.5, high: 192.5, low: 187.0, close: 189.9, volume: 480000000, ema20: 185.0, sma50: 180.0 },
        { date: 'Jan 24', time: 'Jan 24', open: 185.2, high: 196.4, low: 180.2, close: 184.4, volume: 520000000, ema20: 187.0, sma50: 182.0 },
        { date: 'Mar 24', time: 'Mar 24', open: 180.8, high: 183.1, low: 168.5, close: 171.5, volume: 590000000, ema20: 181.0, sma50: 180.5 },
        { date: 'May 24', time: 'May 24', open: 173.4, high: 193.0, low: 172.5, close: 192.2, volume: 640000000, ema20: 184.0, sma50: 182.0 },
        { date: 'Jul 24', time: 'Jul 24', open: 210.0, high: 237.2, low: 209.0, close: 222.1, volume: 720000000, ema20: 202.0, sma50: 194.0 },
        { date: 'Sep 24', time: 'Sep 24', open: 222.1, high: 233.1, low: 213.9, close: 227.5, volume: 610000000, ema20: 218.0, sma50: 208.0 },
        { date: 'Oct 24', time: 'Oct 24', open: 227.5, high: 238.0, low: 224.0, close: 231.41, volume: 580000000, ema20: 226.0, sma50: 215.0 },
      ],
    },
  },
  NVDA: {
    name: 'NVIDIA Corporation (NVDA)',
    exchange: 'NASDAQ',
    currentPrice: 138.25,
    changePts: 4.21,
    changePercent: 3.14,
    currency: 'USD',
    description: 'Blackwell architecture rollouts driving accelerated institutional accumulation',
    data: {
      '1D': [
        { date: '09:30', time: '09:30', open: 134.5, high: 135.2, low: 134.1, close: 135.0, volume: 6800000, ema20: 134.2, sma50: 133.5 },
        { date: '11:00', time: '11:00', open: 135.0, high: 136.8, low: 134.9, close: 136.5, volume: 9200000, ema20: 135.1, sma50: 134.1 },
        { date: '13:00', time: '13:00', open: 136.5, high: 137.9, low: 136.2, close: 137.4, volume: 7500000, ema20: 136.2, sma50: 134.9 },
        { date: '15:00', time: '15:00', open: 137.4, high: 138.8, low: 137.1, close: 138.25, volume: 11400000, ema20: 137.1, sma50: 135.8 },
      ],
      '1W': [
        { date: 'Mon', time: 'Mon', open: 131.0, high: 133.4, low: 130.5, close: 132.8, volume: 38000000, ema20: 129.5, sma50: 126.0 },
        { date: 'Tue', time: 'Tue', open: 132.8, high: 134.5, low: 132.1, close: 133.9, volume: 41000000, ema20: 131.0, sma50: 127.5 },
        { date: 'Wed', time: 'Wed', open: 133.9, high: 136.2, low: 133.5, close: 135.6, volume: 44000000, ema20: 132.8, sma50: 129.0 },
        { date: 'Thu', time: 'Thu', open: 135.6, high: 137.1, low: 134.9, close: 136.4, volume: 46000000, ema20: 134.2, sma50: 130.5 },
        { date: 'Fri', time: 'Fri', open: 136.4, high: 139.1, low: 136.0, close: 138.25, volume: 52000000, ema20: 135.8, sma50: 132.0 },
      ],
      '1M': [
        { date: 'W1', time: 'W1', open: 121.0, high: 126.5, low: 119.5, close: 125.0, volume: 180000000, ema20: 120.0, sma50: 116.0 },
        { date: 'W2', time: 'W2', open: 125.0, high: 130.2, low: 124.0, close: 129.8, volume: 195000000, ema20: 124.0, sma50: 119.0 },
        { date: 'W3', time: 'W3', open: 129.8, high: 134.5, low: 128.5, close: 133.4, volume: 210000000, ema20: 128.0, sma50: 122.5 },
        { date: 'W4', time: 'W4', open: 133.4, high: 139.5, low: 132.0, close: 138.25, volume: 240000000, ema20: 133.0, sma50: 126.0 },
      ],
      '1Y': [
        { date: 'Nov 23', time: 'Nov 23', open: 45.0, high: 50.2, low: 44.0, close: 48.5, volume: 620000000, ema20: 44.0, sma50: 41.0 },
        { date: 'Feb 24', time: 'Feb 24', open: 63.0, high: 82.5, low: 62.5, close: 79.1, volume: 840000000, ema20: 68.0, sma50: 55.0 },
        { date: 'May 24', time: 'May 24', open: 87.0, high: 115.0, low: 86.0, close: 109.6, volume: 980000000, ema20: 92.0, sma50: 78.0 },
        { date: 'Jul 24', time: 'Jul 24', open: 122.0, high: 140.7, low: 115.0, close: 125.4, volume: 920000000, ema20: 116.0, sma50: 99.0 },
        { date: 'Oct 24', time: 'Oct 24', open: 123.0, high: 140.0, low: 120.0, close: 138.25, volume: 850000000, ema20: 128.0, sma50: 112.0 },
      ],
    },
  },
  BTCUSD: {
    name: 'Bitcoin (BTC / USD)',
    exchange: 'CRYPTO',
    currentPrice: 68420.0,
    changePts: 1542.0,
    changePercent: 2.31,
    currency: 'USD',
    description: 'Breakout from multi-month descending wedge with surging spot ETF inflows',
    data: {
      '1D': [
        { date: '00:00', time: '00:00', open: 66800, high: 67100, low: 66700, close: 66950, volume: 14000, ema20: 66700, sma50: 66400 },
        { date: '06:00', time: '06:00', open: 66950, high: 67500, low: 66850, close: 67420, volume: 18500, ema20: 67050, sma50: 66650 },
        { date: '12:00', time: '12:00', open: 67420, high: 68100, low: 67300, close: 67950, volume: 22000, ema20: 67500, sma50: 66900 },
        { date: '18:00', time: '18:00', open: 67950, high: 68650, low: 67800, close: 68420, volume: 29000, ema20: 67900, sma50: 67200 },
      ],
      '1W': [
        { date: 'Mon', time: 'Mon', open: 63200, high: 64500, low: 62800, close: 64100, volume: 95000, ema20: 63000, sma50: 61800 },
        { date: 'Wed', time: 'Wed', open: 64100, high: 66800, low: 63900, close: 66200, volume: 112000, ema20: 64500, sma50: 62600 },
        { date: 'Fri', time: 'Fri', open: 66200, high: 68650, low: 65900, close: 68420, volume: 138000, ema20: 66200, sma50: 63800 },
      ],
      '1M': [
        { date: 'W1', time: 'W1', open: 58500, high: 61200, low: 57800, close: 60800, volume: 420000, ema20: 59000, sma50: 57500 },
        { date: 'W2', time: 'W2', open: 60800, high: 63500, low: 60100, close: 62900, volume: 480000, ema20: 61200, sma50: 58900 },
        { date: 'W3', time: 'W3', open: 62900, high: 65800, low: 62100, close: 65100, volume: 510000, ema20: 63500, sma50: 60400 },
        { date: 'W4', time: 'W4', open: 65100, high: 68900, low: 64800, close: 68420, volume: 590000, ema20: 66000, sma50: 62200 },
      ],
      '1Y': [
        { date: 'Nov 23', time: 'Nov 23', open: 34500, high: 38200, low: 34000, close: 37700, volume: 1900000, ema20: 34000, sma50: 30000 },
        { date: 'Feb 24', time: 'Feb 24', open: 42500, high: 64000, low: 41800, close: 61800, volume: 2800000, ema20: 49000, sma50: 42000 },
        { date: 'Mar 24', time: 'Mar 24', open: 61800, high: 73750, low: 60800, close: 71200, volume: 3200000, ema20: 62000, sma50: 51000 },
        { date: 'Jun 24', time: 'Jun 24', open: 67800, high: 71500, low: 58500, close: 62700, volume: 2400000, ema20: 64000, sma50: 58000 },
        { date: 'Aug 24', time: 'Aug 24', open: 64500, high: 65200, low: 49200, close: 58900, volume: 2900000, ema20: 61000, sma50: 59000 },
        { date: 'Oct 24', time: 'Oct 24', open: 63200, high: 68900, low: 60200, close: 68420, volume: 2600000, ema20: 64500, sma50: 61500 },
      ],
    },
  },
};

export const COMMUNITY_IDEAS: CommunityIdea[] = [
  {
    id: 'idea-btc-wave-2',
    title: 'Bitcoin: Wave 2 Could Target $75,000 Before Next Macro Leg',
    description: 'Elliott wave count indicates impulse completion with clear ascending triangle support testing key Fibonacci confluence.',
    fullAnalysis: `The current 4-hour chart demonstrates clear impulsive behavior exiting the sub-$60K accumulation pocket. We observe a cleanly developed Wave 1 reaching $68,400 with exceptional volume confirmation across CME futures and spot desks.

Key Technical Factors:
1. Retest of 0.618 Fib retracement at $66,200 held firmly on aggressive dip buying.
2. Volume weighted average price (VWAP) anchored to the monthly low provides dynamic support.
3. Target 1 remains the psychological $72,500 boundary, with extended wave target projecting to $75,400 into the quarterly close.

Risk Management: Invalidation sits below the lower support trendline at $64,800. Maintain strict position sizing.`,
    symbol: 'BTCUSD',
    exchange: 'CRYPTO',
    timeframe: '4h',
    type: 'LONG',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1TWIFi9zSjxMRDLvtnVHH3dYpjJP7mYNxvtAsvRlal68-jelaNXoDRqkley8S5LRjW9ERAnagv_Dzvpoo3dyRpapagjG9f5PwI1GWo6NQXcBeGEpUIXCymq6oa8GnhNN8OvRgUwgjx4CiOEshwIy4qr0x8wFhlSXil3ssn64Mz-dQcXzI_Fzhdwazatnguckgfxkwg_Adipjww9UJeQviksv3k5TLgT-uhdIV5IozvFoPYraub26xTw',
    author: {
      name: 'Roman Pavelko',
      handle: 'Roman_Pavelko_EWA',
      avatarColor: 'bg-blue-600',
      initial: 'R',
      followers: '34.2k',
    },
    postedAgo: '3h ago',
    boosts: 1420,
    commentsCount: 88,
    entryPrice: 67800,
    targetPrice: 75400,
    stopLoss: 64800,
  },
  {
    id: 'idea-aapl-flexible',
    title: 'AAPL | Flexible Time Frames, Clearer Entries on Daily',
    description: 'Strong order book volume shelf at $226 creates high probability risk-to-reward ratio with target at previous peak.',
    fullAnalysis: `Apple has consolidated in a tidy bull flag pattern directly below its historical all-time high. On the daily time frame, we note declining sell volume alongside a bullish cross on the MACD histogram.

Key Observations:
- Institutional volume profile shows massive acceptance between $225 and $228.
- 50-day moving average is sloping upward at a 35-degree angle, demonstrating healthy trend momentum.
- Earnings catalyst and Apple Intelligence rollouts expected to create sustained multiple expansion.

Setup:
- Entry: $228.00 - $231.50
- Stop Loss: $223.50 (below weekly pivot)
- Primary Target: $242.00
- Secondary Target: $255.00`,
    symbol: 'AAPL',
    exchange: 'NASDAQ',
    timeframe: '1D',
    type: 'LONG',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcdTYW71p-Zj0NHKWBlYfLIb3qIsN2M20T6N83JKOwLpxnhZgHQT-lft_S4Yu8_qqESU_YDL6qeJOTm3Us_5KjBz8QEekEw6HQPKb-QzLV2atNJ7_oeVOROMYdYEEloTXQY1mWVMALgivI2D3HqSOrio9OWOZVVD3mYLXaYqIiSOYg5eQQpgsSc2aw9uGvucphwSeHLsZj5i1ZRrjkO_oRsBBBKGUI_XHnFH9v96GolV_qDXIy0w5gsg',
    author: {
      name: 'Dave K Clinton',
      handle: 'davekclinton76',
      avatarColor: 'bg-purple-600',
      initial: 'D',
      followers: '19.8k',
    },
    postedAgo: '6h ago',
    boosts: 980,
    commentsCount: 52,
    entryPrice: 229.5,
    targetPrice: 245.0,
    stopLoss: 223.5,
  },
  {
    id: 'idea-nke-line-untouched',
    title: 'Nike 1M: The line untouched since the late 1980s',
    description: 'Multi-decade ascending support line undergoing major pressure amid macro retail headwinds and inventory restructuring.',
    fullAnalysis: `Nike (NKE) is testing a multi-decade trendline originating back in 1989. While long-term value investors are watching closely, the monthly momentum indicators have printed consecutive bear divergences.

Technical Breakdown:
1. Loss of the 200-month SMA ($88.50) marked a structural regime shift.
2. Direct-to-consumer margins continue compression while competitor brand share gains velocity.
3. A breakdown below $78 could trigger long-term capitulation towards the $65-$70 demand zone.

Short Bias:
- Look for failed relief bounces into $84 - $86 to initiate hedged downside positioning.
- Invalidation on monthly close above $92.50.`,
    symbol: 'NKE',
    exchange: 'NYSE',
    timeframe: '1M',
    type: 'SHORT',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2l8IgwRSQ2BHCHbUrTc7WGM0Vf_R1qYtKt62gKxonsxvZAK_RLL-uUqPAR8GdSj3_An-4JR6U1LjfAItN-PpC_Nco5ZGCVDibxQBS8aDK3AqPZxyZaEppzl1z7GjRWX7LucEi_K-_xWZQaa74TQWe-NjG_aKukOOB65vRJKXK5GJcN9OPIV55iaQYVZUkdp6LIAvBVkGXIqo0btch8vaAV_gdp6OpMqpAtevPCzT2orVQesmi72K2ag',
    author: {
      name: 'Structura Markets',
      handle: 'StructuraMarkets',
      avatarColor: 'bg-emerald-600',
      initial: 'S',
      followers: '51.4k',
    },
    postedAgo: '8h ago',
    boosts: 2150,
    commentsCount: 147,
    entryPrice: 83.2,
    targetPrice: 68.0,
    stopLoss: 89.5,
  },
  {
    id: 'idea-xauusd-corrective',
    title: 'XAUUSD: Corrective Decline Nearing Completion',
    description: 'Bullish divergence noted on RSI oscillator at key 0.618 retracement, preparing for continuation to fresh highs.',
    fullAnalysis: `Gold (XAUUSD / GC1!) printed fresh record highs above $2,700/oz before executing a textbook shallow ABC correction.

Key Drivers:
- Global central bank bullion reserves continue steady monthly net purchases.
- Real yield declines and geopolitical safe-haven hedging provide consistent floor support.
- 4H RSI has reset from overbought (82) back to neutral (44) while price remained above $2,700, showing immense underlying strength.

Long Projection:
- Target 1: $2,750
- Target 2: $2,820 (Fibonacci extension 1.618)
- Stop: $2,680`,
    symbol: 'XAUUSD',
    exchange: 'COMMODITIES',
    timeframe: '2h',
    type: 'LONG',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCx0MXkyJPa4nppHPZruitotNwhMCpVFr_w1k1rKqut799GuJX3GJnVAabRJXb_u_0XXNmghQFQ1s0vJ7uZp1RDJBhgJL0lxinP8LyIxncZVUtgS6b3mCOtFhbV2OmQFnAGRC_BjFWAA7ipolAXQhwVJn2I7xyIHZmx5rwJSQORcCPsjjRFugn80pogQz01C22oJvh9yp0RFtCfaa-A-nOSGo91N5QHtRdss0EiSfFkQ2foxnrXV6XQUQ',
    author: {
      name: 'Samuel M',
      handle: 'Samuel124',
      avatarColor: 'bg-amber-600',
      initial: 'S',
      followers: '28.1k',
    },
    postedAgo: '11h ago',
    boosts: 1840,
    commentsCount: 64,
    entryPrice: 2715.0,
    targetPrice: 2820.0,
    stopLoss: 2680.0,
  },
];

export const PINE_SCRIPTS: PineScriptItem[] = [
  {
    id: 'pine-tasc',
    title: 'TASC A Low-Risk ETF-Trading Strategy',
    category: 'STRATEGY',
    boosts: '4.8k boosts',
    description: 'Adaptive momentum filter combining multi-period moving averages and volatility bands designed to minimize drawdown periods.',
    author: 'HPotter',
    version: 'Pine Script v5',
    tags: ['ETF', 'Momentum', 'Trend Following', 'Drawdown Control'],
    codeSnippet: `//@version=5
strategy("TASC Low-Risk ETF Strategy [HPotter]", overlay=true, margin_long=100, margin_short=100)

// Parameters
length = input.int(20, "Lookback Period", minval=1)
mult = input.float(2.0, "Band Multiplier", minval=0.1)
src = input.source(close, "Source")

// Indicators
basis = ta.sma(src, length)
dev = mult * ta.stdev(src, length)
upper = basis + dev
lower = basis - dev

// Momentum Filter
fastMA = ta.ema(src, 9)
slowMA = ta.ema(src, 21)
bullish = ta.crossover(fastMA, slowMA) and close > basis
bearish = ta.crossunder(fastMA, slowMA) and close < basis

// Strategy Execution
if (bullish)
    strategy.entry("Long", strategy.long)
if (bearish)
    strategy.close("Long")

plot(basis, "Mid Band", color=color.blue)
p1 = plot(upper, "Upper Band", color=color.teal)
p2 = plot(lower, "Lower Band", color=color.maroon)
fill(p1, p2, color=color.new(color.teal, 92))`,
  },
  {
    id: 'pine-delta',
    title: 'Buyers & Sellers Profile + Dynamic S/R',
    category: 'INDICATOR',
    boosts: '7.2k boosts',
    description: 'Calculates aggressive buy/sell market delta volume profiles and plots real-time dynamic support and resistance channels.',
    author: 'Zeiierman',
    version: 'Pine Script v5',
    tags: ['Volume Profile', 'Delta', 'Support & Resistance', 'Order Flow'],
    codeSnippet: `//@version=5
indicator("Buyers & Sellers Profile + Dynamic S/R [Zeiierman]", overlay=true)

lookback = input.int(50, "Profile Depth")
smoothing = input.int(5, "Smoothing Factor")

// Volume calculations
upVol = volume * (close - low) / (high - low)
downVol = volume * (high - close) / (high - low)
delta = upVol - downVol

// Dynamic Support & Resistance
hi = ta.highest(high, lookback)
lo = ta.lowest(low, lookback)
dynamicMid = (hi + lo) / 2

// Visual Overlays
plot(hi, "Resistance Level", color=color.new(#f23645, 20), style=plot.style_stepline, linewidth=2)
plot(lo, "Support Level", color=color.new(#089981, 20), style=plot.style_stepline, linewidth=2)
plot(dynamicMid, "POC Mid-Point", color=color.new(#2962ff, 50), style=plot.style_circles)

bgcolor(delta > 0 ? color.new(#089981, 95) : color.new(#f23645, 95))`,
  },
  {
    id: 'pine-luxalgo',
    title: 'Trend Target Ribbon [LuxAlgo]',
    category: 'OSCILLATOR',
    boosts: '3.1k boosts',
    description: 'Harmonic ribbon system indicating macro trend alignment and trend exhaustions with minimal lag for swing traders.',
    author: 'LuxAlgo',
    version: 'Pine Script v5',
    tags: ['Oscillator', 'Harmonics', 'Ribbon', 'LuxAlgo'],
    codeSnippet: `//@version=5
indicator("Trend Target Ribbon [LuxAlgo]", overlay=false)

length = input.int(14, "Ribbon Length")
sens = input.float(1.5, "Sensitivity")

r1 = ta.ema(ta.rsi(close, length), 3)
r2 = ta.ema(r1, 5)
r3 = ta.ema(r2, 8)
r4 = ta.ema(r3, 13)

p1 = plot(r1, "Ribbon 1", color=r1 > r2 ? #089981 : #f23645)
p2 = plot(r4, "Ribbon 4", color=r1 > r4 ? color.new(#089981, 60) : color.new(#f23645, 60))
fill(p1, p2, color=r1 > r4 ? color.new(#089981, 85) : color.new(#f23645, 85))

hline(70, "Overbought", color=color.new(#f23645, 40), linestyle=hline.style_dashed)
hline(30, "Oversold", color=color.new(#089981, 40), linestyle=hline.style_dashed)`,
  },
];

export const ACTIVE_STOCKS: StockScreenerItem[] = [
  {
    ticker: 'NVDA',
    name: 'NVIDIA Corporation',
    price: 138.25,
    changePercent: 3.14,
    volume: '48.21M',
    marketCap: '$3.39T',
    rating: 'Strong Buy',
    ratingColor: 'bg-[#089981]/20 text-[#089981]',
    logoColor: 'bg-[#76b900] text-black',
    initial: 'N',
    sector: 'Technology',
    peRatio: 54.2,
    high52: 140.76,
    low52: 45.43,
  },
  {
    ticker: 'TSLA',
    name: 'Tesla, Inc.',
    price: 219.57,
    changePercent: -1.82,
    volume: '64.19M',
    marketCap: '$698.4B',
    rating: 'Hold',
    ratingColor: 'bg-[#868993]/20 text-[#d1d4dc]',
    logoColor: 'bg-[#e82127] text-white',
    initial: 'T',
    sector: 'Automotive',
    peRatio: 68.4,
    high52: 271.0,
    low52: 138.8,
  },
  {
    ticker: 'AMD',
    name: 'Advanced Micro Devices',
    price: 156.92,
    changePercent: 2.46,
    volume: '35.88M',
    marketCap: '$254.1B',
    rating: 'Buy',
    ratingColor: 'bg-[#089981]/20 text-[#089981]',
    logoColor: 'bg-[#008272] text-white',
    initial: 'A',
    sector: 'Technology',
    peRatio: 46.1,
    high52: 227.3,
    low52: 94.04,
  },
  {
    ticker: 'AMZN',
    name: 'Amazon.com, Inc.',
    price: 188.99,
    changePercent: 0.78,
    volume: '29.11M',
    marketCap: '$1.98T',
    rating: 'Strong Buy',
    ratingColor: 'bg-[#089981]/20 text-[#089981]',
    logoColor: 'bg-[#ff9900] text-black',
    initial: 'a',
    sector: 'Consumer Cyclical',
    peRatio: 43.8,
    high52: 201.2,
    low52: 118.35,
  },
  {
    ticker: 'MSFT',
    name: 'Microsoft Corporation',
    price: 418.16,
    changePercent: 0.42,
    volume: '18.42M',
    marketCap: '$3.11T',
    rating: 'Strong Buy',
    ratingColor: 'bg-[#089981]/20 text-[#089981]',
    logoColor: 'bg-[#00a4ef] text-white',
    initial: 'M',
    sector: 'Technology',
    peRatio: 35.6,
    high52: 468.35,
    low52: 326.93,
  },
  {
    ticker: 'META',
    name: 'Meta Platforms, Inc.',
    price: 589.95,
    changePercent: 1.84,
    volume: '12.65M',
    marketCap: '$1.49T',
    rating: 'Strong Buy',
    ratingColor: 'bg-[#089981]/20 text-[#089981]',
    logoColor: 'bg-[#0668e1] text-white',
    initial: 'f',
    sector: 'Technology',
    peRatio: 28.9,
    high52: 602.95,
    low52: 279.4,
  },
  {
    ticker: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 164.52,
    changePercent: -0.35,
    volume: '21.05M',
    marketCap: '$2.04T',
    rating: 'Buy',
    ratingColor: 'bg-[#089981]/20 text-[#089981]',
    logoColor: 'bg-[#4285f4] text-white',
    initial: 'G',
    sector: 'Communication Services',
    peRatio: 23.4,
    high52: 191.75,
    low52: 120.21,
  },
  {
    ticker: 'AAPL',
    name: 'Apple Inc.',
    price: 231.41,
    changePercent: 0.63,
    volume: '38.40M',
    marketCap: '$3.52T',
    rating: 'Buy',
    ratingColor: 'bg-[#089981]/20 text-[#089981]',
    logoColor: 'bg-[#555555] text-white',
    initial: '',
    sector: 'Technology',
    peRatio: 34.2,
    high52: 238.0,
    low52: 164.08,
  },
];
