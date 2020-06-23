import cjs from 'rollup-plugin-commonjs' // Convert CommonJS modules to ES6
import vue from 'rollup-plugin-vue' // Handle .vue SFC files
import babel from 'rollup-plugin-babel' // Transpile/polyfill with reasonable browser support
import node from 'rollup-plugin-node-resolve'; // Resolve dependencies
import pkg from "./package.json";

const babelConfig = {
  exclude: 'node_modules/**',
  runtimeHelpers: true,
  babelrc: false,
  presets: [['@babel/preset-env', { modules: false }]]
}

export default [
  // Common JS Build.
  {
    input: 'src/index.js',
    external: ['vue'],
    output: {
      format: 'cjs',
      file: pkg.main,
      name: 'common',
      exports: 'named',
      globals: {
        vue: 'Vue'
      }
    },
    plugins: [
      node({
        extensions: ['.vue', '.js']
      }),
      vue({
        template: {
          isProduction: true,
          optimizeSSR: true
        },
        style: {
          map: false
        }
      }),
      babel(babelConfig),
      cjs()
    ]
  },
  // ESM build to be used with webpack/rollup.
  {
    input: 'src/index.js',
    output: {
      format: 'esm',
      file: pkg.module,
      name: 'module',
      exports: 'named',
      globals: {
        'vue': 'Vue',
      }
    },
    plugins: [
      node({
        extensions: ['.vue', '.js']
      }),
      vue({
        template: {
          isProduction: true,
          optimizeSSR: true
        },
        style: {
          map: false
        }
      }),
      babel(babelConfig),
      cjs()
    ]
  }
]
