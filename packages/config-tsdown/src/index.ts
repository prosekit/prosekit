import { defu } from 'defu'
import { readPackageUpSync } from 'read-package-up'
import type { UserConfig } from 'tsdown'

export function config(userConfig?: UserConfig): UserConfig {
  const pkg = readPackageUpSync({ cwd: userConfig?.cwd })
  if (!pkg) {
    throw new Error('No package.json found')
  }

  const packageJson = pkg.packageJson as {
    exports?: Record<string, string | Record<string, string>>
  }

  const tsdownEntry: Record<string, string> = {}
  for (const [exportName, exportValue] of Object.entries(packageJson.exports ?? {})) {
    let entryName: string = exportName
    let entryValue: string | undefined = undefined

    if (entryName === '.') {
      entryName = 'index'
    }
    if (entryName.startsWith('./')) {
      entryName = entryName.slice(2)
    }
    if (entryName.endsWith('.css')) {
      entryName = entryName.slice(0, -4)
    }

    if (typeof exportValue === 'string') {
      entryValue = exportValue
    } else if (exportValue && typeof exportValue === 'object') {
      entryValue = exportValue['import'] || exportValue['default']
    }

    if (!entryValue) {
      throw new Error(`Invalid export value for ${exportName}: ${JSON.stringify(exportValue)}`)
    }

    tsdownEntry[entryName] = entryValue
  }

  const defaultConfig: UserConfig = {
    entry: userConfig?.entry || tsdownEntry,
    sourcemap: true,
    clean: false,
    failOnWarn: true,
    dts: { build: true, incremental: true, sourcemap: true },
    hash: false,
    css: {
      splitting: true,
    },
    fixedExtension: false,
    target: [
      'es2023',
      'firefox116', // firefox116 is the latest version that doesn't support CSS nesting.
    ],
    inputOptions: {
      experimental: {
        attachDebugInfo: 'none',
      },
    },
  }

  return defu(userConfig, defaultConfig)
}
