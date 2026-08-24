import React, { useEffect, useState, useRef } from 'react';
import { playTerminalChirp, playTransmitSuccess } from '../utils/audioSynth';

interface IntroSequenceProps {
  onComplete: () => void;
  onSkip: () => void;
}

export const IntroSequence: React.FC<IntroSequenceProps> = ({ onComplete, onSkip }) => {
  const [phase, setPhase] = useState<'initial' | 'portSplit' | 'archShow' | 'archSplit' | 'bookOpen' | 'done'>('initial');
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    playTerminalChirp();

    // 1. Initial fade in PORTFOLIO
    const t1 = setTimeout(() => {
      setPhase('portSplit');
      playTerminalChirp();
    }, 1200);

    // 2. Show SYSTEM_ARCHITECT in gap
    const t2 = setTimeout(() => {
      setPhase('archShow');
    }, 1700);

    // 3. Split SYSTEM_ARCHITECT
    const t3 = setTimeout(() => {
      setPhase('archSplit');
      playTerminalChirp();
    }, 3100);

    // 4. Book open effect & transition
    const t4 = setTimeout(() => {
      setPhase('bookOpen');
      playTransmitSuccess();
    }, 3900);

    // 5. Complete and hand off to main OS
    const t5 = setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 5600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [onComplete]);


  return (
    <div
      id="intro-overlay"
      className={`fixed inset-0 z-[100] bg-[#05090c] flex items-center justify-center flex-col transition-opacity duration-1000 select-none ${
        phase === 'done' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >


      {/* Text Layers */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        {/* PORTFOLIO Split Layer */}
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

        {/* SYSTEM_ARCHITECT Split Layer */}
        <div
          className={`absolute inset-0 flex items-center justify-center font-bodoni text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#4cd9e0] transition-all duration-700 ${
            phase === 'archShow'
              ? 'opacity-100 scale-100'
              : phase === 'archSplit' || phase === 'bookOpen' || phase === 'done'
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-90 pointer-events-none'
          }`}
        >
          <div className="relative inline-block">
            <div
              className={`clip-top transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                phase === 'archSplit' || phase === 'bookOpen' || phase === 'done' ? 'split-up' : ''
              }`}
            >
              PARUL GUPTA
            </div>
            <div
              className={`clip-bottom absolute top-0 left-0 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                phase === 'archSplit' || phase === 'bookOpen' || phase === 'done' ? 'split-down' : ''
              }`}
            >
              PARUL GUPTA
            </div>
          </div>
        </div>

      </div>

      {/* Skip Button */}
      <button
        id="btn-skip-intro"
        onClick={() => {
          playTransmitSuccess();
          onSkip();
        }}
        className="absolute bottom-8 right-8 z-20 font-code-md text-xs uppercase tracking-widest text-[#dce3ed]/60 hover:text-[#4cd9e0] border border-white/10 hover:border-[#4cd9e0]/40 px-4 py-2 bg-[#11161d]/80 backdrop-blur-md rounded transition-all flex items-center gap-2 group"
      >
        <span>[ Skip Sequence ]</span>
        <span className="text-[#4cd9e0] group-hover:translate-x-0.5 transition-transform">→</span>
      </button>
    </div>
  );
};
