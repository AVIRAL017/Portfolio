import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [cursorText, setCursorText] = useState('');

  // Spring physics for trailing follower
  const springConfig = { damping: 28, stiffness: 320, mass: 0.5 };
  const smoothX = useSpring(0, springConfig);
  const smoothY = useSpring(0, springConfig);

  // Immediate values for precision dot
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  useEffect(() => {
    // Disable on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      smoothX.set(e.clientX);
      smoothY.set(e.clientY);

      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleInteractiveOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('a, button, [data-cursor], .interactive-hover, input, textarea');
      if (interactive) {
        setIsHovered(true);
        const text = interactive.getAttribute('data-cursor');
        if (text) setCursorText(text);
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleInteractiveOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleInteractiveOver);
    };
  }, [isVisible, rawX, rawY, smoothX, smoothY]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden select-none">
      {/* Outer Spring-Damped Fluid Ring / Aura */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{
          x: smoothX,
          y: smoothY,
          width: isHovered ? 56 : 32,
          height: isHovered ? 56 : 32,
          backgroundColor: isHovered
            ? 'rgba(255, 59, 92, 0.15)'
            : 'rgba(255, 59, 92, 0.05)',
          borderWidth: isHovered ? '1.5px' : '1px',
          borderColor: isHovered
            ? 'rgba(255, 59, 92, 0.8)'
            : 'rgba(255, 59, 92, 0.4)',
          boxShadow: isHovered
            ? '0 0 25px rgba(255, 59, 92, 0.45), inset 0 0 15px rgba(255, 59, 92, 0.2)'
            : '0 0 12px rgba(255, 59, 92, 0.2)',
          scale: isClicked ? 0.85 : 1,
          transition: 'width 0.22s cubic-bezier(0.16, 1, 0.3, 1), height 0.22s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
        }}
      >
        {/* Subtle holographic orbit accent on hover */}
        {isHovered && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
            className="w-full h-full rounded-full border-t border-r border-rose-400"
          />
        )}
      </motion.div>

      {/* Center Precision Focal Dot - Instant tracking */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 bg-gradient-to-tr from-rose-500 via-rose-600 to-red-500 shadow-[0_0_10px_rgba(255,59,92,0.9)]"
        style={{
          x: rawX,
          y: rawY,
          width: isHovered ? 5 : 7,
          height: isHovered ? 5 : 7,
          opacity: isClicked ? 0.6 : 1,
          transition: 'width 0.15s ease, height 0.15s ease, opacity 0.15s ease',
        }}
      />

      {/* Floating Pill Tag with 3D aesthetic */}
      {cursorText && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed top-0 left-0 ml-7 mt-4 px-2.5 py-1 rounded-full bg-[#121826]/95 backdrop-blur-md border border-white/10 shadow-xl text-[10px] font-mono font-bold text-rose-300 tracking-wider uppercase whitespace-nowrap flex items-center gap-1.5"
          style={{ x: smoothX, y: smoothY }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
          <span>{cursorText}</span>
        </motion.div>
      )}
    </div>
  );
};
