import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// --- Dynamic Telemetry Canvas Texture for the Command Screen ---
function useTelemetryTexture() {
  const canvas = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = 512;
    c.height = 340;
    return c;
  }, []);

  const texture = useMemo(() => {
    const t = new THREE.CanvasTexture(canvas);
    t.minFilter = THREE.LinearFilter;
    t.magFilter = THREE.LinearFilter;
    return t;
  }, [canvas]);

  const frameRef = useRef(0);

  const update = () => {
    frameRef.current += 1;
    const f = frameRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background: dark slate terminal
    ctx.fillStyle = '#0f141d';
    ctx.fillRect(0, 0, 512, 340);

    // Header bar
    ctx.fillStyle = '#18202e';
    ctx.fillRect(0, 0, 512, 32);

    ctx.fillStyle = '#ff3b5c';
    ctx.beginPath();
    ctx.arc(18, 16, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px monospace';
    ctx.fillText('MISSION_TELEMETRY // CONVERGENCE_LIVE', 34, 20);

    ctx.fillStyle = '#64748b';
    ctx.font = '10px monospace';
    ctx.fillText('SGP4_ACC: 99.4%', 390, 20);

    // Grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let x = 20; x < 500; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 40);
      ctx.lineTo(x, 320);
      ctx.stroke();
    }
    for (let y = 50; y < 330; y += 30) {
      ctx.beginPath();
      ctx.moveTo(20, y);
      ctx.lineTo(490, y);
      ctx.stroke();
    }

    // Left: Circular telemetry gauge
    const cx = 90;
    const cy = 120;
    const r = 45;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = '#222d3d';
    ctx.lineWidth = 8;
    ctx.stroke();

    const gaugeAngle = (Math.sin(f * 0.03) * 0.5 + 0.5) * Math.PI * 1.5;
    ctx.beginPath();
    ctx.arc(cx, cy, r, -Math.PI * 0.5, -Math.PI * 0.5 + gaugeAngle);
    ctx.strokeStyle = '#ff3b5c';
    ctx.lineWidth = 8;
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`${Math.round((gaugeAngle / (Math.PI * 1.5)) * 100)}%`, cx, cy + 5);
    ctx.font = '9px monospace';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('INFERENCE', cx, cy + 20);
    ctx.textAlign = 'left';

    // Right: Live loss & convergence waveform
    ctx.beginPath();
    ctx.strokeStyle = '#ff3b5c';
    ctx.lineWidth = 2.5;
    const waveStart = 170;
    for (let x = waveStart; x < 480; x += 3) {
      const prog = (x - waveStart) / 310;
      const y =
        130 -
        Math.sin(prog * 12 + f * 0.08) * 18 -
        Math.cos(prog * 4 + f * 0.04) * 12 +
        Math.exp(-prog * 2) * 20;
      if (x === waveStart) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Secondary cyan comparison wave
    ctx.beginPath();
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1.8;
    for (let x = waveStart; x < 480; x += 3) {
      const prog = (x - waveStart) / 310;
      const y = 145 - Math.sin(prog * 8 - f * 0.06) * 14;
      if (x === waveStart) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Bottom telemetry bar meters
    const barY = 220;
    const bars = [
      { label: 'YOLOv8-OBB', val: 0.92, col: '#ff3b5c' },
      { label: 'SIAMESE_NET', val: 0.88, col: '#38bdf8' },
      { label: 'SGP4_CARA', val: 0.96, col: '#ffffff' },
      { label: 'MISTRAL_RAG', val: 0.84, col: '#ff3b5c' },
    ];

    bars.forEach((b, i) => {
      const bx = 30 + i * 115;
      ctx.fillStyle = '#64748b';
      ctx.font = '9px monospace';
      ctx.fillText(b.label, bx, barY);

      // Track
      ctx.fillStyle = '#1e2638';
      ctx.fillRect(bx, barY + 6, 95, 8);

      // Dynamic fill
      const dynVal = Math.min(1, Math.max(0, b.val + Math.sin(f * 0.05 + i) * 0.05));
      ctx.fillStyle = b.col;
      ctx.fillRect(bx, barY + 6, 95 * dynVal, 8);
    });

    // Bottom alert status strip
    ctx.fillStyle = '#161d2a';
    ctx.fillRect(20, 270, 470, 45);
    ctx.strokeStyle = '#273347';
    ctx.strokeRect(20, 270, 470, 45);

    ctx.fillStyle = (f % 40 < 20) ? '#ff3b5c' : '#38bdf8';
    ctx.beginPath();
    ctx.arc(42, 292, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 11px monospace';
    ctx.fillText('TACTICAL PIPELINE NOMINAL // COORDINATES: [26.4499° N, 80.3319° E]', 58, 296);

    texture.needsUpdate = true;
  };

  return { texture, update };
}

// --- 1. The Funnel / Sorting Turntable Tower (Left) ---
function SortingTurntableTower() {
  const topWheelRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (topWheelRef.current) {
      topWheelRef.current.rotation.y = t * 0.25;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = -t * 0.4;
    }
  });

  return (
    <group position={[-4.2, 0, -1.2]}>
      {/* Cylindrical Base Podiums */}
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[2.0, 2.2, 0.8, 36]} />
        <meshStandardMaterial color="#1a212d" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Middle Stepped Rim with Laser Ticks */}
      <mesh position={[0, 0.95, 0]}>
        <cylinderGeometry args={[1.7, 1.9, 0.3, 36]} />
        <meshStandardMaterial color="#111620" roughness={0.4} metalness={0.8} />
      </mesh>

      {/* Glowing Crimson Trim Ring */}
      <mesh position={[0, 1.15, 0]}>
        <torusGeometry args={[1.72, 0.035, 16, 64]} />
        <meshBasicMaterial color="#ff3b5c" />
      </mesh>

      {/* Center Pillar */}
      <mesh position={[0, 2.0, 0]}>
        <cylinderGeometry args={[0.5, 0.6, 1.8, 24]} />
        <meshStandardMaterial color="#222b3a" roughness={0.2} metalness={0.85} />
      </mesh>

      {/* Top Turntable Platform */}
      <group ref={topWheelRef} position={[0, 3.0, 0]}>
        {/* Disc platform */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[2.2, 2.2, 0.25, 36]} />
          <meshStandardMaterial color="#18202c" roughness={0.2} metalness={0.8} />
        </mesh>

        {/* 3 Floating Wedge Slabs representing Data, Physics/Balance, and Legal/Code */}
        {/* Slab 1: Document / Telemetry Slabs (Front-Left) */}
        <group position={[-0.9, 0.8, 0.7]} rotation={[0, 0.3, 0]}>
          <mesh castShadow>
            <boxGeometry args={[1.0, 1.3, 0.12]} />
            <meshPhysicalMaterial
              color="#ffffff"
              roughness={0.1}
              metalness={0.1}
              transmission={0.4}
              transparent
              opacity={0.9}
            />
          </mesh>
          {/* Subtle text lines on slab */}
          <mesh position={[0, 0.3, 0.07]}>
            <boxGeometry args={[0.7, 0.08, 0.02]} />
            <meshBasicMaterial color="#1e293b" />
          </mesh>
          <mesh position={[0, 0.1, 0.07]}>
            <boxGeometry args={[0.7, 0.08, 0.02]} />
            <meshBasicMaterial color="#1e293b" />
          </mesh>
          <mesh position={[0, -0.1, 0.07]}>
            <boxGeometry args={[0.5, 0.08, 0.02]} />
            <meshBasicMaterial color="#ff3b5c" />
          </mesh>
        </group>

        {/* Slab 2: Astrodynamics Balance Scale (Right) */}
        <group position={[1.1, 0.8, 0]} rotation={[0, -0.8, 0]}>
          <mesh castShadow>
            <boxGeometry args={[1.0, 1.3, 0.12]} />
            <meshPhysicalMaterial
              color="#e2e8f0"
              roughness={0.15}
              metalness={0.2}
              transmission={0.35}
              transparent
              opacity={0.88}
            />
          </mesh>
          {/* Balance icon representation */}
          <mesh position={[0, 0.2, 0.07]}>
            <boxGeometry args={[0.65, 0.06, 0.02]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
          <mesh position={[-0.22, 0.0, 0.07]}>
            <coneGeometry args={[0.15, 0.2, 16]} />
            <meshBasicMaterial color="#64748b" />
          </mesh>
          <mesh position={[0.22, 0.0, 0.07]}>
            <coneGeometry args={[0.15, 0.2, 16]} />
            <meshBasicMaterial color="#64748b" />
          </mesh>
        </group>

        {/* Slab 3: Paragraph / Legal § Symbol (Back-Left) */}
        <group position={[-0.2, 0.8, -1.1]} rotation={[0, 1.4, 0]}>
          <mesh castShadow>
            <boxGeometry args={[1.0, 1.3, 0.12]} />
            <meshPhysicalMaterial
              color="#f8fafc"
              roughness={0.12}
              metalness={0.15}
              transmission={0.4}
              transparent
              opacity={0.92}
            />
          </mesh>
          {/* Section § icon representation */}
          <mesh position={[0, 0.2, 0.07]}>
            <torusGeometry args={[0.16, 0.04, 16, 24]} />
            <meshBasicMaterial color="#ff3b5c" />
          </mesh>
          <mesh position={[0, -0.15, 0.07]}>
            <torusGeometry args={[0.16, 0.04, 16, 24]} />
            <meshBasicMaterial color="#ff3b5c" />
          </mesh>
        </group>
      </group>

      {/* Funnel Chute entering the Conveyor */}
      <mesh position={[1.4, 1.8, 0.5]} rotation={[0, 0, -0.6]} castShadow>
        <cylinderGeometry args={[0.35, 0.45, 1.4, 24]} />
        <meshStandardMaterial color="#202735" roughness={0.3} metalness={0.8} />
      </mesh>
    </group>
  );
}

