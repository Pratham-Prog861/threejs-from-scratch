import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useState, useRef } from 'react';

function ControlledBox({ color, speed }) {
  const meshRef = useRef();

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * speed;
    meshRef.current.rotation.y += delta * speed;
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function Example4_State() {
  const [color, setColor] = useState('hotpink');
  const [speed, setSpeed] = useState(1);

  return (
    <div className="canvas-container">
      <div className="example-info">
        <strong>Example 4: React State Integration</strong><br /><br />
        R3F integrates seamlessly with React:<br />
        • Use hooks (useState, useEffect)<br />
        • Pass props to 3D components<br />
        • Update 3D with React state<br /><br />
        <strong>Controls:</strong>
        <div style={{ marginTop: '10px' }}>
          <button 
            onClick={() => setColor(color === 'hotpink' ? 'orange' : 'hotpink')}
            style={{
              padding: '6px 12px',
              marginRight: '8px',
              background: '#333',
              color: 'white',
              border: '1px solid #555',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '11px'
            }}
          >
            Toggle Color
          </button>
          <button 
            onClick={() => setSpeed(speed === 1 ? 3 : 1)}
            style={{
              padding: '6px 12px',
              background: '#333',
              color: 'white',
              border: '1px solid #555',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '11px'
            }}
          >
            Toggle Speed
          </button>
        </div>
      </div>

      <Canvas camera={{ position: [0, 0, 5] }}>
        <color attach="background" args={['#1a1a2e']} />
        
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        
        <ControlledBox color={color} speed={speed} />
        
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default Example4_State;
