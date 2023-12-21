import type { Page } from '@playwright/test'

import { exampleMeta } from '../example.meta'

export function getExamples(story: string) {
  return exampleMeta.examples
    .filter((example) => example.story === story)
    .map((example) => example.name)
}

export function locateEditor(page: Page) {
  return page.locator('.ProseMirror')
}
