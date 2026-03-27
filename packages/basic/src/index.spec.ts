import { createEditor, union } from '@prosekit/core'
import { describe, expect, it } from 'vitest'

import { defineBasicExtension } from './index'

describe('defineBasicExtension', () => {
  it('can add nodes and marks', () => {
    const extension = union(defineBasicExtension())
    const editor = createEditor({ extension })
    const schema = editor.schema
    const nodes = Object.keys(schema.nodes).sort()
    const marks = Object.keys(schema.marks).sort()

    expect(nodes).toContain('heading')
    expect(nodes).toContain('list')
    expect(nodes).toContain('paragraph')
    expect(nodes).toContain('text')
    expect(nodes).toContain('doc')

    expect(marks).toContain('italic')
  })
})

describe('BasicExtension', () => {
  const extension = defineBasicExtension()
  const editor = createEditor({ extension })

  it('can throw TypeScript error for non existing command', () => {
    expect(() => {
      // @ts-expect-error: expected to throw
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      editor.commands.this_command_does_not_exit()
    }).toThrow()

    expect(() => {
      editor.commands.insertNode({ type: 'heading' })
    }).not.toThrow()
  })

  it('can throw TypeScript error for incorrect command arguments', () => {
    expect(() => {
      // @ts-expect-error: expected to throw
      editor.commands.insertNode({ this_argument_does_not_exist: true })
    }).toThrow()

    expect(() => {
      editor.commands.insertNode({ type: 'heading' })
    }).not.toThrow()
  })
})