// --- 2. Conveyor Belt & Traveling 3D Cubes ---
interface ConveyorProps {
  pulseActive: boolean;
}

function ConveyorBeltSystem({ pulseActive }: ConveyorProps) {
  const cubesRef = useRef<THREE.Group>(null);
  const scannerLightRef = useRef<THREE.PointLight>(null);

  // Animate cubes sliding along the conveyor path
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const speed = pulseActive ? 1.6 : 0.8;

    if (cubesRef.current) {
      cubesRef.current.children.forEach((child, idx) => {
        // Offset each cube
        const prog = ((t * speed + idx * 1.5) % 6) / 6; // 0 to 1
        // Path runs from (-2.6, 1.4, -0.4) down to (0.8, 0.3, 1.8)
        const x = THREE.MathUtils.lerp(-2.6, 1.0, prog);
        const y = THREE.MathUtils.lerp(1.4, 0.28, prog);
        const z = THREE.MathUtils.lerp(-0.5, 1.8, prog);

        child.position.set(x, y, z);

        // Orient along conveyor incline
        child.rotation.x = 0.15;
        child.rotation.y = -0.65;

        // At midpoint (~0.45 to 0.65), cube passes scanner chamber & ignites red core
        const meshGroup = child as THREE.Group;
        const outerShell = meshGroup.children[0] as THREE.Mesh;
        const innerCore = meshGroup.children[1] as THREE.Mesh;

        if (prog > 0.45 && prog < 0.95) {
          // Processed state: glowing crimson core
          if (innerCore && innerCore.material) {
            (innerCore.material as THREE.MeshBasicMaterial).color.set('#ff3b5c');
          }
          if (outerShell && outerShell.material) {
            (outerShell.material as THREE.MeshPhysicalMaterial).emissive.set('#ff2244');
            (outerShell.material as THREE.MeshPhysicalMaterial).emissiveIntensity = 0.6;
          }
        } else {
          // Pre-processed raw data state
          if (innerCore && innerCore.material) {
            (innerCore.material as THREE.MeshBasicMaterial).color.set('#475569');
          }
          if (outerShell && outerShell.material) {
            (outerShell.material as THREE.MeshPhysicalMaterial).emissive.set('#000000');
            (outerShell.material as THREE.MeshPhysicalMaterial).emissiveIntensity = 0;
          }
        }
      });
    }

    if (scannerLightRef.current) {
      scannerLightRef.current.intensity = 1.8 + Math.sin(t * 8) * 0.8 + (pulseActive ? 2.5 : 0);
    }
  });

  return (
    <group>
      {/* Conveyor Bed Track Ramp */}
      <group position={[-0.8, 0.8, 0.65]} rotation={[0.22, -0.68, 0]}>
        {/* Main ramp slab */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[4.4, 0.18, 0.9]} />
          <meshStandardMaterial color="#151b26" roughness={0.3} metalness={0.7} />
        </mesh>

        {/* Side Rail Left */}
        <mesh position={[0, 0.18, 0.42]}>
          <boxGeometry args={[4.4, 0.22, 0.06]} />
          <meshStandardMaterial color="#283244" roughness={0.2} metalness={0.85} />
        </mesh>

        {/* Side Rail Right */}
        <mesh position={[0, 0.18, -0.42]}>
          <boxGeometry args={[4.4, 0.22, 0.06]} />
          <meshStandardMaterial color="#283244" roughness={0.2} metalness={0.85} />
        </mesh>

        {/* Glowing Guide Laser Strip */}
        <mesh position={[0, 0.12, 0]}>
          <boxGeometry args={[4.2, 0.02, 0.04]} />
          <meshBasicMaterial color="#ff3b5c" />
        </mesh>

        {/* Rollers under track */}
        {[-1.6, -0.8, 0, 0.8, 1.6].map((rx, idx) => (
          <mesh key={idx} position={[rx, -0.16, 0]} rotation={[0, 0, Math.PI * 0.5]}>
            <cylinderGeometry args={[0.09, 0.09, 0.85, 16]} />
            <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.3} />
          </mesh>
        ))}

        {/* Support Leg Front */}
        <mesh position={[1.4, -0.4, 0]} rotation={[0, 0, 0.25]}>
          <boxGeometry args={[0.2, 0.8, 0.8]} />
          <meshStandardMaterial color="#1a2230" roughness={0.3} metalness={0.7} />
        </mesh>

        {/* Support Leg Back */}
        <mesh position={[-1.4, -0.7, 0]} rotation={[0, 0, -0.2]}>
          <boxGeometry args={[0.25, 1.4, 0.8]} />
          <meshStandardMaterial color="#1a2230" roughness={0.3} metalness={0.7} />
        </mesh>
      </group>

      {/* Scanner Chamber Arch */}
      <group position={[-0.8, 0.9, 0.65]} rotation={[0.22, -0.68, 0]}>
        <mesh position={[0, 0.6, 0]}>
          <boxGeometry args={[0.65, 0.16, 1.25]} />
          <meshStandardMaterial color="#212a39" roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.3, 0.55]}>
          <boxGeometry args={[0.45, 0.7, 0.14]} />
          <meshStandardMaterial color="#212a39" roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.3, -0.55]}>
          <boxGeometry args={[0.45, 0.7, 0.14]} />
          <meshStandardMaterial color="#212a39" roughness={0.3} metalness={0.8} />
        </mesh>

        {/* Scanner Laser Sheet */}
        <mesh position={[0, 0.3, 0]}>
          <planeGeometry args={[0.05, 0.6]} />
          <meshBasicMaterial color="#ff3b5c" transparent opacity={0.65} side={THREE.DoubleSide} />
        </mesh>

        {/* Scanner Point Light */}
        <pointLight ref={scannerLightRef} position={[0, 0.5, 0]} color="#ff3b5c" distance={3.5} />
      </group>

      {/* Traveling Data Cubes Group */}
      <group ref={cubesRef}>
        {[0, 1, 2, 3].map((_, i) => (
          <group key={i}>
            {/* Outer Translucent Shell */}
            <mesh castShadow>
              <boxGeometry args={[0.42, 0.42, 0.42]} />
              <meshPhysicalMaterial
                color="#e2e8f0"
                roughness={0.2}
                metalness={0.3}
                transmission={0.4}
                transparent
                opacity={0.85}
              />
            </mesh>
            {/* Inner Glowing Core */}
            <mesh>
              <boxGeometry args={[0.22, 0.22, 0.22]} />
              <meshBasicMaterial color="#ff3b5c" />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}

// --- 3. Telemetry Command Center (Monitor + Workstation) ---
function CommandTelemetryCenter({ telemetryTexture }: { telemetryTexture: THREE.CanvasTexture }) {
  const laptopScreenRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (laptopScreenRef.current && laptopScreenRef.current.material) {
      // Subtle pulse on laptop display
      (laptopScreenRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        0.5 + Math.sin(t * 3) * 0.15;
    }
  });

  return (
    <group position={[1.4, 0, -0.2]}>
      {/* Sturdy Desk Podium */}
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 0.8, 2.2]} />
        <meshStandardMaterial color="#151b25" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Desk Top Trim */}
      <mesh position={[0, 0.82, 0]}>
        <boxGeometry args={[3.3, 0.05, 2.3]} />
        <meshStandardMaterial color="#252f40" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* 3.1 Primary Vertical Telemetry Monitor */}
      <group position={[-0.4, 0.85, -0.3]} rotation={[0, -0.35, 0]}>
        {/* Monitor Base Stand */}
        <mesh position={[0, 0.04, 0]}>
          <cylinderGeometry args={[0.4, 0.45, 0.08, 24]} />
          <meshStandardMaterial color="#2d3748" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.6, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 1.1, 16]} />
          <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Monitor Bezel Frame */}
        <mesh position={[0, 1.45, 0]} castShadow>
          <boxGeometry args={[2.5, 1.7, 0.12]} />
          <meshStandardMaterial color="#0b0e14" roughness={0.3} metalness={0.8} />
        </mesh>

        {/* Active Telemetry Screen Canvas Texture */}
        <mesh position={[0, 1.45, 0.065]}>
          <planeGeometry args={[2.38, 1.58]} />
          <meshBasicMaterial map={telemetryTexture} toneMapped={false} />
        </mesh>

        {/* Ambient Screen Glow Light */}
        <pointLight position={[0, 1.5, 0.6]} color="#ff3b5c" intensity={1.2} distance={3.2} />
      </group>

      {/* 3.2 Sleek Laptop Workstation on Desk (Right) */}
      <group position={[0.9, 0.85, 0.35]} rotation={[0, -0.55, 0]}>
        {/* Base chassis */}
        <mesh position={[0, 0.02, 0]} castShadow>
          <boxGeometry args={[1.1, 0.04, 0.8]} />
          <meshStandardMaterial color="#222b38" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Keyboard area with subtle glow grid */}
        <mesh position={[0, 0.045, 0.08]}>
          <boxGeometry args={[0.95, 0.01, 0.45]} />
          <meshStandardMaterial
            color="#0f172a"
            emissive="#ff3b5c"
            emissiveIntensity={0.2}
            roughness={0.3}
          />
        </mesh>

        {/* Open Display Lid */}
        <group position={[0, 0.04, -0.38]} rotation={[-0.45, 0, 0]}>
          {/* Back Lid */}
          <mesh position={[0, 0.4, 0]} castShadow>
            <boxGeometry args={[1.1, 0.75, 0.03]} />
            <meshStandardMaterial color="#1a222e" metalness={0.8} roughness={0.2} />
          </mesh>
          {/* Display Surface */}
          <mesh ref={laptopScreenRef} position={[0, 0.4, 0.02]}>
            <planeGeometry args={[1.02, 0.68]} />
            <meshStandardMaterial
              color="#0f141d"
              emissive="#38bdf8"
              emissiveIntensity={0.6}
              roughness={0.2}
            />
          </mesh>
        </group>
      </group>
    </group>
  );
}

