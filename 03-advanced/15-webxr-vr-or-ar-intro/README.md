# 15 - WebXR: VR & AR Introduction

Learn how to build immersive Virtual Reality and Augmented Reality experiences directly in the browser. This project covers the transition to spatial computing using **React Three Fiber** and the latest **@react-three/xr (v6)** API.

## What You'll Learn

- **The XR Store**: Managing sessions, modes, and input tracking with `createXRStore()`.
- **Immersive Scenes**: Setting up the `<XR />` provider and `<XROrigin />` for proper spatial alignment.
- **Spatial Interaction**: Using standard pointer events (`onClick`, `onPointerOver`) mapped to VR controllers.
- **Tracking Models**: Visualizing 6DoF controllers and hand tracking skeleton models.
- **Augmented Reality**: Implementing markerless AR with hit-testing and real-world scale alignment.
- **Performance for XR**: Maintaining 90+ FPS for comfort and reducing motion sickness.

## How to Run

```bash
cd 03-advanced/15-webxr-vr-or-ar-intro
npm install
npm run dev
```

## File Structure

```bash
src/
├── examples/
│   ├── Example1_VRBasic.jsx        # Core XR setup and immersive environment
│   ├── Example2_VRInteractive.jsx  # Spatial pointers and interaction events
│   ├── Example3_VRControllers.jsx  # Tracking models and input visualization
│   └── Example4_AR.jsx             # Augmented Reality and hit-testing
├── App.jsx                         # Main dashboard for spatial examples
└── index.css                       # Premium glassmorphic UI design
```

## Concepts

### 🏗️ The XR Store (v6)

In version 6, `@react-three/xr` moved to a centralized store pattern. This allows for better session state management and decoupling the XR logic from the render loop.

```jsx
const store = createXRStore();

<VRButton store={store} />
<Canvas>
  <XR store={store}>
    <XROrigin />
    {/* Scene content */}
  </XR>
</Canvas>
```

### 📍 XROrigin & Spatial Alignment

The `<XROrigin />` component defines where the "feet" of the user are in the 3D scene. This is crucial for maintaining proper height (average eye level is 1.6m) and ensuring spatial pointers align with the user's physical position.

### 🖱️ Unified Interaction

Legacy versions used an `<Interactive />` wrapper. In v6, spatial pointers are integrated directly into R3F events.

- `onClick`: Triggered by the controller trigger button.
- `onPointerOver/Out`: Dynamic hover states based on controller raycasting.

### 👓 Testing Environment

If you don't have a VR headset, use the **WebXR API Emulator** (Chrome/Edge extension). It allows you to simulate a Meta Quest or HTC Vive directly in your browser's dev tools.

## v6 Migration Guide for Students

If you are following older tutorials, note these key changes:

1. **No `<Controllers />` or `<Hands />`**: These are now rendered automatically when using a store.
2. **Interactive Component**: Replaced by standard `onPointer` events.
3. **useXR Selector**: Use `const session = useXR((s) => s.session)` instead of destructuring the whole state for better performance.

## Resources

- [@react-three/xr Documentation](https://pmndrs.github.io/xr/react/getting-started)
- [WebXR API Emulator (Chrome Store)](https://chrome.google.com/webstore/detail/webxr-api-emulator/glmgpjlbbppddiccccbeoocobhebjiop)
- [Three.js WebXR Examples](https://threejs.org/examples/?q=webxr)
- [Meta Quest Developer Docs](https://developer.oculus.com/documentation/web/web-webxr/)
