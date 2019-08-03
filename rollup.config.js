import litSass from '@ponday/rollup-plugin-lit-sass';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import common from 'rollup-plugin-commonjs';
import generatePackageJson from 'rollup-plugin-generate-package-json'

export default {
  input: 'elements/button/src/button.element.ts',
  output: {
    file: 'dist/button.js',
    format: 'esm'
  },
  plugins: [
    typescript({
      clean: true,
      typescript: require('typescript')
    }),
    common(),
    litSass(),
    terser(),
    generatePackageJson()
  ]
};
