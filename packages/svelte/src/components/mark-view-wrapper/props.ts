import type { Component } from 'svelte'

import type { SvelteMarkViewProps } from '../../extensions/svelte-mark-view.ts'

export interface MarkViewWrapperProps {
  component?: Component<SvelteMarkViewProps>
}
