import type { APIRoute } from 'astro'

import { getLlmText } from '@/content/llms/llms'

export const GET: APIRoute = async () => {
  return new Response(
    await getLlmText('full'),
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  )
}
