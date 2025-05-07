import "./editor-context-DIj_hnDx.js";
import { createComponent } from "./create-component-DhWsGDHc.js";
import { tooltipContentEvents, tooltipContentProps, tooltipRootEvents, tooltipRootProps, tooltipTriggerEvents, tooltipTriggerProps } from "@prosekit/web/tooltip";

//#region src/components/tooltip/tooltip-content.gen.ts
const TooltipContent = createComponent("prosekit-tooltip-content", Object.keys(tooltipContentProps), Object.keys(tooltipContentEvents));

//#endregion
//#region src/components/tooltip/tooltip-root.gen.ts
const TooltipRoot = createComponent("prosekit-tooltip-root", Object.keys(tooltipRootProps), Object.keys(tooltipRootEvents));

//#endregion
//#region src/components/tooltip/tooltip-trigger.gen.ts
const TooltipTrigger = createComponent("prosekit-tooltip-trigger", Object.keys(tooltipTriggerProps), Object.keys(tooltipTriggerEvents));

//#endregion
export { TooltipContent, TooltipRoot, TooltipTrigger };