import type { APIRoute } from 'astro'

import { getLlmText } from '@/content/llms/llms'

export const GET: APIRoute = async () => {
  return new Response(await getLlmText('default'))
}
