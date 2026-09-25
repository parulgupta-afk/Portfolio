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
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      id="project-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          playCyberClick(600);
          onClose();
        }
      }}
      className="fixed inset-0 z-[80] bg-[#030405]/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      <div
        id="project-modal-panel"
        className="glass-panel w-full max-w-4xl rounded-2xl border border-white/15 overflow-hidden shadow-[0_0_50px_rgba(52,211,153,0.15)] flex flex-col my-auto max-h-[92vh]"
      >
        {/* Modal Header */}
        <div className="bg-[#0f1314] px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#34d399] animate-pulse" />
            <span className="font-code-md text-xs uppercase tracking-widest text-[#34d399]">
              {project.modNumber} // {project.category}
            </span>
            <span className="text-white/20">|</span>
            <h3 className="font-bodoni text-xl font-bold text-[#dce3ed]">{project.title}</h3>
          </div>
          <button
            id="btn-close-project-modal"
            onClick={() => {
              playCyberClick(500);
              onClose();
            }}
            className="p-1.5 rounded-lg border border-white/10 hover:border-[#34d399]/40 text-[#c5c6ca] hover:text-[#34d399] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Banner Image Preview */}
          <div className="relative h-64 sm:h-72 w-full rounded-xl overflow-hidden border border-white/10 bg-[#0a0d0f] group">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030405] via-transparent to-transparent opacity-80" />
            <div className="scan-line" />

            {/* Float Overlay Badge */}
            <div className="absolute top-4 right-4 flex gap-2">
              <span className="font-code-md text-[11px] bg-[#030405]/90 border border-[#34d399]/40 text-[#34d399] px-3 py-1 rounded">
                {project.category}
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4">
              <h2 className="font-bodoni text-2xl sm:text-3xl text-white font-bold mb-1">{project.title}</h2>
              <p className="font-body-sm text-[#38bdf8] text-sm">{project.tagline}</p>
            </div>
          </div>

          {/* Overview */}
          <div className="space-y-6">
            <p className="font-body-lg text-[#c5c6ca] text-base leading-relaxed">
              {project.fullOverview}
            </p>

            <div>
              <h4 className="font-code-md text-xs uppercase tracking-widest text-[#34d399] mb-3 font-bold">
                // KEY ARCHITECTURAL PILLARS
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.architectureDetails.map((detail, idx) => (
                  <div
                    key={idx}
                    className="glass-panel p-4 rounded-lg border-white/5 flex items-start gap-3"
                  >
                    <span className="text-[#34d399] font-code-md text-sm mt-0.5">&gt;</span>
                    <span className="font-body-sm text-[#dce3ed] text-sm leading-snug">{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-code-md text-xs uppercase tracking-widest text-[#38bdf8] mb-3">
                // TECH STACK
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="font-code-md text-xs px-3 py-1 rounded bg-white/5 border border-white/10 text-[#dce3ed] hover:border-[#34d399]/40 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-[#0f1314] px-6 py-4 border-t border-white/10 flex flex-wrap justify-end items-center gap-3">
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playCyberClick(650)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded bg-white/5 hover:bg-white/10 text-[#dce3ed] font-code-md text-xs uppercase tracking-wider transition-colors border border-white/10"
              >
                <span>Source Code</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playCyberClick(650)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded bg-[#34d399]/10 hover:bg-[#34d399]/20 text-[#34d399] font-code-md text-xs uppercase tracking-wider transition-colors border border-[#34d399]/30"
              >
                <span>Live Demo</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              onClick={() => {
                playCyberClick(500);
                onClose();
              }}
              className="px-5 py-2 rounded bg-white/5 hover:bg-white/10 text-white font-code-md text-xs uppercase tracking-wider transition-colors border border-white/10"
            >
              Close Inspector
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
