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
    
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (targetId: string) => {
    scrollTo(targetId);
  };

  return (
    <div className="min-h-screen bg-[#0b0e14] text-slate-100 font-sans relative selection:bg-rose-500/30 selection:text-white overflow-x-hidden">
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
