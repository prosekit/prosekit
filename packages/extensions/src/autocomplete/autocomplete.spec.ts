import {
  canUseRegexLookbehind,
  union,
} from '@prosekit/core'
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
  type MatchHandlerOptions,
} from './autocomplete-rule'

function setupSlashMenu() {
  const regex = canUseRegexLookbehind() ? /(?<!\S)\/(\S.*)?$/u : /\/(\S.*)?$/u

  let matching: MatchHandlerOptions | null = null

  const onEnter = vi.fn<MatchHandler>((options) => {
    matching = options
  })
  const onLeave = vi.fn<VoidFunction>(() => {
    if (matching) {
      matching = null
    } else {
      throw new Error('onLeave should not be called when there is no matching')
    }
  })

  const rule = new AutocompleteRule({ regex, onEnter, onLeave })
  const extension = union(defineTestExtension(), defineAutocomplete(rule))
  const { editor, n, m } = setupTestFromExtension(extension)

  const doc = n.doc(n.paragraph('<a>'))
  editor.set(doc)

  const isMatching = (): boolean => {
    return !!matching
  }

  const getMatching = (): MatchHandlerOptions => {
    if (!matching) {
      throw new Error('No matching found')
    }
    return matching
  }

  const getMatchingText = (): string => {
    return getMatching().match[0]
  }

  const showSelection = (): string => {
    const { selection, doc } = editor.state
    const textBackward = doc.textBetween(0, selection.from, '\n')
    const textSelected = doc.textBetween(selection.from, selection.to, '\n')
    const textForward = doc.textBetween(selection.to, doc.content.size, '\n')
    if (selection.empty) {
      return textBackward + '<cursor>' + textForward
    } else {
      return textBackward + '<selection>' + textSelected + '<selection>' + textForward
    }
  }

  return { editor, n, m, onEnter, onLeave, getMatching, isMatching, getMatchingText, showSelection }
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

  it('can delete the matched text', async () => {
    const { editor, onEnter, getMatching } = setupSlashMenu()

    expect(onEnter).not.toHaveBeenCalled()

    await inputText('/')
    expect(onEnter).toHaveBeenCalledTimes(1)

    const options = getMatching()
    expect(editor.state.doc.textContent).toBe('/')
    options.deleteMatch()
    expect(editor.state.doc.textContent).toBe('')
  })

  it('can ignore the match by calling `ignoreMatch`', async () => {
    const { editor, onEnter, onLeave, getMatching } = setupSlashMenu()

    expect(onEnter).not.toHaveBeenCalled()

    await inputText('/')
    expect(onEnter).toHaveBeenCalledTimes(1)
    expect(onLeave).toHaveBeenCalledTimes(0)
    expect(editor.state.doc.textContent).toBe('/')

    // Typing should trigger autocomplete
    await inputText('a')
    expect(onEnter).toHaveBeenCalledTimes(2)
    expect(onLeave).toHaveBeenCalledTimes(0)
    expect(editor.state.doc.textContent).toBe('/a')

    // Call `ignoreMatch` to dismiss the match
    const options = getMatching()
    options.ignoreMatch()
    expect(onEnter).toHaveBeenCalledTimes(2)
    expect(onLeave).toHaveBeenCalledTimes(1)

    // Typing should not trigger autocomplete anymore
    await inputText('a')
    expect(onEnter).toHaveBeenCalledTimes(2)
    expect(onLeave).toHaveBeenCalledTimes(1)
    expect(editor.state.doc.textContent).toBe('/aa')
  })

  it('can dismiss the match by deleting the matched text', async () => {
    const { isMatching, showSelection } = setupSlashMenu()

    expect(showSelection()).toMatchInlineSnapshot(`"<cursor>"`)
    expect(isMatching()).toBe(false)

    await inputText('/')
    expect(showSelection()).toMatchInlineSnapshot(`"/<cursor>"`)
    expect(isMatching()).toBe(true)

    await pressKey('Backspace')
    expect(showSelection()).toMatchInlineSnapshot(`"<cursor>"`)
    expect(isMatching()).toBe(false)
  })

  it('can recover the match after dismissing from Backspace', async () => {
    const { isMatching, showSelection } = setupSlashMenu()

    expect(showSelection()).toMatchInlineSnapshot(`"<cursor>"`)
    expect(isMatching()).toBe(false)

    await inputText('/')
    expect(showSelection()).toMatchInlineSnapshot(`"/<cursor>"`)
    expect(isMatching()).toBe(true)

    await pressKey('Backspace')
    expect(showSelection()).toMatchInlineSnapshot(`"<cursor>"`)
    expect(isMatching()).toBe(false)

    await inputText('/')
    expect(showSelection()).toMatchInlineSnapshot(`"/<cursor>"`)
    expect(isMatching()).toBe(true)
  })

  it('can recover the match after dismissing from onLeave', async () => {
    const { isMatching, showSelection, getMatching } = setupSlashMenu()

    expect(showSelection()).toMatchInlineSnapshot(`"<cursor>"`)
    expect(isMatching()).toBe(false)

    await inputText('/')
    expect(showSelection()).toMatchInlineSnapshot(`"/<cursor>"`)
    expect(isMatching()).toBe(true)

    const matching = getMatching()
    expect(matching).toBeTruthy()
    matching?.ignoreMatch()
    expect(showSelection()).toMatchInlineSnapshot(`"/<cursor>"`)
    expect(isMatching()).toBe(false)

    await pressKey('Backspace')
    expect(showSelection()).toMatchInlineSnapshot(`"<cursor>"`)
    expect(isMatching()).toBe(false)

    await inputText('/')
    expect(showSelection()).toMatchInlineSnapshot(`"/<cursor>"`)
    expect(isMatching()).toBe(true)
  })

  it('can dismiss the match by creating a new paragraph', async () => {
    const { isMatching, showSelection } = setupSlashMenu()

    expect(showSelection()).toMatchInlineSnapshot(`"<cursor>"`)
    expect(isMatching()).toBe(false)

    await inputText('/')
    expect(showSelection()).toMatchInlineSnapshot(`"/<cursor>"`)
    expect(isMatching()).toBe(true)

    await pressKey('Enter')
    expect(showSelection()).toMatchInlineSnapshot(`
      "/
      <cursor>"
    `)
    expect(isMatching()).toBe(false)
  })

  it('can keep the match when selecting the text', async () => {
    const { isMatching, showSelection } = setupSlashMenu()

    expect(showSelection()).toMatchInlineSnapshot(`"<cursor>"`)
    expect(isMatching()).toBe(false)

    await inputText('/page')
    expect(showSelection()).toMatchInlineSnapshot(`"/page<cursor>"`)
    expect(isMatching()).toBe(true)

    await pressKey('Shift-ArrowLeft-ArrowLeft')
    expect(showSelection()).toMatchInlineSnapshot(`"/pa<selection>ge<selection>"`)
    expect(isMatching()).toBe(true)
  })

  it('can ignore the match by moving the text cursor outside of the match', async () => {
    const { onEnter, isMatching, getMatchingText, showSelection } = setupSlashMenu()

    expect(onEnter).not.toHaveBeenCalled()

    expect(showSelection()).toMatchInlineSnapshot(`"<cursor>"`)
    expect(isMatching()).toBe(false)

    await inputText('a ')
    expect(showSelection()).toMatchInlineSnapshot(`"a <cursor>"`)
    expect(isMatching()).toBe(false)

    await inputText('/')
    expect(showSelection()).toMatchInlineSnapshot(`"a /<cursor>"`)
    expect(isMatching()).toBe(true)
    expect(getMatchingText()).toBe('/')

    await inputText('b')
    expect(showSelection()).toMatchInlineSnapshot(`"a /b<cursor>"`)
    expect(isMatching()).toBe(true)
    expect(getMatchingText()).toBe('/b')

    await pressKey('ArrowLeft')
    expect(showSelection()).toMatchInlineSnapshot(`"a /<cursor>b"`)
    expect(isMatching()).toBe(true)
    expect(getMatchingText()).toBe('/b')

    await pressKey('ArrowLeft')
    expect(showSelection()).toMatchInlineSnapshot(`"a <cursor>/b"`)
    expect(isMatching()).toBe(true)
    expect(getMatchingText()).toBe('/b')

    await pressKey('ArrowLeft')
    expect(showSelection()).toMatchInlineSnapshot(`"a<cursor> /b"`)
    expect(isMatching()).toBe(false)

    await pressKey('ArrowRight')
    expect(showSelection()).toMatchInlineSnapshot(`"a <cursor>/b"`)
    expect(isMatching()).toBe(false)

    await pressKey('ArrowRight')
    expect(showSelection()).toMatchInlineSnapshot(`"a /<cursor>b"`)
    expect(isMatching()).toBe(false)

    await pressKey('Backspace')
    await pressKey('Backspace')
    expect(showSelection()).toMatchInlineSnapshot(`"a<cursor>b"`)
    expect(isMatching()).toBe(false)

    await inputText(' /')
    expect(showSelection()).toMatchInlineSnapshot(`"a /<cursor>b"`)
    expect(isMatching()).toBe(true)
    expect(getMatchingText()).toBe('/')

    await inputText('c')
    expect(showSelection()).toMatchInlineSnapshot(`"a /c<cursor>b"`)
    expect(isMatching()).toBe(true)
    expect(getMatchingText()).toBe('/c')

    await inputText('d')
    expect(showSelection()).toMatchInlineSnapshot(`"a /cd<cursor>b"`)
    expect(isMatching()).toBe(true)
    expect(getMatchingText()).toBe('/cd')

    await pressKey('ArrowRight')
    expect(showSelection()).toMatchInlineSnapshot(`"a /cdb<cursor>"`)
    expect(isMatching()).toBe(false)
  })
})
