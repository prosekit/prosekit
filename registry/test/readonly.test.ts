import { expect, it } from 'vitest'
import { page, userEvent } from 'vitest/browser'

import { focusEditor, testStory, testStoryConsistency, waitForEditor } from './helpers'

testStoryConsistency('readonly')

testStory('readonly', () => {
  it('readonly', async () => {
    const editor = await waitForEditor()

    const readonlyButton = page.getByRole('button', { name: 'Readonly' })
    const editableButton = page.getByRole('button', { name: 'Editable' })

    await expect.element(readonlyButton).toHaveAttribute('data-state', 'on')
    await expect.element(editableButton).toHaveAttribute('data-state', 'off')

    await expect.element(editor).not.toHaveTextContent('foo')
    await expect.element(editor).not.toHaveTextContent('bar')
    await expect.element(editor).not.toHaveTextContent('baz')

    await editableButton.click()
    await focusEditor()
    await userEvent.type(editor, 'foo')
    await expect.element(editor).toHaveTextContent('foo')
    await expect.element(editor).not.toHaveTextContent('bar')
    await expect.element(editor).not.toHaveTextContent('baz')

    await readonlyButton.click()
    await focusEditor()
    await userEvent.type(editor, 'bar')
    await expect.element(editor).toHaveTextContent('foo')
    await expect.element(editor).not.toHaveTextContent('bar')
    await expect.element(editor).not.toHaveTextContent('baz')

    await editableButton.click()
    await focusEditor()
    await userEvent.type(editor, 'baz')
    await expect.element(editor).toHaveTextContent('foo')
    await expect.element(editor).not.toHaveTextContent('bar')
    await expect.element(editor).toHaveTextContent('baz')
  })
})
