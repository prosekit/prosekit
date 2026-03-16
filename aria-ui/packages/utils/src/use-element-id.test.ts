import { beforeEach, describe, expect, test } from 'vitest'

import { useElementId } from './use-element-id.ts'

describe('useElementId', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  test('returns existing id if element already has one', () => {
    const element = document.createElement('div')
    element.id = 'my-existing-id'

    const id = useElementId(element)

    expect(id).toBe('my-existing-id')
    expect(element.id).toBe('my-existing-id')
  })

  test('generates new id if element does not have one', () => {
    const element = document.createElement('div')

    const id = useElementId(element)

    expect(id).toBeTruthy()
    expect(element.id).toBe(id)
  })

  test('generates unique ids for different elements', () => {
    const element1 = document.createElement('div')
    const element2 = document.createElement('div')

    const id1 = useElementId(element1)
    const id2 = useElementId(element2)

    expect(id1).toBeTruthy()
    expect(id2).toBeTruthy()
    expect(id1).not.toBe(id2)
  })

  test('returns same id when called multiple times on same element', () => {
    const element = document.createElement('div')

    const id1 = useElementId(element)
    const id2 = useElementId(element)

    expect(id1).toBe(id2)
  })
})
