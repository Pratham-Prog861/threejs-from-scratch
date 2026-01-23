import { OrbitControls } from '@react-three/drei';
import GradientSphere from './GradientSphere';
import WavePlane from './WavePlane';
import AnimatedCube from './AnimatedCube';
import Lights from './Lights';

function Scene() {
  return (
    <>
      <color attach="background" args={['#0f0f1e']} />
      
      <Lights />

      <GradientSphere position={[-3, 1, 0]} />
      <WavePlane position={[0, 0, 0]} />
      <AnimatedCube position={[3, 1, 0]} />

      <OrbitControls 
        enableDamping 
        dampingFactor={0.05}
        minDistance={3}
        maxDistance={15}
      />
    </>
  );
}

export default Scene;
