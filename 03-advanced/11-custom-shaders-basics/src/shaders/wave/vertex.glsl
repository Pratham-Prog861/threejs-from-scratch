uniform float uTime;
uniform float uWaveFrequency;
uniform float uWaveAmplitude;

varying vec2 vUv;
varying float vElevation;

void main() {
  vUv = uv;
  
  vec3 newPosition = position;
  
  // Create wave effect by modifying Y position
  float elevation = sin(newPosition.x * uWaveFrequency + uTime) * 
                    sin(newPosition.z * uWaveFrequency + uTime) * 
                    uWaveAmplitude;
  
  newPosition.y += elevation;
  vElevation = elevation;
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
