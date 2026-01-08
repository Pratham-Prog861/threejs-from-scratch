import { useRef, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function SparkleParticles({ position }) {
  const pointsRef = useRef();
  const count = 1000;

  const [positions, scales] = useMemo(() => {
    return [new Float32Array(count * 3), new Float32Array(count)];
  }, [count]);

  const simulationRef = useRef({
    randoms: new Float32Array(count),
  });

  useEffect(() => {
    if (!pointsRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position.array;
    const scales = pointsRef.current.geometry.attributes.scale.array;
    const { randoms } = simulationRef.current;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      const radius = 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      scales[i] = Math.random();
      randoms[i] = Math.random();
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.geometry.attributes.scale.needsUpdate = true;
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const scales = pointsRef.current.geometry.attributes.scale.array;
    const { randoms } = simulationRef.current;

    for (let i = 0; i < count; i++) {
      scales[i] = Math.abs(
        Math.sin(state.clock.elapsedTime * (randoms[i] * 2 + 0.5))
      );
    }

    pointsRef.current.geometry.attributes.scale.needsUpdate = true;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.1;
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
          attach="attributes-scale"
          count={count}
          array={scales}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#ffff88"
        sizeAttenuation={true}
        transparent
        opacity={0.8}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default SparkleParticles;
