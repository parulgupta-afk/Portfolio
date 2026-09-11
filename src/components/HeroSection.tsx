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
        <p className="text-sm text-[#4cd9e0] font-medium mb-3">
          {PROFILE.availability}
        </p>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold text-white tracking-tight leading-[1.05]">
          {PROFILE.name}
        </h1>

        <p className="mt-3 text-xl sm:text-2xl text-[#c5cdd8] font-medium">
          {PROFILE.role}
        </p>

        <p className="mt-2 text-base text-[#8b95a5]">
          Building intelligent digital systems · {PROFILE.location}
        </p>

        <p className="mt-6 text-base sm:text-lg text-[#a8b3c4] max-w-2xl leading-relaxed">
          {PROFILE.tagline}
        </p>

        <p className="mt-4 text-sm text-[#9aa3b2] max-w-2xl leading-relaxed">
          Flagship work spans price intelligence (Priceloop), autonomous code agents (CodeForge),
          incident operations (PulseOps), and AI-assisted triage (Pocket-Triage) — with emphasis on
          APIs, data, queues, sandboxes, and deployment discipline.
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
            Explore work
            <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href="#resume"
            className="inline-flex items-center gap-2 border border-white/25 text-white text-sm px-6 py-3 rounded-lg hover:border-[#4cd9e0]/50 transition-colors"
          >
            View resume
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
            href={`mailto:${PROFILE.email}`}
            className="inline-flex items-center gap-2 border border-white/15 text-[#a8b3c4] text-sm px-4 py-3 rounded-lg hover:text-white transition-colors"
          >
            <Mail className="w-4 h-4" />
            Contact
          </a>
        </div>

        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2 text-sm text-[#8b95a5]">
          <span>
            <strong className="text-white font-semibold">{PROJECTS_DATA.length}</strong> systems in portfolio
          </span>
          <span>
            <strong className="text-white font-semibold">{PROFILE.dsa}</strong>
          </span>
          <span className="text-[#a8b3c4]">{PROFILE.education}</span>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {PROFILE.focus.map((f) => (
            <span
              key={f}
              className="text-xs px-3 py-1 rounded-full border border-white/15 text-[#c5cdd8]"
            >
              {f}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
};
