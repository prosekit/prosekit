import { defu } from 'defu'
import { readPackageUpSync } from 'read-package-up'
import type { TsdownInputOption, UserConfig } from 'tsdown'

export function config(userConfig?: UserConfig): UserConfig {
  const pkg = readPackageUpSync({ cwd: userConfig?.cwd })
  if (!pkg) {
    throw new Error('No package.json found')
  }

  let entry: TsdownInputOption | undefined = userConfig?.entry

  const packageJson = pkg.packageJson as {
    dev?: {
      entry: Record<string, string>
    }
    exports?: Record<string, Record<string, string> | string>
  }

  // TODO: remove "packageJson.dev?.entry"
  if (!entry) {
    entry = packageJson.dev?.entry
  }
  if (!entry && packageJson.exports) {
    entry = {}
    for (const [key, value] of Object.entries(packageJson.exports)) {
      let normalizedKey = key
      if (normalizedKey.startsWith('./')) {
        normalizedKey = normalizedKey.slice(2)
      }
      if (normalizedKey === '.') {
        normalizedKey = 'index'
      }
      if (normalizedKey.endsWith('.css')) {
        normalizedKey = normalizedKey.slice(0, -4)
      }

      let normalizedValue: string | undefined
      if (typeof value === 'string') {
        normalizedValue = value
      } else if (value && typeof value === 'object') {
        normalizedValue = value['prosekit-source']
      }
      if (!normalizedValue) {
        throw new Error(`Unable to find the field "prosekit-source" in the export "${key}" of ${pkg.path}`)
      }
      entry[normalizedKey] = normalizedValue
    }
  }

  if (!entry) {
    throw new Error(`Unable to find the field "dev.entry" in ${pkg.path}`)
  }

  const defaultConfig: UserConfig = {
    entry,
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
