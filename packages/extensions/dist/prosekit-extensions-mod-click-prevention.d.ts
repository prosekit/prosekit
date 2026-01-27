import { PlainExtension } from "@prosekit/core";

//#region src/mod-click-prevention/index.d.ts

/**
 * @internal
 */
type ModClickPreventionExtension = PlainExtension;
/**
 * By default, clicking a node while holding the mod key will select the node. This
 * extension disables that behavior.
 *
 * @public
 */
declare function defineModClickPrevention(): ModClickPreventionExtension;
//#endregion
export { ModClickPreventionExtension, defineModClickPrevention };
//# sourceMappingURL=prosekit-extensions-mod-click-prevention.d.ts.map