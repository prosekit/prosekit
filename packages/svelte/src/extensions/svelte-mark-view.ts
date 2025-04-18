import {
  defineMarkViewComponent,
  defineMarkViewFactory,
  definePlugin,
  type Extension,
} from '@prosekit/core'
import type { MarkViewConstructor } from '@prosekit/pm/view'
import type { CoreMarkViewUserOptions } from '@prosemirror-adapter/core'
import type {
  MarkViewContext,
  SvelteMarkViewUserOptions,
} from '@prosemirror-adapter/svelte'
import type { Component } from 'svelte'

import { MarkViewWrapper } from '../components/mark-view-wrapper'

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

  const { name, component, ...userOptions } = options

  const args: SvelteMarkViewUserOptions = {
    ...userOptions,
    component: wrapComponent(component),
  }

  return defineMarkViewComponent<SvelteMarkViewUserOptions>({
    group: 'svelte',
    name,
    args,
  })
}

function wrapComponent(
  component: SvelteMarkViewComponent,
): Component<any, any> {
  // `MarkViewWrapper` is an object during SSR
  if (!MarkViewWrapper || typeof MarkViewWrapper !== 'function') {
    return component
  }

  const MarkViewPropsWrapper: Component = (internals, props) => {
    return MarkViewWrapper(internals, { ...props, component })
  }

  return MarkViewPropsWrapper
}

export function defineSvelteMarkViewFactory(
  factory: (options: SvelteMarkViewUserOptions) => MarkViewConstructor,
): Extension {
  return defineMarkViewFactory<SvelteMarkViewUserOptions>({
    group: 'svelte',
    factory,
  })
}
