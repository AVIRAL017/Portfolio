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

    // Define 3D vertices and edges based on type with rich bright-mode colors
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
            primaryColor: '#0284c7',
            secondaryColor: '#d97706',
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
            primaryColor: '#0284c7',
            secondaryColor: '#7c3aed',
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
            primaryColor: type === 'html5' ? '#ea580c' : '#2563eb',
            secondaryColor: '#0284c7',
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
            primaryColor: '#059669',
            secondaryColor: '#0284c7',
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
            primaryColor: '#d97706',
            secondaryColor: '#e11d48',
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
            primaryColor: '#0284c7',
            secondaryColor: '#059669',
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
            primaryColor: '#7c3aed',
            secondaryColor: '#db2777',
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
            primaryColor: '#db2777',
            secondaryColor: '#0284c7',
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
            primaryColor: '#dc2626',
            secondaryColor: '#ea580c',
          };
        }

        // Default: 3D Isometric Crystal / Prism
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
            primaryColor: '#059669',
            secondaryColor: '#0284c7',
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
        const cosY = Math.cos(angleY);
        const sinY = Math.sin(angleY);
        const x1 = x * cosY - z * sinY;
        const z1 = z * cosY + x * sinY;

        const cosX = Math.cos(angleX);
        const sinX = Math.sin(angleX);
        const y2 = y * cosX - z1 * sinX;
        const z2 = z1 * cosX + y * sinX;

        const distance = fov + z2;
        const scale = fov / (distance > 10 ? distance : 10);
        return {
          x: cx + x1 * scale,
          y: cy + y2 * scale,
          z: z2,
        };
      });

      // Draw Edges with rich color
      geom.edges.forEach(([i, j]) => {
        const p1 = projected[i];
        const p2 = projected[j];

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = geom.primaryColor;
        ctx.lineWidth = isHovered ? 2.2 : 1.6;
        ctx.shadowColor = geom.primaryColor;
        ctx.shadowBlur = isHovered ? 8 : 3;
        ctx.stroke();
      });

      // Draw Glowing Vertices
      projected.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, isHovered ? 2.6 : 1.8, 0, Math.PI * 2);
        ctx.fillStyle = geom.secondaryColor;
        ctx.shadowColor = geom.secondaryColor;
        ctx.shadowBlur = isHovered ? 6 : 2;
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
    <div className="relative w-14 h-14 rounded-xl bg-[#0e131d] border border-white/10 flex items-center justify-center overflow-hidden shrink-0 group-hover:border-rose-500/50 group-hover:shadow-lg group-hover:shadow-rose-950/40 transition-all">
      <canvas ref={canvasRef} className="w-14 h-14 block" />
      {/* Corner subtle color accents */}
      <div className="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l border-rose-500/40" />
      <div className="absolute bottom-1 right-1 w-1.5 h-1.5 border-b border-r border-sky-400/40" />
    </div>
  );
};
