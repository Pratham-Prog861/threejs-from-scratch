import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1a1a2e);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(8, 6, 8);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const planeGeometry = new THREE.PlaneGeometry(20, 20);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.position.y = 0;
plane.receiveShadow = true;
scene.add(plane);

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xff6b6b });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(-3, 1, 0);
sphere.castShadow = true;
sphere.receiveShadow = true;
scene.add(sphere);

const boxGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
const boxMaterial = new THREE.MeshStandardMaterial({ color: 0x4ecdc4 });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.position.set(0, 0.75, 0);
box.castShadow = true;
box.receiveShadow = true;
scene.add(box);

const coneGeometry = new THREE.ConeGeometry(1, 2, 32);
const coneMaterial = new THREE.MeshStandardMaterial({ color: 0xffe66d });
const cone = new THREE.Mesh(coneGeometry, coneMaterial);
cone.position.set(3, 1, 0);
cone.castShadow = true;
cone.receiveShadow = true;
scene.add(cone);

const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 5);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 50;
directionalLight.shadow.camera.left = -10;
directionalLight.shadow.camera.right = 10;
directionalLight.shadow.camera.top = 10;
directionalLight.shadow.camera.bottom = -10;
scene.add(directionalLight);

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 1);
scene.add(directionalLightHelper);

const directionalShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
scene.add(directionalShadowHelper);

const spotLight = new THREE.SpotLight(0xff00ff, 2, 20, Math.PI / 6, 0.3, 1);
spotLight.position.set(-5, 8, 3);
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
spotLight.shadow.camera.near = 0.5;
spotLight.shadow.camera.far = 20;
scene.add(spotLight);
scene.add(spotLight.target);

const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);

const pointLight = new THREE.PointLight(0x00ff00, 1.5, 15);
pointLight.position.set(5, 3, -3);
pointLight.castShadow = true;
pointLight.shadow.mapSize.width = 1024;
pointLight.shadow.mapSize.height = 1024;
pointLight.shadow.camera.near = 0.5;
pointLight.shadow.camera.far = 20;
scene.add(pointLight);

const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.5);
scene.add(pointLightHelper);

function animate() {
  requestAnimationFrame(animate);

  const time = Date.now() * 0.0005;
  
  sphere.rotation.y += 0.01;
  box.rotation.x += 0.01;
  box.rotation.y += 0.01;
  cone.rotation.y += 0.01;

  spotLight.target.position.set(
    Math.sin(time) * 5,
    0,
    Math.cos(time) * 5
  );

  spotLightHelper.update();
  directionalShadowHelper.update();

  controls.update();
  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
