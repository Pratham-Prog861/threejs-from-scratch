import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import vertexShader from '../shaders/gradient/vertex.glsl';
import fragmentShader from '../shaders/gradient/fragment.glsl';

function GradientSphere({ position }) {
  const meshRef = useRef();
  const materialRef = useRef();

  const uniforms = {
    uTime: { value: 0 },
    uColorA: { value: new THREE.Color('#ff6b6b') },
    uColorB: { value: new THREE.Color('#4ecdc4') }
  };

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[1, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default GradientSphere;
