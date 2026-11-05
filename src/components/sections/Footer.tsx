'use client';

import React from 'react';

interface FooterProps {
  utcTime: string;
  onEasterEggClick: () => void;
}

export default function Footer({ utcTime, onEasterEggClick }: FooterProps) {
  return (
    <footer className="w-full border-t-2 border-zinc-800 bg-zinc-900 py-8 px-4 sm:px-8 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-zinc-500">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FFD13B]"></span>
          <span className="text-[#F4F5F7] font-bold">TAHA HAKIM KHAN</span>
          <span>— © 2026 All rights reserved.</span>
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          <button
            onClick={onEasterEggClick}
            className="text-zinc-500 hover:text-[#FFD13B] transition-colors cursor-pointer"
            title="System Core"
          >
            [TK // SYSTEM_CORE]
          </button>
          <span>•</span>
          <span>UTC: <span className="text-[#FFD13B] font-bold">{utcTime}</span></span>
          <span>•</span>
          <span>Next.js 16 Monorepo</span>
        </div>
      </div>
    </footer>
  );
}