import { useState } from "react";
import Example1_VRBasic from "./examples/Example1_VRBasic";
import Example2_VRInteractive from "./examples/Example2_VRInteractive";
import Example3_VRControllers from "./examples/Example3_VRControllers";
import Example4_AR from "./examples/Example4_AR";
import "./index.css";

function App() {
  const [activeTab, setActiveTab] = useState("basic-vr");

  return (
    <>
      <div className="info">
        <h1>WebXR Masterclass</h1>

        <section>
          <h2>Core Concept</h2>
          <p>
            The standard for immersive 3D web experiences, bridging the gap
            between desktop and spatial computing.
          </p>
        </section>

        <section>
          <h2>Key Features</h2>
          <ul>
            <li>6DoF Positional Tracking</li>
            <li>Controller & Hand Models</li>
            <li>Markerless AR Placement</li>
            <li>Low Latency Rendering</li>
          </ul>
        </section>

        <section>
          <h2>Requirements</h2>
          <p>
            • Meta Quest / Vision Pro
            <br />• Android ARCore Browser
            <br />• WebXR Emulator (Desktop)
          </p>
        </section>
      </div>

      <nav className="tabs">
        <button
          className={activeTab === "basic-vr" ? "active" : ""}
          onClick={() => setActiveTab("basic-vr")}
        >
          <span>01.</span> Immersive Scene
        </button>
        <button
          className={activeTab === "interactive-vr" ? "active" : ""}
          onClick={() => setActiveTab("interactive-vr")}
        >
          <span>02.</span> Spatial Input
        </button>
        <button
          className={activeTab === "controllers" ? "active" : ""}
          onClick={() => setActiveTab("controllers")}
        >
          <span>03.</span> Tracking Models
        </button>
        <button
          className={activeTab === "ar" ? "active" : ""}
          onClick={() => setActiveTab("ar")}
        >
          <span>04.</span> Augmented Reality
        </button>
      </nav>

      <div className="canvas-container">
        {activeTab === "basic-vr" && <Example1_VRBasic />}
        {activeTab === "interactive-vr" && <Example2_VRInteractive />}
        {activeTab === "controllers" && <Example3_VRControllers />}
        {activeTab === "ar" && <Example4_AR />}
      </div>
    </>
  );
}

export default App;
