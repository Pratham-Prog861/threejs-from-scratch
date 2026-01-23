uniform float uTime;

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

void main() {
  // Create rainbow effect based on position and time
  vec3 color = vec3(
    sin(vPosition.x + uTime) * 0.5 + 0.5,
    sin(vPosition.y + uTime * 1.5) * 0.5 + 0.5,
    sin(vPosition.z + uTime * 2.0) * 0.5 + 0.5
  );
  
  // Add fresnel effect (edges glow)
  vec3 viewDirection = normalize(cameraPosition - vPosition);
  float fresnel = pow(1.0 - dot(vNormal, viewDirection), 2.0);
  color += fresnel * 0.3;
  
  gl_FragColor = vec4(color, 1.0);
}
