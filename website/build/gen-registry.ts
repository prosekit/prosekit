import {
  genRegistry,
  genRegistryItems,
} from 'prosekit-registry'

import { replaceClassNames } from './replace-classes'

async function gen() {
  await genRegistry('website/build/registry.gen.json')
  await genRegistry('website/public/r/registry.json')
  await genRegistryItems('website/public/r', replaceClassNames)
}

await gen()
