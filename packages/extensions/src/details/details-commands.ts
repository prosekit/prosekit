import { defineCommands, type Extension } from '@prosekit/core'
import { Fragment, type ProseMirrorNode, Slice } from '@prosekit/pm/model'
import { TextSelection, type Command } from '@prosekit/pm/state'

import type { DetailsAttrs } from './details-types.ts'

/**
 * @internal
 */
export type DetailsCommandsExtension = Extension<{
  Commands: {
    insertDetails: [attrs?: DetailsAttrs]
    setDetails: [attrs?: DetailsAttrs]
    unsetDetails: []
    toggleDetails: [attrs?: DetailsAttrs]
    setDetailsOpen: [attrs: DetailsAttrs]
    toggleDetailsOpen: []
    unwrapDetails: []
  }
}>

/**
 * Returns a command that inserts a `details` node with a `detailsSummary` and a
 * default block at the current selection.
 */
function insertDetailsCommand(attrs?: DetailsAttrs): Command {
  return (state, dispatch) => {
    if (!dispatch) return true

    const details = createEmptyDetails(state, attrs)
    if (!details) return false

    const { tr } = state
    const pos = tr.selection.from
    tr.replaceRange(pos, pos, new Slice(Fragment.from(details), 0, 0))

    // Place cursor inside the summary
    tr.setSelection(TextSelection.near(tr.doc.resolve(pos + 2)))

    dispatch(tr.scrollIntoView())
    return true
  }
}

function setDetailsCommand(attrs?: DetailsAttrs): Command {
  return (state, dispatch) => {
    const activeDetails = findAncestorDetails(state)
    if (activeDetails) {
      if (dispatch && attrs && activeDetails.node.attrs.open !== attrs.open) {
        dispatch(state.tr.setNodeAttribute(activeDetails.pos, 'open', attrs.open))
      }
      return true
    }

    const range = getSelectedBlockRange(state)
    if (!range) return false

    const details = createDetailsFromFragment(state, range.content, attrs)
    if (!details) return false

    if (dispatch) {
      const tr = state.tr.replaceRange(range.from, range.to, new Slice(Fragment.from(details), 0, 0))
      tr.setSelection(TextSelection.near(tr.doc.resolve(range.from + 2)))
      dispatch(tr.scrollIntoView())
    }

    return true
  }
}

/**
 * Returns a command that sets the `open` attribute of the nearest ancestor
 * `details` node.
 */
function setDetailsOpenCommand(attrs: DetailsAttrs): Command {
  return (state, dispatch) => {
    const details = findAncestorDetails(state)
    if (!details) return false

    if (dispatch) {
      const { tr } = state
      tr.setNodeAttribute(details.pos, 'open', attrs.open)
      dispatch(tr)
    }
    return true
  }
}

/**
 * Returns a command that toggles the `open` attribute of the nearest ancestor
 * `details` node.
 */
function toggleDetailsOpenCommand(): Command {
  return (state, dispatch) => {
    const details = findAncestorDetails(state)
    if (!details) return false

    if (dispatch) {
      const { tr } = state
      tr.setNodeAttribute(details.pos, 'open', !details.node.attrs.open)
      dispatch(tr)
    }
    return true
  }
}

/**
 * Returns a command that unwraps the nearest ancestor `details` node, turning
 * its `detailsSummary` into a paragraph and moving the rest of its content up.
 */
function unwrapDetailsCommand(): Command {
  return (state, dispatch) => {
    const details = findAncestorDetails(state)
    if (!details) return false

    if (dispatch) {
      const { tr } = state
      const children: ProseMirrorNode[] = []
      const defaultBlockType = state.schema.topNodeType.contentMatch.defaultType

      details.node.forEach((child) => {
        if (child.type.name === 'detailsSummary' && defaultBlockType) {
          if (child.content.size > 0) {
            const paragraph = defaultBlockType.createChecked(null, child.content)
            children.push(paragraph)
          }
          return
        }

        if (child.type.name === 'detailsContent') {
          child.forEach((grandchild) => {
            children.push(grandchild.copy(grandchild.content))
          })
        }
      })

      tr.replaceWith(details.pos, details.pos + details.node.nodeSize, Fragment.from(children))
      dispatch(tr.scrollIntoView())
    }
    return true
  }
}

function toggleDetailsCommand(attrs?: DetailsAttrs): Command {
  return (state, dispatch) => {
    if (findAncestorDetails(state)) {
      return unwrapDetailsCommand()(state, dispatch)
    }

    return setDetailsCommand(attrs)(state, dispatch)
  }
}

/**
 * Finds the document position of the nearest ancestor `details` node from the
 * current selection.
 */
function findAncestorDetails(
  state: Parameters<Command>[0],
): { node: ProseMirrorNode, pos: number, depth: number } | null {
  const { $from } = state.selection
  for (let depth = $from.depth; depth >= 0; depth--) {
    const node = $from.node(depth)
    if (node.type.name === 'details') {
      return { node, pos: $from.before(depth), depth }
    }
  }
  return null
}

function getSelectedBlockRange(
  state: Parameters<Command>[0],
): { from: number, to: number, content: Fragment } | null {
  const { $from, $to } = state.selection
  const range = $from.blockRange($to)
  if (!range) return null

  const childDepth = range.depth + 1
  if ($from.depth < childDepth || $to.depth < childDepth) return null

  const from = $from.before(childDepth)
  const to = $to.after(childDepth)
  const content = state.doc.slice(from, to).content
  if (!content.childCount) return null

  return { from, to, content }
}

function createEmptyDetails(
  state: Parameters<Command>[0],
  attrs?: DetailsAttrs,
): ProseMirrorNode | null {
  const paragraphType = state.schema.nodes.paragraph
  if (!paragraphType) return null

  const block = paragraphType.createAndFill()
  if (!block) return null

  return createDetailsFromFragment(state, Fragment.from(block), attrs)
}

function createDetailsFromFragment(
  state: Parameters<Command>[0],
  contentFragment: Fragment,
  attrs?: DetailsAttrs,
): ProseMirrorNode | null {
  const detailsType = state.schema.nodes.details
  const detailsContentType = state.schema.nodes.detailsContent
  const summaryType = state.schema.nodes.detailsSummary

  if (!detailsType || !detailsContentType || !summaryType) return null

  const summary = summaryType.createAndFill()
  if (!summary) return null

  const content = detailsContentType.createChecked(null, contentFragment)
  return detailsType.createChecked(attrs ?? null, Fragment.from([summary, content]))
}

/**
 * Adds commands for working with `details` nodes.
 */
export function defineDetailsCommands(): DetailsCommandsExtension {
  return defineCommands({
    insertDetails: insertDetailsCommand,
    setDetails: setDetailsCommand,
    unsetDetails: unwrapDetailsCommand,
    toggleDetails: toggleDetailsCommand,
    setDetailsOpen: setDetailsOpenCommand,
    toggleDetailsOpen: toggleDetailsOpenCommand,
    unwrapDetails: unwrapDetailsCommand,
  })
}
