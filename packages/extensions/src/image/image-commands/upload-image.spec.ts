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

import type {
  ImageAttrs,
  ImageUploadErrorHandler,
} from '..'
import type { Uploader } from '../../file'
import { setupTest } from '../../testing'

import type { ProseMirrorNode } from '@prosekit/pm/model'
import {
  replaceImageURL,
  uploadImage,
} from './upload-image'
import { sleep } from '@ocavue/utils'

describe('uploadImage', () => {
  it('should insert image at current selection by default', async () => {
    const { editor, n, mockUploader, file, findImage } = setup()
    const doc = n.doc(n.paragraph('hello'))
    editor.set(doc)
    editor.view.dispatch(editor.state.tr.setSelection(editor.state.selection))

    const command = uploadImage({ uploader: mockUploader, file })
    expect(editor.exec(command)).toBe(true)

    expect(findImage().attrs.src).toMatch(/^blob:/)
    await sleep(0)
    expect(findImage().attrs.src).toBe('https://example.com/uploaded.png')
  })

  it('should insert image at specified position', async () => {
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

    expect(findImage().attrs.src).toMatch(/^blob:/)
    await sleep(0)
    expect(findImage().attrs.src).toBe('https://example.com/uploaded.png')
  })

  it('should replace existing image when replace=true', async () => {
    const { editor, n, mockUploader, file, findImageURLs } = setup()
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
    expect(findImageURLs()).toEqual(['https://example.com/old.png'])

    const imagePos = 7
    const command = uploadImage({
      uploader: mockUploader,
      file,
      pos: imagePos,
      replace: true,
    })
    expect(editor.exec(command)).toBe(true)

    await sleep(0)
    expect(findImageURLs()).toEqual(['https://example.com/uploaded.png'])
  })

  it('should not replace existing image when replace=false', async () => {
    const { editor, n, mockUploader, file, findImageURLs } = setup()
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
    expect(findImageURLs()).toEqual(['https://example.com/old.png'])

    const imagePos = 7
    const command = uploadImage({
      uploader: mockUploader,
      file,
      pos: imagePos,
      replace: false,
    })
    expect(editor.exec(command)).toBe(true)
    await sleep(0)
    expect(findImageURLs()).toEqual(['https://example.com/uploaded.png', 'https://example.com/old.png'])
  })

  it('should insert image when replace=true but position has non-image node', async () => {
    const { editor, n, mockUploader, file, findImageURLs } = setup()
    const doc = n.doc(
      /*0*/
      n.paragraph(/*1*/ 'hello' /*6*/),
      /*7*/
      n.paragraph(/*8*/ 'world' /*13*/),
      /*14*/
    )
    editor.set(doc)

    const command = uploadImage({
      uploader: mockUploader,
      file,
      pos: 11,
      replace: true,
    })
    expect(editor.exec(command)).toBe(true)
    expect(editor.state.doc.child(0).type.name).toBe('paragraph')
    expect(editor.state.doc.child(1).type.name).toBe('paragraph')
    expect(editor.state.doc.child(2).type.name).toBe('image')
    await sleep(0)
    expect(findImageURLs()).toEqual(['https://example.com/uploaded.png'])
  })

  it('should call onError when upload fails', async () => {
    const { editor, n, file } = setup()
    const error = new Error('Upload failed')
    const failingUploader: Uploader<string> = vi.fn().mockRejectedValue(error)
    const onError = vi.fn<ImageUploadErrorHandler>()

    const doc = n.doc(n.paragraph('hello'))
    editor.set(doc)

    const command = uploadImage({
      uploader: failingUploader,
      file,
      onError,
    })
    editor.exec(command)

    await sleep(0)
    expect(onError).toHaveBeenCalledOnce()
    const callArg = onError.mock.calls[0][0]
    expect(callArg.file).toBe(file)
    expect(callArg.uploadTask).toBeDefined()
    expect((callArg.error as Error).cause).toBe(error)
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
    const { editor, n, findImageURLs } = setup()
    const doc = n.doc(
      n.paragraph('hello'),
      n.image({ src: 'blob:old-url' }),
      n.paragraph('middle'),
      n.image({ src: 'blob:old-url' }),
      n.paragraph('world'),
    )
    editor.set(doc)

    replaceImageURL(editor.view, 'blob:old-url', 'https://example.com/new.png')

    expect(findImageURLs()).toEqual(['https://example.com/new.png', 'https://example.com/new.png'])
  })

  it('should not replace images with different URLs', () => {
    const { editor, n, findImageURLs } = setup()
    const doc = n.doc(
      n.paragraph('hello'),
      n.image({ src: 'blob:old-url' }),
      n.image({ src: 'blob:different-url' }),
      n.paragraph('world'),
    )
    editor.set(doc)

    replaceImageURL(editor.view, 'blob:old-url', 'https://example.com/new.png')

    expect(findImageURLs()).toEqual(['https://example.com/new.png', 'blob:different-url'])
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
