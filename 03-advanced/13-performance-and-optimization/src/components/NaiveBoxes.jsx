import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Generate stable random data outside the component to satisfy strict purity rules
const NAIVE_BOXES_DATA = Array.from({ length: 1000 }, (_, i) => ({
  position: [
    (Math.random() - 0.5) * 200,
    Math.random() * 50,
    (Math.random() - 0.5) * 200,
  ],
  scale: Math.random() * 2 + 0.5,
  color: new THREE.Color().setHSL(Math.random(), 0.7, 0.5),
  id: i,
}));

// WARNING: Very slow with many objects - for demonstration only
function NaiveBoxes({ count }) {
  // Use a slice of the pre-generated data based on the count prop
  const boxes = NAIVE_BOXES_DATA.slice(0, count);

  return (
    <>
      {boxes.map((box) => (
        <Box key={box.id} {...box} />
      ))}
    </>
  );
}

function Box({ position, scale, color }) {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale} castShadow>
      <boxGeometry />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

export default NaiveBoxes;
