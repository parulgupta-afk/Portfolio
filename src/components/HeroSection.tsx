import React, { useState, useEffect } from 'react';
import { ArrowRight, Terminal, Activity, ShieldCheck } from 'lucide-react';
import { playCyberClick } from '../utils/audioSynth';
import { PROJECTS_DATA, PROFILE } from '../data/portfolioData';

interface HeroSectionProps {
  onInitSequence: () => void;
  onExploreProjects: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onInitSequence, onExploreProjects }) => {
  const [coords, setCoords] = useState({ x: '1.0024', y: '0.4932' });
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      setCoords({
        x: (1 + nx * 0.15).toFixed(4),
        y: (0.5 + ny * 0.15).toFixed(4),
      });
      setTilt({
        rx: -ny * 12,
        ry: nx * 14,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <header
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-8 md:px-12 lg:px-16 overflow-hidden border-b border-white/5"
    >
      <div className="relative z-10 w-full max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-center justify-between">
        {/* Left Editorial Copy */}
        <div className="flex-1 text-left flex flex-col gap-4 border-l border-[#4cd9e0]/20 pl-6 sm:pl-8">
          {/* Status Badge */}
          <div className="font-code-md text-xs text-[#4cd9e0] flex flex-wrap items-center gap-3 mb-2 uppercase tracking-widest">
            <div className="flex items-center gap-2 border border-[#4cd9e0]/30 bg-[#4cd9e0]/5 px-3 py-1 rounded">
              <span className="w-1.5 h-1.5 bg-[#4cd9e0] animate-pulse shadow-[0_0_8px_rgba(76,217,224,0.8)] rounded-full" />
              <span>SYS_STATUS: OPTIMAL</span>
            </div>
            <span className="text-[#c5c6ca]/50">{PROFILE.name.toUpperCase()} // {PROFILE.role.toUpperCase()}</span>
            <span className="hidden sm:inline-block text-[#80d4d8]/60">// v2.4.0</span>
          </div>

          {/* Headline */}
          <h1 className="font-bodoni text-5xl sm:text-7xl md:text-8xl lg:text-[88px] text-[#dce3ed] tracking-tight leading-[0.92] uppercase">
            ENGINEERING
            <br />
            <span className="text-[#4cd9e0] text-glow italic font-light ml-4 sm:ml-10 md:ml-16 block sm:inline">
              ELEGANCE
            </span>
          </h1>

          {/* Description */}
          <p className="font-body-lg text-[#c5c6ca] text-base sm:text-lg max-w-xl mt-4 border-l-2 border-white/10 pl-4 leading-relaxed">
            Full stack developer building AI-powered MERN applications — from real-time flight search to offline-first disaster response. 1000+ DSA problems solved, shipped end to end.
          </p>

          {/* Action Triggers */}
          <div className="mt-8 flex flex-wrap gap-4 items-center">
            <button
              id="btn-hero-init"
              onClick={() => {
                playCyberClick(950);
                onInitSequence();
              }}
              className="inline-flex items-center gap-3 bg-transparent border border-white/15 px-6 py-3.5 hover:border-[#4cd9e0]/60 hover:bg-[#4cd9e0]/10 transition-all duration-300 group btn-precision rounded"
            >
              <span className="font-code-md text-xs sm:text-[13px] uppercase tracking-widest text-[#dce3ed] group-hover:text-[#4cd9e0] transition-colors">
                Init_Sequence
              </span>
              <ArrowRight className="w-4 h-4 text-[#4cd9e0]/60 group-hover:text-[#4cd9e0] group-hover:translate-x-1.5 transition-all" />
            </button>

            <button
              id="btn-hero-explore"
              onClick={() => {
                playCyberClick(850);
                onExploreProjects();
              }}
              className="inline-flex items-center gap-2 text-xs font-code-md uppercase tracking-widest text-[#c5c6ca]/70 hover:text-[#4cd9e0] px-4 py-3 transition-colors"
            >
              <Terminal className="w-4 h-4 text-[#4cd9e0]/60" />
              <span>Explore_Modules [{PROJECTS_DATA.length}]</span>
            </button>
          </div>
        </div>

        {/* Right Abstract 3D Holographic Artifact */}
        <div className="flex-1 w-full flex justify-center items-center relative">
          <div
            className="aspect-square w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[460px] relative group select-none"
            style={{
              transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
              transition: 'transform 0.15s ease-out',
            }}
          >
            {/* Orbital Rings */}
            <div className="absolute inset-0 border border-white/10 rounded-full scale-105 opacity-60 group-hover:rotate-90 transition-transform duration-1000 border-dashed pointer-events-none" />
            <div className="absolute inset-0 border border-[#4cd9e0]/25 rounded-full scale-115 opacity-40 group-hover:-rotate-90 transition-transform duration-1000 border-dotted pointer-events-none" />
            <div className="absolute inset-0 border border-[#80d4d8]/15 rounded-full scale-125 opacity-20 pointer-events-none" />

            {/* Live HUD Coordinate Tracking Labels */}
            <div className="absolute top-1/2 -left-10 font-code-md text-[10px] text-[#4cd9e0]/80 -translate-y-1/2 bg-[#05090c]/80 px-1.5 py-0.5 border border-white/5 rounded">
              Y: {coords.y}
            </div>
            <div className="absolute left-1/2 -bottom-10 font-code-md text-[10px] text-[#4cd9e0]/80 -translate-x-1/2 bg-[#05090c]/80 px-1.5 py-0.5 border border-white/5 rounded">
              X: {coords.x}
            </div>

            {/* Spherical Hologram Glass Panel */}
            <div className="absolute inset-0 bg-cover bg-center opacity-85 group-hover:opacity-100 transition-opacity duration-700 mix-blend-screen rounded-full overflow-hidden glass-panel border border-[#4cd9e0]/30 shadow-[0_0_50px_rgba(76,217,224,0.2)]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6wRIL2zhNG8zTCfNNeSNYv7ChFhOnDzdUpkPSHE9D8DIoqYFysU0FJSG733LHv6Q0EQDoK8spFZH1cdKfT9Wcp0xgUuMOHZBKCAuVO-jFnK4DzV6NQ53llJsxvDG1YzlnAN9JV7ja-gplGxghb5nbRUoZoqllaJn42OGj66CK1P0t34SEWfS7ahIN9F9woiTdWyVTZOTMJbAV_tAEPC_AZ-359es4ZOMqKutBQ8M1CORfPFWPL7FsLw"
                alt="Abstract 3D Technological Artifact"
                className="w-full h-full object-cover mix-blend-screen group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#05090c] via-transparent to-[#4cd9e0]/15 mix-blend-overlay pointer-events-none" />
              <div className="scan-line" />
            </div>

            {/* Floating Telemetry Markers */}
            <div className="absolute top-4 right-4 bg-[#05090c]/90 border border-white/10 px-2 py-1 rounded text-[10px] font-code-md text-[#4cd9e0] flex items-center gap-1.5">
              <Activity className="w-3 h-3 text-[#4cd9e0]" />
              <span>SPATIAL_SYNC</span>
            </div>
            <div className="absolute bottom-4 left-4 bg-[#05090c]/90 border border-white/10 px-2 py-1 rounded text-[10px] font-code-md text-[#80d4d8] flex items-center gap-1.5">
              <ShieldCheck className="w-3 h-3 text-[#80d4d8]" />
              <span>RENDER_OK</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
