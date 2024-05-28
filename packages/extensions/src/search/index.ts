import { defineCommands, definePlugin } from '@prosekit/core'
import {
  SearchQuery,
  search,
  findNext,
  findPrev,
  findNextNoWrap,
  findPrevNoWrap,
  replaceNext,
  replaceNextNoWrap,
  replaceCurrent,
  replaceAll,
} from 'prosemirror-search'

/**
 * Options for {@link defineSearchQuery}
 *
 * @public
 */
export interface SearchQueryOptions {
  /**
   * The search string (or regular expression).
   */
  search: string

  /**
   * The replace text.
   */
  replace?: string

  /**
   * Indicates whether the search is case-sensitive
   *
   * @default false
   */
  caseSensitive?: boolean

  /**
   * By default, string search will replace `\n`, `\r`, and `\t` in the query
   * with newline, return, and tab characters. When this is set to true, that
   * behavior is disabled.
   *
   * @default false
   */
  literal?: boolean

  /**
   * When true, the search string is interpreted as a regular expression.
   *
   * @default false
   */
  regexp?: boolean

  /**
   * Enable whole-word matching.
   *
   * @default false
   */
  wholeWord?: boolean
}

/**
 * Defines an extension that stores a current search query and replace string.
 *
 * @public
 */
export function defineSearchQuery(options: SearchQueryOptions) {
  const query = new SearchQuery(options)
  return definePlugin(search({ initialQuery: query }))
}

/**
 * Defines commands for search and replace.
 *
 * @public
 */
export function defineSearchCommands() {
  return defineCommands({
    findNext: () => findNext,
    findPrev: () => findPrev,
    findNextNoWrap: () => findNextNoWrap,
    findPrevNoWrap: () => findPrevNoWrap,
    replaceNext: () => replaceNext,
    replaceNextNoWrap: () => replaceNextNoWrap,
    replaceCurrent: () => replaceCurrent,
    replaceAll: () => replaceAll,
  })
}
