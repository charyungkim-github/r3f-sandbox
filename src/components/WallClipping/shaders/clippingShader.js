export const uniforms = `
  uniform float near;
  uniform float far;
  uniform float size;
`

export const fragmentShader = `
  #include <color_fragment>

  float z = gl_FragCoord.z*gl_FragCoord.w;

  if(z < far) {
    float scale = 0.8*size*(1.0-smoothstep( far, near, z ));
    vec4 xy = size*round(gl_FragCoord/size);
    if(distance(xy,gl_FragCoord) < scale) discard;
  }
  else discard;
`