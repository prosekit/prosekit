import { groupBy } from 'lodash-es'

import {
  findExampleFile,
  readExampleMeta,
  sortExamples,
  sortFiles,
  writeExampleMeta,
  type Example,
  type ExampleMeta,
} from './example-meta'
import { notEmpty } from './not-empty'
import { skipGen } from './skip-gen'
import { vfs } from './virtual-file-system'

export async function genExampleMetaYaml() {
  if (skipGen()) return

  const oldMeta: ExampleMeta = await readExampleMeta()
  const newMeta: ExampleMeta = { examples: [] }

  const pkg = await vfs.getPackageByName('prosekit-website')

  const files = await vfs.getFilePathsByPackage(pkg)

  const exampleFiles = files
    .map((file) => {
      const parts = file.split('/')
      if (parts.length !== 6) {
        return null
      }

      const [websiteDir, srcDir, examplesDir, framework, story, fileName] = parts

      if (
        websiteDir !== 'website'
        || srcDir !== 'src'
        || examplesDir !== 'examples'
        || fileName.endsWith('.astro')
      ) {
        return null
      }

      const exampleName = `${framework}-${story}`

      return { exampleName, fileName }
    })
    .filter(notEmpty)

  const examples = groupBy(exampleFiles, (item) => item.exampleName)

  for (const [exampleName, exampleFiles] of Object.entries(examples)) {
    const [framework, ...rest] = exampleName.split('-')
    const story = rest.join('-')

    const files = exampleFiles.map(({ fileName }) => ({
      path: fileName,
      hidden: fileName === 'tsconfig.json'
        ? true
        : (findExampleFile(oldMeta, exampleName, fileName)?.hidden ?? false),
    }))

    const newExample: Example = {
      name: exampleName,
      framework,
      story,
      files: sortFiles(files),
    }
    newMeta.examples.push(newExample)
  }

  newMeta.examples = sortExamples(newMeta.examples)

  await writeExampleMeta(newMeta)
}
