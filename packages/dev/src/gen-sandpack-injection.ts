import path, { basename } from 'node:path'
import { fileURLToPath } from 'node:url'

import stringHash from '@sindresorhus/string-hash'

import { vfs } from './virtual-file-system'

export async function genSnadpackInjection() {
  const packages = await vfs.getPublicPackages()

  const dependencies: Record<string, string> = {}
  for (const pkg of packages) {
    Object.assign(dependencies, pkg.packageJson.dependencies ?? {})
  }

  const publicPackagesNames = packages.map((pkg) => pkg.packageJson.name)
  for (const packageName of publicPackagesNames) {
    delete dependencies[packageName]
  }

  const importCode: string[] = []
  const filesCode: string[] = []

  for (const pkg of packages) {
    for (const filePath of await vfs.getFilePathsByPackage(pkg)) {
      const fileId = 'file' + String(stringHash(filePath))
      importCode.push(`import ${fileId} from '../../${filePath}?raw'`)

      const filePathRelativeToPackage = path.relative(pkg.relativeDir, filePath)
      filesCode.push(
        `  "/node_modules/${pkg.packageJson.name}/${filePathRelativeToPackage}": { hidden: true, code: ${fileId} },`,
      )
    }
  }

  const outputFileCode =
    importCode.join('\n') +
    '\n\n' +
    'export const files = {\n' +
    filesCode.join('\n') +
    '\n}'

  const outputDepCode = `export const dependencies = ${JSON.stringify(
    dependencies,
    null,
    2,
  )}`

  const outputCode =
    [
      '/* eslint-disable */',
      `// This file is generated from ${currentFilename}`,
      outputFileCode,
      outputDepCode,
    ].join('\n\n') + '\n'

  await vfs.updateText(
    'website/components/sandpack-injection.gen.ts',
    outputCode,
  )
}

const currentFilename = basename(fileURLToPath(import.meta.url))
