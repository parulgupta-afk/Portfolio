import React, { useState, useEffect } from 'react';
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
import { ProjectItem } from './types';
import { playCyberClick } from './utils/audioSynth';

export function App() {
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [viewMode, setViewMode] = useState<'desktop' | 'bento'>('desktop');
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false);

  // Active section tracking on scroll
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

  const handleNavigate = (sectionId: string) => {
    if (viewMode === 'bento' && sectionId !== 'bento') {
      setViewMode('desktop');
    }
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const handleInitSequence = () => {
    setShowIntro(true);
  };

  return (
    <div className="relative min-h-screen bg-[#05090c] text-[#dce3ed] overflow-x-hidden font-body-lg selection:bg-[#4cd9e0] selection:text-[#002021]">
      {/* Dynamic WebGL Shader Canvas Background */}
      <ShaderBackground />

      {/* Cinematic Intro Sequence */}
      {showIntro && (
        <IntroSequence
          onComplete={() => setShowIntro(false)}
          onSkip={() => setShowIntro(false)}
        />
      )}

      {/* Top Application Navigation */}
      <TopNavBar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onReplayIntro={handleInitSequence}
        currentView={viewMode}
        onToggleView={(mode) => setViewMode(mode)}
        onOpenMobileDrawer={() => setIsMobileDrawerOpen(true)}
      />

      {/* Main Viewport Content */}
      <main className="relative z-10">
        {viewMode === 'bento' ? (
          <BentoOverview
            onSelectProject={(project) => setSelectedProject(project)}
            onNavigateSection={handleNavigate}
          />
        ) : (
          <>
            {/* 1. Hero Section ("ENGINEERING ELEGANCE") */}
            <HeroSection
              onInitSequence={handleInitSequence}
              onExploreProjects={() => handleNavigate('projects')}
            />

            {/* 2. System Architect / Engineering Philosophy */}
            <AboutSection />

            {/* 3. System Modules / Projects Carousel */}
            <ProjectsSection
              onSelectProject={(project) => setSelectedProject(project)}
            />

            {/* 4. Performance Matrix / Capabilities */}
            <CapabilitiesSection />

            {/* 5. Experience Log / Timeline */}
            <ExperienceSection />

            {/* 6. Comms_Link / Interactive Terminal & Transmission */}
            <CommsTerminal />
          </>
        )}
      </main>

      {/* Project Detail Modal / Architectural Inspector */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Mobile Drawer Menu */}
      <MobileDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onReplayIntro={handleInitSequence}
        currentView={viewMode}
        onToggleView={(mode) => setViewMode(mode)}
      />

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

export default App;
