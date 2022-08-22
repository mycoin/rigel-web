/**
 * Tests whether a DOM element matches a selector. This polyfills the native
 * Element.prototype.matches method across browsers.
 * @param {Element} element The DOM element to test.
 * @param {string} selector The CSS selector to test element against.
 * @return {boolean} True if the selector matches.
 */
const elementMatches = (element: Element, selector: string) => {
  if (!element || !element.tagName) {
    return false
  }

  const nativeMatches = Element.prototype.matches
    || (Element.prototype as any).matchesSelector
    || (Element.prototype as any).webkitMatchesSelector
    || (Element.prototype as any).mozMatchesSelector
    || (Element.prototype as any).msMatchesSelector
    || (Element.prototype as any).oMatchesSelector

  if (typeof nativeMatches === 'function') {
    return nativeMatches.call(element, selector)
  }
  const nodes = element.parentNode.querySelectorAll(selector)
  for (let i = 0, node; (node = nodes[i]); i++) {
    if (node === element) {
      return true
    }
  }
  return false
}

export default elementMatches
