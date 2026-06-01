import { isProseMirrorNode, type Extension, type NodeJSON } from '@prosekit/core'
import type { ProseMirrorNode, Schema } from '@prosekit/pm/model'

import type { CustomMappingOptions, DomOutputSpecToElement } from './types.ts'

/**
 * @internal
 */
interface RenderOptions<T> extends CustomMappingOptions<T> {
  extension: Extension
  domOutputSpecToElement: DomOutputSpecToElement<T>
  mapDefinedTypes: {
    doc: (props: { node: ProseMirrorNode; children: T[] }) => T
    text: (props: { node: ProseMirrorNode }) => T
  }
}

/**
 * Create a renderer function that walks a ProseMirror node tree and renders
 * it to a target format using the provided DOMOutputSpec converter.
 *
 * @internal
 */
export function createRenderer<T>(options: RenderOptions<T>): (
  content: NodeJSON | ProseMirrorNode,
) => T {
  const {
    extension,
    domOutputSpecToElement,
    mapDefinedTypes,
    nodeMapping = {},
    markMapping = {},
    unhandledNode,
    unhandledMark,
  } = options

  // Get schema from extension via facet tree
  const schema = getSchema(extension)

  function renderNode(node: ProseMirrorNode, parent?: ProseMirrorNode): T {
    const name = node.type.name

    // Handle predefined types (doc, text)
    if (name === 'doc') {
      const children: T[] = []
      node.forEach((child) => children.push(renderNode(child, node)))
      return mapDefinedTypes.doc({ node, children })
    }

    if (name === 'text') {
      const textResult = mapDefinedTypes.text({ node })
      return applyMarks(node, textResult, parent)
    }

    // Check custom node mapping
    const nodeHandler = nodeMapping[name]
    if (nodeHandler) {
      const children: T[] = []
      node.forEach((child) => children.push(renderNode(child, node)))
      return nodeHandler({
        node,
        parent,
        children: children.length === 1 ? children[0] : children,
      })
    }

    // Use toDOM from schema spec
    const nodeSpec = schema.nodes[name]?.spec
    if (!nodeSpec?.toDOM) {
      if (unhandledNode) {
        const children: T[] = []
        node.forEach((child) => children.push(renderNode(child, node)))
        return unhandledNode({
          node,
          parent,
          children: children.length === 1 ? children[0] : children,
        })
      }
      throw new Error(
        `[prosekit error]: Node type "${name}" has no toDOM method and no custom nodeMapping provided.`,
      )
    }

    const domSpec = nodeSpec.toDOM(node)
    const render = domOutputSpecToElement(domSpec)

    // Render children
    const children: T[] = []
    node.forEach((child) => children.push(renderNode(child, node)))

    return render(
      children.length > 0 ? (children.length === 1 ? children[0] : children) : undefined,
    )
  }

  function applyMarks(
    node: ProseMirrorNode,
    content: T,
    parent?: ProseMirrorNode,
  ): T {
    let result = content

    for (const mark of node.marks) {
      const markName = mark.type.name

      // Check custom mark mapping
      const markHandler = markMapping[markName]
      if (markHandler) {
        result = markHandler({ mark, node, parent, children: result })
        continue
      }

      // Use toDOM from schema spec
      const markSpec = schema.marks[markName]?.spec
      if (!markSpec?.toDOM) {
        if (unhandledMark) {
          result = unhandledMark({ mark, node, parent, children: result })
          continue
        }
        throw new Error(
          `[prosekit error]: Mark type "${markName}" has no toDOM method and no custom markMapping provided.`,
        )
      }

      const domSpec = markSpec.toDOM(mark, true)
      const render = domOutputSpecToElement(domSpec)
      result = render(result)
    }

    return result
  }

  return function render(content: NodeJSON | ProseMirrorNode): T {
    const node = isProseMirrorNode(content)
      ? content
      : schema.nodeFromJSON(content)
    return renderNode(node)
  }
}

/**
 * Extract the ProseMirror schema from an extension.
 *
 * @internal
 */
function getSchema(extension: Extension): Schema {
  const schema = extension.schema
  if (!schema) {
    throw new Error(
      '[prosekit error]: Extension does not define a schema. Make sure the extension includes at least a document node spec.',
    )
  }
  return schema
}
