import type { Component } from 'svelte'

import type { SvelteNodeViewProps } from '../../extensions/svelte-node-view'

export interface NodeViewWrapperProps {
  component?: Component<SvelteNodeViewProps>
}
