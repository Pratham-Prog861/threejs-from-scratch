# 07 - Loading 3D Models (GLTF/GLB)

Welcome to the world of external 3D assets! In this project, we learn how to load, display, and manipulate 3D models (GLTF/GLB format) using React Three Fiber and Drei.

## What You'll Learn

- **GLTF/GLB Format**: Why it's the standard for the 3D web
- **useGLTF Hook**: Loading models efficiently with Drei
- **React Suspense**: Handling loading states with fallbacks
- **Model Instancing**: Reusing the same model multiple times (Cars)
- **Scene Graph Access**: Manipulating specific parts of a model (Robot)
- **ContactShadows**: Adding realistic shadows without expensive calculations

## How to Run

```bash
cd 07-loading-3d-models-gltf
npm install
npm run dev
```

## File Structure

```bash
src/components/
  ├── Astronaut.jsx   # Basic model loading
  ├── Robot.jsx       # Accessing internal nodes/materials
  ├── Car.jsx         # Reusable model component
  └── Scene.jsx       # Composing the scene
public/models/        # GLB files
```

## Concepts

### 📦 GLTF & GLB

Think of **GLTF** as the "JPEG of 3D". It's a file format designed for efficient transmission and loading of 3D scenes.

- **.gltf**: JSON-based, often with separate texture/bin files
- **.glb**: Binary version, everything packed into one file (easier to use)

### 🎣 useGLTF Hook

Drei's `useGLTF` is the easiest way to load models in R3F. It automatically caches the model, so loading it multiple times doesn't fetch it again.

```jsx
const { scene } = useGLTF("/path/to/model.glb");
return <primitive object={scene} />;
```

### ⏳ Suspense & Fallbacks

3D models can be large. We use React's `<Suspense>` to show a loading screen while models are being fetched.

```jsx
<Suspense fallback={<Loader />}>
  <Scene />
</Suspense>
```

### 🧬 Accessing Nodes (The Robot)

Sometimes you want to animate just the head or change the material of just the arm. `useGLTF` returns the `nodes` graph, allowing you to pick specific parts.

```jsx
const { nodes } = useGLTF("/robot.glb");
return <mesh geometry={nodes.Head.geometry} />;
```

## Try This

- **Clone the Cars**: Add more `<Car />` components in `Scene.jsx` with different positions
- **Animate the Robot**: In `Robot.jsx`, try animating a different part (like an arm or antenna)
- **Change Materials**: Try overriding the material of the Astronaut or Car
- **Download a Model**: Go to [Sketchfab](https://sketchfab.com/) or [Poly Haven](https://polyhaven.com/models), download a GLB, and try to load it!

## Common Issues

- **Model not showing**: Check the path! It should be relative to the `public` folder (e.g., `/models/file.glb`)
- **Model is black**: It probably needs lighting. Ensure you have lights or an Environment map.
- **Model is too big/small**: Adjust the `scale` prop on the component.

## Resources

- [GLTF Standard](https://www.khronos.org/gltf/)
- [React Three Fiber Loading Models](https://docs.pmnd.rs/react-three-fiber/tutorials/loading-models)
- [Drei useGLTF](https://github.com/pmndrs/drei#usegltf)
- [Sketchfab](https://sketchfab.com/) - Great source for free models
