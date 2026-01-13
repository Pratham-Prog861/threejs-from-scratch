import { RigidBody } from '@react-three/rapier';

function FallingCubes({ cubes }) {
  return (
    <>
      {cubes.map((cube) => (
        <RigidBody
          key={cube.id}
          position={cube.position}
          rotation={cube.rotation}
          colliders="cuboid"
          restitution={0.5}
          friction={0.7}
          density={1}
        >
          <mesh castShadow receiveShadow>
            <boxGeometry args={[cube.scale, cube.scale, cube.scale]} />
            <meshStandardMaterial color={cube.color} />
          </mesh>
        </RigidBody>
      ))}
    </>
  );
}

export default FallingCubes;
