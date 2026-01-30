import { OrbitControls, Sky, Environment } from '@react-three/drei';

function VRScene() {
  return (
    <>
      <Sky sunPosition={[100, 20, 100]} />
      <Environment preset="sunset" />
      
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.8} />
      </mesh>

      {/* Front objects */}
      <mesh position={[-2, 1, -3]} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#ff6b6b" />
      </mesh>

      <mesh position={[2, 1, -3]} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#4ecdc4" />
      </mesh>

      <mesh position={[0, 1, -5]} castShadow>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color="#95e1d3" metalness={0.5} roughness={0.3} />
      </mesh>

      {/* Side objects */}
      <mesh position={[-3, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.5, 0.5, 1, 32]} />
        <meshStandardMaterial color="#f38181" />
      </mesh>

      <mesh position={[3, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.5, 0.5, 1, 32]} />
        <meshStandardMaterial color="#aa96da" />
      </mesh>

      {/* Behind user */}
      <mesh position={[0, 1, 3]} castShadow>
        <torusGeometry args={[0.7, 0.3, 16, 100]} />
        <meshStandardMaterial color="#fcbf49" metalness={0.6} roughness={0.2} />
      </mesh>

      {/* Left back */}
      <mesh position={[-2, 1.5, 2]} castShadow>
        <dodecahedronGeometry args={[0.6]} />
        <meshStandardMaterial color="#ff85a1" />
      </mesh>

      {/* Right back */}
      <mesh position={[2, 1.5, 2]} castShadow>
        <octahedronGeometry args={[0.7]} />
        <meshStandardMaterial color="#89cff0" />
      </mesh>

      <OrbitControls enableDamping dampingFactor={0.05} />
    </>
  );
}

export default VRScene;
