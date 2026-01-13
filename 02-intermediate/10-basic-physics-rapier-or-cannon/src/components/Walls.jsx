import { RigidBody } from '@react-three/rapier';

function Walls() {
  const wallHeight = 4;
  const wallThickness = 0.5;
  const arenaSize = 10;

  return (
    <>
      <RigidBody type="fixed" position={[0, wallHeight / 2, -arenaSize / 2]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[arenaSize, wallHeight, wallThickness]} />
          <meshStandardMaterial color="#444466" transparent opacity={0.3} />
        </mesh>
      </RigidBody>

      <RigidBody type="fixed" position={[0, wallHeight / 2, arenaSize / 2]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[arenaSize, wallHeight, wallThickness]} />
          <meshStandardMaterial color="#444466" transparent opacity={0.3} />
        </mesh>
      </RigidBody>

      <RigidBody type="fixed" position={[-arenaSize / 2, wallHeight / 2, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[wallThickness, wallHeight, arenaSize]} />
          <meshStandardMaterial color="#444466" transparent opacity={0.3} />
        </mesh>
      </RigidBody>

      <RigidBody type="fixed" position={[arenaSize / 2, wallHeight / 2, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[wallThickness, wallHeight, arenaSize]} />
          <meshStandardMaterial color="#444466" transparent opacity={0.3} />
        </mesh>
      </RigidBody>
    </>
  );
}

export default Walls;
