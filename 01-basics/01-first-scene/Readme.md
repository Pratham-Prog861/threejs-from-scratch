# 01 - First Scene

Learn how to create your first Three.js scene with a simple 3D cube. This is the foundation of every Three.js application.

## What You'll Learn

- Setting up a Scene, Camera, and Renderer
- Creating basic 3D objects (Mesh = Geometry + Material)
- BoxGeometry and MeshBasicMaterial
- Rendering your scene to the browser
- Understanding the Three.js coordinate system

## How to Run

```bash
cd 01-first-scene
npm install
npm run dev
```

## Try This

- Change the cube's color (modify `MeshBasicMaterial` color property)
- Move the cube using `cube.position.x/y/z`
- Add another cube with a different color and position
- Try different geometries like `SphereGeometry` or `ConeGeometry`

## Key Concepts

**Scene**: Container for all 3D objects, lights, and cameras  
**Camera**: Your viewpoint into the 3D world  
**Renderer**: Draws your scene onto the canvas  
**Mesh**: Geometry + Material = visible 3D object

## Resources

- [Creating a Scene](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene) - Official guide
- [Three.js Examples](https://threejs.org/examples/) - Live examples
- [PerspectiveCamera Docs](https://threejs.org/docs/#api/en/cameras/PerspectiveCamera)
