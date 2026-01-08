import { useRef, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function SnowParticles() {
  const pointsRef = useRef();
  const count = 2000;

  const positions = useMemo(() => new Float32Array(count * 3), [count]);

  const simulationRef = useRef({
    velocities: new Float32Array(count * 3),
  });

  useEffect(() => {
    if (!pointsRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position.array;
    const { velocities } = simulationRef.current;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      positions[i3] = (Math.random() - 0.5) * 30;
      positions[i3 + 1] = Math.random() * 15;
      positions[i3 + 2] = (Math.random() - 0.5) * 30;

      velocities[i3] = (Math.random() - 0.5) * 0.01;
      velocities[i3 + 1] = -Math.random() * 0.02 - 0.01;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.01;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position.array;
    const { velocities } = simulationRef.current;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      positions[i3] +=
        velocities[i3] + Math.sin(state.clock.elapsedTime + i) * 0.001;
      positions[i3 + 1] += velocities[i3 + 1];
      positions[i3 + 2] += velocities[i3 + 2];

      if (positions[i3 + 1] < 0) {
        positions[i3 + 1] = 15;
        positions[i3] = (Math.random() - 0.5) * 30;
        positions[i3 + 2] = (Math.random() - 0.5) * 30;
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
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
        size={0.08}
        color="#ffffff"
        transparent
        opacity={0.6}
        sizeAttenuation={true}
      />
    </points>
  );
}

export default SnowParticles;
