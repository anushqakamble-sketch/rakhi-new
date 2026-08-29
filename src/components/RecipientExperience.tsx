import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, Volume2, VolumeX, RotateCcw, Share2, PlusCircle, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import { RakhiData } from '../types';
import { THEME_CONFIGS } from '../data/rakhiDesigns';
import { RakhiRenderer } from './Rakhis';
import { ParticleCanvas } from './ParticleCanvas';
import { VirtualAartiThali } from './VirtualAartiThali';
import { playFestiveFanfare, startAmbientChimes, stopAmbientChimes } from '../utils/audio';

interface RecipientExperienceProps {
  rakhiData: RakhiData;
  onGoHome?: () => void;
  onCreateNew?: () => void;
}

export const RecipientExperience: React.FC<RecipientExperienceProps> = ({
  rakhiData,
  onGoHome,
  onCreateNew,
}) => {
  const [opened, setOpened] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(rakhiData.musicEnabled);
  const [showThali, setShowThali] = useState(false);

  const theme = THEME_CONFIGS[rakhiData.themeId] || THEME_CONFIGS.saffron;
  const recipientDisplayName = rakhiData.brotherNickname || rakhiData.brotherName;

  useEffect(() => {
    return () => {
      stopAmbientChimes();
    };
  }, []);

  const handleOpenRakhi = () => {
    setOpened(true);
    playFestiveFanfare();

    if (soundEnabled) {
      startAmbientChimes();
    }

    // Trigger celebratory confetti burst
    setTimeout(() => {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E11D48', '#F59E0B', '#FBBF24', '#DB2777', '#10B981'],
      });
    }, 400);

    setTimeout(() => {
      setShowThali(true);
    }, 1800);
  };

  const toggleSound = () => {
    if (soundEnabled) {
      stopAmbientChimes();
      setSoundEnabled(false);
    } else {
      setSoundEnabled(true);
      startAmbientChimes();
    }
  };

  const handleReplay = () => {
    setOpened(false);
    setShowThali(false);
    stopAmbientChimes();
  };

  const handleShareBack = () => {
    if (navigator.share) {
      navigator.share({
        title: `Rakhi from ${rakhiData.sisterName} ❤️`,
        text: `Look at this beautiful digital Rakhi ${rakhiData.sisterName} created for me for Raksha Bandhan! ✨`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className={`min-h-screen w-full relative flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-br ${theme.gradient} overflow-x-hidden font-sans transition-colors duration-700`}>
      
      {/* Floating Ambient Particles */}
      <ParticleCanvas type={rakhiData.particleType} density={opened ? 35 : 20} />

      {/* Floating Top Controls */}
      <header className="fixed top-4 left-4 right-4 z-40 flex items-center justify-between pointer-events-auto max-w-5xl mx-auto">
        {onGoHome ? (
          <button
            onClick={onGoHome}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/80 hover:bg-white text-gray-700 text-xs font-semibold shadow-sm backdrop-blur-md transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Send a Rakhi
          </button>
        ) : (
          <div />
        )}

        <div className="flex items-center gap-2">
          {opened && (
            <button
              onClick={handleReplay}
              className="p-2 rounded-full bg-white/80 hover:bg-white text-gray-700 shadow-sm backdrop-blur-md transition-all cursor-pointer"
              title="Replay Rakhi animation"
              aria-label="Replay animation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={toggleSound}
            className="p-2 rounded-full bg-white/80 hover:bg-white text-gray-700 shadow-sm backdrop-blur-md transition-all cursor-pointer"
            title={soundEnabled ? 'Mute chimes' : 'Enable festive sound'}
            aria-label="Toggle festive sound"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-600" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* SCREEN 1: ENVELOPE / CARD WAITING */}
      {!opened ? (
        <div className="relative z-10 w-full max-w-md my-auto flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-500">
          
          {/* Glowing Ceremonial Gift Envelope */}
          <div className="relative mb-8 group cursor-pointer" onClick={handleOpenRakhi}>
            <div className="absolute -inset-4 bg-gradient-to-r from-amber-400 via-rose-400 to-amber-500 rounded-3xl blur-xl opacity-50 group-hover:opacity-80 transition duration-500 animate-pulse" />
            
            <div className="relative w-64 h-44 sm:w-72 sm:h-48 rounded-2xl bg-gradient-to-br from-[#800000] via-[#991B1B] to-[#7F1D1D] p-5 shadow-2xl border-2 border-amber-300/60 flex flex-col items-center justify-between text-white">
              
              {/* Golden corner ornaments */}
              <div className="absolute top-2 left-2 text-amber-300/80 text-xs">✤</div>
              <div className="absolute top-2 right-2 text-amber-300/80 text-xs">✤</div>
              <div className="absolute bottom-2 left-2 text-amber-300/80 text-xs">✤</div>
              <div className="absolute bottom-2 right-2 text-amber-300/80 text-xs">✤</div>

              <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-amber-200 font-semibold pt-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Raksha Bandhan Special
              </div>

              {/* Wax Seal / Golden Motif */}
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#D97706] via-[#FBBF24] to-[#FEF08A] shadow-lg flex items-center justify-center border-2 border-amber-100 transform group-hover:scale-110 transition-transform">
                <span className="text-xl">🎀</span>
              </div>

              <div className="text-center pb-1">
                <p className="text-xs text-amber-100 font-medium">Specially crafted for</p>
                <p className="font-serif text-lg font-bold text-white tracking-wide">{recipientDisplayName}</p>
              </div>
            </div>
          </div>

          <div className="space-y-3 px-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-semibold border border-rose-200">
              <Heart className="w-3.5 h-3.5 fill-rose-600 text-rose-600" /> From {rakhiData.sisterName}
            </span>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              You have a Rakhi waiting for you ❤️
            </h1>

            <p className="text-sm text-gray-600 max-w-sm mx-auto">
              Your sister <span className="font-semibold text-gray-900">{rakhiData.sisterName}</span> has sent a personalized digital Rakhi and blessings for you.
            </p>

            <div className="pt-4">
              <button
                onClick={handleOpenRakhi}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-serif text-lg font-bold shadow-xl hover:shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-2.5 mx-auto cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-amber-200" />
                Open Your Rakhi ✨
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* SCREEN 2: ANIMATED REVEAL & CELEBRATION */
        <div className="relative z-10 w-full max-w-2xl my-auto flex flex-col items-center text-center animate-in fade-in zoom-in-90 duration-700 pt-8 pb-12">
          
          {/* Auspicious Greeting Header */}
          <div className="space-y-2 mb-3 animate-in slide-in-from-top-4 duration-500">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100/90 backdrop-blur-sm text-amber-900 text-xs font-bold uppercase tracking-wider border border-amber-300 shadow-sm">
              ✨ Happy Raksha Bandhan ✨
            </div>
            
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-gray-900 tracking-tight">
              Happy Raksha Bandhan, {recipientDisplayName}! ❤️
            </h1>
          </div>

          {/* Centerpiece: Virtual Rakhi Tying Ceremony Display Area */}
          <div className="relative my-4 sm:my-6 py-6 px-4 flex flex-col items-center justify-center w-full max-w-lg">
            {/* Sacred Wrist Aura Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-300/30 via-rose-400/35 to-amber-300/30 rounded-full blur-3xl animate-sacred-aura pointer-events-none" />
            
            {/* Subtle Virtual Wrist Outline & Golden Band during Tying */}
            <div className="absolute h-10 rounded-full bg-gradient-to-r from-amber-400/0 via-amber-400/40 to-amber-400/0 blur-sm animate-wrist-tie pointer-events-none" />

            {/* Rakhi Tying Entrance Wrapper */}
            <div className="relative w-full flex items-center justify-center overflow-hidden py-2 rounded-3xl">
              {/* Shimmer light sweep bar */}
              <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
                <div className="w-16 h-full bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-12 animate-rakhi-shimmer" />
              </div>

              {/* Animated Tying Rakhi with floating idle */}
              <div className="relative z-10 animate-rakhi-tie">
                <div className="animate-thread-tie">
                  <div className="animate-rakhi-float transform hover:scale-105 transition-transform duration-300">
                    <RakhiRenderer designId={rakhiData.designId} size={340} animate={true} />
                  </div>
                </div>
              </div>
            </div>

            {/* Sacred Tying Status Badge */}
            <div className="mt-3 relative z-10 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/80 backdrop-blur-md text-amber-900 text-xs font-semibold shadow-sm border border-amber-200/80 animate-in fade-in zoom-in duration-700">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping mr-0.5" />
              Tied with love by <span className="text-rose-700 font-bold">{rakhiData.sisterName}</span> ❤️
            </div>
          </div>

          {/* Sister's Message Card */}
          <div className="w-full max-w-xl bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-amber-200/90 text-left relative overflow-hidden my-4 animate-in fade-in slide-in-from-bottom-6 duration-700">
            {/* Golden corner flourishes */}
            <div className="absolute top-3 left-3 text-amber-400 text-sm">✦</div>
            <div className="absolute top-3 right-3 text-amber-400 text-sm">✦</div>
            <div className="absolute bottom-3 left-3 text-amber-400 text-sm">✦</div>
            <div className="absolute bottom-3 right-3 text-amber-400 text-sm">✦</div>

            <div className="flex items-center gap-2 mb-4 text-rose-700">
              <Heart className="w-4 h-4 fill-rose-600" />
              <span className="text-xs font-bold uppercase tracking-wider">A Message From Your Sister</span>
            </div>

            <blockquote className="font-serif text-base sm:text-lg text-gray-800 leading-relaxed italic mb-6 pl-2 border-l-2 border-rose-300">
              "{rakhiData.message}"
            </blockquote>

            <div className="flex items-center justify-between pt-4 border-t border-amber-100">
              <div>
                <p className="text-xs text-gray-500">With infinite love & blessings,</p>
                <p className="font-serif text-lg font-bold text-gray-900">{rakhiData.sisterName}</p>
              </div>
              
              <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-600 border border-rose-200">
                ❤️
              </div>
            </div>
          </div>

          {/* Interactive Virtual Aarti & Thali */}
          {showThali && (
            <div className="w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
              <VirtualAartiThali sisterName={rakhiData.sisterName} brotherName={recipientDisplayName} />
            </div>
          )}

          {/* Bottom Action Controls */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleShareBack}
              className="px-5 py-2.5 rounded-full bg-white hover:bg-gray-50 text-gray-800 text-xs font-semibold shadow-md border border-gray-200 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-rose-600" /> Share This Rakhi
            </button>

            {onCreateNew && (
              <button
                onClick={onCreateNew}
                className="px-5 py-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5" /> Create a Rakhi for Someone Else ✨
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
