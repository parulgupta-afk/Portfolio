import React, { useState, useEffect } from 'react';
import { Terminal, Menu, FileText } from 'lucide-react';
import { playCyberClick } from '../utils/audioSynth';

interface TopNavBarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onReplayIntro?: () => void;
  currentView?: 'desktop' | 'bento';
  onToggleView?: (view: 'desktop' | 'bento') => void;
  onOpenMobileDrawer: () => void;
  onOpenCommand?: () => void;
  onOpenRecruiter?: () => void;
  onOpenAI?: () => void;
  onOpenVoice?: () => void;
}

/**
 * Recruiter-first nav. OS toys (bento, AI, voice, audio, intro replay)
 * stay out of the bar — use ⌘K if needed.
 */
export const TopNavBar: React.FC<TopNavBarProps> = ({
  activeSection,
  onNavigate,
  onOpenMobileDrawer,
  onOpenCommand,
  onOpenRecruiter,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'resume', label: 'Resume' },
    { id: 'connect', label: 'Contact' },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#05090c]/90 backdrop-blur-xl border-b border-white/10 py-3'
          : 'bg-[#05090c]/70 backdrop-blur-lg border-b border-white/5 py-4'
      }`}
    >
      <div className="flex justify-between items-center px-4 sm:px-8 md:px-12 lg:px-16 max-w-[1440px] mx-auto">
        <button
          type="button"
          id="nav-brand"
          onClick={() => {
            playCyberClick();
            onNavigate('hero');
          }}
          className="font-semibold text-sm md:text-base text-[#dce3ed] flex items-center gap-2.5 cursor-pointer group"
        >
          <span className="w-2 h-2 rounded-full bg-[#4cd9e0]" aria-hidden />
          <span className="group-hover:text-[#4cd9e0] transition-colors">Parul Gupta</span>
        </button>

        <div className="hidden lg:flex gap-7 items-center">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                type="button"
                id={`nav-link-${link.id}`}
                onClick={() => {
                  playCyberClick();
                  onNavigate(link.id);
                }}
                className={`text-[12px] uppercase tracking-widest transition-colors ${
                  isActive ? 'text-[#4cd9e0] font-semibold' : 'text-[#a8b3c4] hover:text-[#4cd9e0]'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {onOpenCommand && (
            <button
              type="button"
              id="btn-command-center"
              onClick={() => {
                playCyberClick();
                onOpenCommand();
              }}
              title="Command palette (Ctrl/⌘ K)"
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded border border-white/10 text-[#a8b3c4] hover:text-[#4cd9e0] hover:border-[#4cd9e0]/40 text-xs transition-colors"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span className="uppercase tracking-wider">⌘K</span>
            </button>
          )}

          {onOpenRecruiter && (
            <button
              type="button"
              onClick={() => {
                playCyberClick();
                onOpenRecruiter();
              }}
              title="30-second recruiter summary"
              className="hidden md:inline-flex items-center px-3 py-1.5 rounded border border-white/10 text-[#a8b3c4] hover:text-[#4cd9e0] hover:border-[#4cd9e0]/40 text-[11px] uppercase tracking-wider transition-colors"
            >
              Recruiter
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              playCyberClick();
              onNavigate('resume');
            }}
            className="hidden sm:inline-flex items-center gap-1.5 border border-[#4cd9e0]/35 text-[#4cd9e0] px-3 md:px-4 py-1.5 text-[11px] uppercase tracking-widest hover:bg-[#4cd9e0]/10 transition-colors rounded"
          >
            <FileText className="w-3.5 h-3.5" />
            Resume
          </button>

          <button
            type="button"
            id="btn-open-mobile-drawer"
            onClick={() => {
              playCyberClick();
              onOpenMobileDrawer();
            }}
            className="lg:hidden p-2 text-[#4cd9e0] border border-white/10 rounded hover:border-[#4cd9e0]/40 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
};
