import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PageTransition } from '../components/PageTransition';
import { Competitive } from '../components/Competitive';
import { Achievements } from '../components/Achievements';
import { Education } from '../components/Education';
import { Award, Trophy, GraduationCap, ArrowRight, Star, Zap, Radio } from 'lucide-react';

export const CredentialsPage: React.FC = () => {
  return (
    <PageTransition>
      <div className="relative min-h-screen pb-24">
        {/* Upper 3D Spatial Theater Stage (Clear zone for 3D Data Tower) */}
        <section className="relative pt-24 pb-8 min-h-[240px] sm:min-h-[280px] flex flex-col items-center justify-end px-4 text-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-md text-slate-800 font-mono text-xs font-semibold pointer-events-auto"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse shadow-sm shadow-amber-500/50" />
            <Radio className="w-3.5 h-3.5 text-amber-600" />
            <span>3D SPATIAL TELEMETRY // ALGORITHMIC DATA TOWER</span>
          </motion.div>
          <span className="text-[10px] font-mono text-slate-500 mt-2 font-medium">
            HIGH-ACCURACY BENCHMARK SPIRE • REAL-TIME ALGORITHMIC VERIFICATION
          </span>
        </section>

        {/* Lower Content Stage: Positioned safely BELOW 3D model */}
        <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Header Card with Frosted White Backdrop for 100% Contrast */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="hud-panel rounded-3xl p-8 sm:p-10 mb-10 border border-slate-200/90 bg-white/95 backdrop-blur-xl shadow-xl max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 text-amber-800 font-mono text-xs mb-3 shadow-sm">
              <Award className="w-3.5 h-3.5 text-amber-600" />
              <span>VALIDATION // BENCHMARKS &amp; CREDENTIALS</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-slate-900 tracking-tight">
              Academic &amp; Algorithmic Credentials
            </h1>

            <p className="max-w-2xl mx-auto text-slate-600 text-sm sm:text-base mt-4 font-normal leading-relaxed">
              Verifiable proof-of-work across algorithmic competitions, national ISRO space hackathons, DeepLearning.AI mathematical specializations, and university computer science topology.
            </p>

            <div className="h-1 w-24 bg-gradient-to-r from-amber-500 via-purple-500 to-emerald-500 rounded-full mx-auto mt-5" />

            {/* Quick Metrics Strip Inside Frosted Header */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full mt-8">
              {[
                { label: 'LeetCode Solved', val: '210+ Problems', icon: Zap, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200' },
                { label: 'HackerRank Tier', val: 'Problem Solving', icon: Star, color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200' },
                { label: 'Space Hackathon', val: 'ISRO Selected', icon: Trophy, color: 'text-purple-600', bg: 'bg-purple-50 border-purple-200' },
                { label: 'Undergraduate', val: 'B.Tech CSE (AI/ML)', icon: GraduationCap, color: 'text-indigo-600', bg: 'bg-indigo-50 border-indigo-200' },
              ].map((pill, i) => (
                <div
                  key={i}
                  className={`p-3.5 rounded-2xl border ${pill.bg} bg-white/90 shadow-sm flex flex-col items-center text-center`}
                >
                  <pill.icon className={`w-5 h-5 ${pill.color} mb-1`} />
                  <span className="font-display font-bold text-slate-900 text-sm">{pill.val}</span>
                  <span className="font-mono text-[10px] text-slate-500 uppercase mt-0.5">{pill.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Section 1: Competitive Programming */}
          <Competitive />

          {/* Section 2: Achievements & Certifications */}
          <Achievements />

          {/* Section 3: Education & Background */}
          <Education />

          {/* Next Step CTA */}
          <section className="relative px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto mt-12 text-center">
            <div className="p-8 sm:p-10 rounded-3xl bg-white/95 border border-slate-200/90 shadow-xl backdrop-blur-md">
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 mb-3">
                Ready to Discuss Technical Collaboration?
              </h3>
              <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto mb-6">
                Connect directly to review full project architectures, codebase repositories, or potential engineering roles.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-mono text-xs font-bold shadow-lg shadow-indigo-600/20 transition-all hover:scale-105"
              >
                <span>DISPATCH ENCRYPTED MESSAGE</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  );
};

export default CredentialsPage;
