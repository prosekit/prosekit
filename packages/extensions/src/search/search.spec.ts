import { defineBaseCommands, union } from '@prosekit/core'
import type { EditorState } from '@prosekit/pm/state'
import { describe, expect, it } from 'vitest'

import { defineDoc } from '../doc/index.ts'
import { defineParagraph } from '../paragraph/index.ts'
import { setupTestFromExtension } from '../testing/index.ts'
import { defineText } from '../text/index.ts'

import { defineSearchCommands, defineSearchQuery, defineSearchStatusHandler, getSearchStatus, type SearchStatus } from './index.ts'

function defineSearchTestExtension() {
  return union(
    defineDoc(),
    defineText(),
    defineParagraph(),
    defineBaseCommands(),
    defineSearchQuery(),
    defineSearchCommands(),
  )
}

function getSelectedText(state: EditorState): string {
  const { from, to } = state.selection
  return state.doc.textBetween(from, to)
}

describe('setSearchQuery', () => {
  const { editor, n } = setupTestFromExtension(defineSearchTestExtension())

  it('selects the first match at or after the caret', () => {
    editor.set(n.doc(n.paragraph('<a>one two one three one')))

    editor.commands.setSearchQuery({ search: 'one' })

    expect(getSearchStatus(editor.state)).toEqual({ total: 3, active: 1 })
    expect(getSelectedText(editor.state)).toBe('one')
  })

  it('is case-insensitive by default', () => {
    editor.set(n.doc(n.paragraph('<a>Alpha alpha ALPHA')))

    editor.commands.setSearchQuery({ search: 'alpha' })

    expect(getSearchStatus(editor.state)).toEqual({ total: 3, active: 1 })
    expect(getSelectedText(editor.state)).toBe('Alpha')
  })

  it('stays on the current match while the query is refined', () => {
    editor.set(n.doc(n.paragraph('<a>alpha beta alphabet alpha')))

    editor.commands.setSearchQuery({ search: 'alpha' })
    expect(getSearchStatus(editor.state)).toEqual({ total: 3, active: 1 })

    editor.commands.setSearchQuery({ search: 'alphab' })
    expect(getSearchStatus(editor.state)).toEqual({ total: 1, active: 1 })

    editor.commands.setSearchQuery({ search: 'alpha' })
    expect(getSearchStatus(editor.state)).toEqual({ total: 3, active: 2 })
  })

  it('collapses the selection when the query stops matching', () => {
    editor.set(n.doc(n.paragraph('<a>one two one')))

    editor.commands.setSearchQuery({ search: 'one' })
    const matchFrom = editor.state.selection.from

    editor.commands.setSearchQuery({ search: 'onex' })
    expect(getSearchStatus(editor.state)).toEqual({ total: 0, active: 0 })
    expect(editor.state.selection.empty).toBe(true)
    expect(editor.state.selection.from).toBe(matchFrom)

    editor.commands.setSearchQuery({ search: 'one' })
    expect(getSearchStatus(editor.state)).toEqual({ total: 2, active: 1 })
    expect(editor.state.selection.from).toBe(matchFrom)
  })

  it('keeps a manual selection when the query has no match', () => {
    editor.set(n.doc(n.paragraph('<a>one two<b> one')))
    const selection = editor.state.selection
    expect(selection.empty).toBe(false)

    editor.commands.setSearchQuery({ search: 'zzz' })

    expect(getSearchStatus(editor.state)).toEqual({ total: 0, active: 0 })
    expect(editor.state.selection.eq(selection)).toBe(true)
  })

  it('clears the matches on an empty query without moving the selection', () => {
    editor.set(n.doc(n.paragraph('<a>one two one')))

    editor.commands.setSearchQuery({ search: 'one' })
    editor.commands.findNext()
    const selection = editor.state.selection

    editor.commands.setSearchQuery({ search: '' })

    expect(getSearchStatus(editor.state)).toEqual({ total: 0, active: 0 })
    expect(editor.state.selection.eq(selection)).toBe(true)
  })
})

describe('findNext and findPrev', () => {
  const { editor, n } = setupTestFromExtension(defineSearchTestExtension())

  it('wraps forward and backward through the matches', () => {
    editor.set(n.doc(n.paragraph('<a>one two one three one')))

    editor.commands.setSearchQuery({ search: 'one' })
    editor.commands.findNext()
    editor.commands.findNext()
    expect(getSearchStatus(editor.state)).toEqual({ total: 3, active: 3 })

    editor.commands.findNext()
    expect(getSearchStatus(editor.state)).toEqual({ total: 3, active: 1 })

    editor.commands.findPrev()
    expect(getSearchStatus(editor.state)).toEqual({ total: 3, active: 3 })
  })
})

describe('getSearchStatus', () => {
  const { editor, n } = setupTestFromExtension(defineSearchTestExtension())

  it('reports no active match after the selection moves off one', () => {
    editor.set(n.doc(n.paragraph('<a>one two one')))

    editor.commands.setSearchQuery({ search: 'one' })
    editor.commands.selectAll()

    expect(getSearchStatus(editor.state)).toEqual({ total: 2, active: 0 })
  })
})

describe('defineSearchStatusHandler', () => {
  const statuses: SearchStatus[] = []
  const { editor, n } = setupTestFromExtension(
    union(
      defineSearchTestExtension(),
      defineSearchStatusHandler((status) => {
        statuses.push(status)
      }),
    ),
  )

  it('reports search status changes', () => {
    editor.set(n.doc(n.paragraph('<a>one two one')))

    editor.commands.setSearchQuery({ search: 'one' })
    expect(statuses.at(-1)).toEqual({ total: 2, active: 1 })

    editor.commands.findNext()
    expect(statuses.at(-1)).toEqual({ total: 2, active: 2 })

    const count = statuses.length
    editor.commands.selectAll()
    expect(statuses.at(-1)).toEqual({ total: 2, active: 0 })

    editor.commands.setSearchQuery({ search: '' })
    expect(statuses.at(-1)).toEqual({ total: 0, active: 0 })
    expect(statuses.length).toBe(count + 2)
  })
})
