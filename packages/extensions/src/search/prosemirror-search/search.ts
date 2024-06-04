import {
  type Command,
  Plugin,
  PluginKey,
  TextSelection,
  EditorState,
  Transaction,
} from '@prosekit/pm/state'
import { DecorationSet, Decoration } from '@prosekit/pm/view'

import { SearchQuery, type SearchResult } from './query'

export { SearchQuery, type SearchResult }

class SearchState {
  constructor(
    readonly query: SearchQuery,
    readonly range: { from: number; to: number } | null,
    readonly deco: DecorationSet,
  ) {}
}

function buildMatchDeco(
  state: EditorState,
  query: SearchQuery,
  range: { from: number; to: number } | null,
) {
  if (!query.valid) return DecorationSet.empty
  const deco: Decoration[] = []
  const sel = state.selection
  for (
    let pos = range ? range.from : 0,
      end = range ? range.to : state.doc.content.size;
    ;

  ) {
    const next = query.findNext(state, pos, end)
    if (!next) break
    const cls =
      next.from == sel.from && next.to == sel.to
        ? 'ProseMirror-active-search-match'
        : 'ProseMirror-search-match'
    deco.push(Decoration.inline(next.from, next.to, { class: cls }))
    pos = next.to
  }
  return DecorationSet.create(state.doc, deco)
}

const searchKey = new PluginKey<SearchState>('search')

/// Returns a plugin that stores a current search query and searched
/// range, and highlights matches of the query.
export function search(
  options: {
    initialQuery?: SearchQuery
    initialRange?: { from: number; to: number }
  } = {},
): Plugin {
  return new Plugin<SearchState>({
    key: searchKey,
    state: {
      init(_config, state) {
        const query = options.initialQuery || new SearchQuery({ search: '' })
        const range = options.initialRange || null
        return new SearchState(
          query,
          range,
          buildMatchDeco(state, query, range),
        )
      },
      apply(tr, search, _oldState, state) {
        const set = tr.getMeta(searchKey) as
          | { query: SearchQuery; range: { from: number; to: number } | null }
          | undefined
        if (set)
          return new SearchState(
            set.query,
            set.range,
            buildMatchDeco(state, set.query, set.range),
          )

        if (tr.docChanged || tr.selectionSet) {
          let range = search.range
          if (range) {
            const from = tr.mapping.map(range.from, 1)
            const to = tr.mapping.map(range.to, -1)
            range = from < to ? { from, to } : null
          }
          search = new SearchState(
            search.query,
            range,
            buildMatchDeco(state, search.query, range),
          )
        }
        return search
      },
    },
    props: {
      decorations: (state) => searchKey.getState(state)!.deco,
    },
  })
}

/// Get the current active search query and searched range. Will
/// return `undefined` is the search plugin isn't active.
export function getSearchState(state: EditorState):
  | {
      query: SearchQuery
      range: { from: number; to: number } | null
    }
  | undefined {
  return searchKey.getState(state)
}

/// Add metadata to a transaction that updates the active search query
/// and searched range, when dispatched.
export function setSearchState(
  tr: Transaction,
  query: SearchQuery,
  range: { from: number; to: number } | null = null,
) {
  return tr.setMeta(searchKey, { query, range })
}

function nextMatch(
  search: SearchState,
  state: EditorState,
  wrap: boolean,
  curFrom: number,
  curTo: number,
) {
  const range = search.range || { from: 0, to: state.doc.content.size }
  let next = search.query.findNext(state, Math.max(curTo, range.from), range.to)
  if (!next && wrap)
    next = search.query.findNext(state, range.from, Math.min(curFrom, range.to))
  return next
}

function prevMatch(
  search: SearchState,
  state: EditorState,
  wrap: boolean,
  curFrom: number,
  curTo: number,
) {
  const range = search.range || { from: 0, to: state.doc.content.size }
  let prev = search.query.findPrev(
    state,
    Math.min(curFrom, range.to),
    range.from,
  )
  if (!prev && wrap)
    prev = search.query.findPrev(state, range.to, Math.max(curTo, range.from))
  return prev
}

function findCommand(wrap: boolean, dir: -1 | 1): Command {
  return (state, dispatch) => {
    const search = searchKey.getState(state)
    if (!search || !search.query.valid) return false
    const { from, to } = state.selection
    const next =
      dir > 0
        ? nextMatch(search, state, wrap, from, to)
        : prevMatch(search, state, wrap, from, to)
    if (!next) return false
    const selection = TextSelection.create(state.doc, next.from, next.to)
    if (dispatch) dispatch(state.tr.setSelection(selection).scrollIntoView())
    return true
  }
}

/// Find the next instance of the search query after the current
/// selection and move the selection to it.
export const findNext = findCommand(true, 1)

/// Find the next instance of the search query and move the selection
/// to it. Don't wrap around at the end of document or search range.
export const findNextNoWrap = findCommand(false, 1)

/// Find the previous instance of the search query and move the
/// selection to it.
export const findPrev = findCommand(true, -1)

/// Find the previous instance of the search query and move the
/// selection to it. Don't wrap at the start of the document or search
/// range.
export const findPrevNoWrap = findCommand(false, -1)

function replaceCommand(wrap: boolean, moveForward: boolean): Command {
  return (state, dispatch) => {
    const search = searchKey.getState(state)
    if (!search || !search.query.valid) return false
    const { from } = state.selection
    const next = nextMatch(search, state, wrap, from, from)
    if (!next) return false

    if (!dispatch) return true
    if (state.selection.from == next.from && state.selection.to == next.to) {
      const tr = state.tr.replace(
        next.from,
        next.to,
        search.query.getReplacement(state, next),
      )
      const after =
        moveForward && nextMatch(search, state, wrap, next.from, next.to)
      if (after)
        tr.setSelection(
          TextSelection.create(
            tr.doc,
            tr.mapping.map(after.from, 1),
            tr.mapping.map(after.to, -1),
          ),
        )
      else
        tr.setSelection(
          TextSelection.create(tr.doc, next.from, tr.mapping.map(next.to, 1)),
        )
      dispatch(tr.scrollIntoView())
    } else if (!moveForward) {
      return false
    } else {
      dispatch(
        state.tr
          .setSelection(TextSelection.create(state.doc, next.from, next.to))
          .scrollIntoView(),
      )
    }
    return true
  }
}

/// Replace the currently selected instance of the search query, and
/// move to the next one. Or select the next match, if none is already
/// selected.
export const replaceNext = replaceCommand(true, true)

/// Replace the next instance of the search query. Don't wrap around
/// at the end of the document.
export const replaceNextNoWrap = replaceCommand(false, true)

/// Replace the currently selected instance of the search query, if
/// any, and keep it selected.
export const replaceCurrent = replaceCommand(false, false)

/// Replace all instances of the search query.
export const replaceAll: Command = (state, dispatch) => {
  const search = searchKey.getState(state)
  if (!search) return false
  const matches: SearchResult[] = [],
    range = search.range || { from: 0, to: state.doc.content.size }
  for (let pos = range.from; ; ) {
    const next = search.query.findNext(state, pos, range.to)
    if (!next) break
    matches.push(next)
    pos = next.to
  }
  if (dispatch) {
    const tr = state.tr
    for (let i = matches.length - 1; i >= 0; i--) {
      const match = matches[i]
      tr.replace(
        match.from,
        match.to,
        search.query.getReplacement(state, match),
      )
    }
    dispatch(tr)
  }
  return true
}
