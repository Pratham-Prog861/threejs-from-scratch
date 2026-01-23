uniform float uTime;

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

void main() {
  vUv = uv;
  vPosition = position;
  vNormal = normal;
  
  vec3 newPosition = position;
  
  // Add pulsating effect
  float pulse = sin(uTime * 2.0) * 0.1;
  newPosition += normal * pulse;
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
