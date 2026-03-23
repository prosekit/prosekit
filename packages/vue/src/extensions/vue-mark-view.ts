import { defineMarkViewComponent, defineMarkViewFactory, type Extension } from '@prosekit/core'
import type { CoreMarkViewUserOptions } from '@prosemirror-adapter/core'
import {
  AbstractVueMarkView,
  buildVueMarkViewCreator,
  type MarkViewContext,
  type VueRendererComponent,
  type VueRendererResult,
} from '@prosemirror-adapter/vue'
import { defineComponent, h, markRaw, Teleport, type DefineComponent } from 'vue'

/**
 * @public
 */
export interface VueMarkViewProps extends MarkViewContext {}

/**
 * @public
 */
export type VueMarkViewComponent = DefineComponent<VueMarkViewProps, any, any>

/**
 * Options for {@link defineVueMarkView}.
 *
 * @public
 */
export interface VueMarkViewOptions extends CoreMarkViewUserOptions<VueMarkViewComponent> {
  /**
   * The name of the mark type.
   */
  name: string
}

class ProseKitVueMarkView extends AbstractVueMarkView<VueMarkViewComponent> {
  render = (): VueRendererComponent => {
    const UserComponent = this.component
    const render = () => {
      const props = this.context
      return h(Teleport, { key: this.key, to: this.dom }, [h(UserComponent, props)])
    }
    const RendererComponent: VueRendererComponent = defineComponent({
      name: 'ProsemirrorMarkView',
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
export function defineVueMarkViewFactory(
  renderVueRenderer: VueRendererResult['renderVueRenderer'],
  removeVueRenderer: VueRendererResult['removeVueRenderer'],
): Extension {
  const factory = buildVueMarkViewCreator(renderVueRenderer, removeVueRenderer, ProseKitVueMarkView)
  return defineMarkViewFactory<VueMarkViewOptions>({
    group: 'vue',
    factory,
  })
}

/**
 * Defines a mark view using a Vue component.
 *
 * @public
 */
export function defineVueMarkView(options: VueMarkViewOptions): Extension {
  return defineMarkViewComponent<VueMarkViewOptions>({
    group: 'vue',
    name: options.name,
    args: options,
  })
}
