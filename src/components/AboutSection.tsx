import React from 'react';
import { PROFILE } from '../data/portfolioData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 sm:py-24 border-b border-white/10">
      <div className="px-4 sm:px-8 md:px-12 lg:px-16 max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-3">About</h2>
        <p className="text-[#4cd9e0] text-sm mb-8">
          {PROFILE.role} · Guru Nanak Dev University
        </p>
        <div className="space-y-5 text-base sm:text-lg text-[#b4bcc8] leading-relaxed max-w-3xl">
          <p>
            I am a full stack developer who ships complete products — UI, API, data, and AI where it helps.
            I care about clear architecture and interfaces people can actually use.
          </p>
          <p>
            Recent systems work includes <span className="text-white">PulseOps</span> (on-call / incidents with
            queues and realtime updates) and <span className="text-white">Pocket-Triage</span> (AI-assisted
            emergency guidance with retrieval-grounded answers).
          </p>
          <p>
            I have solved 1000+ DSA problems and prefer building features end to end rather than only demos.
          </p>
        </div>
        <div className="mt-10 flex flex-wrap gap-3 text-sm">
          <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="text-[#4cd9e0] hover:underline">
            GitHub
          </a>
          <span className="text-white/20">·</span>
          <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#4cd9e0] hover:underline">
            LinkedIn
          </a>
          <span className="text-white/20">·</span>
          <a href={`mailto:${PROFILE.email}`} className="text-[#4cd9e0] hover:underline">
            {PROFILE.email}
          </a>
        </div>
      </div>
    </section>
  );
};
