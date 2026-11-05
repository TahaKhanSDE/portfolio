'use client';

import React from 'react';
import Image from 'next/image';

export default function AboutSection() {
  return (
    <section id="about" className="py-12 space-y-8">
      {/* Section Eyebrow */}
      <div className="flex items-center gap-3 border-b-2 border-zinc-800 pb-3">
        <span className="font-mono text-xs font-black text-[#FFD13B] tracking-wider uppercase">
          // 01 — ABOUT THE ENGINEER & PHILOSOPHY
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: High-Fidelity Shadow Art Card */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#121316] border-2 border-zinc-800 rounded-lg p-5 shadow-[6px_6px_0px_0px_#121316] space-y-4 relative overflow-hidden group">
            
            {/* Top Badges */}
            <div className="flex items-center justify-between font-mono text-[11px] z-20 relative">
              <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-700 text-[#F4F5F7] font-bold rounded uppercase">
                ART // BLINDED BY THE LIGHTS
              </span>
              <span className="text-[#FFD13B] font-bold">EST. 2026</span>
            </div>

            {/* Framed Image Canvas */}
            <div className="relative w-full aspect-[4/5] bg-zinc-950 border border-zinc-800 rounded overflow-hidden flex items-center justify-center">
              {/* Fallback Blindfolded Vector Skeleton */}
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-20 pointer-events-none">
                <div className="w-28 h-36 border-4 border-zinc-500 rounded-full relative flex items-center justify-center">
                  <div className="w-36 h-8 bg-[#FFD13B] -rotate-6 shadow-md"></div>
                </div>
              </div>

              {/* High-Fidelity Crosswalk Shadow Photo */}
              <Image
                src="/about-shadow.jpg"
                alt="Taha Hakim Khan - Crosswalk Shadow & Urban Geometry"
                fill
                sizes="(max-width: 768px) 100vw, 420px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Cyber-Noir Contrast Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#121316]/90 via-transparent to-black/10 pointer-events-none" />

              {/* Bottom Quote Overlay */}
              <div className="absolute bottom-3 left-3 right-3 z-10 border-l-2 border-[#FFD13B] pl-2.5 bg-[#121316]/70 backdrop-blur-xs py-1 rounded-r">
                <p className="font-mono text-[11px] text-[#F4F5F7] leading-tight">
                  <span className="text-[#FFD13B] font-bold">TUNNEL VISION:</span> Zero distraction. Pure execution.
                </p>
              </div>
            </div>

            {/* Card Metadata Footer */}
            <div className="flex items-center justify-between font-mono text-[11px] pt-1 border-t border-zinc-800 text-zinc-400">
              <span>LOCATION: NAGPUR, INDIA</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                READY TO SCALE
              </span>
            </div>
          </div>

          {/* Neo-Brutalist Sticker Banner */}
          <div className="w-full bg-[#FFD13B] border-2 border-[#121316] p-3 rounded font-black text-sm uppercase text-[#121316] shadow-[4px_4px_0px_0px_#121316] flex items-center justify-between">
            <span>&quot;CRAFTING UNDISPUTED SOFTWARE.&quot;</span>
            <i className="fa-solid fa-bolt"></i>
          </div>
        </div>

        {/* Right Column: Bio & Tech Stack */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <span className="inline-block px-2.5 py-0.5 bg-[#FFD13B] text-[#121316] font-mono font-black text-xs uppercase rounded">
              ENGINEERING PROFILE
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#F4F5F7]">
              Hi, I&apos;m Taha Hakim Khan.
            </h2>
            <p className="font-mono text-sm text-[#FFD13B] font-semibold">
              Full-Stack Architect, Distributed Systems Specialist & Community Founder.
            </p>
          </div>

          <div className="space-y-4 text-zinc-300 text-sm leading-relaxed">
            <p>
              I am a software engineer based in India with a focus on building high-concurrency distributed platforms and real-time client systems. While many settle for generic CRUD tutorials, I dive deep into concurrency models, WebSocket synchronization, thread safety, and cache invalidation.
            </p>
            <p>
              My mission is twofold: <strong className="text-[#F4F5F7]">first</strong>, to engineer web infrastructure like real-time cloud kitchen displays and distributed hiring networks that withstand high traffic; <strong className="text-[#F4F5F7]">second</strong>, to build a thriving developer community in India capable of competing head-to-head with top-tier global teams.
            </p>
          </div>

          {/* Skill Bento Blocks */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 font-mono text-xs">
            {/* Languages */}
            <div className="bg-[#121316] border border-zinc-800 rounded p-3 space-y-2.5">
              <span className="text-[#FFD13B] font-bold flex items-center gap-1.5">
                <i className="fa-solid fa-code text-[11px]"></i> &lt;/&gt; LANGUAGES
              </span>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded">TypeScript</span>
                <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded">C++</span>
                <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded">Python</span>
                <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded">SQL</span>
              </div>
            </div>

            {/* Frontend */}
            <div className="bg-[#121316] border border-zinc-800 rounded p-3 space-y-2.5">
              <span className="text-[#FFD13B] font-bold flex items-center gap-1.5">
                <i className="fa-solid fa-desktop text-[11px]"></i> FRONTEND
              </span>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded">Next.js 16</span>
                <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded">React 19</span>
                <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded">Tailwind CSS</span>
                <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded">WebSockets</span>
              </div>
            </div>

            {/* Backend & Cloud */}
            <div className="bg-[#121316] border border-zinc-800 rounded p-3 space-y-2.5">
              <span className="text-[#FFD13B] font-bold flex items-center gap-1.5">
                <i className="fa-solid fa-server text-[11px]"></i> BACKEND & CLOUD
              </span>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded">Node.js</span>
                <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded">PostgreSQL</span>
                <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded">Redis</span>
                <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded">Docker</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// 'use client';

// import React from 'react';

// export default function AboutSection() {
//   return (
//     <section id="about" className="space-y-8 scroll-mt-20">
//       <div className="flex items-center gap-3">
//         <span className="font-mono text-xs text-[#FFD13B] font-bold tracking-widest uppercase">// 01 — ABOUT THE ENGINEER & PHILOSOPHY</span>
//         <div className="h-0.5 flex-1 bg-zinc-800"></div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
//         {/* Left: Blindfold Ribbon Card */}
//         <div className="lg:col-span-5 space-y-4">
//           <div className="bg-zinc-900 border-4 border-[#121316] rounded-lg p-5 shadow-[6px_6px_0px_0px_#121316] relative tape-corner-tl">
//             <div className="aspect-[4/5] bg-[#121316] border-2 border-zinc-800 rounded overflow-hidden relative flex flex-col justify-between p-4">
//               <div className="flex justify-between items-center text-[10px] font-mono z-10">
//                 <span className="bg-zinc-900 text-[#F4F5F7] px-2 py-0.5 border border-zinc-800 rounded">ART // BLINDED BY THE LIGHTS</span>
//                 <span className="text-[#FFD13B] font-bold">EST. 2026</span>
//               </div>

//               <div className="w-full h-full flex items-center justify-center relative py-2">
//                 <svg viewBox="0 0 200 240" className="w-full h-full max-h-64 drop-shadow-xl" fill="none" xmlns="http://www.w3.org/2000/svg">
//                   <path d="M60 80 C 50 40, 80 20, 105 20 C 130 20, 155 40, 145 80 C 158 100, 160 140, 140 170 C 130 185, 125 210, 130 235 L 75 235 C 80 210, 75 185, 65 170 C 45 140, 48 100, 60 80 Z" fill="#22252A" stroke="#3A3E47" strokeWidth="2"/>
//                   <polygon points="90,180 120,180 115,230 85,230" fill="#1C1E23"/>
//                   <path d="M96 150 L106 150 M90 168 Q 101 174 112 168" stroke="#F4F5F7" strokeWidth="2.5" strokeLinecap="round"/>
//                   <polygon points="36,80 168,90 164,124 32,114" fill="#FFD13B" stroke="#121316" strokeWidth="3"/>
//                   <line x1="38" y1="86" x2="166" y2="96" stroke="#ECC029" strokeWidth="2"/>
//                 </svg>

//                 <div className="absolute bottom-3 left-2 bg-[#121316] text-[#F4F5F7] font-mono text-[10px] p-2 border-l-2 border-[#FFD13B] rounded shadow-[2px_2px_0px_0px_#121316]">
//                   <span className="text-[#FFD13B] font-bold">TUNNEL VISION:</span> Zero distraction. Pure execution.
//                 </div>
//               </div>

//               <div className="border-t border-zinc-800 pt-2 flex justify-between items-center text-[11px] font-mono">
//                 <span className="text-zinc-500">LOCATION: NAGPUR, INDIA</span>
//                 <span className="text-green-400 font-bold">READY TO SCALE</span>
//               </div>
//             </div>

//             <div className="mt-4 p-3 bg-[#FFD13B] text-[#121316] rounded border-2 border-[#121316] shadow-[2px_2px_0px_0px_#121316] font-mono text-xs font-bold flex items-center justify-between">
//               <span>&quot;CRAFTING UNDISPUTED SOFTWARE.&quot;</span>
//               <i className="fa-solid fa-bolt text-sm"></i>
//             </div>
//           </div>
//         </div>

//         {/* Right: Narrative & Tech Arsenal */}
//         <div className="lg:col-span-7 space-y-6">
//           <div className="space-y-3">
//             <div className="inline-block px-2.5 py-0.5 bg-[#FFD13B] text-[#121316] font-mono font-bold text-xs uppercase tracking-wider rounded">
//               Engineering Profile
//             </div>
//             <h2 className="font-black text-3xl sm:text-4xl text-[#F4F5F7]">
//               Hi, I&apos;m Taha Hakim Khan.
//             </h2>
//             <p className="font-mono text-xs text-[#FFD13B]">
//               Full-Stack Architect, Distributed Systems Specialist & Community Founder.
//             </p>
//           </div>

//           <div className="space-y-4 text-sm text-[#F4F5F7]/90 leading-relaxed font-sans">
//             <p>
//               I am a software engineer based in India with a focus on building high-concurrency distributed platforms and real-time client systems. While many settle for generic CRUD tutorials, I dive deep into concurrency models, WebSocket synchronization, thread safety, and cache invalidation.
//             </p>
//             <p>
//               My mission is twofold: <strong>first</strong>, to engineer web infrastructure like real-time cloud kitchen displays and distributed hiring networks that withstand high traffic; <strong>second</strong>, to build a thriving developer community in India capable of competing head-to-head with top-tier global teams.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs pt-2">
//             <div className="bg-zinc-900 border-2 border-zinc-800 p-3 rounded shadow-[2px_2px_0px_0px_#121316] space-y-2">
//               <div className="text-[#FFD13B] font-bold text-[11px] uppercase flex items-center gap-1.5">
//                 <i className="fa-solid fa-code text-xs"></i>
//                 <span>Languages</span>
//               </div>
//               <div className="flex flex-wrap gap-1 text-[11px] text-[#F4F5F7]/80">
//                 <span className="px-1.5 py-0.5 bg-[#121316] border border-zinc-800 rounded">TypeScript</span>
//                 <span className="px-1.5 py-0.5 bg-[#121316] border border-zinc-800 rounded">C++</span>
//                 <span className="px-1.5 py-0.5 bg-[#121316] border border-zinc-800 rounded">Python</span>
//                 <span className="px-1.5 py-0.5 bg-[#121316] border border-zinc-800 rounded">SQL</span>
//               </div>
//             </div>

//             <div className="bg-zinc-900 border-2 border-zinc-800 p-3 rounded shadow-[2px_2px_0px_0px_#121316] space-y-2">
//               <div className="text-[#FFD13B] font-bold text-[11px] uppercase flex items-center gap-1.5">
//                 <i className="fa-solid fa-laptop-code text-xs"></i>
//                 <span>Frontend</span>
//               </div>
//               <div className="flex flex-wrap gap-1 text-[11px] text-[#F4F5F7]/80">
//                 <span className="px-1.5 py-0.5 bg-[#121316] border border-zinc-800 rounded">Next.js 16</span>
//                 <span className="px-1.5 py-0.5 bg-[#121316] border border-zinc-800 rounded">React 19</span>
//                 <span className="px-1.5 py-0.5 bg-[#121316] border border-zinc-800 rounded">Tailwind CSS</span>
//                 <span className="px-1.5 py-0.5 bg-[#121316] border border-zinc-800 rounded">WebSockets</span>
//               </div>
//             </div>

//             <div className="bg-zinc-900 border-2 border-zinc-800 p-3 rounded shadow-[2px_2px_0px_0px_#121316] space-y-2">
//               <div className="text-[#FFD13B] font-bold text-[11px] uppercase flex items-center gap-1.5">
//                 <i className="fa-solid fa-server text-xs"></i>
//                 <span>Backend & Cloud</span>
//               </div>
//               <div className="flex flex-wrap gap-1 text-[11px] text-[#F4F5F7]/80">
//                 <span className="px-1.5 py-0.5 bg-[#121316] border border-zinc-800 rounded">Node.js</span>
//                 <span className="px-1.5 py-0.5 bg-[#121316] border border-zinc-800 rounded">PostgreSQL</span>
//                 <span className="px-1.5 py-0.5 bg-[#121316] border border-zinc-800 rounded">Redis</span>
//                 <span className="px-1.5 py-0.5 bg-[#121316] border border-zinc-800 rounded">Docker</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }