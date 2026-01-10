# 09 - Scroll Based Animation

Learn how to create immersive 3D scroll experiences where the camera, objects, and HTML content move in sync with the user's scroll.

## What You'll Learn

- **ScrollControls**: Setting up a virtual scroll container in R3F
- **useScroll Hook**: Accessing scroll data (offset, delta, range) to drive animations
- **Camera Movement**: Smoothly interpolating camera position and rotation based on scroll progress
- **GSAP Integration**: Using GreenSock for high-performance HTML element animations
- **HTML/3D Sync**: Coordinating DOM elements (Overlay) with the 3D scene
- **React Purity**: Managing random data generation correctly in React components

## How to Run

```bash
cd 09-scroll-based-animation
npm install
npm run dev
```

## File Structure

```bash
src/components/
  ├── ScrollScene.jsx      # Main wrapper with ScrollControls
  ├── Scene.jsx            # 3D logic: Camera movement & Robot animation
  ├── Overlay.jsx          # HTML content animated with GSAP
  ├── FloatingCubes.jsx    # Background elements responding to scroll
  ├── Robot.jsx            # The hero 3D model
  └── Section.jsx          # Reusable HTML section component
```

## Concepts

### 📜 ScrollControls & useScroll

`ScrollControls` from `@react-three/drei` creates a virtual scroll container. Inside it, `useScroll` gives us access to `data.offset` (0 to 1), which represents the current scroll position. We use this value in `useFrame` to drive animations.

```javascript
const data = useScroll();
useFrame(() => {
  // Move object based on scroll
  ref.current.position.y = -data.offset * 10;
});
```

### 🎥 Camera Interpolation

Instead of hard-coding camera paths, we define keyframes (positions and lookAt targets) for each "page" of the scroll. We then use `THREE.MathUtils.lerp` to smoothly transition the camera between these keyframes based on the scroll progress.

### ⚡ GSAP ScrollTrigger

For the HTML overlay, we use GSAP's `ScrollTrigger`. This allows us to animate text opacity and position as specific sections enter the viewport, creating a polished, professional feel.

### ⚛️ Pure Components

When generating random 3D objects (like the Floating Cubes), we must ensure the data is stable. We use `useState` with an initializer function to generate random positions once on mount, preventing "impure render" errors and unnecessary re-calculations.

## Try This

- **Add More Pages**: Increase the `pages` prop in `ScrollControls` and add more sections to `Overlay.jsx`.
- **Change Camera Path**: Modify the `cameraPositions` array in `Scene.jsx` to create a different journey.
- **Parallax Effects**: Adjust the speed of `FloatingCubes` relative to the scroll to create depth.
- **Interactive Elements**: Add hover effects to the 3D objects that trigger when the scroll pauses.

## Common Issues

- **Scroll not working**: Ensure `ScrollControls` wraps your scene content and `pages` is set correctly.
- **Jittery Animation**: Use `useFrame` for 3D updates instead of React state to ensure 60FPS performance.
- **Overlay blocking clicks**: Check CSS `pointer-events`. If the overlay covers the canvas, set `pointer-events: none` on the container and `auto` on interactive buttons.

## Resources

- [Drei ScrollControls Docs](https://github.com/pmndrs/drei#scrollcontrols)
- [GSAP ScrollTrigger](https://greensock.com/scrolltrigger/)
- [React Three Fiber Ecosystem](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)
