import { Canvas } from '@react-three/fiber';
import Scene from './components/Scene';
import './index.css'

function App() {
  return (
    <>
      <div className="info">
        <strong>Basic Physics with Rapier</strong><br /><br />
        <strong>Click</strong> to spawn falling cubes<br />
        <strong>Drag</strong> the red sphere around<br /><br />
        <em>Physics concepts:</em><br />
        • Rigid bodies (dynamic, static, kinematic)<br />
        • Gravity & forces<br />
        • Collisions & restitution (bounciness)<br />
        • Friction<br />
        • Mass & density<br /><br />
        Built with Rapier (WebAssembly physics engine)
      </div>
      <Canvas
        camera={{ position: [8, 8, 8], fov: 50 }}
        shadows
      >
        <Scene />
      </Canvas>
    </>
  );
}

export default App;
