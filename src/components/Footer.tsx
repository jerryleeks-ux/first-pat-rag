import React from 'react';

interface FooterProps {
  onOpenLegalModal: (title: string, content: string) => void;
  onOpenAuth: (mode?: 'signup' | 'signin') => void;
  onNavigateSection?: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenLegalModal,
  onOpenAuth,
  onNavigateSection,
}) => {
  return (
    <footer className="border-t border-[#1e222d] bg-black text-[#868993] text-xs py-14" data-purpose="site-footer">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Products */}
          <div>
            <h5 className="text-white font-semibold mb-3 tracking-tight">Products</h5>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigateSection?.('supercharts-section')}
                  className="hover:text-white transition cursor-pointer text-left"
                >
                  Supercharts
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection?.('pinescript-section')}
                  className="hover:text-white transition cursor-pointer text-left"
                >
                  Pine Script™
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection?.('screener-section')}
                  className="hover:text-white transition cursor-pointer text-left"
                >
                  Stock Screener
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection?.('market-dashboard-section')}
                  className="hover:text-white transition cursor-pointer text-left"
                >
                  Crypto Screener
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegalModal('Economic Calendar', 'The TradingView Economic Calendar tracks high-impact central bank interest rate decisions, Non-Farm Payrolls, GDP, CPI, and global macro announcements in real-time.')}
                  className="hover:text-white transition cursor-pointer text-left"
                >
                  Economic Calendar
                </button>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h5 className="text-white font-semibold mb-3 tracking-tight">Company</h5>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onOpenLegalModal('About TradingView', 'TradingView is the world’s most popular financial charting and social network for over 100 million traders and investors. Founded in 2011, TradingView offers institutional-grade charting in modern web browsers.')}
                  className="hover:text-white transition cursor-pointer text-left"
                >
                  About us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection?.('supercharts-section')}
                  className="hover:text-white transition cursor-pointer text-left"
                >
                  Features
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenAuth('signup')}
                  className="hover:text-white transition cursor-pointer text-left"
                >
                  Pricing & Plans
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegalModal('Wall of Love', 'Read reviews and stories from top fund managers, retail traders, institutional analysts, and prop desks who run their daily trading on TradingView.')}
                  className="hover:text-white transition cursor-pointer text-left"
                >
                  Wall of Love
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegalModal('Careers at TradingView', 'Join our team of distributed engineers, quantitative analysts, and designers building the future of financial software.')}
                  className="hover:text-white transition cursor-pointer text-left"
                >
                  Careers
                </button>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h5 className="text-white font-semibold mb-3 tracking-tight">Community</h5>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onOpenAuth('signup')}
                  className="hover:text-white transition cursor-pointer text-left"
                >
                  Refer a friend
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection?.('community-ideas-section')}
                  className="hover:text-white transition cursor-pointer text-left"
                >
                  Ideas & Setups
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection?.('pinescript-section')}
                  className="hover:text-white transition cursor-pointer text-left"
                >
                  Scripts & Indicators
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegalModal('House Rules', 'TradingView community rules enforce authentic technical analysis, prohibiting spam, unauthorized commercial solicitation, and low-effort market commentary.')}
                  className="hover:text-white transition cursor-pointer text-left"
                >
                  House Rules
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegalModal('Moderation Team', 'Our volunteer moderators and integrity team ensure fair discussions, high quality ideas, and adherence to community guidelines.')}
                  className="hover:text-white transition cursor-pointer text-left"
                >
                  Moderators
                </button>
              </li>
            </ul>
          </div>

          {/* For Business */}
          <div>
            <h5 className="text-white font-semibold mb-3 tracking-tight">For Business</h5>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onOpenLegalModal('TradingView Charting Widgets', 'Embed world-class TradingView financial charts, ticker tapes, and technical analysis widgets into your own web applications.')}
                  className="hover:text-white transition cursor-pointer text-left"
                >
                  Widgets
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegalModal('Advertising on TradingView', 'Connect your brand with 100M+ high-intent investors, financial decision makers, and traders globally.')}
                  className="hover:text-white transition cursor-pointer text-left"
                >
                  Advertising
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegalModal('Brokerage Integration', 'Enable millions of TradingView users to trade directly through your brokerage via our open REST & WebSocket trading APIs.')}
                  className="hover:text-white transition cursor-pointer text-left"
                >
                  Brokerage integration
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegalModal('Partner Program', 'Affiliate programs, educational partnerships, and institutional licensing for universities and prop firms.')}
                  className="hover:text-white transition cursor-pointer text-left"
                >
                  Partner program
                </button>
              </li>
            </ul>
          </div>

          {/* Download App */}
          <div className="col-span-2 md:col-span-1">
            <h5 className="text-white font-semibold mb-3 tracking-tight">Download App</h5>
            <p className="mb-3 text-[11px] leading-relaxed">
              Trade wherever you go with the highest-rated mobile app for traders.
            </p>
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => onOpenLegalModal('App Store', 'TradingView iOS app is available on the Apple App Store with 4.9★ rating across over 500,000 reviews.')}
                className="bg-[#1e222d] border border-[#2a2e39] text-white px-3 py-2 rounded-lg text-center font-medium hover:border-[#434651] transition cursor-pointer"
              >
                App Store
              </button>
              <button
                onClick={() => onOpenLegalModal('Google Play', 'TradingView Android app is available on Google Play Store with real-time push alerts and custom watchlists.')}
                className="bg-[#1e222d] border border-[#2a2e39] text-white px-3 py-2 rounded-lg text-center font-medium hover:border-[#434651] transition cursor-pointer"
              >
                Google Play
              </button>
            </div>
          </div>
        </div>

        {/* Legal and bottom disclaimers */}
        <div className="border-t border-[#1e222d] pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-[#787b86] gap-4">
          <div className="flex items-center space-x-4">
            <svg className="h-5 w-8 fill-current text-[#868993]" viewBox="0 0 36 28">
              <path d="M0 4h9v20H0V4zm11 0h9L13.5 24h-9L11 4zm16 0h9l-6.5 20h-9L27 4z" />
            </svg>
            <span>© 2024 TradingView, Inc. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <button
              onClick={() => onOpenLegalModal('Terms of Use', 'TradingView terms and conditions outline user accounts, real-time market data licensing, intellectual property rights for Pine Scripts, and platform rules.')}
              className="hover:text-[#d1d4dc] transition cursor-pointer"
            >
              Terms of use
            </button>
            <button
              onClick={() => onOpenLegalModal('Privacy Policy', 'We value privacy and data sovereignty. We do not sell personal financial information or credentials to third parties.')}
              className="hover:text-[#d1d4dc] transition cursor-pointer"
            >
              Privacy policy
            </button>
            <button
              onClick={() => onOpenLegalModal('Cookies Policy', 'We utilize functional cookies strictly to maintain active login sessions, charting preferences, and workspace layouts.')}
              className="hover:text-[#d1d4dc] transition cursor-pointer"
            >
              Cookies policy
            </button>
            <button
              onClick={() => onOpenLegalModal('Security & Data Protection', 'Bank-grade TLS 1.3 encryption, SOC 2 compliance, and 2FA authentication guard all client sessions and broker integrations.')}
              className="hover:text-[#d1d4dc] transition cursor-pointer"
            >
              Security
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
