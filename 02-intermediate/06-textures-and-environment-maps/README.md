# 06 - Textures and Environment Maps

Level up your 3D scenes with realistic textures and lighting! In this project, we transition to **React Three Fiber (R3F)** to leverage its powerful ecosystem and component-based architecture.

## What You'll Learn

- **React Three Fiber + Drei + Vite**: Modern stack for 3D web development
- **Component-based Architecture**: Building reusable 3D components
- **Loading Textures**: Using `useTexture` hook for easy loading
- **PBR Maps**: Color, Normal, Roughness, Metalness, AO
- **Texture Wrapping**: Repeating textures across surfaces
- **Environment Maps**: Using HDR images for realistic lighting
- **Material Properties**: Understanding metalness vs roughness

## How to Run

```bash
cd 06-textures-and-environment-maps
npm install
npm run dev
```

## File Structure

```bash
src/components/    # Reusable 3D components (TexturedBox, Ground, etc.)
public/textures/   # Texture files from Poly Haven
```

## Concepts

### ⚛️ React Three Fiber (R3F)

R3F is a React renderer for Three.js. Instead of imperative code (`scene.add(mesh)`), you write declarative JSX. It handles the render loop, resizing, and cleanup automatically.

**Vanilla Three.js:**

```javascript
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
```

**React Three Fiber:**

```jsx
<mesh>
  <boxGeometry />
  <meshStandardMaterial color="red" />
</mesh>
```

### 🛠️ Drei

Drei is a collection of useful helpers for R3F. We use:

- `useTexture`: Loads textures with React Suspense support
- `Environment`: Adds instant HDR lighting

### ⚡ Vite

Vite is our build tool. It's extremely fast and supports Hot Module Replacement (HMR), making 3D development much smoother than older tools like Webpack.

### 🎨 PBR Texture Maps

- **Color Map (map)**: The base color of the material
- **Normal Map**: Simulates bumps and dents without adding geometry
- **Roughness Map**: Defines matte (white) vs shiny (black) areas
- **Metalness Map**: Defines metallic (white) vs non-metallic (black) areas
- **AO Map**: Adds shadows in crevices (Ambient Occlusion)

## Try This

- **Download New Textures**: Go to [Poly Haven](https://polyhaven.com/textures) and grab a "leather" or "brick" texture
- **Create a Component**: Make a `<TexturedPlane />` using your new texture
- **Experiment with Environment**: Change the preset to `"night"`, `"forest"`, or `"studio"`
- **Tweak Material**: Adjust `roughness` and `metalness` props to see how they interact with the texture
- **Texture Repeat**: Try `texture.repeat.set(4, 4)` on the ground plane

## Common Issues

- **Textures not loading**: Ensure paths start with `/textures/...` (relative to public folder)
- **Normal map invisible**: You need light! Add directional/point lights or an Environment map
- **Pixelated textures**: Use higher resolution textures or check your UV mapping

## Resources

- [Poly Haven](https://polyhaven.com/) - Free high-quality textures/HDRIs
- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber)
- [Drei Documentation](https://github.com/pmndrs/drei)
- [Three.js Texture Docs](https://threejs.org/docs/#api/en/textures/Texture)
