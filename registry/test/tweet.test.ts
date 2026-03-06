import { expect, it } from 'vitest'
import { page } from 'vitest/browser'

import { testStory, testStoryConsistency, waitForEditor } from './helpers'

testStoryConsistency('tweet')

testStory('tweet', () => {
  it('can switch between basic and advanced mode', async () => {
    const editor = await waitForEditor()
    const iframe = editor.locate('iframe[src^="https://platform.twitter.com/embed/Tweet.html"]')
    const nodeViewRoot = editor.locate('[data-node-view-root="true"]')
    const advancedRadio = page.getByRole('radio', { name: 'advanced' })
    const basicRadio = page.getByRole('radio', { name: 'basic' })

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

    // Switch to node view mode
    await advancedRadio.click()

    // Verify the tweet is rendered in node view
    await expectNodeViewRoot()

    // Switch back to iframe mode
    await basicRadio.click()

    // Verify the tweet is rendered in iframe mode
    await expectIframe()
  })
})
