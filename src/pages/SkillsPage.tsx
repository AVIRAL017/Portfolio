import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { portfolioContent } from '../data/content';
import { Skill3DSymbol } from '../components/Skill3DSymbol';
import { PageTransition } from '../components/PageTransition';
import { Cpu, Code2, Brain, Wrench, Binary, Sparkles, ArrowRight, Radio } from 'lucide-react';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  languages: <Code2 className="w-4 h-4 text-sky-600" />,
  ml: <Brain className="w-4 h-4 text-purple-600" />,
  ai: <Sparkles className="w-4 h-4 text-rose-600" />,
  tools: <Wrench className="w-4 h-4 text-amber-600" />,
  core: <Binary className="w-4 h-4 text-emerald-600" />,
};

export const SkillsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const categories = portfolioContent.skills;
  const filteredCategories =
    activeCategory === 'all'
      ? categories
      : categories.filter((c) => c.categoryKey === activeCategory);

  const totalSkillCount = categories.reduce((acc, cat) => acc + cat.skills.length, 0);

  return (
    <PageTransition>
      <div className="relative min-h-screen pb-24">
        {/* Upper 3D Spatial Theater Stage (Clear zone for 3D Orbital Satellite) */}
        <section className="relative pt-24 pb-8 min-h-[240px] sm:min-h-[280px] flex flex-col items-center justify-end px-4 text-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-md text-slate-800 font-mono text-xs font-semibold pointer-events-auto"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-sm shadow-emerald-500/50" />
            <Radio className="w-3.5 h-3.5 text-sky-600" />
            <span>3D SPATIAL TELEMETRY // ORBITAL CUBESAT NODE</span>
          </motion.div>
          <span className="text-[10px] font-mono text-slate-500 mt-2 font-medium">
            SPATIAL 6-DOF TOPOLOGY • SATELLITE ROTATION ACTIVE
          </span>
        </section>

        {/* Lower Content Stage: Text & Infographics positioned safely BELOW 3D model */}
        <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Header Card with Frosted White Backdrop for 100% Contrast & Legibility */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="hud-panel rounded-3xl p-8 sm:p-10 mb-10 border border-slate-200/90 bg-white/95 backdrop-blur-xl shadow-xl max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 font-mono text-xs mb-3 shadow-sm">
              <Cpu className="w-3.5 h-3.5 text-rose-600" />
              <span>NEURAL_MATRIX // VERIFIED_COMPETENCIES</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
              Technical Skills &amp; Competencies
            </h1>

            <p className="max-w-2xl mx-auto text-slate-600 text-sm sm:text-base mt-3 leading-relaxed font-normal">
              Verified competencies across computer vision, deep learning, supervised predictive modeling, systems engineering, and algorithmic data structures.
            </p>

            <div className="h-1 w-24 bg-gradient-to-r from-rose-500 via-indigo-500 to-sky-500 rounded-full mx-auto mt-4" />
          </motion.div>

          {/* Domain Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12 font-mono text-xs">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2.5 rounded-xl transition-all ${
                activeCategory === 'all'
                  ? 'bg-gradient-to-r from-rose-600 via-pink-600 to-indigo-600 text-white font-bold shadow-md shadow-rose-500/25'
                  : 'text-slate-700 hover:text-slate-900 border border-slate-200/90 bg-white/95 hover:bg-slate-100 shadow-sm font-semibold'
              }`}
            >
              ALL_DOMAINS ({totalSkillCount})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.categoryKey}
                onClick={() => setActiveCategory(cat.categoryKey)}
                className={`px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all ${
                  activeCategory === cat.categoryKey
                    ? 'bg-gradient-to-r from-rose-600 via-pink-600 to-indigo-600 text-white font-bold shadow-md shadow-rose-500/25'
                    : 'text-slate-700 hover:text-slate-900 border border-slate-200/90 bg-white/95 hover:bg-slate-100 shadow-sm font-semibold'
                }`}
              >
                {CATEGORY_ICONS[cat.categoryKey]}
                <span>{cat.name.toUpperCase()}</span>
              </button>
            ))}
          </div>

          {/* Skills Matrix Display */}
          <div className="space-y-12">
            {filteredCategories.map((cat) => (
              <div key={cat.categoryKey} className="space-y-5">
                {/* Category Subheader Banner */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl border shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 shadow-sm">
                      {CATEGORY_ICONS[cat.categoryKey]}
                    </div>
                    <div>
                      <h2 className="font-display font-bold text-slate-900 text-base sm:text-lg">
                        {cat.name}
                      </h2>
                      <p className="text-xs font-mono text-slate-500 mt-0.5">
                        {cat.description}
                      </p>
                    </div>
                  </div>

                  <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-rose-700 font-semibold bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                    <span>{cat.skills.length} VERIFIED MODULES</span>
                  </div>
                </div>

                {/* 3D Skills Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cat.skills.map((skill) => {
                    const isHovered = hoveredSkill === skill.name;

                    return (
                      <motion.div
                        key={skill.name}
                        onMouseEnter={() => setHoveredSkill(skill.name)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        whileHover={{ y: -3, transition: { duration: 0.15 } }}
                        className="hud-card rounded-2xl p-4 sm:p-5 flex items-start gap-4 group cursor-pointer border border-slate-200/90 hover:border-indigo-400 bg-white/95 hover:bg-white transition-all shadow-md hover:shadow-lg"
                      >
                        {/* Hardware-Accelerated 3D Wireframe Symbol */}
                        <Skill3DSymbol type={skill.iconType} isHovered={isHovered} />

                        {/* Skill Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <h3 className="font-display font-bold text-slate-900 text-base group-hover:text-rose-600 transition-colors truncate">
                              {skill.name}
                            </h3>
                            <span className="px-2 py-0.5 rounded-md bg-rose-50 border border-rose-200 text-[10px] font-mono text-rose-700 font-semibold shrink-0 shadow-xs">
                              {skill.tag}
                            </span>
                          </div>

                          <p className="text-xs font-mono text-slate-600 leading-relaxed line-clamp-2 mt-1 font-medium">
                            {skill.highlights}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Page Navigation CTA */}
          <div className="mt-16 text-center">
            <Link
              to="/credentials"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/95 hover:bg-slate-50 border border-slate-200/90 text-slate-800 font-mono text-xs sm:text-sm font-bold shadow-md transition-all hover:scale-105"
            >
              <span>NEXT: VIEW ALGORITHMIC BENCHMARKS &amp; EDUCATION</span>
              <ArrowRight className="w-4 h-4 text-emerald-600" />
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default SkillsPage;
