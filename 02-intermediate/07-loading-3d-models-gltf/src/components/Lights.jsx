function Lights() {
  return (
    <>
      <ambientLight intensity={0.4} />
      
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      
      <spotLight
        position={[-10, 15, -5]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
        castShadow
        color="#4444ff"
      />
    </>
  );
}

export default Lights;
