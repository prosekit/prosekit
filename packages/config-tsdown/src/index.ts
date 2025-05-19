import { merge } from 'lodash-es'
import { readPackageUpSync } from 'read-package-up'
import type { Options } from 'tsdown'

export function config(input?: Options): Options {
  const pkg = readPackageUpSync()
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

  const output: Options = {
    entry,
    sourcemap: false,
    clean: false,
    dts: {
      isolatedDeclarations: true,
    },
    // Bundling CSS files to remove the `@import` statements. This increases the
    // compability of the output.
    noExternal: [/\.css$/i],
    target: [
      'es2023',
      'firefox116', // firefox116 is the latest version that doesn't support CSS nesting.
    ],
  }

  return deepMergeOptions(output, input)
}

function deepMergeOptions(a: Options, b?: Options): Options {
  return merge({}, a, b)
}
