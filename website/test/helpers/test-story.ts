import { sleep } from '@ocavue/utils'
import {
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest'

import exampleMeta from '../../example.meta.json' with { type: 'json' }

import { waitForEditor } from './editor'
import { formatHTML } from './format-html'

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

  // Temporary skip some stories
  if (story === 'full' || story === 'keymap' || story === 'link-mark-view') {
    return
  }

  it(`should render the same "${story}" story across ${examples.length} frameworks`, async () => {
    const htmlToExamples = new Map<string, string[]>()
    for (const example of examples) {
      const html = await getStableHTML(example.framework, example.story)
      const group = htmlToExamples.get(html) || []
      group.push(example.name)
      htmlToExamples.set(html, group)
    }

    if (htmlToExamples.size <= 1) {
      return
    }

    const iterator = htmlToExamples.entries()
    const [html1, examples1] = iterator.next().value!
    const [html2, examples2] = iterator.next().value!

    let message = `Expected "${examples1.join(', ')}" and "${examples2.join(', ')}" to render the same HTML.`
    message += '\n'
    message += '='.repeat(20) + ' HTML from ' + examples1.join(', ') + ' ' + '='.repeat(20) + '\n'
    message += html1 + '\n'
    message += '='.repeat(20) + ' HTML from ' + examples2.join(', ') + ' ' + '='.repeat(20) + '\n'
    message += html2 + '\n'
    message += '='.repeat(20) + ' END ' + '='.repeat(20) + '\n'

    expect(html1, message).toEqual(html2)
  })
}

async function getStableHTML(framework: string, story: string): Promise<string> {
  const screen = await renderExample(framework, story)
  await waitForEditor()
  return await waitForStableHTML(screen.container)
}

async function waitForStableHTML(element: Element, stableCount = 2, maxAttempts: number = 100): Promise<string> {
  let stableHTML: string = ''
  let stableCounter = 0
  let attempts = 0

  while (stableCounter < stableCount && attempts < maxAttempts) {
    attempts += 1

    let html = formatHTML(element.innerHTML)
    // Replace random ids
    html = html.replaceAll(/id="[\w-]+"/g, 'id="SOME_ID"')
    // Remove Solid framework wrapper divs with display: contents
    html = html.replaceAll(/<div style="display: contents;">\s*/g, '')
    html = html.replaceAll(/<div style="display:\s*contents;">\s*/g, '')
    html = html.replaceAll(/\s*<\/div>\s*(<\/(?:span|a)>)/g, '$1')

    if (html === stableHTML) {
      stableCounter += 1
    } else {
      stableHTML = html
      stableCounter = 0
    }

    await new Promise((resolve) => requestAnimationFrame(resolve))
  }

  return stableHTML
}
