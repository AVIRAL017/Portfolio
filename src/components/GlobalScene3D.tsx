import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ---------------------------------------------------------------------------
// 1. High-Performance Telemetry Canvas Texture
// ---------------------------------------------------------------------------
function createTelemetryTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 340;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, 512, 340);

    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(0, 0, 512, 36);

    ctx.fillStyle = '#e11d48';
    ctx.beginPath();
    ctx.arc(18, 18, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 12px monospace';
    ctx.fillText('MISSION_TELEMETRY // CONVERGENCE_LIVE', 34, 22);

    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 11px monospace';
    ctx.fillText('ACCURACY: 99.4%', 380, 22);

    ctx.strokeStyle = 'rgba(99, 102, 241, 0.08)';
    ctx.lineWidth = 1;
    for (let x = 20; x < 500; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 44);
      ctx.lineTo(x, 320);
      ctx.stroke();
    }
    for (let y = 50; y < 330; y += 30) {
      ctx.beginPath();
      ctx.moveTo(20, y);
      ctx.lineTo(490, y);
      ctx.stroke();
    }

    const cx = 90;
    const cy = 130;
    const r = 45;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 8;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cx, cy, r, -Math.PI * 0.5, Math.PI * 0.65);
    ctx.strokeStyle = '#e11d48';
    ctx.lineWidth = 8;
    ctx.stroke();

    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 16px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('94.8%', cx, cy + 5);
    ctx.font = 'bold 9px monospace';
    ctx.fillStyle = '#64748b';
    ctx.fillText('INFERENCE', cx, cy + 20);
    ctx.textAlign = 'left';

    ctx.beginPath();
    ctx.strokeStyle = '#e11d48';
    ctx.lineWidth = 2.5;
    const waveStart = 170;
    for (let x = waveStart; x < 480; x += 4) {
      const norm = (x - waveStart) / 310;
      const y = 145 + Math.sin(norm * 14) * 22 * (1 - norm * 0.4);
      if (x === waveStart) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    ctx.fillStyle = '#334155';
    ctx.font = '10px monospace';
    ctx.fillText('MODEL: Siamese ResNet-18', 35, 230);
    ctx.fillText('DATASET: xBD / xView2', 35, 252);
    ctx.fillText('TRACKER: ByteTrack [OBB]', 35, 274);

    ctx.fillStyle = '#0284c7';
    ctx.fillText('LATENCY: 14.2ms', 280, 230);
    ctx.fillText('TOPOLOGY: 6DOF Spatial', 280, 252);
    ctx.fillText('BANDWIDTH: 10 Gbps Edge', 280, 274);

    ctx.fillStyle = '#f1f5f9';
    ctx.fillRect(0, 305, 512, 35);
    ctx.fillStyle = '#64748b';
    ctx.font = 'bold 9px monospace';
    ctx.fillText('STATUS: SYNCHRONIZED [VERIFIED]', 20, 326);
    ctx.fillText('FACILITY: 100% OPERATIONAL', 320, 326);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  return texture;
}

// ---------------------------------------------------------------------------
// 2. The Sorting Turntable Tower & Slabs
// ---------------------------------------------------------------------------
function SortingTurntableTower() {
  const topWheelRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (topWheelRef.current) topWheelRef.current.rotation.y += delta * 0.25;
    if (ringRef.current) ringRef.current.rotation.z -= delta * 0.4;
  });

  return (
    <group position={[-4.2, 0, -1.2]}>
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[2.0, 2.2, 0.8, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.25} metalness={0.25} />
      </mesh>

      <mesh position={[0, 0.95, 0]}>
        <cylinderGeometry args={[1.7, 1.9, 0.3, 32]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.3} metalness={0.35} />
      </mesh>

      <mesh ref={ringRef} position={[0, 1.15, 0]}>
        <torusGeometry args={[1.72, 0.035, 16, 48]} />
        <meshBasicMaterial color="#f43f5e" />
      </mesh>

      <mesh position={[0, 2.0, 0]}>
        <cylinderGeometry args={[0.5, 0.6, 1.8, 24]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.2} metalness={0.7} />
      </mesh>

      <group ref={topWheelRef} position={[0, 3.0, 0]}>
        <mesh>
          <cylinderGeometry args={[2.2, 2.2, 0.25, 32]} />
          <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.3} />
        </mesh>

        {/* Slabs */}
        <group position={[-0.9, 0.8, 0.7]} rotation={[0, 0.3, 0]}>
          <mesh>
            <boxGeometry args={[1.0, 1.3, 0.12]} />
            <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.25} transparent opacity={0.9} />
          </mesh>
          <mesh position={[0, 0.3, 0.07]}>
            <boxGeometry args={[0.7, 0.08, 0.02]} />
            <meshBasicMaterial color="#0284c7" />
          </mesh>
          <mesh position={[0, 0.1, 0.07]}>
            <boxGeometry args={[0.7, 0.08, 0.02]} />
            <meshBasicMaterial color="#334155" />
          </mesh>
          <mesh position={[0, -0.1, 0.07]}>
            <boxGeometry args={[0.5, 0.08, 0.02]} />
            <meshBasicMaterial color="#e11d48" />
          </mesh>
        </group>

        <group position={[1.1, 0.8, 0]} rotation={[0, -0.8, 0]}>
          <mesh>
            <boxGeometry args={[1.0, 1.3, 0.12]} />
            <meshStandardMaterial color="#e2e8f0" roughness={0.2} metalness={0.3} transparent opacity={0.9} />
          </mesh>
          <mesh position={[0, 0.2, 0.07]}>
            <boxGeometry args={[0.65, 0.06, 0.02]} />
            <meshBasicMaterial color="#0284c7" />
          </mesh>
        </group>
      </group>
    </group>
  );
}

