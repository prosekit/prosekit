import { defineMarkViewComponent, defineMarkViewFactory, definePlugin, type Extension } from '@prosekit/core'
import type { CoreMarkViewUserOptions } from '@prosemirror-adapter/core'
import {
  AbstractSvelteMarkView,
  buildSvelteMarkViewCreator,
  type MarkViewContext,
  type SvelteRendererResult,
} from '@prosemirror-adapter/svelte'
import { flushSync, mount, unmount, type Component } from 'svelte'

/**
 * @public
 */
export interface SvelteMarkViewProps extends MarkViewContext {}

/**
 * @public
 */
export type SvelteMarkViewComponent = Component<SvelteMarkViewProps>

/**
 * Options for {@link defineSvelteMarkView}.
 *
 * @public
 */
export interface SvelteMarkViewOptions extends CoreMarkViewUserOptions<SvelteMarkViewComponent> {
  /**
   * The name of the mark type.
   */
  name: string
}

const isServer = typeof window === 'undefined'

class ProseKitSvelteMarkView extends AbstractSvelteMarkView<SvelteMarkViewComponent> {
  render = (options: { context: Map<unknown, unknown> }) => {
    const UserComponent = this.component
    const props: SvelteMarkViewProps = this.context
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
export function defineSvelteMarkViewFactory(
  renderSvelteRenderer: SvelteRendererResult['renderSvelteRenderer'],
  removeSvelteRenderer: SvelteRendererResult['removeSvelteRenderer'],
  context: Map<any, any>,
): Extension {
  const factory = buildSvelteMarkViewCreator(renderSvelteRenderer, removeSvelteRenderer, ProseKitSvelteMarkView, context)
  return defineMarkViewFactory<SvelteMarkViewOptions>({
    group: 'svelte',
    factory,
  })
}

/**
 * Defines a mark view using a Svelte component.
 *
 * @public
 */
export function defineSvelteMarkView(
  options: SvelteMarkViewOptions,
): Extension {
  // Don't register mark views on the server
  if (isServer) {
    return definePlugin([])
  }

  return defineMarkViewComponent<SvelteMarkViewOptions>({
    group: 'svelte',
    name: options.name,
    args: options,
  })
}
