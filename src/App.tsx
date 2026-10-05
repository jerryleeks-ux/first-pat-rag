import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { MarketTickerDashboard } from './components/MarketTickerDashboard';
import { SuperchartsShowcase } from './components/SuperchartsShowcase';
import { CommunityIdeasSection } from './components/CommunityIdeasSection';
import { PineScriptShowcase } from './components/PineScriptShowcase';
import { MarketMoversTable } from './components/MarketMoversTable';
import { Footer } from './components/Footer';

// Modals
import { SearchModal } from './components/modals/SearchModal';
import { FullChartModal } from './components/modals/FullChartModal';
import { IdeaDetailModal } from './components/modals/IdeaDetailModal';
import { PineScriptModal } from './components/modals/PineScriptModal';
import { StockScreenerModal } from './components/modals/StockScreenerModal';
import { SpaceStoryModal } from './components/modals/SpaceStoryModal';
import { AuthModal } from './components/modals/AuthModal';
import { LegalInfoModal } from './components/modals/LegalInfoModal';

import { CommunityIdea, PineScriptItem } from './types/market';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  // Navigation & Active Asset State
  const [activeSymbol, setActiveSymbol] = useState<string>('AAPL');

  // Modal Visibility States
  const [searchOpen, setSearchOpen] = useState(false);
  const [fullChartOpen, setFullChartOpen] = useState(false);
  const [screenerOpen, setScreenerOpen] = useState(false);
  const [spaceStoryOpen, setSpaceStoryOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signup' | 'signin'>('signup');
  const [selectedIdea, setSelectedIdea] = useState<CommunityIdea | null>(null);
  const [selectedScript, setSelectedScript] = useState<PineScriptItem | null>(null);
  const [legalInfo, setLegalInfo] = useState<{ title: string; content: string } | null>(null);

  // User Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSelectSymbol = (symbol: string) => {
    // Map common names if needed
    const cleanSym = symbol.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
    if (cleanSym.includes('BTC') || cleanSym.includes('BITCOIN')) {
      setActiveSymbol('BTCUSD');
    } else if (cleanSym.includes('NVDA') || cleanSym.includes('NVIDIA')) {
      setActiveSymbol('NVDA');
    } else if (cleanSym.includes('TSLA') || cleanSym.includes('TESLA')) {
      setActiveSymbol('TSLA');
    } else {
      setActiveSymbol(cleanSym.slice(0, 5) || 'AAPL');
    }

    // Smoothly scroll to supercharts showcase
    const element = document.getElementById('supercharts-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleOpenAuth = (mode: 'signup' | 'signin' = 'signup') => {
    setAuthMode(mode);
    setAuthOpen(true);
  };

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-black text-[#f0f3fa] selection:bg-[#2962ff] selection:text-white flex flex-col font-sans">
      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#131722] border border-[#2962ff] text-white px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-2 text-xs font-semibold animate-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#089981]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Global Navigation Header */}
      <Header
        onOpenSearch={() => setSearchOpen(true)}
        onOpenAuth={handleOpenAuth}
        onNavigateSection={handleNavigateSection}
      />

      {/* Main Page Flow matching TradingView Screenshot */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onOpenAuth={handleOpenAuth}
          onOpenSpaceStory={() => setSpaceStoryOpen(true)}
        />

        {/* Market Ticker Dashboard (Major indices, Crypto, DXY, Futures, Bonds, Inflation) */}
        <MarketTickerDashboard
          selectedSymbol={activeSymbol}
          onSelectTicker={handleSelectSymbol}
        />

        {/* Supercharts Showcase */}
        <SuperchartsShowcase
          activeSymbol={activeSymbol}
          onChangeSymbol={handleSelectSymbol}
          onLaunchFullChart={() => setFullChartOpen(true)}
        />

        {/* Community Ideas Section */}
        <CommunityIdeasSection
          onSelectIdea={(idea) => setSelectedIdea(idea)}
        />

        {/* Pine Script Indicators Section */}
        <PineScriptShowcase
          onSelectScript={(script) => setSelectedScript(script)}
          onExploreAll={() => {
            showToast('Loading 100,000+ community Pine Scripts repository...');
            setSearchOpen(true);
          }}
        />

        {/* Market Movers Table: Most Active US Stocks */}
        <MarketMoversTable
          onSelectStock={handleSelectSymbol}
          onOpenScreener={() => setScreenerOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenLegalModal={(title, content) => setLegalInfo({ title, content })}
        onOpenAuth={handleOpenAuth}
        onNavigateSection={handleNavigateSection}
      />

      {/* Modals */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectSymbol={handleSelectSymbol}
      />

      <FullChartModal
        isOpen={fullChartOpen}
        onClose={() => setFullChartOpen(false)}
        activeSymbol={activeSymbol}
        onSelectSymbol={setActiveSymbol}
      />

      <IdeaDetailModal
        idea={selectedIdea}
        onClose={() => setSelectedIdea(null)}
        onOpenChart={handleSelectSymbol}
      />

      <PineScriptModal
        script={selectedScript}
        onClose={() => setSelectedScript(null)}
        onApplyToChart={(scriptTitle) => {
          showToast(`"${scriptTitle}" applied to Supercharts workspace!`);
          handleNavigateSection('supercharts-section');
        }}
      />

      <StockScreenerModal
        isOpen={screenerOpen}
        onClose={() => setScreenerOpen(false)}
        onSelectStock={handleSelectSymbol}
      />

      <SpaceStoryModal
        isOpen={spaceStoryOpen}
        onClose={() => setSpaceStoryOpen(false)}
      />

      <AuthModal
        isOpen={authOpen}
        initialMode={authMode}
        onClose={() => setAuthOpen(false)}
        onSuccess={(email) => {
          showToast(`Successfully authenticated as ${email}`);
        }}
      />

      <LegalInfoModal
        info={legalInfo}
        onClose={() => setLegalInfo(null)}
      />
    </div>
  );
}
