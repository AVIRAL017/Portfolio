import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ---------------------------------------------------------------------------
// 1. High-Performance Telemetry Canvas Texture (Created ONCE, 0 CPU re-draw lag)
// ---------------------------------------------------------------------------
function createTelemetryTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 340;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // Crisp studio background
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, 512, 340);

    // Top status header
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(0, 0, 512, 36);

    ctx.fillStyle = '#e11d48';
    ctx.beginPath();
    ctx.arc(18, 18, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 12px monospace';
    ctx.fillText('SPATIAL_TELEMETRY // LIVE_FEED', 34, 22);

    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 11px monospace';
    ctx.fillText('ACCURACY: 99.4%', 380, 22);

    // Subtle CAD grid lines
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

    // Circular gauge display
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

    // Loss curve graph
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

    // Data metrics table
    ctx.fillStyle = '#334155';
    ctx.font = '10px monospace';
    ctx.fillText('MODEL: Siamese ResNet-18', 35, 230);
    ctx.fillText('DATASET: xBD / xView2', 35, 252);
    ctx.fillText('TRACKER: ByteTrack [OBB]', 35, 274);

    ctx.fillStyle = '#0284c7';
    ctx.fillText('LATENCY: 14.2ms', 280, 230);
    ctx.fillText('TOPOLOGY: 6DOF Spatial', 280, 252);
    ctx.fillText('BANDWIDTH: 10 Gbps Edge', 280, 274);

    // Bottom telemetry strip
    ctx.fillStyle = '#f1f5f9';
    ctx.fillRect(0, 305, 512, 35);
    ctx.fillStyle = '#64748b';
    ctx.font = 'bold 9px monospace';
    ctx.fillText('STATUS: SYNCHRONIZED [VERIFIED]', 20, 326);
    ctx.fillText('SYSTEM_STATE: OPERATIONAL', 330, 326);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  return texture;
}

