import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll, Environment, PerspectiveCamera } from "@react-three/drei";
import Robot from "./Robot";
import * as THREE from "three";

function Scene() {
  const cameraRef = useRef();
  const robotRef = useRef();
  const data = useScroll();

  const cameraPositions = [
    { position: [0, 0, 10], lookAt: [0, 0, 0] },
    { position: [0, 0, 10], lookAt: [0, 0, 0] },
    { position: [0, 0, 10], lookAt: [0, 0, 0] },
    { position: [0, 0, 10], lookAt: [0, 0, 0] },
  ];

  const robotPositions = [
    { position: [3, -1, 0], rotation: -0.5 },
    { position: [-4, -1, 0], rotation: 0.5 },
    { position: [4, -1, 0], rotation: -0.5 },
    { position: [0, -1, 0], rotation: 0 },
  ];

  useFrame(() => {
    if (!cameraRef.current || !robotRef.current) return;

    const offset = data.offset;
    const page = Math.floor(offset * 3);
    const pageProgress = (offset * 3) % 1;

    const currentCam = cameraPositions[page];
    const nextCam = cameraPositions[Math.min(page + 1, 3)];

    cameraRef.current.position.lerpVectors(
      new THREE.Vector3(...currentCam.position),
      new THREE.Vector3(...nextCam.position),
      pageProgress
    );

    const currentLookAt = new THREE.Vector3(...currentCam.lookAt);
    const nextLookAt = new THREE.Vector3(...nextCam.lookAt);
    currentLookAt.lerp(nextLookAt, pageProgress);
    cameraRef.current.lookAt(currentLookAt);

    const currentRobot = robotPositions[page];
    const nextRobot = robotPositions[Math.min(page + 1, 3)];

    robotRef.current.position.lerpVectors(
      new THREE.Vector3(...currentRobot.position),
      new THREE.Vector3(...nextRobot.position),
      pageProgress
    );

    robotRef.current.position.y += Math.sin(Date.now() * 0.001) * 0.1;

    robotRef.current.rotation.y = THREE.MathUtils.lerp(
      currentRobot.rotation + offset * Math.PI * 2,
      nextRobot.rotation + offset * Math.PI * 2,
      pageProgress
    );
  });

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[0, 0, 10]}
        fov={35}
      />

      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />
      <pointLight position={[-5, 3, -5]} intensity={1} color="#818cf8" />
      <pointLight position={[5, -3, 5]} intensity={1} color="#c084fc" />

      <Robot ref={robotRef} position={[0, -1, 0]} scale={0.8} />

      <Environment preset="city" background={false} />
    </>
  );
}

export default Scene;
