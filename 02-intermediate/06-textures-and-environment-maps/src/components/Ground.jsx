import { useTexture } from "@react-three/drei";
import * as THREE from "three";

function Ground() {
  const textures = useTexture({
    map: "/textures/wood/wood_planks_diff_2k.jpg",
    normalMap: "/textures/wood/wood_planks_nor_gl_2k.jpg",
    roughnessMap: "/textures/wood/wood_planks_rough_2k.jpg",
    aoMap: "/textures/wood/wood_planks_arm_2k.jpg",
  });

  Object.values(textures).forEach((texture) => {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(10, 10);
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[50, 50]} />
      <meshStandardMaterial {...textures} />
    </mesh>
  );
}

export default Ground;
