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
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 font-mono text-xs mb-3 shadow-sm">
          <Cpu className="w-3.5 h-3.5 text-rose-600" />
          <span>LAYER_03 // NEURAL_CAPABILITIES</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
          Technical Skills &amp; 3D Matrix
        </h2>
        <p className="max-w-2xl text-slate-600 text-sm sm:text-base mt-3">
          Interactive 3D geometry symbols representing verified capabilities in deep learning, computer vision, astrodynamics, and high-performance backend systems.
        </p>
        <div className="h-1 w-24 bg-gradient-to-r from-rose-500 via-indigo-500 to-sky-500 rounded-full mt-4" />
      </div>

      {/* Domain Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 mb-14 font-mono text-xs">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2.5 rounded-xl transition-all ${
            activeCategory === 'all'
              ? 'bg-gradient-to-r from-rose-600 via-pink-600 to-indigo-600 text-white font-bold shadow-md shadow-rose-500/25'
              : 'text-slate-700 hover:text-slate-900 border border-slate-200/90 bg-white/90 hover:bg-slate-100 shadow-sm font-semibold'
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
                : 'text-slate-700 hover:text-slate-900 border border-slate-200/90 bg-white/90 hover:bg-slate-100 shadow-sm font-semibold'
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
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 shadow-sm">
                  {CATEGORY_ICONS[cat.categoryKey]}
                </div>
                <div>
                  <h3 className="font-display font-bold text-slate-900 text-lg sm:text-xl">
                    {cat.name}
                  </h3>
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
                    whileHover={{ y: -4, transition: { duration: 0.15 } }}
                    className="hud-card rounded-2xl p-4 sm:p-5 flex items-start gap-4 group cursor-pointer border border-slate-200/80 hover:border-indigo-400 bg-white/85 hover:bg-white transition-all shadow-md hover:shadow-lg"
                  >
                    {/* Interactive 3D Wireframe Symbol */}
                    <Skill3DSymbol type={skill.iconType} isHovered={isHovered} />

                    {/* Skill Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h4 className="font-display font-bold text-slate-900 text-base group-hover:text-rose-600 transition-colors truncate">
                          {skill.name}
                        </h4>
                        <span className="px-2 py-0.5 rounded-md bg-rose-50 border border-rose-200 text-[10px] font-mono text-rose-700 font-semibold shrink-0 shadow-xs">
                          {skill.tag}
                        </span>
                      </div>

                      <p className="text-xs font-mono text-slate-600 leading-relaxed line-clamp-2 mt-1">
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
