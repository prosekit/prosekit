import {
  findNode,
  findNodes,
} from '@prosekit/core'
import {
  describe,
  expect,
  it,
  vi,
} from 'vitest'

import type { ImageAttrs } from '..'
import type { Uploader } from '../../file'
import { setupTest } from '../../testing'

import type { ProseMirrorNode } from '@prosekit/pm/model'
import {
  replaceImageURL,
  uploadImage,
} from './upload-image'

describe('uploadImage', () => {
  it('should insert image at current selection by default', () => {
    const { editor, n, mockUploader, file, findImage } = setup()
    const doc = n.doc(n.paragraph('hello'))
    editor.set(doc)
    editor.view.dispatch(editor.state.tr.setSelection(editor.state.selection))

    const command = uploadImage({ uploader: mockUploader, file })
    expect(editor.exec(command)).toBe(true)

    expect(findImage().attrs.src).toMatch(/^blob:/)
  })

  it('should insert image at specified position', () => {
    const { editor, n, mockUploader, file, findImage } = setup()
    const doc = n.doc(
      /*0*/
      n.paragraph(/*1*/ 'hello' /*6*/),
      /*7*/
      n.paragraph(/*8*/ 'world' /*13*/),
      /*14*/
    )
    editor.set(doc)

    const imagePos = 7
    const command = uploadImage({ uploader: mockUploader, file, pos: imagePos })
    expect(editor.exec(command)).toBe(true)

    expect(findImage().pos).toBe(imagePos)
  })

  it('should replace existing image when replace=true', () => {
    const { editor, n, mockUploader, file, findImage } = setup()
    const doc = n.doc(
      /*0*/
      n.paragraph(/*1*/ 'hello' /*6*/),
      /*7*/
      n.image({ src: 'https://example.com/old.png' }),
      /*8*/
      n.paragraph(/*9*/ 'world' /*14*/),
      /*15*/
    )
    editor.set(doc)

    const imagePos = 7
    const command = uploadImage({
      uploader: mockUploader,
      file,
      pos: imagePos,
      replace: true,
    })
    expect(editor.exec(command)).toBe(true)

    expect(findImage().attrs.src).toMatch(/^blob:/)
    expect(findImage().attrs.src).not.toBe('https://example.com/old.png')
  })

  it('should not replace when same src is already set', () => {
    const { editor, n, mockUploader, file, findImage } = setup()
    const blobURL = 'blob:test-url'
    const doc = n.doc(
      n.paragraph('hello'),
      n.image({ src: blobURL }),
      n.paragraph('world'),
    )
    editor.set(doc)

    const createObjectURLSpy = vi.spyOn(URL, 'createObjectURL')
    createObjectURLSpy.mockReturnValue(blobURL)

    const initialState = editor.state
    const dispatch = vi.fn()

    const command = uploadImage({
      uploader: mockUploader,
      file,
      pos: findImage().pos,
      replace: true,
    })
    const result = command(initialState, dispatch, editor.view)

    expect(result).toBe(true)
    expect(dispatch).not.toHaveBeenCalled()

    createObjectURLSpy.mockRestore()
  })

  it('should insert image when replace=true but position has non-image node', () => {
    const { editor, n, mockUploader, file, findImage } = setup()
    const doc = n.doc(n.paragraph('hello'), n.paragraph('world'))
    editor.set(doc)

    const paragraphPos = findNode(editor.state.doc, (node) => node.type.name === 'paragraph')?.pos ?? -1

    const command = uploadImage({
      uploader: mockUploader,
      file,
      pos: paragraphPos,
      replace: true,
    })
    expect(editor.exec(command)).toBe(true)

    expect(() => findImage()).not.toThrow()
  })

  it('should call onError when upload fails', async () => {
    const { editor, n, file } = setup()
    const error = new Error('Upload failed')
    const failingUploader: Uploader<string> = vi.fn().mockRejectedValue(error)
    const onError = vi.fn()

    const doc = n.doc(n.paragraph('hello'))
    editor.set(doc)

    const command = uploadImage({
      uploader: failingUploader,
      file,
      onError,
    })
    editor.exec(command)

    await new Promise((resolve) => setTimeout(resolve, 10))

    expect(onError).toHaveBeenCalled()
    const callArg = onError.mock.calls[0][0] as {
      file: File
      error: { cause: Error }
      uploadTask: unknown
    }
    expect(callArg.file).toBe(file)
    expect(callArg.uploadTask).toBeDefined()
    expect(callArg.error.cause).toBe(error)
  })
})

