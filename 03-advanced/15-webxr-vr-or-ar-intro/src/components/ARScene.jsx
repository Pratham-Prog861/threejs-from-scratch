import { useState } from 'react';
import { Interactive } from '@react-three/xr';

function ARObject({ position }) {
  const [scale, setScale] = useState(1);
  const [color, setColor] = useState('#ff6b6b');

  const colors = ['#ff6b6b', '#4ecdc4', '#95e1d3', '#f38181', '#aa96da', '#fcbf49'];

  const handleSelect = () => {
    setScale(scale === 1 ? 1.5 : 1);
    const newColor = colors[Math.floor(Math.random() * colors.length)];
    setColor(newColor);
  };

  return (
    <Interactive onSelect={handleSelect}>
      <mesh position={position} scale={scale}>
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshStandardMaterial 
          color={color} 
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>
    </Interactive>
  );
}

function ARScene() {
  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-5, 3, -5]} intensity={0.5} color="#4444ff" />

      {/* Main interactive object */}
      <ARObject position={[0, 0, -0.5]} />
      
      {/* Additional objects */}
      <Interactive>
        <mesh position={[0.4, 0, -0.5]}>
          <sphereGeometry args={[0.15, 32, 32]} />
          <meshStandardMaterial 
            color="#4ecdc4" 
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>
      </Interactive>

      <Interactive>
        <mesh position={[-0.4, 0, -0.5]} rotation={[0, 0, 0]}>
          <torusGeometry args={[0.1, 0.05, 16, 100]} />
          <meshStandardMaterial 
            color="#95e1d3" 
            roughness={0.3}
            metalness={0.8}
          />
        </mesh>
      </Interactive>

      {/* Background decoration */}
      <mesh position={[0, -0.2, -0.5]}>
        <cylinderGeometry args={[0.05, 0.05, 0.4, 32]} />
        <meshStandardMaterial color="#555555" />
      </mesh>
    </>
  );
}

export default ARScene;
