import React, { useState } from 'react';
import { Sparkles, ArrowRight, ArrowLeft, Heart, Check, Palette, Music, Sparkle, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { RakhiData, RakhiDesignId, ThemeId, ParticleType } from '../types';
import { RAKHI_DESIGNS, THEME_CONFIGS, MESSAGE_TEMPLATES } from '../data/rakhiDesigns';
import { RakhiRenderer } from './Rakhis';
import { generateRakhiId, saveRakhiLocally } from '../utils/storage';
import { ParticleCanvas } from './ParticleCanvas';

interface RakhiCustomizerProps {
  onRakhiCreated: (rakhi: RakhiData) => void;
  onCancel: () => void;
}

export const RakhiCustomizer: React.FC<RakhiCustomizerProps> = ({ onRakhiCreated, onCancel }) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'superhero' | 'traditional' | 'modern'>('all');

  // Form State
  const [selectedDesign, setSelectedDesign] = useState<RakhiDesignId>('avengers_shield');
  const [sisterName, setSisterName] = useState('');
  const [brotherName, setBrotherName] = useState('');
  const [brotherNickname, setBrotherNickname] = useState('');
  const [message, setMessage] = useState(
    "Dear Brother, no matter how far apart we are, you'll always be my annoying brother and my forever protector ❤️ Happy Raksha Bandhan!"
  );
  const [selectedTheme, setSelectedTheme] = useState<ThemeId>('saffron');
  const [particleType, setParticleType] = useState<ParticleType>('petals');
  const [musicEnabled, setMusicEnabled] = useState(true);

  // Errors / validation
  const [errorMsg, setErrorMsg] = useState('');

  const activeTheme = THEME_CONFIGS[selectedTheme];

  const handleApplyTemplate = (tplId: string) => {
    const tpl = MESSAGE_TEMPLATES.find((t) => t.id === tplId);
    if (tpl) {
      setMessage(
        tpl.text(
          brotherName.trim() || "{Brother's Name}",
          sisterName.trim() || "{Sister's Name}",
          brotherNickname.trim() || undefined
        )
      );
    }
  };

  const handleNext = () => {
    setErrorMsg('');
    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!sisterName.trim()) {
        setErrorMsg("Please enter the Sister's name");
        return;
      }
      if (!brotherName.trim()) {
        setErrorMsg("Please enter the Brother's name");
        return;
      }
      if (!message.trim()) {
        setErrorMsg('Please write or select a heartfelt message');
        return;
      }
      setCurrentStep(3);
    }
  };

  const handleBack = () => {
    setErrorMsg('');
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as 1 | 2 | 3);
    } else {
      onCancel();
    }
  };

  const handleFinalSubmit = () => {
    if (!sisterName.trim() || !brotherName.trim() || !message.trim()) {
      setErrorMsg('Please fill in all names and your message.');
      return;
    }

    const newRakhi: RakhiData = {
      id: generateRakhiId(),
      designId: selectedDesign,
      sisterName: sisterName.trim(),
      brotherName: brotherName.trim(),
      brotherNickname: brotherNickname.trim() || undefined,
      message: message.trim(),
      themeId: selectedTheme,
      particleType: particleType,
      musicEnabled: musicEnabled,
      createdAt: Date.now(),
    };

    // Save locally
    saveRakhiLocally(newRakhi);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
    });

    onRakhiCreated(newRakhi);
  };

  return (
    <div className={`min-h-screen w-full relative bg-gradient-to-br ${activeTheme.gradient} py-8 px-4 sm:px-6 transition-colors duration-500 font-sans`}>
      <ParticleCanvas type={particleType} density={18} />

      <div className="relative z-10 max-w-5xl mx-auto">
        
        {/* Navigation / Header */}
        <header className="flex items-center justify-between mb-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/80 hover:bg-white text-gray-700 text-xs font-semibold shadow-xs backdrop-blur-md transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> {currentStep === 1 ? 'Cancel' : 'Back'}
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Step {currentStep} of 3</span>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    step === currentStep
                      ? 'w-7 bg-rose-600'
                      : step < currentStep
                      ? 'w-2.5 bg-rose-400'
                      : 'w-2.5 bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </header>

        {/* Main Grid: Builder on Left, Live Preview on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Step Content Form */}
          <div className="lg:col-span-7 bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-xl border border-rose-100">
            
            {/* STEP 1: CHOOSE RAKHI DESIGN */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div>
                  <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-wider mb-2">
                    Step 1
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">
                    Choose a Rakhi Design ✨
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Select from sacred traditional threads or special Marvel & Avengers superhero editions!
                  </p>
                </div>

                {/* Category Filter Pills */}
                <div className="flex flex-wrap gap-2 pt-1 pb-2">
                  {[
                    { id: 'all', label: '🌟 All (9)' },
                    { id: 'superhero', label: '⚡ Avengers & Superheroes (3)', highlight: true },
                    { id: 'traditional', label: '🪷 Traditional & Sacred (3)' },
                    { id: 'modern', label: '💎 Modern & Cute (3)' },
                  ].map((tab) => {
                    const isActive = categoryFilter === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setCategoryFilter(tab.id as any)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                          isActive
                            ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20 scale-102'
                            : tab.highlight
                            ? 'bg-amber-100/90 text-amber-900 hover:bg-amber-200/90 border border-amber-300'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200/80'
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {RAKHI_DESIGNS.filter(
                    (d) => categoryFilter === 'all' || d.category === categoryFilter
                  ).map((design) => {
                    const isSelected = selectedDesign === design.id;
                    const isHero = design.category === 'superhero';
                    return (
                      <div
                        key={design.id}
                        onClick={() => setSelectedDesign(design.id)}
                        className={`relative cursor-pointer p-4 rounded-2xl border-2 transition-all duration-200 flex flex-col justify-between ${
                          isSelected
                            ? 'border-rose-500 bg-rose-50/60 shadow-md ring-2 ring-rose-200'
                            : isHero
                            ? 'border-blue-200/90 hover:border-blue-400 bg-gradient-to-b from-blue-50/40 to-white shadow-xs'
                            : 'border-gray-200/80 hover:border-rose-200 bg-white hover:bg-rose-50/20 shadow-xs'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                              isHero
                                ? 'bg-blue-600 text-white border-blue-700 shadow-xs'
                                : 'bg-amber-100 text-amber-900 border-amber-200'
                            }`}
                          >
                            {design.tag}
                          </span>
                          {isSelected && (
                            <div className="w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-xs">
                              <Check className="w-3.5 h-3.5" />
                            </div>
                          )}
                        </div>

                        {/* Rakhi Visual */}
                        <div className="py-3 flex items-center justify-center">
                          <RakhiRenderer designId={design.id} size={150} />
                        </div>

                        <div className="mt-2 text-left">
                          <h4 className="font-semibold text-sm text-gray-900 flex items-center gap-1.5">
                            {design.name}
                          </h4>
                          <p className="text-xs text-gray-500 line-clamp-1">{design.subtitle}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={handleNext}
                    className="px-6 py-3 rounded-full bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-semibold text-sm shadow-md flex items-center gap-2 transition-all cursor-pointer"
                  >
                    Next: Personalize Message <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: PERSONALIZE MESSAGE */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div>
                  <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-wider mb-2">
                    Step 2
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">
                    Personalize Your Message 💌
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Add names and write something memorable for your brother.
                  </p>
                </div>

                {errorMsg && (
                  <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                      Sister's Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Anushka, Priya, Diya"
                      value={sisterName}
                      onChange={(e) => setSisterName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-hidden transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                      Brother's Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rohan, Aarav, Kabir"
                      value={brotherName}
                      onChange={(e) => setBrotherName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-hidden transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                    Brother's Nickname <span className="text-gray-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Bhaiya, Chintu, Golu, Bro, Hero"
                    value={brotherNickname}
                    onChange={(e) => setBrotherNickname(e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-hidden transition-all"
                  />
                </div>

                {/* Pre-written message templates */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-bold uppercase text-gray-700">
                      Message Templates (Click to fill)
                    </label>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {MESSAGE_TEMPLATES.map((tpl) => (
                      <button
                        key={tpl.id}
                        type="button"
                        onClick={() => handleApplyTemplate(tpl.id)}
                        className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 border border-gray-200 text-xs text-gray-700 transition-colors cursor-pointer"
                      >
                        {tpl.title}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                    Personalized Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write a sweet, emotional, or funny note..."
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-hidden transition-all"
                  />
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="px-5 py-2.5 rounded-full border border-gray-300 text-gray-700 text-xs font-semibold hover:bg-gray-50 cursor-pointer"
                  >
                    Back to Designs
                  </button>

                  <button
                    onClick={handleNext}
                    className="px-6 py-3 rounded-full bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-semibold text-sm shadow-md flex items-center gap-2 transition-all cursor-pointer"
                  >
                    Next: Choose Experience <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: CHOOSE THE EXPERIENCE & THEME */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div>
                  <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-wider mb-2">
                    Step 3
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">
                    Choose the Experience 🎀
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Customize background mood, floating festive effects, and ceremonial chimes.
                  </p>
                </div>

                {/* Theme Selector */}
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-2 flex items-center gap-1.5">
                    <Palette className="w-4 h-4 text-rose-600" /> Background Theme
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {Object.values(THEME_CONFIGS).map((th) => {
                      const isSel = selectedTheme === th.id;
                      return (
                        <button
                          key={th.id}
                          type="button"
                          onClick={() => setSelectedTheme(th.id)}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                            isSel
                              ? 'border-rose-600 bg-rose-50 ring-2 ring-rose-200'
                              : 'border-gray-200 hover:border-rose-200 bg-gray-50'
                          }`}
                        >
                          <div className={`h-6 w-full rounded-md bg-gradient-to-r ${th.gradient} border border-gray-200/60 mb-2`} />
                          <p className="text-xs font-semibold text-gray-900">{th.name}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Floating Effects Selector */}
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-2 flex items-center gap-1.5">
                    <Sparkle className="w-4 h-4 text-amber-600" /> Floating Festive Animation
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {(
                      [
                        { id: 'petals', name: '🌹 Rose Petals' },
                        { id: 'marigold', name: '🪷 Marigold' },
                        { id: 'sparkles', name: '✨ Stardust' },
                        { id: 'confetti', name: '🎊 Confetti' },
                      ] as { id: ParticleType; name: string }[]
                    ).map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setParticleType(p.id)}
                        className={`p-2.5 text-center text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                          particleType === p.id
                            ? 'border-amber-500 bg-amber-50 text-amber-950 ring-2 ring-amber-200'
                            : 'border-gray-200 hover:border-amber-200 bg-white text-gray-700'
                        }`}
                      >
                        {p.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sound / Music Toggle */}
                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
                      <Music className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">Festive Ceremonial Chimes</h4>
                      <p className="text-[11px] text-gray-600">
                        Plays soft temple chimes when your brother opens his greeting.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setMusicEnabled(!musicEnabled)}
                    className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                      musicEnabled ? 'bg-rose-600' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                        musicEnabled ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="px-5 py-2.5 rounded-full border border-gray-300 text-gray-700 text-xs font-semibold hover:bg-gray-50 cursor-pointer"
                  >
                    Back to Message
                  </button>

                  <button
                    onClick={handleFinalSubmit}
                    className="px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-serif text-base font-bold shadow-xl hover:shadow-2xl active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Heart className="w-4 h-4 fill-white" /> Create My Rakhi Link ❤️
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Live Interactive Preview Card */}
          <div className="lg:col-span-5 sticky top-6">
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-xl border-2 border-amber-200/80 text-center relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider bg-amber-100 px-2.5 py-0.5 rounded-full">
                  Live Preview
                </span>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Brother's Greeting View
                </span>
              </div>

              {/* Rakhi Visual Centerpiece */}
              <div className="my-4 py-3 bg-gradient-to-br from-amber-50/50 via-rose-50/40 to-amber-50/50 rounded-2xl border border-amber-100 flex items-center justify-center">
                <RakhiRenderer designId={selectedDesign} size={220} />
              </div>

              {/* Recipient & Sender Names */}
              <div className="space-y-1 my-3">
                <h3 className="font-serif text-xl font-bold text-gray-900">
                  Happy Raksha Bandhan, {brotherNickname || brotherName || "Brother"}! ❤️
                </h3>
                <p className="text-xs text-rose-600 font-semibold">
                  From {sisterName || "Your Sister"}
                </p>
              </div>

              {/* Heartfelt Note Preview */}
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200/80 text-left text-xs text-gray-700 italic leading-relaxed my-3 font-serif">
                "{message}"
              </div>

              <div className="text-[11px] text-gray-400 flex items-center justify-center gap-1 mt-3">
                <span>Theme:</span>
                <span className="font-semibold text-gray-700">{activeTheme.name}</span>
                <span>•</span>
                <span>Particles:</span>
                <span className="font-semibold text-gray-700 capitalize">{particleType}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
