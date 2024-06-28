/**
 * Add a class to a DOM node.
 */
export function addClass(dom: Node, className: string) {
  if (!dom) {
    return
  }

  if (isHTMLElement(dom)) {
    dom.classList.add(className)
  } else {
    dom.childNodes.forEach((child) => addClass(child, className))
  }
}

function isHTMLElement(dom: Node): dom is HTMLElement {
  return dom.nodeType === Node.ELEMENT_NODE
}
