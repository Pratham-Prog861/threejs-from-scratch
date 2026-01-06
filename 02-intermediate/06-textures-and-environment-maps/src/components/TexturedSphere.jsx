import { useTexture } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function TexturedSphere({ position }) {
  const meshRef = useRef();

  const textures = useTexture({
    map: "/textures/wood/wood_planks_diff_2k.jpg",
    normalMap: "/textures/wood/wood_planks_nor_gl_2k.jpg",
    roughnessMap: "/textures/wood/wood_planks_rough_2k.jpg",
    aoMap: "/textures/wood/wood_planks_arm_2k.jpg",
  });

  Object.values(textures).forEach((texture) => {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  });

  useFrame((state) => {
    meshRef.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime) * 0.3;
    meshRef.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={meshRef} position={position} castShadow receiveShadow>
      <sphereGeometry args={[1.2, 64, 64]} />
      <meshStandardMaterial {...textures} roughness={0.9} />
    </mesh>
  );
}

export default TexturedSphere;
