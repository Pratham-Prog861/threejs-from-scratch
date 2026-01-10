import { forwardRef } from 'react';
import { useGLTF } from '@react-three/drei';

const Robot = forwardRef(({ position, scale }, ref) => {
  const { scene } = useGLTF('/models/robot.glb');

  return (
    <group ref={ref}>
      <primitive object={scene} position={position} scale={scale} castShadow receiveShadow />
    </group>
  );
});

useGLTF.preload('/models/robot.glb');

export default Robot;
