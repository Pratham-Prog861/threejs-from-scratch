import { useGLTF } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

function Astronaut({ position, scale }) {
  const meshRef = useRef();
  const { scene } = useGLTF('/models/astronaut.glb');

  useFrame((state) => {
    meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.2;
  });

  return (
    <primitive 
      ref={meshRef}
      object={scene} 
      position={position} 
      scale={scale}
      castShadow
      receiveShadow
    />
  );
}

useGLTF.preload('/models/astronaut.glb');

export default Astronaut;
