'use client';

import React from 'react';
import { TerminalConfig } from '@/types';

interface HeroSectionProps {
  eyebrow: string;
  headline: string;
  terminal: TerminalConfig;
  onEasterEggClick: () => void;
  primaryEmail: string;
}

export default function HeroSection({
  eyebrow,
  headline,
  terminal,
  onEasterEggClick,
  primaryEmail,
}: HeroSectionProps) {
  const [copyFeedback, setCopyFeedback] = React.useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(primaryEmail);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
      <div className="lg:col-span-7 space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border-2 border-zinc-700 rounded font-mono text-xs text-[#FFD13B] shadow-[2px_2px_0px_0px_#121316]">
          <i className="fa-solid fa-terminal text-[11px]"></i>
          <span>{eyebrow}</span>
        </div>

        <h1 className="font-black text-3xl sm:text-4xl md:text-5xl lg:text-5xl tracking-tight leading-[1.08] text-[#F4F5F7]">
          {headline.includes('Web Platforms') ? (
            <>
              Engineering Scalable <span className="text-[#FFD13B] underline decoration-wavy decoration-[#FFD13B]/40 underline-offset-8">Web Platforms</span>, Distributed Systems & Community Tech.
            </>
          ) : (
            headline
          )}
        </h1>

        <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs">
          <span className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 text-[#F4F5F7]/90 rounded font-semibold hover:border-[#FFD13B]">#TypeScript</span>
          <span className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 text-[#F4F5F7]/90 rounded font-semibold hover:border-[#FFD13B]">#NextJS</span>
          <span className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 text-[#F4F5F7]/90 rounded font-semibold hover:border-[#FFD13B]">#PostgreSQL</span>
          <span className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 text-[#F4F5F7]/90 rounded font-semibold hover:border-[#FFD13B]">#Redis</span>
          <span className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 text-[#F4F5F7]/90 rounded font-semibold hover:border-[#FFD13B]">#Docker</span>
          <span className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 text-[#F4F5F7]/90 rounded font-semibold hover:border-[#FFD13B]">#RealTimeKDS</span>
        </div>

        {/* Live Terminal Block (Status and Metrics editable in Secret Studio) */}
        <div className="border-2 border-zinc-800 bg-[#16181f] rounded-lg shadow-[4px_4px_0px_0px_#121316] p-4 font-mono text-xs space-y-3 relative overflow-hidden group">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-[#FFD13B] inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block"></span>
              <span className="text-[11px] text-zinc-500 ml-2">builder@thk-arch:~ /kds-concurrency-cluster</span>
            </div>
            <button
              onClick={onEasterEggClick}
              title="Click 5 times or press ` for Secret Studio"
              className="text-[10px] text-[#FFD13B] font-bold tracking-wider px-2 py-0.5 rounded border border-[#FFD13B]/30 hover:border-[#FFD13B] transition-all cursor-pointer"
            >
              [{terminal.statusText}]
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="space-y-1.5 text-[#F4F5F7]/90">
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">&gt; boot services ......</span>
                <span className="text-green-400 font-bold">[ OK ]</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">&gt; connect postgresql ..</span>
                <span className="text-green-400 font-bold">[ OK ]</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">&gt; start realtime ws ...</span>
                <span className="text-green-400 font-bold">[ OK ]</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">&gt; queue redis workers .</span>
                <span className="text-green-400 font-bold">[ ACTIVE ]</span>
              </div>
              <p className="text-[11px] text-[#FFD13B] pt-1">&gt; pipeline: edge → api gateway → queue → postgres</p>
            </div>

            <div className="grid grid-cols-2 gap-2 bg-[#121316] p-2.5 border border-zinc-800 rounded">
              <div className="p-2 border border-zinc-800 rounded">
                <div className="text-[10px] uppercase text-zinc-500">Uptime</div>
                <div className="text-sm font-bold text-[#F4F5F7]">{terminal.uptime}</div>
              </div>
              <div className="p-2 border border-zinc-800 rounded">
                <div className="text-[10px] uppercase text-zinc-500">Peak RPS</div>
                <div className="text-sm font-bold text-[#FFD13B]">{terminal.rps}</div>
              </div>
              <div className="p-2 border border-zinc-800 rounded col-span-2 flex items-center justify-between">
                <span className="text-[10px] uppercase text-zinc-500">p99 Latency:</span>
                <span className="text-xs font-bold text-green-400 font-mono">{terminal.latency}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href="#vault"
            className="px-5 py-3 bg-[#FFD13B] text-[#121316] font-extrabold text-sm uppercase tracking-wide border-2 border-[#121316] rounded shadow-[4px_4px_0px_0px_#121316] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center gap-2"
          >
            <span>Explore Selected Works</span>
            <i className="fa-solid fa-arrow-right text-xs"></i>
          </a>
          <button
            onClick={handleCopyEmail}
            className="px-5 py-3 bg-zinc-900 text-[#F4F5F7] font-bold text-sm uppercase tracking-wide border-2 border-zinc-700 rounded shadow-[4px_4px_0px_0px_#121316] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center gap-2"
          >
            <i className="fa-solid fa-envelope text-[#FFD13B]"></i>
            <span>{copyFeedback ? '✓ Copied' : primaryEmail}</span>
          </button>
        </div>
      </div>

      {/* Right Column: Comic Noir Artwork Card */}
      <div className="lg:col-span-5 flex justify-center">
        <div className="w-full max-w-md relative">
          <div className="tape-corner-tl tape-corner-tr bg-zinc-900 border-4 border-[#121316] p-3.5 rounded-lg shadow-[6px_6px_0px_0px_#121316] relative group">
            <div className="relative w-full aspect-[4/5] bg-[#121316] border-2 border-zinc-800 rounded overflow-hidden flex flex-col items-center justify-between p-4">
              <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-transparent to-[#FFD13B]/15 pointer-events-none"></div>

              <div className="w-full flex justify-between items-center text-xs font-mono z-10">
                <span className="bg-[#FFD13B] text-[#121316] font-black px-2 py-0.5 rounded text-[11px] shadow-[2px_2px_0px_0px_#121316]">COMIC NOIR // 01</span>
                <span className="text-[#FFD13B] font-mono font-bold text-[11px]"><i className="fa-solid fa-glasses mr-1"></i>YELLOW LENSES</span>
              </div>

              <div className="w-full h-full flex items-center justify-center relative py-2">
                <svg viewBox="0 0 240 280" className="w-full h-full max-h-72 drop-shadow-2xl transition-transform duration-300 group-hover:scale-105" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="30" cy="50" r="3" fill="#FFD13B"/>
                  <circle cx="215" cy="85" r="2" fill="#FFD13B"/>
                  <path d="M15 110 Q 30 115 25 130" stroke="#FFD13B" strokeWidth="2"/>
                  <path d="M48 95 C 30 45, 80 10, 120 10 C 160 10, 210 45, 192 95 C 205 110, 210 160, 185 195 C 165 225, 75 225, 55 195 C 30 160, 35 110, 48 95 Z" fill="#121316" stroke="#F4F5F7" strokeWidth="3.5"/>
                  <path d="M50 70 L110 20 M65 85 L125 35 M75 100 L135 50 M145 35 L190 75 M155 50 L195 90 M40 130 L80 100 M160 115 L200 145 M170 140 L205 170" stroke="#F4F5F7" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M120 195 L145 270 L95 270 Z" fill="#1A1C20" stroke="#FFD13B" strokeWidth="1.5"/>
                  <path d="M102 215 L138 215 M105 230 L135 230 M108 245 L132 245" stroke="#F4F5F7" strokeWidth="1.5"/>
                  <path d="M120 120 L114 152 L128 152" stroke="#F4F5F7" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M100 174 Q 120 182 140 174" stroke="#F4F5F7" strokeWidth="3" strokeLinecap="round"/>
                  <circle cx="85" cy="112" r="28" fill="#FFD13B" stroke="#121316" strokeWidth="7"/>
                  <circle cx="155" cy="112" r="28" fill="#FFD13B" stroke="#121316" strokeWidth="7"/>
                  <path d="M113 112 L127 112" stroke="#121316" strokeWidth="8" strokeLinecap="round"/>
                  <path d="M72 100 L98 126 M76 96 L102 122" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round"/>
                  <path d="M142 100 L168 126 M146 96 L172 122" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round"/>
                  <circle cx="85" cy="112" r="6" fill="#121316"/>
                  <circle cx="155" cy="112" r="6" fill="#121316"/>
                </svg>

                <div className="absolute bottom-2 right-2 bg-[#FFD13B] text-[#121316] font-mono font-bold text-[10px] px-2 py-1 rotate-2 shadow-[2px_2px_0px_0px_#121316] border border-[#121316]">
                  OBSESSED WITH TECH
                </div>
              </div>

              <div className="w-full pt-2 border-t border-zinc-800 flex justify-between items-center text-[11px] font-mono z-10">
                <span className="text-[#F4F5F7] font-bold">TAHA HAKIM KHAN</span>
                <span className="text-[#FFD13B] font-mono font-bold">BUILDER // SDE-1</span>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-xs font-mono text-zinc-500 px-1">
              <span>REF: COMIC NOIR PRETTY MAN</span>
              <span className="text-[#FFD13B] font-bold">#NOIR_AESTHETIC</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// 'use client';

// import React from 'react';

// interface HeroSectionProps {
//   eyebrow: string;
//   headline: string;
//   latency: string;
//   onEasterEggClick: () => void;
// }

// export default function HeroSection({
//   eyebrow,
//   headline,
//   latency,
//   onEasterEggClick,
// }: HeroSectionProps) {
//   return (
//     <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
//       <div className="lg:col-span-7 space-y-6">
//         <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border-2 border-zinc-700 rounded font-mono text-xs text-[#FFD13B] shadow-[2px_2px_0px_0px_#121316]">
//           <i className="fa-solid fa-terminal text-[11px]"></i>
//           <span>{eyebrow}</span>
//         </div>

//         <h1 className="font-black text-3xl sm:text-4xl md:text-5xl lg:text-5xl tracking-tight leading-[1.08] text-[#F4F5F7]">
//           {headline.includes('Web Platforms') ? (
//             <>
//               Engineering Scalable <span className="text-[#FFD13B] underline decoration-wavy decoration-[#FFD13B]/40 underline-offset-8">Web Platforms</span>, Distributed Systems & Community Tech.
//             </>
//           ) : (
//             headline
//           )}
//         </h1>

//         <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs">
//           <span className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 text-[#F4F5F7]/90 rounded font-semibold hover:border-[#FFD13B]">#TypeScript</span>
//           <span className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 text-[#F4F5F7]/90 rounded font-semibold hover:border-[#FFD13B]">#NextJS</span>
//           <span className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 text-[#F4F5F7]/90 rounded font-semibold hover:border-[#FFD13B]">#PostgreSQL</span>
//           <span className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 text-[#F4F5F7]/90 rounded font-semibold hover:border-[#FFD13B]">#Redis</span>
//           <span className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 text-[#F4F5F7]/90 rounded font-semibold hover:border-[#FFD13B]">#Docker</span>
//           <span className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 text-[#F4F5F7]/90 rounded font-semibold hover:border-[#FFD13B]">#RealTimeKDS</span>
//         </div>

//         {/* Terminal Status Card */}
//         <div className="border-2 border-zinc-800 bg-[#16181f] rounded-lg shadow-[4px_4px_0px_0px_#121316] p-4 font-mono text-xs space-y-3 relative overflow-hidden group">
//           <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5">
//             <div className="flex items-center gap-2">
//               <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
//               <span className="w-3 h-3 rounded-full bg-[#FFD13B] inline-block"></span>
//               <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block"></span>
//               <span className="text-[11px] text-zinc-500 ml-2">builder@thk-arch:~ /kds-concurrency-cluster</span>
//             </div>
//             <button
//               onClick={onEasterEggClick}
//               className="text-[10px] text-[#FFD13B] font-bold tracking-wider px-2 py-0.5 rounded border border-[#FFD13B]/30 hover:border-[#FFD13B] transition-all cursor-pointer"
//             >
//               [SYS: NOMINAL]
//             </button>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
//             <div className="space-y-1.5 text-[#F4F5F7]/90">
//               <div className="flex items-center justify-between">
//                 <span className="text-zinc-500">&gt; boot services ......</span>
//                 <span className="text-green-400 font-bold">[ OK ]</span>
//               </div>
//               <div className="flex items-center justify-between">
//                 <span className="text-zinc-500">&gt; connect postgresql ..</span>
//                 <span className="text-green-400 font-bold">[ OK ]</span>
//               </div>
//               <div className="flex items-center justify-between">
//                 <span className="text-zinc-500">&gt; start realtime ws ...</span>
//                 <span className="text-green-400 font-bold">[ OK ]</span>
//               </div>
//               <div className="flex items-center justify-between">
//                 <span className="text-zinc-500">&gt; queue redis workers .</span>
//                 <span className="text-green-400 font-bold">[ 8 ACTIVE ]</span>
//               </div>
//               <p className="text-[11px] text-[#FFD13B] pt-1">&gt; pipeline: edge → api gateway → queue → postgres</p>
//             </div>

//             <div className="grid grid-cols-2 gap-2 bg-[#121316] p-2.5 border border-zinc-800 rounded">
//               <div className="p-2 border border-zinc-800 rounded">
//                 <div className="text-[10px] uppercase text-zinc-500">Uptime</div>
//                 <div className="text-sm font-bold text-[#F4F5F7]">99.99%</div>
//               </div>
//               <div className="p-2 border border-zinc-800 rounded">
//                 <div className="text-[10px] uppercase text-zinc-500">Peak RPS</div>
//                 <div className="text-sm font-bold text-[#FFD13B]">14.2k</div>
//               </div>
//               <div className="p-2 border border-zinc-800 rounded col-span-2 flex items-center justify-between">
//                 <span className="text-[10px] uppercase text-zinc-500">p99 Latency:</span>
//                 <span className="text-xs font-bold text-green-400 font-mono">{latency}</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-wrap items-center gap-3 pt-2">
//           <a
//             href="#vault"
//             className="px-5 py-3 bg-[#FFD13B] text-[#121316] font-extrabold text-sm uppercase tracking-wide border-2 border-[#121316] rounded shadow-[4px_4px_0px_0px_#121316] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center gap-2"
//           >
//             <span>Explore Selected Works</span>
//             <i className="fa-solid fa-arrow-right text-xs"></i>
//           </a>
//           <a
//             href="#about"
//             className="px-5 py-3 bg-zinc-900 text-[#F4F5F7] font-bold text-sm uppercase tracking-wide border-2 border-zinc-700 rounded shadow-[4px_4px_0px_0px_#121316] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
//           >
//             Read About Me
//           </a>
//           <div className="flex items-center gap-2 pl-2">
//             <a href="https://github.com/TahaKhanSDE" target="_blank" rel="noreferrer" className="p-2.5 bg-zinc-900 hover:bg-[#FFD13B] hover:text-[#121316] border-2 border-zinc-800 rounded text-[#F4F5F7] transition-colors shadow-[2px_2px_0px_0px_#121316]">
//               <i className="fa-brands fa-github text-base"></i>
//             </a>
//             <a href="https://linkedin.com/in/tahakhansde" target="_blank" rel="noreferrer" className="p-2.5 bg-zinc-900 hover:bg-[#FFD13B] hover:text-[#121316] border-2 border-zinc-800 rounded text-[#F4F5F7] transition-colors shadow-[2px_2px_0px_0px_#121316]">
//               <i className="fa-brands fa-linkedin text-base"></i>
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* Right Column: Comic Noir Artwork Card */}
//       <div className="lg:col-span-5 flex justify-center">
//         <div className="w-full max-w-md relative">
//           <div className="tape-corner-tl tape-corner-tr bg-zinc-900 border-4 border-[#121316] p-3.5 rounded-lg shadow-[6px_6px_0px_0px_#121316] relative group">
//             <div className="relative w-full aspect-[4/5] bg-[#121316] border-2 border-zinc-800 rounded overflow-hidden flex flex-col items-center justify-between p-4">
//               <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-transparent to-[#FFD13B]/15 pointer-events-none"></div>

//               <div className="w-full flex justify-between items-center text-xs font-mono z-10">
//                 <span className="bg-[#FFD13B] text-[#121316] font-black px-2 py-0.5 rounded text-[11px] shadow-[2px_2px_0px_0px_#121316]">COMIC NOIR // 01</span>
//                 <span className="text-[#FFD13B] font-mono font-bold text-[11px]"><i className="fa-solid fa-glasses mr-1"></i>YELLOW LENSES</span>
//               </div>

//               <div className="w-full h-full flex items-center justify-center relative py-2">
//                 <svg viewBox="0 0 240 280" className="w-full h-full max-h-72 drop-shadow-2xl transition-transform duration-300 group-hover:scale-105" fill="none" xmlns="http://www.w3.org/2000/svg">
//                   <circle cx="30" cy="50" r="3" fill="#FFD13B"/>
//                   <circle cx="215" cy="85" r="2" fill="#FFD13B"/>
//                   <path d="M15 110 Q 30 115 25 130" stroke="#FFD13B" strokeWidth="2"/>
//                   <path d="M48 95 C 30 45, 80 10, 120 10 C 160 10, 210 45, 192 95 C 205 110, 210 160, 185 195 C 165 225, 75 225, 55 195 C 30 160, 35 110, 48 95 Z" fill="#121316" stroke="#F4F5F7" strokeWidth="3.5"/>
//                   <path d="M50 70 L110 20 M65 85 L125 35 M75 100 L135 50 M145 35 L190 75 M155 50 L195 90 M40 130 L80 100 M160 115 L200 145 M170 140 L205 170" stroke="#F4F5F7" strokeWidth="2" strokeLinecap="round"/>
//                   <path d="M120 195 L145 270 L95 270 Z" fill="#1A1C20" stroke="#FFD13B" strokeWidth="1.5"/>
//                   <path d="M102 215 L138 215 M105 230 L135 230 M108 245 L132 245" stroke="#F4F5F7" strokeWidth="1.5"/>
//                   <path d="M120 120 L114 152 L128 152" stroke="#F4F5F7" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
//                   <path d="M100 174 Q 120 182 140 174" stroke="#F4F5F7" strokeWidth="3" strokeLinecap="round"/>
//                   <circle cx="85" cy="112" r="28" fill="#FFD13B" stroke="#121316" strokeWidth="7"/>
//                   <circle cx="155" cy="112" r="28" fill="#FFD13B" stroke="#121316" strokeWidth="7"/>
//                   <path d="M113 112 L127 112" stroke="#121316" strokeWidth="8" strokeLinecap="round"/>
//                   <path d="M72 100 L98 126 M76 96 L102 122" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round"/>
//                   <path d="M142 100 L168 126 M146 96 L172 122" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round"/>
//                   <circle cx="85" cy="112" r="6" fill="#121316"/>
//                   <circle cx="155" cy="112" r="6" fill="#121316"/>
//                 </svg>

//                 <div className="absolute bottom-2 right-2 bg-[#FFD13B] text-[#121316] font-mono font-bold text-[10px] px-2 py-1 rotate-2 shadow-[2px_2px_0px_0px_#121316] border border-[#121316]">
//                   OBSESSED WITH TECH
//                 </div>
//               </div>

//               <div className="w-full pt-2 border-t border-zinc-800 flex justify-between items-center text-[11px] font-mono z-10">
//                 <span className="text-[#F4F5F7] font-bold">TAHA HAKIM KHAN</span>
//                 <span className="text-[#FFD13B] font-mono font-bold">BUILDER // SDE-1</span>
//               </div>
//             </div>

//             <div className="mt-3 flex items-center justify-between text-xs font-mono text-zinc-500 px-1">
//               <span>REF: COMIC NOIR PRETTY MAN</span>
//               <span className="text-[#FFD13B] font-bold">#NOIR_AESTHETIC</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }