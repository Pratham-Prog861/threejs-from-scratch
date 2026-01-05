import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { gsap } from 'gsap';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1a1a2e);
scene.fog = new THREE.Fog(0x1a1a2e, 10, 50);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 3, 10);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

const clock = new THREE.Clock();

const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 5);
directionalLight.castShadow = true;
scene.add(directionalLight);

const planeGeometry = new THREE.PlaneGeometry(50, 50);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x2d2d2d });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.position.y = 0;
plane.receiveShadow = true;
scene.add(plane);

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshStandardMaterial({ color: 0xff6b6b })
);
cube1.position.set(-6, 0.5, 0);
cube1.castShadow = true;
scene.add(cube1);

const sphere1 = new THREE.Mesh(
  new THREE.SphereGeometry(0.7, 32, 32),
  new THREE.MeshStandardMaterial({ color: 0x4ecdc4 })
);
sphere1.position.set(-3, 0.7, 0);
sphere1.castShadow = true;
scene.add(sphere1);

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.6, 0.25, 16, 100),
  new THREE.MeshStandardMaterial({ color: 0xffe66d })
);
torus.position.set(0, 0.6, 0);
torus.castShadow = true;
scene.add(torus);

const cone = new THREE.Mesh(
  new THREE.ConeGeometry(0.6, 1.5, 32),
  new THREE.MeshStandardMaterial({ color: 0x95e1d3 })
);
cone.position.set(3, 0.75, 0);
cone.castShadow = true;
scene.add(cone);

const cylinder = new THREE.Mesh(
  new THREE.CylinderGeometry(0.5, 0.5, 1.5, 32),
  new THREE.MeshStandardMaterial({ color: 0xf38181 })
);
cylinder.position.set(6, 0.75, 0);
cylinder.castShadow = true;
scene.add(cylinder);

const orbitingSphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.4, 32, 32),
  new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x4444ff })
);
orbitingSphere.position.set(0, 2, 5);
orbitingSphere.castShadow = true;
scene.add(orbitingSphere);

const pointLight = new THREE.PointLight(0x4444ff, 1.5, 10);
pointLight.castShadow = true;
orbitingSphere.add(pointLight);

const infoDiv = document.createElement('div');
infoDiv.style.position = 'absolute';
infoDiv.style.top = '20px';
infoDiv.style.left = '20px';
infoDiv.style.color = 'white';
infoDiv.style.fontFamily = 'monospace';
infoDiv.style.fontSize = '14px';
infoDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
infoDiv.style.padding = '15px';
infoDiv.style.borderRadius = '8px';
infoDiv.style.maxWidth = '350px';
infoDiv.innerHTML = `
  <strong>Animation Techniques Demo</strong><br><br>
  <strong>Cube (left):</strong> Simple rotation += 0.01<br>
  <strong>Sphere:</strong> Math.sin/cos wave motion<br>
  <strong>Torus:</strong> Clock.getElapsedTime() rotation<br>
  <strong>Cone:</strong> Delta time-based rotation<br>
  <strong>Cylinder:</strong> GSAP bouncing animation<br>
  <strong>Blue Sphere:</strong> Orbital path using Clock<br><br>
  Press <strong>R</strong> to trigger GSAP camera animation<br>
  Press <strong>T</strong> to animate cylinder jump
`;
document.body.appendChild(infoDiv);

gsap.to(cylinder.position, {
  y: 3,
  duration: 1,
  repeat: -1,
  yoyo: true,
  ease: "bounce.out"
});

function animateCameraToObject(target) {
  gsap.to(camera.position, {
    x: target.position.x,
    y: target.position.y + 3,
    z: target.position.z + 5,
    duration: 2,
    ease: "power2.inOut",
    onUpdate: () => {
      camera.lookAt(target.position);
    }
  });
}

function jumpCylinder() {
  gsap.to(cylinder.rotation, {
    y: cylinder.rotation.y + Math.PI * 2,
    duration: 1,
    ease: "power2.inOut"
  });
}

window.addEventListener('keydown', (event) => {
  if (event.key === 'r' || event.key === 'R') {
    const objects = [cube1, sphere1, torus, cone, cylinder];
    const randomObject = objects[Math.floor(Math.random() * objects.length)];
    animateCameraToObject(randomObject);
  }
  if (event.key === 't' || event.key === 'T') {
    jumpCylinder();
  }
});

let lastTime = 0;

function animate(currentTime) {
  requestAnimationFrame(animate);

  const elapsedTime = clock.getElapsedTime();
  const deltaTime = (currentTime - lastTime) * 0.001;
  lastTime = currentTime;

  cube1.rotation.x += 0.01;
  cube1.rotation.y += 0.01;

  sphere1.position.y = 0.7 + Math.sin(elapsedTime * 2) * 0.5;
  sphere1.rotation.y = elapsedTime;

  torus.rotation.x = elapsedTime * 0.5;
  torus.rotation.y = elapsedTime * 0.8;

  cone.rotation.y += deltaTime * 2;

  orbitingSphere.position.x = Math.cos(elapsedTime * 0.5) * 5;
  orbitingSphere.position.z = Math.sin(elapsedTime * 0.5) * 5;
  orbitingSphere.position.y = 2 + Math.sin(elapsedTime * 2) * 1;

  controls.update();
  renderer.render(scene, camera);
}

animate(0);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
