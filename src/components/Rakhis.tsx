import React from 'react';
import { RakhiDesignId } from '../types';

interface RakhiSvgProps {
  className?: string;
  size?: number | string;
  animate?: boolean;
}

export const TraditionalRakhi: React.FC<RakhiSvgProps> = ({ size = 240, animate = true }) => {
  return (
    <div className="relative flex items-center justify-center select-none" style={{ width: size, height: typeof size === 'number' ? size * 0.65 : size }}>
      <svg viewBox="0 0 400 240" className="w-full h-full drop-shadow-xl overflow-visible">
        <defs>
          <linearGradient id="trad-thread-left" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C0392B" stopOpacity="0" />
            <stop offset="30%" stopColor="#E74C3C" />
            <stop offset="70%" stopColor="#F39C12" />
            <stop offset="100%" stopColor="#D35400" />
          </linearGradient>
          <linearGradient id="trad-thread-right" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D35400" />
            <stop offset="30%" stopColor="#F39C12" />
            <stop offset="70%" stopColor="#E74C3C" />
            <stop offset="100%" stopColor="#C0392B" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="trad-gold-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF9D2" />
            <stop offset="45%" stopColor="#F5B041" />
            <stop offset="85%" stopColor="#D4AC0D" />
            <stop offset="100%" stopColor="#9A7D0A" />
          </radialGradient>
          <radialGradient id="trad-ruby-grad" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FF7675" />
            <stop offset="50%" stopColor="#D63031" />
            <stop offset="100%" stopColor="#800000" />
          </radialGradient>
          <filter id="trad-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Left Thread */}
        <g className={animate ? "transition-all duration-700" : ""}>
          <path d="M 0 120 Q 50 105 100 120 T 150 120" fill="none" stroke="url(#trad-thread-left)" strokeWidth="5" strokeLinecap="round" />
          <path d="M 10 120 Q 60 135 110 120 T 160 120" fill="none" stroke="#F1C40F" strokeWidth="2.5" strokeDasharray="6,4" strokeLinecap="round" />
          {/* Beads on left */}
          <circle cx="50" cy="115" r="4.5" fill="url(#trad-gold-grad)" />
          <circle cx="85" cy="120" r="6" fill="#D63031" />
          <circle cx="85" cy="120" r="3" fill="#FFF9D2" />
          <circle cx="120" cy="120" r="7.5" fill="url(#trad-gold-grad)" stroke="#B7950B" strokeWidth="1" />
        </g>

        {/* Right Thread */}
        <g className={animate ? "transition-all duration-700" : ""}>
          <path d="M 250 120 Q 300 105 350 120 T 400 120" fill="none" stroke="url(#trad-thread-right)" strokeWidth="5" strokeLinecap="round" />
          <path d="M 240 120 Q 290 135 340 120 T 390 120" fill="none" stroke="#F1C40F" strokeWidth="2.5" strokeDasharray="6,4" strokeLinecap="round" />
          {/* Beads on right */}
          <circle cx="280" cy="120" r="7.5" fill="url(#trad-gold-grad)" stroke="#B7950B" strokeWidth="1" />
          <circle cx="315" cy="120" r="6" fill="#D63031" />
          <circle cx="315" cy="120" r="3" fill="#FFF9D2" />
          <circle cx="350" cy="115" r="4.5" fill="url(#trad-gold-grad)" />
        </g>

        {/* Center Medallion Base Glow */}
        <circle cx="200" cy="120" r="65" fill="#F39C12" opacity="0.18" filter="url(#trad-glow)" />

        {/* Outer Golden Petals / Sunburst */}
        <g transform="translate(200, 120)">
          {Array.from({ length: 16 }).map((_, i) => (
            <g key={i} transform={`rotate(${i * 22.5})`}>
              <path d="M 0 -58 L 7 -44 L 0 -38 L -7 -44 Z" fill="url(#trad-gold-grad)" stroke="#B7950B" strokeWidth="0.5" />
              <circle cx="0" cy="-56" r="2" fill="#D63031" />
            </g>
          ))}
          {/* Inner Golden Ring */}
          <circle cx="0" cy="0" r="42" fill="url(#trad-gold-grad)" stroke="#9A7D0A" strokeWidth="2" />
          <circle cx="0" cy="0" r="38" fill="#800000" stroke="#F1C40F" strokeWidth="1.5" />

          {/* Pearl border */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const px = Math.cos(angle) * 31;
            const py = Math.sin(angle) * 31;
            return <circle key={i} cx={px} cy={py} r="3" fill="#FFFBF0" stroke="#D4AC0D" strokeWidth="0.8" />;
          })}

          {/* Center Ruby Flower */}
          <circle cx="0" cy="0" r="23" fill="url(#trad-ruby-grad)" filter="url(#trad-glow)" />
          <path d="M 0 -16 L 4 -4 L 16 0 L 4 4 L 0 16 L -4 4 L -16 0 L -4 -4 Z" fill="url(#trad-gold-grad)" />
          <circle cx="0" cy="0" r="6" fill="#FFF9D2" stroke="#D63031" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
};

