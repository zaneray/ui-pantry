export default {
  "exclude": 'node_modules/**',
  "runtimeHelpers": true,
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "shippedProposals": true,
        "targets": {
          "browsers": ["> 1%", "last 2 versions", "ie >= 11", "not ie <= 8"],
          "ie": 11
        }
      }
    ]
  ],
  "plugins": [
    "@babel/plugin-transform-runtime",
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-transform-typeof-symbol",
    "@babel/plugin-transform-async-to-generator",
    "@babel/plugin-transform-arrow-functions"
  ]
}
