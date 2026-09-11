import React from 'react';
import { PROJECTS_DATA, CAPABILITIES_DATA, PROFILE, SYSTEM_METRICS } from '../data/portfolioData';
import type { ProjectItem } from '../types';
import { playCyberClick } from '../utils/audioSynth';

interface OSDashboardProps {
  onSelectProject: (p: ProjectItem) => void;
  onNavigate: (id: string) => void;
  onOpenAI: () => void;
  onOpenRecruiter: () => void;
}

export const OSDashboard: React.FC<OSDashboardProps> = ({
  onSelectProject,
  onNavigate,
  onOpenAI,
  onOpenRecruiter,
}) => {
  const tech = new Set(PROJECTS_DATA.flatMap((p) => p.tags));
  return (
    <section id="dashboard" className="relative z-10 px-4 sm:px-8 md:px-12 lg:px-16 py-16 max-w-[1440px] mx-auto">
      <div className="flex items-end justify-between gap-4 mb-8 flex-wrap">
        <div>
          <p className="text-[10px] font-mono-custom tracking-[0.25em] text-[#4cd9e0]">PARUL_GUPTA OS</p>
          <h2 className="text-3xl font-bodoni text-white mt-1">Engineering profile</h2>
        </div>
        <span className="text-xs font-mono-custom text-[#4cd9e0] border border-[#4cd9e0]/30 px-3 py-1 rounded-full">
          ● {SYSTEM_METRICS.status}
        </span>
      </div>
      <div className="grid lg:grid-cols-[220px_1fr] gap-4">
        <aside className="glass-panel rounded-2xl p-4 space-y-2 h-fit">
          {[
            ['SYSTEM', 'dashboard'],
            ['PROJECTS', 'projects'],
            ['AI', 'ai'],
            ['SKILLS', 'capabilities'],
            ['GRAPH', 'skill-graph'],
          ].map(([label, id]) => (
            <button
              key={label}
              type="button"
              onClick={() => {
                playCyberClick();
                if (id === 'ai') onOpenAI();
                else onNavigate(id);
              }}
              className="w-full text-left text-xs font-mono-custom tracking-wider px-3 py-2 rounded-lg hover:bg-[#4cd9e0]/10 text-[#c5c6ca] hover:text-[#4cd9e0]"
            >
              {label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              playCyberClick();
              onOpenRecruiter();
            }}
            className="w-full text-left text-xs font-mono-custom tracking-wider px-3 py-2 rounded-lg border border-[#4cd9e0]/25 text-[#4cd9e0]"
          >
            RECRUITER
          </button>
        </aside>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="glass-panel rounded-2xl p-5 sm:col-span-2">
            <p className="text-[10px] font-mono-custom text-[#8f9195]">IDENTITY</p>
            <h3 className="text-xl text-white mt-1">{PROFILE.name}</h3>
            <p className="text-sm text-[#80d4d8]">{PROFILE.role}</p>
            <p className="text-xs text-[#c5c6ca] mt-3 leading-relaxed">
              Full-stack and systems work across realtime platforms, queues, RAG, and product UIs — not only CRUD demos.
            </p>
          </div>
          <div className="glass-panel rounded-2xl p-5">
            <p className="text-[10px] font-mono-custom text-[#8f9195]">MODULES</p>
            <p className="text-3xl font-bodoni text-[#4cd9e0] mt-2">{PROJECTS_DATA.length}</p>
            <p className="text-xs text-[#c5c6ca]">Featured projects</p>
          </div>
          <div className="glass-panel rounded-2xl p-5">
            <p className="text-[10px] font-mono-custom text-[#8f9195]">TECHNOLOGIES</p>
            <p className="text-3xl font-bodoni text-[#4cd9e0] mt-2">{tech.size}+</p>
            <p className="text-xs text-[#c5c6ca]">Distinct tags in graph</p>
          </div>
          <div className="glass-panel rounded-2xl p-5">
            <p className="text-[10px] font-mono-custom text-[#8f9195]">CAPABILITIES</p>
            <p className="text-3xl font-bodoni text-[#4cd9e0] mt-2">{CAPABILITIES_DATA.length}</p>
            <p className="text-xs text-[#c5c6ca]">Matrix rows</p>
          </div>
          <div className="glass-panel rounded-2xl p-5 sm:col-span-2">
            <p className="text-[10px] font-mono-custom text-[#8f9195] mb-3">QUICK MODULES</p>
            <div className="flex flex-wrap gap-2">
              {PROJECTS_DATA.slice(0, 4).map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    playCyberClick();
                    onSelectProject(p);
                  }}
                  className="text-xs px-3 py-1.5 rounded-lg border border-white/10 hover:border-[#4cd9e0]/40 text-[#dce3ed]"
                >
                  {p.title}
                </button>
              ))}
            </div>
          </div>
          <div className="glass-panel rounded-2xl p-5">
            <p className="text-[10px] font-mono-custom text-[#8f9195]">AVAILABILITY</p>
            <p className="text-sm text-[#4cd9e0] mt-2 font-mono-custom">OPEN TO ROLES</p>
            <p className="text-xs text-[#c5c6ca] mt-1">Internships · full-stack · backend · AI product</p>
          </div>
        </div>
      </div>
    </section>
  );
};
