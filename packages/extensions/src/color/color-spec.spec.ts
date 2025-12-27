import pick from 'just-pick'
import {
  describe,
  expect,
  it,
} from 'vitest'

import { setupTest } from '../testing'

it('should define color mark with correct schema', () => {
  const { editor } = setupTest()

  const marks = editor.view.state.schema.spec.marks.toObject()
  const colorMark = pick(marks, ['color'])

  expect(colorMark).toMatchObject({
    color: {
      attrs: {
        color: {
          validate: 'string',
        },
      },
      parseDOM: [
        {
          style: 'color',
        },
      ],
    },
  })
  expect(colorMark.color.toDOM).toBeDefined()
})

describe('toDOM', () => {
  it('should render color as inline span with style attribute', () => {
    const { editor } = setupTest()

    const schema = editor.view.state.schema
    const colorMark = schema.marks.color.create({ color: 'blue' })

    const dom = colorMark.type.spec.toDOM?.(colorMark, true)

    expect(dom).toEqual([
      'span',
      { style: 'color: blue;' },
      0,
    ])
  })

  it('should render color as block div when not inline', () => {
    const { editor } = setupTest()

    const schema = editor.view.state.schema
    const colorMark = schema.marks.color.create({ color: 'red' })

    const dom = colorMark.type.spec.toDOM?.(colorMark, false)

    expect(dom).toEqual([
      'div',
      { style: 'color: red;' },
      0,
    ])
  })

  it('should handle hex colors in toDOM', () => {
    const { editor } = setupTest()

    const schema = editor.view.state.schema
    const colorMark = schema.marks.color.create({ color: '#00ff00' })

    const dom = colorMark.type.spec.toDOM?.(colorMark, true)

    expect(dom).toEqual([
      'span',
      { style: 'color: #00ff00;' },
      0,
    ])
  })
})
