import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { playCyberClick } from '../utils/audioSynth';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onReplayIntro?: () => void;
  currentView?: 'desktop' | 'bento';
  onToggleView?: (view: 'desktop' | 'bento') => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  activeSection,
  onNavigate,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const links = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'capabilities', label: 'Capabilities' },
    { id: 'experience', label: 'Experience' },
    { id: 'connect', label: 'Contact' },
  ];

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          playCyberClick(500);
          onClose();
        }
      }}
      className="fixed inset-0 z-[90] bg-[#030405]/85 backdrop-blur-xl flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      <div className="w-[85vw] max-w-sm bg-[#0a0d0f] h-full border-l border-white/10 p-6 flex flex-col">
        <div className="flex justify-between items-center pb-6 border-b border-white/10 mb-6">
          <span className="text-xs text-[#34d399] font-semibold tracking-widest uppercase">Menu</span>
          <button
            type="button"
            onClick={() => {
              playCyberClick(500);
              onClose();
            }}
            className="p-1.5 rounded text-[#c5c6ca] hover:text-[#34d399] border border-white/10"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="space-y-1" aria-label="Mobile">
          {links.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                type="button"
                onClick={() => {
                  playCyberClick(800);
                  onNavigate(link.id);
                  onClose();
                }}
                className={`w-full text-left text-sm py-3 px-3 rounded transition-colors ${
                  isActive
                    ? 'bg-[#34d399]/10 text-[#34d399] font-semibold border border-[#34d399]/30'
                    : 'text-[#c5c6ca] hover:text-[#34d399] hover:bg-white/[0.03]'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
