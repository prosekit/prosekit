import type { Component } from 'svelte'

import Comp from './mark-view-wrapper.svelte'
import type { MarkViewWrapperProps } from './props.ts'

export const MarkViewWrapper = Comp as Component<MarkViewWrapperProps>
