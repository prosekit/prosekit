import { PropsWithElement } from "./types.d-BCb-LSbS.js";
import { CreateProps } from "./create-props.d-Cg5AzcmF.js";
import { Component } from "solid-js";
import { PopoverContentElement, PopoverContentEvents, PopoverContentProps as PopoverContentProps$1, PopoverRootElement, PopoverRootEvents, PopoverRootProps as PopoverRootProps$1, PopoverTriggerElement, PopoverTriggerEvents, PopoverTriggerProps as PopoverTriggerProps$1 } from "@prosekit/web/popover";

//#region src/components/popover/popover-content.gen.d.ts
/**
* Props for the {@link PopoverContent} component.
*/
/**
* Props for the {@link PopoverContent} component.
*/
interface PopoverContentProps extends Partial<CreateProps<PopoverContentProps$1, PopoverContentEvents>> {}
declare const PopoverContent: Component<PropsWithElement<PopoverContentProps, PopoverContentElement>>;

//#endregion
//#region src/components/popover/popover-root.gen.d.ts
/**
* Props for the {@link PopoverRoot} component.
*/
interface PopoverRootProps extends Partial<CreateProps<PopoverRootProps$1, PopoverRootEvents>> {}
declare const PopoverRoot: Component<PropsWithElement<PopoverRootProps, PopoverRootElement>>;

//#endregion
//#region src/components/popover/popover-trigger.gen.d.ts
/**
* Props for the {@link PopoverTrigger} component.
*/
interface PopoverTriggerProps extends Partial<CreateProps<PopoverTriggerProps$1, PopoverTriggerEvents>> {}
declare const PopoverTrigger: Component<PropsWithElement<PopoverTriggerProps, PopoverTriggerElement>>;

//#endregion
export { PopoverContent, PopoverContentProps, PopoverRoot, PopoverRootProps, PopoverTrigger, PopoverTriggerProps };