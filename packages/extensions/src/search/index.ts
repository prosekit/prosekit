import {
  defineCommands,
  definePlugin,
  type Extension,
  type PlainExtension,
} from '@prosekit/core'
import type { Command } from '@prosekit/pm/state'
import type { EditorView } from '@prosekit/pm/view'
import {
  findNext,
  findNextNoWrap,
  findPrev,
  findPrevNoWrap,
  replaceAll,
  replaceCurrent,
  replaceNext,
  replaceNextNoWrap,
  search,
  SearchQuery,
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
export function defineSearchQuery(options: SearchQueryOptions): PlainExtension {
  const query = new SearchQuery(options)
  return definePlugin(search({ initialQuery: query }))
}

/**
 * Scrolls the active search match into view.
 */
function scrollActiveIntoView(view: EditorView) {
  if (view.isDestroyed) return
  const active = view.dom.querySelector('.ProseMirror-active-search-match')
  active?.scrollIntoView({
    block: 'nearest',
    inline: 'nearest',
    behavior: 'smooth',
  })
}

/**
 * Wraps a command and scrolls the active search match into view when the command
 * is applied.
 */
function withScrollActiveIntoView(command: Command): Command {
  return (state, dispatch, view) => {
    const result = command(state, dispatch, view)
    if (result && dispatch && view) {
      // Add a small delay because the command itself will handle scrolling if
      // the view is focused.
      setTimeout(() => scrollActiveIntoView(view), 50)
    }
    return result
  }
}

/**
 * @internal
 */
export type SearchCommandsExtension = Extension<{
  Commands: {
    findNext: []
    findPrev: []
    findNextNoWrap: []
    findPrevNoWrap: []
    replaceNext: []
    replaceNextNoWrap: []
    replaceCurrent: []
    replaceAll: []
  }
}>

/**
 * Defines commands for search and replace.
 *
 * @public
 */
export function defineSearchCommands(): SearchCommandsExtension {
  return defineCommands({
    findNext: () => withScrollActiveIntoView(findNext),
    findPrev: () => withScrollActiveIntoView(findPrev),
    findNextNoWrap: () => withScrollActiveIntoView(findNextNoWrap),
    findPrevNoWrap: () => withScrollActiveIntoView(findPrevNoWrap),
    replaceNext: () => withScrollActiveIntoView(replaceNext),
    replaceNextNoWrap: () => withScrollActiveIntoView(replaceNextNoWrap),
    replaceCurrent: () => withScrollActiveIntoView(replaceCurrent),
    replaceAll: () => withScrollActiveIntoView(replaceAll),
  })
}
