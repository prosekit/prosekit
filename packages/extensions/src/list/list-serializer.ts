import { isElementLike } from '@ocavue/utils'
import { defineClipboardSerializer } from '@prosekit/core'
import {
  joinListElements,
  listToDOM,
} from 'prosemirror-flat-list'

/**
 * @internal
 */
export function defineListSerializer() {
  return defineClipboardSerializer({
    serializeFragmentWrapper: (fn) => {
      return (...args) => {
        const dom = fn(...args)
        return joinListElements(dom)
      }
    },
    serializeNodeWrapper: (fn) => {
      return (...args) => {
        const dom = fn(...args)
        return isElementLike(dom) ? joinListElements(dom) : dom
      }
    },
    nodesFromSchemaWrapper: (fn) => {
      return (...args) => {
        const nodes = fn(...args)
        return {
          ...nodes,
          list: (node) => listToDOM({ node, nativeList: true, getMarkers: () => null }),
        }
      }
    },
  })
}