// --- 4. Interactive Front Sensor Dock / Core Node ---
function InteractiveSensorDock({ onTriggerPulse }: { onTriggerPulse: () => void }) {
  const orbRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const rippleRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (orbRef.current) {
      orbRef.current.position.y = 0.5 + Math.sin(t * 2.5) * 0.08;
      orbRef.current.rotation.y = t * 0.6;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = t * 0.8;
      ringRef.current.rotation.y = t * 1.1;
    }
    if (rippleRef.current) {
      const scale = (t * 0.6 % 1) * 2.2 + 0.8;
      rippleRef.current.scale.set(scale, scale, 1);
      (rippleRef.current.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 1 - (t * 0.6 % 1));
    }
  });

  return (
    <group
      position={[0.5, 0, 2.5]}
      onClick={onTriggerPulse}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto';
      }}
    >
      {/* Dock Podium Block */}
      <mesh position={[0, 0.22, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.4, 0.44, 1.4]} />
        <meshStandardMaterial color="#161c27" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Dock Chrome Bevel */}
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.55, 0.6, 0.06, 24]} />
        <meshStandardMaterial color="#2d3748" roughness={0.2} metalness={0.85} />
      </mesh>

      {/* Interactive Glowing Core Orb */}
      <mesh ref={orbRef} position={[0, 0.5, 0]}>
        <sphereGeometry args={[0.26, 32, 32]} />
        <meshStandardMaterial
          color="#ff3b5c"
          emissive="#ff2244"
          emissiveIntensity={1.5}
          roughness={0.1}
          metalness={0.5}
        />
      </mesh>

      {/* Orbiting Gimbal Ring around Orb */}
      <mesh ref={ringRef} position={[0, 0.5, 0]}>
        <torusGeometry args={[0.42, 0.02, 16, 48]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Floor Radar Ripple Wave */}
      <mesh ref={rippleRef} position={[0, 0.46, 0]} rotation={[-Math.PI * 0.5, 0, 0]}>
        <ringGeometry args={[0.5, 0.56, 32]} />
        <meshBasicMaterial color="#ff3b5c" transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>

      {/* Point Light Casting onto Surrounding Elements */}
      <pointLight position={[0, 0.7, 0]} color="#ff3b5c" intensity={2.0} distance={4.5} />
    </group>
  );
}

