import React, { useEffect, useRef } from 'react';

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const flowerTlRef = useRef<HTMLDivElement>(null);
  const flowerMlRef = useRef<HTMLDivElement>(null);
  const flowerBlRef = useRef<HTMLDivElement>(null);
  const flowerTrRef = useRef<HTMLDivElement>(null);
  const flowerMrRef = useRef<HTMLDivElement>(null);
  const flowerBrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const section = sectionRef.current;
    const label = labelRef.current;
    const flowers = {
      tl: flowerTlRef.current,
      ml: flowerMlRef.current,
      bl: flowerBlRef.current,
      tr: flowerTrRef.current,
      mr: flowerMrRef.current,
      br: flowerBrRef.current,
    };

    if (!section) return;

    if (prefersReducedMotion) {
      const finals = [
        { el: flowers.tl, tx: -8, ty: 8, sc: 1.05, rot: -10 },
        { el: flowers.ml, tx: -2, ty: -4, sc: 1.15, rot: 12 },
        { el: flowers.bl, tx: -12, ty: 0, sc: 1.02, rot: 4 },
        { el: flowers.tr, tx: 8, ty: 10, sc: 1.08, rot: 12 },
        { el: flowers.mr, tx: 4, ty: -8, sc: 1.18, rot: -14 },
        { el: flowers.br, tx: 10, ty: -4, sc: 1.04, rot: -6 },
      ];
      finals.forEach(({ el, tx, ty, sc, rot }) => {
        if (el) {
          el.style.transform = `translate3d(${tx}%, ${ty}px, 0) scale(${sc}) rotate(${rot}deg)`;
          el.style.opacity = '0.95';
        }
      });
      if (label) label.textContent = 'ACCESSIBILITY MODE';
      return;
    }

    let current = 0;
    let target = 0;
    let rafId: number | null = null;

    const ease = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    function getProgress() {
      if (!section) return 0;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.9;
      const range = rect.height * 0.55 + vh * 0.25;
      const raw = (start - rect.top) / range;
      return Math.max(0, Math.min(1, raw));
    }

    function apply(progress: number) {
      const p = ease(progress);

      if (flowers.tl) {
        const tx = lerp(-160, -6, p);
        const ty = lerp(-15, 10, p);
        const sc = lerp(0.28, 1.08, p);
        const rot = lerp(-32, -8, p);
        flowers.tl.style.transform = `translate3d(${tx}%, ${ty}px, 0) scale(${sc}) rotate(${rot}deg)`;
        flowers.tl.style.opacity = String(Math.min(1, p * 1.8));
      }
      if (flowers.ml) {
        const p2 = Math.min(1, p * 0.92);
        const tx = lerp(-185, 0, p2);
        const ty = lerp(25, -6, p2);
        const sc = lerp(0.28, 1.18, p2);
        const rot = lerp(42, 10, p2);
        flowers.ml.style.transform = `translate3d(${tx}%, ${ty}px, 0) scale(${sc}) rotate(${rot}deg)`;
        flowers.ml.style.opacity = String(Math.min(1, p2 * 1.6));
      }
      if (flowers.bl) {
        const p2 = Math.min(1, p * 1.05);
        const tx = lerp(-155, -10, p2);
        const ty = lerp(35, 2, p2);
        const sc = lerp(0.28, 1.05, p2);
        const rot = lerp(-22, 5, p2);
        flowers.bl.style.transform = `translate3d(${tx}%, ${ty}px, 0) scale(${sc}) rotate(${rot}deg)`;
        flowers.bl.style.opacity = String(Math.min(1, p2 * 1.7));
      }
      if (flowers.tr) {
        const tx = lerp(160, 6, p);
        const ty = lerp(-20, 12, p);
        const sc = lerp(0.28, 1.1, p);
        const rot = lerp(35, 9, p);
        flowers.tr.style.transform = `translate3d(${tx}%, ${ty}px, 0) scale(${sc}) rotate(${rot}deg)`;
        flowers.tr.style.opacity = String(Math.min(1, p * 1.8));
      }
      if (flowers.mr) {
        const p2 = Math.min(1, p * 0.9);
        const tx = lerp(195, 2, p2);
        const ty = lerp(20, -12, p2);
        const sc = lerp(0.28, 1.22, p2);
        const rot = lerp(-42, -12, p2);
        flowers.mr.style.transform = `translate3d(${tx}%, ${ty}px, 0) scale(${sc}) rotate(${rot}deg)`;
        flowers.mr.style.opacity = String(Math.min(1, p2 * 1.55));
      }
      if (flowers.br) {
        const p2 = Math.min(1, p * 1.08);
        const tx = lerp(158, 9, p2);
        const ty = lerp(25, -5, p2);
        const sc = lerp(0.28, 1.06, p2);
        const rot = lerp(25, -5, p2);
        flowers.br.style.transform = `translate3d(${tx}%, ${ty}px, 0) scale(${sc}) rotate(${rot}deg)`;
        flowers.br.style.opacity = String(Math.min(1, p2 * 1.7));
      }

      if (label) label.textContent = `SCROLL REVEAL ${Math.round(p * 100)}%`;
    }

    function tick() {
      current = lerp(current, target, 0.14);
      apply(current);
      if (Math.abs(target - current) > 0.0008) {
        rafId = requestAnimationFrame(tick);
      } else {
        current = target;
        apply(current);
        rafId = null;
      }
    }

    function onScroll() {
      target = getProgress();
      if (!rafId) rafId = requestAnimationFrame(tick);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-[160vh] py-24 px-4 overflow-hidden bg-[#050505] flex flex-col justify-center"
    >
      {/* Atmospheric ambient glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-600/12 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/5 w-56 h-56 bg-blue-600/10 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/5 w-56 h-56 bg-amber-500/8 rounded-full blur-[90px] pointer-events-none" />

      {/* FLOWERS CONTAINER */}
      <div
        id="flowers-container"
        className="absolute inset-0 pointer-events-none overflow-hidden z-20"
      >
        {/* LEFT */}
        <div
          id="flower-tl"
          ref={flowerTlRef}
          className="absolute top-[6%] left-0 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 will-change-transform"
          style={{
            transform: 'translate3d(-160%, 0, 0) scale(0.28) rotate(-28deg)',
            opacity: 0,
          }}
        >
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgB6_uIrY2KbV2mD4czvLWyvfTnDpz75jl9lvOhwVExlYY6txlSXJcI2bejU_Y7HVTKsdu6F2KrHvsZBSaSK8ZMEzNqjt_Xc1-OPh2Q4MOm_SuAz6jwVjhcJ6ErOJ0giaHnNIeJcX5qv-DFQ99chjZVZ05ZGg3arKJBxRB_WvvobLTRciwUqLTW37hhJOXlM1WdDAquVDFhkvTul-Y9WaS0LYIUeuCFTzZIU5qj94A6FTgPm-ncSzoag"
            loading="lazy"
            decoding="async"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
            alt="Peach 3D rose"
            className="w-full h-full object-contain flower-img drop-shadow-[0_20px_40px_rgba(251,146,60,0.3)]"
          />
        </div>

        <div
          id="flower-ml"
          ref={flowerMlRef}
          className="absolute top-[32%] left-0 w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 will-change-transform"
          style={{
            transform: 'translate3d(-180%, 0, 0) scale(0.28) rotate(38deg)',
            opacity: 0,
          }}
        >
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7SzDmR2zc6SWJfxtvxy16ZjlS820YIjQQ1FPEYEmEJJWFXbJWwctJN2xKyPtqNmXk_6uMp5SFqIAgsoQh1IMi8rT2Et-MaDXCdeKa5XY4-eZ2fgMddVB__OAJjqBLIzJPTIhC4mT3Q5hewrwCpXPCDns3xtJyuPknuULtPwh_rEy86PFqsUSSyXiJJhfQotvZF4I-vFVmcrnc6sqsQMSPOoesan1VPQomrO2VvurGH4pP6sKt9jHudA"
            loading="lazy"
            decoding="async"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
            alt="Lavender 3D flower"
            className="w-full h-full object-contain flower-img drop-shadow-[0_30px_60px_rgba(168,85,247,0.4)]"
          />
        </div>

        <div
          id="flower-bl"
          ref={flowerBlRef}
          className="absolute top-[66%] left-0 w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 will-change-transform"
          style={{
            transform: 'translate3d(-150%, 0, 0) scale(0.28) rotate(-18deg)',
            opacity: 0,
          }}
        >
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiDri49_ORUdLu00HqT7KCP7IrLtj_sfU0WSo4bwb_LA9DvspC5s1hkjtfKHIxsbcglDCKI4zeHEK2CteQzPHOO27y-RTH76HY3kAF_QU6kTh_PeLLtEEuBPglQYJGzLGYBddkbjeqksR4sRm6biXMmp-MPHLiGmqofcJfyQgIzUT8M9jvJcIt-oFCDcEK2rAsoTU1RUqmGNRGRm6jfRPwa4TiS3CemC3Id2ux0Itl4LGIqS9Eai8G6Q"
            loading="lazy"
            decoding="async"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
            alt="Deep purple orchid"
            className="w-full h-full object-contain flower-img drop-shadow-[0_25px_50px_rgba(147,51,234,0.35)]"
          />
        </div>

        {/* RIGHT */}
        <div
          id="flower-tr"
          ref={flowerTrRef}
          className="absolute top-[10%] right-0 w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 will-change-transform"
          style={{
            transform: 'translate3d(160%, 0, 0) scale(0.28) rotate(32deg)',
            opacity: 0,
          }}
        >
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAk8ApiqWhiKJtjJ3FbyFN9VEsED9lBR8BfWNTubQ4Hf6cEVAZ-5XZLvg9dQUglO7eMaBHXeCKxLFNtX3frlbUms5eBzvA_2C11eirQ9te6kfO12bs7PwlhBnHtwG20mCh_xUhYMDvCTlh-EoDzGo7gFj8JREkV8GL9XBdxeqclNGHP2AguOgyentolGIWBliFGxqt-0kzmHRc4d89_Eg4cfNmzuR6RXlvQ9Sc-IGLjcJ8aHlD28P9gtg"
            loading="lazy"
            decoding="async"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
            alt="Cyan-blue 3D flower"
            className="w-full h-full object-contain flower-img drop-shadow-[0_25px_50px_rgba(6,182,212,0.35)]"
          />
        </div>

        <div
          id="flower-mr"
          ref={flowerMrRef}
          className="absolute top-[36%] right-0 w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 will-change-transform"
          style={{
            transform: 'translate3d(190%, 0, 0) scale(0.28) rotate(-40deg)',
            opacity: 0,
          }}
        >
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7SzDmR2zc6SWJfxtvxy16ZjlS820YIjQQ1FPEYEmEJJWFXbJWwctJN2xKyPtqNmXk_6uMp5SFqIAgsoQh1IMi8rT2Et-MaDXCdeKa5XY4-eZ2fgMddVB__OAJjqBLIzJPTIhC4mT3Q5hewrwCpXPCDns3xtJyuPknuULtPwh_rEy86PFqsUSSyXiJJhfQotvZF4I-vFVmcrnc6sqsQMSPOoesan1VPQomrO2VvurGH4pP6sKt9jHudA"
            loading="lazy"
            decoding="async"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
            alt="Pearlescent flower"
            className="w-full h-full object-contain flower-img scale-x-[-1] drop-shadow-[0_30px_60px_rgba(192,132,252,0.4)]"
            style={{ filter: 'hue-rotate(15deg) brightness(1.08) contrast(1.05)' }}
          />
        </div>

        <div
          id="flower-br"
          ref={flowerBrRef}
          className="absolute top-[70%] right-0 w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 will-change-transform"
          style={{
            transform: 'translate3d(155%, 0, 0) scale(0.28) rotate(22deg)',
            opacity: 0,
          }}
        >
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiDri49_ORUdLu00HqT7KCP7IrLtj_sfU0WSo4bwb_LA9DvspC5s1hkjtfKHIxsbcglDCKI4zeHEK2CteQzPHOO27y-RTH76HY3kAF_QU6kTh_PeLLtEEuBPglQYJGzLGYBddkbjeqksR4sRm6biXMmp-MPHLiGmqofcJfyQgIzUT8M9jvJcIt-oFCDcEK2rAsoTU1RUqmGNRGRm6jfRPwa4TiS3CemC3Id2ux0Itl4LGIqS9Eai8G6Q"
            loading="lazy"
            decoding="async"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
            alt="Purple bloom"
            className="w-full h-full object-contain flower-img scale-x-[-1] drop-shadow-[0_25px_50px_rgba(124,58,237,0.35)]"
          />
        </div>
      </div>

      {/* CENTRAL CONTENT */}
      <div className="relative z-10 max-w-2xl mx-auto text-center px-4 flex flex-col items-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono tracking-[0.25em] uppercase text-zinc-400 glass-pill mb-5">
          <span>01</span>
          <span className="text-zinc-600">//</span>
          <span className="text-purple-300">Engineering Philosophy</span>
        </div>

        <h2 className="font-bold text-5xl sm:text-6xl md:text-7xl tracking-tight text-white uppercase text-glow leading-[0.95]">
          ABOUT
          <br />
          <span className="tracking-normal text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-100 to-zinc-500">
            ME
          </span>
        </h2>

        <div className="my-7 flex items-center justify-center gap-3">
          <div className="h-px w-10 bg-zinc-800" />
          <span
            id="scroll-percent"
            ref={labelRef}
            className="text-[10px] font-mono tracking-widest text-zinc-500 tabular-nums"
          >
            SCROLL REVEAL 0%
          </span>
          <div className="h-px w-10 bg-zinc-800" />
        </div>

        {/* Bio */}
        <div className="glass-pill p-5 sm:p-7 rounded-2xl text-left border border-white/10 shadow-2xl relative backdrop-blur-xl bg-black/50 mt-1 w-full max-w-xl">
          <p className="text-zinc-300 text-sm sm:text-[15px] leading-relaxed">
            I’m a B.Tech Computer Science and Engineering student at{' '}
            <span className="text-white font-medium">Guru Nanak Dev University</span>,
            aspiring to become a Software Engineer. I enjoy turning ideas into practical
            products that solve real problems while keeping the experience simple and
            intuitive.
          </p>
          <p className="text-zinc-300 text-sm sm:text-[15px] leading-relaxed mt-4">
            I believe good software is more than code that works — it should be{' '}
            <span className="text-white">
              reliable, maintainable, scalable, and enjoyable to use
            </span>
            . I learn primarily by building, experimenting, debugging, and continuously
            improving what I create.
          </p>
          <p className="text-zinc-400 text-sm leading-relaxed mt-4">
            My interests span full-stack development, Data Structures &amp; Algorithms,
            Generative AI, and UI/UX — with a focus on building products where strong
            engineering and thoughtful design work together.
          </p>

          <div className="mt-6 pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Focus: Full-Stack + AI Systems</span>
            </div>
            <span className="text-zinc-500">GNDU · 2026</span>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full mt-6 max-w-xl">
          <div className="glass-pill p-4 rounded-xl text-center border border-white/5 bg-zinc-950/50">
            <div className="font-bold text-2xl text-white">8.90</div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 mt-0.5">
              CGPA / 10
            </div>
          </div>
          <div className="glass-pill p-4 rounded-xl text-center border border-white/5 bg-zinc-950/50">
            <div className="font-bold text-2xl text-purple-300">1000+</div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 mt-0.5">
              DSA Problems
            </div>
          </div>
          <div className="glass-pill p-4 rounded-xl text-center border border-white/5 bg-zinc-950/50">
            <div className="font-bold text-xl text-cyan-300">Intern</div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 mt-0.5">
              Software Developer
            </div>
          </div>
          <div className="glass-pill p-4 rounded-xl text-center border border-white/5 bg-zinc-950/50">
            <div className="font-bold text-xl text-white">MERN</div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 mt-0.5">
              + AI Systems
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-2 mt-6 max-w-xl">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wide bg-white/5 border border-white/10 text-zinc-400">
            REACT
          </span>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wide bg-white/5 border border-white/10 text-zinc-400">
            NEXT.JS
          </span>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wide bg-white/5 border border-white/10 text-zinc-400">
            NODE.JS
          </span>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wide bg-white/5 border border-white/10 text-zinc-400">
            TYPESCRIPT
          </span>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wide bg-white/5 border border-white/10 text-zinc-400">
            MONGODB
          </span>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wide bg-white/5 border border-white/10 text-zinc-400">
            LLM / RAG
          </span>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wide bg-white/5 border border-white/10 text-zinc-400">
            DSA
          </span>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wide bg-white/5 border border-white/10 text-zinc-400">
            UI/UX
          </span>
        </div>
      </div>
    </section>
  );
};
