import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, BookOpen, CheckCircle, MapPin } from 'lucide-react';
import { portfolioContent } from '../data/content';

export const Education: React.FC = () => {
  const educationList = portfolioContent.education;

  return (
    <section id="education" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center mb-16 text-center">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono text-xs mb-3 shadow-sm">
          <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
          <span>LAYER_06 // ACADEMIC_TOPOLOGY</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
          Education &amp; Background
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-emerald-500 via-sky-500 to-indigo-500 rounded-full mt-4" />
      </div>

      {/* Main Education Cards Grid */}
      <div className="max-w-3xl mx-auto">
        {educationList.map((edu, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="hud-panel rounded-2xl p-7 sm:p-9 flex flex-col justify-between border border-rose-200 bg-white/95 shadow-xl relative overflow-hidden transition-all"
          >
            <div>
              {/* Top Status & Degree */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 shadow-sm">
                  <GraduationCap className="w-6 h-6" />
                </div>

                <span className="px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono text-xs font-bold flex items-center gap-1.5 shadow-xs">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{edu.status?.toUpperCase() || 'CURRENTLY ENROLLED'}</span>
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 mb-1">
                {edu.degree}
              </h3>
              {edu.specialization && (
                <p className="text-sm font-sans text-indigo-600 font-semibold mb-6">
                  {edu.specialization}
                </p>
              )}

              {/* Institution & Location */}
              <div className="space-y-2.5 mb-8 font-mono text-xs sm:text-sm text-slate-600">
                <div className="flex items-center gap-2.5">
                  <BookOpen className="w-4 h-4 text-sky-600 shrink-0" />
                  <span className="font-bold text-slate-900">{edu.institution}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>{edu.location}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{edu.duration}</span>
                </div>
              </div>
            </div>

            {/* Bottom Score & Academic Standing */}
            <div className="pt-5 border-t border-slate-200/80 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-mono text-slate-500 uppercase font-semibold">
                  {edu.scoreLabel}
                </div>
                <div className="text-2xl sm:text-3xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                  {edu.score}
                </div>
              </div>

              <div className="text-right text-xs font-mono text-slate-500 font-semibold">
                4-Year B.Tech Program (2024–2028)
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Coursework & Focus Domains */}
      <div className="max-w-3xl mx-auto mt-8 p-6 rounded-2xl bg-white/90 border border-slate-200/80 shadow-md font-mono text-xs text-slate-800 space-y-2">
        <div className="text-rose-600 font-bold uppercase tracking-wider text-xs">
          CURRICULUM TOPOLOGY // KEY COURSEWORK
        </div>
        <p className="text-slate-600 leading-relaxed font-sans text-xs sm:text-sm font-normal">
          Data Structures &amp; Algorithms, Object-Oriented Programming (C++), Computer Vision, Deep Learning, Supervised Learning, Database Management Systems, and Operating Systems.
        </p>
      </div>
    </section>
  );
};

export default Education;
