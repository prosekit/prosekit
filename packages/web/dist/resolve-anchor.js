/**
* Resolves an {@link AnchorReference} to a Floating UI reference element, or
* `undefined` when no anchor is available.
*/
function resolveAnchor(anchor) {
	if (!anchor) return;
	if (typeof anchor === "function") return anchor() ?? void 0;
	return anchor;
}
export { resolveAnchor as t };

//# sourceMappingURL=resolve-anchor.js.map