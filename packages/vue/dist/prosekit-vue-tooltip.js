import { t as createComponent } from "./create-component-BREKWlWW.js";
import { tooltipContentEvents, tooltipContentProps, tooltipRootEvents, tooltipRootProps, tooltipTriggerEvents, tooltipTriggerProps } from "@prosekit/web/tooltip";

//#region src/components/tooltip/tooltip-content.gen.ts
const TooltipContent = createComponent("prosekit-tooltip-content", "TooltipContent", Object.keys(tooltipContentProps), Object.keys(tooltipContentEvents));

//#endregion
//#region src/components/tooltip/tooltip-root.gen.ts
const TooltipRoot = createComponent("prosekit-tooltip-root", "TooltipRoot", Object.keys(tooltipRootProps), Object.keys(tooltipRootEvents));

//#endregion
//#region src/components/tooltip/tooltip-trigger.gen.ts
const TooltipTrigger = createComponent("prosekit-tooltip-trigger", "TooltipTrigger", Object.keys(tooltipTriggerProps), Object.keys(tooltipTriggerEvents));

//#endregion
export { TooltipContent, TooltipRoot, TooltipTrigger };
//# sourceMappingURL=prosekit-vue-tooltip.js.map