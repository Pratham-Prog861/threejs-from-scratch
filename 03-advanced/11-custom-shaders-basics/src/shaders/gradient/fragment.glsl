uniform float uTime;
uniform vec3 uColorA;
uniform vec3 uColorB;

varying vec2 vUv;
varying vec3 vPosition;

void main() {
  // Create animated gradient based on UV and time
  float gradient = vUv.y + sin(vUv.x * 10.0 + uTime * 2.0) * 0.1;
  
  // Mix two colors based on gradient
  vec3 color = mix(uColorA, uColorB, gradient);
  
  gl_FragColor = vec4(color, 1.0);
}
