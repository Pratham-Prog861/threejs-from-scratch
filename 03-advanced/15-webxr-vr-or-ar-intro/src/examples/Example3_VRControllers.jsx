import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { VRButton, XR, useXR, createXRStore, XROrigin } from "@react-three/xr";
import { OrbitControls, Environment, Text } from "@react-three/drei";

const store = createXRStore();

function ControllerVisuals() {
  const isPresenting = useXR((state) => state.session !== null);

  return (
    <>
      <Suspense fallback={null}>
        <Environment preset="night" />
      </Suspense>

      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={1.5} castShadow />

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#050505" roughness={0.8} />
      </mesh>

      {/* Reference objects */}
      <mesh position={[0, 1.2, -1.5]} castShadow>
        <torusKnotGeometry args={[0.4, 0.15, 128, 32]} />
        <meshStandardMaterial
          color="#00f2ff"
          metalness={1}
          roughness={0.1}
          emissive="#00f2ff"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Instruction text */}
      <Text
        position={[0, 2.5, -2]}
        fontSize={0.15}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {isPresenting
          ? "HMD & Controller Tracking Active"
          : "Tracking Models Setup"}
      </Text>

      {/* Grid for spatial reference */}
      <gridHelper
        args={[20, 20, "#111111", "#222222"]}
        position={[0, 0.01, 0]}
      />
    </>
  );
}

function Example3_VRControllers() {
  return (
    <>
      <div className="example-info">
        <h3>Tracking Models</h3>
        <p>
          Real-time visualization of <b>Input Sources</b> inside the XR session.
        </p>
        <br />
        <section>
          <h2>Modules</h2>
          <ul>
            <li>Automatic Controller Mesh</li>
            <li>Dynamic Hand Tracking</li>
            <li>Skeleton Mapping</li>
          </ul>
        </section>
      </div>

      <VRButton store={store} />
      <Canvas shadows camera={{ position: [0, 1.6, 2.5] }}>
        <XR store={store}>
          <Suspense fallback={null}>
            <XROrigin />
            <ControllerVisuals />
          </Suspense>
        </XR>
        <OrbitControls />
      </Canvas>
    </>
  );
}

export default Example3_VRControllers;