// ---------------------------------------------------------------------------
// 3. Conveyor Belt & Traveling 3D Cubes
// ---------------------------------------------------------------------------
function ConveyorBeltSystem({ pulseActive }: { pulseActive: boolean }) {
  const cubesRef = useRef<THREE.Group>(null);
  const scannerLightRef = useRef<THREE.PointLight>(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const speed = pulseActive ? 1.6 : 0.8;

    if (cubesRef.current) {
      cubesRef.current.children.forEach((child, idx) => {
        const prog = ((t * speed + idx * 1.5) % 6) / 6;
        const x = THREE.MathUtils.lerp(-2.6, 1.0, prog);
        const y = THREE.MathUtils.lerp(1.4, 0.28, prog);
        const z = THREE.MathUtils.lerp(-0.5, 1.8, prog);

        child.position.set(x, y, z);
        child.rotation.x = 0.15;
        child.rotation.y = -0.65;

        const meshGroup = child as THREE.Group;
        const outerShell = meshGroup.children[0] as THREE.Mesh;
        const innerCore = meshGroup.children[1] as THREE.Mesh;

        if (prog > 0.45 && prog < 0.95) {
          if (innerCore && innerCore.material) {
            (innerCore.material as THREE.MeshBasicMaterial).color.set('#f43f5e');
          }
          if (outerShell && outerShell.material) {
            (outerShell.material as THREE.MeshStandardMaterial).emissive.set('#e11d48');
            (outerShell.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.5;
          }
        } else {
          if (innerCore && innerCore.material) {
            (innerCore.material as THREE.MeshBasicMaterial).color.set('#0284c7');
          }
          if (outerShell && outerShell.material) {
            (outerShell.material as THREE.MeshStandardMaterial).emissive.set('#000000');
            (outerShell.material as THREE.MeshStandardMaterial).emissiveIntensity = 0;
          }
        }
      });
    }

    if (scannerLightRef.current) {
      scannerLightRef.current.intensity = 1.2 + Math.sin(t * 8) * 0.5 + (pulseActive ? 2.0 : 0);
    }
  });

  return (
    <group>
      <group position={[-0.8, 0.8, 0.65]} rotation={[0.22, -0.68, 0]}>
        <mesh>
          <boxGeometry args={[4.4, 0.18, 0.9]} />
          <meshStandardMaterial color="#ffffff" roughness={0.25} metalness={0.3} />
        </mesh>
        <mesh position={[0, 0.18, 0.42]}>
          <boxGeometry args={[4.4, 0.22, 0.06]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.2} metalness={0.6} />
        </mesh>
        <mesh position={[0, 0.18, -0.42]}>
          <boxGeometry args={[4.4, 0.22, 0.06]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.2} metalness={0.6} />
        </mesh>
        <mesh position={[0, 0.12, 0]}>
          <boxGeometry args={[4.2, 0.02, 0.04]} />
          <meshBasicMaterial color="#0284c7" />
        </mesh>
      </group>

      {/* Scanner Chamber Arch */}
      <group position={[-0.8, 0.9, 0.65]} rotation={[0.22, -0.68, 0]}>
        <mesh position={[0, 0.6, 0]}>
          <boxGeometry args={[0.65, 0.16, 1.25]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.25} metalness={0.5} />
        </mesh>
        <mesh position={[0, 0.3, 0.55]}>
          <boxGeometry args={[0.45, 0.7, 0.14]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.25} metalness={0.5} />
        </mesh>
        <mesh position={[0, 0.3, -0.55]}>
          <boxGeometry args={[0.45, 0.7, 0.14]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.25} metalness={0.5} />
        </mesh>
        <mesh position={[0, 0.3, 0]}>
          <planeGeometry args={[0.05, 0.6]} />
          <meshBasicMaterial color="#f43f5e" transparent opacity={0.6} side={THREE.DoubleSide} />
        </mesh>
        <pointLight ref={scannerLightRef} position={[0, 0.5, 0]} color="#f43f5e" distance={3.5} />
      </group>

      {/* Data Cubes */}
      <group ref={cubesRef}>
        {[0, 1, 2, 3].map((_, i) => (
          <group key={i}>
            <mesh>
              <boxGeometry args={[0.42, 0.42, 0.42]} />
              <meshStandardMaterial color="#e2e8f0" roughness={0.2} metalness={0.3} transparent opacity={0.85} />
            </mesh>
            <mesh>
              <boxGeometry args={[0.22, 0.22, 0.22]} />
              <meshBasicMaterial color="#0284c7" />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}

// ---------------------------------------------------------------------------
// 4. Command Telemetry Center Workstation
// ---------------------------------------------------------------------------
function CommandTelemetryCenter({ telemetryTexture }: { telemetryTexture: THREE.CanvasTexture }) {
  const laptopScreenRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (laptopScreenRef.current && laptopScreenRef.current.material) {
      (laptopScreenRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        0.5 + Math.sin(t * 3) * 0.15;
    }
  });

  return (
    <group position={[1.4, 0, -0.2]}>
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[3.2, 0.8, 2.2]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.3} metalness={0.4} />
      </mesh>

      <mesh position={[0, 0.82, 0]}>
        <boxGeometry args={[3.3, 0.05, 2.3]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.2} metalness={0.6} />
      </mesh>

      <group position={[-0.4, 0.85, -0.3]} rotation={[0, -0.35, 0]}>
        <mesh position={[0, 0.04, 0]}>
          <cylinderGeometry args={[0.4, 0.45, 0.08, 20]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.7} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.6, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 1.1, 14]} />
          <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, 1.45, 0]}>
          <boxGeometry args={[2.5, 1.7, 0.12]} />
          <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh position={[0, 1.45, 0.065]}>
          <planeGeometry args={[2.38, 1.58]} />
          <meshBasicMaterial map={telemetryTexture} toneMapped={false} />
        </mesh>
        <pointLight position={[0, 1.5, 0.6]} color="#e11d48" intensity={0.7} distance={3.2} />
      </group>

      <group position={[0.9, 0.85, 0.35]} rotation={[0, -0.55, 0]}>
        <mesh position={[0, 0.02, 0]}>
          <boxGeometry args={[1.1, 0.04, 0.8]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.045, 0.08]}>
          <boxGeometry args={[0.95, 0.01, 0.45]} />
          <meshStandardMaterial color="#f8fafc" emissive="#e11d48" emissiveIntensity={0.15} roughness={0.3} />
        </mesh>
        <group position={[0, 0.04, -0.38]} rotation={[-0.45, 0, 0]}>
          <mesh position={[0, 0.4, 0]}>
            <boxGeometry args={[1.1, 0.8, 0.03]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh ref={laptopScreenRef} position={[0, 0.4, 0.018]}>
            <planeGeometry args={[1.02, 0.72]} />
            <meshStandardMaterial color="#0f172a" emissive="#0284c7" emissiveIntensity={0.5} roughness={0.2} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

// ---------------------------------------------------------------------------
// 5. Corporate Data Skyscraper
// ---------------------------------------------------------------------------
function CorporateDataTower() {
  const towerRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (towerRef.current) {
      towerRef.current.position.y = Math.sin(t * 0.8) * 0.04;
    }
  });

  return (
    <group ref={towerRef} position={[4.0, 0, -3.2]}>
      <mesh position={[0, 3.2, 0]}>
        <boxGeometry args={[2.2, 6.4, 2.2]} />
        <meshStandardMaterial color="#ffffff" roughness={0.15} metalness={0.3} transparent opacity={0.88} />
      </mesh>
      <mesh position={[0, 3.2, 0]}>
        <boxGeometry args={[1.4, 6.2, 1.4]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.4} metalness={0.7} />
      </mesh>
      {[1.2, 2.4, 3.6, 4.8, 5.8].map((y, idx) => (
        <mesh key={idx} position={[0, y, 0]}>
          <boxGeometry args={[2.25, 0.06, 2.25]} />
          <meshBasicMaterial color={idx % 2 === 0 ? '#e11d48' : '#0284c7'} />
        </mesh>
      ))}
      <group position={[0, 6.4, 0]}>
        <mesh position={[0, 0.8, 0]}>
          <cylinderGeometry args={[0.04, 0.12, 1.6, 12]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, 1.6, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial color="#e11d48" />
        </mesh>
      </group>
      <pointLight position={[0, 6.5, 0]} color="#e11d48" intensity={0.6} distance={4} />
    </group>
  );
}

