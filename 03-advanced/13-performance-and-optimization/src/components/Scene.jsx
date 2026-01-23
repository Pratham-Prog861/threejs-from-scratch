import { OrbitControls } from '@react-three/drei';
import { useControls } from 'leva';
import NaiveBoxes from './NaiveBoxes';
import InstancedBoxes from './InstancedBoxes';
import DreiInstances from './DreiInstances';
import LODExample from './LODExample';
import Lights from './Lights';

function Scene() {
  const { mode, count } = useControls('Rendering', {
    mode: {
      value: 'instanced',
      options: ['naive', 'instanced', 'drei', 'lod']
    },
    count: {
      value: 10000,
      min: 100,
      max: 100000,
      step: 100
    }
  });

  return (
    <>
      <color attach="background" args={['#0f0f1e']} />
      
      <Lights />

      {mode === 'naive' && <NaiveBoxes count={Math.min(count, 5000)} />}
      {mode === 'instanced' && <InstancedBoxes count={count} />}
      {mode === 'drei' && <DreiInstances count={count} />}
      {mode === 'lod' && <LODExample count={Math.min(count, 10000)} />}

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[500, 500]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.8} />
      </mesh>

      <OrbitControls 
        enableDamping 
        dampingFactor={0.05}
        minDistance={10}
        maxDistance={300}
      />
    </>
  );
}

export default Scene;
