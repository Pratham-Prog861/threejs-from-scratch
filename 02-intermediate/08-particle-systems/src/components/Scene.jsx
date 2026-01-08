import { OrbitControls } from '@react-three/drei';
import FireParticles from './FireParticles';
import SmokeParticles from './SmokeParticles';
import SparkleParticles from './SparkleParticles';
import SnowParticles from './SnowParticles';
import Lights from './Lights';

function Scene() {
  return (
    <>
      <Lights />

      <FireParticles position={[-6, 0, 0]} />
      <SmokeParticles position={[-2, 0, 0]} />
      <SparkleParticles position={[2, 2, 0]} />
      <SnowParticles />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#1a1a2a" roughness={0.8} />
      </mesh>

      <OrbitControls 
        enableDamping 
        dampingFactor={0.05}
        minDistance={5}
        maxDistance={30}
      />
    </>
  );
}

export default Scene;
