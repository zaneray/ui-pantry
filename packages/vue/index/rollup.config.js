import vue from 'rollup-plugin-vue'

export default [
  // Common JS Build.
  {
    input: 'src/index.js',
    output: {
      format: 'cjs',
      file: 'dist/ZrComponents.js'
    },
    plugins: [
      vue()
    ]
  },
  // ESM build to be used with webpack/rollup.
  {
    input: 'src/index.js',
    output: {
      format: 'esm',
      file: 'dist/ZrComponents.esm.js'
    },
    plugins: [
      vue()
    ]
  },
  // SSR build.
  {
    input: 'src/index.js',
    output: {
      format: 'cjs',
      file: 'dist/ZrComponents.ssr.js'
    },
    plugins: [
      vue({ template: { optimizeSSR: true } })
    ]
  },
  // Plugin build.
  {
    input: 'src/wrapper.js',
    output: {
      format: 'iife',
      globals: {
        'vue': 'Vue'
      },
      file: 'dist/ZrComponents.plugin.js'
    },
    plugins: [
      vue()
    ]
  }
]
