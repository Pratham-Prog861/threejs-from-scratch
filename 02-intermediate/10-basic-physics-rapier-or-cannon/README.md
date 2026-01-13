# 10 - Basic Physics with Rapier

Learn how to add realistic physics to React Three Fiber scenes using **Rapier**, a fast, robust, and easy-to-use WebAssembly physics engine. This project demonstrates falling objects, collisions, and interactive physics simulations.

## What You'll Learn

- **@react-three/rapier**: Setting up the physics world in R3F
- **RigidBody Types**: Understanding Dynamic, Fixed, and Kinematic bodies
- **Colliders**: Using automatic and manual colliders (Cuboid, Ball)
- **Physics Properties**: Configuring restitution (bounciness), friction, and density
- **Interaction**: Creating drag-and-drop physics objects using kinematic control
- **Performance**: Optimizing physics simulations for the web

## How to Run

```bash
cd 10-basic-physics-rapier-or-cannon
npm install
npm run dev
```

**Controls:**

- **Click on the ground**: Spawn a random falling cube
- **Drag the red sphere**: Move it around to push other objects (switches to kinematic mode)
- **Orbit**: Left click + drag to rotate camera

## File Structure

```bash
src/components/
  ├── Scene.jsx              # Main entry with <Physics> provider
  ├── PhysicsGround.jsx      # Fixed ground plane with click handler
  ├── FallingCubes.jsx       # Dynamic cubes spawned on click
  ├── InteractiveSphere.jsx  # Draggable sphere (Kinematic <-> Dynamic switching)
  ├── Walls.jsx              # Invisible fixed walls to keep objects in bounds
  └── Lights.jsx             # Scene lighting setup
```

## Concepts

### The Physics World

To enable physics, wrap your scene in the `<Physics>` component. This creates a simulation world where gravity and collisions exist.

```jsx
import { Physics } from "@react-three/rapier";

<Physics gravity={[0, -9.81, 0]}>
  <SceneContent />
</Physics>;
```

### 📦 RigidBody Components

Every object that participates in the physics simulation needs a `<RigidBody>`.

- **Dynamic (Default)**: Affected by gravity and collisions (e.g., falling cubes).
- **Fixed**: Does not move, infinite mass (e.g., ground, walls).
- **Kinematic**: Moved manually by code, but affects other objects (e.g., moving platforms, dragged items).

```jsx
<RigidBody type="dynamic" restitution={0.8} friction={0.5}>
  <mesh>...</mesh>
</RigidBody>
```

### 🖱️ Interactive Physics (Kinematic Control)

To drag a physics object, we can't just update its position directly because the physics engine controls it. Instead, we:

1. Switch it to **Kinematic** mode on pointer down.
2. Update its position using `setNextKinematicTranslation` in `useFrame`.
3. Switch it back to **Dynamic** mode on pointer up.

```javascript
// Inside useFrame
if (isDragging) {
  rigidBodyRef.current.setNextKinematicTranslation(mousePosition);
}
```

### Colliders

Rapier can automatically generate colliders from your mesh geometry, or you can specify them manually for better performance.

- `colliders="cuboid"`: Box shape (fastest)
- `colliders="ball"`: Sphere shape (fast)
- `colliders="hull"`: Convex hull (good for complex shapes)
- `colliders="trimesh"`: Exact mesh shape (slow, use sparingly)

## Try This

- **Domino Effect**: Create a row of tall, thin blocks and knock them over.
- **Low Gravity**: Change the `<Physics gravity={[0, -1, 0]}>` to simulate Moon gravity.
- **Bouncy Room**: Increase `restitution` on the walls and floor to make everything bounce like superballs.
- **Explosions**: Use `applyImpulse` to blast objects away from a central point.

## Common Issues

- **Objects falling through floor**: Ensure your ground has a `Fixed` RigidBody and the falling objects aren't moving too fast (or increase physics steps).
- **Jittery movement**: When moving kinematic objects, always use `setNextKinematicTranslation` inside `useFrame`, never set `position` directly.
- **Performance drops**: Avoid `colliders="trimesh"` for dynamic objects. Use primitive shapes (cuboid, ball, capsule) whenever possible.

## Resources

- [React Three Rapier Documentation](https://github.com/pmndrs/react-three-rapier)
- [Rapier Physics Engine](https://rapier.rs/)
- [RigidBody Props & Methods](https://github.com/pmndrs/react-three-rapier/blob/main/packages/react-three-rapier/src/components/RigidBody.tsx)
