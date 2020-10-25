module.exports = {
  runtimeCompiler: true,
  pwa: {
    workboxOptions: {
      exclude: ['*.gitkeep', '*.css'],
    }
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vue_svg_game/'
    : '/'
}