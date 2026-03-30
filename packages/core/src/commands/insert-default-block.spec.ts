import { describe, expect, it } from 'vitest'

import { setupTest } from '../testing/index.ts'
import { inputText } from '../testing/keyboard.ts'

import { insertDefaultBlock } from './insert-default-block.ts'

describe('insertDefaultBlock', () => {
  const { editor, n } = setupTest()
  const doc = n.doc(
    /*0*/
    n.p(/*1*/ 'ab' /*3*/),
    /*4*/
    n.p(/*5*/ 'cd' /*7*/),
    /*8*/
  )

  it('can insert a default block before the first text block', async () => {
    editor.set(doc)
    editor.exec(insertDefaultBlock({ pos: 0 }))
    expect(editor.state.doc.toJSON()).toEqual(
      n.doc(n.p(), n.p('ab'), n.p('cd')).toJSON(),
    )
    await inputText('x')
    expect(editor.state.doc.toJSON()).toEqual(
      n.doc(n.p('x'), n.p('ab'), n.p('cd')).toJSON(),
    )
  })

  it('can insert a default block between two text blocks', async () => {
    editor.set(doc)
    editor.exec(insertDefaultBlock({ pos: 4 }))
    expect(editor.state.doc.toJSON()).toEqual(
      n.doc(n.p('ab'), n.p(), n.p('cd')).toJSON(),
    )
    await inputText('x')
    expect(editor.state.doc.toJSON()).toEqual(
      n.doc(n.p('ab'), n.p('x'), n.p('cd')).toJSON(),
    )
  })

  it('can insert a default block after the last text block', async () => {
    editor.set(doc)
    editor.exec(insertDefaultBlock({ pos: 8 }))
    expect(editor.state.doc.toJSON()).toEqual(
      n.doc(n.p('ab'), n.p('cd'), n.p()).toJSON(),
    )
    await inputText('x')
    expect(editor.state.doc.toJSON()).toEqual(
      n.doc(n.p('ab'), n.p('cd'), n.p('x')).toJSON(),
    )
  })

  it('can insert a default block after current text block', async () => {
    for (const pos of [1, 2, 3]) {
      editor.set(doc)
      editor.exec(insertDefaultBlock({ pos }))
      expect(editor.state.doc.toJSON()).toEqual(
        n.doc(n.p('ab'), n.p(), n.p('cd')).toJSON(),
      )
      await inputText('x')
      expect(editor.state.doc.toJSON()).toEqual(
        n.doc(n.p('ab'), n.p('x'), n.p('cd')).toJSON(),
      )
    }

    for (const pos of [5, 6, 7]) {
      editor.set(doc)
      editor.exec(insertDefaultBlock({ pos }))
      expect(editor.state.doc.toJSON()).toEqual(
        n.doc(n.p('ab'), n.p('cd'), n.p()).toJSON(),
      )
      await inputText('x')
      expect(editor.state.doc.toJSON()).toEqual(
        n.doc(n.p('ab'), n.p('cd'), n.p('x')).toJSON(),
      )
    }
  })

  it('can insert a default block after current selection', async () => {
    const doc = n.doc(
      /*0*/
      n.p(/*1*/ 'a<a>b' /*3*/),
      /*4*/
      n.p(/*5*/ 'cd' /*7*/),
      /*8*/
    )
    editor.set(doc)
    editor.exec(insertDefaultBlock())
    expect(editor.state.doc.toJSON()).toEqual(
      n.doc(n.p('ab'), n.p(), n.p('cd')).toJSON(),
    )
    await inputText('x')
    expect(editor.state.doc.toJSON()).toEqual(
      n.doc(n.p('ab'), n.p('x'), n.p('cd')).toJSON(),
    )
  })
})
