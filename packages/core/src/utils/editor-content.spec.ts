import { AllSelection } from '@prosekit/pm/state'
import { expect, test } from 'vitest'

import { setupTest } from '../testing/index.ts'

import { getEditorSelection } from './editor-content.ts'

test('getEditorSelection', () => {
  const { n } = setupTest()
  const doc = n.doc(n.paragraph('hello world'))
  expect(getEditorSelection(doc, 'start').toJSON()).toMatchInlineSnapshot(`
    {
      "anchor": 1,
      "head": 1,
      "type": "text",
    }
  `)
  expect(getEditorSelection(doc, 'end').toJSON()).toMatchInlineSnapshot(`
      {
        "anchor": 12,
        "head": 12,
        "type": "text",
      }
    `)
  expect(
    getEditorSelection(doc, {
      anchor: 4,
      head: 8,
      type: 'text',
    }).toJSON(),
  ).toMatchInlineSnapshot(`
    {
      "anchor": 4,
      "head": 8,
      "type": "text",
    }
  `)
  expect(getEditorSelection(doc, new AllSelection(doc)).toJSON())
    .toMatchInlineSnapshot(`
    {
      "type": "all",
    }
  `)
})
