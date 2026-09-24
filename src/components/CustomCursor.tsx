import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');

  const springConfig = { damping: 25, stiffness: 350 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  useEffect(() => {
    // Disable on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleInteractiveOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('a, button, [data-cursor], .interactive-hover');
      if (interactive) {
        setIsHovered(true);
        const text = interactive.getAttribute('data-cursor');
        if (text) setCursorText(text);
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleInteractiveOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleInteractiveOver);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer reticle / ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-cyan-400/60 pointer-events-none flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
        style={{
          x: mouseX,
          y: mouseY,
          width: isHovered ? 52 : 30,
          height: isHovered ? 52 : 30,
          backgroundColor: isHovered ? 'rgba(0, 240, 255, 0.08)' : 'transparent',
          borderColor: isHovered ? '#00f0ff' : 'rgba(0, 240, 255, 0.5)',
          boxShadow: isHovered
            ? '0 0 20px rgba(0, 240, 255, 0.4), inset 0 0 10px rgba(0, 240, 255, 0.2)'
            : '0 0 10px rgba(0, 240, 255, 0.2)',
          transition: 'width 0.2s ease, height 0.2s ease, background-color 0.2s ease, border-color 0.2s ease',
        }}
      >
        {/* Crosshair accents */}
        <div className="absolute top-0 w-1.5 h-[1px] bg-cyan-400" />
        <div className="absolute bottom-0 w-1.5 h-[1px] bg-cyan-400" />
        <div className="absolute left-0 h-1.5 w-[1px] bg-cyan-400" />
        <div className="absolute right-0 h-1.5 w-[1px] bg-cyan-400" />
      </motion.div>

      {/* Center glowing focal point */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-cyan-300 pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{
          x: mouseX,
          y: mouseY,
          boxShadow: '0 0 10px #00f0ff',
        }}
      />

      {cursorText && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed top-0 left-0 ml-7 mt-3 px-2 py-0.5 rounded bg-black/90 border border-cyan-500/50 text-[10px] font-mono text-cyan-300 uppercase tracking-widest whitespace-nowrap"
          style={{ x: mouseX, y: mouseY }}
        >
          {cursorText}
        </motion.div>
      )}
    </div>
  );
};
