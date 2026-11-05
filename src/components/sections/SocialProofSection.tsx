import React from 'react';

export default function SocialProofSection() {
  return (
    <section id="social-proof" className="space-y-6 scroll-mt-20">
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs text-[#FFD13B] font-bold tracking-widest uppercase">// 05 — SOCIAL PROOF & RECOMMENDATIONS</span>
        <div className="h-0.5 flex-1 bg-zinc-800"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-zinc-900 border-2 border-zinc-800 p-6 rounded-lg shadow-[4px_4px_0px_0px_#121316] space-y-4">
          <div className="text-3xl font-black text-[#FFD13B] leading-none">“</div>
          <p className="text-sm text-[#F4F5F7]/90 leading-relaxed italic">
            “Taha took our raw cloud kitchen workflows and engineered a rock-solid KDS platform within weeks. His grasp of real-time state synchronization and database indexes saved us from catastrophic peak order dropouts during high-volume dining hours.”
          </p>
          <div className="pt-4 border-t border-zinc-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-[#FFD13B] text-[#121316] font-bold flex items-center justify-center border-2 border-[#121316] shadow-[2px_2px_0px_0px_#121316]">
              AS
            </div>
            <div>
              <div className="font-bold text-sm text-[#F4F5F7]">Aditya Sharma</div>
              <div className="text-xs font-mono text-zinc-500">Operations Lead • Sharma & Saraf Groups LLP</div>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 border-2 border-zinc-800 p-6 rounded-lg shadow-[4px_4px_0px_0px_#121316] space-y-4">
          <div className="text-3xl font-black text-[#FFD13B] leading-none">“</div>
          <p className="text-sm text-[#F4F5F7]/90 leading-relaxed italic">
            “Extremely proactive engineer who doesn&apos;t wait for specifications to be spoon-fed. His pull requests are clean, well-tested, and he actively mentors other developers in the community with infectious curiosity and speed.”
          </p>
          <div className="pt-4 border-t border-zinc-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-[#F4F5F7] text-[#121316] font-bold flex items-center justify-center border-2 border-[#121316] shadow-[2px_2px_0px_0px_#121316]">
              AH
            </div>
            <div>
              <div className="font-bold text-sm text-[#F4F5F7]">Adil Hashmi</div>
              <div className="text-xs font-mono text-zinc-500">Senior Engineering Collaborator</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}