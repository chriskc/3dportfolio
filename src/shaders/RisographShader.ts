// Properly structured shader for postprocessing
export const TestShader = {
  name: 'TestShader',
  fragmentShader: /* glsl */`
    void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
      // Very simple effect - just pass through with slight darkening
      outputColor = vec4(inputColor.rgb * 0.95, inputColor.a);
    }
  `
};