import VanillaScene from './VanillaScene';
import R3FScene from './R3FScene';

function ComparisonView() {
  return (
    <div className="comparison-container">
      <div className="comparison-side vanilla">
        <div className="comparison-label">Vanilla Three.js</div>
        <VanillaScene />
        <div className="code-display">
          <pre>{`// ~80 lines of code
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(...);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(...);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial();
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.x += 0.01;
  renderer.render(scene, camera);
}
animate();`}</pre>
        </div>
      </div>

      <div className="comparison-side r3f">
        <div className="comparison-label">React Three Fiber</div>
        <R3FScene />
        <div className="code-display">
          <pre>{`// ~20 lines of code
<Canvas>
  <mesh>
    <boxGeometry />
    <meshStandardMaterial />
  </mesh>
  
  <OrbitControls />
</Canvas>

// Animation with hooks
function Box() {
  useFrame((state, delta) => {
    meshRef.current.rotation.x += 0.01;
  });
  
  return (
    <mesh ref={meshRef}>
      <boxGeometry />
      <meshStandardMaterial />
    </mesh>
  );
}`}</pre>
        </div>
      </div>
    </div>
  );
}

export default ComparisonView;
