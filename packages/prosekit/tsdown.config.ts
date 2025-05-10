import { config } from '@prosekit/config-tsdown'
import { defineConfig } from 'tsdown'

const configObject = config()

const entries = configObject.entry

if (typeof entries !== 'object') {
  throw new TypeError('entries must be an object')
}

// Skip CSS files until the following issue is resolved:
// https://github.com/rolldown/tsdown/issues/216
const entriesWithoutCSS = Object.fromEntries(
  Object.entries(entries).filter(([, value]) => !value.endsWith('.css')),
)

export default defineConfig({ ...configObject, entry: entriesWithoutCSS })
