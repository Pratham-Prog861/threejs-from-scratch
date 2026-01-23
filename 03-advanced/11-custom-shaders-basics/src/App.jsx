import { Canvas } from '@react-three/fiber';
import Scene from './components/Scene';
import './index.css';

function App() {
  return (
    <>
      <div className="info">
        <strong>Custom Shaders Basics</strong><br /><br />
        <strong>Left:</strong> Gradient sphere (fragment shader)<br />
        <strong>Center:</strong> Wave plane (vertex shader)<br />
        <strong>Right:</strong> Animated cube (both shaders)<br /><br />
        <em>Concepts covered:</em><br />
        • ShaderMaterial basics<br />
        • Vertex & Fragment shaders<br />
        • Uniforms (passing data to shaders)<br />
        • Varyings (vertex → fragment)<br />
        • Time-based animations<br />
        • UV coordinates<br />
        • Position manipulation<br /><br />
        Written in GLSL (OpenGL Shading Language)
      </div>
      <Canvas
        camera={{ position: [0, 2, 8], fov: 50 }}
      >
        <Scene />
      </Canvas>
    </>
  );
}

export default App;
