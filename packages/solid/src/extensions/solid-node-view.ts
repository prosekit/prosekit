import {
  defineNodeViewComponent,
  defineNodeViewFactory,
  type Extension,
} from '@prosekit/core'
import type { NodeViewConstructor } from '@prosekit/pm/view'
import type { CoreNodeViewUserOptions } from '@prosemirror-adapter/core'
import {
  useNodeViewContext,
  useNodeViewFactory,
  type NodeViewContextProps,
  type SolidNodeViewUserOptions,
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
export interface SolidNodeViewProps extends NodeViewContextProps {}

/**
 * @public
 */
export type SolidNodeViewComponent = Component<SolidNodeViewProps>

/**
 * Options for {@link defineSolidNodeView}.
 *
 * @public
 */
export interface SolidNodeViewOptions extends CoreNodeViewUserOptions<SolidNodeViewComponent> {
  /**
   * The name of the node type.
   */
  name: string
}

function withNodeViewProps(
  component: SolidNodeViewComponent,
): Component<SolidNodeViewProps> {
  return function NodeViewPropsWrapper() {
    const context: Accessor<SolidNodeViewProps> = useNodeViewContext()
    const props: SolidNodeViewProps = {
      get contentRef() {
        return context().contentRef
      },
      get view() {
        return context().view
      },
      get getPos() {
        return context().getPos
      },
      get setAttrs() {
        return context().setAttrs
      },
      get node() {
        return context().node
      },
      get selected() {
        return context().selected
      },
      get decorations() {
        return context().decorations
      },
      get innerDecorations() {
        return context().innerDecorations
      },
    }
    return createComponent(component, props)
  }
}

/**
 * @internal
 */
export function consumeSolidNodeViews(): void {
  const nodeViewFactory = useNodeViewFactory()
  const extension = createMemo(
    () => defineSolidNodeViewFactory(nodeViewFactory),
    [nodeViewFactory],
  )

  useExtension(extension)
}

/**
 * Defines a node view using a Solid component.
 *
 * @public
 */
export function defineSolidNodeView(options: SolidNodeViewOptions): Extension {
  const { name, component, ...userOptions } = options

  const args: SolidNodeViewUserOptions = {
    ...userOptions,
    component: withNodeViewProps(component),
  }

  return defineNodeViewComponent<SolidNodeViewUserOptions>({
    group: 'solid',
    name,
    args,
  })
}

function defineSolidNodeViewFactory(
  factory: (options: SolidNodeViewOptions) => NodeViewConstructor,
) {
  return defineNodeViewFactory<SolidNodeViewOptions>({
    group: 'solid',
    factory,
  })
}
