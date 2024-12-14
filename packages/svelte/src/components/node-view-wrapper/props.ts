import type { Component } from 'svelte'

import type { SvelteNodeViewProps } from '../../extensions/types'

export interface NodeViewWrapperProps {
  component?: Component<SvelteNodeViewProps>
}
