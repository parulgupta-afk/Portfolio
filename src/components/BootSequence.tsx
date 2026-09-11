import React, { useEffect, useState } from 'react';
import { playTerminalChirp, playTransmitSuccess } from '../utils/audioSynth';

interface BootSequenceProps {
  onComplete: () => void;
  onSkip: () => void;
}

const MODULES = [
  'REACT_RUNTIME',
  'AI_MODULE',
  'PROJECT_GRAPH',
  'EXPERIENCE_DATA',
  'PERFORMANCE_MONITOR',
  'ARCHITECTURE_ENGINE',
];

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete, onSkip }) => {
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      onComplete();
      return;
    }
    playTerminalChirp();
    let i = 0;
    const id = setInterval(() => {
      if (i < MODULES.length) {
        setLoaded((L) => [...L, MODULES[i]]);
        setProgress(Math.round(((i + 1) / MODULES.length) * 100));
        playTerminalChirp();
        i++;
      } else {
        clearInterval(id);
        setDone(true);
        playTransmitSuccess();
        setTimeout(onComplete, 700);
      }
    }, 380);
    return () => clearInterval(id);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[200] bg-[#05090c] flex items-center justify-center p-6 font-mono-custom">
      <div className="w-full max-w-md">
        <p className="text-[#4cd9e0] text-xs tracking-[0.25em] mb-4">INITIALIZING PARUL_ENGINE…</p>
        <div className="h-2 rounded-full bg-white/10 overflow-hidden mb-2">
          <div className="h-full bg-[#4cd9e0] transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
        <p className="text-right text-xs text-[#8f9195] mb-6">{progress}%</p>
        <ul className="space-y-1.5 text-xs mb-8">
          {MODULES.map((m) => (
            <li key={m} className={loaded.includes(m) ? 'text-[#4cd9e0]' : 'text-[#45474a]'}>
              {loaded.includes(m) ? '✓' : '·'} {m}
            </li>
          ))}
        </ul>
        {done && <p className="text-[#80d4d8] text-sm tracking-widest">SYSTEM STATUS: ONLINE</p>}
        <button
          type="button"
          onClick={onSkip}
          className="mt-8 text-[10px] text-[#8f9195] hover:text-[#dce3ed] uppercase tracking-widest"
        >
          Skip boot_
        </button>
      </div>
    </div>
  );
};
