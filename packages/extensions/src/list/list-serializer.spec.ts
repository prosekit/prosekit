import { userEvent } from '@vitest/browser/context'
import {
  describe,
  expect,
  it,
} from 'vitest'

import {
  pressKey,
  setupTest,
} from '../testing'

describe('serializer', () => {
  const { editor, n } = setupTest()

  it('can serialize list nodes', async () => {
    const doc1 = n.doc(
      //
      n.bullet(n.p('foo')),
      n.bullet(n.p('bar<a>')),
    )
    editor.set(doc1)
    editor.focus()
    await userEvent.keyboard('ControlOrMeta+A')
    await userEvent.copy()

    // Get the clipboard data
    const clipboard = await navigator.clipboard.read()
    console.log(clipboard)
  })
})
