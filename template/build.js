#!/usr/bin/env node

const pkg = require('./package.json')
const common = require('./build.config.js')
const { build } = require('estrella')

build({
  ...common,
  entry: 'src/index.js',
  outfile: pkg.main
})
