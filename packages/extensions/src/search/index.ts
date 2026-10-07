import { defineCommands, definePlugin, defineUpdateHandler, type Extension, type PlainExtension } from '@prosekit/core'
import { TextSelection, type Command, type EditorState } from '@prosekit/pm/state'
import type { EditorView } from '@prosekit/pm/view'
import {
  findNext,
  findNextNoWrap,
  findPrev,
  findPrevNoWrap,
  getMatchHighlights,
  getSearchState,
  replaceAll,
  replaceCurrent,
  replaceNext,
  replaceNextNoWrap,
  search,
  SearchQuery,
  setSearchState,
} from 'prosemirror-search'

/**
 * Options for {@link defineSearchQuery}
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
 * When called without options, it stores an empty query, which can be updated
 * later with the `setSearchQuery` command.
 */
export function defineSearchQuery(options?: SearchQueryOptions): PlainExtension {
  return definePlugin(search(options ? { initialQuery: new SearchQuery(options) } : {}))
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
 * Returns a command that updates the search query and selects the first match
 * at or after the selection start, wrapping around to the first match in the
 * document. When the query matches nothing, a selection left by a previous
 * query collapses to its start. An empty query clears the highlights and
 * leaves the selection alone. The command is a no-op when the query is
 * unchanged, so it can be dispatched on every input change.
 */
function setSearchQuery(options: SearchQueryOptions): Command {
  return (state, dispatch) => {
    const query = new SearchQuery(options)
    const current = getSearchState(state)?.query
    if (current && current.eq(query) && current.literal === query.literal) {
      return false
    }
    if (dispatch) {
      const tr = setSearchState(state.tr, query)
      const match = query.findNext(state, state.selection.from) ?? query.findNext(state)
      if (match) {
        tr.setSelection(TextSelection.create(tr.doc, match.from, match.to)).scrollIntoView()
      } else if (query.valid && getSearchStatus(state).active > 0) {
        tr.setSelection(TextSelection.create(tr.doc, state.selection.from))
      }
      dispatch(tr)
    }
    return true
  }
}

/**
 * @internal
 */
export type SearchCommandsExtension = Extension<{
  Commands: {
    setSearchQuery: [options: SearchQueryOptions]
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
 */
export function defineSearchCommands(): SearchCommandsExtension {
  return defineCommands({
    setSearchQuery: (options: SearchQueryOptions) => withScrollActiveIntoView(setSearchQuery(options)),
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

/**
 * The match count for the current search query, and the position of the match
 * that the selection sits on.
 */
export interface SearchStatus {
  /**
   * The total number of matches for the current search query.
   */
  total: number

  /**
   * The one-based position of the match that the selection sits on, or 0 when
   * the selection is not on a match.
   */
  active: number
}

/**
 * A function that receives the current search status.
 */
export type SearchStatusHandler = (status: SearchStatus) => void

/**
 * Returns the current search status.
 */
export function getSearchStatus(state: EditorState): SearchStatus {
  const matches = getMatchHighlights(state).find()
  const { from, to } = state.selection
  return {
    total: matches.length,
    active: matches.findIndex((match) => match.from === from && match.to === to) + 1,
  }
}

/**
 * Registers a handler that is called whenever the search status changes. It
 * can be used to render a match counter.
 */
export function defineSearchStatusHandler(handler: SearchStatusHandler): PlainExtension {
  return defineUpdateHandler((view, prevState) => {
    const status = getSearchStatus(view.state)
    const previous = getSearchStatus(prevState)
    if (status.total === previous.total && status.active === previous.active) {
      return
    }
    handler(status)
  })
}
