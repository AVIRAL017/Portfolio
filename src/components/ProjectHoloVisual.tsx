import React, { useEffect, useRef } from 'react';

interface ProjectHoloVisualProps {
  type: 'aerion' | 'perigee' | 'hazard' | 'rakshak' | 'civic';
}

export const ProjectHoloVisual: React.FC<ProjectHoloVisualProps> = ({ type }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 360);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 220);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    let frame = 0;

    const render = () => {
      frame++;
      ctx.fillStyle = '#0d111a';
      ctx.fillRect(0, 0, width, height);

      // --- AERION: Satellite/Drone Imagery with YOLO Bounding Boxes + Heatmap ---
      if (type === 'aerion') {
        // Grid background
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 1;
        const step = 24;
        for (let x = 0; x < width; x += step) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = 0; y < height; y += step) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }

        // Change detection heatmap blob (xBD / xView2)
        const heatGrad = ctx.createRadialGradient(
          width * 0.55 + Math.sin(frame * 0.02) * 15,
          height * 0.45 + Math.cos(frame * 0.02) * 12,
          8,
          width * 0.55,
          height * 0.45,
          75
        );
        heatGrad.addColorStop(0, 'rgba(255, 59, 92, 0.55)');
        heatGrad.addColorStop(0.5, 'rgba(244, 63, 94, 0.25)');
        heatGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = heatGrad;
        ctx.beginPath();
        ctx.arc(width * 0.55, height * 0.45, 75, 0, Math.PI * 2);
        ctx.fill();

        // Scanning laser bar
        const scanY = (frame * 1.5) % height;
        const scanGrad = ctx.createLinearGradient(0, scanY - 15, 0, scanY + 15);
        scanGrad.addColorStop(0, 'transparent');
        scanGrad.addColorStop(0.5, 'rgba(255, 59, 92, 0.5)');
        scanGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = scanGrad;
        ctx.fillRect(0, scanY - 15, width, 30);

        // YOLO Bounding Boxes
        const boxes = [
          { x: width * 0.18, y: height * 0.22, w: 85, h: 52, label: 'DRONE_TGT 98.4%', color: '#38bdf8' },
          { x: width * 0.54, y: height * 0.38, w: 76, h: 68, label: 'DAMAGE_SSIM 94.1%', color: '#ff3b5c' },
          { x: width * 0.32, y: height * 0.62, w: 98, h: 44, label: 'OBB_MIL_VEH 96.8%', color: '#10b981' },
        ];

        boxes.forEach((b) => {
          ctx.strokeStyle = b.color;
          ctx.lineWidth = 1.8;
          ctx.strokeRect(b.x, b.y, b.w, b.h);

          // Box corner ticks
          ctx.fillStyle = b.color;
          ctx.fillRect(b.x - 2, b.y - 2, 8, 2.5);
          ctx.fillRect(b.x - 2, b.y - 2, 2.5, 8);
          ctx.fillRect(b.x + b.w - 6, b.y - 2, 8, 2.5);
          ctx.fillRect(b.x + b.w - 0.5, b.y - 2, 2.5, 8);

          // Label badge in dark slate with neon text
          ctx.font = 'bold 9px monospace';
          const textWidth = ctx.measureText(b.label).width;
          ctx.fillStyle = 'rgba(15, 20, 30, 0.9)';
          ctx.fillRect(b.x, b.y - 15, textWidth + 10, 14);
          ctx.strokeStyle = b.color;
          ctx.strokeRect(b.x, b.y - 15, textWidth + 10, 14);
          ctx.fillStyle = b.color;
          ctx.fillText(b.label, b.x + 5, b.y - 4);
        });

        // Top-right telemetry
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = '9px monospace';
        ctx.fillText('DUAL_OP: RESCUE // BORDER_PERIMETER', 12, 18);
        ctx.fillStyle = '#ff3b5c';
        ctx.fillText('TRIAGE: CRITICAL', width - 110, 18);
      }

      // --- PERIGEE: 3D Orbit Mechanics & LEO Conjunction Vectors ---
      else if (type === 'perigee') {
        const cx = width * 0.5;
        const cy = height * 0.5;

        // Wireframe Earth Sphere
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cx, cy, 42, 0, Math.PI * 2);
        ctx.stroke();

        for (let i = 1; i <= 3; i++) {
          ctx.beginPath();
          ctx.ellipse(cx, cy, 42, 12 * i, 0, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Orbit 1: Primary Satellite (Cyan)
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.ellipse(cx, cy, 115, 45, Math.PI * 0.25, 0, Math.PI * 2);
        ctx.stroke();

        // Orbit 2: Secondary Chaser Object (Crimson)
        ctx.strokeStyle = 'rgba(255, 59, 92, 0.6)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.ellipse(cx, cy, 105, 55, -Math.PI * 0.35, 0, Math.PI * 2);
        ctx.stroke();

        // Satellite 1 Position
        const sat1Angle = frame * 0.025;
        const s1x = cx + Math.cos(sat1Angle) * 115 * Math.cos(Math.PI * 0.25) - Math.sin(sat1Angle) * 45 * Math.sin(Math.PI * 0.25);
        const s1y = cy + Math.cos(sat1Angle) * 115 * Math.sin(Math.PI * 0.25) + Math.sin(sat1Angle) * 45 * Math.cos(Math.PI * 0.25);

        ctx.fillStyle = '#38bdf8';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(s1x, s1y, 4.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Satellite 2 Position
        const sat2Angle = frame * 0.022 + 2.1;
        const s2x = cx + Math.cos(sat2Angle) * 105 * Math.cos(-Math.PI * 0.35) - Math.sin(sat2Angle) * 55 * Math.sin(-Math.PI * 0.35);
        const s2y = cy + Math.cos(sat2Angle) * 105 * Math.sin(-Math.PI * 0.35) + Math.sin(sat2Angle) * 55 * Math.cos(-Math.PI * 0.35);

        ctx.fillStyle = '#ff3b5c';
        ctx.shadowColor = '#ff3b5c';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(s2x, s2y, 4.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Conjunction Vector line
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(s1x, s1y);
        ctx.lineTo(s2x, s2y);
        ctx.stroke();
        ctx.setLineDash([]);

        // Delta vector labels
        ctx.font = '9px monospace';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`ΔU, ΔV, ΔW: [0.12, -0.45, 0.08] km/s`, 12, 18);
        ctx.fillStyle = '#ff3b5c';
        ctx.fillText(`MISS_DIST: 184m // CARA HAZARD`, 12, 32);
      }

      // --- RAKSHAK: Sensor Fusion Grid across 149 Indian Cities ---
      else if (type === 'rakshak') {
        // Radar circular arcs
        const cx = width * 0.5;
        const cy = height * 0.5;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
        for (let r = 30; r < 140; r += 30) {
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Radar sweep line
        const sweepAngle = frame * 0.03;
        ctx.strokeStyle = 'rgba(255, 59, 92, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(sweepAngle) * 130, cy + Math.sin(sweepAngle) * 130);
        ctx.stroke();

        // City nodes with hazard severity
        const cities = [
          { x: cx - 50, y: cy - 25, label: 'KANPUR', risk: 'HIGH', col: '#ff3b5c' },
          { x: cx + 45, y: cy - 40, label: 'LUCKNOW', risk: 'MED', col: '#f59e0b' },
          { x: cx - 20, y: cy + 45, label: 'DELHI_NCR', risk: 'HIGH', col: '#ff3b5c' },
          { x: cx + 70, y: cy + 30, label: 'VARANASI', risk: 'LOW', col: '#10b981' },
          { x: cx - 75, y: cy + 20, label: 'AGRA', risk: 'MED', col: '#f59e0b' },
        ];

        cities.forEach((c) => {
          ctx.fillStyle = c.col;
          ctx.beginPath();
          ctx.arc(c.x, c.y, 4, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = c.col;
          ctx.beginPath();
          ctx.arc(c.x, c.y, 8 + Math.sin(frame * 0.08) * 3, 0, Math.PI * 2);
          ctx.stroke();

          ctx.font = '8px monospace';
          ctx.fillStyle = '#ffffff';
          ctx.fillText(c.label, c.x + 8, c.y + 3);
        });

        ctx.font = '9px monospace';
        ctx.fillStyle = '#ff3b5c';
        ctx.fillText('SENSOR FUSION: WEATHER + SEISMIC + TRAFFIC', 12, 18);
        ctx.fillStyle = '#38bdf8';
        ctx.fillText('149 CITIES // DISPATCH DISPATCH LATENCY: -34%', 12, 32);
      }

      // --- HAZARD: Chemical Gaussian Plume ---
      else if (type === 'hazard') {
        const cx = width * 0.25;
        const cy = height * 0.5;

        // Plume dispersion contour
        for (let i = 4; i >= 1; i--) {
          const pGrad = ctx.createRadialGradient(cx + i * 35, cy, 10, cx + i * 35, cy, i * 40);
          pGrad.addColorStop(0, i === 1 ? 'rgba(255, 59, 92, 0.7)' : 'rgba(245, 158, 11, 0.4)');
          pGrad.addColorStop(1, 'transparent');
          ctx.fillStyle = pGrad;
          ctx.beginPath();
          ctx.ellipse(cx + i * 35, cy, i * 45, i * 24, 0, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.font = '9px monospace';
        ctx.fillStyle = '#ff3b5c';
        ctx.fillText('GAUSSIAN PLUME DISPERSION // SIH1505', 12, 18);
      }

      // --- CIVIC: Service Node Matrix ---
      else {
        ctx.font = '9px monospace';
        ctx.fillStyle = '#38bdf8';
        ctx.fillText('CIVIC TELEMETRY: REAL-TIME GRIEVANCE PIPELINE', 12, 18);
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [type]);

  return (
    <div className="relative w-full h-48 sm:h-52 rounded-xl overflow-hidden border border-white/10 bg-[#0d111a] shadow-inner">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};

export default ProjectHoloVisual;
