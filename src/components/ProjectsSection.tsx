import React, { useRef } from 'react';
import { ChevronRight, ChevronLeft, ArrowRight, ExternalLink, Activity } from 'lucide-react';
import { ProjectItem } from '../types';
import { PROJECTS_DATA } from '../data/portfolioData';
import { playCyberClick } from '../utils/audioSynth';

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    playCyberClick(700);
    if (!scrollContainerRef.current) return;
    const offset = direction === 'left' ? -500 : 500;
    scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  return (
    <section id="projects" className="py-20 sm:py-28 border-b border-white/5 relative">
      {/* Header Container */}
      <div className="px-4 sm:px-8 md:px-12 lg:px-16 max-w-[1440px] mx-auto mb-12 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/10 pb-8 gap-4">
        <div>
          <h2 className="font-bodoni text-4xl sm:text-5xl text-[#dce3ed] mb-2 font-bold tracking-tight">
            System Modules
          </h2>
          <p className="font-code-md text-xs uppercase tracking-widest text-[#4cd9e0]/80 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#4cd9e0] rounded-full animate-ping" />
            v2.0 // DEPLOYMENTS_ACTIVE
          </p>
        </div>

        {/* Scroll Nav Controls & Indicator */}
        <div className="flex items-center gap-4">
          <div className="flex gap-2 items-center mr-4">
            <button
              onClick={() => scroll('left')}
              title="Scroll Left"
              className="w-9 h-9 rounded-lg border border-white/10 hover:border-[#4cd9e0]/40 flex items-center justify-center text-[#c5c6ca] hover:text-[#4cd9e0] transition-colors bg-white/[0.02]"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              title="Scroll Right"
              className="w-9 h-9 rounded-lg border border-white/10 hover:border-[#4cd9e0]/40 flex items-center justify-center text-[#c5c6ca] hover:text-[#4cd9e0] transition-colors bg-white/[0.02]"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="hidden md:flex gap-2">
            <span className="w-12 h-1 bg-white/10 rounded-full" />
            <span className="w-4 h-1 bg-[#4cd9e0]/50 rounded-full" />
            <span className="w-2 h-1 bg-[#4cd9e0] rounded-full shadow-[0_0_6px_rgba(76,217,224,0.8)]" />
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Carousel */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-8 sm:gap-10 px-4 sm:px-8 md:px-12 lg:px-16 pb-8 hide-scrollbar snap-x snap-mandatory cursor-grab active:cursor-grabbing"
      >
        {PROJECTS_DATA.map((project) => {
          const isUrgent = project.statusVariant === 'urgent';
          const isOrganic = project.statusVariant === 'organic';

          return (
            <article
              key={project.id}
              id={`project-card-${project.id}`}
              onClick={() => {
                playCyberClick(900);
                onSelectProject(project);
              }}
              className={`snap-center shrink-0 w-[86vw] sm:w-[580px] md:w-[680px] lg:w-[700px] glass-panel p-1 group hover:border-[#4cd9e0]/40 transition-all duration-500 relative flex flex-col border-white/10 rounded-xl overflow-hidden cursor-pointer ${
                isUrgent ? 'hover:border-[#ffb4ab]/50' : isOrganic ? 'hover:border-[#80d4d8]/50' : ''
              }`}
            >
              {/* Top-Right Health and Execution Stats */}
              <div className="absolute top-4 right-4 flex flex-col gap-1 z-20 items-end">
                <span
                  className={`font-code-md text-[10px] bg-[#05090c]/90 px-2.5 py-0.5 border rounded ${
                    isUrgent
                      ? 'text-[#ffb4ab] border-[#ffb4ab]/30'
                      : isOrganic
                      ? 'text-[#80d4d8] border-[#80d4d8]/30'
                      : 'text-[#4cd9e0] border-[#4cd9e0]/30'
                  }`}
                >
                  HEALTH: {project.metrics.health}
                </span>
                <span className="font-code-md text-[10px] text-[#c5c6ca]/70 bg-[#05090c]/90 px-2.5 py-0.5 border border-white/10 rounded">
                  EXEC: {project.metrics.exec}
                </span>
              </div>

              {/* Image & Scanner Stage */}
              <div className="h-[260px] sm:h-[300px] relative overflow-hidden bg-[#05090c]">
                <div className="scan-line hidden group-hover:block" />
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700 opacity-60 mix-blend-luminosity group-hover:mix-blend-normal group-hover:opacity-90"
                  style={{ backgroundImage: `url('${project.imageUrl}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05090c]/90 via-transparent to-transparent" />

                {/* Module Tag */}
                <div className="absolute top-4 left-4 font-code-md text-[11px] bg-[#05090c]/95 px-3 py-1 text-[#dce3ed] border border-white/15 uppercase tracking-widest flex items-center gap-2 rounded">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isUrgent
                        ? 'bg-[#ffb4ab] animate-pulse'
                        : isOrganic
                        ? 'bg-[#006f73]'
                        : 'bg-[#4cd9e0]'
                    }`}
                  />
                  {project.modNumber} // {project.category}
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 sm:p-8 flex flex-col flex-grow bg-[#05090c]/60 border-t border-white/5">
                <h3 className="font-bodoni text-2xl sm:text-3xl text-[#dce3ed] mb-2 font-bold uppercase tracking-wide group-hover:text-[#4cd9e0] transition-colors">
                  {project.title}
                </h3>
                <p className="font-body-sm text-sm sm:text-base text-[#c5c6ca] mb-6 line-clamp-3 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                  {project.tags.slice(0, 4).map((tag, idx) => (
                    <span
                      key={idx}
                      className="font-code-md text-[11px] bg-white/5 border border-white/10 px-2.5 py-1 text-[#c5c6ca] uppercase rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Link Footer */}
                <div className="inline-flex items-center justify-between w-full border-t border-white/10 pt-4 text-[#4cd9e0]/80 group-hover:text-[#4cd9e0] transition-colors group/btn btn-precision">
                  <span className="font-code-md text-xs uppercase tracking-widest font-semibold flex items-center gap-2">
                    <span>Execute_View</span>
                    <span className="text-[10px] text-[#c5c6ca]/50 font-normal">[ Click to Inspect ]</span>
                  </span>
                  <ChevronRight className="w-4 h-4 transform group-hover/btn:translate-x-1.5 transition-transform text-[#4cd9e0]" />
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
