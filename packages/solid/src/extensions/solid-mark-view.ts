import {
  defineMarkViewComponent,
  defineMarkViewFactory,
  type Extension,
} from '@prosekit/core'
import type { MarkViewConstructor } from '@prosekit/pm/view'
import type { CoreMarkViewUserOptions } from '@prosemirror-adapter/core'
import {
  useMarkViewContext,
  useMarkViewFactory,
  type MarkViewContextProps,
  type SolidMarkViewUserOptions,
} from '@prosemirror-adapter/solid'
import {
  createComponent,
  createMemo,
  type Accessor,
  type Component,
} from 'solid-js'

import { useExtension } from '../hooks/use-extension'

/**
 * @public
 */
export interface SolidMarkViewProps extends MarkViewContextProps {}

/**
 * @public
 */
export type SolidMarkViewComponent = Component<SolidMarkViewProps>

/**
 * Options for {@link defineSolidMarkView}.
 *
 * @public
 */
export interface SolidMarkViewOptions extends CoreMarkViewUserOptions<SolidMarkViewComponent> {
  /**
   * The name of the mark type.
   */
  name: string
}

function withMarkViewProps(
  component: SolidMarkViewComponent,
): Component<SolidMarkViewProps> {
  return function MarkViewPropsWrapper() {
    const props: Accessor<SolidMarkViewProps> = useMarkViewContext()

    return createComponent(component, props())
  }
}

/**
 * @internal
 */
export function consumeSolidMarkViews(): void {
  const markViewFactory = useMarkViewFactory()
  const extension = createMemo(
    () => defineSolidMarkViewFactory(markViewFactory),
    [markViewFactory],
  )

  useExtension(extension)
}

/**
 * Defines a mark view using a Solid component.
 *
 * @public
 */
export function defineSolidMarkView(options: SolidMarkViewOptions): Extension {
  const { name, component, ...userOptions } = options

  const args: SolidMarkViewUserOptions = {
    ...userOptions,
    component: withMarkViewProps(component),
  }

  return defineMarkViewComponent<SolidMarkViewUserOptions>({
    group: 'solid',
    name,
    args,
  })
}

function defineSolidMarkViewFactory(
  factory: (options: SolidMarkViewOptions) => MarkViewConstructor,
) {
  return defineMarkViewFactory<SolidMarkViewOptions>({
    group: 'solid',
    factory,
  })
}
