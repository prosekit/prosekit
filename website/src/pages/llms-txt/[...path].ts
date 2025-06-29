import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'

import { getLlmText } from '@/content/llms/llms'

export const GET: APIRoute = async ({ params }) => {
  let path = params.path || ''
  if (path.endsWith('/')) {
    path = path.slice(0, -1)
  }
  if (path.endsWith('.txt')) {
    path = path.slice(0, -4)
  }
  return new Response(await getLlmText({ id: path }))
}

export async function getStaticPaths() {
  const docs = await getCollection('docs')
  return docs.map((doc) => ({
    params: { path: doc.id + '.txt' },
  }))
}
