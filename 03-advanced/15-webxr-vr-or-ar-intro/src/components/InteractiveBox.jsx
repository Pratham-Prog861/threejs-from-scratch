import { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Interactive } from '@react-three/xr';
import { Text } from '@react-three/drei';

function InteractiveBox({ position, initialColor = '#ff6b6b', label = 'Box' }) {
  const [color, setColor] = useState(initialColor);
  const [hovered, setHovered] = useState(false);
  const [selected, setSelected] = useState(false);
  const [clicks, setClicks] = useState(0);
  const meshRef = useRef();

  const colors = [
    '#ff6b6b', '#4ecdc4', '#95e1d3', 
    '#f38181', '#aa96da', '#fcbf49',
    '#ff85a1', '#89cff0', '#a8e6cf'
  ];
  
  useFrame((state) => {
    if (meshRef.current && selected) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 2;
    }
  });

  const handleSelect = () => {
    const newColor = colors[Math.floor(Math.random() * colors.length)];
    setColor(newColor);
    setClicks(clicks + 1);
    setSelected(!selected);
  };

  const handleSqueeze = () => {
    setColor(initialColor);
    setClicks(0);
    setSelected(false);
  };

  return (
    <group position={position}>
      <Interactive
        onSelect={handleSelect}
        onSqueeze={handleSqueeze}
        onHover={() => setHovered(true)}
        onBlur={() => setHovered(false)}
      >
        <mesh 
          ref={meshRef}
          scale={hovered ? 1.2 : 1} 
          castShadow
        >
          <boxGeometry args={[0.8, 0.8, 0.8]} />
          <meshStandardMaterial 
            color={color} 
            emissive={hovered ? color : '#000000'}
            emissiveIntensity={hovered ? 0.5 : 0}
            metalness={selected ? 0.8 : 0.3}
            roughness={selected ? 0.2 : 0.5}
          />
        </mesh>
      </Interactive>
      
      {/* Hover indicator ring */}
      {hovered && (
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
          <ringGeometry args={[0.5, 0.6, 32]} />
          <meshBasicMaterial color={color} opacity={0.5} transparent />
        </mesh>
      )}

      {/* Label */}
      <Text
        position={[0, -0.7, 0]}
        fontSize={0.12}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>

      {/* Click counter */}
      {clicks > 0 && (
        <Text
          position={[0, -0.9, 0]}
          fontSize={0.1}
          color="#aaaaaa"
          anchorX="center"
          anchorY="middle"
        >
          Clicks: {clicks}
        </Text>
      )}

      {/* Selection indicator */}
      {selected && (
        <mesh position={[0, 0.6, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial 
            color="#00ff00"
            emissive="#00ff00"
            emissiveIntensity={1}
            toneMapped={false}
          />
        </mesh>
      )}
    </group>
  );
}

export default InteractiveBox;
