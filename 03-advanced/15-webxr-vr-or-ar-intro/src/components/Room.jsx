import * as THREE from 'three';

function Room() {
  const wallMaterial = new THREE.MeshStandardMaterial({
    color: '#3a3a4a',
    roughness: 0.9,
    side: THREE.BackSide
  });

  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.8} />
      </mesh>

      {/* Walls - Create a box room */}
      {/* Back wall */}
      <mesh position={[0, 2.5, -5]}>
        <boxGeometry args={[10, 5, 0.1]} />
        <meshStandardMaterial {...wallMaterial} color="#3a3a4a" side={THREE.FrontSide} />
      </mesh>

      {/* Left wall */}
      <mesh position={[-5, 2.5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[10, 5, 0.1]} />
        <meshStandardMaterial {...wallMaterial} color="#2a2a3a" side={THREE.FrontSide} />
      </mesh>

      {/* Right wall */}
      <mesh position={[5, 2.5, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[10, 5, 0.1]} />
        <meshStandardMaterial {...wallMaterial} color="#2a2a3a" side={THREE.FrontSide} />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 5, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#1a1a2a" roughness={0.9} />
      </mesh>

      {/* Ceiling lights */}
      <pointLight position={[-2, 4.5, -2]} intensity={0.5} color="#ffffff" />
      <pointLight position={[2, 4.5, -2]} intensity={0.5} color="#ffffff" />
      <pointLight position={[0, 4.5, 2]} intensity={0.3} color="#ffffff" />

      {/* Light indicators */}
      <mesh position={[-2, 4.5, -2]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial 
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>

      <mesh position={[2, 4.5, -2]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial 
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>

      {/* Decorative elements */}
      {/* Window frame on back wall */}
      <mesh position={[0, 2, -4.95]}>
        <boxGeometry args={[2, 1.5, 0.05]} />
        <meshStandardMaterial color="#1a1a3a" />
      </mesh>

      {/* Baseboard */}
      <mesh position={[0, 0.1, -4.95]}>
        <boxGeometry args={[10, 0.2, 0.1]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
    </group>
  );
}

export default Room;
