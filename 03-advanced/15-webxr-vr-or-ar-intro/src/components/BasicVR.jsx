import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';

function RotatingTorus({ position, color }) {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position} castShadow>
      <torusGeometry args={[0.6, 0.25, 16, 100]} />
      <meshStandardMaterial color={color} metalness={0.6} roughness={0.3} />
    </mesh>
  );
}

function BasicVR() {
  return (
    <>
      <Environment preset="sunset" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.9} />
      </mesh>

      {/* Grid for reference */}
      <gridHelper args={[20, 20, '#444444', '#222222']} position={[0, 0.01, 0]} />

      {/* Central sphere */}
      <mesh position={[0, 1.6, -3]} castShadow>
        <sphereGeometry args={[0.8, 64, 64]} />
        <meshStandardMaterial 
          color="#4ecdc4" 
          metalness={0.7} 
          roughness={0.2}
          emissive="#4ecdc4"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Rotating toruses */}
      <RotatingTorus position={[-2, 1.5, -2.5]} color="#ff6b6b" />
      <RotatingTorus position={[2, 1.5, -2.5]} color="#95e1d3" />

      {/* Cubes */}
      <mesh position={[-3, 0.5, -1]} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#f38181" />
      </mesh>

      <mesh position={[3, 0.5, -1]} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#aa96da" />
      </mesh>

      {/* Ceiling light indicator */}
      <mesh position={[0, 4, -3]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial 
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>
    </>
  );
}

export default BasicVR;
