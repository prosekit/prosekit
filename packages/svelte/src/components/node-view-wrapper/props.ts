import type { Component } from 'svelte'

import type { SvelteNodeViewProps } from '../../node-view/types'

export interface NodeViewWrapperProps {
  component?: Component<SvelteNodeViewProps>
}