export const FloralRakhi: React.FC<RakhiSvgProps> = ({ size = 240, animate = true }) => {
  return (
    <div className="relative flex items-center justify-center select-none" style={{ width: size, height: typeof size === 'number' ? size * 0.65 : size }}>
      <svg viewBox="0 0 400 240" className="w-full h-full drop-shadow-xl overflow-visible">
        <defs>
          <linearGradient id="floral-thread" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F472B6" stopOpacity="0" />
            <stop offset="30%" stopColor="#EC4899" />
            <stop offset="70%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#F472B6" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="petal-pink" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FCE7F3" />
            <stop offset="60%" stopColor="#F472B6" />
            <stop offset="100%" stopColor="#DB2777" />
          </linearGradient>
          <linearGradient id="petal-saffron" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FEF3C7" />
            <stop offset="50%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
        </defs>

        {/* Threads */}
        <path d="M 0 120 C 50 95 100 135 150 120" fill="none" stroke="url(#floral-thread)" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M 250 120 C 300 105 350 145 400 120" fill="none" stroke="url(#floral-thread)" strokeWidth="4.5" strokeLinecap="round" />

        {/* Left/Right Jasmine Beads */}
        <circle cx="70" cy="115" r="5" fill="#FFFDF0" stroke="#F472B6" strokeWidth="1" />
        <circle cx="110" cy="122" r="7" fill="#FBBF24" stroke="#D97706" strokeWidth="1" />
        <circle cx="135" cy="120" r="5" fill="#FFFDF0" stroke="#DB2777" strokeWidth="1" />

        <circle cx="265" cy="120" r="5" fill="#FFFDF0" stroke="#DB2777" strokeWidth="1" />
        <circle cx="290" cy="122" r="7" fill="#FBBF24" stroke="#D97706" strokeWidth="1" />
        <circle cx="330" cy="115" r="5" fill="#FFFDF0" stroke="#F472B6" strokeWidth="1" />

        {/* Central Flower */}
        <g transform="translate(200, 120)">
          {/* Leaves */}
          <path d="M -30 -30 Q -50 -10 -35 10 Q -20 -10 -30 -30 Z" fill="#10B981" opacity="0.85" />
          <path d="M 30 -30 Q 50 -10 35 10 Q 20 -10 30 -30 Z" fill="#10B981" opacity="0.85" />

          {/* Outer Layer Saffron Petals */}
          {Array.from({ length: 8 }).map((_, i) => (
            <g key={`s-${i}`} transform={`rotate(${i * 45 + 22.5})`}>
              <path d="M 0 -54 C 14 -35 14 -15 0 0 C -14 -15 -14 -35 0 -54 Z" fill="url(#petal-saffron)" opacity="0.9" />
            </g>
          ))}

          {/* Inner Layer Pink Lotus Petals */}
          {Array.from({ length: 8 }).map((_, i) => (
            <g key={`p-${i}`} transform={`rotate(${i * 45})`}>
              <path d="M 0 -42 C 12 -28 12 -12 0 0 C -12 -12 -12 -28 0 -42 Z" fill="url(#petal-pink)" />
            </g>
          ))}

          {/* Pearl Center */}
          <circle cx="0" cy="0" r="16" fill="#FFFDF5" stroke="#F59E0B" strokeWidth="2" />
          <circle cx="0" cy="0" r="10" fill="#FDF2F8" stroke="#DB2777" strokeWidth="1" />
          <circle cx="-3" cy="-3" r="3" fill="#FFFFFF" />
        </g>
      </svg>
    </div>
  );
};

export const MinimalRakhi: React.FC<RakhiSvgProps> = ({ size = 240 }) => {
  return (
    <div className="relative flex items-center justify-center select-none" style={{ width: size, height: typeof size === 'number' ? size * 0.65 : size }}>
      <svg viewBox="0 0 400 240" className="w-full h-full drop-shadow-lg overflow-visible">
        <defs>
          <linearGradient id="min-thread" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D97706" stopOpacity="0" />
            <stop offset="35%" stopColor="#F59E0B" />
            <stop offset="65%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#B45309" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="min-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="50%" stopColor="#EAB308" />
            <stop offset="100%" stopColor="#A16207" />
          </linearGradient>
        </defs>

        {/* Clean sleek thread */}
        <line x1="10" y1="120" x2="160" y2="120" stroke="url(#min-thread)" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="240" y1="120" x2="390" y2="120" stroke="url(#min-thread)" strokeWidth="3.5" strokeLinecap="round" />

        {/* Subtle gold beads */}
        <circle cx="80" cy="120" r="4" fill="url(#min-gold)" />
        <circle cx="120" cy="120" r="6" fill="url(#min-gold)" />
        <circle cx="280" cy="120" r="6" fill="url(#min-gold)" />
        <circle cx="320" cy="120" r="4" fill="url(#min-gold)" />

        {/* Minimal geometric centerpiece */}
        <g transform="translate(200, 120)">
          {/* Outer thin ring */}
          <circle cx="0" cy="0" r="48" fill="none" stroke="url(#min-gold)" strokeWidth="2" strokeDasharray="3 3" />
          <circle cx="0" cy="0" r="38" fill="#1C1917" stroke="url(#min-gold)" strokeWidth="2.5" />
          
          {/* Sacred geometry octagon */}
          <polygon points="0,-28 20,-20 28,0 20,20 0,28 -20,20 -28,0 -20,-20" fill="none" stroke="url(#min-gold)" strokeWidth="1.5" />
          
          {/* Center Solitaire Diamond Gem */}
          <polygon points="0,-14 14,0 0,14 -14,0" fill="#FFFFFF" stroke="#FDE047" strokeWidth="1" />
          <circle cx="0" cy="0" r="4" fill="#67E8F9" />
          <circle cx="-1" cy="-1" r="1.5" fill="#FFFFFF" />
        </g>
      </svg>
    </div>
  );
};

export const CuteBeadsRakhi: React.FC<RakhiSvgProps> = ({ size = 240 }) => {
  return (
    <div className="relative flex items-center justify-center select-none" style={{ width: size, height: typeof size === 'number' ? size * 0.65 : size }}>
      <svg viewBox="0 0 400 240" className="w-full h-full drop-shadow-md overflow-visible">
        <defs>
          <linearGradient id="cute-thread" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06B6D4" stopOpacity="0" />
            <stop offset="25%" stopColor="#EC4899" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="75%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
          </linearGradient>
        </defs>

        <path d="M 15 120 Q 80 135 150 120" fill="none" stroke="url(#cute-thread)" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M 250 120 Q 320 105 385 120" fill="none" stroke="url(#cute-thread)" strokeWidth="4.5" strokeLinecap="round" />

        {/* Colorful Pompoms / Beads left */}
        <circle cx="50" cy="124" r="7" fill="#06B6D4" />
        <circle cx="80" cy="128" r="8" fill="#EC4899" />
        <circle cx="115" cy="125" r="9" fill="#FBBF24" />
        <circle cx="145" cy="120" r="7" fill="#8B5CF6" />

        {/* Colorful Pompoms / Beads right */}
        <circle cx="255" cy="120" r="7" fill="#8B5CF6" />
        <circle cx="285" cy="115" r="9" fill="#10B981" />
        <circle cx="320" cy="112" r="8" fill="#F43F5E" />
        <circle cx="350" cy="116" r="7" fill="#06B6D4" />

        {/* Cute Smile Sunburst Central Disc */}
        <g transform="translate(200, 120)">
          {/* Soft Pompom ring */}
          {Array.from({ length: 12 }).map((_, i) => {
            const colors = ['#F43F5E', '#FB923C', '#FACC15', '#4ADE80', '#38BDF8', '#A855F7'];
            const angle = (i * 30 * Math.PI) / 180;
            return <circle key={i} cx={Math.cos(angle) * 44} cy={Math.sin(angle) * 44} r="8" fill={colors[i % colors.length]} />;
          })}

          <circle cx="0" cy="0" r="38" fill="#FEF08A" stroke="#F59E0B" strokeWidth="3" />
          
          {/* Cute face / Happy brother-sister vibe */}
          <circle cx="-12" cy="-6" r="4.5" fill="#1E293B" />
          <circle cx="-14" cy="-8" r="1.5" fill="#FFFFFF" />
          <circle cx="12" cy="-6" r="4.5" fill="#1E293B" />
          <circle cx="10" cy="-8" r="1.5" fill="#FFFFFF" />
          
          {/* Rosy cheeks */}
          <ellipse cx="-16" cy="4" rx="4" ry="2.5" fill="#F43F5E" opacity="0.6" />
          <ellipse cx="16" cy="4" rx="4" ry="2.5" fill="#F43F5E" opacity="0.6" />
          
          {/* Big happy smile */}
          <path d="M -10 6 Q 0 16 10 6" fill="none" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
          <path d="M 0 -22 L 4 -16 L -4 -16 Z" fill="#F59E0B" />
        </g>
      </svg>
    </div>
  );
};

export const RoyalPeacockRakhi: React.FC<RakhiSvgProps> = ({ size = 240 }) => {
  return (
    <div className="relative flex items-center justify-center select-none" style={{ width: size, height: typeof size === 'number' ? size * 0.65 : size }}>
      <svg viewBox="0 0 400 240" className="w-full h-full drop-shadow-xl overflow-visible">
        <defs>
          <linearGradient id="royal-thread" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1E3A8A" stopOpacity="0" />
            <stop offset="30%" stopColor="#2563EB" />
            <stop offset="50%" stopColor="#0D9488" />
            <stop offset="70%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#1E3A8A" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="royal-gem" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="40%" stopColor="#1D4ED8" />
            <stop offset="100%" stopColor="#0F172A" />
          </radialGradient>
          <linearGradient id="peacock-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="50%" stopColor="#EAB308" />
            <stop offset="100%" stopColor="#854D0E" />
          </linearGradient>
        </defs>

        <path d="M 5 120 Q 75 105 145 120" fill="none" stroke="url(#royal-thread)" strokeWidth="5" strokeLinecap="round" />
        <path d="M 255 120 Q 325 135 395 120" fill="none" stroke="url(#royal-thread)" strokeWidth="5" strokeLinecap="round" />

        {/* Royal Pearls */}
        <circle cx="65" cy="113" r="5" fill="#E2E8F0" stroke="#3B82F6" strokeWidth="1" />
        <circle cx="105" cy="118" r="7.5" fill="#0D9488" stroke="#FEF08A" strokeWidth="1.5" />
        <circle cx="135" cy="120" r="5" fill="url(#peacock-gold)" />

        <circle cx="265" cy="120" r="5" fill="url(#peacock-gold)" />
        <circle cx="295" cy="122" r="7.5" fill="#0D9488" stroke="#FEF08A" strokeWidth="1.5" />
        <circle cx="335" cy="127" r="5" fill="#E2E8F0" stroke="#3B82F6" strokeWidth="1" />

        {/* Royal Peacock Medallion */}
        <g transform="translate(200, 120)">
          {/* Peacock Feathers Aura */}
          {Array.from({ length: 12 }).map((_, i) => (
            <g key={i} transform={`rotate(${i * 30})`}>
              <path d="M 0 -56 C 8 -44 8 -24 0 -16 C -8 -24 -8 -44 0 -56 Z" fill="#0D9488" stroke="url(#peacock-gold)" strokeWidth="1" />
              <circle cx="0" cy="-44" r="3.5" fill="#1D4ED8" />
              <circle cx="0" cy="-44" r="1.5" fill="#FBBF24" />
            </g>
          ))}

          {/* Golden Filigree Ring */}
          <circle cx="0" cy="0" r="36" fill="url(#peacock-gold)" stroke="#713F12" strokeWidth="1" />
          <circle cx="0" cy="0" r="32" fill="#0F172A" stroke="url(#peacock-gold)" strokeWidth="1.5" />

          {/* Sapphire Jewel Center */}
          <circle cx="0" cy="0" r="22" fill="url(#royal-gem)" />
          <polygon points="0,-15 11,0 0,15 -11,0" fill="none" stroke="#93C5FD" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="5" fill="#FEF08A" stroke="#1E40AF" strokeWidth="1" />
        </g>
      </svg>
    </div>
  );
};

export const ModernPinkGoldRakhi: React.FC<RakhiSvgProps> = ({ size = 240 }) => {
  return (
    <div className="relative flex items-center justify-center select-none" style={{ width: size, height: typeof size === 'number' ? size * 0.65 : size }}>
      <svg viewBox="0 0 400 240" className="w-full h-full drop-shadow-xl overflow-visible">
        <defs>
          <linearGradient id="pink-thread" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F43F5E" stopOpacity="0" />
            <stop offset="35%" stopColor="#FB7185" />
            <stop offset="65%" stopColor="#FDA4AF" />
            <stop offset="100%" stopColor="#F43F5E" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="rosegold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFE4E6" />
            <stop offset="40%" stopColor="#FDA4AF" />
            <stop offset="70%" stopColor="#FB7185" />
            <stop offset="100%" stopColor="#9F1239" />
          </linearGradient>
        </defs>

        <path d="M 10 120 C 60 100 100 140 150 120" fill="none" stroke="url(#pink-thread)" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M 250 120 C 300 100 340 140 390 120" fill="none" stroke="url(#pink-thread)" strokeWidth="4.5" strokeLinecap="round" />

        {/* Rose Quartz Beads */}
        <circle cx="60" cy="110" r="5" fill="#FFE4E6" stroke="#FB7185" strokeWidth="1" />
        <circle cx="100" cy="128" r="7" fill="url(#rosegold)" stroke="#FFF" strokeWidth="1" />
        <circle cx="130" cy="122" r="5.5" fill="#FFF1F2" stroke="#E11D48" strokeWidth="1" />

        <circle cx="270" cy="122" r="5.5" fill="#FFF1F2" stroke="#E11D48" strokeWidth="1" />
        <circle cx="300" cy="128" r="7" fill="url(#rosegold)" stroke="#FFF" strokeWidth="1" />
        <circle cx="340" cy="110" r="5" fill="#FFE4E6" stroke="#FB7185" strokeWidth="1" />

        {/* Rose Gold Mandala */}
        <g transform="translate(200, 120)">
          {/* Subtle Pink Aura */}
          <circle cx="0" cy="0" r="58" fill="#FFE4E6" opacity="0.4" />

          {/* 8 Rose Gold Petals */}
          {Array.from({ length: 8 }).map((_, i) => (
            <g key={i} transform={`rotate(${i * 45})`}>
              <path d="M 0 -48 C 12 -34 10 -18 0 0 C -10 -18 -12 -34 0 -48 Z" fill="url(#rosegold)" />
              <circle cx="0" cy="-45" r="2.5" fill="#FFFFFF" />
            </g>
          ))}

          {/* Center Crystal Disc */}
          <circle cx="0" cy="0" r="30" fill="#FFF1F2" stroke="url(#rosegold)" strokeWidth="2.5" />
          <circle cx="0" cy="0" r="22" fill="#E11D48" />

          {/* Heart center motif */}
          <path d="M 0 -6 C -6 -12 -12 -4 -6 4 L 0 11 L 6 4 C 12 -4 6 -12 0 -6 Z" fill="#FFE4E6" />
        </g>
      </svg>
    </div>
  );
};

export const CaptainAmericaRakhi: React.FC<RakhiSvgProps> = ({ size = 240 }) => {
  return (
    <div className="relative flex items-center justify-center select-none" style={{ width: size, height: typeof size === 'number' ? size * 0.65 : size }}>
      <svg viewBox="0 0 400 240" className="w-full h-full drop-shadow-xl overflow-visible">
        <defs>
          <linearGradient id="cap-thread-left" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1E3A8A" stopOpacity="0" />
            <stop offset="40%" stopColor="#2563EB" />
            <stop offset="70%" stopColor="#DC2626" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>
          <linearGradient id="cap-thread-right" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="30%" stopColor="#DC2626" />
            <stop offset="60%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#1E3A8A" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="vibranium-silver" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#E2E8F0" />
            <stop offset="80%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#64748B" />
          </radialGradient>
        </defs>

        {/* Braided Patriotic Thread */}
        <path d="M 5 120 Q 75 105 145 120" fill="none" stroke="url(#cap-thread-left)" strokeWidth="5.5" strokeLinecap="round" />
        <path d="M 5 120 Q 75 135 145 120" fill="none" stroke="#DC2626" strokeWidth="2.5" strokeDasharray="6 4" strokeLinecap="round" />
        <path d="M 255 120 Q 325 105 395 120" fill="none" stroke="url(#cap-thread-right)" strokeWidth="5.5" strokeLinecap="round" />
        <path d="M 255 120 Q 325 135 395 120" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeDasharray="6 4" strokeLinecap="round" />

        {/* Beads */}
        <circle cx="65" cy="115" r="5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="1" />
        <circle cx="100" cy="120" r="7.5" fill="#DC2626" stroke="#FEF08A" strokeWidth="1.5" />
        <circle cx="130" cy="120" r="5" fill="#E2E8F0" />

        <circle cx="270" cy="120" r="5" fill="#E2E8F0" />
        <circle cx="300" cy="120" r="7.5" fill="#DC2626" stroke="#FEF08A" strokeWidth="1.5" />
        <circle cx="335" cy="115" r="5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="1" />

        {/* Vibranium Shield Medallion */}
        <g transform="translate(200, 120)">
          {/* Outer Glow */}
          <circle cx="0" cy="0" r="62" fill="#3B82F6" opacity="0.25" />

          {/* Red Ring 1 */}
          <circle cx="0" cy="0" r="52" fill="#DC2626" stroke="#991B1B" strokeWidth="1.5" />
          {/* Silver Ring 2 */}
          <circle cx="0" cy="0" r="41" fill="url(#vibranium-silver)" stroke="#64748B" strokeWidth="1" />
          {/* Red Ring 3 */}
          <circle cx="0" cy="0" r="30" fill="#DC2626" stroke="#991B1B" strokeWidth="1" />
          {/* Blue Center Disc */}
          <circle cx="0" cy="0" r="19" fill="#1D4ED8" stroke="#1E3A8A" strokeWidth="1" />

          {/* Hero Star */}
          <polygon
            points="0,-16 4.7,-4.8 16.2,-4.8 7,-1.8 10.5,9.6 0,3.5 -10.5,9.6 -7,-1.8 -16.2,-4.8 -4.7,-4.8"
            fill="url(#vibranium-silver)"
            stroke="#475569"
            strokeWidth="0.8"
          />
        </g>
      </svg>
    </div>
  );
};

export const IronManArcRakhi: React.FC<RakhiSvgProps> = ({ size = 240 }) => {
  return (
    <div className="relative flex items-center justify-center select-none" style={{ width: size, height: typeof size === 'number' ? size * 0.65 : size }}>
      <svg viewBox="0 0 400 240" className="w-full h-full drop-shadow-xl overflow-visible">
        <defs>
          <linearGradient id="iron-thread" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#991B1B" stopOpacity="0" />
            <stop offset="30%" stopColor="#DC2626" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="70%" stopColor="#DC2626" />
            <stop offset="100%" stopColor="#991B1B" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="arc-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="35%" stopColor="#67E8F9" />
            <stop offset="75%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#0891B2" />
          </radialGradient>
          <linearGradient id="armor-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="50%" stopColor="#EAB308" />
            <stop offset="100%" stopColor="#A16207" />
          </linearGradient>
        </defs>

        {/* Hot Rod Red & Gold Thread */}
        <line x1="10" y1="120" x2="145" y2="120" stroke="url(#iron-thread)" strokeWidth="5" strokeLinecap="round" />
        <line x1="10" y1="120" x2="145" y2="120" stroke="#F59E0B" strokeWidth="2" strokeDasharray="5 3" />
        <line x1="255" y1="120" x2="390" y2="120" stroke="url(#iron-thread)" strokeWidth="5" strokeLinecap="round" />
        <line x1="255" y1="120" x2="390" y2="120" stroke="#F59E0B" strokeWidth="2" strokeDasharray="5 3" />

        {/* Titanium Gold & Ruby Beads */}
        <circle cx="65" cy="120" r="5" fill="url(#armor-gold)" />
        <circle cx="100" cy="120" r="8" fill="#B91C1C" stroke="url(#armor-gold)" strokeWidth="2" />
        <circle cx="130" cy="120" r="5.5" fill="#06B6D4" stroke="#FFFFFF" strokeWidth="1" />

        <circle cx="270" cy="120" r="5.5" fill="#06B6D4" stroke="#FFFFFF" strokeWidth="1" />
        <circle cx="300" cy="120" r="8" fill="#B91C1C" stroke="url(#armor-gold)" strokeWidth="2" />
        <circle cx="335" cy="120" r="5" fill="url(#armor-gold)" />

        {/* Arc Reactor Medallion */}
        <g transform="translate(200, 120)">
          {/* Repulsor Glow */}
          <circle cx="0" cy="0" r="60" fill="#06B6D4" opacity="0.3" className="animate-pulse" />

          {/* Titanium Red Armor Casing */}
          <circle cx="0" cy="0" r="50" fill="#991B1B" stroke="url(#armor-gold)" strokeWidth="2.5" />
          <circle cx="0" cy="0" r="44" fill="#1E293B" stroke="url(#armor-gold)" strokeWidth="1.5" />

          {/* Arc Reactor Coils (10 segments) */}
          {Array.from({ length: 10 }).map((_, i) => (
            <g key={i} transform={`rotate(${i * 36})`}>
              <rect x="-4" y="-38" width="8" height="7" rx="1.5" fill="url(#armor-gold)" stroke="#78350F" strokeWidth="0.5" />
            </g>
          ))}

          {/* Arc Core Radiant Disc */}
          <circle cx="0" cy="0" r="28" fill="url(#arc-glow)" stroke="#FFFFFF" strokeWidth="1.5" />
          {/* Center Triangular Core */}
          <polygon points="0,-16 14,8 -14,8" fill="none" stroke="#FFFFFF" strokeWidth="2" />
          <polygon points="0,-12 10,6 -10,6" fill="#ECFEFF" />
          <circle cx="0" cy="0" r="4" fill="#FFFFFF" />
        </g>
      </svg>
    </div>
  );
};

export const SpidermanWebRakhi: React.FC<RakhiSvgProps> = ({ size = 240 }) => {
  return (
    <div className="relative flex items-center justify-center select-none" style={{ width: size, height: typeof size === 'number' ? size * 0.65 : size }}>
      <svg viewBox="0 0 400 240" className="w-full h-full drop-shadow-xl overflow-visible">
        <defs>
          <linearGradient id="spidey-thread" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1E3A8A" stopOpacity="0" />
            <stop offset="30%" stopColor="#DC2626" />
            <stop offset="50%" stopColor="#2563EB" />
            <stop offset="70%" stopColor="#DC2626" />
            <stop offset="100%" stopColor="#1E3A8A" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Web Silk Thread */}
        <path d="M 10 120 Q 80 140 145 120" fill="none" stroke="url(#spidey-thread)" strokeWidth="5" strokeLinecap="round" />
        <path d="M 255 120 Q 320 100 390 120" fill="none" stroke="url(#spidey-thread)" strokeWidth="5" strokeLinecap="round" />

        {/* Spider Web Beads */}
        <circle cx="60" cy="126" r="6" fill="#DC2626" stroke="#000" strokeWidth="1" />
        <circle cx="95" cy="130" r="7.5" fill="#2563EB" stroke="#FFF" strokeWidth="1.5" />
        <circle cx="130" cy="124" r="5" fill="#18181B" stroke="#DC2626" strokeWidth="1" />

        <circle cx="270" cy="120" r="5" fill="#18181B" stroke="#DC2626" strokeWidth="1" />
        <circle cx="305" cy="114" r="7.5" fill="#2563EB" stroke="#FFF" strokeWidth="1.5" />
        <circle cx="340" cy="116" r="6" fill="#DC2626" stroke="#000" strokeWidth="1" />

        {/* Webbed Spider Emblem Medallion */}
        <g transform="translate(200, 120)">
          <circle cx="0" cy="0" r="50" fill="#E11D48" stroke="#18181B" strokeWidth="3" />
          
          {/* Spider Web radial lines */}
          {Array.from({ length: 8 }).map((_, i) => (
            <line key={i} x1="0" y1="0" x2={Math.cos((i * 45 * Math.PI) / 180) * 48} y2={Math.sin((i * 45 * Math.PI) / 180) * 48} stroke="#18181B" strokeWidth="1.5" />
          ))}
          <circle cx="0" cy="0" r="22" fill="none" stroke="#18181B" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="36" fill="none" stroke="#18181B" strokeWidth="1.5" />

          {/* Iconic Spider Logo */}
          <ellipse cx="0" cy="2" rx="6" ry="11" fill="#18181B" />
          <circle cx="0" cy="-11" r="5" fill="#18181B" />
          
          {/* Spider Legs */}
          <path d="M -4 -6 Q -18 -18 -20 -10" fill="none" stroke="#18181B" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 4 -6 Q 18 -18 20 -10" fill="none" stroke="#18181B" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M -5 -1 Q -24 -6 -22 6" fill="none" stroke="#18181B" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 5 -1 Q 24 -6 22 6" fill="none" stroke="#18181B" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M -5 5 Q -22 14 -16 22" fill="none" stroke="#18181B" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 5 5 Q 22 14 16 22" fill="none" stroke="#18181B" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
};

export const RakhiRenderer: React.FC<{ designId: RakhiDesignId; size?: number | string; animate?: boolean; className?: string }> = ({
  designId,
  size = 240,
  animate = true,
  className = '',
}) => {
  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      {designId === 'traditional' && <TraditionalRakhi size={size} animate={animate} />}
      {designId === 'floral' && <FloralRakhi size={size} animate={animate} />}
      {designId === 'minimal' && <MinimalRakhi size={size} animate={animate} />}
      {designId === 'cute' && <CuteBeadsRakhi size={size} animate={animate} />}
      {designId === 'royal' && <RoyalPeacockRakhi size={size} animate={animate} />}
      {designId === 'pink' && <ModernPinkGoldRakhi size={size} animate={animate} />}
      {designId === 'avengers_shield' && <CaptainAmericaRakhi size={size} animate={animate} />}
      {designId === 'avengers_ironman' && <IronManArcRakhi size={size} animate={animate} />}
      {designId === 'avengers_spidey' && <SpidermanWebRakhi size={size} animate={animate} />}
    </div>
  );
};
