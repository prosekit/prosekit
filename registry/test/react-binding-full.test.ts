import { expect, it } from 'vitest'
import { page, userEvent } from 'vitest/browser'

import { testStory, waitForEditor } from './helpers'

testStory({ story: 'react-binding-full', frameworks: ['react'] }, () => {
  it('renders and supports editing', async () => {
    const editor = await waitForEditor()

    await expect.poll(() => editor.locate('img').elements().length).toBe(1)
    await expect.element(page.getByRole('link', { name: '@handlewithcare/react-prosemirror' })).toHaveAttribute(
      'href',
      'https://github.com/handlewithcarecollective/react-prosemirror',
    )
    await userEvent.click(editor)
    await userEvent.type(editor, 'Hello binding')
    await expect.element(editor).toHaveTextContent('Hello binding')

    const toggleWidth = page.getByRole('button', { name: 'Toggle width' })
    await toggleWidth.click()
    await expect.element(editor.locate('img')).toHaveAttribute('width', '640')
  })
})
