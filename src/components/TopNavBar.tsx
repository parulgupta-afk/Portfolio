import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Terminal, LayoutGrid, RotateCcw, Menu, X, Cpu } from 'lucide-react';
import { toggleAudioMute, getAudioMuteState, playCyberClick } from '../utils/audioSynth';

interface TopNavBarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onReplayIntro: () => void;
  currentView: 'desktop' | 'bento';
  onToggleView: (view: 'desktop' | 'bento') => void;
  onOpenMobileDrawer: () => void;
}

export const TopNavBar: React.FC<TopNavBarProps> = ({
  activeSection,
  onNavigate,
  onReplayIntro,
  currentView,
  onToggleView,
  onOpenMobileDrawer,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [muted, setMuted] = useState(getAudioMuteState());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAudioToggle = () => {
    const newMute = toggleAudioMute();
    setMuted(newMute);
  };

  const navLinks = [
    { id: 'about', label: '[ About ]' },
    { id: 'projects', label: '[ Projects ]' },
    { id: 'capabilities', label: '[ Capabilities ]' },
    { id: 'experience', label: '[ Experience ]' },
    { id: 'connect', label: '[ Comms ]' },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#05090c]/85 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(76,217,224,0.1)] py-3'
          : 'bg-[#05090c]/60 backdrop-blur-lg border-b border-white/5 py-4'
      }`}
    >
      <div className="flex justify-between items-center px-4 sm:px-8 md:px-12 lg:px-16 max-w-[1440px] mx-auto">
        {/* Brand */}
        <div
          id="nav-brand"
          onClick={() => {
            playCyberClick(700);
            onNavigate('hero');
          }}
          className="font-code-md text-sm md:text-base font-bold tracking-tighter text-[#dce3ed] flex items-center gap-2.5 cursor-pointer group"
        >
          <span className="w-2.5 h-2.5 bg-[#4cd9e0] shadow-[0_0_10px_rgba(76,217,224,0.8)] animate-pulse rounded-sm" />
          <span className="group-hover:text-[#4cd9e0] transition-colors">
            PARUL_GUPTA<span className="text-[#4cd9e0]/60">_DEV</span>
          </span>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex gap-8 items-center">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                id={`nav-link-${link.id}`}
                onClick={() => {
                  playCyberClick(800);
                  onNavigate(link.id);
                }}
                className={`font-code-md text-[12px] uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'text-[#4cd9e0] font-semibold text-glow drop-shadow-[0_0_8px_rgba(76,217,224,0.6)]'
                    : 'text-[#c5c6ca] hover:text-[#4cd9e0] hover:drop-shadow-[0_0_8px_rgba(76,217,224,0.4)]'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Bento vs System View Switcher */}
          <button
            id="btn-toggle-view"
            onClick={() => {
              playCyberClick(900);
              onToggleView(currentView === 'desktop' ? 'bento' : 'desktop');
            }}
            title={currentView === 'desktop' ? 'Switch to Bento Grid layout' : 'Switch to Full OS view'}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded border border-white/10 hover:border-[#4cd9e0]/40 text-[#c5c6ca] hover:text-[#4cd9e0] font-code-md text-xs transition-all bg-white/[0.02]"
          >
            {currentView === 'desktop' ? (
              <>
                <LayoutGrid className="w-3.5 h-3.5 text-[#4cd9e0]" />
                <span className="text-[11px] uppercase">Bento</span>
              </>
            ) : (
              <>
                <Cpu className="w-3.5 h-3.5 text-[#80d4d8]" />
                <span className="text-[11px] uppercase">Full_OS</span>
              </>
            )}
          </button>

          {/* Audio FX Toggle */}
          <button
            id="btn-toggle-audio"
            onClick={handleAudioToggle}
            title={muted ? 'Enable Cybernetic Audio FX' : 'Mute Audio'}
            className={`p-2 rounded border border-white/10 hover:border-[#4cd9e0]/40 transition-all font-code-md text-xs ${
              muted ? 'text-[#8f9195] hover:text-[#dce3ed]' : 'text-[#4cd9e0] bg-[#4cd9e0]/10 border-[#4cd9e0]/40 shadow-[0_0_10px_rgba(76,217,224,0.3)]'
            }`}
          >
            {muted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>

          {/* Replay Intro */}
          <button
            id="btn-reboot-intro"
            onClick={() => {
              playCyberClick(1100);
              onReplayIntro();
            }}
            title="Reboot Cinematic Intro Sequence"
            className="hidden md:flex items-center gap-1 p-2 rounded border border-white/10 hover:border-[#4cd9e0]/40 text-[#c5c6ca] hover:text-[#4cd9e0] transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Connect Button */}
          <button
            id="btn-nav-connect"
            onClick={() => {
              playCyberClick(1200);
              onNavigate('connect');
            }}
            className="border border-[#4cd9e0]/40 text-[#4cd9e0] px-4 md:px-6 py-2 font-code-md text-[11px] md:text-[12px] uppercase tracking-widest hover:bg-[#4cd9e0]/10 hover:border-[#4cd9e0] btn-precision transition-all duration-300 rounded shadow-[0_0_12px_rgba(76,217,224,0.15)]"
          >
            Connect_
          </button>

          {/* Mobile Drawer Button */}
          <button
            id="btn-open-mobile-drawer"
            onClick={() => {
              playCyberClick(750);
              onOpenMobileDrawer();
            }}
            className="lg:hidden p-2 text-[#4cd9e0] border border-white/10 rounded hover:border-[#4cd9e0]/40 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
};
