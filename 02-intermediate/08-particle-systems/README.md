# 08 - Particle Systems

Learn how to create high-performance dynamic effects like fire, smoke, and snow using Three.js BufferGeometry and React Three Fiber.

## What You'll Learn

- **BufferGeometry**: Creating custom geometry for thousands of points
- **Points & PointsMaterial**: The foundation of particle systems
- **High-Performance Animation**: Mutating `Float32Array`s in the render loop
- **React Purity & Mutations**: Using `useState` and `useRef` for stable mutable data
- **Simulation Logic**: Implementing gravity, lifespans, and velocity
- **Blending Modes**: Using `AdditiveBlending` for glowing effects
- **Alpha Maps**: Using textures to shape individual particles

## How to Run

```bash
cd 08-particle-systems
npm install
npm run dev
```

## File Structure

```bash
src/components/
  ├── FireParticles.jsx    # Additive blending + lifespan logic
  ├── SmokeParticles.jsx   # Rising particles + opacity fade
  ├── SnowParticles.jsx    # Large scale environment effect
  ├── SparkleParticles.jsx # Spherical distribution + pulsing
  └── Scene.jsx            # Composing the effects
public/textures/           # Particle alpha maps
```

## Concepts

### ✨ BufferGeometry & Points

In Three.js, a `Points` object is much more efficient than creating thousands of individual `Mesh` objects. It uses a single `BufferGeometry` where each vertex represents a particle.

### 🚀 Performance Optimization

To animate thousands of particles at 60FPS, we don't use React state for positions. Instead:

1. We create a `Float32Array` once.
2. We mutate the values directly in the `useFrame` loop.
3. We set `needsUpdate = true` on the attribute to tell Three.js to upload the new data to the GPU.

### ⚛️ React & Mutable Data

Because the React Compiler (Forget) and strict linting rules discourage mutating values from `useMemo`, we use a specific pattern:

- **`useState`**: Used for the arrays passed to JSX (positions, colors). This provides a stable reference that React doesn't track for "immutability" in the same way.
- **`useRef`**: Used for simulation-only data (velocities, lifespans) that never touches the JSX.

### 🔥 Blending Modes

`THREE.AdditiveBlending` is the secret to realistic fire and glows. It adds the color of the particle to the color behind it, making overlapping particles look brighter.

## Try This

- **Change Particle Count**: Increase the `count` in any component to see how many particles your GPU can handle.
- **Gravity Effect**: Add a gravity constant to the velocity in `useFrame`.
- **Color Shifting**: Change the particle color based on its height or lifespan.
- **Custom Shapes**: Download a different alpha map (like a star or heart) and apply it to the `PointsMaterial`.

## Common Issues

- **Particles not visible**: Check if your `size` is too small or if they are positioned behind the camera.
- **Performance drops**: Reduce the particle count or use simpler math in the `useFrame` loop.
- **Flickering**: Ensure `depthWrite` is set to `false` for transparent particles to avoid depth sorting issues.

## Resources

- [Three.js Points Documentation](https://threejs.org/docs/#api/en/objects/Points)
- [BufferAttribute Documentation](https://threejs.org/docs/#api/en/core/BufferAttribute)
- [R3F Performance Guide](https://docs.pmnd.rs/react-three-fiber/advanced/performance)
