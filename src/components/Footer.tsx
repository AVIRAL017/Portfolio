import React from 'react';
import { Link } from 'react-router-dom';
import { portfolioContent } from '../data/content';
import { Terminal, Github, Linkedin, ArrowUp } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Overview', path: '/' },
  { label: 'Projects', path: '/projects' },
  { label: 'Skills', path: '/skills' },
  { label: 'Credentials', path: '/credentials' },
  { label: 'Contact', path: '/contact' },
];

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-slate-200/80 bg-white/90 backdrop-blur-lg pt-16 pb-12 px-4 sm:px-6 lg:px-8 shadow-sm">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-200/80">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 shadow-sm">
                <Terminal className="w-4 h-4" />
              </div>
              <span className="font-display font-bold text-lg text-slate-900">
                AVIRAL<span className="text-rose-600">.PORTFOLIO</span>
              </span>
            </div>

            <p className="font-sans text-xs text-slate-600 max-w-sm leading-relaxed font-normal">
              B.Tech CSE (AI &amp; ML) undergraduate at Pranveer Singh Institute of Technology (PSIT Kanpur). Engineering autonomous aerial surveillance pipelines, astrodynamic collision forecasting, and high-performance machine learning deployments.
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <a
                href={portfolioContent.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 shadow-sm transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={portfolioContent.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 hover:border-sky-300 text-slate-700 hover:text-sky-600 shadow-sm transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-4 space-y-3">
            <div className="font-mono text-xs text-rose-600 uppercase tracking-wider font-bold">
              NAVIGATION_MATRIX
            </div>
            <div className="grid grid-cols-2 gap-2 font-mono text-xs">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className="text-slate-600 hover:text-rose-600 transition-colors py-1 font-medium"
                >
                  › {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Telemetry / Back to Top */}
          <div className="md:col-span-3 space-y-3 flex flex-col justify-between items-start md:items-end">
            <div className="text-left md:text-right font-mono text-xs text-slate-600 space-y-1 font-medium">
              <div>HOST: VERCEL_EDGE</div>
              <div>GRAPHICS: THREE.JS // 3D_SPATIAL</div>
              <div className="text-emerald-600 font-bold">STATUS: 100% OPERATIONAL</div>
            </div>

            <button
              onClick={scrollToTop}
              className="px-3.5 py-2 rounded-xl bg-slate-100 border border-slate-200 hover:border-rose-400 text-xs font-mono font-bold text-slate-700 hover:text-rose-600 flex items-center gap-1.5 shadow-sm transition-all"
            >
              <span>Back To Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-600 gap-4">
          <div>
            © {new Date().getFullYear()} Aviral Rajput. All technical architecture rights reserved.
          </div>
          <div className="text-slate-500 font-semibold">
            ENGINEERED WITH REACT, THREE.JS, FRAMER MOTION &amp; TAILWIND CSS
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
