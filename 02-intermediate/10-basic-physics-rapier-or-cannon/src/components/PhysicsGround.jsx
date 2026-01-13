import { RigidBody } from '@react-three/rapier';

function PhysicsGround({ onClick }) {
  return (
    <RigidBody type="fixed" friction={1} restitution={0.2}>
      <mesh 
        receiveShadow 
        rotation={[-Math.PI / 2, 0, 0]} 
        onClick={onClick}
      >
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#2d2d2d" />
      </mesh>
    </RigidBody>
  );
}

export default PhysicsGround;
