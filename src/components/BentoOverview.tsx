import React from 'react';
import { ProjectItem } from '../types';
import { PROJECTS_DATA, PROFILE } from '../data/portfolioData';
import { ArrowUpRight } from 'lucide-react';
import { playCyberClick } from '../utils/audioSynth';

interface BentoOverviewProps {
  onSelectProject: (project: ProjectItem) => void;
  onNavigateSection: (sectionId: string) => void;
}

const getProject = (id: string): ProjectItem | undefined =>
  PROJECTS_DATA.find((project) => project.id === id);

const liveDemoCount = PROJECTS_DATA.filter((p) => Boolean(p.liveDemoUrl)).length;
const flagshipIds = ['priceloop', 'codeforge', 'pulseops'] as const;

export const BentoOverview: React.FC<BentoOverviewProps> = ({ onSelectProject, onNavigateSection }) => {
  const featured = getProject('codeforge');
  const p0 = getProject('priceloop');
  const p1 = getProject('skycall');
  const p2 = getProject('pulseops');

  return (
    <div className="py-24 sm:py-28 px-4 sm:px-8 md:px-12 lg:px-16 max-w-[1440px] mx-auto">
      <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/10 pb-6 gap-4">
        <div>
          <span className="font-code-md text-xs text-[#34d399] uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#34d399]" aria-hidden />
            Compact overview
          </span>
          <h2 className="font-bodoni text-3xl sm:text-5xl text-[#dce3ed] font-bold mt-1">
            System overview
          </h2>
        </div>
        <div className="flex flex-wrap gap-3 items-center">
          <button
            type="button"
            onClick={() => {
              playCyberClick(700);
              onNavigateSection('projects');
            }}
            className="font-code-md text-xs uppercase tracking-widest text-[#34d399] border border-[#34d399]/40 px-3 py-1.5 rounded hover:bg-[#34d399]/10"
          >
            Full projects →
          </button>
          <span className="font-code-md text-xs text-[#c5c6ca]/60">
            {PROJECTS_DATA.length} projects · {flagshipIds.length} flagship · {liveDemoCount} live demos
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[min(240px,auto)]">
        {featured ? (
          <button
            type="button"
            onClick={() => {
              playCyberClick(850);
              onSelectProject(featured);
            }}
            className="md:col-span-2 lg:col-span-2 md:row-span-2 glass-panel rounded-2xl p-6 sm:p-8 relative overflow-hidden border border-white/15 group cursor-pointer text-left flex flex-col justify-between min-h-[280px]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a0d0f] via-[#0f1a14] to-[#030405]" />
            <div className="relative z-10 flex justify-between items-start">
              <span className="font-code-md text-xs bg-[#030405]/90 border border-[#34d399]/40 text-[#34d399] px-3 py-1 rounded">
                Featured · {featured.modNumber}
              </span>
              <ArrowUpRight className="w-4 h-4 text-[#c5c6ca] group-hover:text-[#34d399]" aria-hidden />
            </div>
            <div className="relative z-10 mt-auto">
              <h3 className="font-bodoni text-3xl sm:text-4xl text-white font-bold mb-2 group-hover:text-[#34d399] transition-colors">
                {featured.title}
              </h3>
              <p className="font-body-sm text-sm text-[#c5c6ca] line-clamp-3 mb-4">{featured.tagline}</p>
              <div className="flex flex-wrap gap-1.5">
                {featured.tags.slice(0, 5).map((tag) => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 rounded border border-white/10 text-[#6b7380]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </button>
        ) : null}

        {/* Truthful portfolio meta — not fake telemetry */}
        <div className="glass-panel rounded-2xl p-6 border border-white/10 flex flex-col justify-between">
          <div>
            <p className="font-code-md text-[10px] uppercase tracking-widest text-[#34d399] mb-2">Portfolio</p>
            <p className="font-bodoni text-2xl text-white font-bold leading-tight">{PROFILE.role.split('·')[0].trim()}</p>
          </div>
          <div className="font-code-md text-[11px] text-[#c5c6ca] space-y-1 border-t border-white/10 pt-3">
            <div className="flex justify-between gap-2">
              <span>Projects</span>
              <span className="text-[#dce3ed]">{PROJECTS_DATA.length}</span>
            </div>
            <div className="flex justify-between gap-2">
              <span>Flagship</span>
              <span className="text-[#dce3ed]">{flagshipIds.length}</span>
            </div>
            <div className="flex justify-between gap-2">
              <span>Live demos</span>
              <span className="text-[#dce3ed]">{liveDemoCount}</span>
            </div>
            <div className="flex justify-between gap-2">
              <span>Stack</span>
              <span className="text-[#dce3ed]">React · TS · Vite</span>
            </div>
          </div>
        </div>

        {[p0, p1, p2].filter(Boolean).map((project) => (
          <button
            key={project!.id}
            type="button"
            onClick={() => {
              playCyberClick(800);
              onSelectProject(project!);
            }}
            className="glass-panel rounded-2xl p-6 border border-white/10 group cursor-pointer text-left flex flex-col justify-between min-h-[200px]"
          >
            <div className="flex justify-between items-start gap-2">
              <span className="font-code-md text-[10px] text-[#34d399] bg-[#34d399]/10 border border-[#34d399]/20 px-2 py-0.5 rounded">
                {project!.modNumber}
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#c5c6ca] group-hover:text-[#34d399] shrink-0" aria-hidden />
            </div>
            <div>
              <h4 className="font-bodoni text-xl text-white font-bold group-hover:text-[#34d399] transition-colors">
                {project!.title}
              </h4>
              <p className="font-body-sm text-xs sm:text-sm text-[#c5c6ca] mt-1 line-clamp-2">{project!.tagline}</p>
            </div>
            <div className="font-code-md text-[10px] text-[#38bdf8]">{project!.category}</div>
          </button>
        ))}
      </div>
    </div>
  );
};
