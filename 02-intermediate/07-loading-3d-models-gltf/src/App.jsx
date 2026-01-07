import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Html } from "@react-three/drei";
import Scene from "./components/Scene";

function Loader() {
  return (
    <Html center>
      <div
        style={{
          color: "white",
          fontSize: "24px",
          fontFamily: "monospace",
        }}
      >
        Loading Models...
      </div>
    </Html>
  );
}

function App() {
  return (
    <>
      <div className="info">
        <strong>Loading 3D Models (GLTF/GLB)</strong>
        <br />
        <br />
        <strong>Astronaut:</strong> Basic model loading
        <br />
        <strong>Robot:</strong> Accessing nodes & materials
        <br />
        <strong>Cars:</strong> Multiple instances with clone()
        <br />
        <br />
        Models loaded with useGLTF hook from Drei
        <br />
        Suspense handles loading states
        <br />
        <br />
        Left: Rotate | Right: Pan | Scroll: Zoom
      </div>
      <Canvas camera={{ position: [8, 5, 12], fov: 50 }} shadows>
        <Suspense fallback={<Loader />}>
          <Scene />
        </Suspense>
      </Canvas>
    </>
  );
}

export default App;
