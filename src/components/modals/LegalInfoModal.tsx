import React from 'react';
import { X, Shield } from 'lucide-react';

interface LegalInfoModalProps {
  info: { title: string; content: string } | null;
  onClose: () => void;
}

export const LegalInfoModal: React.FC<LegalInfoModalProps> = ({ info, onClose }) => {
  if (!info) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-[#131722] border border-[#2a2e39] rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2a2e39] bg-[#1a1e29]">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-[#2962ff]" />
            <h3 className="font-bold text-white text-sm">{info.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#868993] hover:text-white rounded-lg hover:bg-[#2a2e39] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <p className="text-xs text-[#d1d4dc] leading-relaxed whitespace-pre-line">
            {info.content}
          </p>
          <div className="pt-2 border-t border-[#2a2e39] flex justify-end">
            <button
              onClick={onClose}
              className="bg-[#1e222d] hover:bg-[#2a2e39] text-white px-4 py-2 rounded-xl text-xs font-semibold transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
