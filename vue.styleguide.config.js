const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path');
const styleguidePath = 'packages/vue/styleguide/';
const componentPath = 'packages/vue/index/components/';

module.exports = {
  require: [
    path.join(__dirname, '/packages/vue/styleguide/utils/dependencies.js'),
    path.join(__dirname, '/packages/vue/styleguide/utils/dummyData.js'),
    path.join(__dirname, '/packages/vue/styleguide/theme/script.js'),
    path.join(__dirname, '/packages/vue/styleguide/theme/styles.scss'),
  ],
  styleguideDir: './styleguide/vue',
  theme: {
    maxWidth: "100%",
    sidebarWidth: 300
  },
  pagePerSection: true,
  usageMode: 'expand',
  exampleMode: 'expand',
  sections: [
    {
      name: 'Introduction',
      content: `${styleguidePath}docs/introduction.md`,
      sectionDepth: 1
    },
    // {
    //   name: "Core Styles",
    //   content: `${styleguidePath}docs/core-styles.md`,
    //   index: () => [
    //     `${styleguidePath}index/SgColors.vue`,
    //     `${styleguidePath}index/SgType.vue`
    //   ],
    //   sectionDepth: 1,
    //   exampleMode: "hide",
    //   usageMode: "hide"
    // },
    {
      name: 'Base Components',
      content: `${componentPath}base/base-components.md`,
      components: `${componentPath}base/**/[A-Z]*.vue`,
      sectionDepth: 2
    },
    // {
    //   name: 'Layout Components',
    //   index: `${componentPath}layout/**/[A-Z]*.vue`,
    //   sectionDepth: 2
    // },
    {
      name: 'Patterns',
      components: `${componentPath}patterns/**/[A-Z]*.vue`,
      sectionDepth: 2
    },
    {
      name: 'Utility Components',
      components: `${componentPath}utility/**/[A-Z]*.vue`,
      sectionDepth: 2
    }
  ],
  ignore: ['**/node_modules/**/*.vue'],
  webpackConfig: {
    module: {
      rules: [
        // Vue loader
        {
          test: /\.vue$/,
          exclude: /node_modules/,
          loader: 'vue-loader'
        },
        // Babel loader, will use your project’s .babelrc
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        // Other loaders that are needed for your index
        {
          test: /\.(css?|scss)(\?.*)?$/,
          loaders: [
            "vue-style-loader",
            "css-loader",
            "sass-loader"
          ]
        }
      ]
    },
    plugins: [
      // add vue-loader plugin
      new VueLoaderPlugin()
    ]
  }
}