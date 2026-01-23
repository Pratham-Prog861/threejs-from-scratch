# 14 - React Three Fiber Introduction

Learn the fundamentals of **React Three Fiber (R3F)** by comparing it directly with vanilla Three.js. This project demonstrates why R3F is the industry standard for building 3D web applications with React, focusing on its declarative nature and seamless state integration.

## What You'll Learn

- **Declarative 3D**: Understanding how JSX replaces imperative Three.js boilerplate
- **The Canvas**: How R3F automatically manages scenes, cameras, and render loops
- **Hooks API**: Using `useFrame` for animations and `useThree` for scene access
- **Automatic Cleanup**: How R3F handles memory management and resource disposal
- **Event System**: Implementing pointer events (hover, click) without manual raycasting
- **Component Architecture**: Building reusable 3D components just like standard UI

## How to Run

```bash
cd 03-advanced/14-react-three-fiber-intro
npm install
npm run dev
```

**Controls:**

- **Toggle View**: Switch between the "Vanilla" and "R3F" tabs to compare the implementation styles.
- **Interact**: Click or hover over the objects in the R3F scene to see interactive effects.

## File Structure

```bash
src/components/
  ├── VanillaScene.jsx    # Imperative Three.js implementation (boilerplate-heavy)
  ├── R3FScene.jsx        # Declarative R3F implementation (clean & concise)
  ├── ComparisonView.jsx  # UI for switching between the two versions
  ├── Box.jsx             # Reusable R3F component with state & events
  ├── Sphere.jsx          # Reusable R3F component
  └── Torus.jsx           # Reusable R3F component
```

## Concepts

### 🧩 Declarative vs Imperative

In vanilla Three.js, you must manually create every object, add it to the scene, and manage the render loop. In R3F, you simply describe your scene using JSX, and the library handles the rest.

```jsx
// Vanilla (Imperative)
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// R3F (Declarative)
<mesh>
  <boxGeometry />
  <meshStandardMaterial />
</mesh>;
```

### 🎥 The Canvas Component

The `<Canvas>` component is the heart of R3F. It sets up the `Scene`, `Camera`, and `Renderer` automatically, handles window resizing, and starts the animation loop for you.

### 🔄 The useFrame Hook

Instead of a global `requestAnimationFrame` loop, R3F provides the `useFrame` hook. It allows each component to handle its own animation logic, which is automatically cleaned up when the component unmounts.

```javascript
useFrame((state, delta) => {
  meshRef.current.rotation.y += delta;
});
```

### 🖱️ Built-in Raycasting

R3F makes interaction incredibly simple. You can add `onClick`, `onPointerOver`, and `onPointerOut` directly to your 3D objects without writing a single line of raycasting code.

## Try This

- **Add a New Shape**: Create a `Cylinder.jsx` component and add it to the `R3FScene`.
- **State Sync**: Add a slider in the UI that controls the rotation speed of all objects in the R3F scene.
- **Physics**: Try adding `@react-three/rapier` to the R3F scene to see how easily physics integrates with components.
- **Boilerplate Count**: Compare the line count of `VanillaScene.jsx` vs `R3FScene.jsx` to see the "90% less code" benefit in action.

## Common Issues

- **Hooks Outside Canvas**: R3F hooks like `useFrame` or `useThree` can _only_ be used inside components that are children of the `<Canvas>`.
- **Manual Disposal**: While R3F handles most disposal, if you create raw Three.js objects manually, you still need to call `.dispose()` on them.
- **Performance**: Excessive re-renders of the parent component can slow down the 3D scene. Use `useMemo` or separate your 3D logic into focused components.

## Resources

- [React Three Fiber Documentation](https://docs.pmnd.rs/react-three-fiber)
- [Three.js Journey (R3F Section)](https://threejs-journey.com/)
- [Poimandres Discord](https://discord.gg/poimandres)
