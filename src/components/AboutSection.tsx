import React from 'react';
import { PROFILE } from '../data/portfolioData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 sm:py-24 border-b border-white/10">
      <div className="px-4 sm:px-8 md:px-12 lg:px-16 max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-2">About</h2>
        <p className="text-[#4cd9e0] text-sm mb-8">{PROFILE.education}</p>

        <div className="space-y-5 text-base sm:text-lg text-[#b4bcc8] leading-relaxed max-w-3xl">
          <p>
            I am a software engineer focused on full-stack product systems. I work across the
            stack — React and TypeScript on the client, Node and Python APIs on the server, relational
            data, background jobs, and AI features when retrieval and generation improve the product.
          </p>
          <p>
            Recent work includes <span className="text-white font-medium">Priceloop</span>, a
            price-tracking platform with JWT auth, PostgreSQL, Stripe billing, and scraper scaffolding;
            and <span className="text-white font-medium">CodeForge</span>, an autonomous coding agent
            with sandboxed execution and bounded self-repair. I have also built{' '}
            <span className="text-white font-medium">PulseOps</span> for incident operations and{' '}
            <span className="text-white font-medium">Pocket-Triage</span> for AI-assisted emergency guidance.
          </p>
          <p>
            I care about clear architecture, honest scope, tests, and deployment hygiene — not only UI
            demos. {PROFILE.dsa}. {PROFILE.availability}.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-4 text-sm">
          <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="text-[#4cd9e0] hover:underline">
            GitHub
          </a>
          <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#4cd9e0] hover:underline">
            LinkedIn
          </a>
          <a href={`mailto:${PROFILE.email}`} className="text-[#4cd9e0] hover:underline">
            {PROFILE.email}
          </a>
        </div>
      </div>
    </section>
  );
};
