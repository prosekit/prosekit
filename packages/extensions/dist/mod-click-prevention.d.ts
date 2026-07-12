import { PlainExtension } from "@prosekit/core";
/**
 * @internal
 */
type ModClickPreventionExtension = PlainExtension;
/**
 * By default, clicking a node while holding the mod key will select the node. This
 * extension disables that behavior.
 */
declare function defineModClickPrevention(): ModClickPreventionExtension;
export { ModClickPreventionExtension, defineModClickPrevention };
//# sourceMappingURL=mod-click-prevention.d.ts.map