import { genChangesetConfigJson } from './gen-changeset-config-json.js'
import { genChangeset } from './gen-changeset.js'
import { genComponents } from './gen-components.js'
import { genExampleMetaYaml } from './gen-example-meta-yaml.js'
import { genPackageJson } from './gen-package-json.js'
import { genSizeLimitJson } from './gen-size-limit-json.js'
import { genTsconfigJson } from './gen-tsconfig-json.js'
import { genTypedocJson } from './gen-typedoc-json.js'
import { genWebsitePages } from './gen-website-pages.js'
import { skipGen } from './skip-gen.js'
import { sleep } from './sleep.js'
import { timer } from './timer.js'
import { vfs } from './virtual-file-system.js'

async function genAll(): Promise<boolean> {
  if (skipGen()) {
    return false
  }

  await genComponents()
  await genPackageJson()
  await genTsconfigJson()
  await genTypedocJson()
  await genChangesetConfigJson()
  await genSizeLimitJson()
  await genChangeset()

  // Example for website
  await genExampleMetaYaml()
  await genWebsitePages()

  return await vfs.commit()
}

async function main() {
  for (let i = 1; i <= 10; i++) {
    if (i === 10) {
      console.warn("[warning] gen.ts: genAll() didn't finish in 10 seconds")
    }

    const updated = await genAll()
    if (!updated) {
      return
    }
    await sleep(1000)
  }
}

await timer(main)()