// --- 5. High-Rise Corporate / Data Center Tower (Background) ---
function CorporateDataTower() {
  const windows = useMemo(() => {
    const list = [];
    for (let floor = 0; floor < 11; floor++) {
      for (let col = 0; col < 4; col++) {
        // Pseudo-random lit state
        const lit = (floor * 4 + col) % 3 !== 0;
        const color = (floor + col) % 5 === 0 ? '#ff3b5c' : '#ffffff';
        list.push({
          x: -0.9 + col * 0.6,
          y: 0.8 + floor * 0.52,
          lit,
          color,
        });
      }
    }
    return list;
  }, []);

  return (
    <group position={[4.0, 0, -3.2]}>
      {/* Tower Main Architectural Massing */}
      <mesh position={[0, 3.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.8, 6.8, 2.2]} />
        <meshStandardMaterial color="#121722" roughness={0.35} metalness={0.7} />
      </mesh>

      {/* Architectural Roof Penthouse */}
      <mesh position={[0, 6.9, 0]} castShadow>
        <boxGeometry args={[2.2, 0.4, 1.8]} />
        <meshStandardMaterial color="#1e2536" roughness={0.2} metalness={0.85} />
      </mesh>

      {/* Illuminated Roof Logo Badge "AVIRAL" / "BISS" */}
      <mesh position={[0, 6.4, 1.12]}>
        <planeGeometry args={[1.8, 0.35]} />
        <meshBasicMaterial color="#ff3b5c" />
      </mesh>

      {/* Lit Window Slits on Front Facade */}
      <group position={[0, 0, 1.11]}>
        {windows.map((w, i) => (
          <mesh key={i} position={[w.x, w.y, 0]}>
            <planeGeometry args={[0.38, 0.22]} />
            <meshBasicMaterial
              color={w.lit ? w.color : '#1e2638'}
              transparent
              opacity={w.lit ? 0.85 : 0.4}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// --- 6. Glowing Fiber-Optic Data Cables Running on Floor ---
function GlowingDataConduits({ pulseActive }: { pulseActive: boolean }) {
  const pulsePacketRef = useRef<THREE.Mesh>(null);

  // Define 3D spline curve for the primary optic conduit
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-4.2, 0.1, -1.2), // Turntable tower
      new THREE.Vector3(-2.0, 0.1, 0.2),  // Under conveyor
      new THREE.Vector3(0.5, 0.1, 1.8),   // Toward sensor dock
      new THREE.Vector3(1.4, 0.1, 0.2),   // Toward monitor
      new THREE.Vector3(3.6, 0.1, -2.6),  // Toward data tower
    ]);
  }, []);

  const tubeGeometry = useMemo(() => {
    return new THREE.TubeGeometry(curve, 64, 0.05, 12, false);
  }, [curve]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const speed = pulseActive ? 1.2 : 0.4;
    const prog = (t * speed) % 1;

    if (pulsePacketRef.current) {
      const pos = curve.getPoint(prog);
      pulsePacketRef.current.position.copy(pos);
    }
  });

  return (
    <group>
      {/* Matte outer conduit tube */}
      <mesh geometry={tubeGeometry}>
        <meshStandardMaterial color="#1e2536" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Inner illuminated laser wire */}
      <mesh geometry={tubeGeometry} scale={[0.98, 0.98, 0.98]}>
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.4} />
      </mesh>

      {/* High-speed photon pulse packet */}
      <mesh ref={pulsePacketRef}>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshBasicMaterial color="#ff3b5c" />
      </mesh>
    </group>
  );
}

