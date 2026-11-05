'use client';

import React, { useState } from 'react';
import { ExperienceItem } from '@/types';

interface ExperienceSectionProps {
  experiences: ExperienceItem[];
}

export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
  const [activeExpId, setActiveExpId] = useState<string>(experiences[0]?.id || '');

  return (
    <section id="experience" className="space-y-8 scroll-mt-20">
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs text-[#FFD13B] font-bold tracking-widest uppercase">// 02 — WORK EXPERIENCE & ENGINEERING TRACK RECORD</span>
        <div className="h-0.5 flex-1 bg-zinc-800"></div>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="font-black text-2xl sm:text-3xl md:text-4xl text-[#F4F5F7]">Engineering Milestones & Timeline</h2>
          <p className="text-sm font-mono text-zinc-500 pt-1">
            Hover over any timeline node to reveal live architectures and delivered projects.
          </p>
        </div>
        <div className="font-mono text-xs text-[#FFD13B] bg-[#FFD13B]/10 px-3 py-1.5 border border-[#FFD13B]/30 rounded inline-block self-start md:self-auto">
          INTERACTIVE TIMELINE
        </div>
      </div>

      {/* Cyber-Noir Vertical Timeline */}
      <div className="relative border-l-2 border-[#FFD13B]/40 ml-4 md:ml-8 pl-6 md:pl-10 space-y-12">
        {experiences.map((exp, index) => {
          const isHovered = activeExpId === exp.id;

          return (
            <div
              key={exp.id}
              onMouseEnter={() => setActiveExpId(exp.id)}
              className="relative group transition-all"
            >
              {/* Timeline Connector Node */}
              <div
                className={`absolute -left-[31px] md:-left-[47px] top-1.5 w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center cursor-pointer ${
                  isHovered
                    ? 'bg-[#FFD13B] border-[#121316] shadow-[0_0_12px_#FFD13B] scale-125'
                    : 'bg-[#121316] border-[#FFD13B] group-hover:border-[#FFD13B]'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${isHovered ? 'bg-[#121316]' : 'bg-[#FFD13B]'}`} />
              </div>

              {/* Main Card */}
              <div
                className={`bg-zinc-900 border-2 rounded-lg p-6 transition-all ${
                  isHovered
                    ? 'border-[#FFD13B] shadow-[6px_6px_0px_0px_#FFD13B] -translate-y-1'
                    : 'border-zinc-800 shadow-[4px_4px_0px_0px_#121316]'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-0.5 bg-[#FFD13B] text-[#121316] font-mono font-black text-[11px] uppercase rounded shadow-[2px_2px_0px_0px_#121316]">
                        {exp.badgeText}
                      </span>
                      <span className="font-mono text-xs text-green-400 font-bold flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-ping"></span>
                        TIMELINE NODE #{index + 1}
                      </span>
                    </div>
                    <h3 className="font-black text-xl sm:text-2xl text-[#F4F5F7] pt-2">
                      {exp.role} <span className="text-[#FFD13B] font-mono font-normal text-base">@ {exp.company}</span>
                    </h3>
                  </div>

                  <div className="font-mono text-xs text-[#F4F5F7]/80 sm:text-right bg-[#121316] px-3 py-1.5 rounded border border-zinc-800">
                    <div className="text-[#FFD13B] font-bold">{exp.period}</div>
                    <div className="text-zinc-500 text-[10px]">{exp.location}</div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#F4F5F7]/90 leading-relaxed font-sans mb-3">
                  {exp.summary}
                </p>

                <ul className="space-y-1.5 font-mono text-xs list-disc list-inside text-[#F4F5F7]/80 mb-5">
                  {exp.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>

                {/* Shipped Deliverables & Sub-Projects Reveal Container */}
                <div className="border-t border-zinc-800 pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[11px] text-[#FFD13B] font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <i className="fa-solid fa-code-fork"></i>
                      <span>SHIPPED PROJECTS & ARCHITECTURES BUILT HERE</span>
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500">
                      Hover to expand
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {exp.builtProjects.map((proj, pIdx) => (
                      <div
                        key={pIdx}
                        className="bg-[#121316] border border-zinc-800 hover:border-[#FFD13B] p-3 rounded space-y-2 transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-sm text-[#F4F5F7]">{proj.name}</h4>
                          {proj.link && (
                            <a
                              href={proj.link}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[#FFD13B] hover:underline text-[11px] font-mono flex items-center gap-1"
                            >
                              <span>View Build</span>
                              <i className="fa-solid fa-arrow-up-right-from-square text-[9px]"></i>
                            </a>
                          )}
                        </div>
                        <p className="text-xs text-zinc-400 font-mono leading-relaxed">
                          {proj.description}
                        </p>
                        <div className="flex flex-wrap gap-1 pt-1">
                          {proj.tech.map((t, tIdx) => (
                            <span
                              key={tIdx}
                              className="text-[10px] font-mono px-1.5 py-0.5 bg-zinc-900 border border-zinc-800 rounded text-[#FFD13B]"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Performance Metrics if available */}
                {exp.metrics && (
                  <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center gap-6 font-mono text-xs">
                    <div>
                      <span className="text-zinc-500 text-[10px] block">LATENCY:</span>
                      <span className="text-green-400 font-bold">{exp.metrics.latency}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 text-[10px] block">TICKETS:</span>
                      <span className="text-[#FFD13B] font-bold">{exp.metrics.tickets}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}