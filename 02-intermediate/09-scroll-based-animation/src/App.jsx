import { Canvas } from "@react-three/fiber";
import ScrollScene from "./components/ScrollScene";
import "./index.css";

function App() {
  return (
    <div className="app">
      <Canvas
        shadows
        camera={{ position: [0, 0, 8], fov: 42 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <ScrollScene />
      </Canvas>
    </div>
  );
}

export default App;
