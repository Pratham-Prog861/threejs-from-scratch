import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Scene from "./components/Scene";

function App() {
  return (
    <>
      <div className="info">
        <h1>Particle Systems</h1>

        <strong>Effects Demo</strong>
        <ul>
          <li>
            <span style={{ color: "#ff5500" }}>Fire:</span> Rising additive
            blend
          </li>
          <li>
            <span style={{ color: "#aaaaaa" }}>Smoke:</span> Fading alpha &
            scale
          </li>
          <li>
            <span style={{ color: "#ffff88" }}>Sparkles:</span> Random
            oscillation
          </li>
          <li>
            <span style={{ color: "#ffffff" }}>Snow:</span> Gravity & wind
            simulation
          </li>
        </ul>

        <strong>Key Techniques</strong>
        <ul>
          <li>BufferGeometry (High Perf)</li>
          <li>PointsMaterial & Alpha Maps</li>
          <li>Shader-like Math in JS</li>
        </ul>

        <div className="controls">Left Click: Rotate • Scroll: Zoom</div>
      </div>
      <Canvas
        camera={{ position: [0, 5, 15], fov: 60 }}
        style={{ background: "#050505" }} // Darker background for better contrast
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </>
  );
}

export default App;
