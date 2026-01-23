import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Generate stable random data outside the component
const MAX_COUNT = 10000;
const INSTANCED_DATA = Array.from({ length: MAX_COUNT }, () => ({
  x: (Math.random() - 0.5) * 200,
  y: Math.random() * 50,
  z: (Math.random() - 0.5) * 200,
  scale: Math.random() * 2 + 0.5,
  rotationSpeed: Math.random() * 0.005,
}));

const INSTANCED_COLORS = new Float32Array(MAX_COUNT * 3);
const tempColor = new THREE.Color();
for (let i = 0; i < MAX_COUNT; i++) {
  tempColor.setHSL(Math.random(), 0.7, 0.5);
  INSTANCED_COLORS[i * 3] = tempColor.r;
  INSTANCED_COLORS[i * 3 + 1] = tempColor.g;
  INSTANCED_COLORS[i * 3 + 2] = tempColor.b;
}

function InstancedBoxes({ count }) {
  const meshRef = useRef();
  const tempObject = useMemo(() => new THREE.Object3D(), []);

  // Slice data based on current count
  const data = useMemo(() => INSTANCED_DATA.slice(0, count), [count]);
  const colorArray = useMemo(
    () => INSTANCED_COLORS.slice(0, count * 3),
    [count],
  );

  useEffect(() => {
    // Set initial positions
    data.forEach((item, i) => {
      tempObject.position.set(item.x, item.y, item.z);
      tempObject.scale.set(item.scale, item.scale, item.scale);
      tempObject.updateMatrix();
      meshRef.current.setMatrixAt(i, tempObject.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [data, tempObject]);

  useFrame(() => {
    // Animate rotations
    data.forEach((item, i) => {
      tempObject.position.set(item.x, item.y, item.z);
      tempObject.rotation.x += item.rotationSpeed;
      tempObject.rotation.y += item.rotationSpeed;
      tempObject.scale.set(item.scale, item.scale, item.scale);
      tempObject.updateMatrix();
      meshRef.current.setMatrixAt(i, tempObject.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]} castShadow>
      <boxGeometry>
        <instancedBufferAttribute
          attach="attributes-color"
          args={[colorArray, 3]}
        />
      </boxGeometry>
      <meshStandardMaterial vertexColors />
    </instancedMesh>
  );
}

export default InstancedBoxes;
