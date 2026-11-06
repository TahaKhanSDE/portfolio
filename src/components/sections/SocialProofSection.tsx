'use client';

import React, { useState, useEffect } from 'react';

interface Endorsement {
  id: string;
  name: string;
  role: string;
  quote: string;
  initials: string;
  avatarBg: string;
}

const DEFAULT_ENDORSEMENTS: Endorsement[] = [
  {
    id: 'default-1',
    name: 'Aditya Sharma',
    role: 'Operations Lead • Sharma & Saraf Groups LLP',
    quote: 'Taha took our raw cloud kitchen workflows and engineered a rock-solid KDS platform within weeks. His grasp of real-time state synchronization and database indexes saved us from catastrophic peak order dropouts during high-volume dining hours.',
    initials: 'AS',
    avatarBg: '#FFD13B',
  },
  {
    id: 'default-2',
    name: 'Adil Hashmi',
    role: 'Senior Engineering Collaborator',
    quote: 'Extremely proactive engineer who doesn\'t wait for specifications to be spoon-fed. His pull requests are clean, well-tested, and he actively mentors other developers in the community with infectious curiosity and speed.',
    initials: 'AH',
    avatarBg: '#F4F5F7',
  },
];

export default function SocialProofSection() {
  const [endorsements, setEndorsements] = useState<Endorsement[]>(DEFAULT_ENDORSEMENTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', role: '', quote: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Load custom endorsements from local storage
  useEffect(() => {
    const saved = localStorage.getItem('thk_user_endorsements');
    if (saved) {
      try {
        const parsed: Endorsement[] = JSON.parse(saved);
        setEndorsements([...parsed, ...DEFAULT_ENDORSEMENTS]);
      } catch {
        setEndorsements(DEFAULT_ENDORSEMENTS);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.quote.trim()) return;

    const initials = formData.name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .substring(0, 2)
      .toUpperCase() || 'TH';

    const newEntry: Endorsement = {
      id: `end-${Date.now()}`,
      name: formData.name.trim(),
      role: formData.role.trim() || 'Software Industry Peer',
      quote: formData.quote.trim(),
      initials,
      avatarBg: '#FFD13B',
    };

    const updated = [newEntry, ...endorsements];
    setEndorsements(updated);

    // Save only user additions to localStorage
    const userOnly = updated.filter((item) => !item.id.startsWith('default-'));
    localStorage.setItem('thk_user_endorsements', JSON.stringify(userOnly));

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsModalOpen(false);
      setFormData({ name: '', role: '', quote: '' });
    }, 1200);
  };

  // Duplicate items to ensure a seamless infinite marquee scroll
  const marqueeList = [...endorsements, ...endorsements];

  return (
    <section id="social-proof" className="space-y-6 scroll-mt-20 overflow-hidden">
      {/* Header with Title and Endorse Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <span className="font-mono text-xs text-[#FFD13B] font-bold tracking-widest uppercase">
            // 05 — SOCIAL PROOF & RECOMMENDATIONS
          </span>
          <div className="h-0.5 flex-1 bg-zinc-800 hidden sm:block"></div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="self-start sm:self-auto px-3.5 py-1.5 rounded bg-zinc-900 border-2 border-[#FFD13B] text-[#FFD13B] font-mono text-xs font-bold uppercase tracking-wider shadow-[3px_3px_0px_0px_#000] hover:bg-[#FFD13B] hover:text-[#121316] transition-all flex items-center gap-2 cursor-pointer active:scale-95"
        >
          <i className="fa-solid fa-pen-nib text-[10px]"></i>
          <span>Endorse Me</span>
        </button>
      </div>

      {/* Infinite Horizontal Carousel Container */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] py-2">
        <div className="flex gap-6 w-max animate-marquee hover:[animation-play-state:paused]">
          {marqueeList.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="w-[340px] md:w-[420px] bg-zinc-900/90 border-2 border-zinc-800 p-6 rounded-lg shadow-[4px_4px_0px_0px_#121316] flex flex-col justify-between space-y-4 shrink-0 transition-transform duration-300 hover:border-[#FFD13B]/60"
            >
              <div className="space-y-2">
                <div className="text-3xl font-black text-[#FFD13B] leading-none">“</div>
                <p className="text-sm text-[#F4F5F7]/90 leading-relaxed italic line-clamp-4">
                  “{item.quote}”
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-800 flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded text-[#121316] font-bold flex items-center justify-center border-2 border-[#121316] shadow-[2px_2px_0px_0px_#121316] shrink-0"
                  style={{ backgroundColor: item.avatarBg }}
                >
                  {item.initials}
                </div>
                <div className="overflow-hidden">
                  <div className="font-bold text-sm text-[#F4F5F7] truncate">{item.name}</div>
                  <div className="text-xs font-mono text-zinc-500 truncate">{item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Public Endorsement Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#121316] border-2 border-[#FFD13B] rounded-xl w-full max-w-lg p-6 shadow-[6px_6px_0px_0px_#000] space-y-5 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white text-sm"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>

            <div className="space-y-1">
              <h3 className="text-lg font-black text-[#F4F5F7] tracking-wider uppercase font-mono flex items-center gap-2">
                <span className="text-[#FFD13B]">//</span> Add Peer Recommendation
              </h3>
              <p className="text-xs text-zinc-400 font-mono">
                Your testimonial will appear on the infinite social proof carousel.
              </p>
            </div>

            {isSubmitted ? (
              <div className="py-8 text-center space-y-2">
                <div className="text-2xl text-[#FFD13B] font-black">✓ ENDORSEMENT PUBLISHED</div>
                <p className="text-xs text-zinc-400 font-mono">Added directly to the live feed.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                <div className="space-y-1">
                  <label className="text-zinc-400 uppercase tracking-widest font-bold">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded p-2.5 text-zinc-200 focus:border-[#FFD13B] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-400 uppercase tracking-widest font-bold">Role / Company</label>
                  <input
                    type="text"
                    placeholder="e.g. Lead Engineer • Fintech / OSS Collaborator"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded p-2.5 text-zinc-200 focus:border-[#FFD13B] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-400 uppercase tracking-widest font-bold">Recommendation / Quote *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Share your experience working with Taha on systems, repositories, or technical architecture..."
                    value={formData.quote}
                    onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded p-2.5 text-zinc-200 focus:border-[#FFD13B] outline-none resize-none"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded bg-[#FFD13B] text-[#121316] font-bold uppercase tracking-wider shadow-[2px_2px_0px_0px_#000] hover:scale-105 active:scale-95 transition-transform"
                  >
                    Publish
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}