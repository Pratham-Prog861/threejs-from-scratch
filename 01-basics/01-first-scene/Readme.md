# 🎬 Your First Three.js Scene

Hey there! Welcome to your very first Three.js project. In this project, we will create a basic 3D scene with a cube, set up a camera, and render everything to the screen. This is the foundation of every Three.js application you'll ever build!

Think of this as your "Hello World" moment in the 3D web world. 🚀

---

## 🎯 What You'll Learn

In this project, you'll get hands-on with these core Three.js concepts:

- **Scene**: The container that holds all your 3D objects, lights, and cameras
- **Camera**: Your viewpoint into the 3D world (we'll use PerspectiveCamera)
- **Renderer**: The engine that draws your 3D scene onto the canvas
- **Geometry**: The shape of your 3D object (BoxGeometry for our cube)
- **Material**: The "skin" or surface appearance of your object (MeshBasicMaterial)
- **Mesh**: The combination of geometry + material that creates a visible 3D object

---

## 🧩 Three.js APIs Used

Here are the key APIs you'll be working with:

1. **`THREE.Scene()`** - Creates a new 3D scene
2. **`THREE.PerspectiveCamera(fov, aspect, near, far)`** - Creates a camera with perspective projection
3. **`THREE.WebGLRenderer()`** - Creates a WebGL renderer
4. **`THREE.BoxGeometry(width, height, depth)`** - Creates a cube/box shape
5. **`THREE.MeshBasicMaterial({ color })`** - Creates a simple colored material
6. **`THREE.Mesh(geometry, material)`** - Combines geometry and material into a renderable object
7. **`scene.add(mesh)`** - Adds objects to your scene
8. **`renderer.render(scene, camera)`** - Renders the scene from the camera's perspective

---

## 📊 How It All Works Together

Here's a visual breakdown of the Three.js scene structure:

```bash
┌─────────────────────────────────────┐
│          Browser Window             │
│  ┌───────────────────────────────┐  │
│  │         Canvas (Renderer)     │  │
│  │                               │  │
│  │    ┌─────────────────────┐    │  │
│  │    │      Scene          │    │  │
│  │    │                     │    │  │
│  │    │   📦 Mesh           │    │  │
│  │    │   (Cube)            │    │  │
│  │    │                     │    │  │
│  │    │   📷 Camera ────────┼────┼──── Views the scene
│  │    │                     │    │  │
│  │    └─────────────────────┘    │  │
│  │                               │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

**The Flow:**

1. Create a **Scene** (the stage)
2. Add a **Camera** (the viewer)
3. Create **Geometry** + **Material** = **Mesh** (the actor)
4. Add the Mesh to the Scene
5. Use the **Renderer** to draw everything on the canvas

---

## 🎨 The Basic Setup

```javascript
// 1. Create the scene
const scene = new THREE.Scene();

// 2. Create the camera (field of view, aspect ratio, near, far)
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

// 3. Create the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 4. Create a cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// 5. Render the scene
renderer.render(scene, camera);
```

---

## 🧪 Try This!

Now it's your turn to experiment! Try these challenges:

### Challenge 1: Change the Color 🎨

- Change the cube's color from green to your favorite color
- Hint: Modify the `color` property in `MeshBasicMaterial`
- Try colors like `0xff0000` (red), `0x0000ff` (blue), or `0xffff00` (yellow)

### Challenge 2: Move the Cube 📍

- Change the cube's position using `cube.position.x`, `cube.position.y`, or `cube.position.z`
- Try: `cube.position.x = 2;` to move it to the right

### Challenge 3: Add Another Object ➕

- Create a second cube or try a different geometry like `SphereGeometry` or `ConeGeometry`
- Give it a different color and position
- Don't forget to add it to the scene!

### Challenge 4: Resize the Cube 📏

- Make the cube bigger or smaller by changing the BoxGeometry parameters
- Try: `new THREE.BoxGeometry(2, 0.5, 1)` for a rectangular box

---

## 📚 Learn More

Want to dive deeper? Check out these official resources:

- **[Three.js Documentation](https://threejs.org/docs/)** - Complete API reference
- **[Three.js Examples](https://threejs.org/examples/)** - Hundreds of live examples
- **[Creating a Scene](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene)** - Official getting started guide
- **[PerspectiveCamera](https://threejs.org/docs/#api/en/cameras/PerspectiveCamera)** - Understanding camera parameters
- **[WebGLRenderer](https://threejs.org/docs/#api/en/renderers/WebGLRenderer)** - Renderer options and methods

---

## 🎓 Key Takeaways

By completing this project, you've learned:

✅ How to set up a basic Three.js scene  
✅ The three essential components: Scene, Camera, Renderer  
✅ How to create and add 3D objects (Mesh = Geometry + Material)  
✅ How to render your scene to the browser

This is just the beginning! In the next lessons, we'll add animations, lighting, and interactivity. 🚀

---

**Happy Coding! 💻✨**

_Remember: Every expert was once a beginner. Keep experimenting and have fun!_
