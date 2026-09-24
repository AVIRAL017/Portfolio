import React from 'react';
import { motion } from 'framer-motion';
import { portfolioContent } from '../data/content';
import { Trophy, Award, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const Achievements: React.FC = () => {
  const hackathons = portfolioContent.achievements.filter(
    (a) => a.category === 'Hackathon' || a.category === 'Exhibition'
  );
  const courses = portfolioContent.achievements.filter(
    (a) => a.category === 'Course'
  );

  return (
    <section id="achievements" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center mb-16 text-center">
        <div className="flex items-center gap-2 px-3 py-1 rounded bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 font-mono text-xs mb-3">
          <Trophy className="w-3.5 h-3.5" />
          <span>SECTION_05 // CREDENTIALS &amp; HONORS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
          Achievements &amp; Certifications
        </h2>
        <p className="max-w-2xl text-slate-400 text-sm sm:text-base mt-3">
          National hackathons, project exhibitions, and verified AI/ML accreditations from Stanford University &amp; DeepLearning.AI.
        </p>
        <div className="h-0.5 w-20 bg-gradient-to-r from-cyan-400 to-violet-500 mt-4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Hackathons & Exhibitions Column */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-widest pb-2 border-b border-cyan-500/20">
            <Trophy className="w-4 h-4 text-cyan-400" />
            <span>Hackathons &amp; Technical Exhibitions</span>
          </div>

          <div className="space-y-4">
            {hackathons.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="hud-panel rounded-xl p-5 border-slate-800 hover:border-cyan-400/50 transition-all flex flex-col justify-between group"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded bg-cyan-500/10 text-cyan-400 mt-0.5 group-hover:scale-110 transition-transform">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-white text-base group-hover:text-cyan-300 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs font-mono text-cyan-400/90 mt-0.5">
                        {item.issuer}
                      </p>
                    </div>
                  </div>

                  {item.date && (
                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-[10px] font-mono text-slate-400">
                      {item.date}
                    </span>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="font-mono text-[11px] text-slate-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>VERIFIED CERTIFICATE</span>
                  </span>

                  <a
                    href={item.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-cyan-950/60 border border-cyan-500/40 text-xs font-mono text-cyan-300 hover:bg-cyan-400 hover:text-black font-semibold transition-all"
                  >
                    <span>View Certificate</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* DeepLearning.AI & Stanford Accreditations */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center gap-2 font-mono text-xs text-violet-400 uppercase tracking-widest pb-2 border-b border-violet-500/20">
            <Award className="w-4 h-4 text-violet-400" />
            <span>Coursera &amp; Academic Certifications</span>
          </div>

          <div className="space-y-4">
            {courses.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="hud-panel rounded-xl p-5 border-slate-800 hover:border-violet-400/50 transition-all flex flex-col justify-between group"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded bg-violet-500/10 text-violet-400 mt-0.5 group-hover:scale-110 transition-transform">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-white text-base group-hover:text-violet-300 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs font-mono text-violet-400/90 mt-0.5">
                        {item.issuer}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="font-mono text-[11px] text-slate-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>AUTHENTICATED REPO</span>
                  </span>

                  <a
                    href={item.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-violet-950/60 border border-violet-500/40 text-xs font-mono text-violet-300 hover:bg-violet-400 hover:text-black font-semibold transition-all"
                  >
                    <span>View Certificate</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
