import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioContent, Project } from '../data/content';
import { ProjectHoloVisual } from '../components/ProjectHoloVisual';
import { ProjectModal } from '../components/ProjectModal';
import { PageTransition } from '../components/PageTransition';
import { Github, ExternalLink, Cpu, Sparkles, Filter, ArrowRight, Radio } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ProjectsPage: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filterTag, setFilterTag] = useState<string>('all');

  const filteredProjects =
    filterTag === 'all'
      ? portfolioContent.projects
      : portfolioContent.projects.filter((p) =>
          p.tags.some((t) => t.toLowerCase().includes(filterTag.toLowerCase()))
        );

  return (
    <PageTransition>
      <div className="relative min-h-screen pb-24">
        {/* Upper 3D Spatial Theater Stage (Clear zone for 3D CAD Turntable Tower) */}
        <section className="relative pt-24 pb-8 min-h-[240px] sm:min-h-[280px] flex flex-col items-center justify-end px-4 text-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-md text-slate-800 font-mono text-xs font-semibold pointer-events-auto"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse shadow-sm shadow-rose-500/50" />
            <Radio className="w-3.5 h-3.5 text-rose-600" />
            <span>3D SPATIAL TELEMETRY // CAD TURNTABLE PLATFORM</span>
          </motion.div>
          <span className="text-[10px] font-mono text-slate-500 mt-2 font-medium">
            HIGH-ACCURACY ROTATIONAL RECON • ENGINEERING SLABS ACTIVE
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 font-mono text-xs mb-3 shadow-sm">
              <Cpu className="w-3.5 h-3.5 text-rose-600" />
              <span>DEPLOYMENTS // PRODUCTION_SYSTEMS</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-slate-900 tracking-tight">
              Featured Engineering Systems
            </h1>

            <p className="max-w-2xl mx-auto text-slate-600 text-sm sm:text-base mt-3 font-normal leading-relaxed">
              High-throughput computer vision architectures, astrodynamic collision forecasting, and sensor fusion platforms designed with strict engineering verification.
            </p>

            <div className="h-1 w-24 bg-gradient-to-r from-rose-500 via-indigo-500 to-sky-500 rounded-full mx-auto mt-4" />
          </motion.div>

          {/* Filter Navigation Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12 font-mono text-xs">
            {[
              { id: 'all', label: 'ALL DEPLOYMENTS' },
              { id: 'vision', label: 'COMPUTER VISION' },
              { id: 'machine', label: 'MACHINE LEARNING' },
              { id: 'python', label: 'PYTHON & SCIENTIFIC' },
              { id: 'full-stack', label: 'FULL-STACK' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterTag(tab.id)}
                className={`px-4 py-2.5 rounded-xl transition-all ${
                  filterTag === tab.id
                    ? 'bg-gradient-to-r from-rose-600 via-pink-600 to-indigo-600 text-white font-bold shadow-md shadow-rose-500/25'
                    : 'bg-white/95 text-slate-700 hover:text-slate-900 border border-slate-200/90 hover:bg-slate-50 font-semibold shadow-sm'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Projects Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="hud-panel rounded-3xl p-6 sm:p-7 flex flex-col justify-between border-slate-200/90 hover:border-rose-400 bg-white/95 shadow-xl hover:shadow-2xl transition-all group"
              >
                <div>
                  {/* Holo Telemetry Visual Header */}
                  <div className="mb-5 rounded-2xl overflow-hidden border border-slate-200/80 shadow-inner">
                    <ProjectHoloVisual type={project.visualType} />
                  </div>

                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-xs text-rose-600 font-bold tracking-wider">
                      SYS_0{idx + 1}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-mono text-[10px] font-semibold border border-slate-200">
                      {project.tags[0] || 'ENGINEERING'}
                    </span>
                  </div>

                  <h3 className="font-display font-extrabold text-xl text-slate-900 group-hover:text-rose-600 transition-colors mb-1.5">
                    {project.title}
                  </h3>

                  <p className="font-mono text-xs text-slate-500 font-semibold mb-3">
                    {project.subtitle}
                  </p>

                  <p className="font-sans text-xs text-slate-600 leading-relaxed mb-5 font-normal">
                    {project.description}
                  </p>

                  {/* Metrics Pills */}
                  {project.metrics && (
                    <div className="grid grid-cols-2 gap-2 mb-5">
                      {project.metrics.slice(0, 2).map((metric, i) => (
                        <div key={i} className="p-2 rounded-xl bg-slate-50/90 border border-slate-200/70 font-mono">
                          <div className="text-[10px] text-slate-500 font-semibold">{metric.label}</div>
                          <div className="text-xs font-bold text-slate-900 truncate">{metric.value}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.techStack.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md bg-slate-100/90 text-slate-700 font-mono text-[10px] font-medium border border-slate-200/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-indigo-600 hover:text-indigo-800 transition-colors group-hover:translate-x-1 duration-200"
                  >
                    <span>ARCHITECTURE SPECS</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center space-x-2">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub Repository"
                      className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-200 shadow-xs"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Page Navigation CTA */}
          <div className="mt-16 text-center">
            <Link
              to="/skills"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/95 hover:bg-slate-50 border border-slate-200/90 text-slate-800 font-mono text-xs sm:text-sm font-bold shadow-md transition-all hover:scale-105"
            >
              <span>NEXT: EXPLORE TECHNICAL SKILLS &amp; COMPETENCIES</span>
              <ArrowRight className="w-4 h-4 text-rose-600" />
            </Link>
          </div>
        </div>

        {/* Project Architecture Deep-Dive Modal */}
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </div>
    </PageTransition>
  );
};

export default ProjectsPage;
