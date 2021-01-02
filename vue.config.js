const { GenerateSW } = require("workbox-webpack-plugin");

module.exports = {
  runtimeCompiler: true,
  css: { sourceMap: true },
  productionSourceMap: true,
  pwa: {
    workboxOptions: {
      exclude: [/\.gitkeep/]
    }
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vue_svg_game/'
    : '/', 
  configureWebpack: {
    plugins: [new GenerateSW()]
  }
}