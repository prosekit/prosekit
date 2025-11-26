import { createDebug } from 'obug'

import { genChangeset } from './gen-changeset'
import { genChangesetConfigJson } from './gen-changeset-config-json'
import { genComponents } from './gen-components'
import { genPackageJson } from './gen-package-json'
import { genSizeLimitJson } from './gen-size-limit-json'
import { skipGen } from './skip-gen'
import { sleep } from './sleep'
import { vfs } from './vfs'
import { syncWorkspacePackages } from './workspace-sync'

const debug = createDebug('prosekit:gen')

async function genAll(): Promise<boolean> {
  if (skipGen()) {
    console.warn('[gen] skipGen() returned true')
    return false
  }

  debug('start genAll')

  debug('genComponents:start')
  await genComponents()
  debug('genComponents:done')

  debug('genPackageJson:start')
  await genPackageJson()
  debug('genPackageJson:done')

  debug('genChangesetConfigJson:start')
  await genChangesetConfigJson()
  debug('genChangesetConfigJson:done')

  debug('genSizeLimitJson:start')
  await genSizeLimitJson()
  debug('genSizeLimitJson:done')

  debug('genChangeset:start')
  await genChangeset()
  debug('genChangeset:done')

  debug('syncWorkspacePackages:start')
  await syncWorkspacePackages()
  debug('syncWorkspacePackages:done')

  debug('vfs.commit:start')
  const updated = await vfs.commit()
  debug('vfs.commit:done updated=%s', updated)

  debug('done genAll')
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
