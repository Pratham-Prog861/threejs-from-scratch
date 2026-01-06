import { Canvas } from "@react-three/fiber";
import Scene from "./components/Scene";

function App() {
  return (
    <>
      <div className="info">
        <strong>Textures & Environment Maps</strong>
        <br />
        <br />
        <strong>Wood Box:</strong> Color + Normal + Roughness maps
        <br />
        <strong>Concrete Sphere:</strong> Full PBR textures
        <br />
        <strong>Metal Cylinder:</strong> Metallic workflow
        <br />
        <br />
        Left: Rotate | Right: Pan | Scroll: Zoom
      </div>
      <Canvas camera={{ position: [5, 3, 8], fov: 50 }} shadows>
        <Scene />
      </Canvas>
    </>
  );
}

export default App;
