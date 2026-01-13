import { Physics } from "@react-three/rapier";
import { OrbitControls } from "@react-three/drei";
import { useState } from "react";
import PhysicsGround from "./PhysicsGround";
import FallingCubes from "./FallingCubes";
import InteractiveSphere from "./InteractiveSphere";
import Walls from "./Walls";
import Lights from "./Lights";

function Scene() {
  const [cubes, setCubes] = useState([]);

  const handleClick = () => {
    const newCube = {
      id: Date.now(),
      position: [
        (Math.random() - 0.5) * 6,
        8 + Math.random() * 3,
        (Math.random() - 0.5) * 6,
      ],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      ],
      scale: Math.random() * 0.5 + 0.5,
      color: `hsl(${Math.random() * 360}, 70%, 60%)`,
    };
    setCubes((prev) => [...prev, newCube]);
  };

  return (
    <>
      <color attach="background" args={["#1a1a2e"]} />

      <Lights />

      <Physics gravity={[0, -9.81, 0]}>
        <PhysicsGround onClick={handleClick} />
        <Walls />
        <FallingCubes cubes={cubes} />
        <InteractiveSphere position={[0, 3, 0]} />
      </Physics>

      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        minDistance={5}
        maxDistance={30}
      />
    </>
  );
}

export default Scene;
