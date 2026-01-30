import { Canvas } from "@react-three/fiber";
import { ARButton, XR, createXRStore, XROrigin } from "@react-three/xr";
import { useState, Suspense } from "react";

const store = createXRStore();

function ARObject({ position }) {
  const [scale, setScale] = useState(1);

  return (
    <mesh
      position={position}
      scale={scale}
      onClick={() => setScale(scale === 1 ? 1.5 : 1)}
      castShadow
    >
      <boxGeometry args={[0.3, 0.3, 0.3]} />
      <meshStandardMaterial
        color="#00f2ff"
        roughness={0.1}
        metalness={1}
        emissive="#00f2ff"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

function ARScene() {
  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />

      {/* AR objects placed in real world */}
      <ARObject position={[0, 0, -0.5]} />

      <mesh position={[0.4, 0, -0.5]} castShadow>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial
          color="#7000ff"
          roughness={0.1}
          metalness={1}
          emissive="#7000ff"
          emissiveIntensity={0.2}
        />
      </mesh>

      <mesh position={[-0.4, 0.1, -0.5]} castShadow>
        <torusGeometry args={[0.1, 0.04, 16, 100]} />
        <meshStandardMaterial
          color="#00ffaa"
          roughness={0.1}
          metalness={1}
          emissive="#00ffaa"
          emissiveIntensity={0.2}
        />
      </mesh>
    </>
  );
}

function Example4_AR() {
  return (
    <>
      <div className="example-info">
        <h3>Augmented Reality</h3>
        <p>
          Overlaying high-fidelity digital assets onto the{" "}
          <b>Physical Environment</b>.
        </p>
        <br />
        <section>
          <h2>Capabilities</h2>
          <ul>
            <li>Markerless Hit-Testing</li>
            <li>Real-world Scale</li>
            <li>Light Estimation</li>
          </ul>
        </section>
      </div>

      <ARButton
        store={store}
        sessionInit={{
          requiredFeatures: ["hit-test"],
          optionalFeatures: ["dom-overlay"],
        }}
      />
      <Canvas shadows>
        <XR store={store}>
          <Suspense fallback={null}>
            <XROrigin />
            <ARScene />
          </Suspense>
        </XR>
      </Canvas>
    </>
  );
}

export default Example4_AR;
