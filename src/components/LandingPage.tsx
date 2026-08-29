import React from 'react';
import { Sparkles, Heart, Send, Gift, ShieldCheck, Globe, ArrowRight } from 'lucide-react';
import { RAKHI_DESIGNS } from '../data/rakhiDesigns';
import { RakhiRenderer } from './Rakhis';
import { ParticleCanvas } from './ParticleCanvas';

interface LandingPageProps {
  onStartCustomizer: () => void;
  onOpenSample: () => void;
  onViewHistory?: () => void;
  savedCount?: number;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartCustomizer,
  onOpenSample,
  onViewHistory,
  savedCount = 0,
}) => {
  return (
    <div className="min-h-screen w-full relative bg-[#FFFDF9] text-[#2D2424] overflow-x-hidden font-sans selection:bg-[#FBE285] selection:text-[#7A1E1E]">
      <ParticleCanvas type="petals" density={22} />

      {/* Top Navbar */}
      <nav className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-600 via-red-600 to-amber-500 flex items-center justify-center text-white shadow-md">
            <span className="text-xl">🎀</span>
          </div>
          <div>
            <span className="font-serif text-xl font-bold tracking-tight text-gray-900 block leading-tight">
              Send a Rakhi
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-amber-700">
              Virtual Raksha Bandhan
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {savedCount > 0 && onViewHistory && (
            <button
              onClick={onViewHistory}
              className="px-3.5 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-semibold border border-amber-200 shadow-xs transition-colors cursor-pointer"
            >
              My Sent Rakhis ({savedCount})
            </button>
          )}

          <button
            onClick={onStartCustomizer}
            className="px-4 sm:px-5 py-2 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm font-semibold shadow-md active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Create Rakhi</span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-8 sm:pt-14 pb-16 text-center">
        
        {/* Festive Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/90 text-amber-950 text-xs font-bold uppercase tracking-wider border border-amber-300 shadow-xs mb-6 animate-in fade-in slide-in-from-bottom-3 duration-500">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Raksha Bandhan 2026 Special
        </div>

        {/* Core Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight leading-[1.1] mb-6 max-w-4xl mx-auto">
          Miles apart, but always connected <span className="text-rose-600">❤️</span>
        </h1>

        {/* Subheadline */}
        <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
          Create a personalized Rakhi and send a little piece of love to your brother, wherever he is in the world.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-16">
          <button
            onClick={onStartCustomizer}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-serif text-lg font-bold shadow-xl hover:shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer group"
          >
            <span>Create Your Rakhi</span>
            <Sparkles className="w-5 h-5 text-amber-200 group-hover:rotate-12 transition-transform" />
          </button>

          <button
            onClick={onOpenSample}
            className="w-full sm:w-auto px-6 py-4 rounded-full bg-white hover:bg-gray-50 text-gray-800 font-semibold text-sm shadow-md border border-gray-200/90 hover:border-rose-300 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>See Sample Experience</span>
            <ArrowRight className="w-4 h-4 text-rose-600" />
          </button>
        </div>

        {/* Interactive Rakhi Showcase Strip */}
        <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-white/95 to-[#FFFBF0]/90 backdrop-blur-md border-2 border-amber-200/70 shadow-2xl">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-amber-100">
            <div className="text-left">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-gray-900">
                Choose from 9 Handcrafted Digital Designs
              </h3>
              <p className="text-xs text-gray-500">From sacred traditional threads & modern blush gold to Marvel Avengers Superhero editions</p>
            </div>
            <span className="hidden sm:inline-flex text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
              Zero App Download Needed
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-3.5">
            {RAKHI_DESIGNS.map((rakhi) => {
              const isHero = rakhi.category === 'superhero';
              return (
                <div
                  key={rakhi.id}
                  onClick={onStartCustomizer}
                  className={`cursor-pointer group p-3.5 rounded-2xl border transition-all duration-300 flex flex-col items-center text-center ${
                    isHero
                      ? 'bg-gradient-to-b from-blue-50/50 via-white to-white border-blue-200 hover:border-blue-500 hover:shadow-lg'
                      : 'bg-white border-gray-200 hover:border-rose-400 hover:shadow-lg'
                  }`}
                >
                  <div className="w-full flex justify-between items-center mb-1">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isHero
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-amber-100 text-amber-900 border border-amber-200'
                      }`}
                    >
                      {rakhi.tag}
                    </span>
                  </div>
                  <div className="h-24 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                    <RakhiRenderer designId={rakhi.id} size={120} />
                  </div>
                  <h4 className="font-semibold text-xs text-gray-900 mt-2 group-hover:text-rose-600 transition-colors">
                    {rakhi.name}
                  </h4>
                  <span className="text-[10px] text-gray-500 line-clamp-1">{rakhi.subtitle}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3-Step Simple User Flow */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-14">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
            Effortless 2-Minute Flow
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mt-3">
            How "Send a Rakhi" Works
          </h2>
          <p className="text-sm text-gray-600 max-w-lg mx-auto mt-2">
            No signup or app download required. Create, copy link, and send right over WhatsApp or message.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="p-6 rounded-3xl bg-white/90 border border-amber-200/80 shadow-md flex flex-col text-left">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-lg mb-4">
              1
            </div>
            <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">
              Pick a Digital Rakhi
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed mb-4">
              Select from sacred classic threads, modern rose gold, or Marvel Avengers superhero editions.
            </p>
            <div className="mt-auto text-xs font-semibold text-rose-600 flex items-center gap-1">
              <span>9 unique styles</span> • <span>Avengers Editions</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-6 rounded-3xl bg-white/90 border border-amber-200/80 shadow-md flex flex-col text-left">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-lg mb-4">
              2
            </div>
            <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">
              Add Your Heartfelt Note
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed mb-4">
              Add his nickname, choose your favorite message template, or write childhood memories only the two of you share.
            </p>
            <div className="mt-auto text-xs font-semibold text-amber-700 flex items-center gap-1">
              <span>Pre-written templates</span> • <span>Free editing</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-6 rounded-3xl bg-white/90 border border-amber-200/80 shadow-md flex flex-col text-left">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center font-bold text-lg mb-4">
              3
            </div>
            <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">
              Brother Opens & Celebrates
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed mb-4">
              He receives a unique shareable link. When opened, he experiences the animated Rakhi reveal, floating petals, and virtual Pooja thali!
            </p>
            <div className="mt-auto text-xs font-semibold text-red-600 flex items-center gap-1">
              <span>WhatsApp 1-click share</span> • <span>Virtual Thali</span>
            </div>
          </div>
        </div>
      </section>

      {/* Emotional Feature Highlights */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-tr from-[#991B1B] via-[#881337] to-[#701A75] text-white shadow-2xl relative overflow-hidden text-center">
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-widest font-bold text-amber-300">
              Spread Joy Across Oceans
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-2 mb-4 leading-tight">
              Whether he's across the street or across the world
            </h2>
            <p className="text-sm sm:text-base text-rose-100/90 leading-relaxed mb-8">
              Distance should never stop a sister from tying a Rakhi and showering her brother with prayers, blessings, and sweet sibling nostalgia.
            </p>

            <button
              onClick={onStartCustomizer}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 hover:from-amber-300 hover:to-yellow-200 text-amber-950 font-serif text-base font-bold shadow-xl hover:shadow-2xl active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <Heart className="w-5 h-5 fill-amber-950" /> Send Rakhi to Your Brother Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8 border-t border-amber-100 text-center text-xs text-gray-500">
        <p className="flex items-center justify-center gap-1.5 font-medium text-gray-700">
          <span>Made with</span>
          <Heart className="w-3.5 h-3.5 fill-rose-600 text-rose-600 inline" />
          <span>for siblings worldwide • Happy Raksha Bandhan</span>
        </p>
      </footer>
    </div>
  );
};
