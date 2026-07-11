import { canUseRegexLookbehind, union } from '@prosekit/core'
import { TextSelection } from '@prosekit/pm/state'
import { describe, expect, it, vi } from 'vitest'
import { keyboard } from 'vitest-browser-commands/playwright'

import { defineTestExtension, setupTestFromExtension } from '../testing/index.ts'
import { inputText } from '../testing/keyboard.ts'

import { AutocompleteRule, type MatchHandler, type MatchHandlerOptions } from './autocomplete-rule.ts'
import { defineAutocomplete, triggerAutocomplete } from './autocomplete.ts'

function setupSlashMenu(options?: { followCursor?: boolean }) {
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

  const rule = new AutocompleteRule({ regex, onEnter, onLeave, followCursor: options?.followCursor })
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

  const moveCursor = (pos: number, options?: { pointer?: boolean }): void => {
    const tr = editor.state.tr.setSelection(TextSelection.create(editor.state.doc, pos))
    if (options?.pointer) {
      tr.setMeta('pointer', true)
    }
    editor.view.dispatch(tr)
  }

  return { editor, n, m, onEnter, onLeave, getMatching, isMatching, getMatchingText, showSelection, moveCursor }
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
    await keyboard.press('Space')
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

    await keyboard.press('Backspace')
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

    await keyboard.press('Backspace')
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

    await keyboard.press('Backspace')
    expect(showSelection()).toMatchInlineSnapshot(`"<cursor>"`)
    expect(isMatching()).toBe(false)

    await inputText('/')
    expect(showSelection()).toMatchInlineSnapshot(`"/<cursor>"`)
    expect(isMatching()).toBe(true)
  })

  it('can start a new match after dismissing the previous match', async () => {
    const { isMatching, showSelection, getMatching, getMatchingText } = setupSlashMenu()

    expect(showSelection()).toMatchInlineSnapshot(`"<cursor>"`)
    expect(isMatching()).toBe(false)

    await inputText('a /b')
    expect(showSelection()).toMatchInlineSnapshot(`"a /b<cursor>"`)
    expect(isMatching()).toBe(true)

    getMatching().ignoreMatch()
    expect(showSelection()).toMatchInlineSnapshot(`"a /b<cursor>"`)
    expect(isMatching()).toBe(false)

    await keyboard.press('Space')
    expect(showSelection()).toMatchInlineSnapshot(`"a /b <cursor>"`)
    expect(isMatching()).toBe(false)

    await inputText('/')
    expect(showSelection()).toMatchInlineSnapshot(`"a /b /<cursor>"`)
    expect(isMatching()).toBe(true)
    expect(getMatchingText()).toBe('/')

    await inputText('c')
    expect(showSelection()).toMatchInlineSnapshot(`"a /b /c<cursor>"`)
    expect(isMatching()).toBe(true)
    expect(getMatchingText()).toBe('/c')
  })

  it('does not open from a programmatic insert, but opens via triggerAutocomplete', () => {
    const { editor, onEnter, isMatching, getMatchingText } = setupSlashMenu()

    // A programmatic insert bypasses `handleTextInput`, so the menu stays closed.
    editor.commands.insertText({ text: '/' })
    expect(editor.state.doc.textContent).toBe('/')
    expect(isMatching()).toBe(false)
    expect(onEnter).not.toHaveBeenCalled()

    // `triggerAutocomplete` re-scans at the cursor and opens the menu.
    editor.view.dispatch(triggerAutocomplete(editor.state.tr))
    expect(isMatching()).toBe(true)
    expect(onEnter).toHaveBeenCalledTimes(1)
    expect(getMatchingText()).toBe('/')
  })

  it('triggerAutocomplete does nothing when no rule matches at the cursor', () => {
    const { editor, onEnter, isMatching } = setupSlashMenu()

    editor.commands.insertText({ text: 'hello' })
    editor.view.dispatch(triggerAutocomplete(editor.state.tr))
    expect(isMatching()).toBe(false)
    expect(onEnter).not.toHaveBeenCalled()
  })

  it('can dismiss the match by creating a new paragraph', async () => {
    const { isMatching, showSelection } = setupSlashMenu()

    expect(showSelection()).toMatchInlineSnapshot(`"<cursor>"`)
    expect(isMatching()).toBe(false)

    await inputText('/')
    expect(showSelection()).toMatchInlineSnapshot(`"/<cursor>"`)
    expect(isMatching()).toBe(true)

    await keyboard.press('Enter')
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

    await keyboard.down('Shift')
    await keyboard.press('ArrowLeft')
    await keyboard.press('ArrowLeft')
    await keyboard.up('Shift')
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

    await keyboard.press('ArrowLeft')
    expect(showSelection()).toMatchInlineSnapshot(`"a /<cursor>b"`)
    expect(isMatching()).toBe(true)
    expect(getMatchingText()).toBe('/b')

    await keyboard.press('ArrowLeft')
    expect(showSelection()).toMatchInlineSnapshot(`"a <cursor>/b"`)
    expect(isMatching()).toBe(true)
    expect(getMatchingText()).toBe('/b')

    await keyboard.press('ArrowLeft')
    expect(showSelection()).toMatchInlineSnapshot(`"a<cursor> /b"`)
    expect(isMatching()).toBe(false)

    await keyboard.press('ArrowRight')
    expect(showSelection()).toMatchInlineSnapshot(`"a <cursor>/b"`)
    expect(isMatching()).toBe(false)

    await keyboard.press('ArrowRight')
    expect(showSelection()).toMatchInlineSnapshot(`"a /<cursor>b"`)
    expect(isMatching()).toBe(false)

    await keyboard.press('Backspace')
    await keyboard.press('Backspace')
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

    await keyboard.press('ArrowRight')
    expect(showSelection()).toMatchInlineSnapshot(`"a /cdb<cursor>"`)
    expect(isMatching()).toBe(false)
  })
})

