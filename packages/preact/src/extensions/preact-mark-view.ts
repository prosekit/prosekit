import { defineMarkViewComponent, defineMarkViewFactory, type Extension } from '@prosekit/core'
import type { MarkViewConstructor } from '@prosekit/pm/view'
import type { CoreMarkViewUserOptions } from '@prosemirror-adapter/core'
import { useMarkViewContext, useMarkViewFactory, type MarkViewContext, type PreactMarkViewUserOptions } from '@prosemirror-adapter/preact'
import { h, type ComponentType, type FunctionComponent } from 'preact'
import { useMemo } from 'preact/hooks'

import { useExtension } from '../hooks/use-extension'

/**
 * @public
 */
export interface PreactMarkViewProps extends MarkViewContext {}

/**
 * @public
 */
export type PreactMarkViewComponent = ComponentType<PreactMarkViewProps>

/**
 * Options for {@link definePreactMarkView}.
 *
 * @public
 */
export interface PreactMarkViewOptions extends CoreMarkViewUserOptions<PreactMarkViewComponent> {
  /**
   * The name of the mark type.
   */
  name: string
}

function withMarkViewProps(component: PreactMarkViewComponent) {
  return function MarkViewPropsWrapper() {
    const props: PreactMarkViewProps = useMarkViewContext()
    return h(component, props)
  }
}

/**
 * @internal
 */
export const PreactMarkViewConsumer: FunctionComponent = () => {
  const markViewFactory = useMarkViewFactory()
  const extension = useMemo(
    () => definePreactMarkViewFactory(markViewFactory),
    [markViewFactory],
  )
  useExtension(extension)

  return null
}

/**
 * Defines a mark view using a Preact component.
 *
 * @public
 */
export function definePreactMarkView(options: PreactMarkViewOptions): Extension {
  const { name, component, ...userOptions } = options

  const args: PreactMarkViewUserOptions = {
    ...userOptions,
    component: withMarkViewProps(component),
  }

  return defineMarkViewComponent<PreactMarkViewUserOptions>({
    group: 'preact',
    name,
    args,
  })
}

function definePreactMarkViewFactory(
  factory: (options: PreactMarkViewUserOptions) => MarkViewConstructor,
) {
  return defineMarkViewFactory<PreactMarkViewUserOptions>({
    group: 'preact',
    factory,
  })
}
