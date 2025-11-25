import { genChangeset } from './gen-changeset'
import { genChangesetConfigJson } from './gen-changeset-config-json'
import { genComponents } from './gen-components'
import { genPackageJson } from './gen-package-json'
import { genSizeLimitJson } from './gen-size-limit-json'
import { skipGen } from './skip-gen'
import { sleep } from './sleep'
import { vfs } from './virtual-file-system'

async function genAll(): Promise<boolean> {
  if (skipGen()) {
    return false
  }

  await genComponents()
  await genPackageJson()
  await genChangesetConfigJson()
  await genSizeLimitJson()
  await genChangeset()

  return await vfs.commit()
}

async function main() {
  for (let i = 1; i <= 10; i++) {
    if (i === 10) {
      console.warn('[warning] gen.ts: genAll() cannot update all files within 10 attempts')
    }

    const updated = await genAll()
    if (!updated) {
      return
    }
    await sleep(1000)
  }
}

await main()