// ---------------------------------------------------------------------------
// 6. Glowing Fiber-Optic Data Cables
// ---------------------------------------------------------------------------
function GlowingDataConduits({ pulseActive }: { pulseActive: boolean }) {
  const pulsePacketRef = useRef<THREE.Mesh>(null);

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-4.2, 0.1, -1.2),
      new THREE.Vector3(-2.0, 0.1, 0.2),
      new THREE.Vector3(0.5, 0.1, 1.8),
      new THREE.Vector3(1.4, 0.1, 0.2),
      new THREE.Vector3(3.6, 0.1, -2.6),
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
      <mesh geometry={tubeGeometry}>
        <meshStandardMaterial color="#1e2536" roughness={0.3} metalness={0.7} />
      </mesh>
      <mesh geometry={tubeGeometry} scale={[0.98, 0.98, 0.98]}>
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.45} />
      </mesh>
      <mesh ref={pulsePacketRef}>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshBasicMaterial color="#f43f5e" />
      </mesh>
    </group>
  );
}

// ---------------------------------------------------------------------------
// 7. Interactive Sensor Dock
// ---------------------------------------------------------------------------
function InteractiveSensorDock() {
  const radarRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (radarRef.current) radarRef.current.rotation.y += delta * 1.2;
  });

  return (
    <group position={[-1.8, 0, -3.6]}>
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[1.4, 1.6, 0.5, 8]} />
        <meshStandardMaterial color="#ffffff" roughness={0.25} metalness={0.3} />
      </mesh>
      <mesh position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.1, 0.14, 1.2, 14]} />
        <meshStandardMaterial color="#64748b" roughness={0.3} metalness={0.8} />
      </mesh>
      <group ref={radarRef} position={[0, 1.8, 0]}>
        <mesh position={[0, 0, 0.35]}>
          <boxGeometry args={[1.1, 0.32, 0.08]} />
          <meshStandardMaterial color="#0284c7" roughness={0.2} metalness={0.6} />
        </mesh>
        <mesh position={[0, 0, 0.4]}>
          <boxGeometry args={[0.9, 0.06, 0.02]} />
          <meshBasicMaterial color="#e11d48" />
        </mesh>
      </group>
    </group>
  );
}

