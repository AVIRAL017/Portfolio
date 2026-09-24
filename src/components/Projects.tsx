import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioContent, Project } from '../data/content';
import { ProjectHoloVisual } from './ProjectHoloVisual';
import { ProjectModal } from './ProjectModal';
import { Github, ExternalLink, Cpu, Sparkles, Layers } from 'lucide-react';

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center mb-16 text-center">
        <div className="flex items-center gap-2 px-3 py-1 rounded bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 font-mono text-xs mb-3">
          <Cpu className="w-3.5 h-3.5" />
          <span>SECTION_02 // SYSTEM_PORTFOLIO</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
          Featured Engineering Deployments
        </h2>
        <p className="max-w-2xl text-slate-400 text-sm sm:text-base mt-3">
          High-performance machine learning systems, satellite telemetry analysis, and autonomous computer vision architectures.
        </p>
        <div className="h-0.5 w-20 bg-gradient-to-r from-cyan-400 to-violet-500 mt-4" />
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {portfolioContent.projects.map((project, idx) => {
          const isAERION = project.id === 'aerion';

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className={`group relative rounded-2xl hud-card p-6 sm:p-7 flex flex-col justify-between overflow-hidden cursor-pointer ${
                isAERION ? 'md:col-span-2 border-cyan-400/40 shadow-cyan-950/50' : 'border-slate-800'
              }`}
              onClick={() => setSelectedProject(project)}
            >
              {/* Top Meta Bar */}
              <div>
                <div className="flex items-center justify-between font-mono text-xs mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-cyan-400 font-bold">0{project.priority} //</span>
                    <span className="text-slate-400 uppercase tracking-widest">{project.tags[0]}</span>
                  </div>

                  {project.featured ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-400/50 text-cyan-300 font-bold text-[10px] flex items-center gap-1 shadow-[0_0_10px_rgba(0,240,255,0.2)]">
                      <Sparkles className="w-3 h-3 text-cyan-400" />
                      FLAGSHIP AI PLATFORM
                    </span>
                  ) : (
                    <span className="text-[11px] font-mono text-slate-500">
                      SYS_INDEX_{project.id.toUpperCase()}
                    </span>
                  )}
                </div>

                {/* 3D Holo-Visual Preview */}
                <div className="mb-5 group-hover:border-cyan-400/50 transition-colors">
                  <ProjectHoloVisual type={project.visualType} />
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center justify-between">
                  <span>{project.title}</span>
                  <span className="text-xs font-mono text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    INSPECT ARCHITECTURE →
                  </span>
                </h3>
                <p className="text-sm font-sans text-cyan-400/90 font-medium mt-1 mb-3">
                  {project.subtitle}
                </p>

                {/* Description Excerpt */}
                <p className="text-slate-300 text-sm leading-relaxed mb-5 line-clamp-3">
                  {project.description}
                </p>

                {/* Architecture Highlights */}
                <div className="space-y-1.5 mb-6 text-xs text-slate-400 font-mono">
                  {project.architectureDetails.slice(0, isAERION ? 3 : 2).map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-cyan-400 font-bold">›</span>
                      <span className="line-clamp-1">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Card Actions & Tech Chips */}
              <div>
                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.techStack.slice(0, isAERION ? 8 : 5).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded bg-slate-900/80 border border-slate-700/60 font-mono text-[11px] text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > (isAERION ? 8 : 5) && (
                    <span className="px-1.5 py-0.5 rounded font-mono text-[10px] text-slate-500">
                      +{project.techStack.length - (isAERION ? 8 : 5)} more
                    </span>
                  )}
                </div>

                {/* Buttons Bar */}
                <div
                  className="pt-4 border-t border-slate-800/80 flex items-center justify-between"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center space-x-3">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-cyan-400 text-xs font-mono text-slate-200 hover:text-cyan-300 transition-colors"
                      aria-label={`${project.title} GitHub repository`}
                    >
                      <Github className="w-3.5 h-3.5 text-cyan-400" />
                      <span>CODE</span>
                    </a>

                    {project.liveUrl !== '#' ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/20 border border-cyan-400 text-xs font-mono text-cyan-300 hover:bg-cyan-400 hover:text-black font-semibold transition-all"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>DEMO</span>
                      </a>
                    ) : (
                      <span className="text-[11px] font-mono text-slate-500">
                        Docs / Staging
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-1 text-xs font-mono text-cyan-400 hover:text-cyan-300 underline underline-offset-4 decoration-cyan-500/30"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Deep Dive</span>
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Expanded Architecture Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
