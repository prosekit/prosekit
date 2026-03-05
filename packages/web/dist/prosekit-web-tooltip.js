import { defineCustomElement, registerCustomElement } from "@aria-ui/core";
import { tooltipContentEvents, tooltipContentProps, tooltipRootEvents, tooltipRootProps, tooltipTriggerEvents, tooltipTriggerProps, useTooltipContent, useTooltipRoot, useTooltipTrigger } from "@aria-ui/tooltip/elements";

//#region src/components/tooltip/tooltip-content/element.gen.ts
const TooltipContentElementBase = defineCustomElement({
	props: tooltipContentProps,
	events: tooltipContentEvents,
	setup: useTooltipContent
});
var TooltipContentElement = class extends TooltipContentElementBase {};
registerCustomElement("prosekit-tooltip-content", TooltipContentElement);

//#endregion
//#region src/components/tooltip/tooltip-root/element.gen.ts
const TooltipRootElementBase = defineCustomElement({
	props: tooltipRootProps,
	events: tooltipRootEvents,
	setup: useTooltipRoot
});
var TooltipRootElement = class extends TooltipRootElementBase {};
registerCustomElement("prosekit-tooltip-root", TooltipRootElement);

//#endregion
//#region src/components/tooltip/tooltip-trigger/element.gen.ts
const TooltipTriggerElementBase = defineCustomElement({
	props: tooltipTriggerProps,
	events: tooltipTriggerEvents,
	setup: useTooltipTrigger
});
var TooltipTriggerElement = class extends TooltipTriggerElementBase {};
registerCustomElement("prosekit-tooltip-trigger", TooltipTriggerElement);

//#endregion
export { TooltipContentElement, TooltipRootElement, TooltipTriggerElement, tooltipContentEvents, tooltipContentProps, tooltipRootEvents, tooltipRootProps, tooltipTriggerEvents, tooltipTriggerProps, useTooltipContent, useTooltipRoot, useTooltipTrigger };
//# sourceMappingURL=prosekit-web-tooltip.js.map