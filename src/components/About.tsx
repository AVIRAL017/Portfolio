import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, ShieldCheck, Binary, Eye, Sparkles } from 'lucide-react';
import { portfolioContent } from '../data/content';

export const About: React.FC = () => {
  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center mb-16 text-center">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 font-mono text-xs mb-3 shadow-sm">
          <Terminal className="w-3.5 h-3.5 text-rose-600" />
          <span>LAYER_01 // EXECUTIVE_PROFILE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
          Executive Summary
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-rose-500 via-indigo-500 to-sky-500 rounded-full mt-4" />
      </div>

      {/* Main Terminal HUD Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Terminal Window with Resume Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-8 hud-panel rounded-2xl p-6 sm:p-8 flex flex-col justify-between border-slate-200/80 shadow-xl bg-white/85 backdrop-blur-md"
        >
          <div>
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-4 mb-6">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-rose-500 shadow-sm shadow-rose-500/40" />
                <span className="w-3 h-3 rounded-full bg-amber-400 shadow-sm shadow-amber-400/40" />
                <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/40" />
                <span className="ml-2 font-mono text-xs text-slate-500 font-medium">
                  usr/aviral/identity_profile.md
                </span>
              </div>
              <div className="font-mono text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5 font-bold shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>RESUME VERIFIED</span>
              </div>
            </div>

            {/* Resume Summary Text (STRICT SOURCE OF TRUTH) */}
            <div className="space-y-4 font-mono leading-relaxed text-sm sm:text-base">
              <div className="text-rose-600 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                // Professional Summary:
              </div>
              <blockquote className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-rose-50/70 via-indigo-50/40 to-sky-50/60 border-l-4 border-rose-500 border border-slate-200/70 font-sans text-slate-800 text-base sm:text-lg leading-relaxed shadow-sm">
                "{portfolioContent.personal.summary}"
              </blockquote>
            </div>

            {/* Core Domain Badges */}
            {/* Core Domain Badges */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-gradient-to-br from-rose-50 to-pink-50/50 border border-rose-200/80 shadow-sm flex items-center gap-3">
                <div className="p-2 rounded-lg bg-rose-100 text-rose-600">
                  <Eye className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Computer Vision</div>
                  <div className="text-[10px] font-mono text-slate-500 font-medium">YOLOv8 • Siamese Networks</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-gradient-to-br from-sky-50 to-blue-50/50 border border-sky-200/80 shadow-sm flex items-center gap-3">
                <div className="p-2 rounded-lg bg-sky-100 text-sky-600">
                  <Binary className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Deep Learning &amp; ML</div>
                  <div className="text-[10px] font-mono text-slate-500 font-medium">PyTorch • Ensembles &amp; Boosting</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-gradient-to-br from-violet-50 to-purple-50/50 border border-violet-200/80 shadow-sm flex items-center gap-3">
                <div className="p-2 rounded-lg bg-violet-100 text-violet-600">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Systems &amp; Algorithms</div>
                  <div className="text-[10px] font-mono text-slate-500 font-medium">C++ • 210+ LeetCode DSA</div>
                </div>
              </div>
            </div>
          </div>

          {/* Terminal Footer Telemetry */}
          <div className="mt-8 pt-4 border-t border-slate-200/80 flex flex-wrap items-center justify-between text-xs font-mono text-slate-600 gap-2">
            <div className="font-medium">ACADEMIC_TRACK: B.TECH CSE (AI &amp; ML, 2024–2028)</div>
            <div className="text-rose-700 font-bold bg-rose-50 px-2.5 py-0.5 rounded-lg border border-rose-200 shadow-sm">
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
          className="lg:col-span-4 hud-panel rounded-2xl p-6 sm:p-8 flex flex-col justify-between blueprint-grid-dense border-slate-200/80 shadow-xl bg-white/85 backdrop-blur-md"
        >
          <div>
            <div className="font-mono text-xs text-rose-600 mb-4 flex items-center justify-between font-bold">
              <span>SYSTEM_METRICS</span>
              <span className="text-[10px] text-slate-500 font-semibold">REV: 2026.10</span>
            </div>

            <div className="space-y-4 font-mono text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50/90 border border-slate-200/80 shadow-sm">
                <div className="text-slate-500 text-[10px] font-semibold">CURRENT INSTITUTION</div>
                <div className="text-slate-900 font-bold mt-0.5">Pranveer Singh Institute of Technology</div>
                <div className="text-rose-600 text-[11px] font-semibold mt-0.5">PSIT Kanpur</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50/90 border border-slate-200/80 shadow-sm">
                <div className="text-slate-500 text-[10px] font-semibold">DEGREE &amp; MAJOR</div>
                <div className="text-slate-900 font-bold mt-0.5">B.Tech in Computer Science &amp; Engineering</div>
                <div className="text-sky-600 text-[11px] font-semibold mt-0.5">Artificial Intelligence &amp; Machine Learning</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50/90 border border-slate-200/80 shadow-sm">
                <div className="text-slate-500 text-[10px] font-semibold">PRIMARY FOCUS AREAS</div>
                <div className="text-slate-900 font-bold mt-0.5">Autonomous Vision &amp; Spatial Intelligence</div>
                <div className="text-emerald-600 text-[11px] font-semibold mt-0.5">Astrodynamic Collision Risk &amp; PyTorch</div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200/80 text-[11px] font-mono text-slate-500 space-y-1.5 font-medium">
            <div className="flex justify-between">
              <span>LOCATION:</span>
              <span className="text-slate-800 font-bold">Kanpur, India</span>
            </div>
            <div className="flex justify-between">
              <span>AVAILABILITY:</span>
              <span className="text-emerald-600 font-bold">Open for AI/ML Roles</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
