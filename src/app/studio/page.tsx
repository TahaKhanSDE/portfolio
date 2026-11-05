'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const [filter, setFilter] = useState<'all' | 'production' | 'distributed' | 'opensource'>('all');
  const [easterEggClicks, setEasterEggClicks] = useState(0);
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [inquiryStatus, setInquiryStatus] = useState('');

  // Desktop backtick shortcut trigger for secret studio
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`' || e.key === '~') {
        router.push('/studio');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);

  // Terminal Easter egg (5 rapid clicks)
  const handleEasterEggClick = () => {
    const next = easterEggClicks + 1;
    if (next >= 5) {
      router.push('/studio');
    } else {
      setEasterEggClicks(next);
      setTimeout(() => setEasterEggClicks(0), 3000);
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('tahakhan.engineer@gmail.com');
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInquiryStatus('Dispatching lead...');
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: inquiryName,
          email: inquiryEmail,
          message: inquiryMessage,
        }),
      });
      if (res.ok) {
        setInquiryStatus('Inquiry dispatched! Alerts fired to Telegram, Gmail & WhatsApp.');
        setInquiryName('');
        setInquiryEmail('');
        setInquiryMessage('');
      } else {
        setInquiryStatus('Failed to send. Please reach out via email directly.');
      }
    } catch {
      setInquiryStatus('Network error while dispatching lead.');
    }
  };

  return (
    <div className="min-h-screen bg-[#121316] text-[#F4F5F7] font-sans selection:bg-[#FFD13B] selection:text-[#121316]">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#121316]/90 backdrop-blur-md border-b-2 border-zinc-800 px-6 h-16 flex items-center justify-between max-w-7xl mx-auto">
        <a href="#" className="font-mono font-black text-lg text-[#FFD13B] tracking-wider">
          TAHA_KHAN<span className="text-[#F4F5F7]">.io</span>
        </a>
        <div className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest text-zinc-400">
          <a href="#about" className="hover:text-[#FFD13B] transition-colors">01 // About</a>
          <a href="#experience" className="hover:text-[#FFD13B] transition-colors">02 // Experience</a>
          <a href="#vault" className="hover:text-[#FFD13B] transition-colors">03 // Vault</a>
          <a href="#contact" className="hover:text-[#FFD13B] transition-colors">04 // Contact</a>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-2 px-3 py-1 bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 text-xs font-mono rounded">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Available for SDE-1
          </span>
          <a
            href="#contact"
            className="bg-[#FFD13B] text-[#121316] font-bold text-xs font-mono uppercase px-4 py-2 border-2 border-[#121316] shadow-[3px_3px_0px_0px_#F4F5F7] hover:translate-x-0.5 hover:translate-y-0.5 transition-transform"
          >
            Connect
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-700 text-[#FFD13B] text-xs font-mono tracking-widest">
              [SDE-1 // FULL-STACK & DISTRIBUTED SYSTEMS]
            </div>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-none uppercase">
              Engineering <span className="text-[#FFD13B]">High-Performance</span> Platforms & Community Tech.
            </h1>
            <p className="text-zinc-400 text-base sm:text-lg max-w-xl font-mono leading-relaxed">
              Full-Stack Software Engineer with expertise in Next.js, Node.js, distributed locking, and PostgreSQL. Focused on clean architecture, sub-150ms state updates, and reliable production backends.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#vault"
                className="bg-[#FFD13B] text-[#121316] font-black uppercase px-6 py-3 border-2 border-[#121316] shadow-[4px_4px_0px_0px_#F4F5F7] hover:translate-x-0.5 hover:translate-y-0.5 transition-transform font-mono text-sm"
              >
                Explore Builds
              </a>
              <button
                onClick={copyEmail}
                className="bg-zinc-900 text-[#F4F5F7] font-mono text-sm px-6 py-3 border-2 border-zinc-700 shadow-[4px_4px_0px_0px_#FFD13B] hover:translate-x-0.5 hover:translate-y-0.5 transition-transform"
              >
                {copyFeedback ? '✓ Copied tahakhan.engineer@gmail.com' : 'Copy Email'}
              </button>
            </div>
          </div>

          {/* Hero Terminal Preview */}
          <div className="lg:col-span-5">
            <div className="border-2 border-zinc-700 bg-[#16181f] p-5 shadow-[6px_6px_0px_0px_#FFD13B]">
              <div className="flex justify-between items-center pb-4 mb-4 border-b border-zinc-800">
                <span className="font-mono text-xs text-zinc-400">bash$ system-monitor --verbose</span>
                <button
                  onClick={handleEasterEggClick}
                  title="System Status"
                  className="font-mono text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 border border-emerald-500 cursor-pointer"
                >
                  ● ALL SYSTEMS OPERATIONAL
                </button>
              </div>
              <div className="font-mono text-xs space-y-2 text-zinc-300">
                <div className="flex justify-between">
                  <span className="text-zinc-500">&gt; user_services</span>
                  <span className="text-emerald-400">[ OK ]</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">&gt; connect_postgres</span>
                  <span className="text-emerald-400">[ OK ]</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">&gt; start_realtime_ws</span>
                  <span className="text-emerald-400">[ OK ]</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">&gt; queue_workers (x4)</span>
                  <span className="text-emerald-400">[ OK ]</span>
                </div>
                <div className="pt-4 border-t border-zinc-800 grid grid-cols-3 gap-2 text-center">
                  <div className="bg-zinc-900 p-2 border border-zinc-800">
                    <span className="block text-[10px] text-zinc-500">UPTIME</span>
                    <span className="font-bold text-[#FFD13B]">99.98%</span>
                  </div>
                  <div className="bg-zinc-900 p-2 border border-zinc-800">
                    <span className="block text-[10px] text-zinc-500">REQS/SEC</span>
                    <span className="font-bold text-[#FFD13B]">12.4k</span>
                  </div>
                  <div className="bg-zinc-900 p-2 border border-zinc-800">
                    <span className="block text-[10px] text-zinc-500">P99 LATENCY</span>
                    <span className="font-bold text-emerald-400">42ms</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About & Creed Section */}
      <section id="about" className="max-w-7xl mx-auto px-6 py-20 border-t-2 border-zinc-800">
        <div className="space-y-4 mb-12">
          <span className="font-mono text-xs text-[#FFD13B] tracking-widest">[01 // BACKGROUND & MISSION]</span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase">About Taha Hakim Khan</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border-2 border-zinc-800 bg-[#16181f] p-8 space-y-4 shadow-[4px_4px_0px_0px_#121316]">
            <h3 className="font-mono text-lg font-bold text-[#FFD13B]">Philosophy: Self-Taught, Curious, Relentless</h3>
            <p className="text-zinc-400 text-sm leading-relaxed font-mono">
              From building production platforms to debugging race conditions and latency bottlenecks, I focus on systems that scale cleanly under real traffic. No fragile abstractions — just solid architecture, typed contracts, and tested database constraints.
            </p>
          </div>
          <div className="border-2 border-[#FFD13B] bg-gradient-to-br from-zinc-900 to-[#121316] p-8 space-y-4 shadow-[4px_4px_0px_0px_#FFD13B]">
            <h3 className="font-mono text-lg font-bold text-[#F4F5F7]">Community Mission</h3>
            <p className="text-zinc-400 text-sm leading-relaxed font-mono">
              Building and mentoring the next generation of unyielding software engineering talent from India to compete at global scale. Equipping developers with real production experience.
            </p>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="max-w-7xl mx-auto px-6 py-20 border-t-2 border-zinc-800">
        <div className="space-y-4 mb-12">
          <span className="font-mono text-xs text-[#FFD13B] tracking-widest">[02 // WORK EXPERIENCE]</span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase">Engineering History</h2>
        </div>
        <div className="space-y-6">
          <div className="border-2 border-zinc-800 bg-[#16181f] p-6 shadow-[4px_4px_0px_0px_#121316]">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-2">
              <h3 className="text-xl font-bold text-[#F4F5F7]">Freelance Software Engineer // Naadan (Sharma & Saraf Groups)</h3>
              <span className="font-mono text-xs text-[#FFD13B]">2026 // Production Release</span>
            </div>
            <p className="text-sm font-mono text-zinc-400 mb-3">
              Built the real-time cloud kitchen platform and Kitchen Display System (KDS). Maintained sub-150ms state updates across kitchen stations, implemented concurrency control with PostgreSQL row locking, and deployed custom domain instances across Vercel and Render.
            </p>
            <div className="flex flex-wrap gap-2 text-xs font-mono text-zinc-400">
              <span className="bg-zinc-900 px-2 py-1 border border-zinc-700">Next.js</span>
              <span className="bg-zinc-900 px-2 py-1 border border-zinc-700">WebSockets</span>
              <span className="bg-zinc-900 px-2 py-1 border border-zinc-700">PostgreSQL</span>
              <span className="bg-zinc-900 px-2 py-1 border border-zinc-700">Render</span>
            </div>
          </div>

          <div className="border-2 border-zinc-800 bg-[#16181f] p-6 shadow-[4px_4px_0px_0px_#121316]">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-2">
              <h3 className="text-xl font-bold text-[#F4F5F7]">Web Development Intern // Nass Technologies</h3>
              <span className="font-mono text-xs text-zinc-400">08/2024 – 10/2024</span>
            </div>
            <p className="text-sm font-mono text-zinc-400 mb-3">
              Engineered modular React.js UI and responsive Tailwind CSS component libraries. Integrated RESTful endpoints, resulting in a 30% reduction in initial page load overhead.
            </p>
            <div className="flex flex-wrap gap-2 text-xs font-mono text-zinc-400">
              <span className="bg-zinc-900 px-2 py-1 border border-zinc-700">React.js</span>
              <span className="bg-zinc-900 px-2 py-1 border border-zinc-700">Tailwind CSS</span>
              <span className="bg-zinc-900 px-2 py-1 border border-zinc-700">REST APIs</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Builds Vault */}
      <section id="vault" className="max-w-7xl mx-auto px-6 py-20 border-t-2 border-zinc-800">
        <div className="space-y-4 mb-8">
          <span className="font-mono text-xs text-[#FFD13B] tracking-widest">[03 // FEATURED BUILDS VAULT]</span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase">Projects & Architecture</h2>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap gap-3 mb-10">
          {(['all', 'production', 'distributed', 'opensource'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`font-mono text-xs uppercase px-4 py-2 border-2 transition-all ${
                filter === cat
                  ? 'bg-[#FFD13B] text-[#121316] border-[#FFD13B] font-bold shadow-[2px_2px_0px_0px_#F4F5F7]'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-700 hover:border-[#FFD13B]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {(filter === 'all' || filter === 'production') && (
            <div className="border-2 border-zinc-800 bg-[#16181f] p-6 shadow-[5px_5px_0px_0px_#121316]">
              <div className="flex justify-between items-center mb-4">
                <span className="font-mono text-xs text-emerald-400 bg-emerald-950 px-2 py-1 border border-emerald-500">
                  ● PRODUCTION PLATFORM
                </span>
                <span className="font-mono text-xs text-zinc-500">naadanindia.com</span>
              </div>
              <h3 className="text-2xl font-black text-[#F4F5F7] mb-2">Naadan Cloud Kitchen & KDS</h3>
              <p className="text-sm font-mono text-zinc-400 mb-4">
                Real-time kitchen order dispatch and menu synchronization system. Features sub-150ms websocket updates and zero order loss.
              </p>
              <div className="flex flex-wrap gap-2 text-xs font-mono text-zinc-400">
                <span className="bg-zinc-900 px-2 py-1 border border-zinc-700">Next.js</span>
                <span className="bg-zinc-900 px-2 py-1 border border-zinc-700">PostgreSQL</span>
                <span className="bg-zinc-900 px-2 py-1 border border-zinc-700">WebSockets</span>
                <span className="bg-zinc-900 px-2 py-1 border border-zinc-700">Vercel</span>
              </div>
            </div>
          )}

          {(filter === 'all' || filter === 'distributed') && (
            <div className="border-2 border-zinc-800 bg-[#16181f] p-6 shadow-[5px_5px_0px_0px_#121316]">
              <div className="flex justify-between items-center mb-4">
                <span className="font-mono text-xs text-[#FFD13B] bg-yellow-950 px-2 py-1 border border-[#FFD13B]">
                  DISTRIBUTED SYSTEMS
                </span>
                <span className="font-mono text-xs text-zinc-500">RefNet Core</span>
              </div>
              <h3 className="text-2xl font-black text-[#F4F5F7] mb-2">Job Referral Network System</h3>
              <p className="text-sm font-mono text-zinc-400 mb-4">
                Scalable job referral coordination platform with Redis caching, PostgreSQL indexing, and Dockerized microservice architecture.
              </p>
              <div className="flex flex-wrap gap-2 text-xs font-mono text-zinc-400">
                <span className="bg-zinc-900 px-2 py-1 border border-zinc-700">Node.js</span>
                <span className="bg-zinc-900 px-2 py-1 border border-zinc-700">Redis</span>
                <span className="bg-zinc-900 px-2 py-1 border border-zinc-700">Docker</span>
                <span className="bg-zinc-900 px-2 py-1 border border-zinc-700">Express</span>
              </div>
            </div>
          )}

          {(filter === 'all' || filter === 'opensource') && (
            <div className="border-2 border-zinc-800 bg-[#16181f] p-6 shadow-[5px_5px_0px_0px_#121316]">
              <div className="flex justify-between items-center mb-4">
                <span className="font-mono text-xs text-cyan-400 bg-cyan-950 px-2 py-1 border border-cyan-500">
                  OPEN SOURCE
                </span>
                <span className="font-mono text-xs text-zinc-500">TheAlgorithms</span>
              </div>
              <h3 className="text-2xl font-black text-[#F4F5F7] mb-2">TheAlgorithms / TypeScript</h3>
              <p className="text-sm font-mono text-zinc-400 mb-4">
                Authored asynchronous Semaphore concurrency controllers, comprehensive vitest suites, and LRU Cache structures.
              </p>
              <div className="flex flex-wrap gap-2 text-xs font-mono text-zinc-400">
                <span className="bg-zinc-900 px-2 py-1 border border-zinc-700">TypeScript</span>
                <span className="bg-zinc-900 px-2 py-1 border border-zinc-700">Async/Await</span>
                <span className="bg-zinc-900 px-2 py-1 border border-zinc-700">Concurrency</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Contact & Inquiry Section */}
      <section id="contact" className="max-w-7xl mx-auto px-6 py-20 border-t-2 border-zinc-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-4">
            <span className="font-mono text-xs text-[#FFD13B] tracking-widest">[04 // LET&apos;S BUILD SOMETHING]</span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase">Initiate Contact</h2>
            <p className="text-zinc-400 text-sm font-mono leading-relaxed">
              Available for full-time SDE-1 roles and distributed systems engineering opportunities.
            </p>
            <div className="pt-4 space-y-2 font-mono text-xs">
              <p className="text-zinc-500">&gt; Direct Email: tahakhan.engineer@gmail.com</p>
              <p className="text-zinc-500">&gt; GitHub: github.com/TahaKhanSDE</p>
              <p className="text-zinc-500">&gt; LinkedIn: linkedin.com/in/tahakhansde</p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <form onSubmit={handleInquirySubmit} className="border-2 border-zinc-700 bg-[#16181f] p-8 space-y-4 shadow-[6px_6px_0px_0px_#FFD13B]">
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">NAME</label>
                <input
                  type="text"
                  value={inquiryName}
                  onChange={(e) => setInquiryName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full bg-[#121316] border border-zinc-700 px-4 py-2 text-sm font-mono text-[#F4F5F7] focus:border-[#FFD13B] focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">EMAIL</label>
                <input
                  type="email"
                  value={inquiryEmail}
                  onChange={(e) => setInquiryEmail(e.target.value)}
                  placeholder="your.email@domain.com"
                  className="w-full bg-[#121316] border border-zinc-700 px-4 py-2 text-sm font-mono text-[#F4F5F7] focus:border-[#FFD13B] focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">PROJECT DETAILS / INQUIRY</label>
                <textarea
                  value={inquiryMessage}
                  onChange={(e) => setInquiryMessage(e.target.value)}
                  placeholder="Role specifications, project details, or interview inquiry..."
                  className="w-full bg-[#121316] border border-zinc-700 px-4 py-2 text-sm font-mono text-[#F4F5F7] focus:border-[#FFD13B] focus:outline-none h-28"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#FFD13B] text-[#121316] font-black uppercase py-3 border-2 border-[#121316] shadow-[4px_4px_0px_0px_#F4F5F7] hover:translate-x-0.5 hover:translate-y-0.5 transition-transform font-mono text-sm"
              >
                Submit Inquiry →
              </button>
              {inquiryStatus && (
                <p className="text-xs font-mono text-[#FFD13B] pt-2 text-center">{inquiryStatus}</p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-zinc-800 py-8 px-6 max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-zinc-500">
        <p>© 2026 Taha Hakim Khan. All rights reserved.</p>
        <button
          onClick={() => router.push('/studio')}
          className="hover:text-[#FFD13B] transition-colors"
          title="Secret Studio Core"
        >
          [TK // SYSTEM_CORE]
        </button>
      </footer>
    </div>
  );
}