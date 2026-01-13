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
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
      />

      <pointLight position={[-5, 5, -5]} intensity={0.5} color="#4444ff" />
    </>
  );
}

export default Lights;
