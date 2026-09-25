import React, { useEffect, useState } from 'react';
import { playTerminalChirp, playTransmitSuccess } from '../utils/audioSynth';
import { PROFILE } from '../data/portfolioData';

interface IntroSequenceProps {
  onComplete: () => void;
  onSkip: () => void;
}

/**
 * Short name reveal intro — no fake boot telemetry, no decorative book canvas.
 */
export const IntroSequence: React.FC<IntroSequenceProps> = ({ onComplete, onSkip }) => {
  const [phase, setPhase] = useState<'initial' | 'portSplit' | 'archShow' | 'archSplit' | 'done'>('initial');

  useEffect(() => {
    playTerminalChirp();

    const t1 = setTimeout(() => {
      setPhase('portSplit');
      playTerminalChirp();
    }, 1000);

    const t2 = setTimeout(() => {
      setPhase('archShow');
    }, 1500);

    const t3 = setTimeout(() => {
      setPhase('archSplit');
      playTerminalChirp();
    }, 2800);

    const t4 = setTimeout(() => {
      setPhase('done');
      playTransmitSuccess();
      onComplete();
    }, 3800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <div
      id="intro-overlay"
      className={`fixed inset-0 z-[100] bg-[#030405] flex items-center justify-center flex-col transition-opacity duration-700 select-none ${
        phase === 'done' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        {/* PORTFOLIO split */}
        <div className="relative inline-block font-bodoni text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight text-[#dce3ed]">
          <div
            className={`clip-top transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] ${
              phase !== 'initial' ? 'split-up' : ''
            }`}
          >
            PORTFOLIO
          </div>
          <div
            className={`clip-bottom absolute top-0 left-0 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] ${
              phase !== 'initial' ? 'split-down' : ''
            }`}
          >
            PORTFOLIO
          </div>
        </div>

        {/* Name */}
        <div
          className={`absolute inset-0 flex items-center justify-center font-bodoni text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#34d399] transition-all duration-700 ${
            phase === 'archShow' || phase === 'archSplit' || phase === 'done'
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-90 pointer-events-none'
          }`}
        >
          <div className="relative inline-block">
            <div
              className={`clip-top transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                phase === 'archSplit' || phase === 'done' ? 'split-up' : ''
              }`}
            >
              {PROFILE.name.toUpperCase().replace(/ /g, '_')}
            </div>
            <div
              className={`clip-bottom absolute top-0 left-0 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                phase === 'archSplit' || phase === 'done' ? 'split-down' : ''
              }`}
            >
              {PROFILE.name.toUpperCase().replace(/ /g, '_')}
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        id="btn-skip-intro"
        onClick={() => {
          playTransmitSuccess();
          onSkip();
        }}
        className="absolute bottom-8 right-8 z-20 font-code-md text-xs uppercase tracking-widest text-[#dce3ed]/60 hover:text-[#34d399] border border-white/10 hover:border-[#34d399]/40 px-4 py-2 bg-[#0f1314]/80 backdrop-blur-md rounded transition-all flex items-center gap-2 group"
      >
        <span>Skip</span>
        <span className="text-[#34d399] group-hover:translate-x-0.5 transition-transform">→</span>
      </button>
    </div>
  );
};
