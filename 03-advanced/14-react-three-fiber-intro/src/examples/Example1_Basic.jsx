import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function Example1_Basic() {
  return (
    <div className="canvas-container">
      <div className="example-info">
        <strong>Example 1: Basic Scene</strong><br /><br />
        This is the simplest R3F scene:<br />
        • &lt;Canvas&gt; creates scene, camera, renderer<br />
        • &lt;mesh&gt; is a 3D object<br />
        • &lt;boxGeometry&gt; defines shape<br />
        • &lt;meshStandardMaterial&gt; defines appearance<br /><br />
        No manual setup needed!
      </div>

      <Canvas camera={{ position: [0, 0, 5] }}>
        <color attach="background" args={['#1a1a2e']} />
        
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        
        <mesh>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color="hotpink" />
        </mesh>
        
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default Example1_Basic;
