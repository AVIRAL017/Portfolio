import React from 'react';
import { motion } from 'framer-motion';

interface SectionDividerProps {
  label?: string;
  step?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  label = "∇L(θ) GRADIENT_FLOW",
  step = "STEP_0x17"
}) => {
  return (
    <div className="relative w-full py-8 overflow-hidden select-none pointer-events-none">
      {/* CAD Axis Ticks */}
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between text-[10px] font-mono text-cyan-500/40 mb-2">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-cyan-400 rounded-sm" />
          <span>{label}</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-slate-600">
          <span>LEARNING_RATE: 0.0003</span>
          <span>WEIGHT_DECAY: 1e-4</span>
          <span>MOMENTUM: 0.98</span>
        </div>
        <div className="text-violet-400/60 font-semibold">{step}</div>
      </div>

      {/* Animated Loss Curve Canvas/SVG */}
      <div className="relative h-8 w-full">
        {/* Baseline */}
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

        {/* Sinusoidal Loss Curve */}
        <svg
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
          viewBox="0 0 1200 40"
        >
          <path
            d="M0,20 Q150,5 300,20 T600,20 T900,20 T1200,20"
            fill="none"
            stroke="url(#lossGrad)"
            strokeWidth="1.5"
            strokeDasharray="4 2"
          />
          <defs>
            <linearGradient id="lossGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#00f0ff" stopOpacity="0.8" />
              <stop offset="80%" stopColor="#a855f7" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>

        {/* Gradient Descent Particle moving across curve */}
        <motion.div
          animate={{
            x: ['-5%', '105%'],
            y: [16, 6, 26, 12, 22, 16],
          }}
          transition={{
            x: { repeat: Infinity, duration: 6, ease: 'linear' },
            y: { repeat: Infinity, duration: 3, ease: 'easeInOut' },
          }}
          className="absolute top-0 left-0 w-2.5 h-2.5 rounded-full bg-cyan-300 shadow-[0_0_12px_#00f0ff]"
        />
      </div>
    </div>
  );
};
