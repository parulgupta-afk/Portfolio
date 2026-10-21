import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { ProjectItem } from '../types';
import { PROJECTS_DATA, OTHER_REPOS } from '../data/portfolioData';
import { playCyberClick } from '../utils/audioSynth';

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

const FIRST_ROW_IDS = ['priceloop', 'codeforge', 'pulseops', 'skycall'] as const;
const SECOND_ROW_IDS = ['nutrivibe', 'verge', 'quilio'] as const;
const FLAGSHIP_IDS = new Set(['priceloop', 'codeforge', 'pulseops']);

const ProjectCard: React.FC<{
  project: ProjectItem;
  onSelect: (project: ProjectItem) => void;
}> = ({ project, onSelect }) => {
  const featured = FLAGSHIP_IDS.has(project.id);

  return (
    <article className="project-marquee-card flex flex-col text-left rounded-xl border border-white/10 bg-white/[0.025] hover:border-[#34d399]/40 transition-colors">
      <button
        type="button"
        onClick={() => {
          playCyberClick(700);
          onSelect(project);
        }}
        aria-label={`View ${project.title} project architecture`}
        className="text-left w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#34d399] rounded"
      >
        <div className="flex items-start justify-between gap-3 mb-3">
          <span className="font-code-md text-[10px] text-[#34d399] tracking-widest">
            {project.modNumber}
          </span>
          <span className="font-code-md text-[10px] text-[#6b7380] uppercase tracking-wide text-right">
            {project.category}
          </span>
        </div>

        <div className="flex items-center gap-2 mb-1.5">
          <h3 className="font-semibold text-white text-xl tracking-tight">{project.title}</h3>
          {featured && (
            <span className="font-code-md text-[9px] uppercase tracking-wider text-[#34d399] border border-[#34d399]/25 rounded px-1.5 py-0.5">
              Flagship
            </span>
          )}
        </div>

        <p className="text-sm text-[#a8b3c4] leading-relaxed mb-4 line-clamp-2">
          {project.tagline}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.tags.slice(0, 5).map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-1 rounded border border-white/10 text-[#8793a5] bg-white/[0.025]"
            >
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
            onClick={() => playCyberClick(650)}
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
            onClick={() => playCyberClick(650)}
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

interface MarqueeRowProps {
  projects: ProjectItem[];
  direction: 'left' | 'right';
  label: string;
  onSelectProject: (project: ProjectItem) => void;
}

const MarqueeRow: React.FC<MarqueeRowProps> = ({
  projects,
  direction,
  label,
  onSelectProject,
}) => (
  <div className="project-marquee-window" aria-label={label}>
    <div className={`project-marquee-track project-marquee-track--${direction}`}>
      {[0, 1].map((copy) => (
        <div
          className="project-marquee-group"
          key={`${direction}-copy-${copy}`}
          aria-hidden={copy === 1 ? true : undefined}
        >
          {projects.map((project) => (
            <ProjectCard
              key={`${project.id}-${copy}`}
              project={project}
              onSelect={onSelectProject}
            />
          ))}
        </div>
      ))}
    </div>
  </div>
);

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const byId = Object.fromEntries(PROJECTS_DATA.map((project) => [project.id, project]));
  const firstRow = FIRST_ROW_IDS.map((id) => byId[id]).filter(Boolean) as ProjectItem[];
  const secondRow = SECOND_ROW_IDS.map((id) => byId[id]).filter(Boolean) as ProjectItem[];

  return (
    <section id="projects" className="py-16 sm:py-24 border-b border-white/5">
      <div className="max-w-6xl mx-auto mb-9 px-4 sm:px-8 md:px-12 lg:px-16">
        <p className="font-code-md text-[10px] tracking-[0.25em] text-[#34d399] mb-2 uppercase">
          Selected work / 07 systems
        </p>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-2 tracking-tight">
              Engineering systems
            </h2>
            <p className="text-sm text-[#8b95a5] max-w-2xl leading-relaxed">
              A moving showcase of full-stack products, real-time systems, and AI-powered tools.
              Select any card to inspect its architecture.
            </p>
          </div>
          <span className="font-code-md text-[10px] uppercase tracking-widest text-[#6b7380] shrink-0">
            Two tracks · Opposite directions
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <MarqueeRow
          projects={firstRow}
          direction="left"
          label="Featured projects scrolling left"
          onSelectProject={onSelectProject}
        />
        <MarqueeRow
          projects={secondRow}
          direction="right"
          label="Additional projects scrolling right"
          onSelectProject={onSelectProject}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16 mt-10">
        <div className="pt-7 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <h3 className="font-code-md text-xs uppercase tracking-widest text-[#6b7380]">
              Also on GitHub
            </h3>
            <span className="font-code-md text-[10px] text-[#505b6b]">
              Open-source experiments & builds
            </span>
          </div>
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
