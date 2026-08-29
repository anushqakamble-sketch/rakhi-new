import React, { useState } from 'react';
import { Copy, Check, Share2, ExternalLink, Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { RakhiData } from '../types';
import { getShareableUrl } from '../utils/storage';
import { RakhiRenderer } from './Rakhis';

interface ShareModalProps {
  rakhiData: RakhiData;
  onClose: () => void;
  onPreviewRecipient: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ rakhiData, onClose, onPreviewRecipient }) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = getShareableUrl(rakhiData);

  const recipientName = rakhiData.brotherNickname || rakhiData.brotherName;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    confetti({
      particleCount: 25,
      spread: 50,
      origin: { y: 0.6 },
      colors: ['#E11D48', '#F59E0B', '#10B981'],
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `🎀 Dear ${recipientName}, I tied a special personalized digital Rakhi for you! ❤️\n\nOpen your Rakhi here:\n${shareUrl}\n\nHappy Raksha Bandhan! ✨\n— With lots of love, ${rakhiData.sisterName}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Rakhi for ${recipientName} ❤️`,
          text: `Dear ${recipientName}, I made a personalized digital Rakhi for you! Happy Raksha Bandhan! ✨`,
          url: shareUrl,
        });
      } catch {
        // User dismissed or share failed
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-white via-[#FFFDF9] to-[#FFF8F0] rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-100 text-center animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Header Icon & Title */}
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 mb-3 shadow-inner">
          <Heart className="w-7 h-7 fill-rose-500" />
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
          Your Rakhi is Ready! 🎀
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Send this link to <span className="font-semibold text-rose-600">{recipientName}</span> to let him open his animated digital Rakhi and personal message.
        </p>

        {/* Small Rakhi Preview Badge */}
        <div className="mx-auto mb-6 p-3 bg-rose-50/70 rounded-2xl border border-rose-100/80 inline-flex items-center gap-3">
          <div className="scale-75 origin-center -my-3">
            <RakhiRenderer designId={rakhiData.designId} size={90} />
          </div>
          <div className="text-left text-xs">
            <p className="font-semibold text-gray-900">For {recipientName}</p>
            <p className="text-gray-500">From {rakhiData.sisterName}</p>
          </div>
        </div>

        {/* URL Box with Copy Button */}
        <div className="flex items-center gap-2 p-2 bg-gray-50 border border-gray-200 rounded-2xl mb-4 focus-within:border-rose-400 focus-within:ring-2 focus-within:ring-rose-100 transition-all">
          <input
            type="text"
            readOnly
            value={shareUrl}
            className="w-full bg-transparent px-3 py-1.5 text-xs text-gray-700 font-mono select-all outline-hidden truncate"
          />
          <button
            onClick={handleCopy}
            className="shrink-0 px-4 py-2 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        {/* Quick Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
          <button
            onClick={handleWhatsAppShare}
            className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba57] active:scale-98 text-white font-semibold text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span className="text-lg">💬</span> Share on WhatsApp
          </button>

          <button
            onClick={handleNativeShare}
            className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-98 text-white font-semibold text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Share2 className="w-4 h-4" /> Share with App
          </button>
        </div>

        {/* Preview Experience Link */}
        <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <button
            onClick={onPreviewRecipient}
            className="text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1.5 underline-offset-4 hover:underline cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Preview Brother's View
          </button>

          <span className="text-gray-400 text-[11px] flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" /> Works instantly on all phones & browsers
          </span>
        </div>
      </div>
    </div>
  );
};
