/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import fs from 'node:fs/promises'

import { readPackage } from 'read-pkg'

function assertString(value: unknown): asserts value is string {
  if (typeof value !== 'string') {
    throw new TypeError(`Expect string but get ${typeof value}`)
  }
}

async function main() {
  const packageJson: any = (await readPackage()) as any

  for (const entry of Object.keys(packageJson.exports)) {
    let sourceFilePath = packageJson.exports[entry]
    if (typeof sourceFilePath !== 'string') {
      sourceFilePath = sourceFilePath['default']
    }
    assertString(sourceFilePath)

    const inputPath = sourceFilePath
      .replace('src/', 'build/')
      .replace(/\.ts$/, '')
    const outputJsFilePath = packageJson.publishConfig.exports[entry]['default']
    const outputDtsFilePath = packageJson.publishConfig.exports[entry]['types']
    assertString(outputJsFilePath)
    assertString(outputDtsFilePath)

    await fs.writeFile(outputJsFilePath, `export * from '${inputPath}'`)
    await fs.writeFile(outputDtsFilePath, `export * from '${inputPath}'`)
  }
}

void main()
