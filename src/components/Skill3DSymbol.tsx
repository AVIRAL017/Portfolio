import React from 'react';
import { SkillIconType } from '../data/content';

interface Skill3DSymbolProps {
  type: SkillIconType;
  isHovered?: boolean;
}

export const Skill3DSymbol: React.FC<Skill3DSymbolProps> = ({ type, isHovered = false }) => {
  // Define geometric visual and color scheme for each skill type
  const getSymbolConfig = () => {
    switch (type) {
      case 'python':
        return {
          color: '#0284c7',
          accent: '#d97706',
          svg: (
            <svg viewBox="0 0 40 40" className="w-8 h-8">
              <path
                d="M19 6 C13 6 13 9 13 9 L13 12 L20 12 L20 13 L10 13 C10 13 6 13 6 19 C6 25 10 25 10 25 L12 25 L12 22 C12 22 12 18 16 18 L23 18 C23 18 27 18 27 14 L27 9 C27 9 27 6 19 6 Z"
                fill="#0284c7"
                opacity="0.9"
              />
              <circle cx="15" cy="9" r="1.2" fill="#ffffff" />
              <path
                d="M21 34 C27 34 27 31 27 31 L27 28 L20 28 L20 27 L30 27 C30 27 34 27 34 21 C34 15 30 15 30 15 L28 15 L28 18 C28 18 28 22 24 22 L17 22 C17 22 13 22 13 26 L13 31 C13 31 13 34 21 34 Z"
                fill="#d97706"
                opacity="0.9"
              />
              <circle cx="25" cy="31" r="1.2" fill="#ffffff" />
            </svg>
          ),
        };
      case 'c':
      case 'cpp':
        return {
          color: '#0284c7',
          accent: '#6366f1',
          svg: (
            <svg viewBox="0 0 40 40" className="w-8 h-8 stroke-current fill-none" strokeWidth="1.8">
              <polygon points="20,5 34,13 34,27 20,35 6,27 6,13" className="stroke-indigo-600" fill="rgba(99,102,241,0.06)" />
              <line x1="20" y1="5" x2="20" y2="35" className="stroke-sky-500" strokeDasharray="2 2" />
              <line x1="6" y1="13" x2="34" y2="27" className="stroke-sky-500" strokeDasharray="2 2" />
              <circle cx="20" cy="20" r="3" className="fill-indigo-600 stroke-none" />
            </svg>
          ),
        };
      case 'html5':
      case 'css3':
        return {
          color: type === 'html5' ? '#ea580c' : '#2563eb',
          accent: '#f43f5e',
          svg: (
            <svg viewBox="0 0 40 40" className="w-8 h-8 stroke-current fill-none" strokeWidth="2">
              <polygon points="8,6 32,6 29,32 20,36 11,32" className={type === 'html5' ? 'stroke-orange-500' : 'stroke-blue-500'} fill={type === 'html5' ? 'rgba(234,88,12,0.08)' : 'rgba(37,99,235,0.08)'} />
              <path d="M14 14 L26 14 L25 24 L20 26 L15 24" className="stroke-slate-700" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ),
        };
      case 'decision-tree':
      case 'random-forest':
        return {
          color: '#059669',
          accent: '#10b981',
          svg: (
            <svg viewBox="0 0 40 40" className="w-8 h-8 stroke-current fill-none" strokeWidth="2">
              <circle cx="20" cy="8" r="3.5" className="fill-emerald-600 stroke-none" />
              <line x1="20" y1="11.5" x2="12" y2="20" className="stroke-emerald-500" />
              <line x1="20" y1="11.5" x2="28" y2="20" className="stroke-emerald-500" />
              <circle cx="12" cy="22" r="3" className="fill-teal-600 stroke-none" />
              <circle cx="28" cy="22" r="3" className="fill-teal-600 stroke-none" />
              <line x1="12" y1="25" x2="7" y2="33" className="stroke-teal-400" />
              <line x1="12" y1="25" x2="17" y2="33" className="stroke-teal-400" />
              <line x1="28" y1="25" x2="23" y2="33" className="stroke-teal-400" />
              <line x1="28" y1="25" x2="33" y2="33" className="stroke-teal-400" />
            </svg>
          ),
        };
      case 'gradient-boost':
      case 'xgboost':
      case 'catboost':
      case 'supervised-learning':
        return {
          color: '#d97706',
          accent: '#e11d48',
          svg: (
            <svg viewBox="0 0 40 40" className="w-8 h-8 stroke-current fill-none" strokeWidth="2">
              <path d="M6 32 Q 14 10, 20 24 T 34 8" className="stroke-amber-500" strokeLinecap="round" />
              <circle cx="14" cy="18" r="2.5" className="fill-rose-500 stroke-none" />
              <circle cx="20" cy="24" r="2.5" className="fill-amber-600 stroke-none" />
              <circle cx="27" cy="14" r="2.5" className="fill-rose-500 stroke-none" />
              <line x1="6" y1="34" x2="34" y2="34" className="stroke-slate-300" strokeWidth="1" />
            </svg>
          ),
        };
      case 'computer-vision':
      case 'object-detection':
      case 'change-detection':
        return {
          color: '#e11d48',
          accent: '#0284c7',
          svg: (
            <svg viewBox="0 0 40 40" className="w-8 h-8 stroke-current fill-none" strokeWidth="1.8">
              <rect x="7" y="7" width="26" height="26" rx="4" className="stroke-rose-500" strokeDasharray="3 3" />
              <circle cx="20" cy="20" r="6" className="stroke-rose-600" />
              <circle cx="20" cy="20" r="2" className="fill-rose-600 stroke-none" />
              <line x1="20" y1="5" x2="20" y2="9" className="stroke-sky-500" strokeWidth="2" />
              <line x1="20" y1="31" x2="20" y2="35" className="stroke-sky-500" strokeWidth="2" />
              <line x1="5" y1="20" x2="9" y2="20" className="stroke-sky-500" strokeWidth="2" />
              <line x1="31" y1="20" x2="35" y2="20" className="stroke-sky-500" strokeWidth="2" />
            </svg>
          ),
        };
      case 'deep-learning':
      case 'pytorch':
        return {
          color: '#f43f5e',
          accent: '#8b5cf6',
          svg: (
            <svg viewBox="0 0 40 40" className="w-8 h-8 stroke-current fill-none" strokeWidth="1.8">
              <circle cx="10" cy="14" r="3" className="fill-rose-500 stroke-none" />
              <circle cx="10" cy="26" r="3" className="fill-rose-500 stroke-none" />
              <circle cx="20" cy="10" r="3" className="fill-purple-500 stroke-none" />
              <circle cx="20" cy="20" r="3" className="fill-purple-500 stroke-none" />
              <circle cx="20" cy="30" r="3" className="fill-purple-500 stroke-none" />
              <circle cx="30" cy="20" r="3" className="fill-indigo-600 stroke-none" />
              <line x1="10" y1="14" x2="20" y2="10" className="stroke-rose-300" />
              <line x1="10" y1="14" x2="20" y2="20" className="stroke-rose-300" />
              <line x1="10" y1="26" x2="20" y2="20" className="stroke-rose-300" />
              <line x1="10" y1="26" x2="20" y2="30" className="stroke-rose-300" />
              <line x1="20" y1="10" x2="30" y2="20" className="stroke-purple-300" />
              <line x1="20" y1="20" x2="30" y2="20" className="stroke-purple-300" />
              <line x1="20" y1="30" x2="30" y2="20" className="stroke-purple-300" />
            </svg>
          ),
        };
      case 'generative-ai':
      case 'rag':
        return {
          color: '#8b5cf6',
          accent: '#06b6d4',
          svg: (
            <svg viewBox="0 0 40 40" className="w-8 h-8 stroke-current fill-none" strokeWidth="1.8">
              <path d="M20 6 L23 15 L32 17 L25 23 L27 32 L20 27 L13 32 L15 23 L8 17 L17 15 Z" className="stroke-violet-500 fill-violet-500/10" />
              <circle cx="20" cy="19" r="2.5" className="fill-cyan-500 stroke-none" />
            </svg>
          ),
        };
      case 'yolo':
        return {
          color: '#0284c7',
          accent: '#f43f5e',
          svg: (
            <svg viewBox="0 0 40 40" className="w-8 h-8 stroke-current fill-none" strokeWidth="2">
              <rect x="8" y="10" width="24" height="20" rx="3" className="stroke-sky-600" fill="rgba(2,132,199,0.06)" />
              <polygon points="12,18 20,13 28,18 28,26 20,29 12,26" className="stroke-rose-500" strokeDasharray="2 2" />
              <circle cx="20" cy="21" r="2" className="fill-rose-600 stroke-none" />
            </svg>
          ),
        };
      case 'flask':
      case 'nodejs':
        return {
          color: '#10b981',
          accent: '#059669',
          svg: (
            <svg viewBox="0 0 40 40" className="w-8 h-8 stroke-current fill-none" strokeWidth="1.8">
              <path d="M16 8 L24 8 L24 14 L30 28 C31 31 29 33 26 33 L14 33 C11 33 9 31 10 28 L16 14 Z" className="stroke-emerald-600" fill="rgba(16,185,129,0.08)" />
              <circle cx="20" cy="24" r="2" className="fill-emerald-500 stroke-none" />
              <circle cx="16" cy="28" r="1.5" className="fill-teal-400 stroke-none" />
            </svg>
          ),
        };
      case 'mongodb':
        return {
          color: '#059669',
          accent: '#10b981',
          svg: (
            <svg viewBox="0 0 40 40" className="w-8 h-8 stroke-current fill-none" strokeWidth="1.8">
              <path d="M20 6 C20 6 12 14 12 22 C12 28 16 32 20 34 C24 32 28 28 28 22 C28 14 20 6 20 6 Z" className="stroke-emerald-600 fill-emerald-500/10" />
              <line x1="20" y1="6" x2="20" y2="34" className="stroke-emerald-500" />
            </svg>
          ),
        };
      case 'git':
        return {
          color: '#f97316',
          accent: '#ef4444',
          svg: (
            <svg viewBox="0 0 40 40" className="w-8 h-8 stroke-current fill-none" strokeWidth="2">
              <circle cx="14" cy="14" r="3.5" className="fill-orange-500 stroke-none" />
              <circle cx="14" cy="28" r="3.5" className="fill-orange-500 stroke-none" />
              <circle cx="26" cy="20" r="3.5" className="fill-rose-500 stroke-none" />
              <line x1="14" y1="17.5" x2="14" y2="24.5" className="stroke-orange-500" />
              <path d="M14 21 Q 20 21, 23 20" className="stroke-rose-400" />
            </svg>
          ),
        };
      case 'dsa':
      default:
        return {
          color: '#6366f1',
          accent: '#a855f7',
          svg: (
            <svg viewBox="0 0 40 40" className="w-8 h-8 stroke-current fill-none" strokeWidth="1.8">
              <rect x="8" y="8" width="10" height="10" rx="2" className="stroke-indigo-600 fill-indigo-50" />
              <rect x="22" y="8" width="10" height="10" rx="2" className="stroke-indigo-600 fill-indigo-50" />
              <rect x="15" y="22" width="10" height="10" rx="2" className="stroke-purple-600 fill-purple-50" />
              <line x1="13" y1="18" x2="17" y2="22" className="stroke-indigo-400" />
              <line x1="27" y1="18" x2="23" y2="22" className="stroke-purple-400" />
            </svg>
          ),
        };
    }
  };

  const config = getSymbolConfig();

  return (
    <div
      className="relative w-12 h-12 rounded-xl bg-slate-50/90 border border-slate-200/90 flex items-center justify-center shrink-0 shadow-sm transition-all duration-300 ease-out"
      style={{
        transform: isHovered
          ? 'perspective(400px) rotateX(12deg) rotateY(-15deg) scale(1.08)'
          : 'perspective(400px) rotateX(0deg) rotateY(0deg) scale(1)',
        borderColor: isHovered ? config.color : 'rgba(226, 232, 240, 0.9)',
        boxShadow: isHovered
          ? `0 8px 20px -4px ${config.color}35`
          : '0 2px 6px -1px rgba(0,0,0,0.03)',
      }}
    >
      <div
        className="transition-transform duration-300 ease-out"
        style={{
          transform: isHovered ? 'scale(1.06)' : 'scale(1)',
        }}
      >
        {config.svg}
      </div>
      {/* Corner subtle color tick */}
      <div
        className="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l rounded-tl-sm transition-colors"
        style={{ borderColor: isHovered ? config.color : 'rgba(148, 163, 184, 0.4)' }}
      />
      <div
        className="absolute bottom-1 right-1 w-1.5 h-1.5 border-b border-r rounded-br-sm transition-colors"
        style={{ borderColor: isHovered ? config.accent : 'rgba(148, 163, 184, 0.4)' }}
      />
    </div>
  );
};

export default Skill3DSymbol;
