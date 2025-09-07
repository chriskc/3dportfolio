// Grain effect shader with controls
export const TestShader = {
    name: "TestShader",
    uniforms: {
        uGrainIntensity: { value: 0.15 },
        uGrainScale: { value: 300.0 },
        uTime: { value: 0.0 },
    },
    fragmentShader: /* glsl */ `
    uniform float uGrainIntensity;
    uniform float uGrainScale;
    uniform float uTime;
    
    void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
      // Generate animated grain pattern
      vec2 grainUv = uv * uGrainScale + uTime * 0.1;
      float grain = fract(sin(dot(grainUv, vec2(12.9898, 78.233))) * 43758.5453);
      
      // Apply grain to the color
      vec3 color = inputColor.rgb + (grain - 0.5) * uGrainIntensity;
      
      outputColor = vec4(color, inputColor.a);
    }
  `,
}
