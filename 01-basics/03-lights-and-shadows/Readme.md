# 03 - Lights and Shadows

Learn how to bring your 3D world to life with different types of lights and realistic shadows. Lighting is crucial for depth and realism!

## What You'll Learn

- **4 Types of Lights**: Ambient, Directional, Spot, and Point lights
- **Shadow Mapping**: How to enable and configure shadows
- **Light Helpers**: Visualizing light positions and directions
- **Shadow Properties**: Optimizing shadow quality with `mapSize` and camera bounds
- **Material Interaction**: How `MeshStandardMaterial` reacts to light

## How to Run

```bash
cd 03-lights-and-shadows
npm install
npm run dev
```

## Try This

- **Change Light Colors**: Make the SpotLight red (`0xff0000`) or the PointLight blue
- **Move the Lights**: Change the `position.set()` values to see how shadows change
- **Disable Shadows**: Comment out `castShadow` on one of the objects
- **Tweak Quality**: Change `shadow.mapSize.width` to `512` (lower quality) or `4096` (higher quality)
- **Animation**: Try changing the speed of the moving spotlight in the `animate` function

## Key Concepts

**AmbientLight**: Illuminates everything equally (no shadows)  
**DirectionalLight**: Like the sun, parallel rays from far away (casts shadows)  
**SpotLight**: Like a flashlight or stage light, cone-shaped (casts shadows)  
**PointLight**: Like a light bulb, emits in all directions (casts shadows)  
**ShadowMap**: The technique used to render shadows (requires `castShadow` and `receiveShadow`)  
**Helpers**: Debug tools like `DirectionalLightHelper` to see where lights are pointing

## Resources

- [Lights Documentation](https://threejs.org/docs/#api/en/lights/Light) - Overview of all lights
- [Shadows Guide](https://threejs.org/docs/#manual/en/introduction/How-to-use-post-processing) - (Note: Shadows are part of the core, check specific light docs)
- [DirectionalLight](https://threejs.org/docs/#api/en/lights/DirectionalLight)
- [SpotLight](https://threejs.org/docs/#api/en/lights/SpotLight)
