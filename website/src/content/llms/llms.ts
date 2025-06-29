import { once } from '@ocavue/utils'
import { getCollection } from 'astro:content'

const TITLE = '# ProseKit'
const DESCRIPTION = 'ProseKit is a framework for building rich text editors on web.'
const SITE_URL = 'https://prosekit.dev'

export async function getLlmText(type: 'default' | 'full' | { id: string }): Promise<string> {
  if (type === 'default') {
    return [
      TITLE,
      DESCRIPTION,
      '## Complete documentation',
      `- [Complete documentation](${SITE_URL}/llms-full.txt): the full documentation for ProseKit`,
      '## Documentation Sets',
      await getDocLinks(),
    ].join('\n\n')
  }

  if (type === 'full') {
    return [
      TITLE,
      DESCRIPTION,
      await getAllDocTexts(),
    ].join('\n\n')
  }

  return await getDocTextById(type.id)
}

interface Doc {
  id: string
  title: string
  body: string
}

type Docs = { [id: string]: Doc }

const getDocs: () => Promise<Docs> = once(async () => {
  const docs = await getCollection('docs')

  return Object.fromEntries(docs.map((doc) => [doc.id, {
    id: doc.id,
    title: doc.data.title,
    body: doc.body ?? '',
  }]))
})

async function getDocIds(): Promise<string[]> {
  const docs = await getDocs()
  return Object.keys(docs)
}

async function getDocTextById(id: string): Promise<string> {
  const docs = await getDocs()
  const doc = docs[id]

  if (!doc) {
    throw new Error(`Unable to build llms.txt for ${JSON.stringify(id)}`)
  }

  const parts = [
    `# ${doc.title}`,
    `> HTML document URL: ${SITE_URL}/${id}`,
    '---',
    doc.body,
  ]

  return parts.join('\n\n')
}

async function getAllDocTexts(): Promise<string> {
  const ids = await getDocIds()
  const parts = await Promise.all(ids.map(getDocTextById))
  return parts.join('\n\n' + '-'.repeat(20) + '\n\n')
}

async function getDocLinks(): Promise<string> {
  const docs = await getDocs()
  const parts = Object.values(docs).map(
    (doc) => `- [${doc.title}](${SITE_URL}/llms-txt/${doc.id}.txt)`,
  )
  return parts.join('\n')
}
