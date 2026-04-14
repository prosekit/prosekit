import assert from 'node:assert/strict'
import fs from 'node:fs'

import packageJson from '../package.json' with { type: 'json' }

function main() {
  for (const [exportName, exportValue] of Object.entries(packageJson.exports ?? {})) {
    assert(exportName && typeof exportName === 'string')
    const outputName = exportName === '.' ? 'index' : exportName.replace(/^\.\//, '')
    const sourcePath = typeof exportValue === 'string' ? exportValue : exportValue.default
    assert(sourcePath && typeof sourcePath === 'string')

    const prefix = './src/'
    const suffix = '.ts'
    assert(sourcePath.startsWith(prefix))
    assert(sourcePath.endsWith(suffix))
    const buildFilePath = `./build/${sourcePath.slice(prefix.length, -suffix.length)}.js`
    assert(fs.existsSync(`./dist/${buildFilePath}`), `File not found: ./dist/${buildFilePath}`)

    fs.writeFileSync(`./dist/${outputName}.js`, `export * from '${buildFilePath}'`)
    fs.writeFileSync(`./dist/${outputName}.d.ts`, `export * from '${buildFilePath}'`)
  }
}

main()
