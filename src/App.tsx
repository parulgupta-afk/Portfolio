import React, { useState, useEffect, useCallback } from 'react';
import { ShaderBackground } from './components/ShaderBackground';
import { IntroSequence } from './components/IntroSequence';
import { TopNavBar } from './components/TopNavBar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ProjectModal } from './components/ProjectModal';
import { CapabilitiesSection } from './components/CapabilitiesSection';
import { ExperienceSection } from './components/ExperienceSection';
import { CommsTerminal } from './components/CommsTerminal';
import { BentoOverview } from './components/BentoOverview';
import { MobileDrawer } from './components/MobileDrawer';
import { Footer } from './components/Footer';
import { CommandCenter } from './components/CommandCenter';
import { TelemetryHUD } from './components/TelemetryHUD';
import { RecruiterMode } from './components/RecruiterMode';
import { ProjectItem } from './types';
import { playCyberClick } from './utils/audioSynth';

export function App() {
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [viewMode, setViewMode] = useState<'desktop' | 'bento'>('desktop');
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [recruiterOpen, setRecruiterOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'projects', 'capabilities', 'experience', 'connect'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ⌘K / Ctrl+K command center
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isK = e.key.toLowerCase() === 'k';
      if ((e.metaKey || e.ctrlKey) && isK) {
        e.preventDefault();
        setCommandOpen((o) => !o);
        playCyberClick();
      }
      if (e.key === 'Escape') {
        setCommandOpen(false);
        setRecruiterOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleNavigate = useCallback((sectionId: string) => {
    if (viewMode === 'bento' && sectionId !== 'bento') {
      setViewMode('desktop');
    }
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  }, [viewMode]);

  const handleInitSequence = () => {
    setShowIntro(true);
  };

  return (
    <div className="relative min-h-screen bg-[#05090c] text-[#dce3ed] overflow-x-hidden font-body-lg selection:bg-[#4cd9e0] selection:text-[#002021]">
      <ShaderBackground />

      {showIntro && (
        <IntroSequence
          onComplete={() => setShowIntro(false)}
          onSkip={() => setShowIntro(false)}
        />
      )}

      <TopNavBar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onReplayIntro={handleInitSequence}
        currentView={viewMode}
        onToggleView={(mode) => setViewMode(mode)}
        onOpenMobileDrawer={() => setIsMobileDrawerOpen(true)}
        onOpenCommand={() => setCommandOpen(true)}
        onOpenRecruiter={() => setRecruiterOpen(true)}
      />

      <main className="relative z-10">
        {viewMode === 'bento' ? (
          <BentoOverview
            onSelectProject={(project) => setSelectedProject(project)}
            onNavigateSection={handleNavigate}
          />
        ) : (
          <>
            <HeroSection
              onInitSequence={handleInitSequence}
              onExploreProjects={() => handleNavigate('projects')}
            />
            <AboutSection />
            <ProjectsSection onSelectProject={(project) => setSelectedProject(project)} />
            <CapabilitiesSection />
            <ExperienceSection />
            <CommsTerminal />
          </>
        )}
      </main>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />

      <MobileDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onReplayIntro={handleInitSequence}
        currentView={viewMode}
        onToggleView={(mode) => setViewMode(mode)}
      />

      <CommandCenter
        open={commandOpen}
        onClose={() => setCommandOpen(false)}
        onNavigate={handleNavigate}
        onSelectProject={(p) => setSelectedProject(p)}
        onOpenRecruiter={() => setRecruiterOpen(true)}
        onToggleBento={() => setViewMode((m) => (m === 'bento' ? 'desktop' : 'bento'))}
      />

      <RecruiterMode
        open={recruiterOpen}
        onClose={() => setRecruiterOpen(false)}
        onSelectProject={(p) => setSelectedProject(p)}
      />

      {!showIntro && <TelemetryHUD compact />}

      <Footer />
    </div>
  );
}

export default App;
