import { ScrollControls, Scroll } from "@react-three/drei";
import Scene from "./Scene";
import FloatingCubes from "./FloatingCubes";
import Overlay from "./Overlay";

function ScrollScene() {
  return (
    <ScrollControls pages={4} damping={0.1}>

      <Scene />

      <Scroll>
        <FloatingCubes />
      </Scroll>

      <Scroll html>
        <Overlay />
      </Scroll>
    </ScrollControls>
  );
}

export default ScrollScene;
