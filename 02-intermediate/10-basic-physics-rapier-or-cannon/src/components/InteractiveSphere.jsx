import { useRef, useState, useMemo } from "react";
import { RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function InteractiveSphere({ position }) {
  const rigidBodyRef = useRef();
  const [isDragging, setIsDragging] = useState(false);

  const { plane, raycaster, intersection } = useMemo(
    () => ({
      plane: new THREE.Plane(new THREE.Vector3(0, 1, 0), 0),
      raycaster: new THREE.Raycaster(),
      intersection: new THREE.Vector3(),
    }),
    []
  );

  const handlePointerDown = (e) => {
    e.stopPropagation();
    setIsDragging(true);
    if (rigidBodyRef.current) {
      rigidBodyRef.current.setBodyType(1, true);
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    if (rigidBodyRef.current) {
      rigidBodyRef.current.setBodyType(0, true);

      rigidBodyRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
      rigidBodyRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
    }
  };

  useFrame((state) => {
    if (isDragging && rigidBodyRef.current) {
      raycaster.setFromCamera(state.pointer, state.camera);
      raycaster.ray.intersectPlane(plane, intersection);

      if (intersection) {
        const newPos = new THREE.Vector3(
          intersection.x,
          Math.max(0.8, intersection.y),
          intersection.z
        );
        rigidBodyRef.current.setNextKinematicTranslation(newPos);
      }
    }
  });

  return (
    <RigidBody
      ref={rigidBodyRef}
      position={position}
      colliders="ball"
      restitution={0.8}
      friction={0.1}
      density={2}
    >
      <mesh
        castShadow
        receiveShadow
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color="#ff4444" metalness={0.3} roughness={0.4} />
      </mesh>
    </RigidBody>
  );
}

export default InteractiveSphere;
