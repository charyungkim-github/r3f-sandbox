export const vertex = `
    varying vec2 csm_vUv;
    void main() {
        csm_vUv = uv;
        csm_Position = position * vec3(1.0);
    }
`;

export const fragment = `
    uniform sampler2D texture1;
    uniform sampler2D texture2;
    uniform sampler2D texture3;
    uniform sampler2D texture4;
    uniform sampler2D splatMap;

    // Adding uniforms for texture repeat
    uniform vec2 repeatTexture1;
    uniform vec2 repeatTexture2;
    uniform vec2 repeatTexture3;
    uniform vec2 repeatTexture4;

    varying vec2 csm_vUv;

    void main() {
        // Adjusting the UVs for texture repeat
        vec2 uv1 = csm_vUv * repeatTexture1;
        vec2 uv2 = csm_vUv * repeatTexture2;
        vec2 uv3 = csm_vUv * repeatTexture3;
        vec2 uv4 = csm_vUv * repeatTexture4;

        vec4 splat = texture2D(splatMap, csm_vUv);
        vec4 color1 = texture2D(texture1, uv1);
        vec4 color2 = texture2D(texture2, uv2);
        vec4 color3 = texture2D(texture3, uv3);
        vec4 color4 = texture2D(texture4, uv4);

        // Blend the textures based on the splat map's RGB channels
        vec4 blendedColor = splat.r * color1 + splat.g * color2 + splat.b * color3 + (1.0 - splat.a) * color4;

        csm_DiffuseColor = vec4(blendedColor.rgb, 1.0);
    }
`;
