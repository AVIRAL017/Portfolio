import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PageTransition } from '../components/PageTransition';
import { About } from '../components/About';
import { portfolioContent } from '../data/content';
import {
  Terminal,
  ArrowRight,
  Cpu,
  Award,
  Send,
  Download,
  Sparkles,
  Binary,
  Radio
} from 'lucide-react';

export const HomePage: React.FC = () => {
  return (
    <PageTransition>
      <div className="relative min-h-screen pb-20">
        {/* Upper 3D Spatial Theater Stage (Clear zone for 3D Recon Drone) */}
        <section className="relative pt-24 pb-6 min-h-[220px] sm:min-h-[260px] flex flex-col items-center justify-end px-4 text-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-md text-slate-800 font-mono text-xs font-semibold pointer-events-auto"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-sm shadow-emerald-500/50" />
            <Radio className="w-3.5 h-3.5 text-rose-600" />
            <span>3D SPATIAL TELEMETRY // AUTONOMOUS RECON DRONE</span>
          </motion.div>
          <span className="text-[10px] font-mono text-slate-500 mt-2 font-medium">
            QUAD-ROTOR GIMBAL TELEMETRY • LIVE SPATIAL FLIGHT CONTROLLER
          </span>
        </section>

        {/* Lower Content Stage: Positioned safely BELOW 3D model with 100% Contrast */}
        <section className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Column: Executive Bio Card with Frosted White Backdrop */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-8 hud-panel rounded-3xl p-8 sm:p-10 border border-slate-200/90 bg-white/95 backdrop-blur-xl shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-6">
                {/* Live Status Pill */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 font-mono text-xs font-semibold shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>MACHINE LEARNING &amp; SOFTWARE ENGINEER</span>
                </div>

                {/* Main Headline */}
                <div className="space-y-3">
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight text-slate-900 leading-[1.1]">
                    Engineering{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-indigo-600 to-sky-600">
                      Autonomous Vision
                    </span>{' '}
                    &amp; Spatial Systems
                  </h1>
                  <p className="text-base sm:text-lg font-sans text-slate-600 max-w-2xl font-normal leading-relaxed">
                    Hi, I'm <strong className="text-slate-900 font-bold">{portfolioContent.personal.name}</strong>. B.Tech Computer Science (AI &amp; ML) undergraduate at PSIT Kanpur specializing in computer vision pipelines, deep neural networks, and scalable software systems.
                  </p>
                </div>

                {/* Primary Action Buttons */}
                <div className="flex flex-wrap items-center gap-3.5 pt-2">
                  <Link
                    to="/projects"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-rose-600 via-pink-600 to-indigo-600 hover:opacity-95 text-white font-mono text-xs sm:text-sm font-bold shadow-lg shadow-rose-500/25 transition-all hover:scale-105"
                  >
                    <span>EXPLORE DEPLOYMENTS</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-800 font-mono text-xs sm:text-sm font-bold shadow-md transition-all hover:scale-105"
                  >
                    <Send className="w-4 h-4 text-rose-600" />
                    <span>INITIATE TRANSMISSION</span>
                  </Link>

                  <a
                    href={portfolioContent.personal.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 font-mono text-xs font-semibold shadow-xs transition-all"
                  >
                    <Download className="w-4 h-4" />
                    <span>RESUME (PDF)</span>
                  </a>
                </div>
              </div>

              {/* Quick Metrics Bar Inside Frosted Card */}
              <div className="pt-8 mt-6 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 shadow-xs">
                  <div className="text-xl sm:text-2xl font-black text-rose-600 font-display">210+</div>
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">DSA Solved</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 shadow-xs">
                  <div className="text-xl sm:text-2xl font-black text-sky-600 font-display">8.03</div>
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">B.Tech CGPA</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 shadow-xs">
                  <div className="text-xl sm:text-2xl font-black text-emerald-600 font-display">★★★★</div>
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">HackerRank Gold</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 shadow-xs">
                  <div className="text-xl sm:text-2xl font-black text-indigo-600 font-display">ISRO</div>
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">Hackathon '26</div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: 3D Spatial Navigator Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="lg:col-span-4 hud-panel rounded-3xl p-7 sm:p-8 border border-slate-200/90 bg-white/95 backdrop-blur-xl shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
                  <div className="flex items-center gap-2 font-mono text-xs text-rose-600 font-bold uppercase tracking-wider">
                    <Sparkles className="w-4 h-4" />
                    <span>3D SPATIAL STUDIO</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-bold">
                    60–120 FPS
                  </span>
                </div>

                <p className="text-xs font-mono text-slate-600 leading-relaxed font-medium">
                  The persistent Three.js spatial scene glides automatically between engineering figures as you navigate pages:
                </p>

                <div className="space-y-2.5 font-mono text-xs pt-1">
                  <Link
                    to="/projects"
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200/80 hover:border-rose-200 text-slate-800 hover:text-rose-700 transition-all group"
                  >
                    <span className="flex items-center gap-2.5">
                      <Cpu className="w-4 h-4 text-rose-600" />
                      <span className="font-semibold">CAD Turntable Platform</span>
                    </span>
                    <span className="text-slate-400 group-hover:text-rose-600 font-bold">→</span>
                  </Link>

                  <Link
                    to="/skills"
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-sky-50 border border-slate-200/80 hover:border-sky-200 text-slate-800 hover:text-sky-700 transition-all group"
                  >
                    <span className="flex items-center gap-2.5">
                      <Binary className="w-4 h-4 text-sky-600" />
                      <span className="font-semibold">Orbital Satellite CubeSat</span>
                    </span>
                    <span className="text-slate-400 group-hover:text-sky-600 font-bold">→</span>
                  </Link>

                  <Link
                    to="/credentials"
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200/80 hover:border-emerald-200 text-slate-800 hover:text-emerald-700 transition-all group"
                  >
                    <span className="flex items-center gap-2.5">
                      <Award className="w-4 h-4 text-emerald-600" />
                      <span className="font-semibold">Algorithmic Data Spire</span>
                    </span>
                    <span className="text-slate-400 group-hover:text-emerald-600 font-bold">→</span>
                  </Link>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200/80 mt-6 text-[10px] font-mono text-slate-500">
                STATUS: CONTINUOUS 3D INTERPOLATION ACTIVE
              </div>
            </motion.div>
          </div>
        </section>

        {/* Embedded Executive Summary & Profile Section */}
        <About />
      </div>
    </PageTransition>
  );
};

export default HomePage;
