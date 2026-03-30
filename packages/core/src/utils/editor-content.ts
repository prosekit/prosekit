import { isElementLike } from '@ocavue/utils'
import type { ProseMirrorNode, Schema } from '@prosekit/pm/model'
import { Selection } from '@prosekit/pm/state'

import type { NodeJSON, SelectionJSON } from '../types/model.ts'

import { assert } from './assert.ts'
import { jsonFromElement, jsonFromHTML } from './parse.ts'
import { isProseMirrorNode, isSelection } from './type-assertion.ts'

export function getEditorContentJSON(
  schema: Schema,
  content: NodeJSON | string | Element,
): NodeJSON {
  if (typeof content === 'string') {
    return jsonFromHTML(content, { schema })
  } else if (isElementLike(content)) {
    return jsonFromElement(content, { schema })
  } else {
    return content
  }
}

function getEditorContentNode(
  schema: Schema,
  content: NodeJSON | string | Element | ProseMirrorNode,
): ProseMirrorNode {
  if (isProseMirrorNode(content)) {
    return content
  }
  return schema.nodeFromJSON(getEditorContentJSON(schema, content))
}

export function getEditorContentDoc(
  schema: Schema,
  content: NodeJSON | string | Element | ProseMirrorNode,
): ProseMirrorNode {
  const doc = getEditorContentNode(schema, content)
  assert(
    doc.type.schema === schema,
    'Document schema does not match editor schema',
  )
  assert(
    doc.type === schema.topNodeType,
    `Document type does not match editor top node type. Expected ${schema.topNodeType.name}, got ${doc.type.name}`,
  )
  return doc
}

export function getEditorSelection(
  doc: ProseMirrorNode,
  selection: SelectionJSON | Selection | 'start' | 'end',
): Selection {
  if (isSelection(selection)) {
    assert(selection.$head.doc === doc, 'Selection and doc do not match')
    return selection
  }
  if (selection === 'start') {
    return Selection.atStart(doc)
  }
  if (selection === 'end') {
    return Selection.atEnd(doc)
  }
  return Selection.fromJSON(doc, selection)
}
