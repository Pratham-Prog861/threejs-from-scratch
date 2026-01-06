import { useTexture } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

function TexturedCylinder({ position }) {
  const meshRef = useRef();

  const textures = useTexture({
    map: '/textures/wood/wood_planks_diff_2k.jpg',
    normalMap: '/textures/wood/wood_planks_nor_gl_2k.jpg',
    roughnessMap: '/textures/wood/wood_planks_rough_2k.jpg',
    aoMap: '/textures/wood/wood_planks_arm_2k.jpg'
  });

  useFrame(() => {
    meshRef.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={meshRef} position={position} castShadow receiveShadow>
      <cylinderGeometry args={[1, 1, 2, 32]} />
      <meshStandardMaterial 
        {...textures}
        metalness={0.1}
        roughness={0.3}
      />
    </mesh>
  );
}

export default TexturedCylinder;
