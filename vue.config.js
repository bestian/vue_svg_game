module.exports = {
  runtimeCompiler: true,
  css: { sourceMap: true },
  productionSourceMap: true,

  pwa: {
    workboxOptions: {
      exclude: [/\.gitkeep/]
    }
  },

  publicPath: '',

  pluginOptions: {
    cordovaPath: 'src-cordova'
  }
}
