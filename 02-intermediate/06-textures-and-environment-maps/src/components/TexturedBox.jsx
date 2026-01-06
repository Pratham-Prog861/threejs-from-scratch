import { useTexture } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function TexturedBox({ position }) {
  const meshRef = useRef();

  const textures = useTexture({
    map: "/textures/wood/wood_planks_diff_2k.jpg",
    normalMap: "/textures/wood/wood_planks_nor_gl_2k.jpg",
    roughnessMap: "/textures/wood/wood_planks_rough_2k.jpg",
    aoMap: "/textures/wood/wood_planks_arm_2k.jpg",
  });

  Object.values(textures).forEach((texture) => {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);
  });

  useFrame((state) => {
    meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
  });

  return (
    <mesh ref={meshRef} position={position} castShadow receiveShadow>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial {...textures} roughness={0.8} />
    </mesh>
  );
}

export default TexturedBox;
