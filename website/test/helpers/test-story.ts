import formatHTML from 'diffable-html'
import {
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest'

import exampleMeta from '../../example.meta.json' with { type: 'json' }

function getExamples(story: string) {
  const examples = exampleMeta.examples.filter(
    (example) => example.story === story,
  )

  if (examples.length === 0) {
    throw new Error(`No examples found for story "${story}"`)
  }

  return examples
}

function testSingleStory(
  story: string,
  callback: (options: { framework: string; story: string; example: string }) => void,
) {
  for (const example of getExamples(story)) {
    describe(example.framework + '/' + example.story, () => {
      beforeEach(async () => {
        await renderExample(example.framework, example.story)
      })
      callback({
        framework: example.framework,
        story: example.story,
        example: example.name,
      })
    })
  }
}

async function renderExample(framework: string, story: string) {
  if (framework === 'react') {
    const { renderReactExample } = await import('./render-react')
    return await renderReactExample(story)
  }

  if (framework === 'vue') {
    const { renderVueExample } = await import('./render-vue')
    return await renderVueExample(story)
  }

  if (framework === 'svelte') {
    const { renderSvelteExample } = await import('./render-svelte')
    return await renderSvelteExample(story)
  }

  if (framework === 'solid') {
    const { renderSolidExample } = await import('./render-solid')
    return await renderSolidExample(story)
  }

  if (framework === 'preact') {
    const { renderPreactExample } = await import('./render-preact')
    return await renderPreactExample(story)
  }

  throw new Error(`The ${framework} framework is not supported`)
}

export function testStory(
  story: string | string[],
  callback: (options: { framework: string; story: string; example: string }) => void,
) {
  const stories = Array.isArray(story) ? story : [story]

  for (const story of stories) {
    testSingleStory(story, callback)
  }
}

export function testStoryConsistency(story: string) {
  const examples = getExamples(story)

  if (examples.length <= 1) {
    return
  }

  it(`should render the same "${story}" story across ${examples.length} frameworks`, async () => {
    // Render the first framework example as the baseline
    const firstExample = examples[0]
    const firstScreen = await renderExample(firstExample.framework, firstExample.story)
    const expectedHtml = formatHTML(firstScreen.container.innerHTML)

    // Compare each remaining framework against the baseline
    for (let i = 1; i < examples.length; i++) {
      const example = examples[i]
      const screen = await renderExample(example.framework, example.story)
      const actualHtml = formatHTML(screen.container.innerHTML)

      const message = `Expected "${story}" to render the same HTML in ${example.framework} as in ${firstExample.framework}`
      expect(actualHtml, message).toEqual(expectedHtml)
    }
  })
}
