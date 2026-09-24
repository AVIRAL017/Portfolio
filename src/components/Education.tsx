import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, Award, BookOpen, CheckCircle } from 'lucide-react';
import { portfolioContent } from '../data/content';

export const Education: React.FC = () => {
  const edu = portfolioContent.education;

  return (
    <section id="education" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center mb-16 text-center">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/40 text-cyan-300 font-mono text-xs mb-3 shadow-[0_0_12px_rgba(0,240,255,0.2)]">
          <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
          <span>SECTION_06 // ACADEMIC_FOUNDATION</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
          Education &amp; Background
        </h2>
        <div className="h-0.5 w-20 bg-gradient-to-r from-cyan-400 to-violet-500 mt-4" />
      </div>

      {/* Main Education HUD Card */}
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="hud-panel rounded-2xl p-7 sm:p-9 border-cyan-400/30 relative overflow-hidden"
        >
          {/* Top Decorative Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-cyan-500/20 mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                  {edu.degree}
                </h3>
                <p className="text-sm font-mono text-cyan-300 font-semibold mt-0.5">
                  Specialization: {edu.specialization}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 font-mono text-xs font-bold shadow-[0_0_12px_rgba(52,211,153,0.25)]">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>CURRENT STATUS: {edu.status.toUpperCase()}</span>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-700/80">
              <div className="text-[11px] font-mono text-slate-300 flex items-center gap-1.5 mb-1">
                <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                <span>INSTITUTION</span>
              </div>
              <div className="text-base font-display font-bold text-white">
                {edu.institution}
              </div>
              <div className="text-xs font-mono text-cyan-300 mt-0.5">Kanpur, India</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-700/80">
              <div className="text-[11px] font-mono text-slate-300 flex items-center gap-1.5 mb-1">
                <Calendar className="w-3.5 h-3.5 text-violet-400" />
                <span>TIMELINE</span>
              </div>
              <div className="text-base font-display font-bold text-white">
                {edu.duration}
              </div>
              <div className="text-xs font-mono text-violet-300 mt-0.5">4-Year Degree Track</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/70 border border-cyan-500/40">
              <div className="text-[11px] font-mono text-slate-300 flex items-center gap-1.5 mb-1">
                <Award className="w-3.5 h-3.5 text-emerald-400" />
                <span>CUMULATIVE CGPA</span>
              </div>
              <div className="text-2xl font-display font-black text-emerald-400">
                {edu.cgpa}
              </div>
              <div className="text-xs font-mono text-slate-300 mt-0.5">Academic Standing</div>
            </div>
          </div>

          {/* Coursework & Focus Domains */}
          <div className="bg-slate-900/60 p-5 rounded-xl border border-cyan-500/30 font-mono text-xs text-slate-200 space-y-2">
            <div className="text-cyan-300 font-bold uppercase tracking-wider text-[11px]">
              Core Curriculum &amp; Specialization Modules:
            </div>
            <p className="font-sans leading-relaxed text-slate-200">
              Data Structures &amp; Algorithms, Object-Oriented Programming, Database Management Systems (MongoDB/SQL), Operating Systems, Neural Networks, Computer Vision Architecture, Deep Learning Systems, and Machine Learning Theory.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
