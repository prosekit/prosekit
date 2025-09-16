import { getDocument, getId } from "@ocavue/utils";

//#region src/utils/clone-element.ts
/**
* Creates a deep clone of an Element, including all computed styles so that
* it looks almost exactly the same as the original element.
*/
function deepCloneElement(element, important = false) {
	const clonedElement = element.cloneNode(true);
	const style = deepCopyStyles(element, clonedElement, important);
	return [clonedElement, style];
}
/**
* Creates a clone of an Element, including all computed styles so that
* it looks similar enough to the original element.
*/
function cloneElement(element, important = false) {
	const clonedElement = element.cloneNode();
	const style = copyStyles(element, clonedElement, important);
	return [clonedElement, style];
}
function deepCopyStyles(source, target, important) {
	const sources = [source];
	const targets = [target];
	const styles = [];
	while (sources.length > 0 && sources.length === targets.length) {
		const source$1 = sources.pop();
		const target$1 = targets.pop();
		if (!source$1 || !target$1) break;
		const style = copyStyles(source$1, target$1, important);
		if (style) styles.push(style);
		sources.push(...source$1.children);
		targets.push(...target$1.children);
	}
	return styles.join("\n");
}
function copyStyles(source, target, important) {
	if (!source || !target) return "";
	const view = source.ownerDocument?.defaultView;
	if (!view) return "";
	const sourceStyle = view.getComputedStyle(source);
	const targetStyle = target.style;
	if (!sourceStyle || !targetStyle) return "";
	for (const key of sourceStyle) targetStyle.setProperty(key, sourceStyle.getPropertyValue(key), important ? "important" : sourceStyle.getPropertyPriority(key) || "");
	const styles = [];
	for (const pseudoSelector of [":before", ":after"]) {
		const sourcePseudoStyle = view.getComputedStyle(source, pseudoSelector);
		const targetPseudoStyle = view.getComputedStyle(target, pseudoSelector);
		if (!sourcePseudoStyle) continue;
		const content = sourcePseudoStyle.getPropertyValue("content");
		if (!(content && content !== "none" && content !== "normal")) continue;
		const cssProps = [];
		for (const property of sourcePseudoStyle) {
			const sourceValue = sourcePseudoStyle.getPropertyValue(property);
			const sourcePriority = sourcePseudoStyle.getPropertyPriority(property);
			const targetValue = targetPseudoStyle.getPropertyValue(property);
			const targetPriority = targetPseudoStyle.getPropertyPriority(property);
			if (sourceValue !== targetValue || sourcePriority !== targetPriority) cssProps.push(`${property}: ${sourceValue}${sourcePriority ? " !important" : ""};`);
		}
		const uniqueClassName = `clone-pseudo-element-${getId()}`;
		target.classList.add(uniqueClassName);
		styles.push(`.${uniqueClassName}${pseudoSelector} { ${cssProps.join(" ")} }`);
	}
	return styles.join("\n");
}

//#endregion
//#region src/utils/inject-style.ts
function injectStyle(container, styleText) {
	if (!styleText) return;
	const style = getDocument(container).createElement("style");
	style.textContent = styleText;
	container.appendChild(style);
}

//#endregion
export { cloneElement, deepCloneElement, injectStyle };
//# sourceMappingURL=inject-style-BJQNFufI.js.map