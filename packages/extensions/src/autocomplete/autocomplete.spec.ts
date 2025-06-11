import { union } from '@prosekit/core'
import {
  describe,
  expect,
  it,
  vi,
} from 'vitest'

import {
  defineTestExtension,
  setupTestFromExtension,
} from '../testing'
import {
  inputText,
  pressKey,
} from '../testing/keyboard'

import { defineAutocomplete } from './autocomplete'
import {
  AutocompleteRule,
  type MatchHandler,
} from './autocomplete-rule'

function setupSlashMenu() {
  const regex = /\/(|\S.*)$/iu

  const onEnter: MatchHandler = vi.fn()
  const onLeave: VoidFunction = vi.fn()

  const rule = new AutocompleteRule({ regex, onEnter, onLeave })
  const extension = union(defineTestExtension(), defineAutocomplete(rule))
  const { editor, n, m } = setupTestFromExtension(extension)

  const doc = n.doc(n.paragraph('<a>'))
  editor.set(doc)

  return { editor, n, m, onEnter, onLeave }
}

describe('defineAutocomplete', () => {
  it('can trigger onEnter', async () => {
    const { onEnter, onLeave } = setupSlashMenu()

    expect(onEnter).not.toHaveBeenCalled()
    expect(onLeave).not.toHaveBeenCalled()

    await inputText('/')
    expect(onEnter).toHaveBeenCalledTimes(1)

    await inputText('order')
    expect(onEnter).toHaveBeenCalledTimes(6)

    await inputText(' ')
    expect(onEnter).toHaveBeenCalledTimes(7)

    await inputText('list')
    expect(onEnter).toHaveBeenCalledTimes(11)
  })

  it('can trigger onLeave', async () => {
    const { onEnter, onLeave } = setupSlashMenu()

    expect(onEnter).not.toHaveBeenCalled()
    expect(onLeave).not.toHaveBeenCalled()

    // Slash menu should be triggered when typing "/"
    await inputText('/')
    expect(onEnter).toHaveBeenCalledTimes(1)
    expect(onLeave).toHaveBeenCalledTimes(0)

    // Slash menu should not be triggered when typing "/ "
    await pressKey('Space')
    expect(onEnter).toHaveBeenCalledTimes(1)
    expect(onLeave).toHaveBeenCalledTimes(1)
  })

  it('can dismiss', async () => {
    const { onEnter, onLeave } = setupSlashMenu()

    expect(onEnter).not.toHaveBeenCalled()
    expect(onLeave).not.toHaveBeenCalled()

    await inputText('/')
    expect(onEnter).toHaveBeenCalledTimes(1)

    await inputText('order')
    expect(onEnter).toHaveBeenCalledTimes(6)

    await inputText(' ')
    expect(onEnter).toHaveBeenCalledTimes(7)

    await inputText('list')
    expect(onEnter).toHaveBeenCalledTimes(11)
  })
})
