import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Generate random data outside the component to satisfy strict purity rules
const BACKGROUND_SPHERES_DATA = Array.from({ length: 50 }).map(() => ({
  position: [
    (Math.random() - 0.5) * 30,
    Math.random() * 10,
    (Math.random() - 0.5) * 30 - 10,
  ],
  scale: Math.random() * 0.2 + 0.1,
  color: new THREE.Color().setHSL(Math.random(), 1, 0.5),
  emissive: new THREE.Color().setHSL(Math.random(), 1, 0.5),
}));

function GlowingObjects() {
  const torusRef = useRef();
  const sphereRef = useRef();
  const boxRef = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (torusRef.current) {
      torusRef.current.rotation.x = time * 0.3;
      torusRef.current.rotation.y = time * 0.5;
    }

    if (sphereRef.current) {
      sphereRef.current.position.y = Math.sin(time * 2) * 0.5 + 1.5;
    }

    if (boxRef.current) {
      boxRef.current.rotation.x = time * 0.4;
      boxRef.current.rotation.z = time * 0.3;
    }
  });

  return (
    <>
      {/* Glowing torus */}
      <mesh ref={torusRef} position={[0, 1.5, 0]}>
        <torusGeometry args={[1, 0.4, 32, 100]} />
        <meshStandardMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>

      {/* Glowing sphere */}
      <mesh ref={sphereRef} position={[-3, 1.5, 0]}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial
          color="#ff00ff"
          emissive="#ff00ff"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>

      {/* Glowing box */}
      <mesh ref={boxRef} position={[3, 1.5, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#ffff00"
          emissive="#ffff00"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.8} />
      </mesh>

      {/* Background spheres */}
      {BACKGROUND_SPHERES_DATA.map((sphere, i) => (
        <mesh key={i} position={sphere.position} scale={sphere.scale}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial
            color={sphere.color}
            emissive={sphere.emissive}
            emissiveIntensity={1}
            toneMapped={false}
          />
        </mesh>
      ))}
    </>
  );
}

export default GlowingObjects;
