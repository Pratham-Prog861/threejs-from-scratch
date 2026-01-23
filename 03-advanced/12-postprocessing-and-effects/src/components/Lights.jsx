function Lights() {
  return (
    <>
      <ambientLight intensity={0.2} />
      
      <directionalLight
        position={[5, 8, 3]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      <pointLight position={[-5, 3, -5]} intensity={0.8} color="#4444ff" />
      <pointLight position={[5, 3, 5]} intensity={0.8} color="#ff4444" />
    </>
  );
}

export default Lights;
