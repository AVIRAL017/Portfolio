import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioContent } from '../data/content';
import { Skill3DSymbol } from './Skill3DSymbol';
import { Cpu, Terminal, Code2, Brain, Wrench, Binary, Sparkles, Layers } from 'lucide-react';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  languages: <Code2 className="w-4 h-4 text-sky-400" />,
  ai: <Sparkles className="w-4 h-4 text-rose-400" />,
  ml: <Brain className="w-4 h-4 text-purple-400" />,
  core: <Binary className="w-4 h-4 text-emerald-400" />,
  tools: <Wrench className="w-4 h-4 text-amber-400" />,
};

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const categories = portfolioContent.skills;
  const filteredCategories =
    activeCategory === 'all'
      ? categories
      : categories.filter((c) => c.categoryKey === activeCategory);

  const totalSkillCount = categories.reduce((acc, cat) => acc + cat.skills.length, 0);

  return (
    <section id="skills" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center mb-16 text-center">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-950/40 border border-rose-500/30 text-rose-400 font-mono text-xs mb-3 shadow-md shadow-rose-950/20">
          <Cpu className="w-3.5 h-3.5 text-rose-400" />
          <span>LAYER_03 // NEURAL_CAPABILITIES</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
          Technical Skills &amp; 3D Matrix
        </h2>
        <p className="max-w-2xl text-slate-400 text-sm sm:text-base mt-3">
          Interactive 3D geometry symbols representing verified capabilities in deep learning, computer vision, astrodynamics, and high-performance backend systems.
        </p>
        <div className="h-1 w-20 bg-gradient-to-r from-rose-500 to-red-600 rounded-full mt-4" />
      </div>

      {/* Domain Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 mb-14 font-mono text-xs">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2.5 rounded-xl transition-all ${
            activeCategory === 'all'
              ? 'bg-gradient-to-r from-rose-600 via-rose-500 to-red-600 text-white font-bold shadow-lg shadow-rose-600/30 border border-rose-400/30'
              : 'hud-panel text-slate-300 hover:text-white hover:border-rose-500/30 bg-[#121826]/70'
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
                ? 'bg-gradient-to-r from-rose-600 via-rose-500 to-red-600 text-white font-bold shadow-lg shadow-rose-600/30 border border-rose-400/30'
                : 'hud-panel text-slate-300 hover:text-white hover:border-rose-500/30 bg-[#121826]/70'
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
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 shadow-sm">
                  {CATEGORY_ICONS[cat.categoryKey]}
                </div>
                <div>
                  <h3 className="font-display font-bold text-white text-lg sm:text-xl">
                    {cat.name}
                  </h3>
                  <p className="text-xs font-mono text-slate-400 mt-0.5">
                    {cat.description}
                  </p>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-rose-400 font-semibold bg-rose-950/40 px-2.5 py-1 rounded-full border border-rose-500/30">
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
                    whileHover={{ y: -4, transition: { duration: 0.15 } }}
                    className="hud-card rounded-2xl p-4 sm:p-5 flex items-start gap-4 group cursor-pointer border border-white/10 hover:border-rose-500/40 bg-[#121826]/80 transition-all shadow-md"
                  >
                    {/* Interactive 3D Wireframe Symbol */}
                    <Skill3DSymbol type={skill.iconType} isHovered={isHovered} />

                    {/* Skill Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h4 className="font-display font-bold text-white text-base group-hover:text-rose-400 transition-colors truncate">
                          {skill.name}
                        </h4>
                        <span className="px-2 py-0.5 rounded-md bg-rose-950/40 border border-rose-500/30 text-[10px] font-mono text-rose-300 shrink-0">
                          {skill.tag}
                        </span>
                      </div>

                      <p className="text-xs font-mono text-slate-400 leading-relaxed line-clamp-2 mt-1">
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
    </section>
  );
};

export default Skills;
