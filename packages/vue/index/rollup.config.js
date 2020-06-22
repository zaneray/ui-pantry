import commonjs from '@rollup/plugin-commonjs'; // Convert CommonJS modules to ES6
import VuePlugin from 'rollup-plugin-vue'; // Handle .vue SFC files
import { getBabelOutputPlugin } from "@rollup/plugin-babel"; // Transpile/polyfill with reasonable browser support
import resolve from 'rollup-plugin-node-resolve'; // Resolve dependencies
import pkg from "./package.json";

export default [
  // Common JS Build.
  {
    input: 'src/index.js',
    output: {
      format: 'cjs',
      file: pkg.main,
      name: 'common',
      globals: {
        'vue': 'Vue',
      }
    },
    plugins: [
      commonjs(),
      VuePlugin({
        css: true, // Dynamically inject css as a <style> tag
        compileTemplate: true, // Explicitly convert template to render function
      }),
      getBabelOutputPlugin({
        presets: ["@babel/preset-env"]
      }),
      resolve()
    ]
  },
  // ESM build to be used with webpack/rollup.
  {
    input: 'src/index.js',
    output: {
      format: 'es',
      file: pkg.module,
      name: 'module',
      globals: {
        'vue': 'Vue',
      }
    },
    plugins: [
      commonjs(),
      VuePlugin({
        css: true, // Dynamically inject css as a <style> tag
        compileTemplate: true, // Explicitly convert template to render function
      }),
      getBabelOutputPlugin({
        presets: ["@babel/preset-env"]
      }),
      resolve()
    ]
  }
]
