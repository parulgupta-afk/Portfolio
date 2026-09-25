import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { ProjectItem } from '../types';
import { PROJECTS_DATA, OTHER_REPOS } from '../data/portfolioData';
import { playCyberClick } from '../utils/audioSynth';

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

const FLAGSHIP = ['priceloop', 'codeforge', 'pulseops'] as const;
const APPLIED = ['skycall', 'nutrivibe', 'verge'] as const;

const ProjectCard: React.FC<{
  project: ProjectItem;
  onSelect: (p: ProjectItem) => void;
  featured?: boolean;
}> = ({ project, onSelect, featured }) => {
  return (
    <article
      className={`flex flex-col text-left rounded-xl border border-white/10 bg-white/[0.02] hover:border-[#34d399]/35 transition-colors ${
        featured ? 'p-6 sm:p-7' : 'p-5'
      }`}
    >
      <button
        type="button"
        onClick={() => {
          playCyberClick(700);
          onSelect(project);
        }}
        className="text-left w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#34d399] rounded"
      >
        <div className="flex items-start justify-between gap-2 mb-3">
          <span className="font-code-md text-[10px] text-[#34d399] tracking-widest">{project.modNumber}</span>
          <span className="font-code-md text-[10px] text-[#6b7380] uppercase tracking-wide">{project.category}</span>
        </div>
        <h3 className={`font-semibold text-white mb-1 ${featured ? 'text-xl sm:text-2xl' : 'text-lg'}`}>
          {project.title}
        </h3>
        <p className="text-sm text-[#a8b3c4] leading-relaxed mb-4 line-clamp-2">{project.tagline}</p>
        <div className="flex flex-wrap gap-1.5 mb-1">
          {project.tags.slice(0, featured ? 6 : 4).map((tag) => (
            <span key={tag} className="text-[10px] px-2 py-0.5 rounded border border-white/10 text-[#6b7380]">
              {tag}
            </span>
          ))}
        </div>
      </button>

      <div className="mt-auto pt-4 flex flex-wrap items-center gap-2 border-t border-white/10">
        {project.liveDemoUrl ? (
          <a
            href={project.liveDemoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.stopPropagation();
              playCyberClick(650);
            }}
            className="inline-flex items-center gap-1.5 text-[11px] font-code-md px-2.5 py-1.5 rounded border border-[#34d399]/45 text-[#34d399] hover:bg-[#34d399]/10 transition-colors"
          >
            Live Demo
            <ExternalLink className="w-3 h-3" aria-hidden />
          </a>
        ) : null}
        {project.githubUrl ? (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.stopPropagation();
              playCyberClick(650);
            }}
            className="inline-flex items-center gap-1.5 text-[11px] font-code-md px-2.5 py-1.5 rounded border border-white/15 text-[#a8b3c4] hover:border-white/30 hover:text-white transition-colors"
          >
            <Github className="w-3 h-3" aria-hidden />
            GitHub
          </a>
        ) : (
          <span className="text-[11px] font-code-md text-[#6b7380]">Source pending</span>
        )}
        <button
          type="button"
          onClick={() => {
            playCyberClick(700);
            onSelect(project);
          }}
          className="text-[11px] font-code-md text-[#6b7380] hover:text-[#34d399] ml-auto transition-colors"
        >
          Architecture →
        </button>
      </div>
    </article>
  );
};

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const byId = Object.fromEntries(PROJECTS_DATA.map((p) => [p.id, p]));
  const flagship = FLAGSHIP.map((id) => byId[id]).filter(Boolean);
  const applied = APPLIED.map((id) => byId[id]).filter(Boolean);
  const experimental = PROJECTS_DATA.filter(
    (p) => !FLAGSHIP.includes(p.id as (typeof FLAGSHIP)[number]) && !APPLIED.includes(p.id as (typeof APPLIED)[number])
  );

  return (
    <section id="projects" className="py-16 sm:py-24 border-b border-white/5">
      <div className="px-4 sm:px-8 md:px-12 lg:px-16 max-w-6xl mx-auto">
        <p className="font-code-md text-[10px] tracking-[0.25em] text-[#34d399] mb-2 uppercase">Projects</p>
        <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-2 tracking-tight">Engineering systems</h2>
        <p className="text-sm text-[#8b95a5] mb-10 max-w-2xl leading-relaxed">
          Flagship systems first. Open Live Demo when deployed, or GitHub to inspect the implementation.
        </p>

        <h3 className="font-code-md text-xs tracking-[0.2em] text-[#6b7380] mb-4 uppercase">Flagship systems</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {flagship.map((p) => (
            <ProjectCard key={p.id} project={p} onSelect={onSelectProject} featured />
          ))}
        </div>

        <h3 className="font-code-md text-xs tracking-[0.2em] text-[#6b7380] mb-4 uppercase">Applied products</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {applied.map((p) => (
            <ProjectCard key={p.id} project={p} onSelect={onSelectProject} />
          ))}
        </div>

        {experimental.length > 0 && (
          <>
            <h3 className="font-code-md text-xs tracking-[0.2em] text-[#6b7380] mb-4 uppercase">Experimental</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
              {experimental.map((p) => (
                <ProjectCard key={p.id} project={p} onSelect={onSelectProject} />
              ))}
            </div>
          </>
        )}

        <div className="pt-8 border-t border-white/10">
          <h3 className="font-code-md text-xs uppercase tracking-widest text-[#6b7380] mb-4">Also on GitHub</h3>
          <div className="flex flex-wrap gap-2">
            {OTHER_REPOS.map((repo) => (
              <a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playCyberClick(600)}
                className="font-code-md text-xs px-3 py-1.5 rounded bg-white/5 border border-white/10 text-[#a8b3c4] hover:border-[#34d399]/40 hover:text-[#34d399] transition-colors inline-flex items-center gap-1.5"
              >
                {repo.name}
                <ExternalLink className="w-3 h-3" aria-hidden />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
