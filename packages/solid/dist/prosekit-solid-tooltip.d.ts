import { PropsWithElement } from "./types.d-BCb-LSbS.js";
import { CreateProps } from "./create-props.d-Cg5AzcmF.js";
import { Component } from "solid-js";
import { TooltipContentElement, TooltipContentEvents, TooltipContentProps as TooltipContentProps$1, TooltipRootElement, TooltipRootEvents, TooltipRootProps as TooltipRootProps$1, TooltipTriggerElement, TooltipTriggerEvents, TooltipTriggerProps as TooltipTriggerProps$1 } from "@prosekit/web/tooltip";

//#region src/components/tooltip/tooltip-content.gen.d.ts
/**
* Props for the {@link TooltipContent} component.
*/
/**
* Props for the {@link TooltipContent} component.
*/
interface TooltipContentProps extends Partial<CreateProps<TooltipContentProps$1, TooltipContentEvents>> {}
declare const TooltipContent: Component<PropsWithElement<TooltipContentProps, TooltipContentElement>>;

//#endregion
//#region src/components/tooltip/tooltip-root.gen.d.ts
/**
* Props for the {@link TooltipRoot} component.
*/
interface TooltipRootProps extends Partial<CreateProps<TooltipRootProps$1, TooltipRootEvents>> {}
declare const TooltipRoot: Component<PropsWithElement<TooltipRootProps, TooltipRootElement>>;

//#endregion
//#region src/components/tooltip/tooltip-trigger.gen.d.ts
/**
* Props for the {@link TooltipTrigger} component.
*/
interface TooltipTriggerProps extends Partial<CreateProps<TooltipTriggerProps$1, TooltipTriggerEvents>> {}
declare const TooltipTrigger: Component<PropsWithElement<TooltipTriggerProps, TooltipTriggerElement>>;

//#endregion
export { TooltipContent, TooltipContentProps, TooltipRoot, TooltipRootProps, TooltipTrigger, TooltipTriggerProps };