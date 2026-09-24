import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioContent } from '../data/content';
import { Skill3DSymbol } from './Skill3DSymbol';
import { Cpu, Terminal, Code2, Brain, Wrench, Binary, Sparkles, Layers } from 'lucide-react';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  languages: <Code2 className="w-4 h-4 text-cyan-400" />,
  ml: <Brain className="w-4 h-4 text-amber-400" />,
  ai: <Sparkles className="w-4 h-4 text-violet-400" />,
  tools: <Wrench className="w-4 h-4 text-emerald-400" />,
  core: <Binary className="w-4 h-4 text-blue-400" />,
};

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const categories = portfolioContent.skills;
  const filteredCategories =
    activeCategory === 'all'
      ? categories
      : categories.filter((c) => c.categoryKey === activeCategory);

  return (
    <section id="skills" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center mb-16 text-center">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/40 text-cyan-300 font-mono text-xs mb-3 shadow-[0_0_12px_rgba(0,240,255,0.2)]">
          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
          <span>SECTION_03 // 3D_NEURAL_CAPABILITIES</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
          Technical Skills &amp; 3D Matrix
        </h2>
        <p className="max-w-2xl text-slate-300 text-sm sm:text-base mt-3">
          Interactive 3D geometry symbols representing validated capabilities in deep learning, computer vision, algorithms, and backend systems.
        </p>
        <div className="h-0.5 w-20 bg-gradient-to-r from-cyan-400 to-violet-500 mt-4" />
      </div>

      {/* Domain Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 mb-14 font-mono text-xs">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2.5 rounded-xl transition-all ${
            activeCategory === 'all'
              ? 'bg-gradient-to-r from-cyan-400 to-cyan-300 text-black font-bold shadow-[0_0_20px_rgba(0,240,255,0.4)]'
              : 'hud-panel text-slate-200 hover:text-cyan-300 hover:border-cyan-400/60'
          }`}
        >
          ALL_DOMAINS (24)
        </button>
        {categories.map((cat) => (
          <button
            key={cat.categoryKey}
            onClick={() => setActiveCategory(cat.categoryKey)}
            className={`px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all ${
              activeCategory === cat.categoryKey
                ? 'bg-gradient-to-r from-cyan-400 to-cyan-300 text-black font-bold shadow-[0_0_20px_rgba(0,240,255,0.4)]'
                : 'hud-panel text-slate-200 hover:text-cyan-300 hover:border-cyan-400/60'
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
            {/* Category Subheader */}
            <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-cyan-400 shadow-sm">
                  {CATEGORY_ICONS[cat.categoryKey]}
                </div>
                <div>
                  <h3 className="font-display font-bold text-white text-lg sm:text-xl">
                    {cat.name}
                  </h3>
                  <p className="text-xs font-mono text-cyan-300/90 mt-0.5">
                    {cat.description}
                  </p>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-slate-400">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>{cat.skills.length} VERIFIED MODULES</span>
              </div>
            </div>

            {/* 3D Skills Cards Grid - No fake plots, only names with animated 3D symbols & highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cat.skills.map((skill) => {
                const isHovered = hoveredSkill === skill.name;
                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35 }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    className={`hud-card rounded-2xl p-4 flex items-start gap-4 transition-all cursor-pointer border ${
                      isHovered
                        ? 'border-cyan-400 bg-slate-900/90 shadow-[0_0_25px_rgba(0,240,255,0.25)]'
                        : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                    }`}
                  >
                    {/* Animated 3D Symbol */}
                    <Skill3DSymbol type={skill.iconType} isHovered={isHovered} />

                    {/* Skill Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h4 className="font-display font-bold text-white text-base truncate group-hover:text-cyan-300">
                          {skill.name}
                        </h4>
                        <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[10px] font-mono text-cyan-300 font-semibold whitespace-nowrap">
                          {skill.tag}
                        </span>
                      </div>

                      <p className="text-xs font-sans text-slate-300 leading-relaxed line-clamp-2 mt-1">
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

      {/* Skills Matrix Footer */}
      <div className="mt-16 p-4 rounded-xl bg-slate-900/60 border border-cyan-500/20 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span>ALL SKILLS MAPPED TO REAL-WORLD DEPLOYMENTS &amp; SCIENTIFIC REPOSITORIES</span>
        </div>
        <div className="text-cyan-300 font-semibold">
          TOTAL_SYSTEM_MODULES: 24 ACTIVE
        </div>
      </div>
    </section>
  );
};
