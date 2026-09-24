import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioContent } from '../data/content';
import { Terminal, Award, Code, ExternalLink, Zap } from 'lucide-react';

export const Competitive: React.FC = () => {
  const [leetcodeCount, setLeetcodeCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = 210;
    const duration = 2000;
    const stepTime = Math.abs(Math.floor(duration / end));

    const timer = setInterval(() => {
      start += 3;
      if (start >= end) {
        setLeetcodeCount(end);
        clearInterval(timer);
      } else {
        setLeetcodeCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="competitive" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center mb-16 text-center">
        <div className="flex items-center gap-2 px-3 py-1 rounded bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 font-mono text-xs mb-3">
          <Award className="w-3.5 h-3.5" />
          <span>SECTION_04 // ALGORITHMIC_METRICS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
          Competitive Programming &amp; Problem Solving
        </h2>
        <p className="max-w-2xl text-slate-400 text-sm sm:text-base mt-3">
          Continuous algorithmic optimization across data structures, graph theory, dynamic programming, and complexity reduction.
        </p>
        <div className="h-0.5 w-20 bg-gradient-to-r from-cyan-400 to-violet-500 mt-4" />
      </div>

      {/* Competitive Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* LeetCode Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="hud-panel rounded-2xl p-7 flex flex-col justify-between border-amber-500/30 relative overflow-hidden group hover:border-amber-400/60 transition-all"
        >
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400">
                  <Code className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-white">LeetCode</h3>
                  <span className="font-mono text-xs text-amber-400/90 font-semibold">@AVIRAL_17</span>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono text-xs font-bold">
                RANK ACTIVE
              </span>
            </div>

            {/* Counter */}
            <div className="py-4">
              <div className="text-5xl sm:text-6xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-yellow-200">
                {leetcodeCount}+
              </div>
              <div className="font-mono text-xs text-slate-300 uppercase tracking-widest mt-1">
                Problems Solved (DSA Mastery)
              </div>
            </div>

            <p className="text-xs font-sans text-slate-300 leading-relaxed mt-2 bg-black/30 p-3 rounded-lg border border-amber-900/30">
              Proficient in graph traversals (BFS/DFS), dynamic programming, binary search, tree manipulations, and backtracking.
            </p>
          </div>

          <div className="mt-8 pt-4 border-t border-amber-500/20 flex items-center justify-between">
            <span className="font-mono text-xs text-slate-400">VERIFIED PROFILE</span>
            <a
              href="https://leetcode.com/u/AVIRAL_17/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 border border-amber-500/40 hover:bg-amber-500 hover:text-black font-mono text-xs font-bold text-amber-300 transition-all shadow-[0_0_12px_rgba(245,158,11,0.3)]"
            >
              <span>VIEW LEETCODE</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>

        {/* HackerRank Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hud-panel rounded-2xl p-7 flex flex-col justify-between border-emerald-500/30 relative overflow-hidden group hover:border-emerald-400/60 transition-all"
        >
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-white">HackerRank</h3>
                  <span className="font-mono text-xs text-emerald-400/90 font-semibold">@AIML1B_059</span>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-bold">
                VERIFIED BADGE
              </span>
            </div>

            {/* Stars */}
            <div className="py-4">
              <div className="text-5xl sm:text-6xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-400 to-green-300">
                3-Star ★★★
              </div>
              <div className="font-mono text-xs text-slate-300 uppercase tracking-widest mt-1">
                Problem Solving Badge
              </div>
            </div>

            <p className="text-xs font-sans text-slate-300 leading-relaxed mt-2 bg-black/30 p-3 rounded-lg border border-emerald-900/30">
              Verified algorithmic foundations in arrays, linked lists, sorting, modular arithmetic, and computational efficiency.
            </p>
          </div>

          <div className="mt-8 pt-4 border-t border-emerald-500/20 flex items-center justify-between">
            <span className="font-mono text-xs text-slate-400">VERIFIED PROFILE</span>
            <a
              href="https://www.hackerrank.com/profile/AIML1B_059"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 hover:bg-emerald-500 hover:text-black font-mono text-xs font-bold text-emerald-300 transition-all shadow-[0_0_12px_rgba(16,185,129,0.3)]"
            >
              <span>VIEW HACKERRANK</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Terminal Footer Indicator */}
      <div className="mt-12 text-center font-mono text-xs text-slate-500 flex items-center justify-center gap-2">
        <Zap className="w-3.5 h-3.5 text-cyan-400" />
        <span>CODEFORCES &amp; COMPETITIVE TELEMETRY CONTINUOUSLY UPDATED</span>
      </div>
    </section>
  );
};
