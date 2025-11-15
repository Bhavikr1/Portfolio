'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Torus, Box } from '@react-three/drei';
import * as THREE from 'three';

function Particles({ count = 1000 }) {
  const mesh = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const time = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const x = Math.random() * 2 - 1;
      const y = Math.random() * 2 - 1;
      const z = Math.random() * 2 - 1;

      temp.push({ time, factor, speed, x, y, z });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(() => {
    if (!mesh.current) return;

    particles.forEach((particle, i) => {
      let { factor, speed, x, y, z } = particle;

      const t = (particle.time += speed);
      dummy.position.set(
        x + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        y + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        z + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );

      const scale = Math.cos(t) * 0.2 + 0.5;
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();

      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <dodecahedronGeometry args={[0.03, 0]} />
      <meshPhongMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.5} />
    </instancedMesh>
  );
}

function HolographicCore() {
  const sphereRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  const boxRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (sphereRef.current) {
      sphereRef.current.rotation.x = t * 0.2;
      sphereRef.current.rotation.y = t * 0.3;
    }

    if (torusRef.current) {
      torusRef.current.rotation.x = t * 0.5;
      torusRef.current.rotation.z = t * 0.4;
    }

    if (boxRef.current) {
      boxRef.current.rotation.y = -t * 0.3;
      boxRef.current.rotation.x = -t * 0.2;
    }

    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central distorted sphere - the core */}
      <Sphere ref={sphereRef} args={[1, 64, 64]} scale={1.5}>
        <MeshDistortMaterial
          color="#00ffff"
          emissive="#0066cc"
          emissiveIntensity={0.5}
          transparent
          opacity={0.3}
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          wireframe={false}
        />
      </Sphere>

      {/* Inner wireframe sphere */}
      <Sphere args={[1.2, 32, 32]} scale={1.5}>
        <meshBasicMaterial
          color="#00ffff"
          wireframe
          transparent
          opacity={0.3}
        />
      </Sphere>

      {/* Rotating torus ring */}
      <Torus ref={torusRef} args={[2, 0.1, 16, 100]}>
        <meshStandardMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={0.8}
          transparent
          opacity={0.6}
        />
      </Torus>

      {/* Outer rotating box frame */}
      <Box ref={boxRef} args={[3.5, 3.5, 3.5]}>
        <meshBasicMaterial
          color="#0099ff"
          wireframe
          transparent
          opacity={0.2}
        />
      </Box>

      {/* Particle field */}
      <Particles count={500} />
    </group>
  );
}

export default function HolographicCore3D() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0066cc" />
        <spotLight position={[0, 5, 0]} intensity={0.5} color="#00ffff" />

        <HolographicCore />

        {/* Mouse interaction */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}
