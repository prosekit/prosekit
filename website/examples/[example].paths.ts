import { readExampleMeta } from '@prosekit/dev/example-meta'

async function paths() {
  const meta = await readExampleMeta()
  const paths = []

  for (const collection of meta.collections) {
    for (const story of collection.stories) {
      paths.push({
        params: {
          example: collection.name + '-' + story.name,
        },
      })
    }
  }

  return paths
}

export default { paths }
