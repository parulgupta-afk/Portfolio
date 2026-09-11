import React from 'react';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { playCyberClick } from '../utils/audioSynth';
import { PROJECTS_DATA, PROFILE } from '../data/portfolioData';

interface HeroSectionProps {
  onInitSequence: () => void;
  onExploreProjects: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreProjects }) => {
  return (
    <header
      id="hero"
      className="relative min-h-[88vh] flex items-center pt-28 pb-16 px-4 sm:px-8 md:px-12 lg:px-16 border-b border-white/10"
    >
      <div className="relative z-10 w-full max-w-5xl mx-auto">
        <p className="text-sm sm:text-base text-[#4cd9e0] font-medium tracking-wide mb-4">
          Open to roles · Full Stack · Backend · AI product
        </p>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold text-white tracking-tight leading-[1.05]">
          {PROFILE.name}
        </h1>

        <p className="mt-4 text-xl sm:text-2xl text-[#a8b3c4] font-normal max-w-2xl">
          {PROFILE.role}
        </p>

        <p className="mt-6 text-base sm:text-lg text-[#9aa3b2] max-w-2xl leading-relaxed">
          I build end-to-end products — React frontends, Node APIs, realtime systems, queues, and AI features.
          Featured work includes incident management, emergency triage, and flight search.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => {
              playCyberClick();
              onExploreProjects();
            }}
            className="inline-flex items-center gap-2 bg-[#4cd9e0] text-[#062a2c] font-semibold text-sm px-6 py-3 rounded-lg hover:bg-[#6ee4ea] transition-colors"
          >
            View projects
            <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href={`mailto:${PROFILE.email}`}
            className="inline-flex items-center gap-2 border border-white/20 text-[#e8eef6] text-sm px-6 py-3 rounded-lg hover:border-[#4cd9e0]/50 hover:text-white transition-colors"
          >
            <Mail className="w-4 h-4" />
            Contact
          </a>
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-white/15 text-[#a8b3c4] text-sm px-4 py-3 rounded-lg hover:text-white transition-colors"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-white/15 text-[#a8b3c4] text-sm px-4 py-3 rounded-lg hover:text-white transition-colors"
          >
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </a>
        </div>

        <div className="mt-12 flex flex-wrap gap-6 text-sm text-[#8b95a5]">
          <span>
            <strong className="text-[#dce3ed] font-semibold">{PROJECTS_DATA.length}</strong> projects
          </span>
          <span>
            <strong className="text-[#dce3ed] font-semibold">1000+</strong> DSA problems
          </span>
          <span>
            <strong className="text-[#dce3ed] font-semibold">CGPA 8.90</strong>
          </span>
        </div>
      </div>
    </header>
  );
};
