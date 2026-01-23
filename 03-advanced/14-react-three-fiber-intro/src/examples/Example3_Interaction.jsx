import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useState } from 'react';

function InteractiveBox() {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  return (
    <mesh
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setClicked(!clicked)}
      scale={clicked ? 1.5 : 1}
    >
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
}

function Example3_Interaction() {
  return (
    <div className="canvas-container">
      <div className="example-info">
        <strong>Example 3: Interaction</strong><br /><br />
        R3F supports pointer events:<br />
        • onPointerOver / onPointerOut<br />
        • onClick / onPointerDown<br />
        • onPointerMove<br /><br />
        <strong>Try it:</strong><br />
        • Hover → changes color<br />
        • Click → scales up/down<br /><br />
        Raycasting handled automatically!
      </div>

      <Canvas camera={{ position: [0, 0, 5] }}>
        <color attach="background" args={['#1a1a2e']} />
        
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        
        <InteractiveBox />
        
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default Example3_Interaction;
