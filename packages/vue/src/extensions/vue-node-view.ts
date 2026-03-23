import { defineNodeViewComponent, defineNodeViewFactory, type Extension } from '@prosekit/core'
import type { CoreNodeViewUserOptions } from '@prosemirror-adapter/core'
import {
  AbstractVueNodeView,
  buildVueNodeViewCreator,
  type NodeViewContext,
  type VueRendererComponent,
  type VueRendererResult,
} from '@prosemirror-adapter/vue'
import { defineComponent, h, markRaw, Teleport, type DefineComponent } from 'vue'

/**
 * @public
 */
export interface VueNodeViewProps extends NodeViewContext {}

/**
 * @public
 */
export type VueNodeViewComponent = DefineComponent<VueNodeViewProps, any, any>

/**
 * Options for {@link defineVueNodeView}.
 *
 * @public
 */
export interface VueNodeViewOptions extends CoreNodeViewUserOptions<VueNodeViewComponent> {
  /**
   * The name of the node type.
   */
  name: string
}

class ProseKitVueNodeView extends AbstractVueNodeView<VueNodeViewComponent> {
  render = (): VueRendererComponent => {
    const UserComponent = this.component
    const render = () => {
      const props = this.context
      return h(Teleport, { key: this.key, to: this.dom }, [h(UserComponent, props)])
    }
    const RendererComponent: VueRendererComponent = defineComponent({
      name: 'ProsemirrorNodeView',
      setup: () => {
        return render
      },
    })
    return markRaw(RendererComponent)
  }
}

/**
 * @internal
 */
export function defineVueNodeViewFactory(
  renderVueRenderer: VueRendererResult['renderVueRenderer'],
  removeVueRenderer: VueRendererResult['removeVueRenderer'],
): Extension {
  const factory = buildVueNodeViewCreator(renderVueRenderer, removeVueRenderer, ProseKitVueNodeView)
  return defineNodeViewFactory<VueNodeViewOptions>({
    group: 'vue',
    factory,
  })
}

/**
 * Defines a node view using a Vue component.
 *
 * @public
 */
export function defineVueNodeView(options: VueNodeViewOptions): Extension {
  return defineNodeViewComponent<VueNodeViewOptions>({
    group: 'vue',
    name: options.name,
    args: options,
  })
}
