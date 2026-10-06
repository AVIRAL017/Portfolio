import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Code, ExternalLink, Zap, Star } from 'lucide-react';

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
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/40 border border-amber-500/30 text-amber-400 font-mono text-xs mb-3 shadow-md shadow-amber-950/20">
          <Award className="w-3.5 h-3.5 text-amber-400" />
          <span>LAYER_04 // ALGORITHMIC_BENCHMARKS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
          Competitive Programming &amp; Problem Solving
        </h2>
        <p className="max-w-2xl text-slate-400 text-sm sm:text-base mt-3">
          Continuous algorithmic optimization across data structures, graph theory, dynamic programming, and computational complexity reduction.
        </p>
        <div className="h-1 w-20 bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full mt-4" />
      </div>

      {/* Competitive Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* LeetCode Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="hud-panel rounded-2xl p-7 flex flex-col justify-between border-amber-500/30 relative overflow-hidden group hover:border-amber-400 bg-[#121826]/85 shadow-lg transition-all"
        >
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-amber-950/50 text-amber-400 border border-amber-500/30 shadow-sm">
                  <Code className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-white">LeetCode</h3>
                  <span className="font-mono text-xs text-amber-400 font-semibold">@AVIRAL_17</span>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-full bg-amber-950/40 border border-amber-500/30 text-amber-300 font-mono text-xs font-bold shadow-sm">
                ACTIVE
              </span>
            </div>

            {/* Counter */}
            <div className="py-4">
              <div className="text-5xl sm:text-6xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400">
                {leetcodeCount}+
              </div>
              <div className="font-mono text-xs text-slate-400 uppercase tracking-widest mt-1 font-semibold">
                Problems Solved (DSA Mastery)
              </div>
            </div>

            <p className="text-xs font-sans text-slate-300 leading-relaxed mt-2 bg-slate-900/80 p-3.5 rounded-xl border border-white/10">
              Extensive focus on graph traversals (BFS/DFS), dynamic programming, binary search, tree manipulation, and algorithmic optimization.
            </p>
          </div>

          <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="font-mono text-xs text-slate-400 font-semibold">VERIFIED PROFILE</span>
            <a
              href="https://leetcode.com/u/AVIRAL_17/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 font-mono text-xs font-bold text-white transition-all shadow-md shadow-amber-500/20"
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
          transition={{ duration: 0.6, delay: 0.15 }}
          className="hud-panel rounded-2xl p-7 flex flex-col justify-between border-emerald-500/30 relative overflow-hidden group hover:border-emerald-400 bg-[#121826]/85 shadow-lg transition-all"
        >
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-emerald-950/50 text-emerald-400 border border-emerald-500/30 shadow-sm">
                  <Star className="w-5 h-5 fill-emerald-400/20" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-white">HackerRank</h3>
                  <span className="font-mono text-xs text-emerald-400 font-semibold">@AIML1B_059</span>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 font-mono text-xs font-bold shadow-sm">
                4-STAR CODER
              </span>
            </div>

            {/* Counter */}
            <div className="py-4">
              <div className="text-5xl sm:text-6xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-green-400">
                ★★★★
              </div>
              <div className="font-mono text-xs text-slate-400 uppercase tracking-widest mt-1 font-semibold">
                Problem Solving &amp; Algorithms Badge
              </div>
            </div>

            <p className="text-xs font-sans text-slate-300 leading-relaxed mt-2 bg-slate-900/80 p-3.5 rounded-xl border border-white/10">
              Verified Gold Badge in Problem Solving &amp; Algorithms across advanced data structures, sorting algorithms, and computational complexity.
            </p>
          </div>

          <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="font-mono text-xs text-slate-400 font-semibold">VERIFIED PROFILE</span>
            <a
              href="https://www.hackerrank.com/profile/AIML1B_059"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 font-mono text-xs font-bold text-white transition-all shadow-md shadow-emerald-500/20"
            >
              <span>VIEW HACKERRANK</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Competitive;
