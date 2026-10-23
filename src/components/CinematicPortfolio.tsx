import { Suspense, lazy, useEffect, useLayoutEffect, useRef, useState, type MouseEvent as ReactMouseEvent, type ReactNode } from 'react';
import { ArrowUpRight, Check, Github, Linkedin, Mail, Menu, X } from 'lucide-react';
import {
  EXPERIENCE_DATA,
  OTHER_REPOS,
  PROFILE,
  PROJECTS_DATA,
} from '../data/portfolioData';
import type { ProjectItem } from '../types';
import { PixelPortrait } from './PixelPortrait';
const SkillsOrbit = lazy(() => import('./SkillsOrbit').then((m) => ({ default: m.SkillsOrbit })));
import { AboutSection } from './AboutSection';
import { EducationAchievements } from './EducationAchievements';
import { SplitHeading, useInView } from './motion';

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


function ExperienceHeader() {
  const [ref, inView] = useInView<HTMLDivElement>(0.15);
  return (
    <div className="experience-copy" ref={ref}>
      <p className={`section-kicker kicker-fade ${inView ? 'is-in' : ''}`}>Professional experience</p>
      <SplitHeading id="experience-title" lead="Where I&rsquo;ve" accent="built" inView={inView} />
      <ExperienceTimeline />
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


/** Section ids in DOM order. The hero is tracked as 'top'. Keep in sync with the <SectionShell id> values below. */
const SECTION_IDS = ['about', 'skills', 'work', 'experience', 'education', 'contact'] as const;

function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState('top');
  useEffect(() => {
    const targets: Array<{ id: string; el: Element }> = [];
    const hero = document.querySelector('.reference-hero');
    if (hero) targets.push({ id: 'top', el: hero });
    ids.forEach((id) => {
      // `data-track` wrappers stay mounted when a section swaps its own root (e.g. lazy-loaded skills)
      const el = document.querySelector(`[data-track="${id}"]`) ?? document.getElementById(id);
      if (el) targets.push({ id, el });
    });
    const visible = new Set<string>();
    const pick = () => {
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) return setActive(ids[ids.length - 1]);
      // last section in DOM order that currently crosses the band
      const current = [...targets].reverse().find((t) => visible.has(t.id));
      if (current) setActive(current.id);
    };
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const id = targets.find((t) => t.el === e.target)?.id;
          if (!id) return;
          if (e.isIntersecting) visible.add(id);
          else visible.delete(id);
        });
        pick();
      },
      { rootMargin: '-35% 0px -60% 0px', threshold: 0 },
    );
    targets.forEach((t) => io.observe(t.el));
    window.addEventListener('scroll', pick, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', pick);
    };
  }, [ids]);
  return active;
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
  const [marqueePaused, setMarqueePaused] = useState(false);

  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Lock body scroll while intro overlay is open
  useEffect(() => {
    document.body.style.overflow = showIntro ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [showIntro]);

  // Active section = the section crossing a thin band near the upper-middle of the viewport
  const activeSection = useActiveSection(SECTION_IDS);

  // Mobile menu: Escape closes and returns focus to the toggle; menu closes if the viewport grows past the mobile breakpoint
  useEffect(() => {
    if (!mobileOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const mq = window.matchMedia('(min-width: 861px)');
    const onChange = () => mq.matches && setMobileOpen(false);
    window.addEventListener('keydown', close);
    mq.addEventListener('change', onChange);
    return () => {
      window.removeEventListener('keydown', close);
      mq.removeEventListener('change', onChange);
    };
  }, [mobileOpen]);

  const jump = (id: string) => {
    setMobileOpen(false);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  };

  const modalOpen = showIntro || openProject !== null;

  const links = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'work', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className={`reference-shell ${showIntro ? 'is-intro' : 'is-live'}`}>
      {showIntro && <ReferenceIntro onReveal={() => setRevealed(true)} onComplete={() => setShowIntro(false)} />}

      <a className="skip-link" tabIndex={modalOpen ? -1 : undefined} href="#top" onClick={(e) => { e.preventDefault(); document.getElementById('top')?.focus(); document.getElementById('top')?.scrollIntoView(); }}>Skip to content</a>
      <header className="reference-header" inert={modalOpen}>
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
          ref={menuButtonRef}
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
        <nav id="mobile-navigation-menu" className="reference-mobile-menu" aria-label="Mobile navigation">
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
        </nav>
      )}

      <main id="top" tabIndex={-1} inert={modalOpen}>
        {/* ---------- Hero: the pixels assemble into the portrait ---------- */}
        <section className="reference-hero" aria-labelledby="hero-title">
          <div className="portrait-stage">
            <PixelPortrait src="/portrait-cutout.png" play={revealed} label="Pixel portrait of Parul Gupta" className="pixel-portrait" />
          </div>
          <div className="hero-vignette" />
          <h1 className="reference-wordmark" id="hero-title"><span className="sr-only">{PROFILE.name} — </span>PORTFOLIO</h1>
          <div className="hero-caption">
            <strong className="hero-name">{PROFILE.name}</strong>
            <em>{PROFILE.role}</em>
            <p className="hero-edu">{PROFILE.education}</p>
            <p className="hero-intro">{PROFILE.tagline}</p>
          </div>
          <div className="hero-actions">
            <button type="button" className="pill-button pill-button--filled" onClick={() => jump('work')}>
              View Projects <ArrowUpRight size={13} />
            </button>
            <PillButton href="/resume.pdf">View Resume</PillButton>
            <PillButton href={`mailto:${PROFILE.email}`}>Contact Me</PillButton>
            <span className="hero-social">
              <a href={PROFILE.github} target="_blank" rel="noreferrer" aria-label="GitHub profile (opens in a new tab)"><Github size={16} /></a>
              <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile (opens in a new tab)"><Linkedin size={16} /></a>
            </span>
          </div>
          <div className="hero-scroll">Scroll to explore <span /></div>
        </section>

        {/* ---------- About ---------- */}
        <AboutSection />

        {/* ---------- Skills ---------- */}
        <div data-track="skills">
          <Suspense fallback={<section id="skills" className="skills-section" aria-label="Skills" style={{ minHeight: '100vh' }} />}>
            <SkillsOrbit />
          </Suspense>
        </div>

        {/* ---------- Projects ---------- */}
        <SectionShell id="work" label="03 / Selected Work" className="projects-section">
          <div className="projects-copy">
            <p className="section-kicker">Projects</p>
            <h2 id="work-title">Selected <em>work</em></h2>
            <div className="project-marquee-controls">
              <button type="button" className="marquee-toggle" aria-pressed={marqueePaused} onClick={() => setMarqueePaused((v) => !v)}>
                {marqueePaused ? 'Play motion' : 'Pause motion'}
              </button>
            </div>
            <div className={`project-marquee ${marqueePaused ? 'is-paused' : ''}`} role="group" aria-label="Selected projects">
              {[PROJECTS_DATA.slice(0, Math.ceil(PROJECTS_DATA.length / 2)), PROJECTS_DATA.slice(Math.ceil(PROJECTS_DATA.length / 2))].map((row, rowIndex) => (
                <div className="project-marquee-window" key={rowIndex}>
                  <div className={`project-marquee-track ${rowIndex === 0 ? 'project-marquee-track--left' : 'project-marquee-track--right'}`}>
                    {[...row, ...row].map((p, index) => {
                      const isCopy = index >= row.length; // second pass only exists to make the loop seamless
                      return (
                      <article
                        className="project-marquee-card"
                        key={`${p.id}-${index}`}
                        data-copy={isCopy ? 'true' : undefined}
                        aria-hidden={isCopy ? true : undefined}
                        inert={isCopy}
                      >
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
                      );
                    })}
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

        {/* ---------- Experience ---------- */}
        <SectionShell id="experience" label="04 / Experience" className="experience-section">
          <ExperienceHeader />
        </SectionShell>

        {/* ---------- Education & Achievements ---------- */}
        <SectionShell id="education" label="05 / Education" className="education-section">
          <EducationAchievements />
        </SectionShell>

        {/* ---------- Contact ---------- */}
        <SectionShell id="contact" label="06 / Contact" className="contact-section justify-start">
          <ContactPanel />
        </SectionShell>
      </main>

      <footer className="reference-footer" inert={modalOpen}>
        <span>© {new Date().getFullYear()} {PROFILE.name}</span>
        <span><span className="live-dot" /> {PROFILE.role}</span>
      </footer>

      {openProject && <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />}
    </div>
  );
}
