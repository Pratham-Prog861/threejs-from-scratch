import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

function Robot({ position, scale }) {
  const groupRef = useRef();
  const { nodes, materials } = useGLTF("/models/robot.glb");

  useFrame(() => {
    groupRef.current.rotation.y += 0.01;
  });

  return (
    <group ref={groupRef} position={position} scale={scale} dispose={null}>
      {Object.keys(nodes).map((key) => {
        const node = nodes[key];
        if (node.isMesh) {
          return (
            <mesh
              key={key}
              geometry={node.geometry}
              material={node.material || materials[Object.keys(materials)[0]]}
              castShadow
              receiveShadow
            />
          );
        }
        return null;
      })}
    </group>
  );
}

useGLTF.preload("/models/robot.glb");

export default Robot;
