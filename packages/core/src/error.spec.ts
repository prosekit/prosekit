import { describe, expect, it } from 'vitest'

import { DOMDocumentNotFoundError, EditorNotFoundError, ProseKitError } from './error'

describe('error', () => {
  it('creates ProseKitError', () => {
    const error = new ProseKitError('test message')
    expect(error).toBeInstanceOf(Error)
    expect(error).toBeInstanceOf(ProseKitError)
    expect(error.message).toBe('test message')
  })

  it('creates EditorNotFoundError', () => {
    const error = new EditorNotFoundError()
    expect(error).toBeInstanceOf(Error)
    expect(error).toBeInstanceOf(ProseKitError)
    expect(error).toBeInstanceOf(EditorNotFoundError)
    expect(error.message).toBe(
      'Unable to find editor. Pass it as an argument or call this function inside a ProseKit component.',
    )
  })

  it('creates DOMDocumentNotFoundError', () => {
    const error = new DOMDocumentNotFoundError()
    expect(error).toBeInstanceOf(Error)
    expect(error).toBeInstanceOf(ProseKitError)
    expect(error).toBeInstanceOf(DOMDocumentNotFoundError)
    expect(error.message).toBe(
      'Unable to find browser Document. When not in the browser environment, you need to pass a DOM Document.',
    )
  })
})
