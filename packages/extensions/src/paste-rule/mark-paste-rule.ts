import {
  getMarkType,
  type PlainExtension,
} from '@prosekit/core'
import type {
  Attrs,
  MarkType,
  ProseMirrorNode,
} from '@prosekit/pm/model'
import {
  Fragment,
  Slice,
} from '@prosekit/pm/model'

import { definePasteRule } from './paste-rule'
import { splitTextByRegex } from './split-text-by-regex'

/**
 * The options for {@link defineMarkPasteRule}.
 *
 * @public
 */
export interface MarkPasteRuleOptions {
  /**
   * The regular expression to match against. It must have a `g` flag to match
   * all instances of the mark.
   */
  regex: RegExp

  /**
   * The mark type to apply to the matched text.
   */
  type: string | MarkType

  /**
   * A function used to compute attributes to set on the mark created by this
   * rule. When it returns `false`, the rule won't match. When it returns `null`
   * or `undefined`, that is interpreted as an empty/default set of attributes.
   * @default null
   */
  getAttrs?: (match: RegExpExecArray) => Attrs | null | undefined | false

  /**
   * Optional function to determine if a text node should be skipped.
   * Default behavior: skip code nodes and nodes that already have the target mark.
   */
  shouldSkip?: (node: ProseMirrorNode) => boolean
}

/**
 * Defines a paste rule that applies marks based on regex patterns.
 *
 * @public
 */
export function defineMarkPasteRule(options: MarkPasteRuleOptions): PlainExtension {
  return definePasteRule({
    handler: ({ slice, view, plain }) => {
      if (plain) {
        return slice
      }

      const markType = getMarkType(view.state.schema, options.type)

      return replaceMarkInSlice({
        markType,
        regex: options.regex,
        getAttrs: options.getAttrs,
        shouldSkip: options.shouldSkip,
      }, slice)
    },
  })
}

interface MarkPasteRuleHandlerOptions {
  markType: MarkType
  regex: RegExp
  getAttrs?: (match: RegExpExecArray) => Attrs | null | undefined | false
  shouldSkip?: (node: ProseMirrorNode) => boolean
}

export function replaceMarkInSlice(options: MarkPasteRuleHandlerOptions, slice: Slice): Slice {
  const newFragment = replaceMarkInFragment(options, slice.content)
  if (!newFragment) {
    return slice
  }
  return new Slice(newFragment, slice.openStart, slice.openEnd)
}

function replaceMarkInFragment(options: MarkPasteRuleHandlerOptions, fragment: Fragment): Fragment | undefined {
  let changed = false
  let children: ProseMirrorNode[] = []

  for (const child of fragment.content) {
    const newChild = replaceMarkInNode(options, child)
    if (newChild) {
      changed = true
    }
    children.push(newChild || child)
  }

  if (changed) {
    return Fragment.from(children)
  }

  return
}

function replaceMarkInNode(options: MarkPasteRuleHandlerOptions, node: ProseMirrorNode): ProseMirrorNode | undefined {
  if (node.type.spec.code) {
    return
  }
  if (node.type.isInline) {
    return
  }
  if (node.type.isTextblock) {
    return replaceMarkInTextblockNode(options, node)
  }

  const newChildren = replaceMarkInFragment(options, node.content)
  if (!newChildren) {
    return
  }
  return node.copy(newChildren)
}

function replaceMarkInTextblockNode(options: MarkPasteRuleHandlerOptions, node: ProseMirrorNode): ProseMirrorNode | undefined {
  const newChildren: ProseMirrorNode[] = []
  let changed = false

  for (const inlineNode of node.content.content) {
    const newInlineNodes = replaceMarkInInlineNode(options, inlineNode)
    if (newInlineNodes) {
      changed = true
      newChildren.push(...newInlineNodes)
    } else {
      newChildren.push(inlineNode)
    }
  }
  if (changed) {
    return node.copy(Fragment.from(newChildren))
  }
  return
}

function replaceMarkInInlineNode(options: MarkPasteRuleHandlerOptions, node: ProseMirrorNode): ProseMirrorNode[] | undefined {
  const text = node.text
  if (!text) {
    return
  }

  const { markType, shouldSkip } = options

  // Use custom skip logic if provided, otherwise use default
  if (shouldSkip) {
    if (shouldSkip(node)) {
      return
    }
  } else {
    // Default skip logic: skip if already has the target mark or has code mark
    if (node.marks.some((mark) => mark.type === markType)) {
      return
    }
    if (node.marks.some((mark) => mark.type.spec.code)) {
      return
    }
  }

  const chunks = splitTextByRegex(text, options.regex)
  if (!chunks) {
    return
  }

  const schema = node.type.schema
  const nodes: ProseMirrorNode[] = []

  for (const [text, match] of chunks) {
    if (!text) {
      continue
    }
    if (match) {
      const attrs = options.getAttrs?.(match) ?? null
      if (attrs !== false) {
        const mark = markType.create(attrs)
        nodes.push(schema.text(text, [...node.marks, mark]))
      } else {
        nodes.push(schema.text(text, node.marks))
      }
    } else {
      nodes.push(schema.text(text, node.marks))
    }
  }

  return nodes
}
