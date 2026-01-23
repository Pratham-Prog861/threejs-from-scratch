import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Box from './Box';
import Sphere from './Sphere';
import Torus from './Torus';
import Lights from './Lights';

function R3FScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
      <color attach="background" args={['#0f0f1e']} />
      
      <Lights />
      
      <Box position={[-2, 0, 0]} />
      <Sphere position={[0, 0, 0]} />
      <Torus position={[2, 0, 0]} />
      
      <OrbitControls enableDamping dampingFactor={0.05} />
    </Canvas>
  );
}

export default R3FScene;
