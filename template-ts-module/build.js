#!/usr/bin/env node

const { build } = require('estrella')
const pkg = require('./package.json')

build({
  format: 'cjs',
  entry: 'src/index.ts',
  outfile: pkg.main,
})

build({
  format: 'esm',
  entry: 'src/index.ts',
  outfile: pkg.module,
})

build({
  format: 'iife',
  entry: 'src/index.ts',
  outfile: pkg.unpkg,
  globalName: pkg.name,
})

