import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// Layer definitions: x position, count of nodes, spread in Y, spread in Z
const LAYERS = [
  { x: -7.5, count: 5, ySpread: 1.8, color: '#00f0ff' }, // Input
  { x: -2.5, count: 8, ySpread: 1.5, color: '#38bdf8' }, // Hidden 1
  { x: 2.5, count: 8, ySpread: 1.5, color: '#a855f7' },  // Hidden 2
  { x: 7.5, count: 4, ySpread: 1.9, color: '#ec4899' },  // Output
];

interface NodeData {
  pos: THREE.Vector3;
  layerIdx: number;
  nodeIdx: number;
  baseColor: string;
}

function NeuralGraph() {
  const groupRef = useRef<THREE.Group>(null);
  const pulseGroupRef = useRef<THREE.Group>(null);

  // 1. Generate node positions per layer
  const { nodes, layerNodes } = useMemo(() => {
    const allNodes: NodeData[] = [];
    const layersArr: THREE.Vector3[][] = [];

    LAYERS.forEach((layer, lIdx) => {
      const currentLayer: THREE.Vector3[] = [];
      const startY = -((layer.count - 1) * layer.ySpread) / 2;

      for (let i = 0; i < layer.count; i++) {
        const y = startY + i * layer.ySpread;
        // slight jitter for organic engineering look
        const z = (Math.sin(lIdx * 2.3 + i * 1.7) * 0.8);
        const v = new THREE.Vector3(layer.x, y, z);
        currentLayer.push(v);
        allNodes.push({
          pos: v,
          layerIdx: lIdx,
          nodeIdx: i,
          baseColor: layer.color,
        });
      }
      layersArr.push(currentLayer);
    });

    return { nodes: allNodes, layerNodes: layersArr };
  }, []);

  // 2. Generate edges (synapses) connecting adjacent layers
  const { edgePositions, edgeColors } = useMemo(() => {
    const positions: number[] = [];
    const colors: number[] = [];

    for (let l = 0; l < layerNodes.length - 1; l++) {
      const fromLayer = layerNodes[l];
      const toLayer = layerNodes[l + 1];

      for (let f = 0; f < fromLayer.length; f++) {
        for (let t = 0; t < toLayer.length; t++) {
          // Semi-sparse connections for elegance
          if ((f + t + l) % 3 === 0 || Math.abs(f - t) <= 2) {
            positions.push(fromLayer[f].x, fromLayer[f].y, fromLayer[f].z);
            positions.push(toLayer[t].x, toLayer[t].y, toLayer[t].z);

            const c1 = new THREE.Color(LAYERS[l].color);
            const c2 = new THREE.Color(LAYERS[l + 1].color);
            colors.push(c1.r * 0.5, c1.g * 0.5, c1.b * 0.5);
            colors.push(c2.r * 0.5, c2.g * 0.5, c2.b * 0.5);
          }
        }
      }
    }

    return {
      edgePositions: new Float32Array(positions),
      edgeColors: new Float32Array(colors),
    };
  }, [layerNodes]);

  // 3. Signal pulses travelling along synapses
  const pulses = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 32; i++) {
      const l = Math.floor(Math.random() * (layerNodes.length - 1));
      const fromIdx = Math.floor(Math.random() * layerNodes[l].length);
      const toIdx = Math.floor(Math.random() * layerNodes[l + 1].length);
      arr.push({
        layer: l,
        from: layerNodes[l][fromIdx],
        to: layerNodes[l + 1][toIdx],
        progress: Math.random(),
        speed: 0.3 + Math.random() * 0.4,
      });
    }
    return arr;
  }, [layerNodes]);

  const pulseMeshesRef = useRef<THREE.Mesh[]>([]);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Gentle floating rotation
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.15) * 0.12;
      groupRef.current.rotation.x = Math.cos(t * 0.12) * 0.08;
    }

    // Animate signal pulses propagating from layer to layer
    pulses.forEach((p, idx) => {
      p.progress += delta * p.speed;
      if (p.progress > 1) {
        p.progress = 0;
        // pick random connection
        const l = Math.floor(Math.random() * (layerNodes.length - 1));
        const fromIdx = Math.floor(Math.random() * layerNodes[l].length);
        const toIdx = Math.floor(Math.random() * layerNodes[l + 1].length);
        p.from = layerNodes[l][fromIdx];
        p.to = layerNodes[l + 1][toIdx];
      }

      const mesh = pulseMeshesRef.current[idx];
      if (mesh) {
        mesh.position.lerpVectors(p.from, p.to, p.progress);
        const s = Math.sin(p.progress * Math.PI) * 0.16 + 0.08;
        mesh.scale.set(s, s, s);
      }
    });
  });

  return (
    <group ref={groupRef}>
      {/* Synaptic Edge Lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={edgePositions.length / 3}
            array={edgePositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={edgeColors.length / 3}
            array={edgeColors}
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

      {/* Neural Nodes */}
      {nodes.map((n, idx) => (
        <group key={idx} position={n.pos}>
          {/* Inner core */}
          <mesh>
            <sphereGeometry args={[0.22, 24, 24]} />
            <meshBasicMaterial color={n.baseColor} />
          </mesh>
          {/* Outer glow aura */}
          <mesh>
            <sphereGeometry args={[0.42, 16, 16]} />
            <meshBasicMaterial
              color={n.baseColor}
              transparent
              opacity={0.25}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </group>
      ))}

      {/* Signal Pulses */}
      <group ref={pulseGroupRef}>
        {pulses.map((_, i) => (
          <mesh
            key={i}
            ref={(el) => {
              if (el) pulseMeshesRef.current[i] = el;
            }}
          >
            <sphereGeometry args={[1, 12, 12]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// Drifting wireframe CNN feature-map slabs
function CNNFeatureSlabs() {
  const slabRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (slabRef.current) {
      slabRef.current.position.y = Math.sin(t * 0.4) * 0.4;
      slabRef.current.rotation.z = Math.sin(t * 0.2) * 0.05;
    }
  });

  return (
    <group ref={slabRef} position={[0, -1, -5]}>
      {/* Slab 1 (Input Tensor Grid) */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <group position={[-6, 2, -2]} rotation={[0.3, 0.4, -0.1]}>
          <mesh>
            <boxGeometry args={[4, 4, 0.1]} />
            <meshBasicMaterial
              color="#00f0ff"
              wireframe
              transparent
              opacity={0.2}
            />
          </mesh>
        </group>
      </Float>

      {/* Slab 2 (Conv2D Feature Map) */}
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.6}>
        <group position={[0, -2, -3]} rotation={[-0.2, -0.3, 0.1]}>
          <mesh>
            <boxGeometry args={[3.2, 3.2, 0.15]} />
            <meshBasicMaterial
              color="#a855f7"
              wireframe
              transparent
              opacity={0.22}
            />
          </mesh>
        </group>
      </Float>

      {/* Slab 3 (Dense Layer Tensor) */}
      <Float speed={1.8} rotationIntensity={0.25} floatIntensity={0.5}>
        <group position={[6, 1.5, -2]} rotation={[0.2, -0.4, 0.2]}>
          <mesh>
            <boxGeometry args={[2.5, 2.5, 0.1]} />
            <meshBasicMaterial
              color="#ec4899"
              wireframe
              transparent
              opacity={0.18}
            />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

// Floating point cloud tensor background
function TensorParticles() {
  const count = 350;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 35;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 25 - 5;
    }
    return pos;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.03;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#00f0ff"
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Camera parallax with pointer
function CameraController() {
  useFrame((state) => {
    const { x, y } = state.pointer;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, x * 1.5, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, y * 1.2, 0.05);
    state.camera.lookAt(0, 0, 0);
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
        <PerspectiveCamera makeDefault position={[0, 0, 14]} fov={50} />
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f0ff" />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#a855f7" />

        <NeuralGraph />
        <CNNFeatureSlabs />
        <TensorParticles />
        <CameraController />
      </Canvas>
    </div>
  );
};
