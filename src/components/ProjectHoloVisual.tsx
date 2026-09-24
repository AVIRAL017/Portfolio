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
      ctx.clearRect(0, 0, width, height);

      // --- AERION: Satellite/Drone Imagery with YOLO Bounding Boxes + Heatmap ---
      if (type === 'aerion') {
        // Grid background
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.12)';
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

        // Change detection heatmap blob
        const heatGrad = ctx.createRadialGradient(
          width * 0.55 + Math.sin(frame * 0.02) * 20,
          height * 0.45 + Math.cos(frame * 0.02) * 15,
          10,
          width * 0.55,
          height * 0.45,
          70
        );
        heatGrad.addColorStop(0, 'rgba(239, 68, 68, 0.4)');
        heatGrad.addColorStop(0.5, 'rgba(245, 158, 11, 0.25)');
        heatGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = heatGrad;
        ctx.beginPath();
        ctx.arc(width * 0.55, height * 0.45, 70, 0, Math.PI * 2);
        ctx.fill();

        // Scanning laser bar
        const scanY = (frame * 1.5) % height;
        const scanGrad = ctx.createLinearGradient(0, scanY - 15, 0, scanY + 15);
        scanGrad.addColorStop(0, 'transparent');
        scanGrad.addColorStop(0.5, 'rgba(0, 240, 255, 0.6)');
        scanGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = scanGrad;
        ctx.fillRect(0, scanY - 15, width, 30);

        // YOLO Bounding Boxes
        const boxes = [
          { x: width * 0.2, y: height * 0.25, w: 75, h: 50, label: 'DRONE_TGT 98.4%', color: '#00f0ff' },
          { x: width * 0.58, y: height * 0.4, w: 65, h: 65, label: 'DAMAGE_SSIM 94.1%', color: '#ef4444' },
          { x: width * 0.35, y: height * 0.6, w: 90, h: 40, label: 'OBB_MIL_VEH 96.8%', color: '#10b981' },
        ];

        boxes.forEach((b) => {
          ctx.strokeStyle = b.color;
          ctx.lineWidth = 1.5;
          ctx.strokeRect(b.x, b.y, b.w, b.h);

          // Box corner ticks
          ctx.fillStyle = b.color;
          ctx.fillRect(b.x - 2, b.y - 2, 6, 2);
          ctx.fillRect(b.x - 2, b.y - 2, 2, 6);
          ctx.fillRect(b.x + b.w - 4, b.y - 2, 6, 2);
          ctx.fillRect(b.x + b.w, b.y - 2, 2, 6);

          // Label badge
          ctx.font = '9px monospace';
          ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
          ctx.fillRect(b.x, b.y - 14, ctx.measureText(b.label).width + 8, 14);
          ctx.fillStyle = b.color;
          ctx.fillText(b.label, b.x + 4, b.y - 4);
        });
      }

      // --- PERIGEE: Orbit Lines with Collision-Risk Conjunction Markers ---
      else if (type === 'perigee') {
        const cx = width / 2;
        const cy = height / 2;

        // Central celestial body / Earth wireframe
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.4)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cx, cy, 32, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.ellipse(cx, cy, 32, 12, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.2)';
        ctx.stroke();

        // Orbit 1: Primary Satellite
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(-0.4);
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.6)';
        ctx.lineWidth = 1.2;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.ellipse(0, 0, width * 0.38, height * 0.32, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);

        // Satellite A position
        const angleA = frame * 0.02;
        const ax = Math.cos(angleA) * (width * 0.38);
        const ay = Math.sin(angleA) * (height * 0.32);
        ctx.fillStyle = '#00f0ff';
        ctx.beginPath();
        ctx.arc(ax, ay, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Orbit 2: Secondary Object (Conjunction candidate)
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(0.5);
        ctx.strokeStyle = 'rgba(168, 85, 247, 0.6)';
        ctx.lineWidth = 1.2;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.ellipse(0, 0, width * 0.36, height * 0.28, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);

        // Satellite B position
        const angleB = frame * 0.025 + 0.8;
        const bx = Math.cos(angleB) * (width * 0.36);
        const by = Math.sin(angleB) * (height * 0.28);
        ctx.fillStyle = '#ec4899';
        ctx.beginPath();
        ctx.arc(bx, by, 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Conjunction Risk Crosshair
        const conX = cx + width * 0.18;
        const conY = cy - height * 0.12;
        const conPulse = Math.sin(frame * 0.08) * 4 + 14;

        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(conX, conY, conPulse, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = '#f59e0b';
        ctx.font = '9px monospace';
        ctx.fillText('CONJUNCTION // MISS: 480m', conX - 55, conY - conPulse - 4);
        ctx.fillText('XGBOOST RISK: 79% HIGH', conX - 50, conY + conPulse + 12);
      }

      // --- HAZARD_AI: Chemical Plume Dispersion & Affected Infrastructure ---
      else if (type === 'hazard') {
        const sourceX = width * 0.2;
        const sourceY = height * 0.5;

        // Plume concentration contours (Gaussian envelope)
        const plumeWidth = width * 0.7;
        for (let r = 3; r >= 1; r--) {
          ctx.beginPath();
          ctx.moveTo(sourceX, sourceY);
          const spreadY = 16 * r;
          ctx.quadraticCurveTo(
            sourceX + plumeWidth * 0.4,
            sourceY - spreadY * 1.5,
            sourceX + plumeWidth,
            sourceY - spreadY * 2.5
          );
          ctx.lineTo(sourceX + plumeWidth, sourceY + spreadY * 2.5);
          ctx.quadraticCurveTo(
            sourceX + plumeWidth * 0.4,
            sourceY + spreadY * 1.5,
            sourceX,
            sourceY
          );
          ctx.closePath();

          ctx.fillStyle =
            r === 3
              ? 'rgba(239, 68, 68, 0.12)'
              : r === 2
              ? 'rgba(245, 158, 11, 0.18)'
              : 'rgba(239, 68, 68, 0.35)';
          ctx.fill();
          ctx.strokeStyle = r === 1 ? '#ef4444' : r === 2 ? '#f59e0b' : '#38bdf8';
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Release Origin Tank
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(sourceX, sourceY, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = '9px monospace';
        ctx.fillText('LEAK SOURCE: NH3', sourceX - 35, sourceY - 12);

        // Affected OSM infrastructure markers
        const assets = [
          { x: width * 0.5, y: height * 0.42, name: 'HOSPITAL [T-IMPACT: 8m]' },
          { x: width * 0.72, y: height * 0.62, name: 'SCHOOL [T-IMPACT: 14m]' },
        ];
        assets.forEach((a) => {
          ctx.fillStyle = '#f59e0b';
          ctx.fillRect(a.x - 3, a.y - 3, 6, 6);
          ctx.font = '8px monospace';
          ctx.fillText(a.name, a.x + 6, a.y + 3);
        });

        // Safe evacuation path (A* route)
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 3]);
        ctx.beginPath();
        ctx.moveTo(width * 0.45, height * 0.65);
        ctx.lineTo(width * 0.45, height * 0.85);
        ctx.lineTo(width * 0.85, height * 0.85);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = '#10b981';
        ctx.fillText('A* EVACUATION ROUTE', width * 0.52, height * 0.82);
      }

      // --- RAKSHAK: Gradient-Boosted Decision Tree Graph & Emergency Dispatch ---
      else if (type === 'rakshak') {
        // Tree nodes and branching
        const nodes = [
          { x: width * 0.5, y: height * 0.2, label: 'TRAFFIC > 0.8' },
          { x: width * 0.3, y: height * 0.48, label: 'WEATHER: RAIN' },
          { x: width * 0.7, y: height * 0.48, label: 'SEISMIC: LOW' },
          { x: width * 0.18, y: height * 0.78, label: 'HOTSPOT [CITY 42]' },
          { x: width * 0.42, y: height * 0.78, label: 'DISPATCH AMB_07' },
          { x: width * 0.62, y: height * 0.78, label: 'CLEAR ROUTE' },
          { x: width * 0.82, y: height * 0.78, label: 'STANDBY' },
        ];

        // Draw branches
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.4)';
        ctx.lineWidth = 1.2;

        const connections = [
          [0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6]
        ];

        connections.forEach(([from, to]) => {
          ctx.beginPath();
          ctx.moveTo(nodes[from].x, nodes[from].y);
          ctx.lineTo(nodes[to].x, nodes[to].y);
          ctx.stroke();
        });

        // Pulsing active path
        const pulseProgress = (frame * 0.03) % 2;
        if (pulseProgress < 1) {
          ctx.strokeStyle = '#00f0ff';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(nodes[0].x, nodes[0].y);
          ctx.lineTo(nodes[1].x, nodes[1].y);
          ctx.stroke();
        }

        // Draw nodes
        nodes.forEach((n, idx) => {
          ctx.fillStyle = idx === 3 ? '#ef4444' : idx === 4 ? '#10b981' : '#0a1326';
          ctx.strokeStyle = '#00f0ff';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(n.x, n.y, 10, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = '#e2e8f0';
          ctx.font = '8px monospace';
          ctx.textAlign = 'center';
          ctx.fillText(n.label, n.x, n.y + 19);
        });
        ctx.textAlign = 'left';
      }

      // --- CIVIC PORTAL: Wireframe City & Data-Flow Graph ---
      else if (type === 'civic') {
        const cx = width / 2;
        const cy = height * 0.65;

        // Isometric building blocks
        const buildings = [
          { x: cx - 60, y: cy - 20, w: 28, h: 45, d: 20 },
          { x: cx - 20, y: cy + 10, w: 35, h: 60, d: 25 },
          { x: cx + 30, y: cy - 15, w: 32, h: 50, d: 22 },
          { x: cx + 70, y: cy + 15, w: 25, h: 35, d: 18 },
        ];

        ctx.strokeStyle = 'rgba(0, 240, 255, 0.5)';
        ctx.fillStyle = 'rgba(10, 19, 38, 0.6)';
        ctx.lineWidth = 1;

        buildings.forEach((b) => {
          // Front face
          ctx.fillRect(b.x, b.y - b.h, b.w, b.h);
          ctx.strokeRect(b.x, b.y - b.h, b.w, b.h);

          // Top face (isometric)
          ctx.beginPath();
          ctx.moveTo(b.x, b.y - b.h);
          ctx.lineTo(b.x + b.d * 0.7, b.y - b.h - b.d * 0.4);
          ctx.lineTo(b.x + b.w + b.d * 0.7, b.y - b.h - b.d * 0.4);
          ctx.lineTo(b.x + b.w, b.y - b.h);
          ctx.closePath();
          ctx.fillStyle = 'rgba(168, 85, 247, 0.3)';
          ctx.fill();
          ctx.stroke();
        });

        // Floating civic grievance pulses
        const t = frame * 0.05;
        for (let i = 0; i < 4; i++) {
          const px = cx - 50 + i * 36;
          const py = cy - 65 - Math.sin(t + i) * 10;
          ctx.fillStyle = i === 1 ? '#ef4444' : '#00f0ff';
          ctx.beginPath();
          ctx.arc(px, py, 3.5, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = '#00f0ff';
        ctx.font = '9px monospace';
        ctx.fillText('LIVE_FIR_FEED // NODE.JS + MONGO PIPELINE', cx - 110, height * 0.18);
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
    <div className="relative w-full h-44 sm:h-52 rounded-xl bg-black/60 border border-cyan-500/20 overflow-hidden flex items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-full block" />
      {/* Corner brackets */}
      <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-cyan-400 pointer-events-none" />
      <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-cyan-400 pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-cyan-400 pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-cyan-400 pointer-events-none" />
    </div>
  );
};
