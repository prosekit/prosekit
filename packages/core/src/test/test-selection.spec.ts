import { NodeSelection, TextSelection } from '@prosekit/pm/state'
import { describe, expect, it } from 'vitest'

import { setupTest } from '../testing/index.ts'

import { extractSelection } from './index.ts'

describe('extractSelection', () => {
  it('returns a TextSelection when <a> resolves inside inline content', () => {
    const { n } = setupTest()
    const doc = n.doc(n.paragraph('<a>Hello<b> world!'))

    const selection = extractSelection(doc)

    expect(selection).toBeInstanceOf(TextSelection)
    expect(selection?.toJSON()).toEqual({
      type: 'text',
      anchor: 1,
      head: 6,
    })
  })

  it('returns a collapsed TextSelection when only <a> is present', () => {
    const { n } = setupTest()
    const doc = n.doc(n.paragraph('Hello<a> world!'))

    const selection = extractSelection(doc)

    expect(selection).toBeInstanceOf(TextSelection)
    expect(selection?.toJSON()).toEqual({
      type: 'text',
      anchor: 6,
      head: 6,
    })
  })

  it('supports a reversed selection when <b> precedes <a>', () => {
    const { n } = setupTest()
    const doc = n.doc(n.paragraph('<b>Hello<a> world!'))

    const selection = extractSelection(doc)

    expect(selection).toBeInstanceOf(TextSelection)
    expect(selection?.toJSON()).toEqual({
      type: 'text',
      anchor: 6,
      head: 1,
    })
  })

  it('returns a NodeSelection when <a> resolves inside a block parent', () => {
    const { n } = setupTest()
    const doc = n.doc('<a>', n.paragraph('foo'))

    const selection = extractSelection(doc)

    expect(selection).toBeInstanceOf(NodeSelection)
    expect(selection?.toJSON()).toEqual({
      type: 'node',
      anchor: 0,
    })
  })

  it('returns undefined when the document has no tags', () => {
    const { n } = setupTest()
    const doc = n.doc(n.paragraph('Hello world!'))

    expect(extractSelection(doc)).toBeUndefined()
  })
})
