import "./editor-context-imq7MdJr.js";
import { createComponent } from "./create-component-BW93u26s.js";
import { popoverContentEvents, popoverContentProps, popoverRootEvents, popoverRootProps, popoverTriggerEvents, popoverTriggerProps } from "@prosekit/web/popover";

//#region src/components/popover/popover-content.gen.ts
const PopoverContent = createComponent("prosekit-popover-content", "PopoverContent", Object.keys(popoverContentProps), Object.keys(popoverContentEvents));

//#endregion
//#region src/components/popover/popover-root.gen.ts
const PopoverRoot = createComponent("prosekit-popover-root", "PopoverRoot", Object.keys(popoverRootProps), Object.keys(popoverRootEvents));

//#endregion
//#region src/components/popover/popover-trigger.gen.ts
const PopoverTrigger = createComponent("prosekit-popover-trigger", "PopoverTrigger", Object.keys(popoverTriggerProps), Object.keys(popoverTriggerEvents));

//#endregion
export { PopoverContent, PopoverRoot, PopoverTrigger };