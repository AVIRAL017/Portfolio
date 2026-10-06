import React, { useEffect, useRef } from 'react';

export const Hero2DFallback: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      // Deep dark floor with isometric grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      const step = 40;
      for (let x = -width; x < width * 2; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + height * 0.8, height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x - height * 0.8, height);
        ctx.stroke();
      }

      // Conveyor path projection
      const cx = width * 0.5;
      const cy = height * 0.52;

      // Draw glowing conduit lines
      ctx.strokeStyle = 'rgba(255, 59, 92, 0.35)';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(cx - 220, cy - 80);
      ctx.quadraticCurveTo(cx - 60, cy + 40, cx + 180, cy - 20);
      ctx.stroke();

      // Traveling pulse packet
      const prog = (frame * 0.015) % 1;
      const px = (1 - prog) * (1 - prog) * (cx - 220) + 2 * (1 - prog) * prog * (cx - 60) + prog * prog * (cx + 180);
      const py = (1 - prog) * (1 - prog) * (cy - 80) + 2 * (1 - prog) * prog * (cy + 40) + prog * prog * (cy - 20);

      ctx.fillStyle = '#ff3b5c';
      ctx.shadowColor = '#ff3b5c';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(px, py, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw isometric conveyor cubes
      for (let i = 0; i < 4; i++) {
        const cProg = ((frame * 0.008 + i * 0.25) % 1);
        const bx = cx - 180 + cProg * 280;
        const by = cy - 40 + cProg * 110;

        ctx.fillStyle = cProg > 0.5 ? 'rgba(255, 59, 92, 0.85)' : 'rgba(30, 41, 59, 0.85)';
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 1;

        // Draw isometric diamond cube top
        ctx.beginPath();
        ctx.moveTo(bx, by - 12);
        ctx.lineTo(bx + 18, by - 3);
        ctx.lineTo(bx, by + 6);
        ctx.lineTo(bx - 18, by - 3);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none opacity-60"
    />
  );
};

export default Hero2DFallback;
