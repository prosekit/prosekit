import type { DOMOutputSpec } from '@prosekit/pm/model'
import { describe, expect, it } from 'vitest'

import { insertOutputSpecAttrs } from './output-spec'

describe('insertOutputSpecAttrs', () => {
  it('should insert attrs into an array without attributes', () => {
    const spec: DOMOutputSpec = ['input']
    const result = insertOutputSpecAttrs(spec, [
      ['data-foo', 'foo'],
      ['checked', ''],
      ['style', 'background-color: red'],
      ['style', 'color: blue'],
    ])
    expect(result).toMatchInlineSnapshot(`
      [
        "input",
        {
          "checked": "",
          "data-foo": "foo",
          "style": "color: blue; background-color: red",
        },
      ]
    `)
  })

  it('should insert attrs into an array with attributes', () => {
    const spec: DOMOutputSpec = ['input', { type: 'checkbox' }]
    const result = insertOutputSpecAttrs(spec, [
      ['data-foo', 'foo'],
      ['checked', ''],
      ['style', 'background-color: red'],
      ['style', 'color: blue'],
    ])
    expect(result).toMatchInlineSnapshot(`
      [
        "input",
        {
          "checked": "",
          "data-foo": "foo",
          "style": "color: blue; background-color: red",
          "type": "checkbox",
        },
      ]
    `)
  })

  it('should insert attrs into an element', () => {
    const element = document.createElement('input')
    element.type = 'checkbox'

    const spec: DOMOutputSpec = element
    const result = insertOutputSpecAttrs(spec, [
      ['data-foo', 'foo'],
      ['checked', ''],
      ['style', 'background-color: red'],
      ['style', 'color: blue'],
    ])
    expect(result).toMatchInlineSnapshot(`
      <input
        checked=""
        data-foo="foo"
        style="color: blue; background-color: red"
        type="checkbox"
      />
    `)
  })

  it('should insert attrs into an object ', () => {
    const element = document.createElement('input')
    element.type = 'checkbox'

    const spec: DOMOutputSpec = { dom: element }
    const result = insertOutputSpecAttrs(spec, [
      ['data-foo', 'foo'],
      ['checked', ''],
      ['style', 'background-color: red'],
      ['style', 'color: blue'],
    ])
    expect(result).toMatchInlineSnapshot(`
      {
        "dom": <input
          checked=""
          data-foo="foo"
          style="color: blue; background-color: red"
          type="checkbox"
        />,
      }
    `)
  })
})
