function Lights() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
      <pointLight position={[-5, 3, -5]} intensity={0.5} color="#4444ff" />
    </>
  );
}

export default Lights;
