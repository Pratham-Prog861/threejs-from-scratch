import { Instances, Instance } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";

// Generate stable random data outside the component
const MAX_COUNT = 10000;
const DREI_INSTANCES_DATA = Array.from({ length: MAX_COUNT }, () => ({
  position: [
    (Math.random() - 0.5) * 200,
    Math.random() * 50,
    (Math.random() - 0.5) * 200,
  ],
  scale: Math.random() * 2 + 0.5,
  color: new THREE.Color().setHSL(Math.random(), 0.7, 0.5),
}));

function DreiInstances({ count }) {
  const instances = useMemo(() => DREI_INSTANCES_DATA.slice(0, count), [count]);

  return (
    <Instances limit={count} castShadow>
      <boxGeometry />
      <meshStandardMaterial />

      {instances.map((props, i) => (
        <Instance key={i} {...props} />
      ))}
    </Instances>
  );
}

export default DreiInstances;
