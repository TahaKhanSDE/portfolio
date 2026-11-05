'use client';

import React, { useState } from 'react';
import { ProjectItem, ExperienceItem, TerminalConfig, ContactConfig } from '@/types';

interface StudioModalsProps {
  inspoOpen: boolean;
  onCloseInspo: () => void;
  newBuildModalOpen: boolean;
  onCloseNewBuildModal: () => void;
  adminOpen: boolean;
  onCloseAdmin: () => void;

  // Identity & Resume
  availability: string;
  onChangeAvailability: (val: string) => void;
  eyebrow: string;
  onChangeEyebrow: (val: string) => void;
  headline: string;
  onChangeHeadline: (val: string) => void;

  // Terminal & Contact
  terminal: TerminalConfig;
  onChangeTerminal: (val: TerminalConfig) => void;
  contact: ContactConfig;
  onChangeContact: (val: ContactConfig) => void;

  // Mutators
  onAddProject: (project: ProjectItem) => void;
  onAddExperience: (exp: ExperienceItem) => void;
}

export default function StudioModals({
  inspoOpen,
  onCloseInspo,
  newBuildModalOpen,
  onCloseNewBuildModal,
  adminOpen,
  onCloseAdmin,
  availability,
  onChangeAvailability,
  eyebrow,
  onChangeEyebrow,
  headline,
  onChangeHeadline,
  terminal,
  onChangeTerminal,
  contact,
  onChangeContact,
  onAddProject,
  onAddExperience,
}: StudioModalsProps) {
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const [passkeyInput, setPasskeyInput] = useState('');
  const [passkeyError, setPasskeyError] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'terminal' | 'timeline' | 'vault'>('profile');

  // Vault Form
  const [newTitle, setNewTitle] = useState('');
  const [newCat, setNewCat] = useState<'production' | 'distributed' | 'oss'>('production');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newTags, setNewTags] = useState('');
  const [newUrl, setNewUrl] = useState('');

  // Experience Timeline Form
  const [expRole, setExpRole] = useState('');
  const [expCompany, setExpCompany] = useState('');
  const [expPeriod, setExpPeriod] = useState('2026 – Present');
  const [expLocation, setExpLocation] = useState('Nagpur / Remote');
  const [expBadge, setExpBadge] = useState('PRODUCTION CONTRACT');
  const [expSummary, setExpSummary] = useState('');
  const [expProjName, setExpProjName] = useState('');
  const [expProjDesc, setExpProjDesc] = useState('');
  const [expProjTech, setExpProjTech] = useState('');

  const verifyPasskey = (e: React.FormEvent) => {
    e.preventDefault();
    if (passkeyInput === 'wingslug2026') {
      setIsAdminUnlocked(true);
      setPasskeyError(false);
    } else {
      setPasskeyError(true);
    }
  };

  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddProject({
      id: `proj-${Date.now()}`,
      title: newTitle,
      subtitle: newSubtitle,
      category: newCat,
      desc: newDesc,
      tags: newTags.split(',').map((t) => t.trim()).filter(Boolean),
      url: newUrl || '#',
    });
    setNewTitle('');
    setNewSubtitle('');
    setNewDesc('');
    setNewTags('');
    setNewUrl('');
    onCloseAdmin();
  };

  const handleExperienceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddExperience({
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
    });
    setExpRole('');
    setExpCompany('');
    setExpSummary('');
    setExpProjName('');
    setExpProjDesc('');
    setExpProjTech('');
    onCloseAdmin();
  };

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
              <div className="p-3 bg-[#121316] border border-zinc-800 rounded space-y-1">
                <div className="text-[#FFD13B] font-bold flex items-center gap-1.5">
                  <i className="fa-solid fa-glasses"></i>
                  <span>1. Comic Books Noir</span>
                </div>
                <p className="text-[11px] text-[#F4F5F7]/80">Hero avatar card with sharp ink lines and yellow reflective lenses.</p>
              </div>

              <div className="p-3 bg-[#121316] border border-zinc-800 rounded space-y-1">
                <div className="text-[#FFD13B] font-bold flex items-center gap-1.5">
                  <i className="fa-solid fa-eye-slash"></i>
                  <span>2. Blinded by the Lights</span>
                </div>
                <p className="text-[11px] text-[#F4F5F7]/80">Chiseled monochrome bust with vibrant yellow ribbon in About section.</p>
              </div>

              <div className="p-3 bg-[#121316] border border-zinc-800 rounded space-y-1">
                <div className="text-[#FFD13B] font-bold flex items-center gap-1.5">
                  <i className="fa-solid fa-desktop"></i>
                  <span>3. Turismo Rig & Setup</span>
                </div>
                <p className="text-[11px] text-[#F4F5F7]/80">Dual-chamber glowing yellow PC rig with expandable specs drawer.</p>
              </div>

              <div className="p-3 bg-[#121316] border border-zinc-800 rounded space-y-1">
                <div className="text-[#FFD13B] font-bold flex items-center gap-1.5">
                  <i className="fa-solid fa-building"></i>
                  <span>4. Skyscraper Tower Apex</span>
                </div>
                <p className="text-[11px] text-[#F4F5F7]/80">Towering glass skyscraper tapering into illuminated apex behind the Creed.</p>
              </div>
            </div>

            <button
              onClick={onCloseInspo}
              className="w-full py-2.5 bg-[#FFD13B] text-[#121316] font-bold uppercase rounded border-2 border-[#121316]"
            >
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
              To inject projects or update your experience timeline live, press the backtick key (<code className="bg-[#121316] px-1 py-0.5 rounded text-[#FFD13B]">`</code>) or tap the status indicator 5 times to open the Secret Studio.
            </p>
            <button
              onClick={onCloseNewBuildModal}
              className="w-full py-2.5 bg-[#FFD13B] text-[#121316] font-bold uppercase rounded border-2 border-[#121316]"
            >
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
              <button onClick={onCloseAdmin} className="text-[#F4F5F7] hover:text-[#FFD13B] font-bold text-lg p-1">✕</button>
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
                    placeholder="Enter passkey (default: wingslug2026)"
                    className="w-full bg-[#121316] border-2 border-zinc-800 focus:border-[#FFD13B] focus:outline-none p-3 rounded text-[#F4F5F7]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#FFD13B] hover:bg-yellow-400 text-[#121316] font-bold rounded uppercase tracking-wider shadow-[2px_2px_0px_0px_#121316]"
                >
                  Authorize Session
                </button>
                {passkeyError && <div className="text-red-400 text-center font-bold">Invalid passphrase. Access denied.</div>}
              </form>
            ) : (
              <div className="space-y-6">
                {/* Navigation Tabs */}
                <div className="flex items-center gap-2 border-b border-zinc-800 pb-3 font-mono text-xs">
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`px-3 py-1.5 rounded font-bold transition-colors ${
                      activeTab === 'profile' ? 'bg-[#FFD13B] text-[#121316]' : 'bg-[#121316] text-zinc-400'
                    }`}
                  >
                    1. Profile & Resume
                  </button>
                  <button
                    onClick={() => setActiveTab('terminal')}
                    className={`px-3 py-1.5 rounded font-bold transition-colors ${
                      activeTab === 'terminal' ? 'bg-[#FFD13B] text-[#121316]' : 'bg-[#121316] text-zinc-400'
                    }`}
                  >
                    2. Terminal & Contact
                  </button>
                  <button
                    onClick={() => setActiveTab('timeline')}
                    className={`px-3 py-1.5 rounded font-bold transition-colors ${
                      activeTab === 'timeline' ? 'bg-[#FFD13B] text-[#121316]' : 'bg-[#121316] text-zinc-400'
                    }`}
                  >
                    3. Add Experience
                  </button>
                  <button
                    onClick={() => setActiveTab('vault')}
                    className={`px-3 py-1.5 rounded font-bold transition-colors ${
                      activeTab === 'vault' ? 'bg-[#FFD13B] text-[#121316]' : 'bg-[#121316] text-zinc-400'
                    }`}
                  >
                    4. Add Project
                  </button>
                </div>

                {/* TAB 1: Profile & Resume */}
                {activeTab === 'profile' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] text-zinc-500 block mb-1">Availability Status</label>
                        <input
                          type="text"
                          value={availability}
                          onChange={(e) => onChangeAvailability(e.target.value)}
                          className="w-full bg-[#121316] border border-zinc-800 p-2 rounded text-[#F4F5F7] focus:border-[#FFD13B] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-zinc-500 block mb-1">Live Resume URL / Google Drive Link</label>
                        <input
                          type="text"
                          value={contact.resumeUrl}
                          onChange={(e) => onChangeContact({ ...contact, resumeUrl: e.target.value })}
                          className="w-full bg-[#121316] border border-zinc-800 p-2 rounded text-[#FFD13B] focus:border-[#FFD13B] focus:outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[11px] text-zinc-500 block mb-1">Hero Role Eyebrow</label>
                      <input
                        type="text"
                        value={eyebrow}
                        onChange={(e) => onChangeEyebrow(e.target.value)}
                        className="w-full bg-[#121316] border border-zinc-800 p-2 rounded text-[#F4F5F7] focus:border-[#FFD13B] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-zinc-500 block mb-1">Hero Display Headline</label>
                      <input
                        type="text"
                        value={headline}
                        onChange={(e) => onChangeHeadline(e.target.value)}
                        className="w-full bg-[#121316] border border-zinc-800 p-2 rounded text-[#F4F5F7] focus:border-[#FFD13B] focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* TAB 2: Terminal & Contact */}
                {activeTab === 'terminal' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="text-[10px] text-zinc-500 block mb-1">Terminal Status Tag</label>
                        <input
                          type="text"
                          value={terminal.statusText}
                          onChange={(e) => onChangeTerminal({ ...terminal, statusText: e.target.value })}
                          className="w-full bg-[#121316] border border-zinc-800 p-2 rounded text-[#FFD13B]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-zinc-500 block mb-1">Uptime Metric</label>
                        <input
                          type="text"
                          value={terminal.uptime}
                          onChange={(e) => onChangeTerminal({ ...terminal, uptime: e.target.value })}
                          className="w-full bg-[#121316] border border-zinc-800 p-2 rounded text-[#F4F5F7]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-zinc-500 block mb-1">Peak RPS</label>
                        <input
                          type="text"
                          value={terminal.rps}
                          onChange={(e) => onChangeTerminal({ ...terminal, rps: e.target.value })}
                          className="w-full bg-[#121316] border border-zinc-800 p-2 rounded text-[#F4F5F7]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div>
                        <label className="text-[11px] text-zinc-500 block mb-1">Primary Email Endpoint</label>
                        <input
                          type="email"
                          value={contact.primaryEmail}
                          onChange={(e) => onChangeContact({ ...contact, primaryEmail: e.target.value })}
                          className="w-full bg-[#121316] border border-zinc-800 p-2 rounded text-[#FFD13B]"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-zinc-500 block mb-1">Secondary Backup Email</label>
                        <input
                          type="email"
                          value={contact.secondaryEmail}
                          onChange={(e) => onChangeContact({ ...contact, secondaryEmail: e.target.value })}
                          className="w-full bg-[#121316] border border-zinc-800 p-2 rounded text-[#F4F5F7]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 3: Add Experience Timeline Milestone */}
                {activeTab === 'timeline' && (
                  <form onSubmit={handleExperienceSubmit} className="space-y-3 bg-[#121316] p-4 rounded border border-zinc-800">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] text-zinc-500 block">Job Role Title *</label>
                        <input
                          type="text"
                          required
                          value={expRole}
                          onChange={(e) => setExpRole(e.target.value)}
                          placeholder="e.g. Distributed Systems Engineer"
                          className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded text-[#F4F5F7]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-zinc-500 block">Company / Organization *</label>
                        <input
                          type="text"
                          required
                          value={expCompany}
                          onChange={(e) => setExpCompany(e.target.value)}
                          placeholder="e.g. Acme Corp"
                          className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded text-[#F4F5F7]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-[10px] text-zinc-500 block">Time Period</label>
                        <input
                          type="text"
                          value={expPeriod}
                          onChange={(e) => setExpPeriod(e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded text-[#F4F5F7]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-zinc-500 block">Location</label>
                        <input
                          type="text"
                          value={expLocation}
                          onChange={(e) => setExpLocation(e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded text-[#F4F5F7]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-zinc-500 block">Badge Tag</label>
                        <input
                          type="text"
                          value={expBadge}
                          onChange={(e) => setExpBadge(e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded text-[#FFD13B]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] text-zinc-500 block">Role Description & Summary *</label>
                      <textarea
                        required
                        rows={2}
                        value={expSummary}
                        onChange={(e) => setExpSummary(e.target.value)}
                        placeholder="Architectural overview of this tenure..."
                        className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded text-[#F4F5F7]"
                      />
                    </div>

                    <div className="border-t border-zinc-800 pt-2 space-y-2">
                      <span className="text-[11px] text-[#FFD13B] font-bold block">Shipped Project Under This Role</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={expProjName}
                          onChange={(e) => setExpProjName(e.target.value)}
                          placeholder="Project Name (e.g. Order Dispatch Engine)"
                          className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded text-[#F4F5F7]"
                        />
                        <input
                          type="text"
                          value={expProjTech}
                          onChange={(e) => setExpProjTech(e.target.value)}
                          placeholder="Tech Stack (comma separated)"
                          className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded text-[#F4F5F7]"
                        />
                      </div>
                      <input
                        type="text"
                        value={expProjDesc}
                        onChange={(e) => setExpProjDesc(e.target.value)}
                        placeholder="Short impact note (e.g. sub-second websocket delivery)"
                        className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded text-[#F4F5F7]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2 bg-[#FFD13B] hover:bg-yellow-400 text-[#121316] font-bold rounded uppercase"
                    >
                      + Append Timeline Milestone
                    </button>
                  </form>
                )}

                {/* TAB 4: Add Project to Vault */}
                {activeTab === 'vault' && (
                  <form onSubmit={handleProjectSubmit} className="space-y-3 bg-[#121316] p-4 rounded border border-zinc-800">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] text-zinc-500 block">Project Title *</label>
                        <input
                          type="text"
                          required
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                          placeholder="e.g. Distributed Lock Manager"
                          className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded text-[#F4F5F7]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-zinc-500 block">Category *</label>
                        <select
                          value={newCat}
                          onChange={(e) => setNewCat(e.target.value as any)}
                          className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded text-[#F4F5F7]"
                        >
                          <option value="production">Production</option>
                          <option value="distributed">Distributed</option>
                          <option value="oss">Open Source</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] text-zinc-500 block">Sub-Headline / Role *</label>
                      <input
                        type="text"
                        required
                        value={newSubtitle}
                        onChange={(e) => setNewSubtitle(e.target.value)}
                        placeholder="e.g. Raft Consensus Implementation with Redis"
                        className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded text-[#F4F5F7]"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-zinc-500 block">Description *</label>
                      <textarea
                        required
                        rows={2}
                        value={newDesc}
                        onChange={(e) => setNewDesc(e.target.value)}
                        placeholder="Brief technical summary of challenges, metrics, and results..."
                        className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded text-[#F4F5F7]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] text-zinc-500 block">Tags (Comma-separated)</label>
                        <input
                          type="text"
                          value={newTags}
                          onChange={(e) => setNewTags(e.target.value)}
                          placeholder="TypeScript, Redis, Docker, Raft"
                          className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded text-[#F4F5F7]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-zinc-500 block">External URL or GitHub</label>
                        <input
                          type="text"
                          value={newUrl}
                          onChange={(e) => setNewUrl(e.target.value)}
                          placeholder="https://github.com/TahaKhanSDE/..."
                          className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded text-[#F4F5F7]"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2 bg-[#FFD13B] hover:bg-yellow-400 text-[#121316] font-bold rounded uppercase"
                    >
                      + Inject Project into Vault Grid
                    </button>
                  </form>
                )}

                <div className="flex justify-end pt-1">
                  <button
                    onClick={onCloseAdmin}
                    className="px-4 py-2 bg-[#F4F5F7] text-[#121316] font-bold rounded"
                  >
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