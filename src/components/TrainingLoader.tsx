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
            setTimeout(onComplete, 600);
          }, 500);
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
    }, 28);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {stage !== 'ready' ? (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0b0e14] blueprint-grid overflow-hidden select-none"
        >
          {/* Ambient glow pulses */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-rose-500/15 blur-[130px] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-sky-500/10 blur-[100px] pointer-events-none" />

          {/* Holographic Loader Console Box */}
          <div className="relative w-[90%] max-w-lg p-6 sm:p-8 rounded-2xl bg-[#101622]/95 backdrop-blur-2xl border border-white/10 text-white shadow-2xl">
            {/* Header HUD bar */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center space-x-2">
                <Cpu className="w-5 h-5 text-rose-500 animate-pulse" />
                <span className="font-mono text-xs text-rose-400 font-bold tracking-wider uppercase">
                  WEIGHTS_INITIALIZATION // RUN_017
                </span>
              </div>
              <div className="flex items-center space-x-2 text-[11px] font-mono text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                <span className="font-semibold text-emerald-400">CUDA: ACTIVE</span>
              </div>
            </div>

            {/* Neural Net Layer Status Grid */}
            <div className="space-y-4 mb-6 font-mono text-xs">
              <div className="flex justify-between items-center bg-slate-900/80 p-3 rounded-xl border border-white/10">
                <span className="text-slate-400 font-semibold">TRAINING EPOCH</span>
                <span className="text-rose-400 font-bold text-sm">
                  {epoch.toString().padStart(2, '0')} / 50
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-900/80 p-3 rounded-xl border border-white/10">
                  <div className="text-slate-400 text-[10px] mb-1 font-semibold">CROSS-ENTROPY LOSS</div>
                  <div className="text-amber-400 font-bold text-sm flex items-center gap-1.5">
                    <span>{loss.toFixed(4)}</span>
                    <span className="text-[10px] text-amber-500/80 font-normal">↓ decaying</span>
                  </div>
                </div>

                <div className="bg-slate-900/80 p-3 rounded-xl border border-white/10">
                  <div className="text-slate-400 text-[10px] mb-1 font-semibold">VALIDATION ACCURACY</div>
                  <div className="text-emerald-400 font-bold text-sm flex items-center gap-1.5">
                    <span>{accuracy.toFixed(1)}%</span>
                    <span className="text-[10px] text-emerald-500/80 font-normal">↑ rising</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Animated Progress Bar */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-[11px] font-mono text-slate-400">
                <span>CONVERGENCE_PIPELINE</span>
                <span className="text-rose-400 font-bold">{Math.round((epoch / 50) * 100)}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-white/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-rose-600 via-rose-500 to-red-500 shadow-md shadow-rose-600/30"
                  style={{ width: `${(epoch / 50) * 100}%` }}
                />
              </div>
            </div>

            {/* Bottom Status Terminal Output */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-rose-500" />
                <span>
                  {stage === 'converged' ? 'WEIGHT_MATRIX_CONVERGED' : 'OPTIMIZING_GRADIENTS...'}
                </span>
              </span>

              {stage === 'converged' && (
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>READY</span>
                </span>
              )}
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default TrainingLoader;
