import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1a1a2e);

const aspect = window.innerWidth / window.innerHeight;

const perspectiveCamera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
perspectiveCamera.position.set(5, 5, 5);
perspectiveCamera.lookAt(0, 0, 0);

const frustumSize = 10;
const orthographicCamera = new THREE.OrthographicCamera(
  frustumSize * aspect / -2,
  frustumSize * aspect / 2,
  frustumSize / 2,
  frustumSize / -2,
  0.1,
  1000
);
orthographicCamera.position.set(5, 5, 5);
orthographicCamera.lookAt(0, 0, 0);

let activeCamera = perspectiveCamera;
let isPerspective = true;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const perspectiveControls = new OrbitControls(perspectiveCamera, renderer.domElement);
perspectiveControls.enableDamping = true;
perspectiveControls.dampingFactor = 0.05;
perspectiveControls.minDistance = 3;
perspectiveControls.maxDistance = 15;
perspectiveControls.maxPolarAngle = Math.PI / 2;

const orthographicControls = new OrbitControls(orthographicCamera, renderer.domElement);
orthographicControls.enableDamping = true;
orthographicControls.dampingFactor = 0.05;
orthographicControls.minZoom = 0.5;
orthographicControls.maxZoom = 2;
orthographicControls.enabled = false;

const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 5);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
scene.add(directionalLight);

const gridHelper = new THREE.GridHelper(20, 20, 0x888888, 0x444444);
scene.add(gridHelper);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const planeGeometry = new THREE.PlaneGeometry(20, 20);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x2d2d2d });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -0.01;
plane.receiveShadow = true;
scene.add(plane);

const geometries = [
  { geometry: new THREE.BoxGeometry(1, 1, 1), color: 0xff6b6b, position: [-3, 0.5, -3] },
  { geometry: new THREE.SphereGeometry(0.6, 32, 32), color: 0x4ecdc4, position: [0, 0.6, -3] },
  { geometry: new THREE.ConeGeometry(0.6, 1.5, 32), color: 0xffe66d, position: [3, 0.75, -3] },
  { geometry: new THREE.CylinderGeometry(0.5, 0.5, 1.5, 32), color: 0x95e1d3, position: [-3, 0.75, 0] },
  { geometry: new THREE.TorusGeometry(0.5, 0.2, 16, 100), color: 0xf38181, position: [0, 0.5, 0] },
  { geometry: new THREE.TorusKnotGeometry(0.5, 0.15, 100, 16), color: 0xaa96da, position: [3, 0.5, 0] },
  { geometry: new THREE.DodecahedronGeometry(0.6), color: 0xfcbad3, position: [-3, 0.6, 3] },
  { geometry: new THREE.OctahedronGeometry(0.6), color: 0xa8e6cf, position: [0, 0.6, 3] },
  { geometry: new THREE.IcosahedronGeometry(0.6), color: 0xffd3b6, position: [3, 0.6, 3] }
];

const meshes = [];
geometries.forEach(({ geometry, color, position }) => {
  const material = new THREE.MeshStandardMaterial({ color, roughness: 0.4, metalness: 0.3 });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(...position);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  scene.add(mesh);
  meshes.push(mesh);
});

const infoDiv = document.createElement('div');
infoDiv.style.position = 'absolute';
infoDiv.style.top = '20px';
infoDiv.style.left = '20px';
infoDiv.style.color = 'white';
infoDiv.style.fontFamily = 'monospace';
infoDiv.style.fontSize = '16px';
infoDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
infoDiv.style.padding = '15px';
infoDiv.style.borderRadius = '8px';
infoDiv.innerHTML = `
  <strong>Current Camera: PerspectiveCamera</strong><br>
  Press <strong>C</strong> to toggle camera type<br><br>
  <strong>OrbitControls:</strong><br>
  • Left Click + Drag: Rotate<br>
  • Right Click + Drag: Pan<br>
  • Scroll: Zoom<br><br>
  <strong>PerspectiveCamera:</strong> Objects farther away appear smaller (realistic)<br>
  <strong>OrthographicCamera:</strong> All objects same size regardless of distance
`;
document.body.appendChild(infoDiv);

function toggleCamera() {
  isPerspective = !isPerspective;
  
  if (isPerspective) {
    activeCamera = perspectiveCamera;
    perspectiveControls.enabled = true;
    orthographicControls.enabled = false;
    perspectiveCamera.position.copy(orthographicCamera.position);
    perspectiveControls.target.copy(orthographicControls.target);
    infoDiv.innerHTML = infoDiv.innerHTML.replace('OrthographicCamera', 'PerspectiveCamera');
  } else {
    activeCamera = orthographicCamera;
    orthographicControls.enabled = true;
    perspectiveControls.enabled = false;
    orthographicCamera.position.copy(perspectiveCamera.position);
    orthographicControls.target.copy(perspectiveControls.target);
    infoDiv.innerHTML = infoDiv.innerHTML.replace('PerspectiveCamera', 'OrthographicCamera');
  }
}

window.addEventListener('keydown', (event) => {
  if (event.key === 'c' || event.key === 'C') {
    toggleCamera();
  }
});

function animate() {
  requestAnimationFrame(animate);

  meshes.forEach((mesh, i) => {
    mesh.rotation.x += 0.005 * (i % 3 + 1);
    mesh.rotation.y += 0.01 * (i % 3 + 1);
  });

  perspectiveControls.update();
  orthographicControls.update();

  renderer.render(scene, activeCamera);
}

animate();

window.addEventListener('resize', () => {
  const aspect = window.innerWidth / window.innerHeight;
  
  perspectiveCamera.aspect = aspect;
  perspectiveCamera.updateProjectionMatrix();
  
  orthographicCamera.left = frustumSize * aspect / -2;
  orthographicCamera.right = frustumSize * aspect / 2;
  orthographicCamera.top = frustumSize / 2;
  orthographicCamera.bottom = frustumSize / -2;
  orthographicCamera.updateProjectionMatrix();
  
  renderer.setSize(window.innerWidth, window.innerHeight);
});
