module.exports = {
  runtimeCompiler: true,
  pwa: {
    workboxOptions: {
      exclude: ['*.gitkeep'],
    }
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vue_svg_game/'
    : '/'
}