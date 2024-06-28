export const fresnelVertexShader = `
  varying vec3 v_Normal;
  varying vec3 v_ViewDir;

  void main() {
    vec4 viewPos = modelViewMatrix * vec4(position, 1.0);

    v_Normal = normalMatrix * normal;
    v_ViewDir = normalize(-viewPos.xyz);
  }
`

// export const fresnelFragmentShader = `
//   uniform vec3 u_diffuse;
//   uniform float u_intensity;
//   uniform float u_power;

//   varying vec3 v_Normal;
//   varying vec3 v_ViewDir;

//   void main() {
//     float NdotV = pow(saturate(dot(v_ViewDir, v_Normal)), u_power);
//     csm_DiffuseColor = vec4(u_diffuse * u_intensity, NdotV);
//   }
// `

export const fresnelFragmentShader = `
  uniform vec3 u_diffuse;
  uniform vec3 u_edgeColor;
  uniform float u_power;
  uniform float u_intensity;

  varying vec3 v_Normal;
  varying vec3 v_ViewDir;

  void main() {
    // Calculate the dot product between the view direction and the normal
    float NdotV = dot(normalize(v_ViewDir), normalize(v_Normal));

    // Calculate the Fresnel term using Schlick's approximation
    float fresnel = pow(1.0 - NdotV, u_power);

    // Calculate the final color with the Fresnel effect
    vec3 fresnelColor = mix(u_edgeColor, u_diffuse, fresnel);

    // Apply the intensity and Fresnel effect to the diffuse color
    vec3 finalColor = u_intensity * fresnelColor;

    // Output the final color
    csm_DiffuseColor = vec4(finalColor, 1.0);
  }
`