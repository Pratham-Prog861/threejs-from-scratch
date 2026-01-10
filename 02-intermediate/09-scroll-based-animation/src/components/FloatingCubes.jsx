import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import * as THREE from "three";

function FloatingCubes() {
  const groupRef = useRef();
  const data = useScroll();

  const [cubes] = useState(() =>
    Array.from({ length: 40 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 40 + i * 2,
        (Math.random() - 0.5) * 20 - 5,
      ],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      ],
      scale: Math.random() * 0.4 + 0.1,
      color: new THREE.Color().setHSL(Math.random() * 0.2 + 0.6, 0.8, 0.6),
      speed: Math.random() * 0.5 + 0.2,
    }))
  );

  useFrame((state) => {
    if (!groupRef.current) return;

    groupRef.current.position.y = -data.offset * 40;

    groupRef.current.children.forEach((child, i) => {
      const cube = cubes[i];
      child.rotation.x += 0.01 * cube.speed;
      child.rotation.y += 0.015 * cube.speed;
      child.position.x +=
        Math.sin(state.clock.elapsedTime * cube.speed) * 0.005;
    });
  });

  return (
    <group ref={groupRef}>
      {cubes.map((cube, i) => (
        <mesh
          key={i}
          position={cube.position}
          rotation={cube.rotation}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[cube.scale, cube.scale, cube.scale]} />
          <meshStandardMaterial
            color={cube.color}
            metalness={0.8}
            roughness={0.2}
            emissive={cube.color}
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

export default FloatingCubes;
