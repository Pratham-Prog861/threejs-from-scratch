import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";

function Donut() {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.2;
      meshRef.current.rotation.y = time * 0.3;

      // Pulsing scale
      const scale = 1 + Math.sin(time) * 0.1;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 4, -5]}>
      <torusGeometry args={[2, 0.6, 32, 100]} />
      <MeshDistortMaterial
        color="#ff4400"
        emissive="#ff4400"
        emissiveIntensity={4}
        distort={0.4}
        speed={2}
        toneMapped={false}
      />
    </mesh>
  );
}

export default Donut;
