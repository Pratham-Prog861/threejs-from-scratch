import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import Scene from "./components/Scene";
import EffectsToggle from "./components/EffectsToggle";
import "./index.css";

function App() {
  const [effectsEnabled, setEffectsEnabled] = useState(true);

  return (
    <>
      <Leva collapsed />
      <EffectsToggle onToggle={setEffectsEnabled} />
      <div className="info">
        <strong>Post-Processing & Effects</strong>
        <br />
        <br />
        <strong>Press H</strong> to toggle Leva controls
        <br />
        <br />
        <em>Effects available:</em>
        <br />
        • Bloom (glow effect)
        <br />
        • Chromatic Aberration (color separation)
        <br />
        • Vignette (dark edges)
        <br />
        • FXAA (anti-aliasing)
        <br />
        • Glitch (digital corruption)
        <br />
        • Noise (film grain)
        <br />
        • Depth of Field (blur)
        <br />
        • ToneMapping (HDR)
        <br />
        <br />
        Toggle effects using the controls panel
      </div>
      <Canvas
        camera={{ position: [0, 2, 8], fov: 50 }}
        gl={{
          antialias: false, // Disable native AA, use FXAA instead
        }}
      >
        <Scene effectsEnabled={effectsEnabled} />
      </Canvas>
    </>
  );
}

export default App;
