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
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-3xl my-8 rounded-2xl bg-[#0e131d]/95 backdrop-blur-2xl border border-white/10 p-6 sm:p-8 text-slate-100 z-10 shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-project-title"
          >
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-white/10 mb-6">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs text-rose-400 font-bold uppercase tracking-widest mb-1">
                  <span>PROJECT_SPEC // 0{project.priority}</span>
                  {project.featured && (
                    <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-rose-600 to-red-600 text-white text-[10px] font-bold border border-rose-400/30">
                      FEATURED SYSTEM
                    </span>
                  )}
                </div>
                <h3 id="modal-project-title" className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                  {project.title}
                </h3>
                <p className="text-sm font-sans text-rose-300 font-semibold mt-1">{project.subtitle}</p>
              </div>

              <button
                onClick={onClose}
                aria-label="Close modal"
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-colors"
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
              <h4 className="font-mono text-xs text-rose-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-rose-400" />
                <span>Executive Architecture Overview</span>
              </h4>
              <p className="text-sm sm:text-base font-sans text-slate-300 leading-relaxed bg-slate-900/80 p-4 rounded-xl border border-white/10">
                {project.description}
              </p>
            </div>

            {/* Technical Architecture Points */}
            <div className="space-y-3 mb-6">
              <h4 className="font-mono text-xs text-rose-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-rose-400" />
                <span>Verified Engineering Modules</span>
              </h4>
              <ul className="space-y-2.5">
                {project.architectureDetails.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm font-sans text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Metrics */}
            {project.metrics && (
              <div className="mb-6">
                <h4 className="font-mono text-xs text-slate-400 uppercase tracking-wider font-bold mb-3">
                  Telemetry Benchmarks
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {project.metrics.map((m, i) => (
                    <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                      <div className="text-[10px] font-mono text-slate-400">{m.label}</div>
                      <div className="text-sm font-bold font-mono text-rose-400 mt-1">{m.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack Chips */}
            <div className="mb-8">
              <h4 className="font-mono text-xs text-slate-400 uppercase tracking-wider font-bold mb-3">
                Full Technology Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-200 font-mono text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono font-bold text-white transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>View GitHub Repository</span>
                </a>

                {project.liveUrl && project.liveUrl !== project.githubUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-xs font-mono font-bold text-white transition-colors shadow-lg shadow-rose-600/30 border border-rose-400/30"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Launch Live Platform</span>
                  </a>
                )}
              </div>

              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
              >
                Close Spec [ESC]
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
