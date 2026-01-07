import { useGLTF } from '@react-three/drei';
import { useMemo } from 'react';

function Car({ position, rotation, scale }) {
  const { scene } = useGLTF('/models/car.glb');
  
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  return (
    <primitive 
      object={clonedScene} 
      position={position} 
      rotation={rotation}
      scale={scale}
      castShadow
      receiveShadow
    />
  );
}

useGLTF.preload('/models/car.glb');

export default Car;
