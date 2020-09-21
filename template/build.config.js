const pkg = require('./package.json')

module.exports = {
  bundle: true,
  minify: false,
  platform: 'node',
  target: 'es2015',
  sourcemap: 'inline',
  loader: {
    '.js': 'jsx',
  },
  jsxFactory: 'h',
  external: [
    ...Object.keys(pkg.dependencies ?? {}),
    ...Object.keys(pkg.devDependencies ?? {}),
    ...Object.keys(pkg.peerDependencies ?? {}),
  ],
}
