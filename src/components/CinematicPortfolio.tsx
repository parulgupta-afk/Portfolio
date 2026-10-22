import { Suspense, lazy, useEffect, useLayoutEffect, useRef, useState, type MouseEvent as ReactMouseEvent, type ReactNode } from 'react';
import { ArrowUpRight, Award, Check, Github, GraduationCap, Linkedin, Mail, Menu, X } from 'lucide-react';
import {
  ACHIEVEMENTS_DATA,
  EDUCATION_DATA,
  EXPERIENCE_DATA,
  OTHER_REPOS,
  PROFILE,
  PROJECTS_DATA,
} from '../data/portfolioData';
import type { ProjectItem } from '../types';
import { PixelPortrait } from './PixelPortrait';
const SkillsOrbit = lazy(() => import('./SkillsOrbit').then((m) => ({ default: m.SkillsOrbit })));
import { AboutSection } from './AboutSection';

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';

function scramble(target: string, progress: number) {
  return target
    .split('')
    .map((char, index) => {
      if (char === ' ') return ' ';
      return index < progress ? char : characters[Math.floor(Math.random() * characters.length)];
    })
    .join('');
}

/** dot -> scrambling name -> PORTFOLIO. `onReveal` fires as the overlay starts fading. */
function ReferenceIntro({ onReveal, onComplete }: { onReveal: () => void; onComplete: () => void }) {
  const [phase, setPhase] = useState<'dot' | 'name' | 'portfolio'>('dot');
  const [name, setName] = useState('');
  const [done, setDone] = useState(false);
  const wordRef = useRef<HTMLDivElement>(null);
  const skipRef = useRef<HTMLButtonElement>(null);

  const handleSkip = () => {
    if (done) return;
    setDone(true);
    onReveal();
    onComplete();
  };

  // Keep Skip button immediately easy to reach for keyboard and screen-reader users
  useEffect(() => {
    skipRef.current?.focus();
  }, []);

  // Keyboard accessibility: Escape skips intro, Tab prevents focus escaping into obscured content
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleSkip();
      } else if (e.key === 'Tab') {
        e.preventDefault();
        skipRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  // when PORTFOLIO appears, match the hero wordmark's size and position exactly so the hand-off is seamless
  useLayoutEffect(() => {
    const el = wordRef.current;
    const hero = document.querySelector<HTMLElement>('.reference-wordmark');
    if (!el || !hero) return;
    if (phase !== 'portfolio') {
      el.style.removeProperty('top');
      el.style.removeProperty('font-size');
      el.style.removeProperty('letter-spacing');
      el.style.removeProperty('line-height');
      return;
    }
    const r = hero.getBoundingClientRect();
    const cs = getComputedStyle(hero);
    el.style.top = `${r.top + r.height / 2}px`;
    el.style.fontSize = cs.fontSize;
    el.style.letterSpacing = cs.letterSpacing;
    el.style.lineHeight = cs.lineHeight;
  }, [phase]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      handleSkip();
      return;
    }
    const target = PROFILE.name.toUpperCase();
    let frame = 0;
    let finishTimer = 0;
    const interval = window.setInterval(() => {
      frame += 1;
      if (frame >= 10 && frame < 33) {
        setPhase('name');
        setName(scramble(target, Math.max(0, frame - 13)));
      } else if (frame >= 33 && frame < 42) {
        setName(target);
        setPhase('portfolio');
      } else if (frame >= 42 && frame < 57) {
        setPhase('portfolio');
      } else if (frame >= 57) {
        window.clearInterval(interval);
        setDone(true);
        onReveal();
        finishTimer = window.setTimeout(onComplete, 420);
      }
    }, 70);
    return () => {
      window.clearInterval(interval);
      window.clearTimeout(finishTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const copy = phase === 'dot' ? '' : phase === 'name' ? name : 'PORTFOLIO';
  return (
    <div
      className={`reference-intro reference-intro--${phase} ${done ? 'is-done' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Portfolio introduction"
    >
      <div className="intro-dot" />
      <div className="intro-scramble" ref={wordRef}>{copy}</div>
      <div className="intro-scanline" />
      <button
        ref={skipRef}
        className="intro-skip"
        type="button"
        aria-label="Skip introduction"
        onClick={handleSkip}
      >
        SKIP <span>+</span>
      </button>
      <span className="intro-corner">PG / 01</span>
    </div>
  );
}

function PillButton({ href, children, filled = false }: { href: string; children: ReactNode; filled?: boolean }) {
  const external = href.startsWith('http');
  return (
    <a
      className={`pill-button ${filled ? 'pill-button--filled' : ''}`}
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
    >
      {children}
      <ArrowUpRight size={13} />
    </a>
  );
}


/** Adds `is-in` to the element once it scrolls into view (stays on, so animations play once). */
function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

/** Headline whose letters rise out of a mask one after another. */
function SplitHeading({ id, lead, accent, inView }: { id: string; lead: string; accent: string; inView: boolean }) {
  let n = 0;
  const word = (text: string, cls?: string) =>
    text.split(' ').map((w, wi) => (
      <span className={`split-word ${cls ?? ''}`} key={`${text}-${wi}`}>
        {w.split('').map((c, ci) => (
          <span className="split-mask" key={ci} aria-hidden="true">
            <span className="split-char" style={{ transitionDelay: `${n++ * 38}ms` }}>{c}</span>
          </span>
        ))}
      </span>
    ));
  return (
    <h2 id={id} className={`split-heading ${inView ? 'is-in' : ''}`} aria-label={`${lead} ${accent}`}>
      {word(lead)} {word(accent, 'split-accent')}
    </h2>
  );
}

function ExperienceHeader() {
  const [ref, inView] = useInView<HTMLDivElement>(0.15);
  return (
    <div className="experience-copy" ref={ref}>
      <p className={`section-kicker kicker-fade ${inView ? 'is-in' : ''}`}>Experience &amp; education</p>
      <SplitHeading id="experience-title" lead="Where I&rsquo;ve" accent="worked" inView={inView} />
      <ExperienceTimeline />
      <EducationBlock inView={inView} />
    </div>
  );
}

function ExperienceTimeline() {
  const [ref, inView] = useInView<HTMLDivElement>(0.12);
  const [open, setOpen] = useState<string | null>(EXPERIENCE_DATA[0]?.id ?? null);
  return (
    <div ref={ref} className={`exp-list ${inView ? 'is-in' : ''}`}>
      <span className="exp-rail" aria-hidden="true" />
      {EXPERIENCE_DATA.map((e, i) => {
        const isOpen = open === e.id;
        return (
          <article
            className={`exp-row ${isOpen ? 'is-open' : ''}`}
            key={e.id}
            style={{ ['--i' as string]: i, ['--row-accent' as string]: `var(--accent-${['cyan', 'violet', 'amber', 'coral', 'blue', 'lime'][i % 6]})` }}
          >
            <button
              type="button"
              className="exp-head"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : e.id)}
              onMouseEnter={() => setOpen(e.id)}
            >
              <span className="exp-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="exp-title">
                <span className="exp-role">{e.role}</span>
                <span className="exp-company">{e.company}</span>
              </span>
              {(e.period || e.status) ? (
                <span className="exp-meta">
                  {e.period ? <span>{e.period}</span> : null}
                  {e.status ? <span>{e.status}</span> : null}
                </span>
              ) : null}
              <span className="exp-plus" aria-hidden="true"><i /><i /></span>
            </button>
            <div className="exp-body">
              <div className="exp-body-inner">
                <ul>
                  {e.bullets.map((b) => (
                    <li key={b}><Check size={12} /><span>{b}</span></li>
                  ))}
                </ul>
                <div className="experience-tech">
                  {e.techStack.map((t) => <span key={t}>{t}</span>)}
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

function EducationBlock({ inView }: { inView: boolean }) {
  return (
    <div className={`education-section-block ${inView ? 'is-in' : ''}`} id="education">
      <div className="education-header">
        <div className="education-kicker">
          <GraduationCap size={14} />
          <span>Academic Background</span>
        </div>
        <h3 className="education-title">Education</h3>
      </div>
      <div className="education-grid">
        {EDUCATION_DATA.map((edu, i) => (
          <article className="education-card" key={edu.id} style={{ ['--i' as string]: i }}>
            <div className="education-card-top">
              <div className="education-badge-group">
                <span className="education-pill">{edu.status ?? 'Undergraduate'}</span>
                <span className="education-cgpa">CGPA {edu.cgpa}</span>
              </div>
              <span className="education-period">{edu.period}</span>
            </div>
            <h4 className="education-degree">{edu.degree}</h4>
            <p className="education-institution">{edu.institution}</p>
            <ul className="education-bullets">
              {edu.details.map((d) => (
                <li key={d}><Check size={12} /><span>{d}</span></li>
              ))}
            </ul>
            <div className="education-meta-block">
              <div className="education-tech-row">
                <span className="education-tech-label">Coursework:</span>
                <div className="experience-tech">
                  {edu.coursework.map((c) => (
                    <span key={c}>{c}</span>
                  ))}
                </div>
              </div>
              {edu.certifications && edu.certifications.length > 0 && (
                <div className="education-tech-row">
                  <span className="education-tech-label">Certifications:</span>
                  <div className="experience-tech">
                    {edu.certifications.map((cert) => (
                      <span key={cert} className="education-cert-tag">
                        <Award size={11} /> {cert}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function AchievementsHeader() {
  const [ref, inView] = useInView<HTMLDivElement>(0.15);
  return (
    <div className="achievements-copy" ref={ref}>
      <p className={`section-kicker kicker-fade ${inView ? 'is-in' : ''}`}>Recognition</p>
      <SplitHeading id="achievements-title" lead="Hackathons &amp;" accent="achievements" inView={inView} />
      <p className={`achievements-intro ${inView ? 'is-in' : ''}`}>
        Verified college competition outcomes. Event names and project details are listed only when confirmed.
      </p>
      <AchievementsGrid />
    </div>
  );
}

function AchievementsGrid() {
  const [ref, inView] = useInView<HTMLDivElement>(0.12);
  return (
    <div
      ref={ref}
      className={`achievements-grid ${inView ? 'is-in' : ''}`}
      role="list"
      aria-label="Hackathons and achievements"
    >
      {ACHIEVEMENTS_DATA.map((item, i) => (
        <article
          key={item.id}
          className="achievement-card"
          role="listitem"
          style={{ ['--i' as string]: i }}
        >
          <div className="achievement-card-top">
            <span className="achievement-category">
              {item.category === 'hackathon' ? 'Hackathon' : item.category}
            </span>
            {item.highlight ? (
              <span className="achievement-highlight" aria-label={`Prize ${item.highlight}`}>
                {item.highlight}
              </span>
            ) : null}
          </div>
          <h3 className="achievement-title">{item.title}</h3>
          <p className="achievement-summary">{item.summary}</p>
          {item.detail ? <p className="achievement-detail">{item.detail}</p> : null}
        </article>
      ))}
    </div>
  );
}

function ContactPanel() {
  const [ref, inView] = useInView<HTMLDivElement>(0.2);
  const btnRef = useRef<HTMLAnchorElement>(null);
  const move = (ev: ReactMouseEvent<HTMLAnchorElement>) => {
    const el = btnRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (ev.clientX - (r.left + r.width / 2)) * 0.28;
    const y = (ev.clientY - (r.top + r.height / 2)) * 0.28;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };
  const reset = () => { if (btnRef.current) btnRef.current.style.transform = ''; };
  const ticker = Array.from({ length: 8 }, (_, i) => (
    <span key={i}>Available for work <b>✦</b> Let&rsquo;s build something <b>✦</b> Say hello <b>✦</b></span>
  ));
  return (
    <div ref={ref} className={`contact-copy contact-anim ${inView ? 'is-in' : ''}`}>
      <p className="section-kicker">{PROFILE.status}</p>
      <SplitHeading id="contact-title" lead="Let&rsquo;s" accent="talk" inView={inView} />
      <div className="contact-ticker" aria-hidden="true">
        <div className="contact-ticker-track">{ticker}{ticker}</div>
      </div>
      <div className="contact-row">
        <a className="contact-email" href={`mailto:${PROFILE.email}`}>
          <span>{PROFILE.email}</span> <ArrowUpRight size={20} />
        </a>
        <a
          ref={btnRef}
          className="contact-bubble"
          href={`mailto:${PROFILE.email}`}
          onMouseMove={move}
          onMouseLeave={reset}
          aria-label="Say hello by email"
        >
          <span>Say hello</span>
          <ArrowUpRight size={22} />
        </a>
      </div>
      <div className="social-links">
        <a href={PROFILE.github} target="_blank" rel="noreferrer" style={{ ['--d' as string]: '0ms' }}><Github size={14} /> GitHub</a>
        <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" style={{ ['--d' as string]: '90ms' }}><Linkedin size={14} /> LinkedIn</a>
        <a href="/resume.pdf" target="_blank" rel="noreferrer" style={{ ['--d' as string]: '180ms' }}><ArrowUpRight size={14} /> Resume</a>
      </div>
    </div>
  );
}

function SectionShell({ id, label, className, children }: { id: string; label: string; className: string; children: ReactNode }) {
  return (
    <section id={id} className={className} aria-labelledby={`${id}-title`}>
      <div className="section-label">{label}</div>
      {children}
    </section>
  );
}

function ProjectModal({ project, onClose }: { project: ProjectItem; onClose: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const card = cardRef.current;
    card?.querySelector<HTMLElement>('.modal-close')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return onClose();
      if (e.key !== 'Tab' || !card) return;
      const f = card.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
      opener?.focus?.();
    };
  }, [onClose]);

  return (
    <div className="reference-modal" role="dialog" aria-modal="true" aria-label={project.title} onClick={onClose}>
      <div className="reference-modal-card" ref={cardRef} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" type="button" aria-label="Close" onClick={onClose}>
          <X size={20} />
        </button>
        <p className="section-kicker">{project.category}</p>
        <h2>{project.title}</h2>
        <p>{project.fullOverview}</p>
        <div className="modal-specs">
          <div><span>Architecture</span><strong>{project.specs.architecture}</strong></div>
          <div><span>Runtime</span><strong>{project.specs.runtime}</strong></div>
          <div><span>Status</span><strong>{project.specs.status}</strong></div>
          <div><span>Security</span><strong>{project.specs.security}</strong></div>
        </div>
        <ul>
          {project.architectureDetails.map((d) => (
            <li key={d}><Check size={13} />{d}</li>
          ))}
        </ul>
        <div className="experience-tech" style={{ marginBottom: '2rem' }}>
          {project.tags.map((t) => <span key={t}>{t}</span>)}
        </div>
        <div className="modal-links">
          {project.liveDemoUrl && <a href={project.liveDemoUrl} target="_blank" rel="noreferrer">Live demo <ArrowUpRight size={13} /></a>}
          {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer">Source <ArrowUpRight size={13} /></a>}
        </div>
      </div>
    </div>
  );
}

export function CinematicPortfolio() {
  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window === 'undefined') return false;
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  const [revealed, setRevealed] = useState(() => {
    if (typeof window === 'undefined') return true;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openProject, setOpenProject] = useState<ProjectItem | null>(null);

  const [activeSection, setActiveSection] = useState('top');
  const introMountedRef = useRef(showIntro);

  // Lock body scroll while intro overlay is open
  useEffect(() => {
    document.body.style.overflow = showIntro ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [showIntro]);

  // Restore focus to top landmark when intro overlay closes
  useEffect(() => {
    if (introMountedRef.current && !showIntro) {
      const topEl = document.getElementById('top');
      if (topEl) {
        topEl.focus({ preventScroll: true });
      }
    }
    introMountedRef.current = showIntro;
  }, [showIntro]);

  // Robust viewport-based active section tracking in both scroll directions
  useEffect(() => {
    let ticking = false;

    const updateActiveSection = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Bottom of page: activate contact
      if (scrollY + windowHeight >= documentHeight - 50) {
        setActiveSection((prev) => (prev !== 'contact' ? 'contact' : prev));
        ticking = false;
        return;
      }

      // Top of page: activate top
      if (scrollY < 100) {
        setActiveSection((prev) => (prev !== 'top' ? 'top' : prev));
        ticking = false;
        return;
      }

      const activationPoint = windowHeight * 0.35;

      // Check education block first (nested inside experience section)
      const eduEl = document.getElementById('education');
      if (eduEl) {
        const eduRect = eduEl.getBoundingClientRect();
        if (eduRect.top <= activationPoint && eduRect.bottom > activationPoint) {
          setActiveSection((prev) => (prev !== 'education' ? 'education' : prev));
          ticking = false;
          return;
        }
      }

      // Check top-level sections in reverse DOM order
      const sections = ['contact', 'achievements', 'experience', 'skills', 'work', 'about'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= activationPoint) {
          setActiveSection((prev) => (prev !== id ? id : prev));
          ticking = false;
          return;
        }
      }

      setActiveSection((prev) => (prev !== 'top' ? 'top' : prev));
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateActiveSection);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updateActiveSection();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  const jump = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const links = [
    { id: 'about', label: 'About' },
    { id: 'work', label: 'Work' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className={`reference-shell ${showIntro ? 'is-intro' : 'is-live'}`}>
      {showIntro && <ReferenceIntro onReveal={() => setRevealed(true)} onComplete={() => setShowIntro(false)} />}

      <a className="skip-link" href="#top" onClick={(e) => { e.preventDefault(); document.getElementById('top')?.focus(); document.getElementById('top')?.scrollIntoView(); }}>Skip to content</a>
      <header className="reference-header">
        <a
          className="header-identity"
          href="#top"
          onClick={(event) => {
            event.preventDefault();
            jump('top');
          }}
        >
          <span className="live-dot" />
          {PROFILE.name}
        </a>
        <nav className="reference-nav" aria-label="Sections">
          {links.map((l) => {
            const isActive = activeSection === l.id;
            return (
              <a
                key={l.id}
                href={`#${l.id}`}
                className={isActive ? 'is-active' : ''}
                aria-current={isActive ? 'true' : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  jump(l.id);
                }}
              >
                {l.label}
              </a>
            );
          })}
        </nav>
        <div className="reference-utilities">
          <a href="/resume.pdf" target="_blank" rel="noreferrer">Resume</a>
          <a href={PROFILE.github} target="_blank" rel="noreferrer">GitHub</a>
          <a className="header-contact" href={`mailto:${PROFILE.email}`}>Contact</a>
        </div>
        <button
          className="mobile-menu-button"
          type="button"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation-menu"
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </header>

      {mobileOpen && (
        <div
          id="mobile-navigation-menu"
          className="reference-mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          {links.map((l) => {
            const isActive = activeSection === l.id;
            return (
              <a
                key={l.id}
                href={`#${l.id}`}
                className={isActive ? 'is-active' : ''}
                aria-current={isActive ? 'true' : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  jump(l.id);
                }}
              >
                {l.label} <ArrowUpRight size={15} />
              </a>
            );
          })}
          <a href="/resume.pdf" target="_blank" rel="noreferrer">Resume <ArrowUpRight size={15} /></a>
          <a href={PROFILE.github} target="_blank" rel="noreferrer">GitHub <Github size={15} /></a>
          <a href={`mailto:${PROFILE.email}`}>Contact <Mail size={15} /></a>
        </div>
      )}

      <main id="top" tabIndex={-1}>
        {/* ---------- Hero: the pixels assemble into the portrait ---------- */}
        <section className="reference-hero" aria-labelledby="hero-title">
          <div className="portrait-stage">
            <PixelPortrait src="/portrait-cutout.png" play={revealed} label="Pixel portrait of Parul Gupta" className="pixel-portrait" />
          </div>
          <div className="hero-vignette" />
          <h1 className="reference-wordmark" id="hero-title">PORTFOLIO</h1>
          <div className="hero-caption">
            Parul Gupta <em>{PROFILE.role}</em>
            <span>{PROFILE.email}</span>
          </div>
          <div className="hero-actions">
            <PillButton href={`mailto:${PROFILE.email}`} filled>Contact</PillButton>
            <PillButton href="/resume.pdf">Resume</PillButton>
            <PillButton href={PROFILE.github}>GitHub</PillButton>
          </div>
          <div className="hero-scroll">Scroll to explore <span /></div>
        </section>

        {/* ---------- About ---------- */}
        <AboutSection />

        {/* ---------- Work ---------- */}
        <SectionShell id="work" label="02 / Selected Work" className="projects-section">
          <span id="projects" className="section-anchor" aria-hidden="true" />
          <div className="projects-copy">
            <p className="section-kicker">Projects</p>
            <h2 id="work-title">Selected <em>work</em></h2>
            <div className="project-marquee" aria-label="Selected projects">
              {[PROJECTS_DATA.slice(0, Math.ceil(PROJECTS_DATA.length / 2)), PROJECTS_DATA.slice(Math.ceil(PROJECTS_DATA.length / 2))].map((row, rowIndex) => (
                <div className="project-marquee-window" key={rowIndex}>
                  <div className={`project-marquee-track ${rowIndex === 0 ? 'project-marquee-track--left' : 'project-marquee-track--right'}`}>
                    {[...row, ...row].map((p, index) => (
                      <article className="project-marquee-card" key={`${p.id}-${index}`}>
                        <div className="project-marquee-card-top"><span>{p.modNumber.replace('MOD_', '')}</span><span>{p.category}</span></div>
                        <h3>{p.title}</h3>
                        <p>{p.description}</p>
                        <div className="project-links">
                          <button
                            type="button"
                            aria-label={`View architectural details for ${p.title}`}
                            onClick={() => setOpenProject(p)}
                          >
                            Details <ArrowUpRight size={12} />
                          </button>
                          {p.liveDemoUrl && <a href={p.liveDemoUrl} target="_blank" rel="noreferrer">Live <ArrowUpRight size={12} /></a>}
                          {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noreferrer">Source <ArrowUpRight size={12} /></a>}
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="other-repos" aria-label="More repositories">
              {OTHER_REPOS.map((r) => (
                <a key={r.name} href={r.url} target="_blank" rel="noreferrer">{r.name} <ArrowUpRight size={10} /></a>
              ))}
            </div>
          </div>
        </SectionShell>

        {/* ---------- Skills: glass cards orbiting a particle tree ---------- */}
        <Suspense fallback={<section id="skills" className="skills-section" aria-label="Skills" style={{ minHeight: '100vh' }} />}>
          <SkillsOrbit />
        </Suspense>

        {/* ---------- Experience & Education ---------- */}
        <SectionShell id="experience" label="04 / Experience &amp; Education" className="experience-section">
          <ExperienceHeader />
        </SectionShell>

        {/* ---------- Hackathons & Achievements ---------- */}
        <SectionShell id="achievements" label="05 / Achievements" className="achievements-section">
          <span id="hackathons" className="section-anchor" aria-hidden="true" />
          <AchievementsHeader />
        </SectionShell>

        {/* ---------- Contact ---------- */}
        <SectionShell id="contact" label="06 / Contact" className="contact-section">
          <span id="connect" className="section-anchor" aria-hidden="true" />
          <ContactPanel />
        </SectionShell>
      </main>

      <footer className="reference-footer">
        <span>© {new Date().getFullYear()} {PROFILE.name}</span>
        <span><span className="live-dot" /> {PROFILE.role}</span>
      </footer>

      {openProject && <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />}
    </div>
  );
}
