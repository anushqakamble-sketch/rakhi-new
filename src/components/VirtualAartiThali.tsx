import React, { useState } from 'react';
import { Sparkles, Heart, Check, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playPoojaBell, playBellTone } from '../utils/audio';

interface VirtualAartiThaliProps {
  sisterName: string;
  brotherName: string;
}

export const VirtualAartiThali: React.FC<VirtualAartiThaliProps> = ({ sisterName, brotherName }) => {
  const [diyaLit, setDiyaLit] = useState(false);
  const [tilakApplied, setTilakApplied] = useState(false);
  const [sweetsEaten, setSweetsEaten] = useState(0);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [selectedPromise, setSelectedPromise] = useState<string>(
    `Thank you so much for the wonderful Rakhi, ${sisterName}! You're the best sister ever ❤️`
  );
  const [copiedReply, setCopiedReply] = useState(false);

  const handleLightDiya = () => {
    setDiyaLit(true);
    playPoojaBell();
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#F59E0B', '#EF4444', '#FDE047'],
    });
  };

  const handleApplyTilak = () => {
    setTilakApplied(true);
    playBellTone(880, 1.5, 0.2);
  };

  const handleEatSweet = () => {
    setSweetsEaten((prev) => prev + 1);
    playBellTone(659.25, 1.0, 0.15);
    confetti({
      particleCount: 20,
      spread: 40,
      origin: { y: 0.8 },
      colors: ['#EC4899', '#FBBF24', '#38BDF8'],
    });
  };

  const promiseOptions = [
    `Thank you so much for the wonderful Rakhi, ${sisterName}! You're the best sister ever ❤️`,
    `Aww thank you ${sisterName}! Sending you chocolates & a big gift right now 🍫🎁`,
    `Happy Raksha Bandhan ${sisterName}! Always proud to be your brother & protector 🛡️✨`,
    `Best Rakhi ever! I promise to stop teasing you (at least for today 😉) — Love, ${brotherName}`,
  ];

  const handleSendWhatsAppReply = () => {
    const text = encodeURIComponent(`🎀 ${selectedPromise}\n\n— From ${brotherName}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleCopyReply = () => {
    navigator.clipboard.writeText(`🎀 ${selectedPromise} — From ${brotherName}`);
    setCopiedReply(true);
    setTimeout(() => setCopiedReply(false), 2000);
  };

  return (
    <div className="w-full max-w-xl mx-auto mt-8 p-6 rounded-3xl bg-gradient-to-b from-[#FFFDF5]/95 to-[#FEF3C7]/80 backdrop-blur-md border border-[#FDE68A] shadow-xl text-center">
      <div className="flex items-center justify-center gap-2 mb-2">
        <Sparkles className="w-5 h-5 text-amber-600 animate-spin" style={{ animationDuration: '8s' }} />
        <h3 className="font-serif text-xl font-bold text-amber-950">Virtual Pooja & Aarti Thali</h3>
        <Sparkles className="w-5 h-5 text-amber-600 animate-spin" style={{ animationDuration: '8s' }} />
      </div>
      <p className="text-sm text-amber-800/80 mb-6">
        Perform the traditional festive rituals virtually with a gentle tap!
      </p>

      {/* Decorative Traditional Brass Thali Plate */}
      <div className="relative mx-auto w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-gradient-to-tr from-[#D97706] via-[#FBBF24] to-[#FEF08A] p-3 shadow-2xl border-4 border-[#B45309]/30 flex items-center justify-center">
        {/* Inner concentric brass rings */}
        <div className="w-full h-full rounded-full bg-gradient-to-br from-[#FFFBEB] via-[#FEF3C7] to-[#FDE68A] p-4 flex flex-col items-center justify-between border-2 border-dashed border-[#D97706]/40 relative overflow-hidden">
          
          {/* Top: Roli-Chawal Tilak */}
          <button
            onClick={handleApplyTilak}
            className={`cursor-pointer transition-all duration-300 transform active:scale-95 flex flex-col items-center group ${
              tilakApplied ? 'scale-105' : 'hover:scale-110'
            }`}
            title="Tap to apply Auspicious Tilak"
          >
            <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-rose-800 p-1.5 shadow-md flex items-center justify-center border border-amber-300">
              <div className="w-4 h-4 rounded-full bg-red-500 shadow-inner" />
              {/* Rice grains */}
              <div className="absolute top-2 left-3 w-1.5 h-0.5 bg-yellow-100 rotate-45 rounded-full" />
              <div className="absolute bottom-2 right-3 w-1.5 h-0.5 bg-yellow-100 -rotate-12 rounded-full" />
            </div>
            <span className="text-[11px] font-semibold text-amber-900 mt-1 bg-amber-100/90 px-2 py-0.5 rounded-full shadow-xs">
              {tilakApplied ? '✓ Tilak Applied' : '🔴 Tap Tilak'}
            </span>
          </button>

          {/* Center: Glowing Diya */}
          <button
            onClick={handleLightDiya}
            className={`cursor-pointer transition-all duration-300 transform active:scale-95 flex flex-col items-center group ${
              diyaLit ? 'scale-110' : 'hover:scale-110'
            }`}
            title="Tap to light the Diya"
          >
            <div className="relative">
              {/* Flame */}
              {diyaLit ? (
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce">
                  <div className="w-5 h-7 bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-100 rounded-full blur-[0.5px] shadow-[0_0_15px_#F59E0B]" />
                  <div className="w-2 h-4 bg-yellow-200 rounded-full -mt-4 blur-[0.2px]" />
                </div>
              ) : (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-1.5 h-3 bg-stone-700 rounded-full" />
              )}
              {/* Clay Diya Lamp */}
              <div className="w-14 h-8 bg-gradient-to-b from-[#B45309] to-[#78350F] rounded-b-full rounded-t-sm border border-amber-300/50 shadow-md flex items-center justify-center">
                <div className="w-10 h-3 bg-amber-900/60 rounded-full" />
              </div>
            </div>
            <span className="text-[11px] font-semibold text-amber-950 mt-2 bg-amber-200/90 px-2 py-0.5 rounded-full shadow-xs">
              {diyaLit ? '✨ Diya Glowing' : '🪔 Light Diya'}
            </span>
          </button>

          {/* Bottom: Sweets Plate (Kaju Katli & Ladoo) */}
          <button
            onClick={handleEatSweet}
            className="cursor-pointer transition-all duration-300 transform active:scale-95 hover:scale-110 flex flex-col items-center group"
            title="Tap to have a sweet"
          >
            <div className="flex items-center gap-1.5 bg-amber-50/80 px-2.5 py-1.5 rounded-2xl border border-amber-300 shadow-sm">
              {/* Kaju Katli Diamond */}
              <div className="w-6 h-6 bg-gradient-to-br from-slate-100 to-amber-100 border border-slate-300 rotate-45 shadow-xs flex items-center justify-center">
                <div className="w-2 h-2 bg-slate-200/60 rotate-45" />
              </div>
              {/* Motichoor Ladoo */}
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 via-yellow-400 to-orange-500 shadow-xs border border-amber-300" />
            </div>
            <span className="text-[11px] font-semibold text-amber-900 mt-1 bg-amber-100/90 px-2 py-0.5 rounded-full shadow-xs">
              {sweetsEaten > 0 ? `🍬 Sweets (${sweetsEaten})` : '🍬 Offer Sweet'}
            </span>
          </button>
        </div>
      </div>

      {/* Tilak indicator on screen if applied */}
      {tilakApplied && (
        <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100 text-red-900 text-xs font-semibold border border-red-200 animate-fade-in">
          <div className="w-2 h-2 rounded-full bg-red-600" />
          Auspicious Roli-Chawal Tilak applied with sister's blessings!
        </div>
      )}

      {/* Sister Reply & Gift Promise CTA */}
      <div className="mt-6 pt-4 border-t border-amber-200/80 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={() => setShowReplyModal(true)}
          className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-medium text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Gift className="w-4 h-4" />
          Send a Gift Promise & Thank You to {sisterName}
        </button>
      </div>

      {/* Reply Modal */}
      {showReplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-rose-100 text-left animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                <h4 className="font-serif text-lg font-bold text-gray-900">Reply to {sisterName}</h4>
              </div>
              <button
                onClick={() => setShowReplyModal(false)}
                className="text-gray-400 hover:text-gray-600 text-sm font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-gray-600 mb-4">
              Select a message or gift promise to send back to your sister on WhatsApp:
            </p>

            <div className="space-y-2 mb-5">
              {promiseOptions.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedPromise(opt)}
                  className={`w-full text-left text-xs p-3 rounded-xl border transition-all cursor-pointer ${
                    selectedPromise === opt
                      ? 'border-rose-500 bg-rose-50 text-rose-950 font-medium shadow-xs'
                      : 'border-gray-200 hover:border-rose-200 text-gray-700 bg-gray-50/50'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={handleSendWhatsAppReply}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium text-xs flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                Send via WhatsApp
              </button>
              <button
                onClick={handleCopyReply}
                className="py-2.5 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copiedReply ? <Check className="w-3.5 h-3.5 text-green-600" /> : null}
                {copiedReply ? 'Copied!' : 'Copy Text'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
