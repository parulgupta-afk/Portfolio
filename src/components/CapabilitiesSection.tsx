import React from 'react';
import { PROJECTS_DATA } from '../data/portfolioData';

const CATEGORIES = [
  {
    title: 'Languages',
    items: ['C++', 'JavaScript', 'TypeScript', 'SQL', 'Python'],
    evidence: ['1000+ DSA', 'HackerRank Certified (SQL)', 'Production backends'],
  },
  {
    title: 'Database',
    items: ['MySQL', 'PostgreSQL', 'MongoDB', 'SQL', 'RDBMS / DBMS'],
    evidence: ['Priceloop', 'PulseOps', 'SkyCall'],
  },
  {
    title: 'Core',
    items: ['DBMS / RDBMS', 'Operating Systems', 'Computer Networks', 'OOP', 'Data Structures & Algorithms'],
    evidence: ['Coursework', '1000+ DSA (LeetCode/GfG)', 'CGPA 8.90'],
  },
  {
    title: 'Full-stack',
    items: ['React', 'TypeScript', 'Node.js', 'Express', 'REST APIs', 'Tailwind CSS'],
    evidence: ['SkyCall', 'NutriVibe', 'Priceloop'],
  },
  {
    title: 'AI systems',
    items: ['LLM APIs', 'Gemini', 'Prompting', 'Embeddings / RAG patterns', 'AI-assisted workflows'],
    evidence: ['CodeForge', 'SkyCall', 'NutriVibe'],
  },
  {
    title: 'Systems & DevOps',
    items: ['Socket.IO / WebSockets', 'Docker', 'Auth (JWT / OAuth)', 'Background jobs'],
    evidence: ['CodeForge', 'PulseOps', 'SkyCall'],
  },
];

export const CapabilitiesSection: React.FC = () => {
  const titles = PROJECTS_DATA.map((p) => p.title).join(' · ');

  return (
    <section id="capabilities" className="py-16 sm:py-24 border-b border-white/5">
      <div className="px-4 sm:px-8 md:px-12 lg:px-16 max-w-6xl mx-auto">
        <p className="font-code-md text-[10px] tracking-[0.25em] text-[#34d399] mb-2 uppercase">Capabilities</p>
        <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-2 tracking-tight">Engineering capabilities</h2>
        <p className="text-sm text-[#8b95a5] mb-10 max-w-2xl leading-relaxed">
          Stack evidence from shipped systems — not arbitrary skill scores. Projects: {titles}.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.title}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-5 hover:border-[#34d399]/25 transition-colors"
            >
              <h3 className="font-code-md text-xs uppercase tracking-widest text-[#34d399] mb-3">{cat.title}</h3>
              <ul className="space-y-1.5 mb-4">
                {cat.items.map((item) => (
                  <li key={item} className="text-sm text-[#c5c6ca]">
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-[11px] font-code-md text-[#6b7380] border-t border-white/10 pt-3">
                Evidence: {cat.evidence.join(' · ')}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
