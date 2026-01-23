import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef } from 'react';

function RotatingBox() {
  const meshRef = useRef();

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta;
    meshRef.current.rotation.y += delta * 0.5;
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

function Example2_Animation() {
  return (
    <div className="canvas-container">
      <div className="example-info">
        <strong>Example 2: Animation</strong><br /><br />
        Use <strong>useFrame</strong> hook for animations:<br />
        • Runs every frame (60fps)<br />
        • Receives state and delta<br />
        • Delta = time since last frame<br />
        • No manual requestAnimationFrame!<br /><br />
        The box rotates automatically
      </div>

      <Canvas camera={{ position: [0, 0, 5] }}>
        <color attach="background" args={['#1a1a2e']} />
        
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        
        <RotatingBox />
        
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default Example2_Animation;
