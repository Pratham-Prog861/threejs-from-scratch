function Lights() {
  return (
    <>
      <ambientLight intensity={0.4} />
      
      <directionalLight
        position={[50, 50, 30]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-100}
        shadow-camera-right={100}
        shadow-camera-top={100}
        shadow-camera-bottom={-100}
      />
    </>
  );
}

export default Lights;
