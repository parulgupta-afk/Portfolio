import React from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';
import { playCyberClick } from '../utils/audioSynth';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    playCyberClick(900);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#030405] border-t border-white/10 py-12 px-4 sm:px-8 md:px-12 lg:px-16 text-[#c5c6ca] relative z-10">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Brand & Kernel Status */}
        <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
          <div className="font-code-md text-sm font-bold text-[#dce3ed] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#34d399] shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span>{PROFILE.name.toUpperCase()}</span>
          </div>
          <p className="font-body-sm text-xs text-[#c5c6ca]/60 max-w-sm">
            Software developer. MERN, TypeScript, and Generative AI integration.
          </p>
          <div className="flex items-center gap-3 mt-1">
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded border border-white/10 hover:border-[#34d399]/40 text-[#c5c6ca] hover:text-[#34d399] transition-colors">
              <Github className="w-3.5 h-3.5" />
            </a>
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded border border-white/10 hover:border-[#34d399]/40 text-[#c5c6ca] hover:text-[#34d399] transition-colors">
              <Linkedin className="w-3.5 h-3.5" />
            </a>
            <a href={`mailto:${PROFILE.email}`} className="p-2 rounded border border-white/10 hover:border-[#34d399]/40 text-[#c5c6ca] hover:text-[#34d399] transition-colors">
              <Mail className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Quick Contact */}
        <div className="flex flex-wrap justify-center gap-3 text-[11px] font-code-md">
          <a
            href={`mailto:${PROFILE.email}`}
            className="flex items-center gap-1.5 bg-[#0f1314] border border-white/10 hover:border-[#34d399]/40 px-3 py-1.5 rounded text-[#c5c6ca] hover:text-[#34d399] transition-colors"
          >
            {PROFILE.email}
          </a>
        </div>

        {/* Scroll to Top */}
        <button
          onClick={scrollToTop}
          id="btn-scroll-top"
          className="flex items-center gap-2 font-code-md text-xs uppercase text-[#34d399] border border-[#34d399]/30 hover:border-[#34d399] px-4 py-2 rounded bg-[#34d399]/5 transition-all btn-precision"
        >
          <span>Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="max-w-[1440px] mx-auto mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center text-[10px] font-code-md text-[#c5c6ca]/40 gap-2">
        <div>© {new Date().getFullYear()} {PROFILE.name.toUpperCase()} // FULL STACK DEVELOPMENT</div>
        <div>ALL PROTOCOLS ENCRYPTED // TLS 1.3</div>
      </div>
    </footer>
  );
};
