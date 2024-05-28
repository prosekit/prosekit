import { definePlugin } from '@prosekit/core'
import { SearchQuery, search } from 'prosemirror-search'

/**
 * Options for {@link defineSearch}
 *
 * @public
 */
interface SearchOptions {
  initialQuery?: SearchQuery
  initialRange?: {
    from: number
    to: number
  }
}

/**
 * Defines an extension that stores a current search query and searched range,
 * and highlights matches of the query
 *
 * @public
 */
export function defineSearch(options?: SearchOptions) {
  return definePlugin(search(options))
}
