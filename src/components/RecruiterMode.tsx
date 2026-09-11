import React, { useMemo, useState } from 'react';
import { PROJECTS_DATA, CAPABILITIES_DATA } from '../data/portfolioData';
import type { ProjectItem, RecruiterRole } from '../types';
import { playCyberClick } from '../utils/audioSynth';

interface RecruiterModeProps {
  open: boolean;
  onClose: () => void;
  onSelectProject: (project: ProjectItem) => void;
}

const ROLES: { id: RecruiterRole; label: string; focus: string[] }[] = [
  {
    id: 'backend',
    label: 'Backend Engineer',
    focus: ['Node.js', 'Express', 'PostgreSQL', 'Redis', 'BullMQ', 'APIs', 'Auth', 'Observability'],
  },
  {
    id: 'fullstack',
    label: 'Full Stack Engineer',
    focus: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'PostgreSQL', 'APIs', 'Auth'],
  },
  {
    id: 'ai',
    label: 'AI / ML Engineer',
    focus: ['Gemini', 'RAG', 'pgvector', 'Embeddings', 'Function calling'],
  },
  {
    id: 'frontend',
    label: 'Frontend Engineer',
    focus: ['React', 'TypeScript', 'Tailwind', 'Motion', 'WebGL', 'UX'],
  },
  {
    id: 'software',
    label: 'Software Engineer',
    focus: ['DSA', 'System design', 'TypeScript', 'Testing', 'CI'],
  },
  {
    id: 'product',
    label: 'Product Engineer',
    focus: ['End-to-end ownership', 'UX', 'APIs', 'Ship velocity'],
  },
];

function rankProjects(role: RecruiterRole): ProjectItem[] {
  return [...PROJECTS_DATA].sort((a, b) => {
    const aFit = a.roleFit?.includes(role) ? 2 : 0;
    const bFit = b.roleFit?.includes(role) ? 2 : 0;
    const aTags = (a.roleFit?.length ?? 0) + a.tags.length * 0.01;
    const bTags = (b.roleFit?.length ?? 0) + b.tags.length * 0.01;
    return bFit + bTags - (aFit + aTags);
  });
}

export const RecruiterMode: React.FC<RecruiterModeProps> = ({ open, onClose, onSelectProject }) => {
  const [role, setRole] = useState<RecruiterRole>('backend');
  const ranked = useMemo(() => rankProjects(role), [role]);
  const roleMeta = ROLES.find((r) => r.id === role)!;

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto glass-panel rounded-2xl border border-[#4cd9e0]/25 shadow-[0_0_50px_rgba(76,217,224,0.1)]">
        <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 border-b border-white/10 bg-[#0d141b]/90 backdrop-blur">
          <div>
            <p className="text-[10px] font-mono-custom tracking-[0.2em] text-[#4cd9e0]">RECRUITER_MODE</p>
            <h2 className="text-lg font-semibold text-[#dce3ed]">Select role lens</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#8f9195] hover:text-white text-sm px-2"
            aria-label="Close recruiter mode"
          >
            ESC / ✕
          </button>
        </div>

        <div className="p-5 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {ROLES.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => {
                  playCyberClick();
                  setRole(r.id);
                }}
                className={`text-left px-3 py-3 rounded-xl border text-sm transition-all ${
                  role === r.id
                    ? 'border-[#4cd9e0] bg-[#4cd9e0]/10 text-[#4cd9e0]'
                    : 'border-white/10 text-[#c5c6ca] hover:border-white/25'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          <div>
            <p className="text-[10px] font-mono-custom tracking-widest text-[#8f9195] mb-2">HIGHLIGHT STACK</p>
            <div className="flex flex-wrap gap-2">
              {roleMeta.focus.map((f) => (
                <span
                  key={f}
                  className="px-2.5 py-1 rounded-full text-xs border border-[#4cd9e0]/30 text-[#4cd9e0] bg-[#4cd9e0]/5"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-mono-custom tracking-widest text-[#8f9195] mb-3">
              PRIORITIZED MODULES
            </p>
            <ol className="space-y-2">
              {ranked.slice(0, 4).map((p, i) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => {
                      playCyberClick();
                      onSelectProject(p);
                      onClose();
                    }}
                    className="w-full text-left glass-panel-subtle rounded-xl px-4 py-3 flex gap-4 items-start hover:border-[#4cd9e0]/40 border border-transparent transition-all"
                  >
                    <span className="font-mono-custom text-[#4cd9e0] text-sm w-6">{i + 1}.</span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold text-[#dce3ed]">{p.title}</span>
                        <span className="text-[10px] font-mono-custom text-[#8f9195]">{p.modNumber}</span>
                        {p.roleFit?.includes(role) && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#4cd9e0]/15 text-[#4cd9e0]">
                            STRONG FIT
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#c5c6ca] mt-0.5 line-clamp-2">{p.tagline}</p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {p.tags.slice(0, 6).map((tag) => (
                          <span key={tag} className="text-[10px] text-[#8f9195] border border-white/10 px-1.5 py-0.5 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <p className="text-[10px] font-mono-custom tracking-widest text-[#8f9195] mb-2">CAPABILITY SNAPSHOT</p>
            <div className="grid sm:grid-cols-2 gap-2">
              {CAPABILITIES_DATA.slice(0, 4).map((c) => (
                <div key={c.id} className="rounded-lg border border-white/10 px-3 py-2">
                  <div className="flex justify-between text-xs">
                    <span>{c.title}</span>
                    <span className="text-[#4cd9e0] font-mono-custom">{c.capacity}%</span>
                  </div>
                  <div className="mt-1 h-1 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-[#4cd9e0]" style={{ width: `${c.capacity}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
