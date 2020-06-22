import commonjs from '@rollup/plugin-commonjs'; // Convert CommonJS modules to ES6
import vue from 'rollup-plugin-vue'; // Handle .vue SFC files
import babel from 'rollup-plugin-babel'; // Transpile/polyfill with reasonable browser support
import resolve from 'rollup-plugin-node-resolve'; // Resolve dependencies

export default [
  // Common JS Build.
  {
    input: 'src/index.js',
    output: {
      format: 'umd',
      file: 'dist/ZrComponents.umd.js',
      name: 'common',
      globals: {
        'vue': 'Vue',
      }
    },
    plugins: [
      commonjs(),
      vue({
        css: true, // Dynamically inject css as a <style> tag
        compileTemplate: true, // Explicitly convert template to render function
      }),
      babel({
        exclude: 'node_modules/**' // only transpile our source code
      }),
      resolve()
    ]
  },
  // ESM build to be used with webpack/rollup.
  {
    input: 'src/index.js',
    output: {
      format: 'es',
      file: 'dist/ZrComponents.esm.js',
      name: 'module',
      globals: {
        'vue': 'Vue',
      }
    },
    plugins: [
      commonjs(),
      vue({
        css: true, // Dynamically inject css as a <style> tag
        compileTemplate: true, // Explicitly convert template to render function
      }),
      babel({
        exclude: 'node_modules/**' // only transpile our source code
      }),
      resolve()
    ]
  },
  // Plugin build.
  {
    input: 'src/wrapper.js',
    output: {
      format: 'iife',
      file: 'dist/ZrComponents.min.js',
      name: 'plugin',
      globals: {
        'vue': 'Vue',
      }
    },
    plugins: [
      commonjs(),
      vue({
        css: true, // Dynamically inject css as a <style> tag
        compileTemplate: true, // Explicitly convert template to render function
      }),
      babel({
        exclude: 'node_modules/**' // only transpile our source code
      }),
      resolve()
    ]
  }
]
