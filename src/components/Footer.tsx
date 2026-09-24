import React from 'react';
import { portfolioContent } from '../data/content';
import { Terminal, Github, Linkedin, Heart, ArrowUp } from 'lucide-react';

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
    <footer className="relative border-t border-cyan-500/20 bg-[#02050b] pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-900">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-400/40 flex items-center justify-center text-cyan-400">
                <Terminal className="w-4 h-4" />
              </div>
              <span className="font-display font-bold text-lg text-white">
                AVIRAL<span className="text-cyan-400">.PORTFOLIO</span>
              </span>
            </div>

            <p className="font-sans text-xs text-slate-400 max-w-sm leading-relaxed">
              B.Tech CSE (AI &amp; ML) undergraduate at Pranveer Singh Institute of Technology. Engineering autonomous computer vision, satellite trajectory analysis, and generative AI systems.
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <a
                href={portfolioContent.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-400 text-slate-400 hover:text-cyan-300 transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={portfolioContent.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-400 text-slate-400 hover:text-cyan-300 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links (Duplicates Nav as instructed) */}
          <div className="md:col-span-4 space-y-3">
            <div className="font-mono text-xs text-cyan-400 uppercase tracking-wider font-semibold">
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
                  className="text-slate-400 hover:text-cyan-300 transition-colors py-1"
                >
                  › {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Telemetry / Back to Top */}
          <div className="md:col-span-3 space-y-3 flex flex-col justify-between items-start md:items-end">
            <div className="text-left md:text-right font-mono text-xs text-slate-500 space-y-1">
              <div>HOST: VERCEL_EDGE</div>
              <div>STACK: REACT 18 + R3F</div>
              <div className="text-emerald-400 font-bold">STATUS: 100% OPERATIONAL</div>
            </div>

            <button
              onClick={() => onNavigate('#hero')}
              className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-400 text-xs font-mono text-cyan-400 hover:text-white flex items-center gap-1.5 transition-all"
            >
              <span>Back To Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-3">
          <div>
            &copy; {new Date().getFullYear()} Aviral. All rights reserved. No unauthorized scraping.
          </div>
          <div className="flex items-center gap-1 text-[11px]">
            <span>Engineered with</span>
            <Heart className="w-3 h-3 text-red-500 inline fill-red-500" />
            <span>for Advanced AI &amp; Robotics</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
