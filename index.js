#!/usr/bin/env node

const path = require('path')
const fs = require('fs-extra')
const argv = require('minimist')(process.argv.slice(2))

async function init() {
  const targetDir = argv._[0] || '.'
  const cwd = process.cwd()
  const root = path.join(cwd, targetDir)
  const renameFiles = {
    _gitignore: '.gitignore',
    _env: '.env',
    _env_local: '.env.local',
  }
  console.log(`Scaffolding project in ${root}...`)

  await fs.ensureDir(root)
  const existing = await fs.readdir(root)
  if (existing.length) {
    console.error(`Error: target directory is not empty.`)
    process.exit(1)
  }

  const lang = (argv.ts || argv.typescript) ? 'ts' : 'js'

  const templateDir = path.join(
    __dirname,
    `template-${lang}-${argv.t || argv.template || 'basic'}`,
  )
  const write = async (file, content) => {
    const targetPath = renameFiles[file]
      ? path.join(root, renameFiles[file])
      : path.join(root, file)
    if (content) {
      await fs.writeFile(targetPath, content)
    } else {
      await fs.copy(path.join(templateDir, file), targetPath)
    }
  }

  const files = await fs.readdir(templateDir)
  for (const file of files.filter((f) => f !== '_package.json')) {
    await write(file)
  }

  const name = path.basename(root)
  const pkg = require(path.join(templateDir, `_package.json`))

  for (const key in pkg) {
    if (pkg.hasOwnProperty(key)) {
      var value = pkg[key]
      if (typeof value === 'string') {
        pkg[key] = value.replace('estrella-starter', name)
      }
    }
  }

  await write('package.json', JSON.stringify(pkg, null, 2))

  console.log(`\nDone. Now run:\n`)
  if (root !== cwd) {
    console.log(`  cd ${path.relative(cwd, root)}`)
  }
  console.log(`  npm install (or \`yarn\`)`)
  console.log()
  console.log(`To start the development server:`)
  console.log(`  npm start (or \`yarn\`)`)
  console.log()
  console.log(`To build the static site:`)
  console.log(`  npm run build (or \`yarn build\`)`)
}

init().catch((e) => {
  console.error(e)
})
