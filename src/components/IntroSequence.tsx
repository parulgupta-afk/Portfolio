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

  // Book 3D simulation canvas
  useEffect(() => {
    if (phase !== 'bookOpen') return;
    const container = canvasContainerRef.current;
    if (!container) return;

    // Simple smooth canvas animation simulating the book-opening geometry with glowing grid
    const canvas = document.createElement('canvas');
    canvas.className = 'absolute inset-0 w-full h-full';
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;
    let progress = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const renderBook = () => {
      progress = Math.min(progress + 0.02, 1);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const w = Math.min(canvas.width * 0.35, 260);
      const h = Math.min(canvas.height * 0.5, 360);

      // Book left page flip
      ctx.save();
      ctx.translate(cx, cy);

      // Left page swinging open
      const angle = -Math.PI * progress * 0.95;
      const scaleX = Math.cos(angle);

      // Shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(-w - 10, -h / 2, w * 2 + 20, h);

      // Right fixed page
      ctx.fillStyle = '#0d141b';
      ctx.strokeStyle = '#4cd9e0';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.rect(0, -h / 2, w, h);
      ctx.fill();
      ctx.stroke();

      // Right page content simulation
      ctx.fillStyle = 'rgba(76, 217, 224, 0.4)';
      ctx.fillRect(20, -h / 2 + 30, w - 40, 4);
      ctx.fillRect(20, -h / 2 + 45, w - 60, 2);
      ctx.fillRect(20, -h / 2 + 55, w - 80, 2);

      // Left rotating page
      ctx.save();
      ctx.transform(scaleX, 0, 0, 1, 0, 0);
      ctx.fillStyle = '#11161d';
      ctx.strokeStyle = '#80d4d8';
      ctx.beginPath();
      ctx.rect(-w, -h / 2, w, h);
      ctx.fill();
      ctx.stroke();

      // Glowing spine
      ctx.fillStyle = '#4cd9e0';
      ctx.fillRect(-2, -h / 2, 4, h);

      ctx.restore();
      ctx.restore();

      if (progress < 1) {
        animFrame = requestAnimationFrame(renderBook);
      }
    };

    renderBook();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrame);
      if (container.contains(canvas)) {
        container.removeChild(canvas);
      }
    };
  }, [phase]);

  return (
    <div
      id="intro-overlay"
      className={`fixed inset-0 z-[100] bg-[#05090c] flex items-center justify-center flex-col transition-opacity duration-1000 select-none ${
        phase === 'done' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* 3D Scene / Book container */}
      <div
        ref={canvasContainerRef}
        className={`absolute inset-0 w-full h-full transition-opacity duration-1000 pointer-events-none ${
          phase === 'bookOpen' ? 'opacity-100' : 'opacity-0'
        }`}
      />

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
              SYSTEM_ARCHITECT
            </div>
            <div
              className={`clip-bottom absolute top-0 left-0 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                phase === 'archSplit' || phase === 'bookOpen' || phase === 'done' ? 'split-down' : ''
              }`}
            >
              SYSTEM_ARCHITECT
            </div>
          </div>
        </div>

        {/* Boot status label */}
        <div className="mt-16 font-code-md text-xs tracking-widest text-[#4cd9e0]/70 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#4cd9e0] animate-pulse" />
          <span>SYS_BOOT_SEQ // KERNEL_INIT</span>
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
