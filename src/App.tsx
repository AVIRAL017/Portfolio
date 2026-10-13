import React, { useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { GlobalScene3D } from './components/GlobalScene3D';
import { CustomCursor } from './components/CustomCursor';
import { TrainingLoader } from './components/TrainingLoader';
import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { SkillsPage } from './pages/SkillsPage';
import { CredentialsPage } from './pages/CredentialsPage';
import { ContactPage } from './pages/ContactPage';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans relative selection:bg-indigo-500/20 selection:text-indigo-900 overflow-x-hidden">
      {/* Hardware-Composited Multi-Light Ambient Canvas */}
      <div className="bg-ambient-canvas" />

      {/* Persistent Global 3D Spatial Fly-Through Canvas */}
      <GlobalScene3D currentPath={location.pathname} />

      {/* Interactive Cyber HUD Cursor */}
      <CustomCursor />

      {/* Initial Neural Splash Loader */}
      {loading && <TrainingLoader onComplete={() => setLoading(false)} />}

      {/* Top HUD Navigation Bar */}
      <Navbar />

      {/* Page Routing with Animated Automatic Transitions */}
      <main className="relative z-10 min-h-screen">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/credentials" element={<CredentialsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

export default App;
