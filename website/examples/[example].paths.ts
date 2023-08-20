import { readExampleMeta } from '@prosekit/dev/example-meta'

async function paths() {
  const meta = await readExampleMeta()
  const paths = []

  for (const example of meta.examples) {
    paths.push({
      params: {
        example: example.name,
      },
    })
  }

  return paths
}

export default { paths }
