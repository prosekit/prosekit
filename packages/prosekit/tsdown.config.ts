import { config } from '@prosekit/config-tsdown'
import {
  defineConfig,
  type UserConfig,
} from 'tsdown'

const configObject = config({ cwd: import.meta.dirname })

const entries = configObject.entry

if (typeof entries !== 'object') {
  throw new TypeError('entries must be an object')
}

function assertString(value: string | string[]): string {
  if (typeof value === 'string') {
    return value
  }
  if (value.length === 1) {
    return value[0]
  }
  throw new TypeError('value must be a string')
}

// Skip CSS files until the following issue is resolved:
// https://github.com/rolldown/tsdown/issues/216
const entriesWithoutCSS = Object.fromEntries(
  Object.entries(entries)
    .map(([key, value]) => [key, assertString(value)])
    .filter(([, value]) => !value.endsWith('.css')),
)
const entriesWithCSS = Object.fromEntries(
  Object.entries(entries)
    .map(([key, value]) => [key, assertString(value)])
    .filter(([, value]) => value.endsWith('.css')),
)

const configObjectWithoutCSS: UserConfig = {
  ...configObject,
  entry: entriesWithoutCSS,
  hooks: {
    'build:done': async () => {
      const esbuild = await import('esbuild')
      await esbuild.build({
        entryPoints: entriesWithCSS,
        bundle: true,
        outdir: 'dist',
        target: 'chrome100',
      })
    },
  },
}

export default defineConfig(configObjectWithoutCSS)
