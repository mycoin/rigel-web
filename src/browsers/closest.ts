const DOCUMENT_NODE_TYPE = 9

/**
 * A polyfill for Element.matches()
 */
if (typeof Element !== 'undefined' && !Element.prototype.matches) {
  const proto = Element.prototype as any
  proto.matches = proto.matchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector || proto.webkitMatchesSelector
}

/**
 * Finds the closest parent that matches a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @return {Function}
 */
function getClosest(element: HTMLElement, selector: string) {
  while (element && element.nodeType !== DOCUMENT_NODE_TYPE) {
    if (typeof element.matches === 'function' && element.matches(selector)) {
      return element
    }
    element = element.parentNode as any
  }
}

export default getClosest
