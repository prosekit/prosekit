import { genChangesetConfigJson } from './gen-changeset-config-json.js'
import { genComponents } from './gen-components.js'
import { genDocsItems } from './gen-docs-items.js'
import { genExampleIndex } from './gen-example-index.js'
import { genExampleMarkdown } from './gen-example-markdown.js'
import { genExampleMetaJson } from './gen-example-meta-json.js'
import { genPackageJson } from './gen-package-json.js'
import { genRenovateJson } from './gen-renovate-json.js'
import { genSnadpackInjection } from './gen-sandpack-injection.js'
import { genTsconfigJson } from './gen-tsconfig-json.js'
import { genTypedocJson } from './gen-typedoc-json.js'
import { skipGen } from './skip-gen.js'
import { timer } from './timer.js'
import { vfs } from './virtual-file-system.js'

async function main() {
  if (skipGen()) return

  await genComponents()
  await genPackageJson()
  await genTsconfigJson()
  await genTypedocJson()
  await genDocsItems()
  await genRenovateJson()
  await genChangesetConfigJson()

  // Example for website
  await genExampleMetaJson()
  await genExampleMarkdown()
  await genExampleIndex()
  await genSnadpackInjection()

  await vfs.commit()
}

await timer(main)()
