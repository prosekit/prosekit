import type { Component } from 'svelte'

import Comp from './node-view-wrapper.svelte'
import type { NodeViewWrapperProps } from './props.ts'

export const NodeViewWrapper = Comp as Component<NodeViewWrapperProps>
