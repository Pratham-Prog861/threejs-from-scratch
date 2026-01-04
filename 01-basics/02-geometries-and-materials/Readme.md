# 02 - Geometries and Materials

Learn how Three.js provides multiple built-in geometries and materials to create different 3D shapes with various visual properties. Time to level up from a single cube!

## What You'll Learn

- 9 different built-in geometries (Box, Sphere, Cone, Cylinder, Torus, TorusKnot, Dodecahedron, Octahedron, Icosahedron)
- 3 types of materials (MeshStandardMaterial, MeshPhongMaterial, MeshLambertMaterial)
- Creating a grid of objects using nested loops
- OrbitControls to explore and interact with the scene
- Adding lights (DirectionalLight and AmbientLight)
- Animation loops with different rotation speeds

## How to Run

```bash
cd 02-geometries-and-materials
npm install
npm run dev
```

## Try This

- Change the colors of different materials
- Modify the grid layout (try 4x4 or 2x5)
- Adjust the spacing between objects (change the `2.5` multiplier)
- Experiment with material properties like `roughness`, `metalness`, and `shininess`
- Add more geometry types like `PlaneGeometry` or `TetrahedronGeometry`
- Change the rotation speeds in the animate function

## Key Concepts

**Geometries**: Define the shape/structure of 3D objects  
**Materials**: Define the surface appearance and how objects react to light  
**MeshStandardMaterial**: Physically-based material with roughness and metalness  
**MeshPhongMaterial**: Shiny material with specular highlights (shininess property)  
**MeshLambertMaterial**: Non-shiny material for matte surfaces  
**OrbitControls**: Allows mouse interaction to rotate, zoom, and pan the camera  
**Nested Loops**: Used to create grids of objects programmatically

## Resources

- [Geometries Documentation](https://threejs.org/docs/#api/en/geometries/BoxGeometry) - All built-in geometries
- [Materials Documentation](https://threejs.org/docs/#api/en/materials/Material) - Material types and properties
- [OrbitControls](https://threejs.org/docs/#examples/en/controls/OrbitControls) - Camera controls
- [Lights](https://threejs.org/docs/#api/en/lights/Light) - Lighting in Three.js
