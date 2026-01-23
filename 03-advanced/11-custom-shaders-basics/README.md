# 11 - Custom Shaders Basics

Unlock the full power of the GPU by learning **GLSL (OpenGL Shading Language)**. This project introduces the fundamentals of custom shaders in React Three Fiber, allowing you to create unique visual effects that aren't possible with standard materials.

## What You'll Learn

- **ShaderMaterial**: Creating and using custom materials in R3F
- **GLSL Syntax**: Understanding the C-like language used for shaders
- **Vertex Shaders**: Manipulating geometry and vertex positions (waves, displacement)
- **Fragment Shaders**: Controlling pixel-perfect colors, patterns, and gradients
- **Uniforms & Varyings**: Passing data between JavaScript, Vertex, and Fragment shaders
- **UV Mapping**: Using coordinates to map patterns onto 3D surfaces

## How to Run

```bash
cd 03-advanced/11-custom-shaders-basics
npm install
npm run dev
```

## File Structure

```bash
src/components/
  ├── Scene.jsx            # Main scene setup
  ├── WavePlane.jsx        # Plane with vertex shader wave animation
  ├── GradientSphere.jsx   # Sphere with fragment shader color mixing
  ├── AnimatedCube.jsx     # Cube with time-based pattern animations
  └── Lights.jsx           # Basic lighting (though shaders often handle their own)
```

## Concepts

### 🎨 What are Shaders?

Shaders are small programs that run directly on the GPU. They are extremely fast and allow for pixel-perfect control over your 3D objects.

1. **Vertex Shader**: Handles the position of each vertex. Use this for deforming shapes (e.g., water waves, wind blowing leaves).
2. **Fragment Shader**: Handles the color of each pixel. Use this for custom patterns, glows, and complex gradients.

### 🔌 Passing Data: Uniforms & Varyings

To make shaders interactive or animated, we need to pass data into them.

- **Uniforms**: Global variables passed from JavaScript to both shaders (e.g., `uTime`, `uColor`).
- **Varyings**: Variables passed from the Vertex shader to the Fragment shader (e.g., `vUv`, `vNormal`).

```javascript
// Passing a uniform in R3F
<shaderMaterial
  uniforms={{
    uTime: { value: 0 },
    uColor: { value: new THREE.Color("hotpink") },
  }}
  vertexShader={myVertexShader}
  fragmentShader={myFragmentShader}
/>
```

### 🌊 Vertex Manipulation

By using math functions like `sin()` or `cos()` in the vertex shader, we can create organic movement.

```glsl
// Minimal Vertex Shader for waves
void main() {
  vec3 newPosition = position;
  newPosition.z += sin(newPosition.x * 5.0 + uTime) * 0.1;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
```

### 🌈 Fragment Patterns

The fragment shader uses UV coordinates (0 to 1) to determine where a pixel is on the surface, allowing us to draw patterns.

```glsl
// Minimal Fragment Shader for a gradient
varying vec2 vUv;
void main() {
  gl_FragColor = vec4(vUv.x, vUv.y, 1.0, 1.0);
}
```

## Try This

- **Pulsing Sphere**: Use `uTime` and `sin()` in the vertex shader to make a sphere grow and shrink.
- **Hologram Effect**: Create horizontal scan lines in the fragment shader using `mod(vUv.y * 20.0, 1.0)`.
- **Mouse Interaction**: Pass the mouse position as a uniform and make the shader react when you move your cursor.
- **Color Shift**: Use `sin(uTime)` to smoothly transition between two colors using the `mix()` function.

## Common Issues

- **Floating Point Precision**: In GLSL, you **must** use decimals for floats (e.g., `1.0` instead of `1`). Forgetting this will cause a compilation error.
- **Semicolons**: Every line in GLSL must end with a semicolon `;`.
- **Performance**: While shaders are fast, complex loops or heavy branching (`if` statements) can still impact performance. Use math functions like `step()` or `mix()` instead of `if` where possible.

## Resources

- [The Book of Shaders](https://thebookofshaders.com/) - The best place to learn GLSL from scratch.
- [Shadertoy](https://www.shadertoy.com/) - A massive collection of community-created shaders for inspiration.
- [Three.js ShaderMaterial Docs](https://threejs.org/docs/#api/en/materials/ShaderMaterial)
