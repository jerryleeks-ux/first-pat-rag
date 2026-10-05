import React, { useState } from 'react';
import { CommunityIdea } from '../../types/market';
import { X, Rocket, MessageSquare, Send, Check, ShieldCheck, ArrowRight, Share2 } from 'lucide-react';

interface IdeaDetailModalProps {
  idea: CommunityIdea | null;
  onClose: () => void;
  onOpenChart: (symbol: string) => void;
}

export const IdeaDetailModal: React.FC<IdeaDetailModalProps> = ({
  idea,
  onClose,
  onOpenChart,
}) => {
  const [boosted, setBoosted] = useState(false);
  const [following, setFollowing] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Array<{ id: string; user: string; text: string; time: string }>>([
    {
      id: 'c1',
      user: 'MacroSurfer',
      text: 'Agreed with the Fibonacci confluence. Volume delta on the daily close confirms continuation.',
      time: '1h ago',
    },
    {
      id: 'c2',
      user: 'ElliottWaveRider',
      text: 'Watch for the liquidity sweep below the pivot before full wave 3 launch.',
      time: '45m ago',
    },
  ]);

  if (!idea) return null;

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([
      {
        id: Date.now().toString(),
        user: 'You (Guest Trader)',
        text: newComment.trim(),
        time: 'Just now',
      },
      ...comments,
    ]);
    setNewComment('');
  };

  const isShort = idea.type === 'SHORT';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div
        className="w-full max-w-4xl bg-[#131722] border border-[#2a2e39] rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#2a2e39] bg-[#1a1e29]">
          <div className="flex items-center space-x-3">
            <span
              className={`px-2.5 py-1 rounded text-xs font-mono font-bold ${
                isShort ? 'bg-[#f23645]/20 text-[#f23645]' : 'bg-[#089981]/20 text-[#089981]'
              }`}
            >
              {idea.type}
            </span>
            <span className="text-white font-mono font-bold text-sm">
              {idea.symbol} • {idea.exchange} • {idea.timeframe}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                onOpenChart(idea.symbol);
                onClose();
              }}
              className="text-xs font-semibold bg-[#2962ff] hover:bg-[#1e53e5] text-white px-3 py-1.5 rounded-lg transition flex items-center cursor-pointer"
            >
              <span>View in Supercharts</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-[#868993] hover:text-white rounded-lg hover:bg-[#2a2e39] transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Main Chart Graphic */}
          <div className="rounded-xl overflow-hidden border border-[#2a2e39] relative bg-black max-h-[380px] flex items-center justify-center">
            <img
              src={idea.imageUrl}
              alt={idea.title}
              className="w-full h-full object-cover max-h-[380px]"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Trade Setup Parameters (Entry, Target, Stop) */}
          {idea.entryPrice && idea.targetPrice && idea.stopLoss && (
            <div className="grid grid-cols-3 gap-3 p-3.5 rounded-xl bg-[#0a0d14] border border-[#2a2e39] text-center font-mono">
              <div>
                <div className="text-[11px] text-[#868993] font-sans">Entry Price</div>
                <div className="text-sm sm:text-base font-bold text-white mt-0.5">
                  ${idea.entryPrice.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-[11px] text-[#089981] font-sans">Target 1</div>
                <div className="text-sm sm:text-base font-bold text-[#089981] mt-0.5">
                  ${idea.targetPrice.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-[11px] text-[#f23645] font-sans">Stop Loss</div>
                <div className="text-sm sm:text-base font-bold text-[#f23645] mt-0.5">
                  ${idea.stopLoss.toLocaleString()}
                </div>
              </div>
            </div>
          )}

          {/* Title & Author Info */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight">
              {idea.title}
            </h2>

            <div className="flex flex-wrap items-center justify-between gap-4 mt-3 pt-3 border-t border-[#2a2e39]">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-10 h-10 rounded-full ${idea.author.avatarColor} text-white font-bold flex items-center justify-center text-sm shadow`}
                >
                  {idea.author.initial}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-white text-sm">{idea.author.name}</span>
                    <span className="text-xs text-[#868993]">@{idea.author.handle}</span>
                    <span title="Verified Top Analyst">
                      <ShieldCheck className="w-4 h-4 text-[#2962ff]" />
                    </span>
                  </div>
                  <div className="text-[11px] text-[#868993]">
                    {idea.author.followers} followers • Published {idea.postedAgo}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setFollowing(!following)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    following
                      ? 'bg-[#1e222d] text-white border border-[#2a2e39]'
                      : 'bg-[#2962ff] text-white hover:bg-[#1e53e5]'
                  }`}
                >
                  {following ? 'Following' : 'Follow'}
                </button>
                <button
                  onClick={() => setBoosted(!boosted)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center space-x-1.5 cursor-pointer ${
                    boosted
                      ? 'bg-amber-400/20 text-amber-400 border border-amber-400/40'
                      : 'bg-[#1e222d] text-[#d1d4dc] hover:text-white border border-[#2a2e39]'
                  }`}
                >
                  <Rocket className="w-3.5 h-3.5" />
                  <span>{boosted ? idea.boosts + 1 : idea.boosts} Boosts</span>
                </button>
              </div>
            </div>
          </div>

          {/* Full Analysis Breakdown */}
          <div className="bg-[#10131b] p-5 rounded-xl border border-[#2a2e39] text-sm text-[#d1d4dc] leading-relaxed whitespace-pre-line font-sans">
            {idea.fullAnalysis}
          </div>

          {/* Interactive Comments Section */}
          <div className="space-y-4 pt-2 border-t border-[#2a2e39]">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white flex items-center">
                <MessageSquare className="w-4 h-4 mr-2 text-[#2962ff]" />
                Community Discussion ({comments.length})
              </h4>
            </div>

            {/* Comment Input */}
            <form onSubmit={handleAddComment} className="flex gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your perspective or price target..."
                className="flex-1 bg-[#1e222d] border border-[#2a2e39] rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#868993] focus:outline-none focus:border-[#2962ff]"
              />
              <button
                type="submit"
                className="bg-[#2962ff] hover:bg-[#1e53e5] text-white px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 mr-1.5" />
                Post
              </button>
            </form>

            {/* Comments List */}
            <div className="space-y-2.5">
              {comments.map((c) => (
                <div key={c.id} className="p-3 rounded-xl bg-[#1e222d]/60 border border-[#2a2e39]/60">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-white">{c.user}</span>
                    <span className="text-[11px] text-[#787b86]">{c.time}</span>
                  </div>
                  <p className="text-xs text-[#d1d4dc] leading-normal">{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
