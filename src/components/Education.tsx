import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, Award, BookOpen, CheckCircle, MapPin } from 'lucide-react';
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {educationList.map((edu, idx) => {
          const isHigherEd = idx === 0;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className={`hud-panel rounded-2xl p-7 sm:p-8 flex flex-col justify-between border bg-white/90 shadow-xl relative overflow-hidden transition-all ${
                isHigherEd ? 'border-rose-200 shadow-rose-500/10' : 'border-slate-200/80'
              }`}
            >
              <div>
                {/* Top Status & Degree */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 shadow-sm">
                    <GraduationCap className="w-6 h-6" />
                  </div>

                  <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono text-xs font-bold flex items-center gap-1 shadow-xs">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{edu.status?.toUpperCase() || 'COMPLETED'}</span>
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-display font-extrabold text-slate-900 mb-1">
                  {edu.degree}
                </h3>
                {edu.specialization && (
                  <p className="text-sm font-sans text-indigo-600 font-semibold mb-4">
                    {edu.specialization}
                  </p>
                )}

                {/* Institution & Location */}
                <div className="space-y-2 mb-6 font-mono text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-sky-600 shrink-0" />
                    <span className="font-bold text-slate-900">{edu.institution}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-purple-600 shrink-0" />
                    <span>{edu.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{edu.duration}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Score & Academic Standing */}
              <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase font-semibold">
                    {edu.scoreLabel}
                  </div>
                  <div className="text-2xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                    {edu.score}
                  </div>
                </div>

                <div className="text-right text-[11px] font-mono text-slate-500 font-semibold">
                  {isHigherEd ? '4-Year B.Tech Program' : 'Higher Secondary (PCM)'}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Coursework & Focus Domains */}
      <div className="max-w-5xl mx-auto mt-8 p-6 rounded-2xl bg-white/85 border border-slate-200/80 shadow-md font-mono text-xs text-slate-800 space-y-2">
        <div className="text-rose-600 font-bold uppercase tracking-wider text-xs">
          CURRICULUM TOPOLOGY // KEY COURSEWORK
        </div>
        <p className="text-slate-600 leading-relaxed font-sans text-xs sm:text-sm font-normal">
          Computer Vision, Deep Learning, Astrodynamic Physics-Informed ML, Object-Oriented C++, Data Structures &amp; Algorithms, Database Management Systems (SQL), Operating Systems, and Distributed Computing.
        </p>
      </div>
    </section>
  );
};

export default Education;
