uniform sampler2D uPositions;
uniform float uSize;
uniform vec3 uColor;

varying vec3 vColor;

void main() {
  vec3 pos = texture2D(uPositions, position.xy).xyz;

  vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;

  gl_PointSize = uSize;
  // gl_PointSize *= step(1.0 - (1.0/64.0), position.x) + 0.5;

  vColor = uColor;
}
