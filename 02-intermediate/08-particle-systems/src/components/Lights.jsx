function Lights() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 10, 5]} intensity={0.5} />
      <pointLight position={[-6, 2, 0]} intensity={1.5} color="#ff6600" distance={5} />
    </>
  );
}

export default Lights;
