function Lights() {
  return (
    <>
      <ambientLight intensity={0.3} />
      
      <directionalLight
        position={[5, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      
      <pointLight position={[-5, 5, -5]} intensity={0.5} color="#4444ff" />
    </>
  );
}

export default Lights;
