import type { Component } from 'svelte'

import type { SvelteNodeViewProps } from '../../extensions/svelte-node-view.ts'

export interface NodeViewWrapperProps {
  component?: Component<SvelteNodeViewProps>
}
