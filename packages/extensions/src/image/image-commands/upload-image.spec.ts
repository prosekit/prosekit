import { union } from '@prosekit/core'
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest'

import type { ImageAttrs } from '..'
import type { Uploader } from '../../file'
import {
  defineTestExtension,
  setupTestFromExtension,
} from '../../testing'

import {
  replaceImageURL,
  uploadImage,
} from './upload-image'

describe('uploadImage', () => {
  const extension = union(defineTestExtension())
  const { editor, n } = setupTestFromExtension(extension)

  let mockUploader: Uploader<string>
  let file: File

  beforeEach(() => {
    mockUploader = vi.fn().mockResolvedValue('https://example.com/uploaded.png')
    file = new File(['test'], 'test.png', { type: 'image/png' })
  })

  it('should insert image at current selection by default', () => {
    const doc = n.doc(n.paragraph('hello'))
    editor.set(doc)
    editor.view.dispatch(editor.state.tr.setSelection(editor.state.selection))

    const command = uploadImage({ uploader: mockUploader, file })
    const result = command(editor.state, editor.view.dispatch, editor.view)

    expect(result).toBe(true)

    let imageCount = 0
    let imageSrc = ''
    editor.state.doc.descendants((node) => {
      if (node.type.name === 'image') {
        imageCount++
        imageSrc = (node.attrs as ImageAttrs).src ?? ''
      }
    })
    expect(imageCount).toBe(1)
    expect(imageSrc).toMatch(/^blob:/)
  })

  it('should insert image at specified position', () => {
    const doc = n.doc(
      /*0*/
      n.paragraph(/*1*/ 'hello' /*6*/),
      /*7*/
      n.paragraph(/*8*/ 'world' /*13*/),
      /*14*/
    )
    editor.set(doc)

    const command = uploadImage({ uploader: mockUploader, file, pos: 7 })
    const result = command(editor.state, editor.view.dispatch, editor.view)

    expect(result).toBe(true)

    let imageCount = 0
    let imagePos = -1
    editor.state.doc.descendants((node, pos) => {
      if (node.type.name === 'image') {
        imageCount++
        imagePos = pos
      }
    })
    expect(imageCount).toBe(1)
    expect(imagePos).toBe(7)
  })

  it('should replace existing image when replace=true', () => {
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

    let imagePos = -1
    editor.state.doc.descendants((node, pos) => {
      if (node.type.name === 'image') {
        imagePos = pos
        return false
      }
    })

    expect(imagePos).toBe(7)

    const command = uploadImage({
      uploader: mockUploader,
      file,
      pos: imagePos,
      replace: true,
    })
    expect(editor.exec(command)).toBe(true)

    let imageCount = 0
    let imageSrc = ''
    editor.state.doc.descendants((node) => {
      if (node.type.name === 'image') {
        imageCount++
        imageSrc = (node.attrs as ImageAttrs).src ?? ''
      }
    })
    expect(imageCount).toBe(1)
    expect(imageSrc).toMatch(/^blob:/)
    expect(imageSrc).not.toBe('https://example.com/old.png')
  })

  it('should not replace when same src is already set', () => {
    const blobURL = 'blob:test-url'
    const doc = n.doc(
      n.paragraph('hello'),
      n.image({ src: blobURL }),
      n.paragraph('world'),
    )
    editor.set(doc)

    let imagePos = -1
    editor.state.doc.descendants((node, pos) => {
      if (node.type.name === 'image') {
        imagePos = pos
        return false
      }
    })

    const createObjectURLSpy = vi.spyOn(URL, 'createObjectURL')
    createObjectURLSpy.mockReturnValue(blobURL)

    const initialState = editor.state
    const dispatch = vi.fn()

    const command = uploadImage({
      uploader: mockUploader,
      file,
      pos: imagePos,
      replace: true,
    })
    const result = command(initialState, dispatch, editor.view)

    expect(result).toBe(true)
    expect(dispatch).not.toHaveBeenCalled()

    createObjectURLSpy.mockRestore()
  })

  it('should insert image when replace=true but position has non-image node', () => {
    const doc = n.doc(n.paragraph('hello'), n.paragraph('world'))
    editor.set(doc)

    let paragraphPos = -1
    editor.state.doc.descendants((node, pos) => {
      if (node.type.name === 'paragraph' && paragraphPos === -1) {
        paragraphPos = pos
        return false
      }
    })

    const command = uploadImage({
      uploader: mockUploader,
      file,
      pos: paragraphPos,
      replace: true,
    })
    const result = command(editor.state, editor.view.dispatch, editor.view)

    expect(result).toBe(true)

    let imageCount = 0
    editor.state.doc.descendants((node) => {
      if (node.type.name === 'image') {
        imageCount++
      }
    })
    expect(imageCount).toBe(1)
  })

  it('should call onError when upload fails', async () => {
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
    command(editor.state, editor.view.dispatch, editor.view)

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
  const extension = union(defineTestExtension())
  const { editor, n } = setupTestFromExtension(extension)

  it('should replace single image URL', () => {
    const doc = n.doc(
      n.paragraph('hello'),
      n.image({ src: 'blob:old-url' }),
      n.paragraph('world'),
    )
    editor.set(doc)

    replaceImageURL(editor.view, 'blob:old-url', 'https://example.com/new.png')

    let imageCount = 0
    let imageSrc = ''
    editor.state.doc.descendants((node) => {
      if (node.type.name === 'image') {
        imageCount++
        imageSrc = (node.attrs as ImageAttrs).src ?? ''
      }
    })
    expect(imageCount).toBe(1)
    expect(imageSrc).toBe('https://example.com/new.png')
  })

  it('should replace multiple image URLs', () => {
    const doc = n.doc(
      n.paragraph('hello'),
      n.image({ src: 'blob:old-url' }),
      n.paragraph('middle'),
      n.image({ src: 'blob:old-url' }),
      n.paragraph('world'),
    )
    editor.set(doc)

    replaceImageURL(editor.view, 'blob:old-url', 'https://example.com/new.png')

    let imageCount = 0
    const imageSrcs: string[] = []
    editor.state.doc.descendants((node) => {
      if (node.type.name === 'image') {
        imageCount++
        imageSrcs.push((node.attrs as ImageAttrs).src ?? '')
      }
    })
    expect(imageCount).toBe(2)
    expect(imageSrcs[0]).toBe('https://example.com/new.png')
    expect(imageSrcs[1]).toBe('https://example.com/new.png')
  })

  it('should not replace images with different URLs', () => {
    const doc = n.doc(
      n.paragraph('hello'),
      n.image({ src: 'blob:old-url' }),
      n.image({ src: 'blob:different-url' }),
      n.paragraph('world'),
    )
    editor.set(doc)

    replaceImageURL(editor.view, 'blob:old-url', 'https://example.com/new.png')

    let imageCount = 0
    const imageSrcs: string[] = []
    editor.state.doc.descendants((node) => {
      if (node.type.name === 'image') {
        imageCount++
        imageSrcs.push((node.attrs as ImageAttrs).src ?? '')
      }
    })
    expect(imageCount).toBe(2)
    expect(imageSrcs[0]).toBe('https://example.com/new.png')
    expect(imageSrcs[1]).toBe('blob:different-url')
  })

  it('should do nothing when no images match', () => {
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
