import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 3, 8);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 5);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
scene.add(ambientLight);

const geometries = [
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.SphereGeometry(0.6, 32, 32),
  new THREE.ConeGeometry(0.6, 1.2, 32),
  new THREE.CylinderGeometry(0.5, 0.5, 1, 32),
  new THREE.TorusGeometry(0.5, 0.2, 16, 100),
  new THREE.TorusKnotGeometry(0.5, 0.15, 100, 16),
  new THREE.DodecahedronGeometry(0.6),
  new THREE.OctahedronGeometry(0.6),
  new THREE.IcosahedronGeometry(0.6)
];

const materials = [
  new THREE.MeshStandardMaterial({ color: 0xff6b6b, roughness: 0.3, metalness: 0.5 }),
  new THREE.MeshStandardMaterial({ color: 0x4ecdc4, roughness: 0.7, metalness: 0.1 }),
  new THREE.MeshStandardMaterial({ color: 0xffe66d, roughness: 0.5, metalness: 0.8 }),
  new THREE.MeshPhongMaterial({ color: 0x95e1d3, shininess: 100 }),
  new THREE.MeshPhongMaterial({ color: 0xf38181, shininess: 30 }),
  new THREE.MeshPhongMaterial({ color: 0xaa96da, shininess: 60 }),
  new THREE.MeshLambertMaterial({ color: 0xfcbad3 }),
  new THREE.MeshLambertMaterial({ color: 0xa8e6cf }),
  new THREE.MeshLambertMaterial({ color: 0xffd3b6 })
];

const meshes = [];
let index = 0;

for (let row = 0; row < 3; row++) {
  for (let col = 0; col < 3; col++) {
    const mesh = new THREE.Mesh(geometries[index], materials[index]);
    mesh.position.set(
      (col - 1) * 2.5,
      (1 - row) * 2.5,
      0
    );
    scene.add(mesh);
    meshes.push(mesh);
    index++;
  }
}

function animate() {
  meshes.forEach((mesh, i) => {
    mesh.rotation.x += 0.005 * (i + 1);
    mesh.rotation.y += 0.01 * (i + 1);
  });

  controls.update();
  renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});