// ---------------------------------------------------------------------------
// 2. Autonomous Recon Drone (Overview Focus)
// ---------------------------------------------------------------------------
function SurveillanceDrone() {
  const droneGroupRef = useRef<THREE.Group>(null);
  const rotorFLRef = useRef<THREE.Group>(null);
  const rotorFRRef = useRef<THREE.Group>(null);
  const rotorRLRef = useRef<THREE.Group>(null);
  const rotorRRRef = useRef<THREE.Group>(null);
  const gimbalRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (droneGroupRef.current) {
      droneGroupRef.current.position.y = 2.4 + Math.sin(t * 1.6) * 0.12;
      droneGroupRef.current.rotation.z = Math.sin(t * 1.1) * 0.04;
      droneGroupRef.current.rotation.x = Math.cos(t * 0.9) * 0.03;
    }

    const rSpeed = delta * 24;
    if (rotorFLRef.current) rotorFLRef.current.rotation.y += rSpeed;
    if (rotorFRRef.current) rotorFRRef.current.rotation.y -= rSpeed;
    if (rotorRLRef.current) rotorRLRef.current.rotation.y -= rSpeed;
    if (rotorRRRef.current) rotorRRRef.current.rotation.y += rSpeed;

    if (gimbalRef.current) {
      gimbalRef.current.rotation.y = Math.sin(t * 0.7) * 0.35;
      gimbalRef.current.rotation.x = 0.2 + Math.cos(t * 0.5) * 0.15;
    }
  });

  return (
    <group ref={droneGroupRef} position={[-2.8, 2.4, 1.8]}>
      {/* Central Aerodynamic Fuselage */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.9, 0.22, 1.4]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.2} />
      </mesh>

      {/* Top Canopy Shell */}
      <mesh position={[0, 0.12, 0.05]}>
        <cylinderGeometry args={[0.32, 0.44, 0.14, 24]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.15} metalness={0.35} />
      </mesh>

      {/* Crimson Carbon Fiber Accent Stripe */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[0.12, 0.015, 1.3]} />
        <meshBasicMaterial color="#f43f5e" />
      </mesh>

      {/* 4 Carbon Fiber Propeller Arms */}
      {[
        { pos: [0.75, 0.02, 0.75], angle: Math.PI / 4, ref: rotorFLRef },
        { pos: [-0.75, 0.02, 0.75], angle: -Math.PI / 4, ref: rotorFRRef },
        { pos: [0.75, 0.02, -0.75], angle: -Math.PI / 4, ref: rotorRLRef },
        { pos: [-0.75, 0.02, -0.75], angle: Math.PI / 4, ref: rotorRRRef },
      ].map((arm, i) => (
        <group key={i} position={[arm.pos[0] * 0.5, arm.pos[1], arm.pos[2] * 0.5]}>
          <mesh rotation={[0, arm.angle, 0]}>
            <boxGeometry args={[0.09, 0.07, 1.05]} />
            <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.8} />
          </mesh>

          <group position={[arm.pos[0] * 0.5, 0.08, arm.pos[2] * 0.5]}>
            <mesh>
              <cylinderGeometry args={[0.11, 0.11, 0.16, 16]} />
              <meshStandardMaterial color="#0284c7" roughness={0.25} metalness={0.7} />
            </mesh>

            <group ref={arm.ref} position={[0, 0.1, 0]}>
              <mesh>
                <boxGeometry args={[0.9, 0.012, 0.07]} />
                <meshStandardMaterial color="#0f172a" roughness={0.4} metalness={0.6} />
              </mesh>
              <mesh rotation={[0, Math.PI / 2, 0]}>
                <boxGeometry args={[0.9, 0.012, 0.07]} />
                <meshStandardMaterial color="#0f172a" roughness={0.4} metalness={0.6} />
              </mesh>
            </group>
          </group>
        </group>
      ))}

      {/* Underbelly High-Res Gimbal Camera */}
      <group ref={gimbalRef} position={[0, -0.16, 0.45]}>
        <mesh>
          <sphereGeometry args={[0.18, 20, 20]} />
          <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />
        </mesh>
        <mesh position={[0, 0, 0.14]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.1, 0.11, 0.1, 20]} />
          <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, 0, 0.2]}>
          <circleGeometry args={[0.075, 20]} />
          <meshBasicMaterial color="#0284c7" />
        </mesh>
      </group>

      {/* Drone Navigation Light Glow */}
      <pointLight position={[0, -0.2, 0.5]} color="#0284c7" intensity={0.8} distance={3.5} />
    </group>
  );
}

// ---------------------------------------------------------------------------
// 3. Orbital Satellite Node / CubeSat (Skills Focus)
// ---------------------------------------------------------------------------
function OrbitalSatelliteNode() {
  const satRef = useRef<THREE.Group>(null);
  const dishRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (satRef.current) {
      satRef.current.rotation.y += delta * 0.35;
      satRef.current.position.y = 3.6 + Math.sin(t * 1.2) * 0.1;
    }
    if (dishRef.current) {
      dishRef.current.rotation.x = Math.sin(t * 0.7) * 0.2;
    }
  });

  return (
    <group ref={satRef} position={[0.2, 3.6, 0.6]}>
      {/* Gold Multi-Layer Insulation Main Body */}
      <mesh>
        <boxGeometry args={[1.0, 1.0, 1.4]} />
        <meshStandardMaterial color="#f59e0b" metalness={0.85} roughness={0.2} />
      </mesh>

      {/* Dual Silicon Solar Arrays */}
      {[-1.35, 1.35].map((xOffset, i) => (
        <group key={i} position={[xOffset, 0, 0]}>
          <mesh position={[xOffset > 0 ? -0.4 : 0.4, 0, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 0.8, 12]} />
            <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.2} />
          </mesh>

          <mesh>
            <boxGeometry args={[1.4, 0.03, 2.2]} />
            <meshStandardMaterial color="#1e3a8a" roughness={0.15} metalness={0.8} />
          </mesh>

          <mesh position={[0, 0.018, 0]}>
            <planeGeometry args={[1.34, 2.14]} />
            <meshStandardMaterial color="#2563eb" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>
      ))}

      {/* High-Gain Parabolic Telemetry Dish */}
      <group ref={dishRef} position={[0, 0.75, 0]}>
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <cylinderGeometry args={[0.42, 0.05, 0.18, 24, 1, true]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.8} roughness={0.25} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 0.12, 0.12]} rotation={[Math.PI / 4, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.35, 12]} />
          <meshBasicMaterial color="#e11d48" />
        </mesh>
      </group>

      <pointLight position={[0, 0.6, 0]} color="#38bdf8" intensity={0.7} distance={4} />
    </group>
  );
}

