import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Hero3DScene } from './Hero3DScene';
import { Hero2DFallback } from './Hero2DFallback';
import { useWebGLSupport } from '../hooks/useWebGLSupport';
import { portfolioContent } from '../data/content';
import { ArrowDown, Github, Linkedin, FileText, ChevronRight, Sparkles, Layers, Cpu, Zap, Activity } from 'lucide-react';

interface HeroProps {
  onNavigate: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const isWebGL = useWebGLSupport();
  const [pulseActive, setPulseActive] = useState(false);

  const handleTriggerPulse = () => {
    setPulseActive(true);
    setTimeout(() => setPulseActive(false), 2400);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 blueprint-grid overflow-hidden"
    >
      {/* 3D Isometric Pipeline Scene / Fallback */}
      {isWebGL ? (
        <Hero3DScene pulseActive={pulseActive} onTriggerPulse={handleTriggerPulse} />
      ) : (
        <Hero2DFallback />
      )}

      {/* Radial ambient glow overlay (Dark Slate with Crimson & Cyan Highlights) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b0e14]/60 via-transparent to-[#0b0e14] pointer-events-none" />
      <div className="absolute inset-0 blueprint-radial pointer-events-none" />

      {/* Main HUD Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto w-full text-center flex flex-col items-center pointer-events-none">
        {/* Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="pointer-events-auto inline-flex items-center gap-2 px-4 py-1.5 rounded-full hud-panel border-rose-500/30 text-rose-300 font-mono text-xs mb-8 shadow-lg shadow-rose-950/20"
        >
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping inline-block" />
          <span className="font-semibold tracking-wide text-slate-200">
            SYSTEM: ACTIVE // 3D PIPELINE TELEMETRY
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-rose-400 font-bold">PSIT KANPUR (2024–2028)</span>
        </motion.div>

        {/* 3D Holographic Name Header - Clean, Bold, High-Contrast */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mb-6 select-none"
        >
          {/* Engineering coordinate labels */}
          <div className="absolute -top-6 left-0 text-[10px] font-mono text-rose-400 font-bold tracking-widest hidden sm:block">
            PIPELINE_ORIGIN [0, 0, 0] // 3D_FACILITY_ACTIVE
          </div>

          <h1 className="text-6xl sm:text-8xl md:text-9xl font-display font-black tracking-tight text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
            <span className="relative inline-block">
              AVIRAL
              {/* Neon Crimson Glow Underlay */}
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-r from-rose-600/30 via-red-500/20 to-sky-500/20 blur-3xl pointer-events-none -z-10"
              >
                AVIRAL
              </span>
            </span>
          </h1>

          <div className="absolute -bottom-4 right-0 text-[10px] font-mono text-sky-400 font-bold tracking-widest hidden sm:block">
            LATENT_DIM: 512-D // NASA_CARA_RESEARCH
          </div>
        </motion.div>

        {/* Subtitle / Focus Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="max-w-2xl mx-auto space-y-3 mb-10"
        >
          <p className="text-xl sm:text-3xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-rose-400">
            Machine Learning &amp; Software Engineer
          </p>
          <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
            Architecting aerial surveillance pipelines, astrodynamic collision forecasting (NASA CARA research guidelines), and high-performance full-stack deployments.
          </p>
        </motion.div>

        {/* Action Buttons: View Projects, Pulse Pipeline, Download Resume */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="pointer-events-auto flex flex-wrap items-center justify-center gap-3 sm:gap-4 font-mono text-xs sm:text-sm"
        >
          {/* Primary View Projects */}
          <button
            onClick={() => onNavigate('#projects')}
            className="group relative px-6 py-3.5 rounded-xl bg-gradient-to-r from-rose-600 via-rose-500 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold tracking-wide shadow-xl shadow-rose-600/25 transition-all flex items-center gap-2 hover:scale-[1.02] border border-rose-400/30"
          >
            <span>EXPLORE ARCHITECTURE</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Interactive Trigger Pipeline Pulse */}
          <button
            onClick={handleTriggerPulse}
            className={`px-5 py-3.5 rounded-xl hud-panel font-bold tracking-wide transition-all flex items-center gap-2 border ${
              pulseActive
                ? 'border-rose-400 bg-rose-500/20 text-rose-300 shadow-lg shadow-rose-500/30'
                : 'border-white/10 text-slate-200 hover:text-white hover:border-rose-500/40 bg-slate-900/80'
            }`}
          >
            <Activity className={`w-4 h-4 ${pulseActive ? 'animate-spin text-rose-400' : 'text-rose-500'}`} />
            <span>{pulseActive ? 'PIPELINE PULSING...' : 'TRIGGER PULSE'}</span>
          </button>

          {/* Download Resume Link with PDF Icon */}
          <a
            href={portfolioContent.personal.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3.5 rounded-xl hud-panel border-white/10 text-slate-200 hover:text-rose-400 hover:border-rose-500/40 font-bold transition-all flex items-center gap-2 bg-slate-900/80 shadow-md"
          >
            <FileText className="w-4 h-4 text-rose-400" />
            <span>RESUME (PDF)</span>
          </a>

          {/* GitHub Action */}
          <a
            href={portfolioContent.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="p-3.5 rounded-xl hud-panel border-white/10 text-slate-300 hover:text-white hover:border-white/20 transition-all bg-slate-900/80 shadow-md"
          >
            <Github className="w-4 h-4" />
          </a>

          {/* LinkedIn Action */}
          <a
            href={portfolioContent.personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="p-3.5 rounded-xl hud-panel border-white/10 text-slate-300 hover:text-sky-400 hover:border-sky-500/30 transition-all bg-slate-900/80 shadow-md"
          >
            <Linkedin className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Live Facility Telemetry Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-6 text-[11px] font-mono text-slate-400"
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            <span>CV: YOLOv8-OBB + SIAMESE RESNET-18</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            <span>ASTRODYNAMICS: SGP4 + NASA CARA</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>EXPLAINABLE AI: SHAP + MISTRAL RAG</span>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          onClick={() => onNavigate('#about')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="pointer-events-auto mt-10 text-slate-400 hover:text-rose-400 transition-colors flex flex-col items-center gap-1 text-[11px] font-mono"
          aria-label="Scroll to Executive Summary"
        >
          <span className="tracking-widest">SCROLL_DOWN</span>
          <ArrowDown className="w-4 h-4 animate-bounce text-rose-500" />
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;
