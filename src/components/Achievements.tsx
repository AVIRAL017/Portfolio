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
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/40 border border-purple-500/30 text-purple-400 font-mono text-xs mb-3 shadow-md shadow-purple-950/20">
          <Trophy className="w-3.5 h-3.5 text-purple-400" />
          <span>LAYER_05 // VALIDATION_CREDENTIALS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
          Achievements &amp; Certifications
        </h2>
        <p className="max-w-2xl text-slate-400 text-sm sm:text-base mt-3">
          ISRO hackathon recognition, competitive state hackathons, and verified deep learning specializations from DeepLearning.AI.
        </p>
        <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-rose-500 rounded-full mt-4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Hackathons & Exhibitions Column */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center gap-2 font-mono text-xs text-purple-400 uppercase tracking-widest pb-2 border-b border-white/10 font-bold">
            <Trophy className="w-4 h-4 text-purple-400" />
            <span>Hackathons &amp; Technical Competitions</span>
          </div>

          <div className="space-y-4">
            {hackathons.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="hud-panel rounded-2xl p-5 border-white/10 hover:border-purple-500/40 bg-[#121826]/85 shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-purple-950/50 text-purple-400 border border-purple-500/30 mt-0.5 group-hover:scale-110 transition-transform">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-white text-base group-hover:text-purple-400 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs font-mono text-purple-300 font-medium mt-0.5">
                        {item.issuer}
                      </p>
                    </div>
                  </div>

                  {item.date && (
                    <span className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono text-slate-400 font-semibold">
                      {item.date}
                    </span>
                  )}
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="font-mono text-[11px] text-slate-400 flex items-center gap-1 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>VERIFIED CREDENTIAL</span>
                  </span>

                  <a
                    href={item.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs font-mono text-purple-300 hover:bg-purple-600 hover:text-white font-semibold shadow-sm transition-all"
                  >
                    <span>View Certificate</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* DeepLearning.AI & Academic Accreditations */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center gap-2 font-mono text-xs text-rose-400 uppercase tracking-widest pb-2 border-b border-white/10 font-bold">
            <Award className="w-4 h-4 text-rose-400" />
            <span>DeepLearning.AI &amp; Algorithms Accreditations</span>
          </div>

          <div className="space-y-4">
            {courses.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="hud-panel rounded-2xl p-5 border-white/10 hover:border-rose-500/40 bg-[#121826]/85 shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-rose-950/50 text-rose-400 border border-rose-500/30 mt-0.5 group-hover:scale-110 transition-transform">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-white text-base group-hover:text-rose-400 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs font-mono text-rose-300 font-medium mt-0.5">
                        {item.issuer}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="font-mono text-[11px] text-slate-400 flex items-center gap-1 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>VERIFIED SPECIALIZATION</span>
                  </span>

                  <a
                    href={item.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-950/40 border border-rose-500/30 text-xs font-mono text-rose-300 hover:bg-rose-600 hover:text-white font-semibold shadow-sm transition-all"
                  >
                    <span>View Verification</span>
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

export default Achievements;
