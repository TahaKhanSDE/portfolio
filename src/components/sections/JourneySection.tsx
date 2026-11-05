'use client';

import React, { useState } from 'react';

export default function JourneySection() {
  const [specsOpen, setSpecsOpen] = useState(false);

  return (
    <section id="journey" className="space-y-6 scroll-mt-20">
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs text-[#FFD13B] font-bold tracking-widest uppercase">// 03 — THE JOURNEY & WORKSPACE CRAFT</span>
        <div className="h-0.5 flex-1 bg-zinc-800"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        {/* Column 1: Hardware Rig */}
        <div className="md:col-span-5 bg-zinc-900 border-2 border-zinc-800 p-6 rounded-lg shadow-[4px_4px_0px_0px_#121316] flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="inline-block px-2.5 py-0.5 bg-[#F4F5F7] text-[#121316] font-mono font-bold text-xs uppercase tracking-wider rounded">
              Self-Taught. Curious. Relentless.
            </div>
            <p className="text-sm text-[#F4F5F7]/90 leading-relaxed">
              My engineering journey began with late-night terminal sessions, breaking systems, digging through source files, and teaching myself what university courses glanced over.
            </p>
          </div>

          <div className="bg-[#121316] border-2 border-zinc-800 p-3.5 rounded-lg shadow-[2px_2px_0px_0px_#121316] relative">
            <div className="aspect-video bg-zinc-900 border border-zinc-800 rounded p-3 flex flex-col justify-between">
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="bg-[#FFD13B] text-[#121316] font-bold px-1.5 py-0.5 rounded">TURISMO CUSTOM RIG</span>
                <span className="text-green-400 font-mono">DESK READY</span>
              </div>

              <div className="flex items-center justify-between px-2 py-1">
                <div className="w-20 h-20 bg-[#121316] border-2 border-zinc-800 rounded flex flex-col items-center justify-around p-1 shadow-[0_0_15px_rgba(255,209,59,0.3)]">
                  <div className="flex gap-1">
                    <div className="w-6 h-6 rounded-full border-2 border-[#FFD13B] flex items-center justify-center animate-spin">
                      <div className="w-1 h-1 rounded-full bg-[#FFD13B]"></div>
                    </div>
                    <div className="w-6 h-6 rounded-full border-2 border-[#FFD13B] flex items-center justify-center animate-spin">
                      <div className="w-1 h-1 rounded-full bg-[#FFD13B]"></div>
                    </div>
                  </div>
                  <div className="w-14 h-3 bg-[#FFD13B]/80 rounded-sm flex items-center justify-center text-[7px] font-mono font-black text-[#121316]">
                    DEV HOST
                  </div>
                </div>

                <div className="flex-1 pl-4 space-y-1 font-mono text-left">
                  <div className="text-xs font-bold text-[#F4F5F7]">Minimalist Dark Desk</div>
                  <div className="text-[10px] text-[#FFD13B]">White Keeb • Sunshine Deskpad</div>
                  <button
                    onClick={() => setSpecsOpen(!specsOpen)}
                    className="text-[10px] bg-[#FFD13B] hover:bg-yellow-400 text-[#121316] font-bold px-2 py-0.5 rounded shadow-[2px_2px_0px_0px_#121316] mt-1"
                  >
                    {specsOpen ? 'Hide Specs' : 'View Specs ➔'}
                  </button>
                </div>
              </div>

              <div className="border-t border-zinc-800 pt-1 flex justify-between items-center text-[10px] font-mono text-zinc-500">
                <span>SETUP // TURISMO YELLOW</span>
                <span className="text-[#FFD13B] font-bold">100% AIRFLOW</span>
              </div>
            </div>

            {specsOpen && (
              <div className="mt-3 p-3 bg-zinc-900 border-2 border-[#FFD13B]/50 rounded font-mono text-[11px] space-y-1 text-[#F4F5F7]">
                <div className="text-[#FFD13B] font-bold border-b border-zinc-800 pb-1">WORKSTATION SPECIFICATIONS</div>
                <div>• Host: Multi-Threaded High-Performance Workstation</div>
                <div>• Containers: Dockerized Microservices & Local Redis Bus</div>
                <div>• Hardware: Mechanical Keyboard & Ergonomic Pointer</div>
              </div>
            )}
          </div>
        </div>

        {/* Column 2: Skyscraper Apex */}
        <div className="md:col-span-4 bg-zinc-900 border-4 border-[#121316] rounded-lg shadow-[6px_6px_0px_0px_#121316] flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-[#121316] pointer-events-none opacity-40">
            <svg viewBox="0 0 300 450" className="w-full h-full object-cover" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polygon points="150,20 280,440 20,440" fill="#1A1C20" stroke="#3A3E47" strokeWidth="2"/>
              <polygon points="150,20 170,120 130,120" fill="#FFD13B" stroke="#ECC029" strokeWidth="2"/>
            </svg>
          </div>

          <div className="p-6 space-y-4 relative z-10">
            <div className="w-10 h-10 rounded-full bg-[#FFD13B] text-[#121316] flex items-center justify-center font-black text-xl shadow-[2px_2px_0px_0px_#121316]">
              “
            </div>
            <h3 className="font-black text-xl sm:text-2xl leading-tight text-[#F4F5F7] tracking-tight">
              Building the next generation of unyielding software engineering from India to compete at global scale.
            </h3>
            <p className="text-xs font-mono text-[#F4F5F7]/85 leading-relaxed">
              Refusing mediocrity. Championing deterministic algorithms, rock-solid distributed design, and world-class product craftsmanship that reaches the apex of engineering.
            </p>
          </div>

          <div className="p-6 pt-0 relative z-10 border-t border-zinc-800 flex items-center justify-between text-xs font-mono">
            <span className="text-[#FFD13B] font-bold uppercase tracking-wider">— FOUNDER&apos;S CREED</span>
            <span className="bg-[#FFD13B] text-[#121316] px-2 py-0.5 rounded font-black text-[10px]">APEX BENCHMARK</span>
          </div>
        </div>

        {/* Column 3: Lone Yellow Umbrella & Community */}
        <div id="community" className="md:col-span-3 bg-zinc-900 border-2 border-zinc-800 p-6 rounded-lg shadow-[4px_4px_0px_0px_#121316] flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="w-full aspect-video bg-[#121316] border border-zinc-800 rounded p-3 flex flex-col items-center justify-center relative overflow-hidden group">
              <div className="grid grid-cols-4 gap-2 opacity-35 text-zinc-600">
                <i className="fa-solid fa-umbrella text-lg"></i>
                <i className="fa-solid fa-umbrella text-lg"></i>
                <i className="fa-solid fa-umbrella text-lg"></i>
                <i className="fa-solid fa-umbrella text-lg"></i>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <i className="fa-solid fa-umbrella text-5xl text-[#FFD13B] drop-shadow-[0_0_18px_rgba(255,209,59,0.9)]"></i>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <h4 className="font-bold text-lg text-[#F4F5F7]">Community Mission</h4>
              <span className="text-[10px] font-mono text-[#FFD13B] font-bold bg-[#FFD13B]/10 px-2 py-0.5 rounded">STAND OUT</span>
            </div>

            <p className="text-xs text-[#F4F5F7]/80 leading-relaxed">
              Believing that talent is everywhere, but access is unequal. Building developer community cohorts in India to help emerging software engineers break free into production architecture.
            </p>
          </div>

          <a href="#contact" className="w-full block text-center py-2 bg-[#121316] hover:bg-[#FFD13B] hover:text-[#121316] border border-zinc-800 font-mono text-xs font-bold text-[#F4F5F7] rounded transition-colors">
            Join the Movement →
          </a>
        </div>
      </div>
    </section>
  );
}