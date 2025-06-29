import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'

import { getLlmText } from '@/content/llms/llms'

export const GET: APIRoute = async ({ params }) => {
  const id = params.id || ''
  const text = await getLlmText({ id })
  return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}

export async function getStaticPaths() {
  const docs = await getCollection('docs')
  return docs.map((doc) => ({
    params: { id: doc.id },
  }))
}
