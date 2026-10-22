import { useRef, type CSSProperties, type MouseEvent as ReactMouseEvent } from 'react';
import { Award, BadgeCheck, GraduationCap, Trophy } from 'lucide-react';
import { ACHIEVEMENTS_DATA, EDUCATION_DATA } from '../data/portfolioData';
import { SplitHeading, useCountUp, useInView } from './motion';
import '../education.css';

const RING_R = 54;
const RING_C = 2 * Math.PI * RING_R;

/** Deterministic confetti so SSR/StrictMode renders match. */
const CONFETTI = Array.from({ length: 22 }, (_, i) => {
  const angle = (i / 22) * Math.PI * 2 + (i % 3) * 0.2;
  const dist = 70 + ((i * 37) % 70);
  return {
    x: Math.cos(angle) * dist,
    y: Math.sin(angle) * dist - 20,
    r: (i * 53) % 360,
    delay: (i % 6) * 40,
    color: ['#ffb347', '#ff4d5e', '#e04bff', '#5b86ff', '#2fe0c8', '#b6f23c'][i % 6],
  };
});

function StatTile({ value, suffix = '', label, decimals = 0, active }: { value: number; suffix?: string; label: string; decimals?: number; active: boolean }) {
  const shown = useCountUp(value, active, 1700, decimals);
  return (
    <div className="edu-stat">
      <strong aria-hidden="true">{shown}{suffix}</strong>
      <span className="sr-only">{value.toLocaleString('en-IN')}{suffix}</span>
      <span>{label}</span>
    </div>
  );
}

/** Mouse-follow tilt + spotlight. Skipped for touch and reduced motion. */
function useTilt<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const onMove = (e: ReactMouseEvent<T>) => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty('--rx', `${(0.5 - py) * 8}deg`);
    el.style.setProperty('--ry', `${(px - 0.5) * 10}deg`);
    el.style.setProperty('--mx', `${px * 100}%`);
    el.style.setProperty('--my', `${py * 100}%`);
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };
  return { ref, onMouseMove: onMove, onMouseLeave: onLeave };
}

function AchievementCard({ item, index, active }: { item: (typeof ACHIEVEMENTS_DATA)[number]; index: number; active: boolean }) {
  const tilt = useTilt<HTMLElement>();
  const featured = Boolean(item.prizeValue);
  const prize = useCountUp(item.prizeValue ?? 0, active && featured, 1900);
  const Icon = featured ? Trophy : Award;
  return (
    <article
      {...tilt}
      className={`ach-card ${featured ? 'ach-card--gold' : ''}`}
      style={{ ['--i' as string]: index } as CSSProperties}
    >
      {featured && (
        <div className="ach-confetti" aria-hidden="true">
          {CONFETTI.map((c, i) => (
            <i
              key={i}
              style={{ ['--x' as string]: `${c.x}px`, ['--y' as string]: `${c.y}px`, ['--r' as string]: `${c.r}deg`, ['--d' as string]: `${c.delay}ms`, background: c.color } as CSSProperties}
            />
          ))}
        </div>
      )}
      <div className="ach-top">
        <span className="ach-icon"><Icon size={20} /></span>
        <span className="ach-category">{item.category === 'hackathon' ? 'Hackathon' : item.category}</span>
        {featured && (
          <span className="ach-prize" aria-label={`Prize ${item.highlight}`}>
            <span aria-hidden="true">₹{prize}</span>
          </span>
        )}
      </div>
      <h3>{item.title}</h3>
      <p>{item.summary}</p>
      {item.detail ? <p className="ach-detail">{item.detail}</p> : null}
    </article>
  );
}

export function EducationAchievements() {
  const [ref, inView] = useInView<HTMLDivElement>(0.12);
  const [ringRef, ringIn] = useInView<HTMLDivElement>(0.3);
  const [achRef, achIn] = useInView<HTMLDivElement>(0.25);
  const tilt = useTilt<HTMLElement>();
  const cgpa = useCountUp(EDUCATION_DATA.cgpaValue, ringIn, 1900, 2);
  const offset = RING_C * (1 - EDUCATION_DATA.cgpaValue / 10);

  return (
    <div className="education-copy edu-copy" ref={ref}>
      <p className={`section-kicker kicker-fade ${inView ? 'is-in' : ''}`}>Academics &amp; recognition</p>
      <SplitHeading id="education-title" lead="Education &amp;" accent="achievements" inView={inView} />

      <div className={`edu-stats ${inView ? 'is-in' : ''}`}>
        <StatTile value={EDUCATION_DATA.cgpaValue} decimals={2} suffix="/10" label="CGPA" active={inView} />
        <StatTile value={EDUCATION_DATA.dsaSolved} suffix="+" label="DSA problems solved" active={inView} />
        <StatTile value={EDUCATION_DATA.certifications.length} label="HackerRank certificates" active={inView} />
      </div>

      <div className={`edu-grid ${inView ? 'is-in' : ''}`}>
        <article className="edu-degree" {...tilt}>
          <div className="edu-degree-text">
            <span className="edu-badge"><GraduationCap size={14} /> Degree</span>
            <h3>{EDUCATION_DATA.degree}</h3>
            <p className="edu-uni">{EDUCATION_DATA.university}</p>
            <p className="edu-period"><i aria-hidden="true" />{EDUCATION_DATA.period}</p>
            <p className="edu-subhead">Relevant coursework</p>
            <ul className="edu-chips">
              {EDUCATION_DATA.coursework.map((c, i) => (
                <li key={c} style={{ ['--i' as string]: i } as CSSProperties}>{c}</li>
              ))}
            </ul>
          </div>
          <div className={`edu-ring ${ringIn ? 'is-in' : ''}`} ref={ringRef} role="img" aria-label={`CGPA ${EDUCATION_DATA.cgpa}`}>
            <svg viewBox="0 0 128 128" aria-hidden="true">
              <defs>
                <linearGradient id="edu-ring-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#e04bff" />
                  <stop offset=".55" stopColor="#5b86ff" />
                  <stop offset="1" stopColor="#2fe0c8" />
                </linearGradient>
              </defs>
              <circle className="edu-ring-track" cx="64" cy="64" r={RING_R} />
              <circle className="edu-ring-bar" cx="64" cy="64" r={RING_R} strokeDasharray={RING_C} style={{ ['--offset' as string]: offset, ['--circ' as string]: RING_C } as CSSProperties} />
            </svg>
            <div className="edu-ring-label" aria-hidden="true">
              <strong>{cgpa}</strong>
              <span>CGPA / 10</span>
            </div>
          </div>
        </article>

        <article className="edu-certs">
          <p className="edu-subhead">Certifications</p>
          <ul>
            {EDUCATION_DATA.certifications.map((cert, i) => (
              <li key={cert.name} style={{ ['--i' as string]: i } as CSSProperties}>
                <BadgeCheck size={22} />
                <span>
                  <strong>{cert.name}</strong>
                  <em>{cert.issuer} certified</em>
                </span>
              </li>
            ))}
          </ul>
        </article>
      </div>

      <div ref={achRef} className={`ach-wrap ${achIn ? 'is-in' : ''}`}>
        <p className="edu-subhead ach-heading">Achievements &amp; highlights</p>
        <div className="ach-grid" role="list" aria-label="Achievements and highlights">
          {ACHIEVEMENTS_DATA.map((item, i) => (
            <div role="listitem" key={item.id} className={item.prizeValue || ACHIEVEMENTS_DATA.length <= 2 ? 'ach-slot ach-slot--wide' : 'ach-slot'}>
              <AchievementCard item={item} index={i} active={achIn} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
