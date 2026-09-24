import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, ShieldCheck, Binary, Eye, Sparkles } from 'lucide-react';
import { portfolioContent } from '../data/content';

export const About: React.FC = () => {
  return (
    <section id="about" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center mb-12 text-center">
        <div className="flex items-center gap-2 px-3 py-1 rounded bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 font-mono text-xs mb-3">
          <Terminal className="w-3.5 h-3.5" />
          <span>SECTION_01 // CANDIDATE_PROFILE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
          Executive Summary
        </h2>
        <div className="h-0.5 w-16 bg-gradient-to-r from-cyan-400 to-violet-500 mt-4" />
      </div>

      {/* Main Terminal HUD Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Terminal Window with Resume Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-8 hud-panel rounded-2xl p-6 sm:p-8 flex flex-col justify-between"
        >
          <div>
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4 mb-6">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 font-mono text-xs text-slate-400">
                  usr/aviral/identity_profile.md
                </span>
              </div>
              <div className="font-mono text-[11px] text-cyan-400/80 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>RESUME VERIFIED</span>
              </div>
            </div>

            {/* Resume Summary Text (STRICT SOURCE OF TRUTH) */}
            <div className="space-y-4 font-mono text-slate-200 leading-relaxed text-sm sm:text-base">
              <div className="text-cyan-400/80 text-xs">
                // System Summary Statement:
              </div>
              <blockquote className="p-4 sm:p-5 rounded-xl bg-black/40 border-l-4 border-cyan-400 font-sans text-slate-200 text-base sm:text-lg leading-relaxed shadow-inner">
                "{portfolioContent.personal.summary}"
              </blockquote>
            </div>

            {/* Core Domain Badges */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-lg bg-black/30 border border-cyan-500/20 flex items-center gap-3">
                <div className="p-2 rounded bg-cyan-500/10 text-cyan-400">
                  <Eye className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Computer Vision</div>
                  <div className="text-[10px] font-mono text-slate-400">YOLOv8 • Siamese ResNet</div>
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-black/30 border border-violet-500/20 flex items-center gap-3">
                <div className="p-2 rounded bg-violet-500/10 text-violet-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Generative AI</div>
                  <div className="text-[10px] font-mono text-slate-400">RAG • Mistral Synthesis</div>
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-black/30 border border-emerald-500/20 flex items-center gap-3">
                <div className="p-2 rounded bg-emerald-500/10 text-emerald-400">
                  <Binary className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Machine Learning</div>
                  <div className="text-[10px] font-mono text-slate-400">XGBoost • Gradient Boost</div>
                </div>
              </div>
            </div>
          </div>

          {/* Terminal Footer Telemetry */}
          <div className="mt-8 pt-4 border-t border-cyan-500/15 flex flex-wrap items-center justify-between text-xs font-mono text-slate-400 gap-2">
            <div>ACADEMIC_STAND: 2ND YEAR B.TECH (2024–2028)</div>
            <div className="text-cyan-300">CGPA: 8.03 / 10</div>
          </div>
        </motion.div>

        {/* Blueprint HUD Telemetry Sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="lg:col-span-4 hud-panel rounded-2xl p-6 sm:p-8 flex flex-col justify-between blueprint-grid-dense border-cyan-500/30"
        >
          <div>
            <div className="font-mono text-xs text-cyan-400 mb-4 flex items-center justify-between">
              <span>SYSTEM_METRICS</span>
              <span className="text-[10px] text-slate-500">REV: 2026.09</span>
            </div>

            <div className="space-y-4 font-mono text-xs">
              <div className="p-3 rounded-lg bg-black/50 border border-slate-800">
                <div className="text-slate-400 text-[10px]">CURRENT INSTITUTION</div>
                <div className="text-white font-bold mt-0.5">Pranveer Singh Institute of Technology</div>
                <div className="text-cyan-400 text-[11px] mt-0.5">PSIT Kanpur</div>
              </div>

              <div className="p-3 rounded-lg bg-black/50 border border-slate-800">
                <div className="text-slate-400 text-[10px]">DEGREE &amp; MAJOR</div>
                <div className="text-white font-bold mt-0.5">B.Tech in Computer Science</div>
                <div className="text-violet-400 text-[11px] mt-0.5">Artificial Intelligence &amp; Machine Learning</div>
              </div>

              <div className="p-3 rounded-lg bg-black/50 border border-slate-800">
                <div className="text-slate-400 text-[10px]">PRIMARY FOCUS AREAS</div>
                <div className="text-white font-bold mt-0.5">Autonomous Vision &amp; Spatial AI</div>
                <div className="text-emerald-400 text-[11px] mt-0.5">Predictive Modeling &amp; PyTorch</div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] font-mono text-slate-400 space-y-1">
            <div className="flex justify-between">
              <span>LOCATION:</span>
              <span className="text-slate-200">Kanpur, India</span>
            </div>
            <div className="flex justify-between">
              <span>AVAILABILITY:</span>
              <span className="text-emerald-400">Open for AI/ML Roles</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