describe('replaceImageURL', () => {
  it('should replace single image URL', () => {
    const { editor, n, findImage } = setup()
    const doc = n.doc(
      n.paragraph('hello'),
      n.image({ src: 'blob:old-url' }),
      n.paragraph('world'),
    )
    editor.set(doc)

    replaceImageURL(editor.view, 'blob:old-url', 'https://example.com/new.png')

    expect(findImage().attrs.src).toBe('https://example.com/new.png')
  })

  it('should replace multiple image URLs', () => {
    const { editor, n, findImageAttrs } = setup()
    const doc = n.doc(
      n.paragraph('hello'),
      n.image({ src: 'blob:old-url' }),
      n.paragraph('middle'),
      n.image({ src: 'blob:old-url' }),
      n.paragraph('world'),
    )
    editor.set(doc)

    replaceImageURL(editor.view, 'blob:old-url', 'https://example.com/new.png')

    const imageAttrs = findImageAttrs()
    expect(imageAttrs).toHaveLength(2)
    expect(imageAttrs[0].src).toBe('https://example.com/new.png')
    expect(imageAttrs[1].src).toBe('https://example.com/new.png')
  })

  it('should not replace images with different URLs', () => {
    const { editor, n, findImageAttrs } = setup()
    const doc = n.doc(
      n.paragraph('hello'),
      n.image({ src: 'blob:old-url' }),
      n.image({ src: 'blob:different-url' }),
      n.paragraph('world'),
    )
    editor.set(doc)

    replaceImageURL(editor.view, 'blob:old-url', 'https://example.com/new.png')

    const imageAttrs = findImageAttrs()
    expect(imageAttrs).toHaveLength(2)
    expect(imageAttrs[0].src).toBe('https://example.com/new.png')
    expect(imageAttrs[1].src).toBe('blob:different-url')
  })

  it('should do nothing when no images match', () => {
    const { editor, n } = setup()
    const doc = n.doc(
      n.paragraph('hello'),
      n.image({ src: 'blob:different-url' }),
      n.paragraph('world'),
    )
    editor.set(doc)

    const initialState = editor.state

    replaceImageURL(editor.view, 'blob:non-existent', 'https://example.com/new.png')

    expect(editor.state).toBe(initialState)
  })
})

function isImage(node: ProseMirrorNode) {
  return node.type.name === 'image'
}

function setup() {
  const { editor, n } = setupTest()
  const mockUploader = vi.fn().mockResolvedValue('https://example.com/uploaded.png')
  const file = new File(['test'], 'test.png', { type: 'image/png' })

  const findImage = (): {
    pos: number
    attrs: ImageAttrs
    node: ProseMirrorNode
  } => {
    const found = findNode(editor.state.doc, isImage)
    if (!found) {
      throw new Error('Image not found')
    }
    const { pos, node } = found
    const attrs = node.attrs as ImageAttrs
    return { pos, attrs, node }
  }

  const findImages = () => {
    return findNodes(editor.state.doc, isImage)
  }

  const findImageURLs = (): string[] => {
    return findImages().map(({ node }) => (node.attrs as ImageAttrs).src || '')
  }

  const countImages = (): number => {
    return findImages().length
  }

  return { editor, n, mockUploader, file, findImage, findImageURLs, countImages }
}
