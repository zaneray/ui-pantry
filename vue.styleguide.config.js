const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path');

module.exports = {
  require: [
    path.join(__dirname, '/packages/vue/styleguide/utils/dependencies.js'),
    path.join(__dirname, '/packages/vue/styleguide/utils/dummyData.js'),
    path.join(__dirname, '/packages/vue/styleguide/theme/script.js'),
    path.join(__dirname, '/packages/vue/styleguide/theme/styles.scss'),
  ],
  theme: {
    maxWidth: "100%",
    sidebarWidth: 300
  },
  pagePerSection: true,
  usageMode: 'expand',
  exampleMode: 'expand',
  components: 'packages/vue/components/**/[A-Z]*.vue',
  ignore: ['**/node_modules/**/[A-Z]*.vue'],
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
        // Other loaders that are needed for your components
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