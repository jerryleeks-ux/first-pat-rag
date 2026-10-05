import React, { useState } from 'react';
import { X, Check, Mail, Lock, User, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signup' | 'signin';
  onSuccess: (email: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'signup',
  onSuccess,
}) => {
  const [mode, setMode] = useState<'signup' | 'signin'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => {
      onSuccess(email);
      setSubmitted(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-[#131722] border border-[#2a2e39] rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2a2e39] bg-[#1a1e29]">
          <div className="flex items-center space-x-2">
            <svg className="h-5 w-8 fill-current text-white" viewBox="0 0 36 28">
              <path d="M0 4h9v20H0V4zm11 0h9L13.5 24h-9L11 4zm16 0h9l-6.5 20h-9L27 4z" />
            </svg>
            <span className="font-bold text-white text-sm">TradingView</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#868993] hover:text-white rounded-lg hover:bg-[#2a2e39] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-5">
          {/* Mode Switcher */}
          <div className="flex bg-[#0a0d14] p-1 rounded-xl border border-[#2a2e39] text-xs">
            <button
              onClick={() => setMode('signup')}
              className={`flex-1 py-2 rounded-lg font-semibold transition cursor-pointer ${
                mode === 'signup' ? 'bg-[#2962ff] text-white shadow' : 'text-[#868993] hover:text-white'
              }`}
            >
              Get started for free
            </button>
            <button
              onClick={() => setMode('signin')}
              className={`flex-1 py-2 rounded-lg font-semibold transition cursor-pointer ${
                mode === 'signin' ? 'bg-[#2962ff] text-white shadow' : 'text-[#868993] hover:text-white'
              }`}
            >
              Sign In
            </button>
          </div>

          <div className="text-center">
            <h3 className="text-xl font-bold text-white">
              {mode === 'signup' ? 'Join 100M+ Traders' : 'Welcome back to TradingView'}
            </h3>
            <p className="text-xs text-[#868993] mt-1">
              {mode === 'signup' ? '$0 forever, no credit card required' : 'Enter your credentials to continue'}
            </p>
          </div>

          {/* Social Auth Buttons */}
          <div className="space-y-2.5">
            <button
              onClick={() => {
                onSuccess('google.user@gmail.com');
                onClose();
              }}
              className="w-full py-2.5 px-4 bg-[#1e222d] hover:bg-[#2a2e39] border border-[#2a2e39] rounded-xl text-xs font-semibold text-white flex items-center justify-center space-x-2 transition cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            <button
              onClick={() => {
                onSuccess('apple.trader@icloud.com');
                onClose();
              }}
              className="w-full py-2.5 px-4 bg-[#1e222d] hover:bg-[#2a2e39] border border-[#2a2e39] rounded-xl text-xs font-semibold text-white flex items-center justify-center space-x-2 transition cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.36c.64-.78 1.08-1.86.96-2.95-.93.04-2.06.62-2.73 1.4-.59.68-1.11 1.77-.97 2.83 1.04.08 2.1-.5 2.74-1.28z" />
              </svg>
              <span>Continue with Apple</span>
            </button>
          </div>

          <div className="flex items-center space-x-2 text-xs text-[#787b86]">
            <div className="flex-1 border-b border-[#2a2e39]" />
            <span>or with email</span>
            <div className="flex-1 border-b border-[#2a2e39]" />
          </div>

          {/* Email / Password Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="text-[11px] text-[#868993] block mb-1">Email address</label>
              <div className="flex items-center bg-[#0a0d14] border border-[#2a2e39] rounded-xl px-3 py-2">
                <Mail className="w-4 h-4 text-[#868993] mr-2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="trader@domain.com"
                  className="bg-transparent text-white text-xs w-full focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] text-[#868993] block mb-1">Password</label>
              <div className="flex items-center bg-[#0a0d14] border border-[#2a2e39] rounded-xl px-3 py-2">
                <Lock className="w-4 h-4 text-[#868993] mr-2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="bg-transparent text-white text-xs w-full focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitted}
              className="w-full py-3 bg-[#2962ff] hover:bg-[#1e53e5] text-white text-xs font-bold rounded-xl transition shadow-lg shadow-blue-500/20 flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              {submitted ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Logging In...</span>
                </>
              ) : (
                <>
                  <span>{mode === 'signup' ? 'Create Free Account' : 'Sign In'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
