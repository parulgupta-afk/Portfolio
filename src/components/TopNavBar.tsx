import React, { useState, useEffect } from 'react';
import { Menu, FileText } from 'lucide-react';
import { playCyberClick } from '../utils/audioSynth';
import { PROFILE } from '../data/portfolioData';

interface TopNavBarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onReplayIntro?: () => void;
  currentView?: 'desktop' | 'bento';
  onToggleView?: (view: 'desktop' | 'bento') => void;
  onOpenMobileDrawer: () => void;
}

export const TopNavBar: React.FC<TopNavBarProps> = ({
  activeSection,
  onNavigate,
  onOpenMobileDrawer,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'connect', label: 'Contact' },
  ];

  return (
    <nav
      aria-label="Primary"
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#030405]/92 backdrop-blur-xl border-b border-white/10 py-3'
          : 'bg-[#030405]/65 backdrop-blur-lg border-b border-white/5 py-4'
      }`}
    >
      <div className="flex justify-between items-center px-4 sm:px-8 md:px-12 lg:px-16 max-w-[1440px] mx-auto">
        <button
          type="button"
          onClick={() => {
            playCyberClick(700);
            onNavigate('hero');
          }}
          className="font-semibold text-sm md:text-base text-[#dce3ed] flex items-center gap-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#34d399]"
        >
          <span className="w-2 h-2 rounded-full bg-[#34d399]" aria-hidden />
          <span className="hover:text-[#34d399] transition-colors">{PROFILE.name}</span>
        </button>

        <div className="hidden lg:flex gap-7 items-center">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                type="button"
                onClick={() => {
                  playCyberClick(800);
                  onNavigate(link.id);
                }}
                className={`text-[12px] uppercase tracking-widest transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#34d399] ${
                  isActive ? 'text-[#34d399] font-semibold' : 'text-[#a8b3c4] hover:text-[#34d399]'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex text-[11px] uppercase tracking-widest text-[#a8b3c4] hover:text-[#34d399] transition-colors"
          >
            GitHub
          </a>
          <button
            type="button"
            onClick={() => {
              playCyberClick(900);
              onNavigate('connect');
            }}
            className="hidden sm:inline-flex items-center gap-1.5 border border-[#34d399]/40 text-[#34d399] px-3 md:px-4 py-1.5 text-[11px] uppercase tracking-widest hover:bg-[#34d399]/10 transition-colors rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#34d399]"
          >
            <FileText className="w-3.5 h-3.5" />
            Contact
          </button>
          <button
            type="button"
            onClick={() => {
              playCyberClick(750);
              onOpenMobileDrawer();
            }}
            className="lg:hidden p-2 text-[#34d399] border border-white/10 rounded hover:border-[#34d399]/40 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
};
