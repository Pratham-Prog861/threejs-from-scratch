import { Canvas } from "@react-three/fiber";
import { VRButton, XR, createXRStore, XROrigin } from "@react-three/xr";
import { OrbitControls, Sky, Environment } from "@react-three/drei";
import { Suspense } from "react";

const store = createXRStore();

function BasicScene() {
  return (
    <>
      <Suspense fallback={null}>
        <Sky sunPosition={[100, 20, 100]} />
        <Environment preset="sunset" />
      </Suspense>

      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#111111" />
      </mesh>

      {/* Shapes */}
      <mesh position={[-2, 1, -3]} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#ff6b6b" />
      </mesh>

      <mesh position={[2, 1, -3]} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#4ecdc4" />
      </mesh>

      <mesh position={[0, 1, -5]} castShadow>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color="#95e1d3" />
      </mesh>
    </>
  );
}

function Example1_VRBasic() {
  return (
    <>
      <div className="example-info">
        <h3>Immersive Scene</h3>
        <p>
          A basic WebXR implementation using the <b>&lt;XR /&gt;</b> provider.
        </p>
        <br />
        <section>
          <h2>Experience</h2>
          <ul>
            <li>360° Positional Audio Support</li>
            <li>Stereoscopic Depth</li>
            <li>Horizon Locked Camera</li>
          </ul>
        </section>
      </div>

      <VRButton store={store} />
      <Canvas shadows camera={{ position: [0, 1.6, 2] }}>
        <XR store={store}>
          <Suspense fallback={null}>
            <XROrigin />
            <BasicScene />
          </Suspense>
        </XR>
        <OrbitControls />
      </Canvas>
    </>
  );
}

export default Example1_VRBasic;
