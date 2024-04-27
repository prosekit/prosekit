import { OBJECT_REPLACEMENT_CHARACTER, getMarkType } from '@prosekit/core'
import { Mark, ProseMirrorNode } from '@prosekit/pm/model'
import { EditorState, Transaction } from '@prosekit/pm/state'

import { getAffectedRange, getCheckRanges } from './range'
import type { MarkRule } from './rule'

type MarkRange = [mark: Mark, from: number, to: number]

function getExpectedMarkings(
  rules: MarkRule[],
  doc: ProseMirrorNode,
  from: number,
  to: number,
): MarkRange[] {
  const text = doc.textBetween(from, to, OBJECT_REPLACEMENT_CHARACTER)
  const result: MarkRange[] = []
  for (const rule of rules) {
    rule.regex.lastIndex = 0
    const matches = text.matchAll(rule.regex)
    const markType = getMarkType(doc.type.schema, rule.type)

    for (const match of matches) {
      const index = match.index
      if (index == null) continue
      const attrs = rule.getAttrs(match)
      const mark = markType.create(attrs)
      result.push([mark, from + index, from + index + match[0].length])
    }
  }
  return result
}

function getReceivedMarkings(
  rules: MarkRule[],
  doc: ProseMirrorNode,
  from: number,
  to: number,
): MarkRange[] {
  const result: MarkRange[] = []
  const schema = doc.type.schema
  const markTypes = rules.map((rule) => getMarkType(schema, rule.type))

  doc.nodesBetween(from, to, (node, pos) => {
    if (!node.isInline) {
      return
    }

    for (const markType of markTypes) {
      const mark = node.marks.find((mark) => mark.type === markType)
      if (mark) {
        result.push([mark, pos, pos + node.nodeSize])
      }
    }
  })
  return result
}

function markingEquals(a: MarkRange, b: MarkRange): boolean {
  return a[1] === b[1] && a[2] === b[2] && a[0].eq(b[0])
}

function markingDiffs(a: MarkRange[], b: MarkRange[]): MarkRange[] {
  return a.filter((x) => !b.some((y) => markingEquals(x, y)))
}

export function applyMarkRules(
  rules: MarkRule[],
  transactions: readonly Transaction[],
  oldState: EditorState,
  newState: EditorState,
): Transaction | null {
  if (transactions.length === 0 || transactions.every((tr) => !tr.docChanged)) {
    return null
  }

  const [from, to] = getAffectedRange(transactions, oldState, newState)
  const ranges = getCheckRanges(newState.doc, from, to)

  const toRemove: MarkRange[] = []
  const toCreate: MarkRange[] = []

  for (const [from, to] of ranges) {
    const expected = getExpectedMarkings(rules, newState.doc, from, to)
    const received = getReceivedMarkings(rules, newState.doc, from, to)

    toRemove.push(...markingDiffs(received, expected))
    toCreate.push(...markingDiffs(expected, received))
  }

  if (toCreate.length === 0 && toRemove.length === 0) {
    return null
  }

  const tr = newState.tr
  for (const [mark, from, to] of toRemove) {
    tr.removeMark(from, to, mark)
  }
  for (const [mark, from, to] of toCreate) {
    tr.addMark(from, to, mark)
  }
  return tr
}
