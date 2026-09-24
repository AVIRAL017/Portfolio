import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Github, Linkedin, FileText, Menu, X, ArrowUpRight } from 'lucide-react';
import { portfolioContent } from '../data/content';

interface NavbarProps {
  onNavigate: (id: string) => void;
  activeSection: string;
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

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, activeSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-[#040711]/90 backdrop-blur-md border-b border-cyan-500/20 shadow-lg shadow-cyan-950/20'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand Callout */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center space-x-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-md"
            aria-label="Aviral Home"
          >
            <div className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 group-hover:shadow-[0_0_12px_rgba(0,240,255,0.4)] transition-all">
              <Terminal className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-sm tracking-wider text-white group-hover:text-cyan-300 transition-colors">
                AVIRAL<span className="text-cyan-400">.AI</span>
              </span>
              <span className="font-mono text-[9px] text-slate-400 tracking-widest hidden sm:inline">
                SYS: V2.4_READY
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 font-mono text-xs">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative px-3 py-1.5 rounded transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                    isActive
                      ? 'text-cyan-300 font-bold bg-cyan-500/10'
                      : 'text-slate-300 hover:text-cyan-200 hover:bg-slate-800/40'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-cyan-400 to-violet-400 shadow-[0_0_8px_#00f0ff]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* External Social / Resume Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            <a
              href={portfolioContent.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2 rounded-lg bg-slate-900/60 border border-slate-700/50 hover:border-cyan-400/60 hover:text-cyan-300 text-slate-300 transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href={portfolioContent.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2 rounded-lg bg-slate-900/60 border border-slate-700/50 hover:border-cyan-400/60 hover:text-cyan-300 text-slate-300 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              href="/Resume.pdf"
              download="Aviral_Resume.pdf"
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-mono text-xs text-black font-semibold bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-white shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all"
            >
              <FileText className="w-3.5 h-3.5 text-black" />
              <span>Resume</span>
              <ArrowUpRight className="w-3 h-3 text-black" />
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center space-x-2">
            <a
              href="/Resume.pdf"
              download="Aviral_Resume.pdf"
              aria-label="Download Resume"
              className="px-2.5 py-1 text-xs font-mono font-semibold bg-cyan-400 text-black rounded"
            >
              Resume
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle Navigation Menu"
              className="p-2 rounded-lg bg-slate-900/80 border border-cyan-500/30 text-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#040711]/95 backdrop-blur-xl border-b border-cyan-500/30 px-6 py-6"
          >
            <div className="flex flex-col space-y-3 font-mono text-sm">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`py-2 px-3 rounded flex items-center justify-between ${
                      isActive
                        ? 'bg-cyan-500/10 text-cyan-300 font-bold border-l-2 border-cyan-400'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-[10px] text-slate-500">{item.href}</span>
                  </a>
                );
              })}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-around">
                <a
                  href={portfolioContent.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-cyan-300"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                <a
                  href={portfolioContent.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-cyan-300"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={portfolioContent.personal.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-amber-400 font-bold hover:underline"
                >
                  LeetCode
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
