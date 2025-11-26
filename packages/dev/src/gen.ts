import { debug } from './debug'
import { genChangeset } from './gen-changeset'
import { genChangesetConfigJson } from './gen-changeset-config-json'
import { genComponents } from './gen-components'
import { genPackageJson } from './gen-package-json'
import { genSizeLimitJson } from './gen-size-limit-json'
import { skipGen } from './skip-gen'
import { sleep } from './sleep'
import { vfs } from './vfs'
import { syncWorkspacePackages } from './workspace-sync'

async function genAll(): Promise<boolean> {
  if (skipGen()) {
    console.warn('[gen] skipGen() returned true')
    return false
  }

  debug('gen:start')
  await genComponents()
  await genPackageJson()
  await genChangesetConfigJson()
  await genSizeLimitJson()
  await genChangeset()
  await syncWorkspacePackages()
  const updated = await vfs.commit()
  debug('gen:done updated=%s', updated)
  return updated
}

async function main() {
  for (let i = 1; i <= 10; i++) {
    if (i === 10) {
      console.warn('[warning] gen.ts: genAll() cannot update all files within 10 attempts')
    }

    if (debug.enabled) {
      debug('attempt %d', i)
    }
    const updated = await genAll()
    if (!updated) {
      return
    }
    await sleep(1000)
  }
}

await main()
