import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioContent, Project } from '../data/content';
import { ProjectHoloVisual } from './ProjectHoloVisual';
import { ProjectModal } from './ProjectModal';
import { Github, ExternalLink, Cpu, Sparkles, Layers, ArrowUpRight } from 'lucide-react';

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center mb-16 text-center">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 font-mono text-xs mb-3 shadow-sm">
          <Cpu className="w-3.5 h-3.5 text-rose-600" />
          <span>LAYER_02 // SYSTEM_PORTFOLIO</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
          Featured Engineering Deployments
        </h2>
        <p className="max-w-2xl text-slate-600 text-sm sm:text-base mt-3 font-normal">
          High-performance machine learning systems, satellite telemetry analysis, and autonomous computer vision architectures directly aligned with verified research.
        </p>
        <div className="h-1 w-24 bg-gradient-to-r from-rose-500 via-indigo-500 to-sky-500 rounded-full mt-4" />
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
              className={`group relative rounded-2xl hud-card p-6 sm:p-7 flex flex-col justify-between overflow-hidden cursor-pointer border transition-all duration-300 ${
                isAERION
                  ? 'md:col-span-2 border-rose-300/90 shadow-xl shadow-rose-500/10 bg-white/90 hover:border-rose-500'
                  : 'border-slate-200/80 hover:border-indigo-400/80 shadow-lg bg-white/85 hover:shadow-xl'
              }`}
              onClick={() => setSelectedProject(project)}
            >
              {/* Top Meta Bar */}
              <div>
                <div className="flex items-center justify-between font-mono text-xs mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-rose-600 font-bold">0{project.priority} //</span>
                    <span className="text-slate-500 uppercase tracking-widest font-semibold">{project.tags[0]}</span>
                  </div>

                  {project.featured ? (
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-indigo-600 text-white font-bold text-[10px] flex items-center gap-1 shadow-md shadow-rose-500/25 border border-white/20">
                      <Sparkles className="w-3.5 h-3.5 text-white" />
                      FLAGSHIP AI PLATFORM
                    </span>
                  ) : (
                    <span className="text-[11px] font-mono text-slate-500 font-semibold">
                      SYS_INDEX_{project.id.toUpperCase()}
                    </span>
                  )}
                </div>

                {/* 3D Holo-Visual Preview */}
                <div className="mb-5 group-hover:border-rose-400 transition-colors">
                  <ProjectHoloVisual type={project.visualType} />
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 group-hover:text-rose-600 transition-colors flex items-center justify-between">
                  <span>{project.title}</span>
                  <span className="text-xs font-mono text-rose-600 opacity-0 group-hover:opacity-100 transition-opacity font-semibold">
                    INSPECT ARCHITECTURE →
                  </span>
                </h3>
                <p className="text-sm font-sans text-indigo-600 font-semibold mt-1 mb-3">
                  {project.subtitle}
                </p>

                {/* Description Excerpt */}
                <p className="text-slate-600 text-sm leading-relaxed mb-5 line-clamp-3">
                  {project.description}
                </p>

                {/* Architecture Highlights */}
                <div className="space-y-1.5 mb-6 text-xs text-slate-700 font-mono">
                  {project.architectureDetails.slice(0, isAERION ? 3 : 2).map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-rose-600 font-bold">›</span>
                      <span className="line-clamp-1">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Card Actions & Tech Chips */}
              <div>
                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.techStack.slice(0, 6).map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200/80 border border-slate-200/90 text-slate-700 font-mono text-[11px] font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 6 && (
                    <span className="px-2 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-500 font-mono text-[11px]">
                      +{project.techStack.length - 6} more
                    </span>
                  )}
                </div>

                {/* Action Links */}
                <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
                  <div className="flex items-center space-x-3" onClick={(e) => e.stopPropagation()}>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-mono text-slate-700 hover:text-slate-900 transition-colors font-medium shadow-sm"
                      aria-label="GitHub Repository"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Code</span>
                    </a>

                    {project.liveUrl && project.liveUrl !== project.githubUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 border border-rose-200 text-xs font-mono text-rose-700 hover:text-rose-900 transition-colors font-bold shadow-sm"
                        aria-label="Live Demo"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-rose-600" />
                        <span>Live Platform</span>
                      </a>
                    )}
                  </div>

                  <span className="text-xs font-mono text-slate-600 font-semibold bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200/80 shadow-xs">
                    {project.metrics ? project.metrics[0].value : 'VERIFIED'}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Project Deep-Dive Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};

export default Projects;
