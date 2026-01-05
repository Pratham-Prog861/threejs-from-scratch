# 04 - Orbit Controls and Camera

Master the art of navigating your 3D world! In this project, we explore different camera types and how to give users control over their viewpoint.

## What You'll Learn

- **Camera Types**: The difference between `PerspectiveCamera` and `OrthographicCamera`
- **OrbitControls**: Enabling mouse interaction (rotate, zoom, pan)
- **Camera Switching**: Toggling between cameras dynamically
- **Control Damping**: Adding smooth inertia to camera movements
- **Constraints**: Limiting zoom and rotation angles

## How to Run

```bash
cd 04-orbit-controls-and-camera
npm install
npm run dev
```

## Try This

- **Press 'C'**: Toggle between Perspective and Orthographic views to see the difference
- **Zoom In/Out**: Use the scroll wheel (notice the limits?)
- **Rotate**: Left-click and drag to orbit around the scene
- **Pan**: Right-click and drag to move the camera target
- **Experiment**: Change `perspectiveControls.dampingFactor` to see how it affects smoothness
- **Challenge**: Try changing the `frustumSize` of the OrthographicCamera

## Key Concepts

**PerspectiveCamera**: Mimics the human eye. Objects get smaller as they move further away. Best for realistic scenes.
**OrthographicCamera**: No perspective distortion. Objects stay the same size regardless of distance. Best for 2D games, UI, or architectural diagrams.
**OrbitControls**: A standard Three.js add-on that allows the camera to orbit around a target.
**Damping**: Adds a "weight" to the controls, making movement slide to a stop rather than stopping instantly.
**Frustum**: The viewing volume of the camera. Only objects inside this shape are rendered.

## Resources

- [PerspectiveCamera Docs](https://threejs.org/docs/#api/en/cameras/PerspectiveCamera)
- [OrthographicCamera Docs](https://threejs.org/docs/#api/en/cameras/OrthographicCamera)
- [OrbitControls Docs](https://threejs.org/docs/#examples/en/controls/OrbitControls)
