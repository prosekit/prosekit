import { createSignal, useEffect } from "@aria-ui/core";
import { getNearestOverflowAncestor } from "@zag-js/dom-query";

//#region src/utils/assign-styles.ts
/**
* A type-safe version of `Object.assign` for `element.style`.
*/
function assignStyles(element, styles) {
	Object.assign(element.style, styles);
}

//#endregion
//#region src/hooks/use-scrolling.ts
function useScrolling(host) {
	const scrolling = createSignal(false);
	useEffect(host, () => {
		const scrollableParent = getNearestOverflowAncestor(host);
		const handleScroll = () => {
			scrolling.set(true);
		};
		const handleMouseMove = () => {
			scrolling.set(false);
		};
		scrollableParent.addEventListener("scroll", handleScroll, { passive: true });
		window.addEventListener("mousemove", handleMouseMove, { passive: true });
		return () => {
			scrollableParent.removeEventListener("scroll", handleScroll);
			window.removeEventListener("mousemove", handleMouseMove);
		};
	});
	return scrolling;
}

//#endregion
export { assignStyles as n, useScrolling as t };
//# sourceMappingURL=use-scrolling-BjI3cuLt.js.map