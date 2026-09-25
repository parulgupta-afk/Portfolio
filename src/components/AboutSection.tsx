import React, { useState } from 'react';
import { Cpu, Layers, Terminal } from 'lucide-react';
import { playCyberClick } from '../utils/audioSynth';
import { PROFILE } from '../data/portfolioData';

export const AboutSection: React.FC = () => {
  const [showFullOrigin, setShowFullOrigin] = useState(false);

  return (
    <section id="about" className="py-20 sm:py-28 relative border-b border-white/5">
      <div className="px-4 sm:px-8 md:px-12 lg:px-16 max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/10 pb-8 gap-4">
          <div>
            <h2 className="font-bodoni text-4xl sm:text-5xl text-[#dce3ed] mb-2 font-bold tracking-tight">
              {PROFILE.name}
            </h2>
            <p className="font-code-md text-xs uppercase tracking-widest text-[#34d399]/80 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#34d399] rounded-full" />
              {PROFILE.role.toUpperCase()} // GURU NANAK DEV UNIVERSITY
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <span className="w-12 h-1 bg-white/10 rounded-full" />
            <span className="w-4 h-1 bg-[#34d399]/50 rounded-full" />
            <span className="w-2 h-1 bg-[#34d399] rounded-full shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Philosophy Column */}
          <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
            {/* Primary Philosophy Statement */}
            <div className="glass-panel p-8 rounded-xl border-l-2 border-l-[#34d399] glow-hover">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-code-md text-[#34d399] uppercase tracking-widest text-xs sm:text-sm flex items-center gap-2">
                  <span>// ENGINEERING PHILOSOPHY</span>
                </h3>
              </div>
              <p className="font-body-lg text-[#c5c6ca] leading-relaxed text-base sm:text-lg">
                I’m a B.Tech Computer Science and Engineering student at Guru Nanak Dev University, aspiring to become a Software Engineer. I enjoy turning ideas into practical products that solve real problems while keeping the experience simple and intuitive.<br /><br />

                I believe good software is more than code that works — it should be reliable, maintainable, scalable, and enjoyable to use. I learn primarily by building, experimenting, debugging, and continuously improving what I create.<br /><br />

                My interests span full-stack development, Data Structures & Algorithms, Generative AI, and UI/UX, with a focus on building products where strong engineering and thoughtful design work together.
              </p>
            </div>

            {/* Core Tenets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="glass-panel p-6 rounded-xl border-white/5 glow-hover flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#34d399]/10 border border-[#34d399]/20 flex items-center justify-center mb-4 text-[#34d399]">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h4 className="font-code-md text-xs sm:text-sm uppercase tracking-widest text-[#dce3ed] mb-2 font-semibold">
                    Full Stack
                  </h4>
                  <p className="font-body-sm text-[#c5c6ca] text-sm leading-relaxed">
                    React/Next.js and Tailwind on the frontend, Node.js/Express (plus Spring Boot/Django) on the backend, with JWT/OAuth auth and MongoDB/MySQL/PostgreSQL for data.
                  </p>
                </div>
              </div>

              <div className="glass-panel p-6 rounded-xl border-white/5 glow-hover flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#38bdf8]/10 border border-[#38bdf8]/20 flex items-center justify-center mb-4 text-[#38bdf8]">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <h4 className="font-code-md text-xs sm:text-sm uppercase tracking-widest text-[#dce3ed] mb-2 font-semibold">
                    AI Integration
                  </h4>
                  <p className="font-body-sm text-[#c5c6ca] text-sm leading-relaxed">
                    Wiring LLMs into real product features — Gemini-powered concierges and ingredient explanations, RAG-based triage, and an Anthropic-driven coding agent.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Origin Column */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="glass-panel p-8 rounded-xl border-white/5 h-full relative overflow-hidden flex flex-col justify-between glow-hover">
              <div>
                <h3 className="font-code-md text-[#dce3ed] mb-6 uppercase tracking-widest text-sm flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#34d399]" />
                  <span>Background</span>
                </h3>

                <div className="space-y-4 font-body-sm text-[#c5c6ca] text-sm leading-relaxed">
                  <p>
                    B.Tech Computer Science and Engineering student at Guru Nanak Dev University, with a strong foundation in software development and core computer science.
                  </p>
                  <p>
                    I have built projects across full-stack web development, real-time systems, AI-powered applications, and developer tooling, working with technologies such as MERN, REST APIs, databases, authentication, and LLM APIs.
                  </p>
                  <p>
                    Alongside development, I actively practice Data Structures & Algorithms and strengthen my understanding of Operating Systems, DBMS, Computer Networks, OOP, and software engineering fundamentals.
                  </p>
                  <p>
                    My goal is to continue turning these fundamentals into production-quality applications while growing through internships, collaborative projects, and real-world engineering challenges.
                  </p>
                  <p className="font-body-sm text-[#34d399] text-sm leading-relaxed font-bold">
                    CGPA: 8.90/10 · 1000+ DSA problems · Software Developer Intern
                  </p>
                  {showFullOrigin && (
                    <p className="text-[#38bdf8] pt-2 border-t border-white/5">
                      Core CS fundamentals: Operating Systems, DBMS, and Computer Networks. Deployed with Docker, Vercel, and Render, backed by MongoDB, MySQL, and PostgreSQL depending on the project.
                    </p>
                  )}
                </div>

                <button
                  id="btn-toggle-origin"
                  onClick={() => {
                    playCyberClick(720);
                    setShowFullOrigin(!showFullOrigin);
                  }}
                  className="mt-3 text-xs font-code-md text-[#34d399]/80 hover:text-[#34d399] transition-colors uppercase tracking-widest"
                >
                  {showFullOrigin ? '[-] Show Less' : '[+] Read More'}
                </button>
              </div>

              {/* Profile Card */}
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-4 bg-white/[0.02] p-4 rounded-lg">
                <div className="w-14 h-14 rounded-full border border-[#34d399]/40 bg-[#34d399]/10 overflow-hidden flex items-center justify-center text-[#34d399] shrink-0">
                  <img
                    src="/profile-photo.jpg"
                    alt={PROFILE.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <span className="hidden font-bodoni text-lg">
                    {PROFILE.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-code-md text-xs text-[#dce3ed] uppercase font-bold">{PROFILE.name}</p>
                  <p className="font-code-md text-[10px] text-[#34d399]/70">github.com/parulgupta-afk</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
