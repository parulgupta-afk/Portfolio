import React, { useState } from 'react';
import { Fingerprint, Cpu, Layers, Sparkles, Terminal, CheckCircle2, User } from 'lucide-react';
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
            <p className="font-code-md text-xs uppercase tracking-widest text-[#4cd9e0]/80 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#4cd9e0] rounded-full" />
              {PROFILE.role.toUpperCase()} // GURU NANAK DEV UNIVERSITY
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <span className="w-12 h-1 bg-white/10 rounded-full" />
            <span className="w-4 h-1 bg-[#4cd9e0]/50 rounded-full" />
            <span className="w-2 h-1 bg-[#4cd9e0] rounded-full shadow-[0_0_6px_rgba(76,217,224,0.8)]" />
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Philosophy Column */}
          <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
            {/* Primary Philosophy Statement */}
            <div className="glass-panel p-8 rounded-xl border-l-2 border-l-[#4cd9e0] glow-hover">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-code-md text-[#4cd9e0] uppercase tracking-widest text-xs sm:text-sm flex items-center gap-2">
                  <span>// ENGINEERING PHILOSOPHY</span>
                </h3>
                <span className="font-code-md text-[10px] text-[#c5c6ca]/40">DOC_REF: ETHOS_01</span>
              </div>
              <p className="font-body-lg text-[#c5c6ca] leading-relaxed text-base sm:text-lg">
                I'm a full stack developer who likes shipping complete products — frontend, backend, and the AI in between. I care about clean, type-safe architecture as much as the interface a user actually touches, and I default to building the whole thing myself, end to end.
              </p>
            </div>

            {/* Core Tenets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="glass-panel p-6 rounded-xl border-white/5 glow-hover flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#4cd9e0]/10 border border-[#4cd9e0]/20 flex items-center justify-center mb-4 text-[#4cd9e0]">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h4 className="font-code-md text-xs sm:text-sm uppercase tracking-widest text-[#dce3ed] mb-2 font-semibold">
                    Core Philosophy
                  </h4>
                  <p className="font-body-sm text-[#c5c6ca] text-sm leading-relaxed">
                    Atomic design principles applied to system-level logic for infinite scalability and frictionless maintenance.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-code-md text-[#4cd9e0]/70">
                  <span>MODULARITY</span>
                  <span>100% DECOUPLED</span>
                </div>
              </div>

              <div className="glass-panel p-6 rounded-xl border-white/5 glow-hover flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#80d4d8]/10 border border-[#80d4d8]/20 flex items-center justify-center mb-4 text-[#80d4d8]">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <h4 className="font-code-md text-xs sm:text-sm uppercase tracking-widest text-[#dce3ed] mb-2 font-semibold">
                    Technical Rigor
                  </h4>
                  <p className="font-body-sm text-[#c5c6ca] text-sm leading-relaxed">
                    Zero-latency interfaces built on robust, type-safe foundations and hardware-accelerated render loops.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-code-md text-[#80d4d8]/70">
                  <span>EXECUTION</span>
                  <span>&lt; 16MS FRAME</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Origin & Verified Architect Column */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="glass-panel p-8 rounded-xl border-white/5 h-full relative overflow-hidden flex flex-col justify-between glow-hover">
              <div className="absolute top-0 right-0 p-4 font-code-md text-[10px] text-[#4cd9e0]/40">
                ORIGIN_LOG_v4.2
              </div>

              <div>
                <h3 className="font-code-md text-[#dce3ed] mb-6 uppercase tracking-widest text-sm flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#4cd9e0]" />
                  <span>System Origin</span>
                </h3>

                <div className="space-y-4 font-body-sm text-[#c5c6ca] text-sm leading-relaxed">
                  <p>
                    Currently a B.Tech Computer Engineering student at Guru Nanak Dev University (CGPA 8.90/10), with hands-on experience across MERN stack development, RESTful APIs, and Google Gemini API integration.
                  </p>
                  <p>
                    1000+ DSA problems solved across LeetCode and GeeksforGeeks, three shipped full-stack projects (SkyCall, NutriVibe, Beacon), and a software developer internship at CodeXIntern building production e-commerce features.
                  </p>
                  {showFullOrigin && (
                    <p className="text-[#80d4d8] pt-2 border-t border-white/5">
                      Comfortable across the stack: React/Next.js and Tailwind on the frontend, Node.js/Express/Spring Boot/Django on the backend, MongoDB/MySQL/PostgreSQL for data, and Docker/Vercel/Render for deployment.
                    </p>
                  )}
                </div>

                <button
                  id="btn-toggle-origin"
                  onClick={() => {
                    playCyberClick(720);
                    setShowFullOrigin(!showFullOrigin);
                  }}
                  className="mt-3 text-xs font-code-md text-[#4cd9e0]/80 hover:text-[#4cd9e0] transition-colors uppercase tracking-widest"
                >
                  {showFullOrigin ? '[-] Collapse History' : '[+] Read Extended Origin'}
                </button>
              </div>

              {/* Verified Badge */}
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between gap-4 bg-white/[0.02] p-4 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border border-[#4cd9e0]/40 bg-[#4cd9e0]/10 flex items-center justify-center text-[#4cd9e0] shadow-[0_0_12px_rgba(76,217,224,0.2)]">
                    <Fingerprint className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="font-code-md text-xs text-[#dce3ed] uppercase font-bold">{PROFILE.name}</p>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#4cd9e0]" />
                    </div>
                    <p className="font-code-md text-[10px] text-[#4cd9e0]/70">github.com/parulgupta-afk</p>
                  </div>
                </div>

                <div className="text-right font-code-md text-[10px] text-[#c5c6ca]/50">
                  <span>STATUS</span>
                  <div className="text-[#4cd9e0] font-semibold">AUTHENTICATED</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
