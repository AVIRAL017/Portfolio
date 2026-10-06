import React from 'react';
import { portfolioContent } from '../data/content';
import { Terminal, Github, Linkedin, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (id: string) => void;
}

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Metrics', href: '#competitive' },
  { label: 'Certificates', href: '#achievements' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="relative border-t border-white/10 bg-[#070a0f] backdrop-blur-lg pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-rose-950/40 border border-rose-500/30 flex items-center justify-center text-rose-400 shadow-sm">
                <Terminal className="w-4 h-4" />
              </div>
              <span className="font-display font-bold text-lg text-white">
                AVIRAL<span className="text-rose-500">.PORTFOLIO</span>
              </span>
            </div>

            <p className="font-sans text-xs text-slate-400 max-w-sm leading-relaxed">
              B.Tech CSE (AI &amp; ML) undergraduate at Pranveer Singh Institute of Technology (PSIT Kanpur). Engineering autonomous aerial surveillance pipelines, astrodynamic collision forecasting, and high-performance machine learning deployments.
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <a
                href={portfolioContent.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-slate-400 hover:text-white shadow-sm transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={portfolioContent.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2 rounded-xl bg-white/5 border border-white/10 hover:border-sky-500/30 text-slate-400 hover:text-sky-400 shadow-sm transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-4 space-y-3">
            <div className="font-mono text-xs text-rose-400 uppercase tracking-wider font-bold">
              NAVIGATION_MATRIX
            </div>
            <div className="grid grid-cols-2 gap-2 font-mono text-xs">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(item.href);
                  }}
                  className="text-slate-400 hover:text-rose-400 transition-colors py-1"
                >
                  › {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Telemetry / Back to Top */}
          <div className="md:col-span-3 space-y-3 flex flex-col justify-between items-start md:items-end">
            <div className="text-left md:text-right font-mono text-xs text-slate-400 space-y-1">
              <div>HOST: VERCEL_EDGE</div>
              <div>GRAPHICS: THREE.JS // BISS_SPEC</div>
              <div className="text-emerald-400 font-bold">STATUS: 100% OPERATIONAL</div>
            </div>

            <button
              onClick={() => onNavigate('#hero')}
              className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-rose-500/40 text-xs font-mono text-slate-300 hover:text-rose-400 flex items-center gap-1.5 shadow-sm transition-all"
            >
              <span>Back To Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} Aviral Rajput. All technical architecture rights reserved.
          </div>
          <div className="text-slate-400">
            ENGINEERED WITH REACT, THREE.JS &amp; TAILWIND CSS
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
