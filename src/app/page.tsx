'use client';

import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/sections/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import JourneySection from '@/components/sections/JourneySection';
import CrosswalkDivider from '@/components/sections/CrosswalkDivider';
import VaultSection from '@/components/sections/VaultSection';
import SocialProofSection from '@/components/sections/SocialProofSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/sections/Footer';
import StudioModals from '@/components/studio/StudioModals';
import { usePortfolio } from '@/context/PortfolioContext';

export default function PortfolioPage() {
  const { state } = usePortfolio();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [inspoOpen, setInspoOpen] = useState(false);
  const [newBuildModalOpen, setNewBuildModalOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [utcTime, setUtcTime] = useState('12:00:00');
  const easterEggCount = useRef(0);
  const easterEggTimer = useRef<NodeJS.Timeout | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleEasterEgg = () => {
    easterEggCount.current += 1;
    if (easterEggTimer.current) clearTimeout(easterEggTimer.current);
    easterEggTimer.current = setTimeout(() => {
      easterEggCount.current = 0;
    }, 1500);

    if (easterEggCount.current >= 5) {
      easterEggCount.current = 0;
      setAdminOpen(true);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`' || e.key === '~') {
        const tag = (e.target as HTMLElement)?.tagName;
        if (tag !== 'INPUT' && tag !== 'TEXTAREA') {
          e.preventDefault();
          setAdminOpen((prev) => !prev);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toUTCString().split(' ')[4] || '');
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#121316] text-[#F4F5F7] font-sans antialiased bg-grid-pattern selection:bg-[#FFD13B] selection:text-[#121316]">
      <Navbar
        onOpenInspo={() => setInspoOpen(true)}
        availability={state.availability}
        resumeUrl={state.contact.resumeUrl}
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-10 md:py-16 space-y-24">
        <HeroSection
          eyebrow={state.eyebrow}
          headline={state.headline}
          terminal={state.terminal}
          onEasterEggClick={handleEasterEgg}
          primaryEmail={state.contact.primaryEmail}
        />
        <AboutSection />
        <ExperienceSection experiences={state.experiences} />
        <JourneySection />
        <CrosswalkDivider />
        <VaultSection
          projects={state.projects}
          onOpenNewBuildModal={() => setNewBuildModalOpen(true)}
        />
        <SocialProofSection />
        <ContactSection contact={state.contact} />
      </main>

      <Footer utcTime={utcTime} onEasterEggClick={handleEasterEgg} />

      <StudioModals
        inspoOpen={inspoOpen}
        onCloseInspo={() => setInspoOpen(false)}
        newBuildModalOpen={newBuildModalOpen}
        onCloseNewBuildModal={() => setNewBuildModalOpen(false)}
        adminOpen={adminOpen}
        onCloseAdmin={() => setAdminOpen(false)}
        onToast={showToast}
      />

      {toastMessage && (
        <div className="fixed bottom-5 right-5 bg-[#FFD13B] text-[#121316] font-mono font-bold text-xs p-3 rounded border-2 border-[#121316] shadow-[4px_4px_0px_0px_#121316] z-50 animate-bounce">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
