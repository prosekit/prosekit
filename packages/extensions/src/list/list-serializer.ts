import { isElementLike } from '@ocavue/utils'
import { defineClipboardSerializer, type PlainExtension } from '@prosekit/core'
import { findCheckboxInListItem, joinListElements, listToDOM } from 'prosemirror-flat-list'

/**
 * @internal
 */
export function defineListSerializer(): PlainExtension {
  return defineClipboardSerializer({
    serializeFragmentWrapper: (fn) => {
      return (...args) => {
        const dom = fn(...args)
        return normalizeElementTree(joinListElements(dom))
      }
    },
    serializeNodeWrapper: (fn) => {
      return (...args) => {
        const dom = fn(...args)
        return isElementLike(dom)
          ? normalizeElementTree(joinListElements(dom))
          : dom
      }
    },
    nodesFromSchemaWrapper: (fn) => {
      return (...args) => {
        const nodes = fn(...args)
        return {
          ...nodes,
          list: (node) => listToDOM({ node, nativeList: true }),
        }
      }
    },
  })
}

function normalizeElementTree<T extends Element | DocumentFragment>(
  node: T,
): T {
  if (isElementLike(node)) {
    normalizeTaskList(node)
  }

  for (const child of node.children) {
    normalizeElementTree(child)
  }

  return node
}

/**
 * Modifies the DOM tree for task lists to ensure that the output HTML can be
 * parsed by rehype-remark.
 */
function normalizeTaskList(node: Element): void {
  if (
    !node.classList.contains('prosemirror-flat-list')
    || node.getAttribute('data-list-kind') !== 'task'
    || node.children.length !== 2
  ) {
    return
  }

  const marker = node.children.item(0)
  if (!marker || !marker.classList.contains('list-marker')) {
    return
  }

  const checkbox = findCheckboxInListItem(marker)
  if (!checkbox) {
    return
  }

  const content = node.children.item(1)
  if (!content || !content.classList.contains('list-content')) {
    return
  }

  const textBlock = content.children.item(0)
  if (!textBlock || !['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(textBlock.tagName)) {
    return
  }

  node.replaceChildren(...content.children)
  textBlock.prepend(checkbox)
}
