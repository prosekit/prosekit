import type { Page } from '@playwright/test'

import { exampleMeta } from '../example.meta'

export function getExamples(story: string) {
  return exampleMeta.examples
    .map((example) => {
      return example.name
    })
    .filter((name) => {
      const [_, ...rest] = name.split('-')
      return story === rest.join('-')
    })
    .map((name) => {
      const url = `http://localhost:4321/${name}`
      return { name, url }
    })
}

export function locateEditor(page: Page) {
  return page.locator('.ProseMirror')
}
