import { useRef, useEffect, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

function FireParticles({ position }) {
  const pointsRef = useRef();
  const count = 500;

  const particleTexture = useLoader(
    THREE.TextureLoader,
    "/textures/particle.png"
  );

  const [positions, colors] = useMemo(() => {
    return [new Float32Array(count * 3), new Float32Array(count * 3)];
  }, [count]);

  const simulationRef = useRef({
    velocities: new Float32Array(count * 3),
    lifespans: new Float32Array(count),
  });

  useEffect(() => {
    if (!pointsRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position.array;
    const colors = pointsRef.current.geometry.attributes.color.array;
    const { velocities, lifespans } = simulationRef.current;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      positions[i3] = (Math.random() - 0.5) * 0.5;
      positions[i3 + 1] = 0;
      positions[i3 + 2] = (Math.random() - 0.5) * 0.5;

      velocities[i3] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 1] = Math.random() * 0.05 + 0.03;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;

      lifespans[i] = Math.random() * 2;

      colors[i3] = 1;
      colors[i3 + 1] = 0.5;
      colors[i3 + 2] = 0;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.geometry.attributes.color.needsUpdate = true;
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position.array;
    const colors = pointsRef.current.geometry.attributes.color.array;
    const { velocities, lifespans } = simulationRef.current;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      positions[i3] += velocities[i3];
      positions[i3 + 1] += velocities[i3 + 1];
      positions[i3 + 2] += velocities[i3 + 2];

      lifespans[i] -= delta;

      const lifeRatio = Math.max(0, lifespans[i] / 2);
      colors[i3] = 1;
      colors[i3 + 1] = lifeRatio * 0.8;
      colors[i3 + 2] = 0;

      if (lifespans[i] <= 0) {
        positions[i3] = (Math.random() - 0.5) * 0.5;
        positions[i3 + 1] = 0;
        positions[i3 + 2] = (Math.random() - 0.5) * 0.5;
        lifespans[i] = Math.random() * 2;
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.geometry.attributes.color.needsUpdate = true;
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
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        alphaMap={particleTexture}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default FireParticles;
