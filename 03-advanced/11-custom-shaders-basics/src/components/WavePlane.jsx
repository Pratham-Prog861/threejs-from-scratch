import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import vertexShader from '../shaders/wave/vertex.glsl';
import fragmentShader from '../shaders/wave/fragment.glsl';

function WavePlane({ position }) {
  const materialRef = useRef();

  const uniforms = {
    uTime: { value: 0 },
    uWaveFrequency: { value: 2.0 },
    uWaveAmplitude: { value: 0.3 }
  };

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[4, 4, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={THREE.DoubleSide}
        wireframe={false}
      />
    </mesh>
  );
}

export default WavePlane;
