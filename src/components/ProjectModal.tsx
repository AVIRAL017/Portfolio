import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, Cpu, CheckCircle2, Layers } from 'lucide-react';
import { Project } from '../data/content';
import { ProjectHoloVisual } from './ProjectHoloVisual';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-3xl my-8 rounded-2xl hud-panel border border-cyan-400/40 p-6 sm:p-8 text-slate-200 z-10 shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-project-title"
          >
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-cyan-500/20 mb-6">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-widest mb-1">
                  <span>PROJECT_SPEC // 0{project.priority}</span>
                  {project.featured && (
                    <span className="px-2 py-0.5 rounded bg-cyan-400/20 text-cyan-300 text-[10px] font-bold">
                      FEATURED SYSTEM
                    </span>
                  )}
                </div>
                <h3 id="modal-project-title" className="text-2xl sm:text-3xl font-display font-bold text-white">
                  {project.title}
                </h3>
                <p className="text-sm font-sans text-slate-300 mt-1">{project.subtitle}</p>
              </div>

              <button
                onClick={onClose}
                aria-label="Close modal"
                className="p-2 rounded-lg bg-slate-900/80 border border-slate-700 hover:border-cyan-400 text-slate-400 hover:text-cyan-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Visual Canvas Display */}
            <div className="mb-6">
              <ProjectHoloVisual type={project.visualType} />
            </div>

            {/* Description */}
            <div className="space-y-4 mb-6">
              <h4 className="font-mono text-xs text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <Cpu className="w-4 h-4" />
                <span>Executive Architecture Overview</span>
              </h4>
              <p className="text-sm sm:text-base font-sans text-slate-200 leading-relaxed bg-black/30 p-4 rounded-xl border border-cyan-900/30">
                {project.description}
              </p>
            </div>

            {/* Technical Architecture Points */}
            <div className="space-y-3 mb-6">
              <h4 className="font-mono text-xs text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4" />
                <span>Verified Engineering Modules</span>
              </h4>
              <ul className="space-y-2.5">
                {project.architectureDetails.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-sans text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Metrics */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                {project.metrics.map((m, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-black/40 border border-cyan-900/40 text-center">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">{m.label}</div>
                    <div className="text-sm font-mono font-bold text-cyan-300 mt-0.5">{m.value}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Tech Stack Chips */}
            <div className="space-y-2 mb-8">
              <div className="font-mono text-xs text-slate-400 uppercase">Deployed Technologies:</div>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded bg-cyan-950/40 border border-cyan-500/30 font-mono text-xs text-cyan-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-cyan-500/20 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-lg bg-slate-900 border border-cyan-500/40 hover:border-cyan-400 text-white font-mono text-xs flex items-center gap-2 hover:bg-cyan-950/30 transition-all"
                >
                  <Github className="w-4 h-4 text-cyan-400" />
                  <span>VIEW REPOSITORY</span>
                </a>

                {project.liveUrl !== '#' ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-black font-mono text-xs font-bold flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                  >
                    <span>LIVE SYSTEM</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                ) : (
                  <span className="px-3 py-2 rounded font-mono text-xs text-slate-500 border border-slate-800">
                    Live Demo: Staging / Internal
                  </span>
                )}
              </div>

              <button
                onClick={onClose}
                className="text-xs font-mono text-slate-400 hover:text-white transition-colors"
              >
                Close [ESC]
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
