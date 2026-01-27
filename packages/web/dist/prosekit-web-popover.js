import { defineCustomElement, registerCustomElement } from "@aria-ui/core";
import { popoverContentEvents, popoverContentProps, popoverRootEvents, popoverRootProps, popoverTriggerEvents, popoverTriggerProps, usePopoverContent, usePopoverRoot, usePopoverTrigger } from "@aria-ui/popover/elements";

//#region src/components/popover/popover-content/element.gen.ts
const PopoverContentElementBase = defineCustomElement({
	props: popoverContentProps,
	events: popoverContentEvents,
	setup: usePopoverContent
});
var PopoverContentElement = class extends PopoverContentElementBase {};
registerCustomElement("prosekit-popover-content", PopoverContentElement);

//#endregion
//#region src/components/popover/popover-root/element.gen.ts
const PopoverRootElementBase = defineCustomElement({
	props: popoverRootProps,
	events: popoverRootEvents,
	setup: usePopoverRoot
});
var PopoverRootElement = class extends PopoverRootElementBase {};
registerCustomElement("prosekit-popover-root", PopoverRootElement);

//#endregion
//#region src/components/popover/popover-trigger/element.gen.ts
const PopoverTriggerElementBase = defineCustomElement({
	props: popoverTriggerProps,
	events: popoverTriggerEvents,
	setup: usePopoverTrigger
});
var PopoverTriggerElement = class extends PopoverTriggerElementBase {};
registerCustomElement("prosekit-popover-trigger", PopoverTriggerElement);

//#endregion
export { PopoverContentElement, PopoverRootElement, PopoverTriggerElement, popoverContentEvents, popoverContentProps, popoverRootEvents, popoverRootProps, popoverTriggerEvents, popoverTriggerProps, usePopoverContent, usePopoverRoot, usePopoverTrigger };
//# sourceMappingURL=prosekit-web-popover.js.map