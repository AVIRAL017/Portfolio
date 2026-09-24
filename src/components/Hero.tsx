import React from 'react';
import { motion } from 'framer-motion';
import { Hero3DScene } from './Hero3DScene';
import { Hero2DFallback } from './Hero2DFallback';
import { useWebGLSupport } from '../hooks/useWebGLSupport';
import { portfolioContent } from '../data/content';
import { ArrowDown, Github, Linkedin, FileText, ChevronRight, Sparkles, Layers } from 'lucide-react';

interface HeroProps {
  onNavigate: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const isWebGL = useWebGLSupport();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 blueprint-grid overflow-hidden"
    >
      {/* 3D Neural Scene / Fallback */}
      {isWebGL ? <Hero3DScene /> : <Hero2DFallback />}

      {/* Radial vignette glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#040711]/40 via-transparent to-[#040711] pointer-events-none" />
      <div className="absolute inset-0 blueprint-radial pointer-events-none" />

      {/* Main HUD Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto w-full text-center flex flex-col items-center">
        {/* Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full hud-panel border border-cyan-500/30 text-cyan-300 font-mono text-xs mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block" />
          <span className="font-semibold tracking-wide">SYSTEM: ACTIVE // B.TECH CSE (AI &amp; ML)</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-400">PSIT KANPUR</span>
        </motion.div>

        {/* 3D Holographic Name Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mb-6"
        >
          {/* Engineering coordinate labels */}
          <div className="absolute -top-6 left-0 text-[10px] font-mono text-cyan-500/60 tracking-widest hidden sm:block">
            TENSOR_ORIGIN [0, 0, 0] // WEIGHT_MATRIX: CONVERGED
          </div>

          <h1 className="text-6xl sm:text-8xl md:text-9xl font-display font-extrabold tracking-tight text-white select-none">
            <span className="relative inline-block">
              AVIRAL
              {/* Neon Glow Underlay */}
              <span
                aria-hidden="true"
                className="absolute inset-0 text-cyan-400/20 blur-xl pointer-events-none -z-10"
              >
                AVIRAL
              </span>
            </span>
          </h1>

          <div className="absolute -bottom-4 right-0 text-[10px] font-mono text-violet-400/70 tracking-widest hidden sm:block">
            LATENT_DIM: 512-D // BACKPROP_ACTIVE
          </div>
        </motion.div>

        {/* Subtitle / Focus Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="max-w-2xl mx-auto space-y-3 mb-10"
        >
          <p className="text-xl sm:text-2xl font-display font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-violet-300">
            Computer Vision + Generative AI
          </p>
          <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
            Architecting geospatial intelligence, autonomous change detection, satellite conjunction risk models, and neural predictive pipelines.
          </p>
        </motion.div>

        {/* Action Buttons: View Projects, GitHub, LinkedIn, Resume */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 font-mono text-xs sm:text-sm"
        >
          {/* Primary View Projects */}
          <button
            onClick={() => onNavigate('#projects')}
            className="group relative px-6 py-3.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-black font-bold tracking-wide shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all flex items-center gap-2"
          >
            <span>VIEW PROJECTS</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* GitHub Profile */}
          <a
            href={portfolioContent.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3.5 rounded-lg hud-panel text-slate-200 hover:text-cyan-300 hover:border-cyan-400/60 transition-all flex items-center gap-2"
          >
            <Github className="w-4 h-4 text-cyan-400" />
            <span>GITHUB</span>
          </a>

          {/* LinkedIn Profile */}
          <a
            href={portfolioContent.personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3.5 rounded-lg hud-panel text-slate-200 hover:text-cyan-300 hover:border-cyan-400/60 transition-all flex items-center gap-2"
          >
            <Linkedin className="w-4 h-4 text-cyan-400" />
            <span>LINKEDIN</span>
          </a>

          {/* Download Resume.pdf */}
          <a
            href="/Resume.pdf"
            download="Aviral_Resume.pdf"
            className="px-5 py-3.5 rounded-lg hud-panel border border-violet-500/40 text-violet-300 hover:text-white hover:border-violet-400 hover:bg-violet-950/40 transition-all flex items-center gap-2"
          >
            <FileText className="w-4 h-4 text-violet-400" />
            <span>RESUME (PDF)</span>
          </a>
        </motion.div>

        {/* Live Architecture Micro-Telemetry HUD */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-14 w-full grid grid-cols-2 md:grid-cols-4 gap-3 text-left font-mono text-xs"
        >
          <div className="p-3 rounded-lg bg-black/40 border border-cyan-900/30 backdrop-blur-sm">
            <div className="text-[10px] text-slate-400 flex items-center gap-1">
              <Layers className="w-3 h-3 text-cyan-400" />
              <span>CORE ARCHITECTURE</span>
            </div>
            <div className="text-cyan-300 font-semibold mt-1">PyTorch / YOLOv8 / SGP4</div>
          </div>

          <div className="p-3 rounded-lg bg-black/40 border border-cyan-900/30 backdrop-blur-sm">
            <div className="text-[10px] text-slate-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-violet-400" />
              <span>FLAGSHIP SYSTEM</span>
            </div>
            <div className="text-violet-300 font-semibold mt-1">AERION Geospatial</div>
          </div>

          <div className="p-3 rounded-lg bg-black/40 border border-cyan-900/30 backdrop-blur-sm">
            <div className="text-[10px] text-slate-400">LEETCODE STATS</div>
            <div className="text-amber-400 font-semibold mt-1">210+ Problems Solved</div>
          </div>

          <div className="p-3 rounded-lg bg-black/40 border border-cyan-900/30 backdrop-blur-sm">
            <div className="text-[10px] text-slate-400">CURRENT CGPA</div>
            <div className="text-emerald-400 font-semibold mt-1">8.03 / 10.0 (PSIT)</div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          className="mt-12 flex flex-col items-center gap-1 cursor-pointer text-slate-500 hover:text-cyan-400 transition-colors"
          onClick={() => onNavigate('#about')}
        >
          <span className="font-mono text-[10px] uppercase tracking-widest">Scroll To Explore Network</span>
          <ArrowDown className="w-4 h-4 text-cyan-400" />
        </motion.div>
      </div>
    </section>
  );
};