// --- 7. Architectural Floor Ground Plane & Grid Guides ---
function IsometricFloor() {
  return (
    <group position={[0, -0.01, 0]}>
      {/* Ground plane */}
      <mesh rotation={[-Math.PI * 0.5, 0, 0]} receiveShadow>
        <planeGeometry args={[26, 26]} />
        <meshStandardMaterial color="#0c1017" roughness={0.4} metalness={0.5} />
      </mesh>

      {/* Fine isometric grid lines */}
      <gridHelper args={[24, 24, '#ff3b5c', '#1b2230']} position={[0, 0.01, 0]} />
    </group>
  );
}

// --- 8. Floating Ambient Cyber Dust ---
function FloatingDustParticles() {
  const count = 48;
  const particles = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        pos: new THREE.Vector3(
          (Math.random() - 0.5) * 16,
          Math.random() * 6 + 0.5,
          (Math.random() - 0.5) * 16
        ),
        speed: Math.random() * 0.5 + 0.3,
        color: Math.random() > 0.4 ? '#ff3b5c' : '#38bdf8',
        size: Math.random() * 0.05 + 0.03,
      });
    }
    return arr;
  }, []);

  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const p = particles[i];
        child.position.y = p.pos.y + Math.sin(t * p.speed + i) * 0.3;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {particles.map((p, i) => (
        <mesh key={i} position={p.pos}>
          <sphereGeometry args={[p.size, 8, 8]} />
          <meshBasicMaterial color={p.color} transparent opacity={0.65} />
        </mesh>
      ))}
    </group>
  );
}

