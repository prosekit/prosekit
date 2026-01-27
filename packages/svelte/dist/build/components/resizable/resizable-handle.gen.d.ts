import type { ResizableHandleElement, ResizableHandleProps as Props, ResizableHandleEvents as Events } from '@prosekit/web/resizable';
import type { SvelteComponent } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { CreateProps } from '../create-props';
/**
 * Props for the {@link ResizableHandle} component.
 */
export interface ResizableHandleProps extends Partial<CreateProps<Props, Events>> {
}
export declare const ResizableHandle: typeof SvelteComponent<ResizableHandleProps & HTMLAttributes<ResizableHandleElement>>;
//# sourceMappingURL=resizable-handle.gen.d.ts.map