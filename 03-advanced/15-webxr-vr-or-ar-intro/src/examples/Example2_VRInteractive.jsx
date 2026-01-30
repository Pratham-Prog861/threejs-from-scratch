import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { VRButton, XR, useXR, createXRStore, XROrigin } from "@react-three/xr";
import { OrbitControls, Environment, Text } from "@react-three/drei";

const store = createXRStore();

function InteractiveBox({ position, initialColor }) {
  const [color, setColor] = useState(initialColor);
  const [hovered, setHovered] = useState(false);

  const colors = ["#00f2ff", "#7000ff", "#ff007a", "#00ffaa", "#ffea00"];

  const changeColor = () => {
    const newColor = colors[Math.floor(Math.random() * colors.length)];
    setColor(newColor);
  };

  return (
    <mesh
      position={position}
      scale={hovered ? 1.1 : 1}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={changeColor}
      castShadow
    >
      <boxGeometry args={[0.8, 0.8, 0.8]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={hovered ? 0.6 : 0.15}
        roughness={0.1}
        metalness={0.9}
      />
    </mesh>
  );
}

function InteractiveScene() {
  const isPresenting = useXR((state) => state.session !== null);

  return (
    <>
      <Suspense fallback={null}>
        <Environment preset="night" />
      </Suspense>

      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={2} castShadow />

      {/* Floor */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.5, 0]}
        receiveShadow
      >
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#050505" roughness={0.5} metalness={0.5} />
      </mesh>

      {/* Interactive boxes */}
      <InteractiveBox position={[-1.5, 1.5, -2]} initialColor="#00f2ff" />
      <InteractiveBox position={[0, 1.5, -2]} initialColor="#7000ff" />
      <InteractiveBox position={[1.5, 1.5, -2]} initialColor="#00ffaa" />

      <InteractiveBox position={[-1.5, 0.7, -2]} initialColor="#ff007a" />
      <InteractiveBox position={[0, 0.7, -2]} initialColor="#ffea00" />
      <InteractiveBox position={[1.5, 0.7, -2]} initialColor="#ff5500" />

      {/* Instruction text */}
      <Text
        position={[0, 2.8, -2.5]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {isPresenting ? "Interact with Spatial Pointers" : "Spatial Input Mode"}
      </Text>
    </>
  );
}

function Example2_VRInteractive() {
  return (
    <>
      <div className="example-info">
        <h3>Spatial Input</h3>
        <p>
          Direct interaction with 3D objects using <b>Spatial Pointers</b>.
        </p>
        <br />
        <section>
          <h2>Features</h2>
          <ul>
            <li>Raycast Selection</li>
            <li>Haptic Feedback (Auto)</li>
            <li>Hover State Management</li>
          </ul>
        </section>
      </div>

      <VRButton store={store} />
      <Canvas shadows camera={{ position: [0, 1.6, 2.5] }}>
        <XR store={store}>
          <Suspense fallback={null}>
            <XROrigin />
            <InteractiveScene />
          </Suspense>
        </XR>
        <OrbitControls />
      </Canvas>
    </>
  );
}

export default Example2_VRInteractive;
