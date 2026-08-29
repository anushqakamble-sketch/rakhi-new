/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { RakhiCustomizer } from './components/RakhiCustomizer';
import { RecipientExperience } from './components/RecipientExperience';
import { ShareModal } from './components/ShareModal';
import { SentHistoryModal } from './components/SentHistoryModal';
import { RakhiData } from './types';
import { decodeRakhiFromUrl, getRakhiById, getSavedRakhis } from './utils/storage';

type AppView = 'landing' | 'customize' | 'recipient';

const SAMPLE_RAKHI: RakhiData = {
  id: 'sample-rakhi-demo',
  designId: 'traditional',
  sisterName: 'Anushka',
  brotherName: 'Rohan',
  brotherNickname: 'Bhaiya',
  message:
    "Dear Bhaiya, no matter how far apart we are, you'll always be my annoying brother and my forever protector ❤️ Wishing you endless joy, health, and success! Happy Raksha Bandhan!",
  themeId: 'saffron',
  particleType: 'petals',
  musicEnabled: true,
  createdAt: Date.now(),
};

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [activeRakhi, setActiveRakhi] = useState<RakhiData | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [savedCount, setSavedCount] = useState(getSavedRakhis().length);

  // Parse URL on mount and when hash changes
  useEffect(() => {
    const handleUrlRouting = () => {
      const hash = window.location.hash;
      const search = window.location.search;

      // 1. Check for encoded query data (?d=...)
      const urlParams = new URLSearchParams(search || (hash.includes('?') ? hash.split('?')[1] : ''));
      const encodedData = urlParams.get('d');

      if (encodedData) {
        const decoded = decodeRakhiFromUrl(encodedData);
        if (decoded) {
          setActiveRakhi(decoded);
          setCurrentView('recipient');
          return;
        }
      }

      // 2. Check for hash route #/rakhi/{id} or #rakhi/{id}
      if (hash.includes('rakhi/')) {
        const parts = hash.split('rakhi/')[1]?.split('?')[0];
        if (parts) {
          const localRakhi = getRakhiById(parts);
          if (localRakhi) {
            setActiveRakhi(localRakhi);
            setCurrentView('recipient');
            return;
          }
        }
      }
    };

    handleUrlRouting();
    window.addEventListener('hashchange', handleUrlRouting);
    return () => window.removeEventListener('hashchange', handleUrlRouting);
  }, []);

  const refreshSavedCount = () => {
    setSavedCount(getSavedRakhis().length);
  };

  const handleStartCustomizer = () => {
    setCurrentView('customize');
  };

  const handleOpenSample = () => {
    setActiveRakhi(SAMPLE_RAKHI);
    setCurrentView('recipient');
  };

  const handleRakhiCreated = (rakhi: RakhiData) => {
    setActiveRakhi(rakhi);
    refreshSavedCount();
    setShowShareModal(true);
  };

  const handleGoHome = () => {
    window.location.hash = '';
    setCurrentView('landing');
    setShowShareModal(false);
  };

  const handlePreviewRecipient = () => {
    setShowShareModal(false);
    setCurrentView('recipient');
  };

  return (
    <main className="min-h-screen w-full bg-[#FFFDF9]">
      {/* 1. LANDING PAGE */}
      {currentView === 'landing' && (
        <LandingPage
          onStartCustomizer={handleStartCustomizer}
          onOpenSample={handleOpenSample}
          onViewHistory={() => setShowHistoryModal(true)}
          savedCount={savedCount}
        />
      )}

      {/* 2. CUSTOMIZER EXPERIENCE */}
      {currentView === 'customize' && (
        <RakhiCustomizer
          onRakhiCreated={handleRakhiCreated}
          onCancel={handleGoHome}
        />
      )}

      {/* 3. BROTHER RECIPIENT EXPERIENCE */}
      {currentView === 'recipient' && activeRakhi && (
        <RecipientExperience
          rakhiData={activeRakhi}
          onGoHome={handleGoHome}
          onCreateNew={handleStartCustomizer}
        />
      )}

      {/* MODALS */}
      {showShareModal && activeRakhi && (
        <ShareModal
          rakhiData={activeRakhi}
          onClose={() => setShowShareModal(false)}
          onPreviewRecipient={handlePreviewRecipient}
        />
      )}

      {showHistoryModal && (
        <SentHistoryModal
          onClose={() => setShowHistoryModal(false)}
          onSelectRakhi={(r) => {
            setActiveRakhi(r);
            setShowHistoryModal(false);
            setCurrentView('recipient');
          }}
          onRefresh={refreshSavedCount}
        />
      )}
    </main>
  );
}
