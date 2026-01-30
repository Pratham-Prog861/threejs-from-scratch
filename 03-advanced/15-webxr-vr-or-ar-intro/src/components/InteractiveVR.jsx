import { useState } from 'react';
import { Interactive } from '@react-three/xr';
import { Text } from '@react-three/drei';

function InteractiveBox({ position, initialColor, label }) {
  const [color, setColor] = useState(initialColor);
  const [hovered, setHovered] = useState(false);
  const [clicks, setClicks] = useState(0);

  const colors = ['#ff6b6b', '#4ecdc4', '#95e1d3', '#f38181', '#aa96da', '#fcbf49'];
  
  const changeColor = () => {
    const newColor = colors[Math.floor(Math.random() * colors.length)];
    setColor(newColor);
    setClicks(clicks + 1);
  };

  return (
    <group position={position}>
      <Interactive
        onSelect={changeColor}
        onHover={() => setHovered(true)}
        onBlur={() => setHovered(false)}
      >
        <mesh scale={hovered ? 1.15 : 1} castShadow>
          <boxGeometry args={[0.8, 0.8, 0.8]} />
          <meshStandardMaterial 
            color={color} 
            emissive={hovered ? color : '#000000'}
            emissiveIntensity={hovered ? 0.4 : 0}
            metalness={0.3}
            roughness={0.5}
          />
        </mesh>
      </Interactive>
      
      {/* Label */}
      <Text
        position={[0, -0.6, 0]}
        fontSize={0.15}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {clicks > 0 ? `Clicks: ${clicks}` : label}
      </Text>
    </group>
  );
}

function InteractiveVR() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <pointLight position={[-5, 3, -5]} intensity={0.5} color="#4444ff" />
      <pointLight position={[5, 3, 5]} intensity={0.5} color="#ff4444" />

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.8} />
      </mesh>

      {/* Grid */}
      <gridHelper args={[20, 20, '#444444', '#222222']} position={[0, 0.01, 0]} />

      {/* Interactive boxes grid */}
      <InteractiveBox position={[-1.5, 1.5, -2]} initialColor="#ff6b6b" label="Box 1" />
      <InteractiveBox position={[0, 1.5, -2]} initialColor="#4ecdc4" label="Box 2" />
      <InteractiveBox position={[1.5, 1.5, -2]} initialColor="#95e1d3" label="Box 3" />

      <InteractiveBox position={[-1.5, 0.5, -2]} initialColor="#f38181" label="Box 4" />
      <InteractiveBox position={[0, 0.5, -2]} initialColor="#aa96da" label="Box 5" />
      <InteractiveBox position={[1.5, 0.5, -2]} initialColor="#fcbf49" label="Box 6" />

      {/* Instructions */}
      <Text
        position={[0, 2.8, -2]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
        maxWidth={4}
      >
        Point and Select to Change Colors!
      </Text>

      <Text
        position={[0, 2.5, -2]}
        fontSize={0.12}
        color="#aaaaaa"
        anchorX="center"
        anchorY="middle"
      >
        (Use VR controller trigger button)
      </Text>
    </>
  );
}

export default InteractiveVR;
