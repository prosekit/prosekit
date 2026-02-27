import { defu } from 'defu'
import { readPackageUpSync } from 'read-package-up'
import type { UserConfig } from 'tsdown'

export function config(userConfig?: UserConfig): UserConfig {
  const pkg = readPackageUpSync({ cwd: userConfig?.cwd })
  if (!pkg) {
    throw new Error('No package.json found')
  }

  const packageJson = pkg.packageJson as {
    dev?: {
      entry: Record<string, string>
    }
  }

  const entry = packageJson.dev?.entry

  if (!entry) {
    throw new Error(`Unable to find the field "dev.entry" in ${pkg.path}`)
  }

  const defaultConfig: UserConfig = {
    entry,
    sourcemap: true,
    clean: false,
    failOnWarn: true,
    dts: { build: true, incremental: true, sourcemap: true },
    deps: {
      // Bundling CSS files to remove the `@import` statements. This increases the
      // compability of the output.
      alwaysBundle: [/\.css$/i],
    },
    fixedExtension: false,
    target: [
      'es2023',
      'firefox116', // firefox116 is the latest version that doesn't support CSS nesting.
    ],
  }

  return defu(userConfig, defaultConfig)
}
