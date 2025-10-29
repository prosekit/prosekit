import {
  expect,
  it,
} from 'vitest'
import {
  page,
  userEvent,
} from 'vitest/browser'

import {
  emptyEditor,
  locateEditor,
  testStory,
} from './helpers'

testStory('emoji-rules', () => {
  it('convert :apple: and :banana: on Enter', async () => {
    const editor = locateEditor()
    await emptyEditor()

    await editor.click()
    await userEvent.type(editor, ':apple:')
    await userEvent.keyboard('{Enter}')
    await expect.element(page.getByText('🍎')).toBeVisible()

    await userEvent.keyboard('{Enter}')
    await userEvent.type(editor, ':banana:')
    await userEvent.keyboard('{Enter}')
    await expect.element(page.getByText('🍌')).toBeVisible()
  })
})
