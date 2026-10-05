import React, { useState, useRef, useEffect } from 'react';
import { Search, Globe, User, ChevronDown, Menu, X, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenAuth: (mode?: 'signup' | 'signin') => void;
  onNavigateSection?: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenAuth,
  onNavigateSection,
}) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');

  const menuRef = useRef<HTMLDivElement>(null);

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
        setLangMenuOpen(false);
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    {
      id: 'products',
      label: 'Products',
      sections: [
        {
          title: 'Charting & Analysis',
          items: [
            { name: 'Supercharts', desc: 'World-class financial charts with 100+ indicators', action: () => onNavigateSection?.('supercharts-section') },
            { name: 'Pine Script™ v5', desc: 'Write custom algos and backtest strategies', action: () => onNavigateSection?.('pinescript-section') },
            { name: 'Stock & Crypto Screeners', desc: 'Filter thousands of assets in real-time', action: () => onNavigateSection?.('screener-section') },
            { name: 'Heatmaps', desc: 'Visualize market breadth and sector performance' },
          ],
        },
        {
          title: 'Data & Calendars',
          items: [
            { name: 'Economic Calendar', desc: 'Macro release dates, GDP, CPI, and Fed forecasts' },
            { name: 'Earnings Calendar', desc: 'Upcoming quarterly earnings releases' },
            { name: 'News & Macro Streams', desc: 'Real-time breaking financial news feeds' },
          ],
        },
      ],
    },
    {
      id: 'community',
      label: 'Community',
      sections: [
        {
          title: 'Social Trading',
          items: [
            { name: 'Community Ideas', desc: 'Trading setups and technical perspectives', action: () => onNavigateSection?.('community-ideas-section') },
            { name: 'Pine Script Indicators', desc: 'Over 100,000+ open-source indicators', action: () => onNavigateSection?.('pinescript-section') },
            { name: 'Live Streams', desc: 'Watch top traders execute in real-time' },
          ],
        },
        {
          title: 'Contributors',
          items: [
            { name: 'Editors’ Picks', desc: 'Highest quality vetted market analyses' },
            { name: 'Top Authors', desc: 'Rankings of most followed community analysts' },
            { name: 'House Rules', desc: 'Standards and guidelines for publication' },
          ],
        },
      ],
    },
    {
      id: 'markets',
      label: 'Markets',
      sections: [
        {
          title: 'Asset Classes',
          items: [
            { name: 'Major Indices', desc: 'S&P 500, Nasdaq 100, Dow Jones, DAX, Nikkei', action: () => onNavigateSection?.('market-dashboard-section') },
            { name: 'Stocks', desc: 'Global equities with earnings, dividends & volume', action: () => onNavigateSection?.('screener-section') },
            { name: 'Crypto & Web3', desc: 'Bitcoin, Ethereum, Solana, and altcoins' },
            { name: 'Forex Currencies', desc: 'Major and cross currency currency pairs' },
          ],
        },
        {
          title: 'Macro & Commodities',
          items: [
            { name: 'Commodities & Futures', desc: 'Gold, Crude Oil, Natural Gas, Silver, Grains' },
            { name: 'Government Bonds & Yields', desc: 'US 10Y, 2Y, 30Y Treasury yield curves' },
          ],
        },
      ],
    },
    {
      id: 'brokers',
      label: 'Brokers',
      sections: [
        {
          title: 'Integrated Partners',
          items: [
            { name: 'Interactive Brokers', desc: 'Direct order routing with zero commissions' },
            { name: 'TradeStation', desc: 'Multi-asset execution and paper trading' },
            { name: 'Alpaca Trading', desc: 'API first algorithmic broker integration' },
            { name: 'OANDA & Pepperstone', desc: 'Institutional forex and CFD execution' },
          ],
        },
      ],
    },
    {
      id: 'more',
      label: 'More',
      sections: [
        {
          title: 'Platform & Apps',
          items: [
            { name: 'Desktop App (macOS & Windows)', desc: 'Multi-monitor native desktop workspace' },
            { name: 'Mobile App (iOS & Android)', desc: 'Highest rated 4.9★ mobile trading app' },
            { name: 'Pricing & Plans', desc: 'Essential, Plus, and Premium features', action: () => onOpenAuth('signup') },
            { name: 'Help Center & Support', desc: 'Documentation, guides, and customer care' },
          ],
        },
      ],
    },
  ];

  const languages = ['EN', 'ES', 'DE', 'JA', 'FR', 'IT', 'PT', 'ZH'];

  return (
    <header
      ref={menuRef}
      className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-[#1e222d] px-4 lg:px-6 h-[64px] flex items-center justify-between"
      data-purpose="global-navigation"
    >
      {/* Left branding & search group */}
      <div className="flex items-center space-x-4 lg:space-x-6">
        {/* Minimalist TradingView Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="TradingView Home"
          className="flex items-center space-x-2 focus:outline-none group cursor-pointer"
        >
          <svg
            className="h-6 w-9 fill-current text-white group-hover:opacity-85 transition-opacity"
            viewBox="0 0 36 28"
          >
            {/* Stylized geometric twin slash TV brand mark */}
            <path d="M0 4h9v20H0V4zm11 0h9L13.5 24h-9L11 4zm16 0h9l-6.5 20h-9L27 4z" />
          </svg>
        </button>

        {/* Quick Search Bar Pill (Search Ctrl+K) */}
        <div className="relative hidden md:block">
          <button
            onClick={onOpenSearch}
            className="flex items-center justify-between w-56 lg:w-64 h-9 px-3 text-sm rounded-full bg-[#1e222d] border border-[#2a2e39] text-[#868993] hover:border-[#434651] hover:text-[#d1d4dc] transition-all cursor-pointer shadow-inner"
            type="button"
          >
            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4 text-[#868993]" />
              <span className="text-xs font-normal">Search (Ctrl+K)</span>
            </div>
            <span className="text-[10px] bg-[#131722] border border-[#2a2e39] px-1.5 py-0.5 rounded text-[#868993]">
              ⌘K
            </span>
          </button>
        </div>

        {/* Navigation links with Dropdown Popovers */}
        <nav aria-label="Main Navigation" className="hidden xl:flex items-center space-x-1">
          {navItems.map((item) => (
            <div key={item.id} className="relative">
              <button
                onClick={() => setActiveMenu(activeMenu === item.id ? null : item.id)}
                className={`flex items-center space-x-1 px-3 py-1.5 text-sm font-medium transition cursor-pointer rounded-md ${
                  activeMenu === item.id
                    ? 'text-white bg-[#1e222d]'
                    : 'text-[#d1d4dc] hover:text-white hover:bg-[#1e222d]/60'
                }`}
              >
                <span>{item.label}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-[#868993] transition-transform duration-200 ${
                    activeMenu === item.id ? 'rotate-180 text-white' : ''
                  }`}
                />
              </button>

              {/* Flyout Megamenu */}
              {activeMenu === item.id && (
                <div className="absolute left-0 mt-2 w-[460px] bg-[#131722] border border-[#2a2e39] rounded-xl shadow-2xl p-4 grid grid-cols-1 gap-4 z-50 animate-in fade-in zoom-in-95 duration-150">
                  {item.sections.map((section, sIdx) => (
                    <div key={sIdx} className="space-y-1">
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-[#868993] px-2.5 pb-1">
                        {section.title}
                      </div>
                      <div className="space-y-1">
                        {section.items.map((sub, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setActiveMenu(null);
                              sub.action?.();
                            }}
                            className="w-full text-left p-2 rounded-lg hover:bg-[#1e222d] transition group flex items-start justify-between"
                          >
                            <div>
                              <div className="text-sm font-semibold text-[#f0f3fa] group-hover:text-white flex items-center">
                                <span>{sub.name}</span>
                                <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition text-[#2962ff]" />
                              </div>
                              <p className="text-xs text-[#868993] leading-relaxed mt-0.5">
                                {sub.desc}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Right utility & user action buttons */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Mobile Search Icon */}
        <button
          onClick={onOpenSearch}
          className="md:hidden p-2 text-[#868993] hover:text-white hover:bg-[#1e222d] rounded-lg transition"
          aria-label="Search"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Language Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setLangMenuOpen(!langMenuOpen)}
            aria-label="Language Selector"
            className="flex items-center space-x-1.5 px-2.5 py-1.5 text-xs font-semibold text-[#d1d4dc] hover:text-white rounded-md hover:bg-[#1e222d] transition cursor-pointer"
          >
            <Globe className="w-4 h-4 text-[#868993]" />
            <span>{currentLang}</span>
          </button>

          {langMenuOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-[#131722] border border-[#2a2e39] rounded-lg shadow-xl py-1 z-50">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    setCurrentLang(lang);
                    setLangMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs hover:bg-[#1e222d] transition flex items-center justify-between ${
                    currentLang === lang ? 'text-[#2962ff] font-bold' : 'text-[#d1d4dc]'
                  }`}
                >
                  <span>{lang}</span>
                  {currentLang === lang && <span className="w-1.5 h-1.5 rounded-full bg-[#2962ff]" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Account avatar icon & menu */}
        <div className="relative">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            aria-label="User Account"
            className="p-2 text-[#868993] hover:text-white hover:bg-[#1e222d] rounded-full transition cursor-pointer"
          >
            <User className="w-5 h-5" />
          </button>

          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-[#131722] border border-[#2a2e39] rounded-xl shadow-2xl p-2 z-50">
              <div className="px-3 py-2 border-b border-[#2a2e39] mb-1">
                <div className="text-xs font-semibold text-white">Guest Trader</div>
                <div className="text-[11px] text-[#868993]">Free account mode</div>
              </div>
              <button
                onClick={() => {
                  setUserMenuOpen(false);
                  onOpenAuth('signin');
                }}
                className="w-full text-left px-3 py-2 text-xs text-[#d1d4dc] hover:text-white hover:bg-[#1e222d] rounded-lg transition"
              >
                Sign in to account
              </button>
              <button
                onClick={() => {
                  setUserMenuOpen(false);
                  onOpenAuth('signup');
                }}
                className="w-full text-left px-3 py-2 text-xs text-[#2962ff] hover:bg-[#1e222d] rounded-lg font-medium transition"
              >
                Create new profile
              </button>
              <div className="border-t border-[#2a2e39] my-1" />
              <button
                onClick={() => {
                  setUserMenuOpen(false);
                  onNavigateSection?.('supercharts-section');
                }}
                className="w-full text-left px-3 py-2 text-xs text-[#868993] hover:text-white hover:bg-[#1e222d] rounded-lg transition"
              >
                Chart Workspace
              </button>
              <button
                onClick={() => {
                  setUserMenuOpen(false);
                  onNavigateSection?.('screener-section');
                }}
                className="w-full text-left px-3 py-2 text-xs text-[#868993] hover:text-white hover:bg-[#1e222d] rounded-lg transition"
              >
                Watchlist & Screener
              </button>
            </div>
          )}
        </div>

        {/* Vibrant Gradient "Get started" CTA Button */}
        <button
          onClick={() => onOpenAuth('signup')}
          className="relative group overflow-hidden rounded-lg p-[1px] focus:outline-none cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#2962ff] via-[#4e54c8] to-[#9c27b0] transition-all group-hover:scale-105" />
          <div className="relative px-3.5 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-[#2962ff] to-[#7928ca] text-white text-xs sm:text-sm font-semibold rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition">
            Get started
          </div>
        </button>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden p-2 text-[#868993] hover:text-white hover:bg-[#1e222d] rounded-lg transition"
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed inset-x-0 top-[64px] bg-black/95 border-b border-[#2a2e39] p-4 space-y-3 z-50 backdrop-blur-xl max-h-[85vh] overflow-y-auto">
          <div className="space-y-1">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateSection?.('market-dashboard-section');
              }}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-white hover:bg-[#1e222d]"
            >
              Markets Dashboard
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateSection?.('supercharts-section');
              }}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-white hover:bg-[#1e222d]"
            >
              Supercharts
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateSection?.('community-ideas-section');
              }}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-white hover:bg-[#1e222d]"
            >
              Community Ideas
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateSection?.('pinescript-section');
              }}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-white hover:bg-[#1e222d]"
            >
              Pine Script™ Indicators
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateSection?.('screener-section');
              }}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-white hover:bg-[#1e222d]"
            >
              Stock Screener
            </button>
          </div>
          <div className="pt-2 border-t border-[#2a2e39] flex gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth('signin');
              }}
              className="flex-1 py-2 rounded-lg bg-[#1e222d] text-xs font-semibold text-white"
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth('signup');
              }}
              className="flex-1 py-2 rounded-lg bg-[#2962ff] text-xs font-semibold text-white"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
