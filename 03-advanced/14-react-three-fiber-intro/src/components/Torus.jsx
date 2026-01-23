import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

function Torus({ position }) {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[0.6, 0.25, 16, 100]} />
      <meshStandardMaterial color="#95e1d3" />
    </mesh>
  );
}

export default Torus;
