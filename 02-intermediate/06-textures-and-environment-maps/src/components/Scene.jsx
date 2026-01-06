import { OrbitControls, Environment } from '@react-three/drei';
import Lights from './Lights';
import TexturedBox from './TexturedBox';
import TexturedSphere from './TexturedSphere';
import TexturedCylinder from './TexturedCylinder';
import Ground from './Ground';

function Scene() {
  return (
    <>
      <color attach="background" args={['#1a1a2e']} />
      <fog attach="fog" args={['#1a1a2e', 10, 50]} />

      <Lights />

      <TexturedBox position={[-3, 1, 0]} />
      <TexturedSphere position={[0, 1.2, 0]} />
      <TexturedCylinder position={[3, 1, 0]} />

      <Ground />

      <Environment preset="sunset" background={false} />

      <OrbitControls 
        enableDamping 
        dampingFactor={0.05}
        minDistance={3}
        maxDistance={20}
      />
    </>
  );
}

export default Scene;
