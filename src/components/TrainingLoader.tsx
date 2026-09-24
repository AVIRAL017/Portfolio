import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Terminal, Zap, CheckCircle2 } from 'lucide-react';

interface TrainingLoaderProps {
  onComplete: () => void;
}

export const TrainingLoader: React.FC<TrainingLoaderProps> = ({ onComplete }) => {
  const [epoch, setEpoch] = useState(1);
  const [loss, setLoss] = useState(0.892);
  const [accuracy, setAccuracy] = useState(38.4);
  const [stage, setStage] = useState<'optimizing' | 'converged' | 'ready'>('optimizing');

  useEffect(() => {
    const totalEpochs = 50;
    const interval = setInterval(() => {
      setEpoch((prev) => {
        if (prev >= totalEpochs) {
          clearInterval(interval);
          setStage('converged');
          setTimeout(() => {
            setStage('ready');
            setTimeout(onComplete, 700);
          }, 600);
          return totalEpochs;
        }

        const next = prev + 1;
        const progress = next / totalEpochs;
        
        // Realistic decay and ascent curves
        const currentLoss = Math.max(0.024, 0.892 * Math.exp(-progress * 3.4) + (Math.random() * 0.015 - 0.007));
        const currentAcc = Math.min(99.4, 38.4 + (99.4 - 38.4) * (1 - Math.exp(-progress * 3.1)) + (Math.random() * 0.4 - 0.2));
        
        setLoss(Number(currentLoss.toFixed(4)));
        setAccuracy(Number(currentAcc.toFixed(1)));
        return next;
      });
    }, 38);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {stage !== 'ready' ? (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a1124] blueprint-grid overflow-hidden select-none"
        >
          {/* Ambient glow pulses */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-cyan-500/20 blur-[120px] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-violet-600/20 blur-[100px] pointer-events-none" />

          {/* Holographic Loader Terminal Box */}
          <div className="relative w-[90%] max-w-lg p-6 sm:p-8 rounded-2xl hud-panel border border-cyan-400/40 text-slate-100 shadow-2xl">
            {/* Header HUD bar */}
            <div className="flex items-center justify-between pb-4 border-b border-cyan-500/20 mb-6">
              <div className="flex items-center space-x-2">
                <Cpu className="w-5 h-5 text-cyan-400 animate-pulse" />
                <span className="font-mono text-xs text-cyan-300 font-semibold tracking-wider uppercase">
                  WEIGHTS_INITIALIZATION // RUN_017
                </span>
              </div>
              <div className="flex items-center space-x-2 text-[11px] font-mono text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                <span>CUDA: ACTIVE</span>
              </div>
            </div>

            {/* Neural Net Layer Status Grid */}
            <div className="space-y-4 mb-6 font-mono text-xs">
              <div className="flex justify-between items-center bg-black/40 p-3 rounded-lg border border-cyan-900/40">
                <span className="text-slate-400">TRAINING EPOCH</span>
                <span className="text-cyan-300 font-bold text-sm">
                  {epoch.toString().padStart(2, '0')} / 50
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-black/40 p-3 rounded-lg border border-cyan-900/40">
                  <div className="text-slate-400 text-[10px] mb-1">CROSS-ENTROPY LOSS</div>
                  <div className="text-amber-400 font-bold text-sm flex items-center gap-1.5">
                    <span>{loss.toFixed(4)}</span>
                    <span className="text-[10px] text-amber-500/70 font-normal">↓ decaying</span>
                  </div>
                </div>

                <div className="bg-black/40 p-3 rounded-lg border border-cyan-900/40">
                  <div className="text-slate-400 text-[10px] mb-1">VALIDATION ACCURACY</div>
                  <div className="text-emerald-400 font-bold text-sm flex items-center gap-1.5">
                    <span>{accuracy.toFixed(1)}%</span>
                    <span className="text-[10px] text-emerald-500/70 font-normal">↑ rising</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div>
                <div className="flex justify-between text-[11px] text-slate-400 mb-1.5">
                  <span className="flex items-center gap-1">
                    <Terminal className="w-3 h-3 text-cyan-400" />
                    <span>{stage === 'converged' ? 'SYNAPSES STABILIZED' : 'BACKPROPAGATING GRADIENTS...'}</span>
                  </span>
                  <span className="text-cyan-400">{Math.round((epoch / 50) * 100)}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-cyan-950">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500"
                    style={{ width: `${(epoch / 50) * 100}%` }}
                    transition={{ ease: 'linear' }}
                  />
                </div>
              </div>
            </div>

            {/* Neural Topology Preview Nodes */}
            <div className="py-2 flex items-center justify-between px-3 border border-dashed border-cyan-500/20 rounded bg-cyan-950/10 text-[11px] font-mono text-cyan-300">
              <div className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>INPUT [128]</span>
              </div>
              <span className="text-slate-600">→</span>
              <div className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                <span>HIDDEN [512×2]</span>
              </div>
              <span className="text-slate-600">→</span>
              <div className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>OUTPUT [CV/GENAI]</span>
              </div>
            </div>

            {/* Status Footer */}
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
                {stage === 'converged' ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-300 font-semibold">ALL TENSORS CONVERGED</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 text-cyan-400 animate-spin" />
                    <span>CALCULATING LOSS TENSORS...</span>
                  </>
                )}
              </div>

              <button
                onClick={onComplete}
                className="text-xs font-mono text-slate-400 hover:text-cyan-300 underline underline-offset-4 decoration-cyan-500/40 transition-colors"
              >
                Skip [ESC]
              </button>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
