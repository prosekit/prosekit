import { expect, it } from 'vitest'
import { page } from 'vitest/browser'

import { testStory, testStoryConsistency, waitForEditor } from './helpers'

testStoryConsistency('tweet')

testStory('tweet', () => {
  it('can switch between iframe and react mode', async () => {
    const editor = await waitForEditor()
    const iframe = editor.locate('iframe[src^="https://platform.twitter.com/embed/Tweet.html"]')
    const nodeViewRoot = editor.locate('[data-node-view-root="true"]')
    const reactRadio = page.getByRole('radio', { name: /react-tweet/ })
    const iframeRadio = page.getByRole('radio', { name: 'iframe' })

    const expectIframe = async () => {
      await expect.element(iframe).toBeVisible()
      await expect.element(nodeViewRoot).not.toBeInTheDocument()
    }

    const expectNodeViewRoot = async () => {
      await expect.element(nodeViewRoot).toBeVisible()
      await expect.element(iframe).not.toBeInTheDocument()
    }

    // Render the tweet in iframe mode by default
    await expectIframe()

    // Switch to react mode
    await reactRadio.click()

    // Verify the tweet is rendered in react mode
    await expectNodeViewRoot()

    // Switch back to iframe mode
    await iframeRadio.click()

    // Verify the tweet is rendered in iframe mode
    await expectIframe()
  })
})
