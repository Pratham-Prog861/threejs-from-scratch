# 12 - Post-Processing & Effects

Learn how to transform your 3D scenes from "standard" to "cinematic" using **Post-Processing**. This project demonstrates how to use `@react-three/postprocessing` to add professional effects like Bloom, Chromatic Aberration, Depth of Field, and more.

## What You'll Learn

- **EffectComposer**: Setting up the post-processing pipeline in R3F
- **Bloom & Glow**: Making objects emit light and creating a "dreamy" atmosphere
- **Lens Effects**: Implementing Chromatic Aberration, Vignette, and Noise
- **Depth of Field**: Creating cinematic focus and blur based on distance
- **Leva Integration**: Building a real-time UI to tweak effect parameters
- **Performance**: Balancing visual quality with frame rates (SMAA vs Native AA)

## How to Run

```bash
cd 03-advanced/12-postprocessing-and-effects
npm install
npm run dev
```

**Controls:**

- **✨ EFFECTS ON Button**: Use the floating button at the bottom-left to toggle all effects at once.
- **Press H**: Toggle the Leva controls panel to tweak individual effect parameters.
- **Orbit**: Left click + drag to rotate, scroll to zoom.
- **Leva Panel**: Use the checkboxes and sliders to fine-tune each effect.

## File Structure

```bash
src/components/
  ├── Scene.jsx            # Main entry with <EffectComposer>
  ├── GlowingObjects.jsx   # 3D objects with emissive materials
  ├── Lights.jsx           # Scene lighting setup
  ├── Donut.jsx            # Example of a complex glowing shape
  └── EffectsToggle.jsx    # UI logic for enabling/disabling effects
```

## Concepts

### 🎬 What is Post-Processing?

Post-processing applies visual filters to the final rendered image _after_ the 3D scene has been drawn. It's like adding a filter in Photoshop or Instagram, but in real-time.

### 🎼 EffectComposer

The `<EffectComposer>` is the container for all your effects. It replaces the default rendering pass with a custom pipeline.

```jsx
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";

<EffectComposer multisampling={0}>
  <Bloom intensity={1.5} />
  <Vignette darkness={0.5} />
</EffectComposer>;
```

### 🌟 Bloom & Emissive Materials

To make an object "glow," you need two things:

1. **Emissive Material**: A material with `emissive` color and `emissiveIntensity` > 1.
2. **Bloom Effect**: A post-processing pass that "bleeds" bright pixels into surrounding areas.

```jsx
<meshStandardMaterial
  color="black"
  emissive="cyan"
  emissiveIntensity={2}
  toneMapped={false}
/>
```

_Note: `toneMapped={false}` is crucial to prevent the glow from being "clamped" by the renderer._

### 📸 Cinematic Lens Effects

- **Chromatic Aberration**: Mimics real-world lens distortion by separating RGB channels at the edges.
- **Vignette**: Darkens the corners of the screen to focus the viewer's eye on the center.
- **Depth of Field**: Blurs objects that are not at the "focus distance," creating a professional camera look.

### 🛠️ Real-time Tweaking with Leva

Shaders and effects are hard to get right by guessing numbers. We use **Leva** to create a GUI that lets us slide values and see the results instantly.

```javascript
const { intensity } = useControls("Bloom", {
  intensity: { value: 1.5, min: 0, max: 5 },
});
```

## Try This

- **Cyberpunk Look**: Combine strong Bloom (Pink/Cyan) with Glitch and Chromatic Aberration.
- **Vintage Film**: Add Noise (grain) and a heavy Vignette with a warm ToneMapping.
- **Miniature Effect**: Use a very shallow Depth of Field (high `bokehScale`) to make the scene look like a tiny toy model.
- **Interactive Glitch**: Trigger the `Glitch` effect only when the user clicks an object.

## Common Issues

- **Performance Drop**: Each effect adds a new "pass" over the screen. Too many effects will lag on mobile or older GPUs.
- **Native AA Conflict**: Post-processing often breaks native anti-aliasing. Set `gl={{ antialias: false }}` on the Canvas and use the `SMAA` or `FXAA` effect instead.
- **Invisible Effects**: Ensure your `EffectComposer` is at the top level of your scene and not hidden behind other UI elements.

## Resources

- [React Three Postprocessing Docs](https://react-three-next.com/docs/postprocessing)
- [Postprocessing.js Wiki](https://github.com/vanruesc/postprocessing/wiki)
- [Leva Documentation](https://github.com/pmndrs/leva)
