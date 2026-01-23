# 13 - Performance & Optimization

Master the art of high-performance 3D rendering in React Three Fiber. This project explores essential techniques to render thousands of objects smoothly, manage memory efficiently, and adapt quality based on device performance.

## What You'll Learn

- **InstancedMesh**: Rendering thousands of objects in a single draw call
- **Drei Instances**: Using the declarative API for easier instancing
- **Level of Detail (LOD)**: Automatically switching to simpler geometry for distant objects
- **Performance Monitoring**: Implementing adaptive quality systems that react to frame rates
- **Memory Management**: Reusing geometries and materials to prevent leaks
- **Shadow & Texture Optimization**: Balancing visual fidelity with performance

## How to Run

```bash
cd 03-advanced/13-performance-and-optimization
npm install
npm run dev
```

**Controls:**

- **Toggle Modes**: Switch between "Naive", "Instanced", "Drei Instances", and "LOD" to see the performance impact.
- **Object Count**: Adjust the number of objects to find the breaking point of each method.
- **Stats**: Monitor FPS, frame time, and memory usage in real-time.

## File Structure

```bash
src/components/
  ├── NaiveBoxes.jsx           # The "slow" way (individual meshes)
  ├── InstancedBoxes.jsx       # The "fast" way (InstancedMesh)
  ├── DreiInstances.jsx        # The "declarative" way (Drei Instances)
  ├── LODExample.jsx           # Level of Detail implementation
  └── Lights.jsx               # Scene lighting setup
```

## Concepts

### 🚀 The Power of Instancing

Rendering 1,000 individual meshes requires 1,000 draw calls, which will choke even powerful GPUs. **Instancing** allows you to render all 1,000 objects in a **single draw call**.

```jsx
// Naive (Slow)
{
  data.map((item) => <mesh geometry={geo} material={mat} />);
}

// Instanced (Fast)
<instancedMesh args={[geo, mat, 1000]} />;
```

### 📉 Level of Detail (LOD)

Why render a high-poly sphere if it's only 2 pixels wide on the screen? LOD allows you to swap complex models for simpler ones as they move further from the camera.

```jsx
<Detailed distances={[0, 50, 100]}>
  <HighPolyMesh /> {/* Close up */}
  <MediumPolyMesh /> {/* Medium distance */}
  <LowPolyMesh /> {/* Far away */}
</Detailed>
```

### 📊 Adaptive Quality

Not all devices are equal. Use `PerformanceMonitor` to detect low frame rates and automatically decrease quality (like lowering the pixel ratio or disabling shadows) to keep the experience smooth.

```jsx
<PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(2)}>
  <Scene />
</PerformanceMonitor>
```

### ♻️ Resource Reuse

Never create a new geometry or material inside a loop or on every render. Define them once and reuse them across all your meshes.

```javascript
const boxGeo = useMemo(() => new THREE.BoxGeometry(), []);
// ... use boxGeo everywhere
```

## Try This

- **Stress Test**: Increase the object count to 50,000 and see which method survives.
- **Mobile Test**: Open the project on a phone and see the `PerformanceMonitor` in action.
- **Custom LOD**: Create your own LOD levels for a complex model (e.g., a tree or a car).
- **Shadow Optimization**: Toggle shadows on and off to see how much they impact the frame rate.

## Common Issues

- **Impure Functions**: Using `Math.random()` inside a render function can cause jittering and performance drops. Always generate random data in `useMemo` or outside the component.
- **Memory Leaks**: Forgetting to dispose of geometries or materials when they are no longer needed. R3F handles most of this, but be careful with raw Three.js objects.
- **Over-Optimization**: Don't use instancing for 5 objects. The overhead might not be worth it. Start optimizing when you see frame drops.

## Resources

- [R3F Performance Pitfalls](https://docs.pmnd.rs/react-three-fiber/advanced/pitfalls)
- [Three.js Instancing Examples](https://threejs.org/examples/?q=instancing)
- [Drei Performance Helpers](https://github.com/pmndrs/drei#performance)
