import React from 'react';
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
  if (!isOpen) return null;

  const links = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'resume', label: 'Resume' },
    { id: 'connect', label: 'Contact' },
  ];

  return (
    <div
      id="mobile-drawer-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          playCyberClick();
          onClose();
        }
      }}
      className="fixed inset-0 z-[90] bg-[#05090c]/85 backdrop-blur-xl flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      <div className="w-[85vw] max-w-sm bg-[#0d141b] h-full border-l border-white/10 p-6 flex flex-col shadow-[0_0_50px_rgba(76,217,224,0.1)]">
        <div className="flex justify-between items-center pb-6 border-b border-white/10 mb-6">
          <span className="text-xs text-[#4cd9e0] font-semibold tracking-widest uppercase">Menu</span>
          <button
            type="button"
            onClick={() => {
              playCyberClick();
              onClose();
            }}
            className="p-1.5 rounded text-[#c5c6ca] hover:text-[#4cd9e0] border border-white/10"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-1">
          {links.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                type="button"
                onClick={() => {
                  playCyberClick();
                  onNavigate(link.id);
                  onClose();
                }}
                className={`w-full text-left text-sm py-3 px-3 rounded transition-colors ${
                  isActive
                    ? 'bg-[#4cd9e0]/10 text-[#4cd9e0] font-semibold border border-[#4cd9e0]/30'
                    : 'text-[#c5c6ca] hover:text-[#4cd9e0] hover:bg-white/[0.03]'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </div>

        <p className="mt-auto pt-6 text-[11px] text-[#6b7380]">
          Press <kbd className="text-[#5eb8c8]">Ctrl+K</kbd> for command palette
        </p>
      </div>
    </div>
  );
};
