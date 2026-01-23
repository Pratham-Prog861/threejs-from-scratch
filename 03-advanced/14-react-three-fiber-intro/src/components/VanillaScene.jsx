import { useEffect, useRef } from "react";
import * as THREE from "three";

function VanillaScene() {
  const containerRef = useRef();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#0f0f1e");

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000,
    );
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Box
    const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    const boxMaterial = new THREE.MeshStandardMaterial({ color: "#ff6b6b" });
    const box = new THREE.Mesh(boxGeometry, boxMaterial);
    box.position.x = -2;
    scene.add(box);

    // Sphere
    const sphereGeometry = new THREE.SphereGeometry(0.7, 32, 32);
    const sphereMaterial = new THREE.MeshStandardMaterial({ color: "#4ecdc4" });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.x = 0;
    scene.add(sphere);

    // Torus
    const torusGeometry = new THREE.TorusGeometry(0.6, 0.25, 16, 100);
    const torusMaterial = new THREE.MeshStandardMaterial({ color: "#95e1d3" });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.x = 2;
    scene.add(torus);

    // Animation loop
    let animationId;
    function animate() {
      animationId = requestAnimationFrame(animate);

      box.rotation.x += 0.01;
      box.rotation.y += 0.01;

      sphere.rotation.x += 0.01;
      sphere.rotation.y += 0.01;

      torus.rotation.x += 0.01;
      torus.rotation.y += 0.01;

      renderer.render(scene, camera);
    }
    animate();

    // Handle resize
    function handleResize() {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    }
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      if (container) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      boxGeometry.dispose();
      boxMaterial.dispose();
      sphereGeometry.dispose();
      sphereMaterial.dispose();
      torusGeometry.dispose();
      torusMaterial.dispose();
    };
  }, []);

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
}

export default VanillaScene;
