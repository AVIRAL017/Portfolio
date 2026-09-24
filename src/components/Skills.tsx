import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioContent } from '../data/content';
import { Cpu, Terminal, Code2, Brain, Wrench, Binary, Sparkles } from 'lucide-react';

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
        <div className="flex items-center gap-2 px-3 py-1 rounded bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 font-mono text-xs mb-3">
          <Cpu className="w-3.5 h-3.5" />
          <span>SECTION_03 // NEURAL_MATRIX</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
          Technical Competencies &amp; Neural Graph
        </h2>
        <p className="max-w-2xl text-slate-400 text-sm sm:text-base mt-3">
          Validated proficiency across deep neural networks, computer vision frameworks, machine learning models, and system engineering.
        </p>
        <div className="h-0.5 w-20 bg-gradient-to-r from-cyan-400 to-violet-500 mt-4" />
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12 font-mono text-xs">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 rounded-lg transition-all ${
            activeCategory === 'all'
              ? 'bg-cyan-400 text-black font-bold shadow-[0_0_15px_rgba(0,240,255,0.4)]'
              : 'hud-panel text-slate-300 hover:text-cyan-300'
          }`}
        >
          ALL_DOMAINS (24)
        </button>
        {categories.map((cat) => (
          <button
            key={cat.categoryKey}
            onClick={() => setActiveCategory(cat.categoryKey)}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
              activeCategory === cat.categoryKey
                ? 'bg-cyan-400 text-black font-bold shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                : 'hud-panel text-slate-300 hover:text-cyan-300'
            }`}
          >
            {CATEGORY_ICONS[cat.categoryKey]}
            <span>{cat.name.toUpperCase()}</span>
          </button>
        ))}
      </div>

      {/* Skills Matrix Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((cat) => (
          <motion.div
            key={cat.categoryKey}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="hud-panel rounded-2xl p-6 flex flex-col justify-between"
          >
            <div>
              {/* Category Header */}
              <div className="flex items-center justify-between pb-4 border-b border-cyan-500/20 mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded bg-slate-900 border border-slate-700">
                    {CATEGORY_ICONS[cat.categoryKey]}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-white text-base">
                      {cat.name}
                    </h3>
                    <p className="text-[11px] font-mono text-slate-400">
                      {cat.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Skills Nodes List */}
              <div className="space-y-3.5">
                {cat.skills.map((skill) => {
                  const isHovered = hoveredSkill === skill.name;
                  return (
                    <div
                      key={skill.name}
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className={`p-3 rounded-xl border transition-all cursor-default ${
                        isHovered
                          ? 'bg-cyan-950/40 border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.25)] translate-x-1'
                          : 'bg-black/30 border-slate-800/80 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between font-mono text-xs mb-1.5">
                        <span className={`font-semibold ${isHovered ? 'text-cyan-300' : 'text-slate-200'}`}>
                          {skill.name}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono">
                          {skill.level}%
                        </span>
                      </div>

                      {/* Progress Synaptic Meter */}
                      <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden mb-1.5 border border-slate-800">
                        <motion.div
                          className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                        />
                      </div>

                      {skill.highlights && (
                        <div className="text-[10px] font-mono text-slate-400 truncate">
                          › {skill.highlights}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Neural Matrix Cluster Footer */}
            <div className="mt-6 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono text-slate-500">
              <span className="flex items-center gap-1">
                <Terminal className="w-3 h-3 text-cyan-400" />
                <span>CLUSTER: {cat.categoryKey.toUpperCase()}_WEIGHTS</span>
              </span>
              <span>SYNAPSE_COUNT: {cat.skills.length}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
