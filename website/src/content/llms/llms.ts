import { once } from '@ocavue/utils'
import { getCollection } from 'astro:content'

const SITE_URL = 'https://prosekit.dev'

export async function getLlmText(type: 'default' | 'full' | { id: string }): Promise<string> {
  if (type === 'default') {
    const parts = [
      '# ProseKit',
      'ProseKit is a framework for building rich text editors on web.',
      '## Complete documentation',
      `- [Complete documentation](${SITE_URL}/llms-full.txt): the full documentation for ProseKit`,
      '## Documentation Sets',
      await getDocLinks(),
    ]
    return parts.join('\n\n')
  }

  if (type === 'full') {
    const docs = Object.values(await getDocs())
    const parts = [
      '<SYSTEM>This is the full developer documentation for ProseKit</SYSTEM>',
    ]
    for (const doc of docs) {
      parts.push('='.repeat(20))
      parts.push(getDocText(doc))
    }
    return parts.join('\n\n')
  }

  const docs = await getDocs()
  const doc = docs[type.id]
  if (!doc) {
    throw new Error(`Unable to build llms.txt for ${JSON.stringify(type.id)}`)
  }
  return getDocText(doc)
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

function getDocText(doc: Doc): string {
  const parts = [
    `# ${doc.title}`,
    `> HTML document URL: ${SITE_URL}/${doc.id}`,
    '---',
    doc.body,
  ]

  return parts.join('\n\n')
}

async function getDocLinks(): Promise<string> {
  const docs = await getDocs()
  const parts = Object.values(docs).map(
    (doc) => `- [${doc.title}](${SITE_URL}/llms-txt/${doc.id}.txt)`,
  )
  return parts.join('\n')
}
