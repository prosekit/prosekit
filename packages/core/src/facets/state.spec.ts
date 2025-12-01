import {
  describe,
  expect,
  it,
} from 'vitest'

import { union } from '../editor/union'
import { withPriority } from '../editor/with-priority'
import { defineDefaultState } from '../extensions/default-state'
import {
  defineTestExtension,
  setupTestFromExtension,
} from '../testing'
import type { NodeJSON } from '../types/model'
import { Priority } from '../types/priority'

describe('state', () => {
  it('uses doc from extension with highest priority', () => {
    const doc1: NodeJSON = { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'default priority' }] }] }
    const doc2: NodeJSON = { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'highest priority' }] }] }
    const doc3: NodeJSON = { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'lowest priority' }] }] }

    const extension1 = defineDefaultState({ defaultContent: doc1 }) // default priority
    const extension2 = withPriority(defineDefaultState({ defaultContent: doc2 }), Priority.highest)
    const extension3 = withPriority(defineDefaultState({ defaultContent: doc3 }), Priority.lowest)

    const combinedExtension = union(defineTestExtension(), extension1, extension2, extension3)
    const { editor } = setupTestFromExtension(combinedExtension)

    const docText = editor.state.doc.textContent

    // The extension with the highest priority should set the doc
    expect(docText).toEqual('highest priority')
  })

  it('uses doc from last extension when all have same priority', () => {
    const doc1 = { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'first' }] }] }
    const doc2 = { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'second' }] }] }
    const doc3 = { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'third' }] }] }

    const extension1 = defineDefaultState({ defaultContent: doc1 })
    const extension2 = defineDefaultState({ defaultContent: doc2 })
    const extension3 = defineDefaultState({ defaultContent: doc3 })

    const combinedExtension = union(defineTestExtension(), extension1, extension2, extension3)
    const { editor } = setupTestFromExtension(combinedExtension)

    const docText = editor.state.doc.textContent

    // When all have same priority, later extensions override earlier ones
    expect(docText).toEqual('third')
  })
})
