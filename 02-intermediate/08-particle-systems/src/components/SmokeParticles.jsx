import { useRef, useEffect, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

function SmokeParticles({ position }) {
  const pointsRef = useRef();
  const count = 300;

  const smokeTexture = useLoader(THREE.TextureLoader, '/textures/smoke.png');

  const positions = useMemo(() => new Float32Array(count * 3), [count]);

  const simulationRef = useRef({
    velocities: new Float32Array(count * 3),
    scales: new Float32Array(count),
    alphas: new Float32Array(count)
  });

  useEffect(() => {
    if (!pointsRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position.array;
    const { velocities, scales, alphas } = simulationRef.current;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 0.3;
      positions[i3 + 1] = Math.random() * 5;
      positions[i3 + 2] = (Math.random() - 0.5) * 0.3;

      velocities[i3] = (Math.random() - 0.5) * 0.01;
      velocities[i3 + 1] = Math.random() * 0.02 + 0.01;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.01;

      scales[i] = Math.random() * 0.5 + 0.5;
      alphas[i] = Math.random();
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position.array;
    const { velocities, scales, alphas } = simulationRef.current;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      positions[i3] += velocities[i3];
      positions[i3 + 1] += velocities[i3 + 1];
      positions[i3 + 2] += velocities[i3 + 2];

      scales[i] += delta * 0.2;
      alphas[i] -= delta * 0.1;

      if (positions[i3 + 1] > 5 || alphas[i] <= 0) {
        positions[i3] = (Math.random() - 0.5) * 0.3;
        positions[i3 + 1] = 0;
        positions[i3 + 2] = (Math.random() - 0.5) * 0.3;
        scales[i] = Math.random() * 0.5 + 0.5;
        alphas[i] = 1;
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.material.opacity = Math.max(0, ...alphas) * 0.3;
  });

  return (
    <points ref={pointsRef} position={position}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.5}
        color="#888888"
        transparent
        opacity={0.3}
        alphaMap={smokeTexture}
        depthWrite={false}
      />
    </points>
  );
}

export default SmokeParticles;
