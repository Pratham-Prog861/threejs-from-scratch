import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { Suspense, useState } from "react";
import { PerformanceMonitor, Stats } from "@react-three/drei";
import Scene from "./components/Scene";
import "./index.css";

function App() {
  const [dpr, setDpr] = useState(1.5);

  return (
    <>
      <Leva />
      <div className="info">
        <strong>Performance & Optimization</strong>
        <br />
        <br />
        <strong>Press H</strong> to toggle controls
        <br />
        <br />
        <em>Optimization techniques:</em>
        <br />
        • InstancedMesh (100K+ objects)
        <br />
        • Drei Instances (declarative API)
        <br />
        • Frustum Culling (automatic)
        <br />
        • LOD (Level of Detail)
        <br />
        • PerformanceMonitor (adaptive)
        <br />
        • DPR scaling
        <br />
        • Geometry/Material reuse
        <br />
        <br />
        <strong>Stats:</strong> Top-left shows FPS
      </div>
      <Canvas
        camera={{ position: [0, 50, 100], fov: 50 }}
        dpr={[1, dpr]} // Adaptive pixel ratio
        performance={{ min: 0.5 }} // Allow quality reduction
      >
        <Suspense fallback={null}>
          <PerformanceMonitor
            onIncline={() => setDpr(2)}
            onDecline={() => setDpr(1)}
          />
          <Scene />
        </Suspense>
        <Stats />
      </Canvas>
    </>
  );
}

export default App;