// ---------------------------------------------------------------------------
// 8. Ground Isometric Floor with Precision Blueprint Grid
// ---------------------------------------------------------------------------
function IsometricStudioFloor() {
  return (
    <group position={[0, -0.01, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[44, 44]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.8} metalness={0.05} />
      </mesh>
      <gridHelper args={[24, 24, '#6366f1', '#cbd5e1']} position={[0, 0.01, 0]} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
        <ringGeometry args={[6.8, 6.84, 64]} />
        <meshBasicMaterial color="#e2e8f0" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
        <ringGeometry args={[12.2, 12.25, 64]} />
        <meshBasicMaterial color="#e2e8f0" />
      </mesh>
    </group>
  );
}

// ---------------------------------------------------------------------------
// 9. Floating Dust Ambient Particles
// ---------------------------------------------------------------------------
function FloatingDustParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 120;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 1] = Math.random() * 8 + 0.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 18;
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (pointsRef.current) pointsRef.current.rotation.y += delta * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.08} color="#6366f1" transparent opacity={0.6} />
    </points>
  );
}

// ---------------------------------------------------------------------------
// 10. Camera Fly Controller with Time-Delta Exponential Damping
// ---------------------------------------------------------------------------
interface CameraFlyControllerProps {
  currentPath: string;
}

