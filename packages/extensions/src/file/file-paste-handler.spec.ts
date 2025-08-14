import {
  Priority,
  union,
  withPriority,
} from '@prosekit/core'
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest'

import {
  defineTestExtension,
  setupTestFromExtension,
} from '../testing'
import { pasteFiles } from '../testing/clipboard'

import { defineFilePasteHandler } from './file-paste-handler'

function definePngPasteHandler(handler: VoidFunction) {
  const extension = defineFilePasteHandler((options) => {
    if (options.file.type === 'image/png') {
      handler()
      return true
    }
  })
  return withPriority(extension, Priority.high)
}

function defineImagePasteHandler(handler: VoidFunction) {
  const extension = defineFilePasteHandler((options) => {
    if (options.file.type.startsWith('image/')) {
      handler()
      return true
    }
  })
  return withPriority(extension, Priority.default)
}

function defineFallbackPasteHandler(handler: VoidFunction) {
  const extension = defineFilePasteHandler(() => {
    handler()
    return true
  })
  return withPriority(extension, Priority.low)
}

describe('file paste handler', () => {
  const pngHandler = vi.fn()
  const imageHandler = vi.fn()
  const fallbackHandler = vi.fn()

  const extension = union(
    defineTestExtension(),
    defineImagePasteHandler(imageHandler),
    definePngPasteHandler(pngHandler),
    defineFallbackPasteHandler(fallbackHandler),
  )
  const { editor } = setupTestFromExtension(extension)
  const paste = (files: File[]) => {
    pasteFiles(editor.view, files)
  }

  beforeEach(() => {
    pngHandler.mockClear()
    imageHandler.mockClear()
    fallbackHandler.mockClear()
  })

  it('should handle file pasting', () => {
    paste([new File([''], 'test.png', { type: 'image/png' })])
    expect(pngHandler).toHaveBeenCalled()
    expect(imageHandler).not.toHaveBeenCalled()
    expect(fallbackHandler).not.toHaveBeenCalled()
  })

  it('should handle priority', () => {
    paste([new File([''], 'test.jpg', { type: 'image/jpg' })])
    expect(pngHandler).not.toHaveBeenCalled()
    expect(imageHandler).toHaveBeenCalled()
    expect(fallbackHandler).not.toHaveBeenCalled()
  })

  it('should handle multiple files', () => {
    paste([
      new File([''], 'test.png', { type: 'image/png' }),
      new File([''], 'test.pdf', { type: 'application/pdf' }),
    ])
    expect(pngHandler).toHaveBeenCalled()
    expect(imageHandler).not.toHaveBeenCalled()
    expect(fallbackHandler).toHaveBeenCalled()
  })
})
