'use client';

import React, { useState } from 'react';
import { ProjectItem } from '@/types';

interface VaultSectionProps {
  projects: ProjectItem[];
  onOpenNewBuildModal: () => void;
}

export default function VaultSection({
  projects,
  onOpenNewBuildModal,
}: VaultSectionProps) {
  const [filter, setFilter] = useState<'all' | 'production' | 'distributed' | 'oss'>('all');

  const filteredProjects = projects.filter(
    (p) => filter === 'all' || p.category === filter
  );

  return (
    <section id="vault" className="space-y-6 scroll-mt-20">
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs text-[#FFD13B] font-bold tracking-widest uppercase">// 04 — FEATURED BUILDS VAULT</span>
        <div className="h-0.5 flex-1 bg-zinc-800"></div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-black text-2xl sm:text-3xl md:text-4xl text-[#F4F5F7]">Production Builds & Architecture</h2>
          <p className="text-sm font-mono text-zinc-500 pt-1">Tactile scrapbook vault of deployed platforms and core algorithmic systems.</p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-zinc-900 border-2 border-zinc-800 rounded font-mono text-xs">
          {(['all', 'production', 'distributed', 'oss'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1 rounded transition-colors ${
                filter === cat ? 'bg-[#FFD13B] text-[#121316] font-bold' : 'text-[#F4F5F7]/80 hover:text-[#FFD13B]'
              }`}
            >
              {cat === 'all' ? 'All Builds' : cat === 'oss' ? 'Open Source' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {filteredProjects.map((p) => (
          <div
            key={p.id}
            className={`${p.spotlight ? 'md:col-span-7' : 'md:col-span-5'} bg-zinc-900 border-2 border-zinc-800 rounded-lg p-5 shadow-[4px_4px_0px_0px_#121316] space-y-4 hover:-translate-y-1 transition-all`}
          >
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <span className="font-mono text-xs text-green-400 font-bold uppercase">{p.category} BUILD</span>
              <span className="font-mono text-[11px] bg-[#FFD13B] text-[#121316] font-bold px-2 py-0.5 rounded">DEPLOYED</span>
            </div>

            <div>
              <h3 className="font-black text-xl text-[#F4F5F7]">{p.title}</h3>
              <p className="text-xs font-mono text-[#FFD13B] font-semibold">{p.subtitle}</p>
              <p className="text-xs text-[#F4F5F7]/80 pt-2 leading-relaxed">{p.desc}</p>
            </div>

            <div className="flex flex-wrap gap-1.5 font-mono text-[11px] pt-1">
              {p.tags.map((tag) => (
                <span key={tag} className="px-2 py-0.5 bg-[#121316] border border-zinc-800 rounded text-[#F4F5F7]">
                  {tag}
                </span>
              ))}
            </div>

            <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-xs font-mono">
              <a href={p.url} target="_blank" rel="noreferrer" className="text-[#FFD13B] font-bold hover:underline flex items-center gap-1">
                <span>Explore Build</span>
                <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
              </a>
              <span className="text-zinc-500 text-[11px]">Production Record</span>
            </div>
          </div>
        ))}

        <div
          onClick={onOpenNewBuildModal}
          className="md:col-span-12 lg:col-span-5 border-2 border-dashed border-zinc-800 hover:border-[#FFD13B] bg-zinc-900/40 rounded-lg p-6 flex flex-col items-center justify-center text-center space-y-3 cursor-pointer transition-colors group min-h-[220px]"
        >
          <div className="w-12 h-12 rounded-full border-2 border-dashed border-[#FFD13B] flex items-center justify-center text-[#FFD13B] group-hover:scale-110 transition-transform">
            <i className="fa-solid fa-plus text-xl"></i>
          </div>
          <div>
            <h4 className="font-bold text-[#F4F5F7] text-sm group-hover:text-[#FFD13B]">Add Next Build</h4>
            <p className="text-[11px] font-mono text-zinc-500 pt-1">Reserved slot for upcoming distributed & platform projects.</p>
          </div>
        </div>
      </div>
    </section>
  );
}