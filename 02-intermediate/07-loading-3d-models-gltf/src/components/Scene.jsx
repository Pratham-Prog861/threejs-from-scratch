import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import Astronaut from "./Astronaut";
import Robot from "./Robot";
import Car from "./Car";
import Ground from "./Ground";
import Lights from "./Lights";

function Scene() {
  return (
    <>
      <color attach="background" args={["#1a1a2e"]} />

      <Lights />

      <Astronaut position={[-7, 0, 0]} scale={0.4} />
      <Robot position={[-2, 0, 0]} scale={0.9} />

      <Car position={[4, 0, -2]} rotation={[0, Math.PI / 4, 0]} scale={0.6} />
      <Car position={[6, 0, 1]} rotation={[0, -Math.PI / 6, 0]} scale={0.6} />
      <Car position={[5, 0, 3]} rotation={[0, Math.PI / 2, 0]} scale={0.6} />

      <Ground />

      <ContactShadows
        position={[0, 0.01, 0]}
        opacity={0.5}
        scale={30}
        blur={2}
        far={10}
      />

      <Environment preset="city" background={false} />

      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        minDistance={5}
        maxDistance={25}
        maxPolarAngle={Math.PI / 2}
      />
    </>
  );
}

export default Scene;
