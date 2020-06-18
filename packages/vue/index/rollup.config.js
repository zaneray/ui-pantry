import VuePlugin from 'rollup-plugin-vue';
import css from "rollup-plugin-css-only";

export default {
  input: 'components/base/ZrAlert.vue',
  output: {
    format: 'esm',
    file: 'dist/MyComponent.js'
  },
  plugins: [
    VuePlugin({
      customBlocks: [
        '!docs', // exclude <docs>
        '!*', // exclude everything else
      ]
    }),
    css({
      output: false
    }),
  ]
}
