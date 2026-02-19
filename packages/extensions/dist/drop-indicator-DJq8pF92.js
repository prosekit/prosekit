import { defineFacet, defineFacetPayload, pluginFacet } from "@prosekit/core";
import { isNotNullish } from "@ocavue/utils";
import { createDropIndicatorPlugin } from "prosemirror-drop-indicator";

//#region src/drop-indicator/drop-indicator-facet.ts
/**
* @internal
*/
function defineDropIndicatorPayload(payload) {
	return defineFacetPayload(dropIndicatorFacet, [payload]);
}
const dropIndicatorFacet = defineFacet({
	parent: pluginFacet,
	singleton: true,
	reducer: (payloads) => {
		const showHandlers = payloads.map((p) => p.onShow).filter(isNotNullish);
		const hideHandlers = payloads.map((p) => p.onHide).filter(isNotNullish);
		const dragHandlers = payloads.map((p) => p.onDrag).filter(isNotNullish);
		const showHandler = (options) => {
			for (const fn of showHandlers) fn(options);
		};
		const hideHandler = () => {
			for (const fn of hideHandlers) fn();
		};
		const dragHandler = (options) => {
			for (const fn of dragHandlers) if (fn(options) === false) return false;
			return true;
		};
		if (showHandlers.length === 0) return [];
		return createDropIndicatorPlugin({
			onDrag: dragHandler,
			onShow: showHandler,
			onHide: hideHandler
		});
	}
});

//#endregion
//#region src/drop-indicator/drop-indicator.ts
/**
* Defines an extension that controls the behavior of the drop indicator.
*
* This extension itself doesn't draw the drop indicator, but it provides the
* necessary callbacks to do so. You probably don't want to use this extension
* directly, but rather use the `<DropIndicator>` component.
*
* You can add this extension multiple times. If any extension has `onDrag`
* callback defined, and it returns `false`, then the drop point will be
* discarded.
*
* @public
*/
function defineDropIndicator(options) {
	return defineDropIndicatorPayload(options ?? {});
}

//#endregion
export { defineDropIndicator as t };
//# sourceMappingURL=drop-indicator-DJq8pF92.js.map