// ROUTE CAMERA TARGETS:
// '/' reveals the FULL 3D HERO FACILITY in spectacular isometric perspective!
// Other pages fly into focused figures in the upper stage!
const ROUTE_CAMERA_TARGETS: Record<string, { pos: [number, number, number]; lookAt: [number, number, number]; fov: number }> = {
  '/': {
    // Full Isometric Hero Facility View (Everything visible: turntable, conveyor, data tower, monitor desk, floor)
    pos: [9.5, 8.5, 9.5],
    lookAt: [0, 1.2, 0],
    fov: 36,
  },
  '/projects': {
    // Zoomed into CAD Turntable Tower platform & slabs
    pos: [-4.2, 3.2, 4.4],
    lookAt: [-4.2, 0.6, -1.0],
    fov: 40,
  },
  '/skills': {
    // Zoomed into Conveyor Processing & Scanner Chamber
    pos: [-0.6, 3.4, 4.8],
    lookAt: [-0.6, 0.6, 0.6],
    fov: 40,
  },
  '/credentials': {
    // Zoomed into Corporate Data Skyscraper Spire
    pos: [4.2, 4.0, 2.2],
    lookAt: [4.0, 1.0, -2.8],
    fov: 40,
  },
  '/contact': {
    // Zoomed into Command Telemetry Monitor & Workstation Desk
    pos: [1.4, 2.4, 3.8],
    lookAt: [1.4, 0.3, -0.2],
    fov: 40,
  },
};

function CameraFlyController({ currentPath }: CameraFlyControllerProps) {
  const targetConfig = ROUTE_CAMERA_TARGETS[currentPath] || ROUTE_CAMERA_TARGETS['/'];

  const targetPos = useMemo(() => new THREE.Vector3(...targetConfig.pos), [targetConfig.pos]);
  const targetLook = useMemo(() => new THREE.Vector3(...targetConfig.lookAt), [targetConfig.lookAt]);
  const currentLook = useRef(new THREE.Vector3(0, 1.2, 0));
  const mouseCoord = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseCoord.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseCoord.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  useFrame((state, delta) => {
    // Parallax using window coordinates
    const px = mouseCoord.current.x;
    const py = mouseCoord.current.y;
    const parallaxX = px * (currentPath === '/' ? 1.6 : 0.4);
    const parallaxY = py * (currentPath === '/' ? 1.2 : 0.25);

    const desiredX = targetPos.x + parallaxX;
    const desiredY = targetPos.y + parallaxY;
    const desiredZ = targetPos.z;

    const factor = 1 - Math.exp(-5.5 * Math.min(delta, 0.1));
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, desiredX, factor);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, desiredY, factor);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, desiredZ, factor);

    currentLook.current.lerp(targetLook, factor);
    state.camera.lookAt(currentLook.current);
  });

  return null;
}

// ---------------------------------------------------------------------------
// 11. Main GlobalScene3D Component
// ---------------------------------------------------------------------------
interface GlobalScene3DProps {
  currentPath: string;
}

export const GlobalScene3D: React.FC<GlobalScene3DProps> = ({ currentPath }) => {
  const telemetryTexture = useMemo(() => createTelemetryTexture(), []);
  const [pulseActive, setPulseActive] = useState(false);

  useEffect(() => {
    const handlePulse = () => {
      setPulseActive(true);
      setTimeout(() => setPulseActive(false), 2400);
    };
    window.addEventListener('pipeline-pulse', handlePulse);
    return () => window.removeEventListener('pipeline-pulse', handlePulse);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [9.5, 8.5, 9.5], fov: 36, near: 0.1, far: 80 }}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: true,
        }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[10, 16, 8]} intensity={1.6} />
        <directionalLight position={[-12, 10, -10]} intensity={0.8} color="#38bdf8" />

        {/* Multi-Chromatic Point Lights */}
        <pointLight position={[-4.2, 4.0, -1.2]} intensity={1.4} color="#f43f5e" distance={8} />
        <pointLight position={[2.0, 3.0, 1.5]} intensity={1.4} color="#6366f1" distance={9} />

        {/* Complete 3D Architectural Facility System */}
        <SortingTurntableTower />
        <ConveyorBeltSystem pulseActive={pulseActive} />
        <CommandTelemetryCenter telemetryTexture={telemetryTexture} />
        <InteractiveSensorDock />
        <CorporateDataTower />
        <GlowingDataConduits pulseActive={pulseActive} />
        <IsometricStudioFloor />
        <FloatingDustParticles />

        {/* Spatial Camera Controller */}
        <CameraFlyController currentPath={currentPath} />
      </Canvas>
    </div>
  );
};

export default GlobalScene3D;
