import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

function Sphere({ position }) {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.7, 32, 32]} />
      <meshStandardMaterial color="#4ecdc4" />
    </mesh>
  );
}

export default Sphere;
