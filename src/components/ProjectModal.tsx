import React, { useEffect } from 'react';
import { X, ArrowUpRight } from 'lucide-react';
import { ProjectItem } from '../types';
import { playCyberClick } from '../utils/audioSynth';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prev;
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      id="project-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          playCyberClick(600);
          onClose();
        }
      }}
      className="fixed inset-0 z-[80] bg-[#030405]/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      <div className="glass-panel w-full max-w-3xl rounded-2xl border border-white/15 overflow-hidden shadow-[0_0_40px_rgba(52,211,153,0.12)] flex flex-col my-auto max-h-[92vh]">
        <div className="bg-[#0f1314] px-5 sm:px-6 py-4 border-b border-white/10 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="font-code-md text-[10px] uppercase tracking-widest text-[#34d399] mb-1">
              {project.modNumber} · {project.category}
            </p>
            <h2 id="project-modal-title" className="font-bodoni text-xl sm:text-2xl font-bold text-white truncate">
              {project.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => {
              playCyberClick(500);
              onClose();
            }}
            className="p-1.5 rounded-lg border border-white/10 hover:border-[#34d399]/40 text-[#c5c6ca] hover:text-[#34d399] transition-colors shrink-0"
            aria-label="Close project details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-5 sm:p-6 space-y-8">
          <section>
            <h3 className="font-code-md text-[10px] uppercase tracking-widest text-[#6b7380] mb-2">Overview</h3>
            <p className="text-sm text-[#34d399] mb-2">{project.tagline}</p>
            <p className="text-sm text-[#c5c6ca] leading-relaxed">{project.fullOverview || project.description}</p>
          </section>

          {project.architectureDetails?.length > 0 && (
            <section>
              <h3 className="font-code-md text-[10px] uppercase tracking-widest text-[#6b7380] mb-3">Architecture</h3>
              <ul className="space-y-2">
                {project.architectureDetails.map((line, i) => (
                  <li key={i} className="text-sm text-[#c5c6ca] leading-relaxed flex gap-2">
                    <span className="text-[#34d399] font-code-md text-[10px] mt-1 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section>
            <h3 className="font-code-md text-[10px] uppercase tracking-widest text-[#6b7380] mb-3">Characteristics</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(
                [
                  ['Architecture', project.specs.latency],
                  ['Runtime', project.specs.concurrency],
                  ['Availability', project.specs.availability],
                  ['Auth / security', project.specs.encryption],
                ] as const
              ).map(([label, value]) => (
                <div key={label} className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
                  <p className="font-code-md text-[10px] uppercase tracking-widest text-[#6b7380] mb-1">{label}</p>
                  <p className="text-sm text-[#dce3ed]">{value}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="font-code-md text-[10px] uppercase tracking-widest text-[#6b7380] mb-3">Tech stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-code-md text-xs px-3 py-1 rounded bg-white/5 border border-white/10 text-[#dce3ed]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>
        </div>

        <div className="bg-[#0f1314] px-5 sm:px-6 py-4 border-t border-white/10 flex flex-wrap justify-end items-center gap-2">
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playCyberClick(650)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded bg-white/5 hover:bg-white/10 text-[#dce3ed] font-code-md text-xs uppercase tracking-wider transition-colors border border-white/10"
            >
              GitHub
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden />
            </a>
          ) : null}
          {project.liveDemoUrl ? (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playCyberClick(650)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded bg-[#34d399]/10 hover:bg-[#34d399]/20 text-[#34d399] font-code-md text-xs uppercase tracking-wider transition-colors border border-[#34d399]/30"
            >
              Live Demo
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden />
            </a>
          ) : null}
          <button
            type="button"
            onClick={() => {
              playCyberClick(500);
              onClose();
            }}
            className="px-4 py-2 rounded bg-white/5 hover:bg-white/10 text-white font-code-md text-xs uppercase tracking-wider transition-colors border border-white/10"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
