import { defineNodeViewComponent, defineNodeViewFactory, definePlugin, type Extension } from '@prosekit/core'
import type { CoreNodeViewUserOptions } from '@prosemirror-adapter/core'
import {
  AbstractSvelteNodeView,
  buildSvelteNodeViewCreator,
  type NodeViewContext,
  type SvelteRendererResult,
} from '@prosemirror-adapter/svelte'
import { flushSync, mount, unmount, type Component } from 'svelte'

/**
 * @public
 */
export interface SvelteNodeViewProps extends NodeViewContext {}

/**
 * @public
 */
export type SvelteNodeViewComponent = Component<SvelteNodeViewProps>

/**
 * Options for {@link defineSvelteNodeView}.
 *
 * @public
 */
export interface SvelteNodeViewOptions extends CoreNodeViewUserOptions<SvelteNodeViewComponent> {
  /**
   * The name of the node type.
   */
  name: string
}

const isServer = typeof window === 'undefined'

class ProseKitSvelteNodeView extends AbstractSvelteNodeView<SvelteNodeViewComponent> {
  render = (options: { context: Map<unknown, unknown> }) => {
    const UserComponent = this.component
    const props: SvelteNodeViewProps = this.context
    const component = mount(UserComponent, {
      target: this.dom,
      context: options.context,
      props,
    })
    flushSync()
    return () => unmount(component)
  }
}

/**
 * @internal
 */
export function defineSvelteNodeViewFactory(
  renderSvelteRenderer: SvelteRendererResult['renderSvelteRenderer'],
  removeSvelteRenderer: SvelteRendererResult['removeSvelteRenderer'],
  context: Map<any, any>,
): Extension {
  const factory = buildSvelteNodeViewCreator(renderSvelteRenderer, removeSvelteRenderer, ProseKitSvelteNodeView, context)
  return defineNodeViewFactory<SvelteNodeViewOptions>({
    group: 'svelte',
    factory,
  })
}

/**
 * Defines a node view using a Svelte component.
 *
 * @public
 */
export function defineSvelteNodeView(
  options: SvelteNodeViewOptions,
): Extension {
  // Don't register node views on the server
  if (isServer) {
    return definePlugin([])
  }

  return defineNodeViewComponent<SvelteNodeViewOptions>({
    group: 'svelte',
    name: options.name,
    args: options,
  })
}
