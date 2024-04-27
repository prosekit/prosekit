import {
  Facet,
  OBJECT_REPLACEMENT_CHARACTER,
  getMarkType,
  pluginFacet,
  type PluginPayload,
} from '@prosekit/core'
import {
  Mark,
  ProseMirrorNode,
  type Attrs,
  type MarkType,
} from '@prosekit/pm/model'
import { EditorState, ProseMirrorPlugin, Transaction } from '@prosekit/pm/state'
import type { ProsemirrorNode } from 'prosemirror-flat-list'

import { getSpanTextRanges } from './changed-range'

export interface MarkRuleOptions {
  /**
   * The regular expression to match against. It must has a `g` flag to match
   * all instances of the mark.
   */
  regex: RegExp

  /**
   * The mark type to apply to the matched text.
   */
  type: string | MarkType

  /**
   * Attributes to set on the mark. If a function is provided, it will be called
   * with the matched result from the regular expression.
   *
   * @default null
   */
  attrs?: Attrs | null | ((match: RegExpMatchArray) => Attrs | null)

  /**
   * Whether to remove other marks of the same type when they don't match the
   * regular expression. It can be a boolean value or a function that takes the
   * mark and returns a boolean.
   *
   * @default true
   */
  remove?: boolean | ((mark: Mark) => boolean)
}

/**
 * A mark rule is something that can automatically apply marks to text if it matches a certain pattern, and remove them if it doesn't match anymore.
 *
 * For every transaction that changes the document, the mark rule will be applied to the changed text.
 *
 *
 */
export function defineMarkRule(options: MarkRuleOptions) {
  return markRuleFacet.extension([options])
}

/** @internal */
export function getAffectedRange(
  transactions: readonly Transaction[],
  oldState: EditorState,
  newState: EditorState,
) {
  let lo = oldState.selection.from
  let hi = oldState.selection.to

  for (const tr of transactions) {
    for (const map of tr.mapping.maps) {
      lo = map.map(lo)
      hi = map.map(hi)

      map.forEach((_oldStart, _oldEnd, newStart, newEnd) => {
        lo = Math.min(lo, hi, newStart)
        hi = Math.max(hi, hi, newEnd)
      })
    }
  }

  lo = Math.min(lo, hi, newState.selection.from)
  hi = Math.min(lo, hi, newState.selection.to)

  return [lo, hi] as const
}

function getCheckRanges(
  doc: ProsemirrorNode,
  from: number,
  to: number,
): Array<[number, number]> {
  const $from = doc.resolve(from)
  const $to = doc.resolve(to)

  if ($from.sameParent($to)) {
    return [[$from.start(), $to.end()]]
  } else {
    const nodeRange = $from.blockRange($to)
    if (!nodeRange) {
      return []
    }

    return getSpanTextRanges($from, $to)
  }
}

type Marking = [from: number, to: number, mark: Mark]

function getExpectedMarkings(
  rules: MarkRuleOptions[],
  doc: ProseMirrorNode,
  from: number,
  to: number,
): Marking[] {
  const text = doc.textBetween(from, to, OBJECT_REPLACEMENT_CHARACTER)
  const result: Marking[] = []
  for (const rule of rules) {
    rule.regex.lastIndex = 0
    const matches = text.matchAll(rule.regex)
    const markType = getMarkType(doc.type.schema, rule.type)
    const getAttrs = rule.attrs

    for (const match of matches) {
      const index = match.index
      if (index == null) continue
      const attrs: Attrs | null = getAttrs
        ? typeof getAttrs === 'function'
          ? (getAttrs(match) as Attrs)
          : getAttrs
        : null

      const mark = markType.create(attrs)
      result.push([from + index, from + index + match[0].length, mark])
    }
  }
  return result
}

function getReceivedMarkings(
  rules: MarkRuleOptions[],
  doc: ProseMirrorNode,
  from: number,
  to: number,
): Marking[] {
  const result: Marking[] = []
  const schema = doc.type.schema
  const markTypes = rules.map((rule) => getMarkType(schema, rule.type))

  let seen = false

  doc.nodesBetween(from, to, (node) => {
    if (!node.isTextblock || seen) {
      // Unexpectedly
      return
    }

    seen = true

    node.content.forEach((child, offset) => {
      for (const markType of markTypes) {
        const mark = child.marks.find((mark) => mark.type === markType)
        if (mark) {
          result.push([from + offset, from + offset + child.nodeSize, mark])
        }
      }
    })
  })
  return result
}

function markingEquals(a: Marking, b: Marking): boolean {
  return a[0] === b[0] && a[1] === b[1] && a[2].eq(b[2])
}

function markingDiffs(a: Marking[], b: Marking[]): Marking[] {
  return a.filter((x) => !b.some((y) => markingEquals(x, y)))
}

function applyMarkRules(
  rules: MarkRuleOptions[],
  transactions: readonly Transaction[],
  oldState: EditorState,
  newState: EditorState,
): Transaction | null {
  if (transactions.length === 0 || transactions.every((tr) => !tr.docChanged)) {
    return null
  }

  const [from, to] = getAffectedRange(transactions, oldState, newState)
  const ranges = getCheckRanges(newState.doc, from, to)

  const toRemove: Marking[] = []
  const toCreate: Marking[] = []

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
  for (const [from, to, mark] of toRemove) {
    tr.removeMark(from, to, mark)
  }
  for (const [from, to, mark] of toCreate) {
    tr.addMark(from, to, mark)
  }
  return tr
}

const markRuleFacet = Facet.define<MarkRuleOptions, PluginPayload>({
  converter: () => {
    let rules: MarkRuleOptions[] = []

    const plugin = new ProseMirrorPlugin({
      appendTransaction: (
        transactions: readonly Transaction[],
        oldState: EditorState,
        newState: EditorState,
      ) => {
        return applyMarkRules(rules, transactions, oldState, newState)
      },
    })
    const pluginFunc = () => [plugin]

    return {
      create: (inputs: MarkRuleOptions[]) => {
        rules = inputs
        return pluginFunc
      },
      update: (inputs: MarkRuleOptions[]) => {
        rules = inputs
        return null
      },
    }
  },

  next: pluginFacet,
})
