# 05 - Basic Animations

Bring your 3D world to life! In this project, we explore different ways to animate objects in Three.js, from simple rotations to complex GSAP tweens.

## What You'll Learn

- **Animation Loop**: The core `requestAnimationFrame` cycle
- **Time-Based Animation**: Using `THREE.Clock` for smooth, frame-rate independent motion
- **Math Functions**: Using `Math.sin` and `Math.cos` for waves and orbits
- **Delta Time**: Ensuring consistent speed across different devices
- **GSAP Integration**: Using the GreenSock Animation Platform for complex tweens
- **Camera Animation**: Smoothly moving the camera to focus on specific objects

## How to Run

```bash
cd 05-basic-animations
npm install
npm run dev
```

## Try This

- **Press 'R'**: Trigger a GSAP animation that moves the camera to a random object
- **Press 'T'**: Make the cylinder do a 360-degree spin jump
- **Observe**: Notice how different objects move differently:
  - **Cube**: Simple constant rotation
  - **Sphere**: Bobs up and down (Sine wave)
  - **Torus**: Rotates based on elapsed time
  - **Blue Sphere**: Orbits around the center

## Key Concepts

**requestAnimationFrame**: The browser API that tells the browser you wish to perform an animation.
**THREE.Clock**: A helper class to keep track of time, essential for smooth animations.
**Delta Time**: The time difference between the current frame and the last frame. Using this ensures your animation runs at the same speed on a 60Hz screen and a 144Hz screen.
**GSAP (GreenSock)**: A powerful JavaScript animation library. We use it here for "tweens" - animating a value from A to B over time with easing (like "bounce" or "smooth").
**Sine/Cosine**: Trigonometric functions perfect for creating repeating, wave-like motions (bouncing, orbiting).

## Resources

- [Three.js Animation System](https://threejs.org/docs/#manual/en/introduction/Animation-system)
- [GSAP Documentation](https://greensock.com/docs/)
- [THREE.Clock](https://threejs.org/docs/#api/en/core/Clock)
