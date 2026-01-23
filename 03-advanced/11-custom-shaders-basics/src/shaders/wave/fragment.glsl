varying vec2 vUv;
varying float vElevation;

void main() {
  // Color based on elevation (height)
  vec3 depthColor = vec3(0.1, 0.2, 0.5);
  vec3 surfaceColor = vec3(0.5, 0.8, 1.0);
  
  float mixStrength = (vElevation + 0.3) / 0.6;
  vec3 color = mix(depthColor, surfaceColor, mixStrength);
  
  gl_FragColor = vec4(color, 1.0);
}
