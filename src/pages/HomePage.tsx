import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PageTransition } from '../components/PageTransition';
import { About } from '../components/About';
import { portfolioContent } from '../data/content';
import {
  ChevronRight,
  Activity,
  FileText,
  Github,
  Linkedin,
  ArrowDown
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const [pulseActive, setPulseActive] = useState(false);

  const handleTriggerPulse = () => {
    setPulseActive(true);
    window.dispatchEvent(new CustomEvent('pipeline-pulse'));
    setTimeout(() => setPulseActive(false), 2400);
  };

  const scrollToAbout = () => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <PageTransition>
      <div className="relative min-h-screen">
        {/* Full 3D Hero Section - 100% Open & Visible */}
        <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Main Hero HUD Content (Transparent wrapper so 3D facility is 100% visible) */}
          <div className="relative z-10 max-w-5xl mx-auto w-full text-center flex flex-col items-center pointer-events-none">
            {/* Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="pointer-events-auto inline-flex items-center gap-2 px-4 py-1.5 rounded-full hud-panel border-indigo-200/80 text-indigo-700 font-mono text-xs mb-6 shadow-sm bg-white/90 backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping inline-block" />
              <span className="font-semibold tracking-wide text-slate-700">
                SYSTEM: ACTIVE // 3D PIPELINE TELEMETRY
              </span>
              <span className="text-slate-300">|</span>
              <span className="text-rose-600 font-bold">PSIT KANPUR (2024–2028)</span>
            </motion.div>

            {/* 3D Holographic Name Header */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative mb-5 select-none"
            >
              <div className="absolute -top-6 left-0 text-[10px] font-mono text-rose-600 font-bold tracking-widest hidden sm:block">
                PIPELINE_ORIGIN [0, 0, 0] // 3D_FACILITY_ACTIVE
              </div>

              <h1 className="text-6xl sm:text-8xl md:text-9xl font-display font-black tracking-tight text-slate-900 drop-shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
                <span className="relative inline-block">
                  AVIRAL
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-r from-rose-500/25 via-indigo-500/20 to-sky-500/25 blur-3xl pointer-events-none -z-10"
                  >
                    AVIRAL
                  </span>
                </span>
              </h1>

              <div className="absolute -bottom-4 right-0 text-[10px] font-mono text-sky-600 font-bold tracking-widest hidden sm:block">
                LATENT_DIM: 512-D // NASA_CARA_RESEARCH
              </div>
            </motion.div>

            {/* Subtitle / Focus Statement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="max-w-2xl mx-auto space-y-3 mb-9"
            >
              <p className="text-xl sm:text-3xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-purple-700 to-rose-600">
                Machine Learning &amp; Software Engineer
              </p>
              <p className="text-sm sm:text-base text-slate-700 font-sans leading-relaxed font-normal bg-white/70 backdrop-blur-sm p-3 rounded-2xl border border-slate-200/60 shadow-xs inline-block">
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
              <Link
                to="/projects"
                className="group relative px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold tracking-wide shadow-lg shadow-indigo-600/20 transition-all flex items-center gap-2 hover:scale-[1.02] border border-indigo-400/30"
              >
                <span>EXPLORE ARCHITECTURE</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Interactive Trigger Pipeline Pulse */}
              <button
                onClick={handleTriggerPulse}
                className={`px-5 py-3.5 rounded-xl hud-panel font-bold tracking-wide transition-all flex items-center gap-2 border ${
                  pulseActive
                    ? 'border-rose-400 bg-rose-50 text-rose-700 shadow-md shadow-rose-500/20'
                    : 'border-slate-200 text-slate-700 hover:text-indigo-600 hover:border-indigo-300 bg-white/90 shadow-xs'
                }`}
              >
                <Activity className={`w-4 h-4 ${pulseActive ? 'animate-spin text-rose-500' : 'text-indigo-500'}`} />
                <span>{pulseActive ? 'PIPELINE PULSING...' : 'TRIGGER PULSE'}</span>
              </button>

              {/* Download Resume Link with PDF Icon */}
              <a
                href={portfolioContent.personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-xl hud-panel border-slate-200 text-slate-700 hover:text-rose-600 hover:border-rose-300 font-bold transition-all flex items-center gap-2 bg-white/90 shadow-xs"
              >
                <FileText className="w-4 h-4 text-rose-500" />
                <span>RESUME (PDF)</span>
              </a>

              {/* GitHub Action */}
              <a
                href={portfolioContent.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-3.5 rounded-xl hud-panel border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 transition-all bg-white/90 shadow-xs"
              >
                <Github className="w-4 h-4" />
              </a>

              {/* LinkedIn Action */}
              <a
                href={portfolioContent.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="p-3.5 rounded-xl hud-panel border-slate-200 text-slate-600 hover:text-sky-600 hover:border-sky-300 transition-all bg-white/90 shadow-xs"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </motion.div>

            {/* Live Facility Telemetry Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-12 flex flex-wrap items-center justify-center gap-5 text-[11px] font-mono text-slate-600 bg-white/80 backdrop-blur-sm px-6 py-2.5 rounded-full border border-slate-200/70 shadow-xs"
            >
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                <span>CV: YOLOv8-OBB + SIAMESE RESNET-18</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                <span>ASTRODYNAMICS: SGP4 + NASA CARA</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>DEEP LEARNING: PYTORCH</span>
              </div>
            </motion.div>

            {/* Scroll Down Prompt */}
            <motion.button
              onClick={scrollToAbout}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="pointer-events-auto mt-8 inline-flex items-center gap-1.5 text-xs font-mono text-slate-500 hover:text-indigo-600 transition-colors animate-bounce"
            >
              <span>EXPLORE IDENTITY PROFILE</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        </section>

        {/* Embedded Executive Summary & Profile Section Below the Fold */}
        <About />
      </div>
    </PageTransition>
  );
};

export default HomePage;
