import { union } from '@prosekit/core'
import { describe, expect, it } from 'vitest'
import { keyboard } from 'vitest-browser-commands/playwright'

import { defineDoc } from '../doc/index.ts'
import { defineParagraph } from '../paragraph/index.ts'
import { setupTest, setupTestFromExtension } from '../testing/index.ts'
import { defineText } from '../text/index.ts'

import { defineListCommands } from './list-commands.ts'
import { defineListKeymap } from './list-keymap.ts'
import { defineListPlugins } from './list-plugins.ts'
import { defineListSpec } from './list-spec.ts'

describe('keymap', () => {
  const { editor, n } = setupTest()

  it('can update indentation', async () => {
    const doc1 = n.doc(
      //
      n.bullet(n.p('foo')),
      n.bullet(n.p('bar<a>')),
    )
    const doc2 = n.doc(
      //
      n.bullet(
        //
        n.p('foo'),
        n.bullet(n.p('bar<a>')),
      ),
    )
    editor.set(doc1)

    await keyboard.press('ControlOrMeta+]')
    expect(editor.state.doc.toJSON()).toEqual(doc2.toJSON())
    await keyboard.press('ControlOrMeta+[')
    expect(editor.state.doc.toJSON()).toEqual(doc1.toJSON())

    await keyboard.press('Tab')
    expect(editor.state.doc.toJSON()).toEqual(doc2.toJSON())
    await keyboard.press('Shift+Tab')
    expect(editor.state.doc.toJSON()).toEqual(doc1.toJSON())
  })

  it('can refuse to indent the first list node in strict mode', async () => {
    const { editor, n } = setupTestFromExtension(
      union(
        defineDoc(),
        defineText(),
        defineParagraph(),
        defineListSpec(),
        defineListPlugins(),
        defineListCommands(),
        defineListKeymap({ strict: true }),
      ),
    )
    const doc1 = n.doc(
      //
      n.list({ kind: 'bullet' }, n.paragraph('foo<a>')),
      n.list({ kind: 'bullet' }, n.paragraph('bar')),
    )
    editor.set(doc1)

    await keyboard.press('Tab')
    expect(editor.state.doc.toJSON()).toEqual(doc1.toJSON())
    expect(editor.commands.indentList.canExec({ strict: true })).toBe(false)
  })
})
