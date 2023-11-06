import { groupBy } from 'lodash-es'

import {
  findExampleFile,
  readExampleMeta,
  writeExampleMeta,
  type Example,
  type ExampleMeta,
  sortExamples,
} from './example-meta'
import { notEmpty } from './not-empty'
import { skipGen } from './skip-gen'
import { vfs } from './virtual-file-system'

export async function genExampleMetaYaml() {
  if (skipGen()) return

  const oldMeta: ExampleMeta = await readExampleMeta()
  const newMeta: ExampleMeta = { examples: [] }

  const pkg = await vfs.getPackageByName('prosekit-playground')

  const files = await vfs.getFilePathsByPackage(pkg)

  const exampleFiles = files
    .map((file) => {
      const parts = file.split('/')
      if (parts.length !== 4) {
        return null
      }

      const exampleName = parts[2]
      const path = parts[3]

      if (path.endsWith('.astro')) {
        return null
      }

      return { exampleName, path }
    })
    .filter(notEmpty)

  const examples = groupBy(exampleFiles, (item) => item.exampleName)

  for (const [exampleName, exampleFiles] of Object.entries(examples)) {
    const newExample: Example = {
      name: exampleName,
      files: exampleFiles.map(({ path }) => ({
        path: path,
        hidden: findExampleFile(oldMeta, exampleName, path)?.hidden ?? false,
      })),
    }
    newMeta.examples.push(newExample)
  }

  newMeta.examples = sortExamples(newMeta.examples)

  await writeExampleMeta(newMeta)
}
