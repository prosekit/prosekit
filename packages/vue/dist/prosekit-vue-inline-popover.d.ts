import { CreateEmits } from "./create-emits-fip0zdCA.js";
import { DefineSetupFnComponent, HTMLAttributes } from "vue";
import { InlinePopoverEvents, InlinePopoverProps as InlinePopoverProps$1 } from "@prosekit/web/inline-popover";

//#region src/components/inline-popover/inline-popover.gen.d.ts
/**
* Props for the {@link InlinePopover} component.
*/
/**
* Props for the {@link InlinePopover} component.
*/
interface InlinePopoverProps extends Partial<InlinePopoverProps$1> {}
/**
* Emits for the {@link InlinePopover} component.
*/
interface InlinePopoverEmits extends CreateEmits<InlinePopoverEvents> {}
declare const InlinePopover: DefineSetupFnComponent<InlinePopoverProps & HTMLAttributes, InlinePopoverEmits>;

//#endregion
export { InlinePopover, InlinePopoverEmits, InlinePopoverProps };