import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, ShieldCheck, Binary, Eye, Sparkles } from 'lucide-react';
import { portfolioContent } from '../data/content';

export const About: React.FC = () => {
  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center mb-16 text-center">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-950/40 border border-rose-500/30 text-rose-400 font-mono text-xs mb-3 shadow-md shadow-rose-950/20">
          <Terminal className="w-3.5 h-3.5 text-rose-400" />
          <span>LAYER_01 // EXECUTIVE_PROFILE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
          Executive Summary
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-rose-500 to-red-600 rounded-full mt-4" />
      </div>

      {/* Main Terminal HUD Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Terminal Window with Resume Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-8 hud-panel rounded-2xl p-6 sm:p-8 flex flex-col justify-between border-white/10"
        >
          <div>
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-rose-500" />
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="ml-2 font-mono text-xs text-slate-400">
                  usr/aviral/identity_profile.md
                </span>
              </div>
              <div className="font-mono text-[11px] text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1.5 font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>RESUME VERIFIED</span>
              </div>
            </div>

            {/* Resume Summary Text (STRICT SOURCE OF TRUTH) */}
            <div className="space-y-4 font-mono leading-relaxed text-sm sm:text-base">
              <div className="text-rose-400 text-xs font-bold uppercase tracking-wider">
                // Professional Summary:
              </div>
              <blockquote className="p-4 sm:p-5 rounded-xl bg-slate-900/80 border-l-4 border-rose-500 font-sans text-slate-200 text-base sm:text-lg leading-relaxed shadow-lg">
                "{portfolioContent.personal.summary}"
              </blockquote>
            </div>

            {/* Core Domain Badges */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-500/30 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-rose-900/50 text-rose-300">
                  <Eye className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Computer Vision</div>
                  <div className="text-[10px] font-mono text-slate-400">YOLOv8-OBB • Siamese ResNet</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-sky-950/30 border border-sky-500/30 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-sky-900/50 text-sky-300">
                  <Binary className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Astrodynamics &amp; ML</div>
                  <div className="text-[10px] font-mono text-slate-400">SGP4 Mechanics • NASA CARA</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/30 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-900/50 text-purple-300">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">GenAI &amp; Triage</div>
                  <div className="text-[10px] font-mono text-slate-400">Mistral RAG • SHAP Analytics</div>
                </div>
              </div>
            </div>
          </div>

          {/* Terminal Footer Telemetry */}
          <div className="mt-8 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between text-xs font-mono text-slate-400 gap-2">
            <div>ACADEMIC_TRACK: B.TECH CSE (AI &amp; ML, 2024–2028)</div>
            <div className="text-rose-400 font-bold bg-rose-950/50 px-2.5 py-0.5 rounded border border-rose-500/30">
              CGPA: 8.034 / 10.0
            </div>
          </div>
        </motion.div>

        {/* Blueprint HUD Telemetry Sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="lg:col-span-4 hud-panel rounded-2xl p-6 sm:p-8 flex flex-col justify-between blueprint-grid-dense border-white/10"
        >
          <div>
            <div className="font-mono text-xs text-rose-400 mb-4 flex items-center justify-between font-bold">
              <span>SYSTEM_METRICS</span>
              <span className="text-[10px] text-slate-400">REV: 2026.10</span>
            </div>

            <div className="space-y-4 font-mono text-xs">
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/10 shadow-sm">
                <div className="text-slate-400 text-[10px]">CURRENT INSTITUTION</div>
                <div className="text-white font-bold mt-0.5">Pranveer Singh Institute of Technology</div>
                <div className="text-rose-400 text-[11px] font-semibold mt-0.5">PSIT Kanpur</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/10 shadow-sm">
                <div className="text-slate-400 text-[10px]">DEGREE &amp; MAJOR</div>
                <div className="text-white font-bold mt-0.5">B.Tech in Computer Science &amp; Engineering</div>
                <div className="text-sky-400 text-[11px] font-semibold mt-0.5">Artificial Intelligence &amp; Machine Learning</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/10 shadow-sm">
                <div className="text-slate-400 text-[10px]">PRIMARY FOCUS AREAS</div>
                <div className="text-white font-bold mt-0.5">Autonomous Vision &amp; Spatial Intelligence</div>
                <div className="text-emerald-400 text-[11px] font-semibold mt-0.5">Astrodynamic Collision Risk &amp; PyTorch</div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 text-[11px] font-mono text-slate-400 space-y-1.5">
            <div className="flex justify-between">
              <span>LOCATION:</span>
              <span className="text-slate-200 font-semibold">Kanpur, India</span>
            </div>
            <div className="flex justify-between">
              <span>AVAILABILITY:</span>
              <span className="text-emerald-400 font-bold">Open for AI/ML Roles</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
