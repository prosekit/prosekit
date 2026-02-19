import { defineMarkViewComponent, defineMarkViewFactory, type Extension } from '@prosekit/core'
import type { MarkViewConstructor } from '@prosekit/pm/view'
import type { CoreMarkViewUserOptions } from '@prosemirror-adapter/core'
import { useMarkViewContext, useMarkViewFactory, type MarkViewContext, type ReactMarkViewUserOptions } from '@prosemirror-adapter/react'
import { createElement, useMemo, type ComponentType, type FC } from 'react'

import { useExtension } from '../hooks/use-extension.ts'

/**
 * @public
 */
export interface ReactMarkViewProps extends MarkViewContext {}

/**
 * @public
 */
export type ReactMarkViewComponent = ComponentType<ReactMarkViewProps>

/**
 * Options for {@link defineReactMarkView}.
 *
 * @public
 */
export interface ReactMarkViewOptions extends CoreMarkViewUserOptions<ReactMarkViewComponent> {
  /**
   * The name of the mark type.
   */
  name: string
}

function withMarkViewProps(component: ReactMarkViewComponent) {
  return function MarkViewPropsWrapper() {
    const props: ReactMarkViewProps = useMarkViewContext()
    return createElement(component, props)
  }
}

/**
 * @internal
 */
export const ReactMarkViewConsumer: FC = () => {
  const markViewFactory = useMarkViewFactory()
  const extension = useMemo(
    () => defineReactMarkViewFactory(markViewFactory),
    [markViewFactory],
  )
  useExtension(extension)

  return null
}

/**
 * Defines a mark view using a React component.
 *
 * @public
 */
export function defineReactMarkView(options: ReactMarkViewOptions): Extension {
  const { name, component, ...userOptions } = options

  const args: ReactMarkViewUserOptions = {
    ...userOptions,
    component: withMarkViewProps(component),
  }

  return defineMarkViewComponent<ReactMarkViewUserOptions>({
    group: 'react',
    name,
    args,
  })
}

function defineReactMarkViewFactory(
  factory: (options: ReactMarkViewUserOptions) => MarkViewConstructor,
) {
  return defineMarkViewFactory<ReactMarkViewUserOptions>({
    group: 'react',
    factory,
  })
}
