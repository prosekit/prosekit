import type { APIRoute } from 'astro'

/**
 * Route that generates an introductory summary of this site for LLMs.
 */
export const GET: APIRoute = async (context) => {
  let segments = ['aaa', 'nnn']

  return new Response(segments.join('\n\n') + '\n')
}