describe('followCursor', () => {
  it('extends the match when the cursor moves right over existing text', async () => {
    const { editor, n, getMatchingText, showSelection } = setupSlashMenu({ followCursor: true })
    editor.set(n.doc(n.paragraph('<a>page')))

    await inputText('/')
    await expect.poll(showSelection).toBe('/<cursor>page')
    expect(getMatchingText()).toBe('/')

    await keyboard.press('ArrowRight')
    await expect.poll(showSelection).toBe('/p<cursor>age')
    expect(getMatchingText()).toBe('/p')

    await keyboard.press('ArrowRight')
    await keyboard.press('ArrowRight')
    await keyboard.press('ArrowRight')
    await expect.poll(showSelection).toBe('/page<cursor>')
    expect(getMatchingText()).toBe('/page')
  })

  it('shrinks the match when the cursor moves left', async () => {
    const { editor, n, getMatchingText, showSelection } = setupSlashMenu({ followCursor: true })
    editor.set(n.doc(n.paragraph('<a>page')))

    await inputText('/')
    await keyboard.press('ArrowRight')
    await keyboard.press('ArrowRight')
    await expect.poll(showSelection).toBe('/pa<cursor>ge')
    expect(getMatchingText()).toBe('/pa')

    await keyboard.press('ArrowLeft')
    await expect.poll(showSelection).toBe('/p<cursor>age')
    expect(getMatchingText()).toBe('/p')

    await keyboard.press('ArrowLeft')
    await expect.poll(showSelection).toBe('/<cursor>page')
    expect(getMatchingText()).toBe('/')
  })

  it('deletes the traversed text together with the match', async () => {
    const { editor, n, getMatching, getMatchingText, showSelection } = setupSlashMenu({ followCursor: true })
    editor.set(n.doc(n.paragraph('<a>page')))

    await inputText('/')
    await keyboard.press('ArrowRight')
    await keyboard.press('ArrowRight')
    await keyboard.press('ArrowRight')
    await keyboard.press('ArrowRight')
    await expect.poll(showSelection).toBe('/page<cursor>')
    expect(getMatchingText()).toBe('/page')

    getMatching().deleteMatch()
    expect(editor.state.doc.textContent).toBe('')
  })

  it('closes without a sticky ignore when the cursor moves before the match start', async () => {
    const { editor, n, isMatching, getMatchingText, moveCursor } = setupSlashMenu({ followCursor: true })
    editor.set(n.doc(n.paragraph('<a>page')))

    await inputText('/')
    expect(isMatching()).toBe(true)

    // Move to the match start (right before the slash).
    moveCursor(1)
    expect(isMatching()).toBe(false)

    // Movement alone never reopens the match.
    moveCursor(2)
    expect(isMatching()).toBe(false)

    // Typing reopens it because the trigger was not ignored.
    await inputText('x')
    expect(isMatching()).toBe(true)
    expect(getMatchingText()).toBe('/x')
  })

  it('keeps the sticky dismissal without followCursor', async () => {
    const { editor, n, isMatching, showSelection } = setupSlashMenu()
    editor.set(n.doc(n.paragraph('<a>page')))

    await inputText('/')
    expect(isMatching()).toBe(true)

    await keyboard.press('ArrowRight')
    await expect.poll(showSelection).toBe('/p<cursor>age')
    expect(isMatching()).toBe(false)

    await inputText('x')
    expect(isMatching()).toBe(false)
  })

  it('closes without ignoring when the cursor leaves the textblock', async () => {
    const { editor, n, isMatching, getMatchingText, moveCursor } = setupSlashMenu({ followCursor: true })
    editor.set(n.doc(n.paragraph('<a>abc'), n.paragraph('def')))

    await inputText('/')
    expect(isMatching()).toBe(true)

    await keyboard.press('ArrowDown')
    await expect.poll(isMatching).toBe(false)

    // Move back right after the slash and type: the trigger reopens.
    moveCursor(2)
    expect(isMatching()).toBe(false)
    await inputText('x')
    expect(isMatching()).toBe(true)
    expect(getMatchingText()).toBe('/x')
  })

  it('extends the match on a programmatic cursor move', async () => {
    const { editor, n, getMatchingText, moveCursor } = setupSlashMenu({ followCursor: true })
    editor.set(n.doc(n.paragraph('<a>page')))

    await inputText('/')
    expect(getMatchingText()).toBe('/')

    moveCursor(editor.state.selection.head + 4)
    expect(getMatchingText()).toBe('/page')
  })

  it('keeps the default dismissal for pointer-driven selection', async () => {
    const { editor, n, isMatching, moveCursor } = setupSlashMenu({ followCursor: true })
    editor.set(n.doc(n.paragraph('<a>page')))

    await inputText('/')
    expect(isMatching()).toBe(true)

    moveCursor(editor.state.selection.head + 2, { pointer: true })
    expect(isMatching()).toBe(false)

    // A pointer leave keeps the sticky ignore, matching the default behavior.
    await inputText('x')
    expect(isMatching()).toBe(false)
  })

  it('keeps the match while extending a selection inside it', async () => {
    const { isMatching, getMatchingText, showSelection } = setupSlashMenu({ followCursor: true })

    await inputText('/page')
    expect(getMatchingText()).toBe('/page')

    await keyboard.down('Shift')
    await keyboard.press('ArrowLeft')
    await keyboard.press('ArrowLeft')
    await keyboard.up('Shift')
    await expect.poll(showSelection).toBe('/pa<selection>ge<selection>')
    expect(isMatching()).toBe(true)
    expect(getMatchingText()).toBe('/page')
  })

  it('closes when the cursor moves more than MAX_MATCH past the match start', async () => {
    const { editor, n, isMatching, moveCursor } = setupSlashMenu({ followCursor: true })
    editor.set(n.doc(n.paragraph('<a>' + 'x'.repeat(300))))

    await inputText('/')
    expect(isMatching()).toBe(true)

    moveCursor(editor.state.selection.head + 250)
    expect(isMatching()).toBe(false)
  })

  it('stays ignored after ignoreMatch', async () => {
    const { isMatching, getMatching, showSelection } = setupSlashMenu({ followCursor: true })

    await inputText('/a')
    expect(isMatching()).toBe(true)

    getMatching().ignoreMatch()
    expect(isMatching()).toBe(false)

    await keyboard.press('ArrowLeft')
    await expect.poll(showSelection).toBe('/<cursor>a')
    expect(isMatching()).toBe(false)

    await keyboard.press('ArrowRight')
    await expect.poll(showSelection).toBe('/a<cursor>')
    expect(isMatching()).toBe(false)

    await inputText('b')
    expect(isMatching()).toBe(false)
  })
})
