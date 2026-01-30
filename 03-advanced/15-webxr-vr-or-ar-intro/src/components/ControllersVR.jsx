import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Controllers, Hands, useXR } from '@react-three/xr';
import { Text, Environment } from '@react-three/drei';

function FloatingSphere({ position, color, speed }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position} castShadow>
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshStandardMaterial 
        color={color} 
        metalness={0.8}
        roughness={0.2}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

function ControllersVR() {
  const { isPresenting, isHandTracking } = useXR();

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

      {/* Grid for spatial reference */}
      <gridHelper args={[20, 20, '#444444', '#222222']} position={[0, 0.01, 0]} />

      {/* Central reference sphere */}
      <mesh position={[0, 1.6, -2]} castShadow>
        <sphereGeometry args={[0.5, 64, 64]} />
        <meshStandardMaterial 
          color="#4ecdc4" 
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Floating spheres */}
      <FloatingSphere position={[-2, 1.5, -2]} color="#ff6b6b" speed={1} />
      <FloatingSphere position={[2, 1.5, -2]} color="#95e1d3" speed={1.5} />
      <FloatingSphere position={[-1, 1, -3]} color="#f38181" speed={0.8} />
      <FloatingSphere position={[1, 1, -3]} color="#aa96da" speed={1.2} />

      {/* Instructions */}
      <Text
        position={[0, 2.5, -2]}
        fontSize={0.18}
        color="white"
        anchorX="center"
        anchorY="middle"
        maxWidth={5}
      >
        {!isPresenting && 'Enter VR to see your controllers'}
        {isPresenting && !isHandTracking && 'Your VR Controllers Are Visible!'}
        {isPresenting && isHandTracking && 'Hand Tracking Active!'}
      </Text>

      <Text
        position={[0, 2.2, -2]}
        fontSize={0.12}
        color="#aaaaaa"
        anchorX="center"
        anchorY="middle"
        maxWidth={5}
      >
        {isPresenting && 'Move your controllers to see them track in 3D space'}
        {!isPresenting && 'Controllers and hand models render automatically'}
      </Text>

      {/* Controller visualization boundaries */}
      <mesh position={[-1.5, 1.2, 0]}>
        <boxGeometry args={[0.05, 0.05, 0.05]} />
        <meshStandardMaterial color="#888888" />
      </mesh>

      <mesh position={[1.5, 1.2, 0]}>
        <boxGeometry args={[0.05, 0.05, 0.05]} />
        <meshStandardMaterial color="#888888" />
      </mesh>
    </>
  );
}

export default ControllersVR;
