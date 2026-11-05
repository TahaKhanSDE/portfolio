'use client';

import React from 'react';

interface NavbarProps {
  onOpenInspo: () => void;
  availability: string;
  resumeUrl: string;
  isMobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
}

export default function Navbar({
  onOpenInspo,
  availability,
  resumeUrl,
  isMobileMenuOpen,
  onToggleMobileMenu,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-zinc-800 bg-[#121316]/95 backdrop-blur-md px-4 sm:px-8">
      <div className="max-w-7xl mx-auto h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 bg-[#FFD13B] text-[#121316] flex items-center justify-center font-black text-base border-2 border-[#121316] shadow-[2px_2px_0px_0px_#121316] group-hover:-translate-y-0.5 transition-transform flex-shrink-0">
            TK
          </div>
          <div className="leading-none">
            <div className="font-black tracking-tight text-base sm:text-lg text-[#F4F5F7] flex items-center gap-1.5 leading-none">
              <span>Taha Khan</span>
              <span className="text-[#FFD13B] text-[10px] font-mono font-bold bg-[#FFD13B]/15 px-1.5 py-0.5 border border-[#FFD13B]/40 rounded leading-none">
                THK.dev
              </span>
            </div>
            <span className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider pt-1 leading-none">
              Full-Stack & Systems
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-5 font-mono text-xs uppercase tracking-wider text-[#F4F5F7]/80">
          <a href="#about" className="hover:text-[#FFD13B] transition-colors pb-0.5 border-b-2 border-transparent hover:border-[#FFD13B]">About</a>
          <a href="#experience" className="hover:text-[#FFD13B] transition-colors pb-0.5 border-b-2 border-transparent hover:border-[#FFD13B]">Experience</a>
          <a href="#vault" className="hover:text-[#FFD13B] transition-colors pb-0.5 border-b-2 border-transparent hover:border-[#FFD13B]">Selected Works</a>
          <a href="#journey" className="hover:text-[#FFD13B] transition-colors pb-0.5 border-b-2 border-transparent hover:border-[#FFD13B]">The Journey</a>
          <a href="#community" className="hover:text-[#FFD13B] transition-colors pb-0.5 border-b-2 border-transparent hover:border-[#FFD13B]">Community</a>
          <a href="#social-proof" className="hover:text-[#FFD13B] transition-colors pb-0.5 border-b-2 border-transparent hover:border-[#FFD13B]">Social Proof</a>
          <a href="#contact" className="hover:text-[#FFD13B] transition-colors pb-0.5 border-b-2 border-transparent hover:border-[#FFD13B]">Contact</a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <button
            onClick={onOpenInspo}
            className="px-2.5 py-1.5 bg-[#FFD13B]/10 hover:bg-[#FFD13B] hover:text-[#121316] border-2 border-[#FFD13B]/50 text-[#FFD13B] text-xs font-mono font-bold rounded flex items-center gap-1.5 shadow-[2px_2px_0px_0px_#121316] transition-all"
            title="Inspect Cyber-Noir Visual References"
          >
            <i className="fa-solid fa-camera-retro"></i>
            <span className="hidden md:inline">Inspo</span>
          </button>

          <div className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-[#0f241a] border border-[#166534] text-[#4ade80] rounded font-mono text-[11px] leading-none">
            <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse"></span>
            <span>{availability}</span>
          </div>

          {/* Direct Resume View / Download */}
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 bg-[#F4F5F7] text-[#121316] font-bold text-xs uppercase tracking-wider border-2 border-[#121316] rounded shadow-[3px_3px_0px_0px_#121316] hover:bg-[#FFD13B] hover:shadow-[3px_3px_0px_0px_#FFD13B] transition-all leading-none inline-flex items-center gap-1.5"
          >
            <span>Resume</span>
            <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
          </a>

          <button
            onClick={onToggleMobileMenu}
            className="xl:hidden p-2 bg-zinc-900 hover:bg-zinc-800 border-2 border-zinc-700 rounded text-[#F4F5F7] text-sm"
            aria-label="Toggle navigation menu"
          >
            <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="xl:hidden border-t border-zinc-800 bg-[#16181f]/98 backdrop-blur-xl px-4 py-4 space-y-3 font-mono text-xs">
          <div className="grid grid-cols-2 gap-2 text-center">
            <a href="#about" onClick={onToggleMobileMenu} className="p-2.5 bg-[#121316] border border-zinc-800 rounded hover:border-[#FFD13B] hover:text-[#FFD13B] font-bold">About</a>
            <a href="#experience" onClick={onToggleMobileMenu} className="p-2.5 bg-[#121316] border border-zinc-800 rounded hover:border-[#FFD13B] hover:text-[#FFD13B] font-bold">Experience</a>
            <a href="#vault" onClick={onToggleMobileMenu} className="p-2.5 bg-[#121316] border border-zinc-800 rounded hover:border-[#FFD13B] hover:text-[#FFD13B] font-bold">Selected Works</a>
            <a href="#journey" onClick={onToggleMobileMenu} className="p-2.5 bg-[#121316] border border-zinc-800 rounded hover:border-[#FFD13B] hover:text-[#FFD13B] font-bold">The Journey</a>
            <a href="#community" onClick={onToggleMobileMenu} className="p-2.5 bg-[#121316] border border-zinc-800 rounded hover:border-[#FFD13B] hover:text-[#FFD13B] font-bold">Community</a>
            <a href="#contact" onClick={onToggleMobileMenu} className="p-2.5 bg-[#121316] border border-zinc-800 rounded hover:border-[#FFD13B] hover:text-[#FFD13B] font-bold">Contact</a>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-zinc-800 text-[11px]">
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 bg-[#FFD13B] text-[#121316] font-bold rounded shadow-[2px_2px_0px_0px_#121316]"
            >
              Open Resume ↗
            </a>
            <a href="#contact" onClick={onToggleMobileMenu} className="text-[#FFD13B] font-bold">
              Contact Me →
            </a>
          </div>
        </div>
      )}
    </header>
  );
}