// ---------------------------------------------------------------------------
// 4. CAD Engineering Turntable Tower (Projects Focus)
// ---------------------------------------------------------------------------
function SortingTurntableTower() {
  const topWheelRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (topWheelRef.current) {
      topWheelRef.current.rotation.y += delta * 0.25;
    }
  });

  return (
    <group position={[-4.2, 0, -1.2]}>
      {/* Heavy Machinery Base Plinth */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[2.0, 2.2, 0.8, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.25} metalness={0.25} />
      </mesh>

      {/* Stepped Rim */}
      <mesh position={[0, 0.95, 0]}>
        <cylinderGeometry args={[1.7, 1.9, 0.3, 32]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.3} metalness={0.35} />
      </mesh>

      {/* Glowing Crimson Trim Ring */}
      <mesh position={[0, 1.15, 0]}>
        <torusGeometry args={[1.72, 0.035, 16, 48]} />
        <meshBasicMaterial color="#f43f5e" />
      </mesh>

      {/* Center Pillar */}
      <mesh position={[0, 2.0, 0]}>
        <cylinderGeometry args={[0.5, 0.6, 1.8, 24]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.2} metalness={0.7} />
      </mesh>

      {/* Top Turntable Platform */}
      <group ref={topWheelRef} position={[0, 3.0, 0]}>
        <mesh>
          <cylinderGeometry args={[2.2, 2.2, 0.25, 32]} />
          <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.3} />
        </mesh>

        {/* Floating Holographic Technical Slabs */}
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
// 5. Telemetry Workstation & Display Desk (Contact Focus)
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
      {/* Desk Podium */}
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[3.2, 0.8, 2.2]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.3} metalness={0.4} />
      </mesh>

      {/* Desk Top Trim */}
      <mesh position={[0, 0.82, 0]}>
        <boxGeometry args={[3.3, 0.05, 2.3]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.2} metalness={0.6} />
      </mesh>

      {/* Vertical Telemetry Monitor */}
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

      {/* Laptop Workstation */}
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
// 6. Corporate Data Skyscraper / Algorithmic Tower (Credentials Focus)
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
      {/* Tower Main Glass Volume */}
      <mesh position={[0, 3.2, 0]}>
        <boxGeometry args={[2.2, 6.4, 2.2]} />
        <meshStandardMaterial color="#ffffff" roughness={0.15} metalness={0.3} transparent opacity={0.88} />
      </mesh>

      {/* Internal Core Lattice */}
      <mesh position={[0, 3.2, 0]}>
        <boxGeometry args={[1.4, 6.2, 1.4]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.4} metalness={0.7} />
      </mesh>

      {/* Accent Floor Lines */}
      {[1.2, 2.4, 3.6, 4.8, 5.8].map((y, idx) => (
        <mesh key={idx} position={[0, y, 0]}>
          <boxGeometry args={[2.25, 0.06, 2.25]} />
          <meshBasicMaterial color={idx % 2 === 0 ? '#e11d48' : '#0284c7'} />
        </mesh>
      ))}

      {/* Top Communications Mast */}
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
// 7. Interactive Sensor Dock (Peripheral Anchor)
// ---------------------------------------------------------------------------
function InteractiveSensorDock() {
  const radarRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (radarRef.current) {
      radarRef.current.rotation.y += delta * 1.2;
    }
  });

  return (
    <group position={[-1.8, 0, -3.6]}>
      {/* Base Octagonal Platform */}
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[1.4, 1.6, 0.5, 8]} />
        <meshStandardMaterial color="#ffffff" roughness={0.25} metalness={0.3} />
      </mesh>

      {/* Sensor Mast */}
      <mesh position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.1, 0.14, 1.2, 14]} />
        <meshStandardMaterial color="#64748b" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Rotating Radar Array */}
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
// 8. Ground Studio Floor
// ---------------------------------------------------------------------------
function IsometricStudioFloor() {
  return (
    <group position={[0, -0.01, 0]}>
      {/* Precision Ground Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[44, 44]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.8} metalness={0.05} />
      </mesh>

      {/* Concentric Coordinate Rings */}
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
// 9. Camera Fly Controller with Time-Delta Exponential Damping
// ---------------------------------------------------------------------------
interface CameraFlyControllerProps {
  currentPath: string;
}

const ROUTE_CAMERA_TARGETS: Record<string, { pos: [number, number, number]; lookAt: [number, number, number] }> = {
  '/': {
    pos: [-1.2, 2.6, 6.0],
    lookAt: [-2.2, 0.4, 1.2],
  },
  '/projects': {
    pos: [-4.2, 3.0, 4.4],
    lookAt: [-4.2, 0.4, -1.0],
  },
  '/skills': {
    pos: [0.2, 3.2, 5.2],
    lookAt: [0.2, 0.5, 0.6],
  },
  '/credentials': {
    pos: [4.2, 4.0, 2.2],
    lookAt: [4.0, 1.0, -2.8],
  },
  '/contact': {
    pos: [1.4, 2.4, 3.8],
    lookAt: [1.4, 0.3, -0.2],
  },
};

function CameraFlyController({ currentPath }: CameraFlyControllerProps) {
  const targetConfig = ROUTE_CAMERA_TARGETS[currentPath] || ROUTE_CAMERA_TARGETS['/'];

  const targetPos = useMemo(() => new THREE.Vector3(...targetConfig.pos), [targetConfig.pos]);
  const targetLook = useMemo(() => new THREE.Vector3(...targetConfig.lookAt), [targetConfig.lookAt]);
  const currentLook = useRef(new THREE.Vector3(0, 1.4, 0));

  useFrame((state, delta) => {
    const { pointer } = state;
    // Gentle mouse parallax
    const parallaxX = pointer.x * 0.4;
    const parallaxY = pointer.y * 0.25;

    const desiredX = targetPos.x + parallaxX;
    const desiredY = targetPos.y + parallaxY;
    const desiredZ = targetPos.z;

    // Frame-rate-independent exponential lerp for silky smooth 60-144 FPS
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
// 10. Main GlobalScene3D Component
// ---------------------------------------------------------------------------
interface GlobalScene3DProps {
  currentPath: string;
}

export const GlobalScene3D: React.FC<GlobalScene3DProps> = ({ currentPath }) => {
  // Texture is created once in memo - 0 CPU draw calls per frame
  const telemetryTexture = useMemo(() => createTelemetryTexture(), []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [-0.6, 3.8, 6.8], fov: 42, near: 0.1, far: 80 }}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: true,
        }}
      >
        {/* Crisp Studio Lighting (Clean, no expensive shadow map recalculation) */}
        <ambientLight intensity={1.2} />
        <directionalLight position={[10, 16, 12]} intensity={1.4} />
        <directionalLight position={[-10, 12, -8]} intensity={0.6} color="#e0e7ff" />

        {/* Multi-Chromatic Accent Point Lights */}
        <pointLight position={[-4, 3, 2]} color="#e11d48" intensity={1.0} distance={8} />
        <pointLight position={[3, 4, 3]} color="#0284c7" intensity={0.9} distance={8} />
        <pointLight position={[0, 5, 0]} color="#7c3aed" intensity={0.8} distance={9} />

        {/* 3D Realistic Figures & Zones */}
        <SurveillanceDrone />
        <OrbitalSatelliteNode />
        <SortingTurntableTower />
        <CommandTelemetryCenter telemetryTexture={telemetryTexture} />
        <CorporateDataTower />
        <InteractiveSensorDock />
        <IsometricStudioFloor />

        {/* Spatial Camera Controller */}
        <CameraFlyController currentPath={currentPath} />
      </Canvas>
    </div>
  );
};

export default GlobalScene3D;
