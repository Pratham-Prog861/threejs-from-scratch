import { useMemo } from "react";
import { Detailed } from "@react-three/drei";
import * as THREE from "three";

// Generate stable random data outside the component
const MAX_COUNT = 1000;
const LOD_DATA = Array.from({ length: MAX_COUNT }, () => ({
  position: [
    (Math.random() - 0.5) * 200,
    Math.random() * 50,
    (Math.random() - 0.5) * 200,
  ],
  color: new THREE.Color().setHSL(Math.random(), 0.7, 0.5),
}));

function LODExample({ count }) {
  const positions = useMemo(() => LOD_DATA.slice(0, count), [count]);

  return (
    <>
      {positions.map((props, i) => (
        <LODObject key={i} {...props} />
      ))}
    </>
  );
}

function LODObject({ position, color }) {
  return (
    <Detailed distances={[0, 50, 100]} position={position}>
      {/* High detail (close) */}
      <mesh castShadow>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Medium detail (medium distance) */}
      <mesh castShadow>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Low detail (far) */}
      <mesh castShadow>
        <sphereGeometry args={[1, 8, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </Detailed>
  );
}

export default LODExample;
