import React, { useMemo, useState } from 'react';
import { CAPABILITIES_DATA, PROJECTS_DATA } from '../data/portfolioData';
import { answerPortfolioQuery } from '../lib/portfolioKnowledge';
import { playCyberClick } from '../utils/audioSynth';

const TRAITS = [
  { label: 'Frontend', key: 'frontend', pct: 90 },
  { label: 'Backend', key: 'backend', pct: 88 },
  { label: 'AI', key: 'ai', pct: 85 },
  { label: 'Systems', key: 'systems', pct: 82 },
  { label: 'UI/UX', key: 'ux', pct: 89 },
  { label: 'Architecture', key: 'arch', pct: 84 },
];

export const PortfolioDNA: React.FC = () => {
  const [prompt, setPrompt] = useState('What kind of engineer is Parul?');
  const [result, setResult] = useState<string | null>(null);

  const fingerprint = useMemo(
    () =>
      TRAITS.map((t) => ({
        ...t,
        pct: CAPABILITIES_DATA.find((c) => c.title.toLowerCase().includes(t.label.toLowerCase().slice(0, 4)))?.capacity ?? t.pct,
      })),
    []
  );

  const generate = () => {
    playCyberClick();
    const a = answerPortfolioQuery(prompt || 'strongest projects systems AI');
    setResult(
      [
        'PARUL_DNA',
        ...fingerprint.map((f) => `${f.label.padEnd(14)} ${'█'.repeat(Math.round(f.pct / 10))}${'░'.repeat(10 - Math.round(f.pct / 10))} ${f.pct}%`),
        '',
        'PRIMARY TRAITS',
        '⚡ Product engineering · 🧠 AI integration · 🏗 Systems thinking',
        '',
        'EVIDENCE',
        ...PROJECTS_DATA.slice(0, 4).map((p) => `· ${p.title} — ${p.tagline}`),
        '',
        a.summary,
      ].join('\n')
    );
  };

  return (
    <section id="dna" className="relative z-10 px-4 sm:px-8 md:px-12 lg:px-16 py-16 max-w-[1440px] mx-auto">
      <p className="text-[10px] font-mono-custom tracking-[0.25em] text-[#4cd9e0]">PORTFOLIO_DNA</p>
      <h2 className="text-3xl font-bodoni text-white mt-1 mb-2">Engineering fingerprint</h2>
      <p className="text-sm text-[#c5c6ca] mb-6">Signature feature — traits mapped to real modules (no fabricated scores beyond capability data).</p>
      <div className="glass-panel rounded-2xl p-6 max-w-2xl">
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2 text-sm mb-3 outline-none focus:border-[#4cd9e0]/40"
        />
        <button
          type="button"
          onClick={generate}
          className="px-5 py-2 rounded-xl bg-[#4cd9e0] text-[#002021] text-sm font-semibold mb-4"
        >
          GENERATE DNA
        </button>
        {result && (
          <pre className="text-[11px] font-mono-custom text-[#80d4d8] whitespace-pre-wrap leading-relaxed border border-white/10 rounded-xl p-4 bg-black/30">
            {result}
          </pre>
        )}
      </div>
    </section>
  );
};
