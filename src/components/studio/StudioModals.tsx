'use client';

import React, { useState } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import type { Endorsement } from '@/data/defaultPortfolio';
import { ProjectItem, ExperienceItem } from '@/types';

interface StudioModalsProps {
  inspoOpen: boolean;
  onCloseInspo: () => void;
  newBuildModalOpen: boolean;
  onCloseNewBuildModal: () => void;
  adminOpen: boolean;
  onCloseAdmin: () => void;
  onToast: (msg: string) => void;
}

export default function StudioModals({
  inspoOpen,
  onCloseInspo,
  newBuildModalOpen,
  onCloseNewBuildModal,
  adminOpen,
  onCloseAdmin,
  onToast,
}: StudioModalsProps) {
  const { state, updatePortfolio, resetPortfolio } = usePortfolio();

  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const [passkeyInput, setPasskeyInput] = useState('');
  const [passkeyError, setPasskeyError] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'terminal' | 'soundtrack' | 'timeline' | 'vault' | 'endorsements'>('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // ── Local draft state (mirrors context; committed on Save) ──────────────────
  const [draftAvailability, setDraftAvailability] = useState(state.availability);
  const [draftEyebrow, setDraftEyebrow] = useState(state.eyebrow);
  const [draftHeadline, setDraftHeadline] = useState(state.headline);
  const [draftTerminal, setDraftTerminal] = useState(state.terminal);
  const [draftContact, setDraftContact] = useState(state.contact);
  const [draftAudio, setDraftAudio] = useState(state.audio);

  // Vault form
  const [newTitle, setNewTitle] = useState('');
  const [newCat, setNewCat] = useState<'production' | 'distributed' | 'oss'>('production');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newTags, setNewTags] = useState('');
  const [newUrl, setNewUrl] = useState('');

  // Experience form
  const [expRole, setExpRole] = useState('');
  const [expCompany, setExpCompany] = useState('');
  const [expPeriod, setExpPeriod] = useState('2026 – Present');
  const [expLocation, setExpLocation] = useState('Nagpur / Remote');
  const [expBadge, setExpBadge] = useState('PRODUCTION CONTRACT');
  const [expSummary, setExpSummary] = useState('');
  const [expProjName, setExpProjName] = useState('');
  const [expProjDesc, setExpProjDesc] = useState('');
  const [expProjTech, setExpProjTech] = useState('');

  // ── Helpers ─────────────────────────────────────────────────────────────────

  const verifyPasskey = (e: React.FormEvent) => {
    e.preventDefault();
    if (passkeyInput === 'wingslug2026') {
      setIsAdminUnlocked(true);
      setPasskeyError(false);
      try {
        sessionStorage.setItem('studio-passkey', passkeyInput);
      } catch {
        /* sessionStorage unavailable; passkeyInput state still holds it */
      }
      // Reset drafts to current context state each time studio is unlocked
      setDraftAvailability(state.availability);
      setDraftEyebrow(state.eyebrow);
      setDraftHeadline(state.headline);
      setDraftTerminal(state.terminal);
      setDraftContact(state.contact);
      setDraftAudio(state.audio);
      setSaveError(null);
    } else {
      setPasskeyError(true);
    }
  };

  const handleDeleteEndorsement = async (endorsement: Endorsement) => {
    const filtered = state.endorsements.filter((item) => item.id !== endorsement.id);
    const { ok, status } = await updatePortfolio({ endorsements: filtered });
    if (ok) {
      onToast('Endorsement deleted.');
    } else {
      setSaveError(status === 401 ? 'Session expired.' : `Delete failed (${status}).`);
    }
  };

  const handleCloseAdmin = () => {
    setIsAdminUnlocked(false);
    setPasskeyInput('');
    try {
      sessionStorage.removeItem('studio-passkey');
    } catch {
      /* ignore */
    }
    setPasskeyError(false);
    setSaveError(null);
    onCloseAdmin();
  };

  /** Persist the current tab's draft fields to Redis via PUT /api/portfolio */
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveError(null);
    const { ok, status } = await updatePortfolio({
      availability: draftAvailability,
      eyebrow: draftEyebrow,
      headline: draftHeadline,
      contact: draftContact,
    });
    setIsSaving(false);
    if (ok) {
      onToast('Profile & contact saved to Redis ✓');
    } else {
      setSaveError(
        status === 401
          ? 'Session expired. Refresh and re-authenticate.'
          : status === 503
          ? 'Redis unavailable — check Upstash env vars.'
          : `Save failed (${status}). Try again.`,
      );
    }
  };

  const handleSaveTerminal = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveError(null);
    const { ok, status } = await updatePortfolio({ terminal: draftTerminal });
    setIsSaving(false);
    if (ok) {
      onToast('Terminal metrics saved to Redis ✓');
    } else {
      setSaveError(
        status === 401 ? 'Session expired.' : status === 503 ? 'Redis unavailable.' : `Save failed (${status}).`,
      );
    }
  };

  const handleSaveSoundtrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveError(null);
    const updated = {
      trackName: draftAudio.trackName.trim() || 'my-new-type-of-hero',
      src: draftAudio.src.trim() || '/my-new-type-of-hero.mp3',
      bpm: Number(draftAudio.bpm) || 128,
    };
    const { ok, status } = await updatePortfolio({ audio: updated });
    setIsSaving(false);
    if (ok) {
      onToast('Soundtrack synchronized to Redis ✓');
    } else {
      setSaveError(
        status === 401 ? 'Session expired.' : status === 503 ? 'Redis unavailable.' : `Save failed (${status}).`,
      );
    }
  };

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newProject: ProjectItem = {
      id: `proj-${Date.now()}`,
      title: newTitle,
      subtitle: newSubtitle,
      category: newCat,
      desc: newDesc,
      tags: newTags.split(',').map((t) => t.trim()).filter(Boolean),
      url: newUrl || '#',
    };
    const updatedProjects = [newProject, ...state.projects];
    setIsSaving(true);
    setSaveError(null);
    const { ok, status } = await updatePortfolio({ projects: updatedProjects });
    setIsSaving(false);
    if (ok) {
      onToast(`Project "${newProject.title}" committed to vault!`);
      setNewTitle(''); setNewSubtitle(''); setNewDesc(''); setNewTags(''); setNewUrl('');
      handleCloseAdmin();
    } else {
      setSaveError(
        status === 401 ? 'Session expired.' : status === 503 ? 'Redis unavailable.' : `Save failed (${status}).`,
      );
    }
  };

  const handleExperienceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newExp: ExperienceItem = {
      id: `exp-${Date.now()}`,
      role: expRole,
      company: expCompany,
      period: expPeriod,
      location: expLocation,
      badgeText: expBadge,
      badgeType: 'production',
      summary: expSummary,
      bullets: [expSummary],
      builtProjects: [
        {
          name: expProjName || 'Production Milestone',
          description: expProjDesc || 'Architectural deliverable deployed under this tenure.',
          tech: expProjTech.split(',').map((t) => t.trim()).filter(Boolean),
        },
      ],
    };
    const updatedExperiences = [newExp, ...state.experiences];
    setIsSaving(true);
    setSaveError(null);
    const { ok, status } = await updatePortfolio({ experiences: updatedExperiences });
    setIsSaving(false);
    if (ok) {
      onToast(`Milestone "${newExp.role}" added to timeline!`);
      setExpRole(''); setExpCompany(''); setExpSummary(''); setExpProjName(''); setExpProjDesc(''); setExpProjTech('');
      handleCloseAdmin();
    } else {
      setSaveError(
        status === 401 ? 'Session expired.' : status === 503 ? 'Redis unavailable.' : `Save failed (${status}).`,
      );
    }
  };

  const handleReset = async () => {
    if (!confirm('Reset all portfolio content to defaults? This cannot be undone.')) return;
    setIsSaving(true);
    setSaveError(null);
    const { ok, status } = await resetPortfolio();
    setIsSaving(false);
    if (ok) {
      onToast('Portfolio reset to defaults ✓');
      handleCloseAdmin();
    } else {
      setSaveError(
        status === 401 ? 'Session expired.' : status === 503 ? 'Redis unavailable.' : `Reset failed (${status}).`,
      );
    }
  };

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <>
      {/* Visual Inspo Modal */}
      {inspoOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border-4 border-[#121316] p-6 rounded-lg shadow-[6px_6px_0px_0px_#121316] max-w-2xl w-full space-y-4 font-mono text-xs max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div>
                <span className="text-[#FFD13B] font-bold text-sm block">CYBER-NOIR DESIGN INSPIRATIONS</span>
                <span className="text-zinc-500 text-[10px]">How your visual references map to this interface</span>
              </div>
              <button onClick={onCloseInspo} className="text-[#F4F5F7] hover:text-[#FFD13B] font-bold text-base p-1">✕</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              {[
                { icon: 'fa-glasses', title: '1. Comic Books Noir', desc: 'Hero avatar card with sharp ink lines and yellow reflective lenses.' },
                { icon: 'fa-eye-slash', title: '2. Blinded by the Lights', desc: 'Monochrome crosswalk shadow photography with high-contrast geometric striping.' },
                { icon: 'fa-desktop', title: '3. Turismo Rig & Setup', desc: 'Dual-chamber glowing yellow PC rig with expandable specs drawer.' },
                { icon: 'fa-building', title: '4. Skyscraper Tower Apex', desc: 'Towering glass skyscraper tapering into illuminated apex behind the Creed.' },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="p-3 bg-[#121316] border border-zinc-800 rounded space-y-1">
                  <div className="text-[#FFD13B] font-bold flex items-center gap-1.5">
                    <i className={`fa-solid ${icon}`}></i><span>{title}</span>
                  </div>
                  <p className="text-[11px] text-[#F4F5F7]/80">{desc}</p>
                </div>
              ))}
            </div>
            <button onClick={onCloseInspo} className="w-full py-2.5 bg-[#FFD13B] text-[#121316] font-bold uppercase rounded border-2 border-[#121316]">
              Close Inspector
            </button>
          </div>
        </div>
      )}

      {/* Add Build Notice */}
      {newBuildModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border-4 border-[#121316] p-6 rounded-lg shadow-[6px_6px_0px_0px_#121316] max-w-md w-full space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
              <span className="text-[#FFD13B] font-bold">VAULT ARCHITECTURE</span>
              <button onClick={onCloseNewBuildModal} className="text-[#F4F5F7] hover:text-[#FFD13B] font-bold text-sm">✕</button>
            </div>
            <p className="text-[#F4F5F7]/90 leading-relaxed">
              To inject projects, customize soundtrack tracks, or update your experience timeline live, press the backtick key (<code className="bg-[#121316] px-1 py-0.5 rounded text-[#FFD13B]">`</code>) or tap the status indicator 5 times to open the Secret Studio.
            </p>
            <button onClick={onCloseNewBuildModal} className="w-full py-2.5 bg-[#FFD13B] text-[#121316] font-bold uppercase rounded border-2 border-[#121316]">
              Understood
            </button>
          </div>
        </div>
      )}

      {/* Secret Admin Studio */}
      {adminOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border-4 border-[#FFD13B] p-6 rounded-xl shadow-[8px_8px_0px_0px_#121316] max-w-3xl w-full space-y-5 font-mono text-xs max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b-2 border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FFD13B] animate-ping"></span>
                <span className="text-[#FFD13B] font-black text-sm uppercase tracking-wider">SYSTEM_CORE // SECRET ADMIN STUDIO</span>
              </div>
              <button onClick={handleCloseAdmin} className="text-[#F4F5F7] hover:text-[#FFD13B] font-bold text-lg p-1">✕</button>
            </div>

            {!isAdminUnlocked ? (
              <form onSubmit={verifyPasskey} className="space-y-4 py-4 max-w-sm mx-auto text-left">
                <div className="p-4 bg-[#121316] border-2 border-zinc-800 rounded text-center space-y-2">
                  <i className="fa-solid fa-lock text-3xl text-[#FFD13B]"></i>
                  <h4 className="font-bold text-base text-[#F4F5F7]">Authentication Required</h4>
                  <p className="text-zinc-500 text-xs">Enter your Master Passphrase to mutate portfolio content live.</p>
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#F4F5F7]/80 font-bold">Passphrase *</label>
                  <input
                    type="password"
                    required
                    value={passkeyInput}
                    onChange={(e) => setPasskeyInput(e.target.value)}
                    placeholder="Enter passkey"
                    className="w-full bg-[#121316] border-2 border-zinc-800 focus:border-[#FFD13B] focus:outline-none p-3 rounded text-[#F4F5F7]"
                  />
                </div>
                <button type="submit" className="w-full py-2.5 bg-[#FFD13B] hover:bg-yellow-400 text-[#121316] font-bold rounded uppercase tracking-wider shadow-[2px_2px_0px_0px_#121316]">
                  Authorize Session
                </button>
                {passkeyError && <div className="text-red-400 text-center font-bold">Invalid passphrase. Access denied.</div>}
              </form>
            ) : (
              <div className="space-y-6">
                {/* Persistent error banner */}
                {saveError && (
                  <div className="p-3 bg-red-950 border border-red-500 text-red-300 rounded text-xs font-mono">
                    ✕ {saveError}
                  </div>
                )}

                {/* Navigation Tabs */}
                <div className="flex flex-wrap items-center gap-2 border-b border-zinc-800 pb-3">
                  {(['profile', 'terminal', 'soundtrack', 'timeline', 'vault', 'endorsements'] as const).map((tab, i) => (
                    <button
                      key={tab}
                      onClick={() => { setActiveTab(tab); setSaveError(null); }}
                      className={`px-3 py-1.5 rounded font-bold transition-colors ${activeTab === tab ? 'bg-[#FFD13B] text-[#121316]' : 'bg-[#121316] text-zinc-400'}`}
                    >
                      {i + 1}. {tab === 'profile' ? 'Profile & Resume' : tab === 'terminal' ? 'Terminal & Contact' : tab === 'soundtrack' ? 'Background Music' : tab === 'timeline' ? 'Add Experience' : tab === 'vault' ? 'Add Project' : 'Endorsements'}
                    </button>
                  ))}
                </div>

                {/* TAB 1: Profile & Resume */}
                {activeTab === 'profile' && (
                  <form onSubmit={handleSaveProfile} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] text-zinc-500 block mb-1">Availability Status</label>
                        <input type="text" value={draftAvailability} onChange={(e) => setDraftAvailability(e.target.value)}
                          className="w-full bg-[#121316] border border-zinc-800 p-2 rounded text-[#F4F5F7] focus:border-[#FFD13B] focus:outline-none" />
                      </div>
                      <div>
                        <label className="text-[11px] text-zinc-500 block mb-1">Live Resume URL</label>
                        <input type="text" value={draftContact.resumeUrl} onChange={(e) => setDraftContact({ ...draftContact, resumeUrl: e.target.value })}
                          className="w-full bg-[#121316] border border-zinc-800 p-2 rounded text-[#FFD13B] focus:border-[#FFD13B] focus:outline-none" />
                      </div>
                    </div>
                    <div>
                      <label className="text-[11px] text-zinc-500 block mb-1">Hero Role Eyebrow</label>
                      <input type="text" value={draftEyebrow} onChange={(e) => setDraftEyebrow(e.target.value)}
                        className="w-full bg-[#121316] border border-zinc-800 p-2 rounded text-[#F4F5F7] focus:border-[#FFD13B] focus:outline-none" />
                    </div>
                    <div>
                      <label className="text-[11px] text-zinc-500 block mb-1">Hero Display Headline</label>
                      <input type="text" value={draftHeadline} onChange={(e) => setDraftHeadline(e.target.value)}
                        className="w-full bg-[#121316] border border-zinc-800 p-2 rounded text-[#F4F5F7] focus:border-[#FFD13B] focus:outline-none" />
                    </div>
                    <button type="submit" disabled={isSaving}
                      className="w-full py-2.5 bg-[#FFD13B] hover:bg-yellow-400 disabled:opacity-50 text-[#121316] font-bold rounded uppercase tracking-wider shadow-[2px_2px_0px_0px_#121316]">
                      {isSaving ? 'Saving…' : 'Save to Redis'}
                    </button>
                  </form>
                )}

                {/* TAB 2: Terminal & Contact */}
                {activeTab === 'terminal' && (
                  <form onSubmit={handleSaveTerminal} className="space-y-4">
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="text-[10px] text-zinc-500 block mb-1">Terminal Status Tag</label>
                        <input type="text" value={draftTerminal.statusText} onChange={(e) => setDraftTerminal({ ...draftTerminal, statusText: e.target.value })}
                          className="w-full bg-[#121316] border border-zinc-800 p-2 rounded text-[#FFD13B]" />
                      </div>
                      <div>
                        <label className="text-[10px] text-zinc-500 block mb-1">Uptime Metric</label>
                        <input type="text" value={draftTerminal.uptime} onChange={(e) => setDraftTerminal({ ...draftTerminal, uptime: e.target.value })}
                          className="w-full bg-[#121316] border border-zinc-800 p-2 rounded text-[#F4F5F7]" />
                      </div>
                      <div>
                        <label className="text-[10px] text-zinc-500 block mb-1">Peak RPS</label>
                        <input type="text" value={draftTerminal.rps} onChange={(e) => setDraftTerminal({ ...draftTerminal, rps: e.target.value })}
                          className="w-full bg-[#121316] border border-zinc-800 p-2 rounded text-[#F4F5F7]" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div>
                        <label className="text-[11px] text-zinc-500 block mb-1">Primary Email Endpoint</label>
                        <input type="email" value={draftContact.primaryEmail} onChange={(e) => setDraftContact({ ...draftContact, primaryEmail: e.target.value })}
                          className="w-full bg-[#121316] border border-zinc-800 p-2 rounded text-[#FFD13B]" />
                      </div>
                      <div>
                        <label className="text-[11px] text-zinc-500 block mb-1">Secondary Backup Email</label>
                        <input type="email" value={draftContact.secondaryEmail} onChange={(e) => setDraftContact({ ...draftContact, secondaryEmail: e.target.value })}
                          className="w-full bg-[#121316] border border-zinc-800 p-2 rounded text-[#F4F5F7]" />
                      </div>
                    </div>
                    <button type="submit" disabled={isSaving}
                      className="w-full py-2.5 bg-[#FFD13B] hover:bg-yellow-400 disabled:opacity-50 text-[#121316] font-bold rounded uppercase tracking-wider shadow-[2px_2px_0px_0px_#121316]">
                      {isSaving ? 'Saving…' : 'Save to Redis'}
                    </button>
                  </form>
                )}

                {/* TAB 3: Soundtrack */}
                {activeTab === 'soundtrack' && (
                  <form onSubmit={handleSaveSoundtrack} className="space-y-4 bg-[#121316] p-4 rounded-lg border border-zinc-800">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                      <span className="text-[#FFD13B] font-bold text-xs flex items-center gap-2">
                        <i className="fa-solid fa-music"></i> BACKGROUND SOUNDTRACK CONTROLS
                      </span>
                      <span className="text-[10px] text-zinc-500">Persisted to Redis</span>
                    </div>
                    <div>
                      <label className="text-[11px] text-zinc-400 block mb-1">Displayed Track Name *</label>
                      <input type="text" required value={draftAudio.trackName} onChange={(e) => setDraftAudio({ ...draftAudio, trackName: e.target.value })}
                        placeholder="e.g. my-new-type-of-hero"
                        className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded text-[#F4F5F7] focus:border-[#FFD13B] outline-none" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2">
                        <label className="text-[11px] text-zinc-400 block mb-1">Audio Source File Path *</label>
                        <input type="text" required value={draftAudio.src} onChange={(e) => setDraftAudio({ ...draftAudio, src: e.target.value })}
                          placeholder="/my-new-type-of-hero.mp3"
                          className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded text-[#FFD13B] focus:border-[#FFD13B] outline-none" />
                      </div>
                      <div>
                        <label className="text-[11px] text-zinc-400 block mb-1">BPM</label>
                        <input type="number" value={draftAudio.bpm} onChange={(e) => setDraftAudio({ ...draftAudio, bpm: Number(e.target.value) })}
                          className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded text-[#F4F5F7] focus:border-[#FFD13B] outline-none" />
                      </div>
                    </div>
                    <button type="submit" disabled={isSaving}
                      className="w-full py-2.5 bg-[#FFD13B] hover:bg-yellow-400 disabled:opacity-50 text-[#121316] font-extrabold uppercase rounded shadow-[2px_2px_0px_0px_#000] cursor-pointer">
                      {isSaving ? 'Saving…' : 'Save & Hot-Reload Player'}
                    </button>
                  </form>
                )}

                {/* TAB 4: Add Experience */}
                {activeTab === 'timeline' && (
                  <form onSubmit={handleExperienceSubmit} className="space-y-3 bg-[#121316] p-4 rounded border border-zinc-800">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] text-zinc-500 block">Job Role Title *</label>
                        <input type="text" required value={expRole} onChange={(e) => setExpRole(e.target.value)}
                          placeholder="e.g. Distributed Systems Engineer"
                          className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded text-[#F4F5F7]" />
                      </div>
                      <div>
                        <label className="text-[10px] text-zinc-500 block">Company / Organization *</label>
                        <input type="text" required value={expCompany} onChange={(e) => setExpCompany(e.target.value)}
                          placeholder="e.g. Acme Corp"
                          className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded text-[#F4F5F7]" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-[10px] text-zinc-500 block">Time Period</label>
                        <input type="text" value={expPeriod} onChange={(e) => setExpPeriod(e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded text-[#F4F5F7]" />
                      </div>
                      <div>
                        <label className="text-[10px] text-zinc-500 block">Location</label>
                        <input type="text" value={expLocation} onChange={(e) => setExpLocation(e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded text-[#F4F5F7]" />
                      </div>
                      <div>
                        <label className="text-[10px] text-zinc-500 block">Badge Tag</label>
                        <input type="text" value={expBadge} onChange={(e) => setExpBadge(e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded text-[#FFD13B]" />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] text-zinc-500 block">Role Description & Summary *</label>
                      <textarea required rows={2} value={expSummary} onChange={(e) => setExpSummary(e.target.value)}
                        placeholder="Architectural overview of this tenure..."
                        className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded text-[#F4F5F7]" />
                    </div>
                    <div className="border-t border-zinc-800 pt-2 space-y-2">
                      <span className="text-[11px] text-[#FFD13B] font-bold block">Shipped Project Under This Role</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input type="text" value={expProjName} onChange={(e) => setExpProjName(e.target.value)}
                          placeholder="Project Name" className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded text-[#F4F5F7]" />
                        <input type="text" value={expProjTech} onChange={(e) => setExpProjTech(e.target.value)}
                          placeholder="Tech Stack (comma separated)" className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded text-[#F4F5F7]" />
                      </div>
                      <input type="text" value={expProjDesc} onChange={(e) => setExpProjDesc(e.target.value)}
                        placeholder="Short impact note" className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded text-[#F4F5F7]" />
                    </div>
                    <button type="submit" disabled={isSaving}
                      className="w-full py-2 bg-[#FFD13B] hover:bg-yellow-400 disabled:opacity-50 text-[#121316] font-bold rounded uppercase">
                      {isSaving ? 'Saving…' : '+ Append Timeline Milestone'}
                    </button>
                  </form>
                )}

                {/* TAB 5: Add Project */}
                {activeTab === 'vault' && (
                  <form onSubmit={handleProjectSubmit} className="space-y-3 bg-[#121316] p-4 rounded border border-zinc-800">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] text-zinc-500 block">Project Title *</label>
                        <input type="text" required value={newTitle} onChange={(e) => setNewTitle(e.target.value)}
                          placeholder="e.g. Distributed Lock Manager"
                          className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded text-[#F4F5F7]" />
                      </div>
                      <div>
                        <label className="text-[10px] text-zinc-500 block">Category *</label>
                        <select value={newCat} onChange={(e) => setNewCat(e.target.value as 'production' | 'distributed' | 'oss')}
                          className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded text-[#F4F5F7]">
                          <option value="production">Production</option>
                          <option value="distributed">Distributed</option>
                          <option value="oss">Open Source</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] text-zinc-500 block">Sub-Headline / Role *</label>
                      <input type="text" required value={newSubtitle} onChange={(e) => setNewSubtitle(e.target.value)}
                        placeholder="e.g. Raft Consensus Implementation with Redis"
                        className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded text-[#F4F5F7]" />
                    </div>
                    <div>
                      <label className="text-[10px] text-zinc-500 block">Description *</label>
                      <textarea required rows={2} value={newDesc} onChange={(e) => setNewDesc(e.target.value)}
                        placeholder="Brief technical summary..."
                        className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded text-[#F4F5F7]" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] text-zinc-500 block">Tags (Comma-separated)</label>
                        <input type="text" value={newTags} onChange={(e) => setNewTags(e.target.value)}
                          placeholder="TypeScript, Redis, Docker"
                          className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded text-[#F4F5F7]" />
                      </div>
                      <div>
                        <label className="text-[10px] text-zinc-500 block">External URL or GitHub</label>
                        <input type="text" value={newUrl} onChange={(e) => setNewUrl(e.target.value)}
                          placeholder="https://github.com/..."
                          className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded text-[#F4F5F7]" />
                      </div>
                    </div>
                    <button type="submit" disabled={isSaving}
                      className="w-full py-2 bg-[#FFD13B] hover:bg-yellow-400 disabled:opacity-50 text-[#121316] font-bold rounded uppercase">
                      {isSaving ? 'Saving…' : '+ Inject Project into Vault Grid'}
                    </button>
                  </form>
                )}

                {activeTab === 'endorsements' && (
                  <div className="space-y-3">
                    {state.endorsements.length === 0 ? (
                      <p className="text-sm text-zinc-400">No endorsements to manage.</p>
                    ) : state.endorsements.map((endorsement) => (
                      <div key={endorsement.id} className="flex items-start justify-between gap-4 bg-[#121316] p-3 border border-zinc-800">
                        <div className="min-w-0">
                          <p className="font-bold text-[#F4F5F7]">{endorsement.name}</p>
                          <p className="text-xs text-zinc-400">{endorsement.role}</p>
                          <p className="mt-1 text-sm text-zinc-300">
                            {endorsement.quote.length > 120 ? `${endorsement.quote.slice(0, 120)}…` : endorsement.quote}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDeleteEndorsement(endorsement)}
                          className="shrink-0 border border-red-500/50 px-3 py-1 font-mono text-xs tracking-widest text-red-400 hover:bg-red-500/10"
                        >
                          DELETE
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Footer row: Reset + Close */}
                <div className="flex items-center justify-between pt-1 border-t border-zinc-800">
                  <button onClick={handleReset} disabled={isSaving}
                    className="px-4 py-2 bg-red-950 hover:bg-red-900 disabled:opacity-50 border border-red-700 text-red-300 font-bold rounded text-xs">
                    ↺ Reset to Defaults
                  </button>
                  <button onClick={handleCloseAdmin} className="px-4 py-2 bg-[#F4F5F7] text-[#121316] font-bold rounded text-xs">
                    Close Studio
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
