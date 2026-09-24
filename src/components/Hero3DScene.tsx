import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// Luminous 3D Neural Ring / Synaptic Cyber Lattice positioned in the background
function HolographicNeuralLattice() {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Group>(null);

  // Generate structured neural node rings in the background (no particles in front)
  const nodeCount = 28;
  const nodes = useMemo(() => {
    const arr = [];
    const radius = 6.2;
    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * (radius * 0.55);
      const z = -6.5 + Math.sin(i * 1.5) * 1.2;
      arr.push({ pos: new THREE.Vector3(x, y, z), color: i % 2 === 0 ? '#00f0ff' : '#a855f7' });
    }
    return arr;
  }, []);

  // Synaptic connector lines
  const { linePositions, lineColors } = useMemo(() => {
    const pos: number[] = [];
    const col: number[] = [];

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const d = nodes[i].pos.distanceTo(nodes[j].pos);
        if (d < 4.2) {
          pos.push(nodes[i].pos.x, nodes[i].pos.y, nodes[i].pos.z);
          pos.push(nodes[j].pos.x, nodes[j].pos.y, nodes[j].pos.z);

          const c1 = new THREE.Color(nodes[i].color);
          const c2 = new THREE.Color(nodes[j].color);
          col.push(c1.r, c1.g, c1.b);
          col.push(c2.r, c2.g, c2.b);
        }
      }
    }

    return {
      linePositions: new Float32Array(pos),
      lineColors: new Float32Array(col),
    };
  }, [nodes]);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.z = t * 0.04;
      groupRef.current.rotation.x = Math.sin(t * 0.15) * 0.08;
      groupRef.current.rotation.y = Math.cos(t * 0.12) * 0.08;
    }

    if (ringRef1.current) {
      ringRef1.current.rotation.x = 1.1 + Math.sin(t * 0.3) * 0.1;
      ringRef1.current.rotation.y = t * 0.12;
    }

    if (ringRef2.current) {
      ringRef2.current.rotation.x = -1.1 + Math.cos(t * 0.25) * 0.1;
      ringRef2.current.rotation.y = -t * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.4, 0]}>
      {/* Background Synaptic Grid Lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={lineColors.length / 3}
            array={lineColors}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Structured Neural Nodes */}
      {nodes.map((node, i) => (
        <group key={i} position={node.pos}>
          <mesh>
            <sphereGeometry args={[0.16, 16, 16]} />
            <meshBasicMaterial color={node.color} />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.32, 12, 12]} />
            <meshBasicMaterial
              color={node.color}
              transparent
              opacity={0.2}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </group>
      ))}

      {/* Cybernetic Orbiting Rings framing the background */}
      <mesh ref={ringRef1} position={[0, 0, -6.5]}>
        <torusGeometry args={[5.8, 0.02, 16, 100]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.45} />
      </mesh>

      <mesh ref={ringRef2} position={[0, 0, -6.5]}>
        <torusGeometry args={[6.6, 0.025, 16, 100]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

// Drifting wireframe CNN feature-map slabs (tilted safely in background)
function CNNFeatureSlabs() {
  const slabRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (slabRef.current) {
      slabRef.current.position.y = Math.sin(t * 0.3) * 0.3;
    }
  });

  return (
    <group ref={slabRef} position={[0, -0.5, -8]}>
      {/* Left Input Tensor Grid */}
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
        <group position={[-7.5, 2.5, -1]} rotation={[0.25, 0.35, -0.1]}>
          <mesh>
            <boxGeometry args={[4.2, 4.2, 0.08]} />
            <meshBasicMaterial color="#00f0ff" wireframe transparent opacity={0.25} />
          </mesh>
        </group>
      </Float>

      {/* Right Feature Map Slab */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <group position={[7.5, -1.8, -1]} rotation={[-0.2, -0.3, 0.15]}>
          <mesh>
            <boxGeometry args={[3.8, 3.8, 0.1]} />
            <meshBasicMaterial color="#a855f7" wireframe transparent opacity={0.28} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

// 3D Perspective Camera Controller with subtle mouse parallax
function CameraController() {
  useFrame((state) => {
    const { x, y } = state.pointer;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, x * 1.2, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, y * 0.9, 0.05);
    state.camera.lookAt(0, 0, -4);
  });
  return null;
}

export const Hero3DScene: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-auto z-0 overflow-hidden">
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 9]} fov={50} />
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 5]} intensity={2} color="#00f0ff" />
        <pointLight position={[-10, -10, 5]} intensity={2} color="#a855f7" />

        <HolographicNeuralLattice />
        <CNNFeatureSlabs />
        <CameraController />
      </Canvas>
    </div>
  );
};
