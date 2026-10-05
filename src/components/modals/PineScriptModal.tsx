import React, { useState } from 'react';
import { PineScriptItem } from '../../types/market';
import { X, Copy, Check, Code2, PlusCircle, Star, Sparkles } from 'lucide-react';

interface PineScriptModalProps {
  script: PineScriptItem | null;
  onClose: () => void;
  onApplyToChart?: (scriptTitle: string) => void;
}

export const PineScriptModal: React.FC<PineScriptModalProps> = ({
  script,
  onClose,
  onApplyToChart,
}) => {
  const [copied, setCopied] = useState(false);
  const [applied, setApplied] = useState(false);

  if (!script) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(script.codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApply = () => {
    setApplied(true);
    onApplyToChart?.(script.title);
    setTimeout(() => {
      setApplied(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div
        className="w-full max-w-3xl bg-[#131722] border border-[#2a2e39] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#2a2e39] bg-[#1a1e29]">
          <div className="flex items-center space-x-3">
            <span className="font-mono bg-[#1e222d] px-2.5 py-1 rounded text-white text-xs font-semibold border border-[#2a2e39]">
              {script.category}
            </span>
            <h3 className="text-base font-bold text-white truncate max-w-[360px] sm:max-w-none">
              {script.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#868993] hover:text-white rounded-lg hover:bg-[#2a2e39] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-5">
          {/* Metadata Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-[#0a0d14] border border-[#2a2e39] text-xs">
            <div className="flex items-center space-x-4 text-[#868993]">
              <div>
                Author: <span className="text-white font-semibold">{script.author}</span>
              </div>
              <div>•</div>
              <div>
                Runtime: <span className="text-[#2962ff] font-mono font-medium">{script.version}</span>
              </div>
              <div>•</div>
              <div className="flex items-center text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                <span>{script.boosts}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 rounded-lg bg-[#1e222d] hover:bg-[#2a2e39] text-white font-medium flex items-center space-x-1.5 transition cursor-pointer border border-[#2a2e39]"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#089981]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied to Clipboard' : 'Copy Script'}</span>
              </button>

              <button
                onClick={handleApply}
                className={`px-3 py-1.5 rounded-lg font-semibold flex items-center space-x-1.5 transition cursor-pointer ${
                  applied
                    ? 'bg-[#089981] text-white'
                    : 'bg-[#2962ff] hover:bg-[#1e53e5] text-white shadow-md shadow-blue-500/20'
                }`}
              >
                {applied ? <Check className="w-3.5 h-3.5" /> : <PlusCircle className="w-3.5 h-3.5" />}
                <span>{applied ? 'Applied to Superchart!' : 'Add to Chart'}</span>
              </button>
            </div>
          </div>

          <p className="text-sm text-[#d1d4dc] leading-relaxed">
            {script.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {script.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-mono bg-[#1e222d] text-[#868993] px-2 py-0.5 rounded border border-[#2a2e39]"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Code Viewer */}
          <div>
            <div className="flex items-center justify-between text-xs text-[#868993] mb-2 font-mono">
              <span className="flex items-center">
                <Code2 className="w-4 h-4 mr-1.5 text-[#2962ff]" />
                Pine Script™ v5 Source
              </span>
              <span>Open Source / LGPL</span>
            </div>

            <div className="bg-[#05070a] border border-[#2a2e39] rounded-xl p-4 overflow-x-auto font-mono text-xs text-[#d1d4dc] leading-relaxed selection:bg-[#2962ff]">
              <pre className="whitespace-pre">
                {script.codeSnippet}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
