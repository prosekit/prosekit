import {
  expect,
  it,
} from 'vitest'
import { page } from 'vitest/browser'

import {
  testStory,
  testStoryConsistency,
  waitForEditor,
} from './helpers'

testStoryConsistency('tweet')

testStory('tweet', () => {
  const setup = async () => {
    const editor = await waitForEditor()
    const iframe = editor.locate('iframe[src^="https://platform.twitter.com/embed/Tweet.html"]')
    const nodeViewRoot = editor.locate('[data-node-view-root="true"]')
    const reactRadio = page.getByRole('radio', { name: 'react-tweet' })
    const iframeRadio = page.getByRole('radio', { name: 'iframe' })

    return {
      iframe,
      nodeViewRoot,
      reactRadio,
      iframeRadio,
    }
  }

  it('renders tweet in iframe mode by default', async () => {
    const { iframe, nodeViewRoot } = await setup()

    await expect.element(iframe).toBeVisible()
    await expect.element(nodeViewRoot).not.toBeInTheDocument()
  })

  it('switches to react mode', async () => {
    const { iframe, nodeViewRoot, reactRadio } = await setup()

    await expect.element(iframe).toBeVisible()
    await expect.element(nodeViewRoot).not.toBeInTheDocument()

    // Switch to react mode
    await reactRadio.click()

    await expect.element(nodeViewRoot).toBeVisible()
    await expect.element(iframe).not.toBeInTheDocument()
  })

  it('switches back to iframe mode', async () => {
    const { iframe, nodeViewRoot, reactRadio, iframeRadio } = await setup()

    // Switch to react mode first
    await reactRadio.click()

    // Switch back to iframe mode
    await iframeRadio.click()

    // Verify iframe is rendered again
    await expect.element(iframe).toBeVisible()
    await expect.element(nodeViewRoot).not.toBeInTheDocument()
  })
})
