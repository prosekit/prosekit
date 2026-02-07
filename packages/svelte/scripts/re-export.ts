import assert from 'node:assert/strict'
import fs from 'node:fs'

import packageJson from '../package.json' with { type: 'json' }

function main() {
  for (const [entryName, sourceFilePath] of Object.entries(packageJson.dev.entry)) {
    assert(entryName && typeof entryName === 'string')
    assert(sourceFilePath && typeof sourceFilePath === 'string')

    const prefix = './src/'
    const suffix = '.ts'
    assert(sourceFilePath.startsWith(prefix))
    assert(sourceFilePath.endsWith(suffix))
    const buildFilePath = `./build/${sourceFilePath.slice(prefix.length, -suffix.length)}.js`
    assert(fs.existsSync(`./dist/${buildFilePath}`), `File not found: ./dist/${buildFilePath}`)
    
    fs.writeFileSync(`./dist/${entryName}.js`, `export * from '${buildFilePath}'`)
    fs.writeFileSync(`./dist/${entryName}.d.ts`, `export * from '${buildFilePath}'`)
  }
}

main()
