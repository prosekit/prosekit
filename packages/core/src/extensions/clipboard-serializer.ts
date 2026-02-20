import { isNotNullish } from '@ocavue/utils'
import { DOMSerializer, type DOMOutputSpec, type Mark, type ProseMirrorNode, type Schema } from '@prosekit/pm/model'
import { PluginKey, ProseMirrorPlugin } from '@prosekit/pm/state'

import { defineFacetPayload } from '../facets/facet-extension.ts'
import { defineFacet } from '../facets/facet.ts'
import type { AnyFunction } from '../types/any-function.ts'
import type { PlainExtension } from '../types/extension.ts'

import { pluginFacet, type PluginPayload } from './plugin.ts'

type SerializeFragmentFunction = typeof DOMSerializer.prototype.serializeFragment
type SerializeNodeFunction = typeof DOMSerializer.prototype.serializeNode
type NodesFromSchemaFunction = typeof DOMSerializer.nodesFromSchema
type MarksFromSchemaFunction = typeof DOMSerializer.marksFromSchema

type FunctionWrapper<T extends AnyFunction> = (fn: T) => T

/**
 * @internal
 */
export interface ClipboardSerializerOptions {
  serializeFragmentWrapper?: FunctionWrapper<SerializeFragmentFunction>
  serializeNodeWrapper?: FunctionWrapper<SerializeNodeFunction>
  nodesFromSchemaWrapper?: FunctionWrapper<NodesFromSchemaFunction>
  marksFromSchemaWrapper?: FunctionWrapper<MarksFromSchemaFunction>
}

function mergeWrappers<T extends AnyFunction>(wrappers: Array<FunctionWrapper<T> | undefined | null>): FunctionWrapper<T> {
  return (fn: T) => wrappers.filter(isNotNullish).reduce((fn, wrapper) => wrapper(fn), fn)
}

function wrapFunction<T extends AnyFunction>(fn: T, wrapper?: FunctionWrapper<T>): T {
  return wrapper ? wrapper(fn) : fn
}

class CustomDOMSerializer extends DOMSerializer {
  constructor(
    nodes: Record<string, (node: ProseMirrorNode) => DOMOutputSpec>,
    marks: Record<string, (mark: Mark, inline: boolean) => DOMOutputSpec>,
    private serializeFragmentWrapper?: FunctionWrapper<SerializeFragmentFunction>,
    private serializeNodeWrapper?: FunctionWrapper<SerializeNodeFunction>,
  ) {
    super(nodes, marks)
  }

  override serializeFragment(...args: Parameters<SerializeFragmentFunction>): ReturnType<SerializeFragmentFunction> {
    // eslint-disable-next-line unicorn/consistent-function-scoping -- See https://github.com/sindresorhus/eslint-plugin-unicorn/issues/2088
    const fn: SerializeFragmentFunction = (...args) => super.serializeFragment(...args)
    return wrapFunction(fn, this.serializeFragmentWrapper)(...args)
  }

  override serializeNode(...args: Parameters<SerializeNodeFunction>): ReturnType<SerializeNodeFunction> {
    // eslint-disable-next-line unicorn/consistent-function-scoping -- See https://github.com/sindresorhus/eslint-plugin-unicorn/issues/2088
    const fn: SerializeNodeFunction = (...args) => super.serializeNode(...args)
    return wrapFunction(fn, this.serializeNodeWrapper)(...args)
  }
}

const nodesFromSchema = /* @__PURE__ */ DOMSerializer.nodesFromSchema.bind(DOMSerializer)
const marksFromSchema = /* @__PURE__ */ DOMSerializer.marksFromSchema.bind(DOMSerializer)

function createCustomDOMSerializer(schema: Schema, options: ClipboardSerializerOptions) {
  const nodes = wrapFunction(nodesFromSchema, options.nodesFromSchemaWrapper)(schema)
  const marks = wrapFunction(marksFromSchema, options.marksFromSchemaWrapper)(schema)
  return new CustomDOMSerializer(nodes, marks, options.serializeFragmentWrapper, options.serializeNodeWrapper)
}

const clipboardSerializerFacet = defineFacet<ClipboardSerializerOptions, PluginPayload>({
  reducer: (inputs: ClipboardSerializerOptions[]): PluginPayload => {
    const options: ClipboardSerializerOptions = {
      serializeFragmentWrapper: mergeWrappers(inputs.map((input) => input.serializeFragmentWrapper)),
      serializeNodeWrapper: mergeWrappers(inputs.map((input) => input.serializeNodeWrapper)),
      nodesFromSchemaWrapper: mergeWrappers(inputs.map((input) => input.nodesFromSchemaWrapper)),
      marksFromSchemaWrapper: mergeWrappers(inputs.map((input) => input.marksFromSchemaWrapper)),
    }

    return ({ schema }) => {
      const clipboardSerializer = createCustomDOMSerializer(schema, options)

      return [
        new ProseMirrorPlugin({
          key: new PluginKey('prosekit-clipboard-serializer'),
          props: { clipboardSerializer },
        }),
      ]
    }
  },
  singleton: true,
  parent: pluginFacet,
})

/**
 * @internal
 */
export function defineClipboardSerializer(options: ClipboardSerializerOptions): PlainExtension {
  return defineFacetPayload(clipboardSerializerFacet, [options]) as PlainExtension
}