// --- Interactive Parallax Camera Rig ---
function CameraParallaxRig() {
  useFrame((state) => {
    const { x, y } = state.pointer;
    // Gentle mouse parallax on the default camera
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, 8.5 + x * 1.8, 0.04);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 8.0 - y * 1.4, 0.04);
    state.camera.lookAt(0, 1.2, 0);
  });
  return null;
}

// --- Main Hero3DScene Component ---
interface Hero3DSceneProps {
  pulseActive?: boolean;
  onTriggerPulse?: () => void;
}

export const Hero3DScene: React.FC<Hero3DSceneProps> = ({
  pulseActive = false,
  onTriggerPulse = () => {},
}) => {
  const { texture: telemetryTexture, update: updateTelemetry } = useTelemetryTexture();

  // Update canvas texture at 30fps
  useEffect(() => {
    const interval = setInterval(() => {
      updateTelemetry();
    }, 33);
    return () => clearInterval(interval);
  }, [updateTelemetry]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-auto">
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        {/* Isometric Perspective Camera */}
        <PerspectiveCamera makeDefault position={[9.5, 8.5, 9.5]} fov={36} />

        {/* Studio Lighting System */}
        <ambientLight intensity={0.65} color="#c2d1e8" />
        <directionalLight
          position={[10, 16, 8]}
          intensity={1.8}
          color="#ffffff"
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        {/* Cool Rim Lighting from Rear */}
        <directionalLight position={[-12, 10, -10]} intensity={0.8} color="#38bdf8" />

        {/* Biss GmbH Signature Color Fill Lights */}
        <pointLight position={[-4.2, 4.0, -1.2]} intensity={2.0} color="#ff3b5c" distance={8} />
        <pointLight position={[2.0, 3.0, 1.5]} intensity={2.2} color="#ff3b5c" distance={9} />

        {/* 3D Scene Nodes */}
        <SortingTurntableTower />
        <ConveyorBeltSystem pulseActive={pulseActive} />
        <CommandTelemetryCenter telemetryTexture={telemetryTexture} />
        <InteractiveSensorDock onTriggerPulse={onTriggerPulse} />
        <CorporateDataTower />
        <GlowingDataConduits pulseActive={pulseActive} />
        <IsometricFloor />
        <FloatingDustParticles />

        {/* Camera Parallax & Subtle Controls */}
        <CameraParallaxRig />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2 - 0.05}
          minPolarAngle={Math.PI / 4}
        />
      </Canvas>
    </div>
  );
};

export default Hero3DScene;
