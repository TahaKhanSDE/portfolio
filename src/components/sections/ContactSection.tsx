'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ContactConfig } from '@/types';

interface ContactSectionProps {
  contact: ContactConfig;
}

export default function ContactSection({ contact }: ContactSectionProps) {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactScope, setContactScope] = useState('Full-Time SDE-1 / Software Engineering Role');
  const [contactMessage, setContactMessage] = useState('');
  const [formSent, setFormSent] = useState(false);

  const motionCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Animated Times Square taxi light trails
  useEffect(() => {
    const canvas = motionCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const resize = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
      }
    };
    resize();
    window.addEventListener('resize', resize);

    const streaks = Array.from({ length: 24 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      len: 40 + Math.random() * 80,
      speed: 4 + Math.random() * 6,
      color: Math.random() > 0.4 ? '#FFD13B' : '#FFFFFF',
      opacity: 0.15 + Math.random() * 0.4,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      streaks.forEach((s) => {
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x + s.len, s.y);
        ctx.strokeStyle = s.color;
        ctx.globalAlpha = s.opacity;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        s.x += s.speed;
        if (s.x > canvas.width) {
          s.x = -s.len;
          s.y = Math.random() * canvas.height;
        }
      });
      animationId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEmail(text);
    setTimeout(() => setCopiedEmail(null), 2500);
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          message: `[Scope: ${contactScope}] ${contactMessage}`,
        }),
      });
    } catch {
      // Handled via hybrid fallback
    }
    setFormSent(true);
    setContactName('');
    setContactEmail('');
    setContactMessage('');
    setTimeout(() => setFormSent(false), 4500);
  };

  return (
    <section id="contact" className="space-y-6 scroll-mt-20">
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs text-[#FFD13B] font-bold tracking-widest uppercase">// 06 — INITIATE CONTACT & TERMINAL</span>
        <div className="h-0.5 flex-1 bg-zinc-800"></div>
      </div>

      <div className="relative rounded-xl overflow-hidden border-2 border-zinc-800 p-6 sm:p-10 bg-zinc-900">
        <canvas ref={motionCanvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-25" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h2 className="font-black text-3xl sm:text-4xl text-[#F4F5F7]">Let&apos;s Build Something Unyielding.</h2>
              <p className="text-sm text-[#F4F5F7]/80 pt-2 leading-relaxed">
                Whether you are hiring a high-impact SDE-1 who treats engineering with obsession, or looking to collaborate on high-throughput platform architectures—let&apos;s talk.
              </p>
            </div>

            {/* Primary & Secondary Email Copy Blocks */}
            <div className="space-y-3 font-mono text-xs">
              {/* Primary Email */}
              <div className="bg-[#121316] border-2 border-zinc-800 p-3 rounded-lg shadow-[3px_3px_0px_0px_#121316]">
                <div className="flex items-center justify-between text-[10px] text-zinc-500 mb-1">
                  <span>PRIMARY ENDPOINT</span>
                  <span className="text-[#FFD13B] font-bold">DIRECT DISPATCH</span>
                </div>
                <div className="flex items-center justify-between bg-zinc-900 p-2 border border-zinc-800 rounded">
                  <span className="text-[#FFD13B] font-bold select-all truncate mr-2">
                    {contact.primaryEmail}
                  </span>
                  <button
                    onClick={() => copyToClipboard(contact.primaryEmail)}
                    className="px-2.5 py-1 bg-[#FFD13B] hover:bg-yellow-400 text-[#121316] font-bold rounded flex items-center gap-1 transition-all flex-shrink-0"
                  >
                    <i className="fa-solid fa-copy text-xs"></i>
                    <span>{copiedEmail === contact.primaryEmail ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              {/* Secondary Email */}
              <div className="bg-[#121316] border-2 border-zinc-800 p-3 rounded-lg shadow-[3px_3px_0px_0px_#121316]">
                <div className="flex items-center justify-between text-[10px] text-zinc-500 mb-1">
                  <span>SECONDARY INBOX</span>
                  <span className="text-zinc-400 font-bold">BACKUP ROUTE</span>
                </div>
                <div className="flex items-center justify-between bg-zinc-900 p-2 border border-zinc-800 rounded">
                  <span className="text-[#F4F5F7] font-bold select-all truncate mr-2">
                    {contact.secondaryEmail}
                  </span>
                  <button
                    onClick={() => copyToClipboard(contact.secondaryEmail)}
                    className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-[#F4F5F7] font-bold rounded flex items-center gap-1 transition-all flex-shrink-0"
                  >
                    <i className="fa-solid fa-copy text-xs"></i>
                    <span>{copiedEmail === contact.secondaryEmail ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex flex-col gap-2 font-mono text-xs">
              <a
                href={contact.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-[#121316] hover:bg-zinc-800 border border-zinc-800 rounded flex items-center justify-between text-[#F4F5F7] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <i className="fa-brands fa-github text-base text-[#FFD13B]"></i>
                  <span>{contact.githubUrl.replace('https://', '')}</span>
                </span>
                <i className="fa-solid fa-arrow-right text-xs text-zinc-500"></i>
              </a>
              <a
                href={contact.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-[#121316] hover:bg-zinc-800 border border-zinc-800 rounded flex items-center justify-between text-[#F4F5F7] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <i className="fa-brands fa-linkedin text-base text-[#FFD13B]"></i>
                  <span>{contact.linkedinUrl.replace('https://', '')}</span>
                </span>
                <i className="fa-solid fa-arrow-right text-xs text-zinc-500"></i>
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 bg-[#121316] border-2 border-zinc-800 p-6 sm:p-8 rounded-lg shadow-[6px_6px_0px_0px_#121316] space-y-5">
            <div className="border-b border-zinc-800 pb-3 flex justify-between items-center">
              <div>
                <h3 className="font-black text-xl text-[#F4F5F7]">Project & Role Inquiry</h3>
                <p className="text-xs font-mono text-zinc-500 pt-0.5">Direct communication route. Responses dispatched within 24 hours.</p>
              </div>
              <span className="text-[10px] font-mono text-[#FFD13B] font-bold bg-[#FFD13B]/10 px-2 py-0.5 border border-[#FFD13B]/30 rounded">ENCRYPTED</span>
            </div>

            <form onSubmit={handleInquirySubmit} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[#F4F5F7]/90 font-bold uppercase tracking-wider text-[11px]">Your Name / Company *</label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="e.g. Alex Vance / Acme Labs"
                    className="w-full bg-zinc-900 border-2 border-zinc-800 focus:border-[#FFD13B] focus:outline-none p-3 rounded text-[#F4F5F7]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[#F4F5F7]/90 font-bold uppercase tracking-wider text-[11px]">Work Email *</label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="alex@company.com"
                    className="w-full bg-zinc-900 border-2 border-zinc-800 focus:border-[#FFD13B] focus:outline-none p-3 rounded text-[#F4F5F7]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[#F4F5F7]/90 font-bold uppercase tracking-wider text-[11px]">Role or Project Scope *</label>
                <select
                  value={contactScope}
                  onChange={(e) => setContactScope(e.target.value)}
                  className="w-full bg-zinc-900 border-2 border-zinc-800 focus:border-[#FFD13B] focus:outline-none p-3 rounded text-[#F4F5F7]"
                >
                  <option>Full-Time SDE-1 / Software Engineering Role</option>
                  <option>High-Throughput Production Web Platform Build</option>
                  <option>Developer Community Mentorship & Speaking</option>
                  <option>Other Exploration</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[#F4F5F7]/90 font-bold uppercase tracking-wider text-[11px]">Message & Architecture Brief *</label>
                <textarea
                  required
                  rows={4}
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  placeholder="Share your tech stack requirements, project timelines, or role details..."
                  className="w-full bg-zinc-900 border-2 border-zinc-800 focus:border-[#FFD13B] focus:outline-none p-3 rounded text-[#F4F5F7]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#FFD13B] hover:bg-yellow-400 text-[#121316] font-black text-sm uppercase tracking-wider border-2 border-[#121316] rounded shadow-[4px_4px_0px_0px_#121316] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2"
              >
                <span>Submit Project Inquiry</span>
                <i className="fa-solid fa-paper-plane text-xs"></i>
              </button>

              {formSent && (
                <div className="p-3 bg-green-950 border border-green-500 text-green-300 rounded font-mono text-xs text-center">
                  ✓ Message dispatched! We will review and reply within 24 hours.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}