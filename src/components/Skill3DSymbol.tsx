import React, { useEffect, useRef } from 'react';
import { SkillIconType } from '../data/content';

interface Skill3DSymbolProps {
  type: SkillIconType;
  isHovered?: boolean;
}

export const Skill3DSymbol: React.FC<Skill3DSymbolProps> = ({ type, isHovered = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const size = 56;
    canvas.width = size * window.devicePixelRatio;
    canvas.height = size * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    let angleX = 0.4;
    let angleY = 0;
    let angleZ = 0;

    // Define 3D vertices and edges based on type
    const getGeometry = (): {
      vertices: [number, number, number][];
      edges: [number, number][];
      primaryColor: string;
      secondaryColor: string;
    } => {
      switch (type) {
        // Python: Dual Interlocking 3D Hexagon loops
        case 'python': {
          const s = 14;
          return {
            vertices: [
              [-s, -s * 0.5, -4], [0, -s, -4], [s, -s * 0.5, -4],
              [s, s * 0.5, -4], [0, s, -4], [-s, s * 0.5, -4],
              [-s * 0.7, -s * 0.35, 4], [0, -s * 0.7, 4], [s * 0.7, -s * 0.35, 4],
              [s * 0.7, s * 0.35, 4], [0, s * 0.7, 4], [-s * 0.7, s * 0.35, 4],
            ],
            edges: [
              [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0],
              [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], [11, 6],
              [0, 6], [2, 8], [4, 10]
            ],
            primaryColor: '#00f0ff',
            secondaryColor: '#fbbf24',
          };
        }

        // C / C++: 3D Wireframe Octahedron
        case 'c':
        case 'cpp': {
          const s = 16;
          return {
            vertices: [
              [0, -s, 0], [s, 0, 0], [0, s, 0], [-s, 0, 0],
              [0, 0, s], [0, 0, -s]
            ],
            edges: [
              [0, 1], [1, 2], [2, 3], [3, 0],
              [0, 4], [1, 4], [2, 4], [3, 4],
              [0, 5], [1, 5], [2, 5], [3, 5]
            ],
            primaryColor: '#38bdf8',
            secondaryColor: '#a855f7',
          };
        }

        // Web Standards (HTML5 / CSS3): 3D Truncated Cube
        case 'html5':
        case 'css3': {
          const s = 13;
          return {
            vertices: [
              [-s, -s, -s], [s, -s, -s], [s, s, -s], [-s, s, -s],
              [-s, -s, s], [s, -s, s], [s, s, s], [-s, s, s],
            ],
            edges: [
              [0, 1], [1, 2], [2, 3], [3, 0],
              [4, 5], [5, 6], [6, 7], [7, 4],
              [0, 4], [1, 5], [2, 6], [3, 7]
            ],
            primaryColor: type === 'html5' ? '#f97316' : '#3b82f6',
            secondaryColor: '#00f0ff',
          };
        }

        // Decision Tree / Random Forest: 3D Fractal Branching Tree
        case 'decision-tree':
        case 'random-forest': {
          return {
            vertices: [
              [0, -16, 0],
              [-10, -4, -6], [10, -4, 6],
              [-15, 10, -10], [-5, 10, -2], [5, 10, 2], [15, 10, 10]
            ],
            edges: [
              [0, 1], [0, 2],
              [1, 3], [1, 4],
              [2, 5], [2, 6]
            ],
            primaryColor: '#34d399',
            secondaryColor: '#00f0ff',
          };
        }

        // Gradient Boosting / XGBoost / CatBoost: 3D Loss Manifold
        case 'gradient-boost':
        case 'xgboost':
        case 'catboost':
        case 'supervised-learning': {
          const s = 14;
          return {
            vertices: [
              [-s, -s * 0.7, 0], [0, -s, 8], [s, -s * 0.7, 0],
              [-s * 0.7, 0, -8], [0, 0, 0], [s * 0.7, 0, -8],
              [-s, s * 0.7, 0], [0, s, 8], [s, s * 0.7, 0]
            ],
            edges: [
              [0, 1], [1, 2], [3, 4], [4, 5], [6, 7], [7, 8],
              [0, 3], [3, 6], [1, 4], [4, 7], [2, 5], [5, 8]
            ],
            primaryColor: '#fbbf24',
            secondaryColor: '#f43f5e',
          };
        }

        // Computer Vision / Object Detection / YOLO: 3D Oriented Bounding Prism
        case 'computer-vision':
        case 'object-detection':
        case 'yolo': {
          const w = 15;
          const h = 11;
          const d = 11;
          return {
            vertices: [
              [-w, -h, -d], [w, -h, -d], [w, h, -d], [-w, h, -d],
              [-w, -h, d], [w, -h, d], [w, h, d], [-w, h, d],
              [0, 0, 0], [0, -h * 1.5, 0]
            ],
            edges: [
              [0, 1], [1, 2], [2, 3], [3, 0],
              [4, 5], [5, 6], [6, 7], [7, 4],
              [0, 4], [1, 5], [2, 6], [3, 7],
              [8, 9]
            ],
            primaryColor: '#00f0ff',
            secondaryColor: '#10b981',
          };
        }

        // Deep Learning / Neural Network: 3D Synaptic Polytope
        case 'deep-learning':
        case 'change-detection': {
          const s = 14;
          return {
            vertices: [
              [-s, -s * 0.6, 0], [-s, s * 0.6, 0],
              [0, -s, -s * 0.5], [0, s, -s * 0.5], [0, 0, s * 0.8],
              [s, -s * 0.6, 0], [s, s * 0.6, 0]
            ],
            edges: [
              [0, 2], [0, 3], [0, 4],
              [1, 2], [1, 3], [1, 4],
              [2, 5], [3, 5], [4, 5],
              [2, 6], [3, 6], [4, 6]
            ],
            primaryColor: '#a855f7',
            secondaryColor: '#ec4899',
          };
        }

        // Generative AI / RAG: 3D Radiant Stellated Octahedron
        case 'generative-ai':
        case 'rag': {
          const s = 14;
          const r = 8;
          return {
            vertices: [
              [0, -s, 0], [0, s, 0], [-s, 0, 0], [s, 0, 0], [0, 0, -s], [0, 0, s],
              [-r, -r, -r], [r, -r, -r], [r, r, -r], [-r, r, -r],
              [-r, -r, r], [r, -r, r], [r, r, r], [-r, r, r]
            ],
            edges: [
              [0, 6], [0, 7], [0, 10], [0, 11],
              [1, 8], [1, 9], [1, 12], [1, 13],
              [2, 6], [2, 9], [2, 10], [2, 13],
              [3, 7], [3, 8], [3, 11], [3, 12]
            ],
            primaryColor: '#ec4899',
            secondaryColor: '#00f0ff',
          };
        }

        // PyTorch: 3D Tensor Prism with Flame Matrix
        case 'pytorch': {
          const s = 14;
          return {
            vertices: [
              [-s, -s, -s * 0.5], [s, -s, -s * 0.5], [s, s, -s * 0.5], [-s, s, -s * 0.5],
              [0, -s * 1.5, s], [s * 0.8, s, s], [-s * 0.8, s, s]
            ],
            edges: [
              [0, 1], [1, 2], [2, 3], [3, 0],
              [0, 4], [1, 4], [2, 5], [3, 6], [4, 5], [5, 6], [6, 4]
            ],
            primaryColor: '#ef4444',
            secondaryColor: '#f97316',
          };
        }

        // Flask / Node.js / MongoDB / Git / DSA: 3D Isometric Crystal / Prism
        default: {
          const s = 14;
          return {
            vertices: [
              [-s, -s * 0.6, -s * 0.6], [s, -s * 0.6, -s * 0.6],
              [s, s * 0.6, -s * 0.6], [-s, s * 0.6, -s * 0.6],
              [0, -s * 1.2, s * 0.8], [0, s * 1.2, s * 0.8]
            ],
            edges: [
              [0, 1], [1, 2], [2, 3], [3, 0],
              [0, 4], [1, 4], [2, 5], [3, 5], [4, 5]
            ],
            primaryColor: '#34d399',
            secondaryColor: '#00f0ff',
          };
        }
      }
    };

    const geom = getGeometry();

    const render = () => {
      // Rotation speed accelerates smoothly on hover
      const speed = isHovered ? 0.045 : 0.02;
      angleY += speed;
      angleX += speed * 0.6;
      angleZ += speed * 0.3;

      ctx.clearRect(0, 0, size, size);

      const cx = size / 2;
      const cy = size / 2;
      const fov = 80;

      // Project vertices with 3D rotation matrix
      const projected = geom.vertices.map(([x, y, z]) => {
        // Rotate Y
        const cosY = Math.cos(angleY);
        const sinY = Math.sin(angleY);
        const x1 = x * cosY - z * sinY;
        const z1 = z * cosY + x * sinY;

        // Rotate X
        const cosX = Math.cos(angleX);
        const sinX = Math.sin(angleX);
        const y2 = y * cosX - z1 * sinX;
        const z2 = z1 * cosX + y * sinX;

        // Perspective division
        const distance = fov + z2;
        const scale = fov / (distance > 10 ? distance : 10);
        return {
          x: cx + x1 * scale,
          y: cy + y2 * scale,
          z: z2,
        };
      });

      // Draw Edges with glow
      geom.edges.forEach(([i, j]) => {
        const p1 = projected[i];
        const p2 = projected[j];

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = geom.primaryColor;
        ctx.lineWidth = isHovered ? 2.2 : 1.5;
        ctx.shadowColor = geom.primaryColor;
        ctx.shadowBlur = isHovered ? 12 : 6;
        ctx.stroke();
      });

      // Draw Glowing Vertices
      projected.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, isHovered ? 2.5 : 1.8, 0, Math.PI * 2);
        ctx.fillStyle = geom.secondaryColor;
        ctx.shadowColor = geom.secondaryColor;
        ctx.shadowBlur = isHovered ? 10 : 4;
        ctx.fill();
      });

      ctx.shadowBlur = 0;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [type, isHovered]);

  return (
    <div className="relative w-14 h-14 rounded-xl bg-slate-900/80 border border-cyan-400/30 flex items-center justify-center overflow-hidden shrink-0 group-hover:border-cyan-300 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all">
      <canvas ref={canvasRef} className="w-14 h-14 block" />
      {/* Corner cyan accent */}
      <div className="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l border-cyan-400" />
      <div className="absolute bottom-1 right-1 w-1.5 h-1.5 border-b border-r border-violet-400" />
    </div>
  );
};
