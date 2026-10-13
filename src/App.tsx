import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Competitive } from './components/Competitive';
import { Achievements } from './components/Achievements';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { TrainingLoader } from './components/TrainingLoader';
import { SectionDivider } from './components/SectionDivider';
import { useLenis } from './hooks/useLenis';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const { scrollTo } = useLenis();

  useEffect(() => {
    const sections = ['hero', 'about', 'projects', 'skills', 'competitive', 'achievements', 'education', 'contact'];
    const elements = sections.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        // Find visible section with highest intersection ratio
        const visibleEntry = entries.find((e) => e.isIntersecting);
        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleNavigate = (targetId: string) => {
    scrollTo(targetId);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans relative selection:bg-indigo-500/20 selection:text-indigo-900 overflow-x-hidden">
      {/* Hardware-Composited Ambient Gradients Layer */}
      <div className="bg-ambient-canvas" />

      {/* Interactive Cyber Cursor */}
      <CustomCursor />

      {/* Futuristic Training Neural Loader */}
      {loading && <TrainingLoader onComplete={() => setLoading(false)} />}

      {/* Top HUD Navigation Bar */}
      <Navbar onNavigate={handleNavigate} activeSection={activeSection} />

      {/* Main Content Sections */}
      <main className="relative">
        <Hero onNavigate={handleNavigate} />

        <SectionDivider label="LAYER_01 // INPUT_FEED" step="EPOCH_01" />
        <About />

        <SectionDivider label="LAYER_02 // CONV_FEATURE_MAPS" step="EPOCH_15" />
        <Projects />

        <SectionDivider label="LAYER_03 // TENSOR_COEFFICIENTS" step="EPOCH_28" />
        <Skills />

        <SectionDivider label="LAYER_04 // ALGORITHMIC_BENCHMARKS" step="EPOCH_38" />
        <Competitive />

        <SectionDivider label="LAYER_05 // VALIDATION_CREDENTIALS" step="EPOCH_45" />
        <Achievements />

        <SectionDivider label="LAYER_06 // ACADEMIC_TOPOLOGY" step="EPOCH_48" />
        <Education />

        <SectionDivider label="OUTPUT_LAYER // CONVERGENCE" step="EPOCH_50" />
        <Contact />
      </main>

      {/* Footer duplicating nav */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default App;
