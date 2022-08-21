import closestElement from './closest'
/**
 * Delegates event to a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @param {Boolean} useCapture
 * @return {Object}
 */
function _delegate(element: any, selector: any, type: any, callback: any, useCapture: boolean) {
  const listenerFn = listener.apply(this, arguments)

  element.addEventListener(type, listenerFn, useCapture)

  return {
    destroy() {
      element.removeEventListener(type, listenerFn, useCapture)
    },
  }
}

/**
 * Delegates event to a selector.
 *
 * @param {Element|String|Array} [elements]
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @param {Boolean} useCapture
 * @return {Object}
 */
function delegateEvent(elements: HTMLElement | string, selector: string, type: string, callback: Function, useCapture: boolean) {
  // Handle the regular Element usage
  if (elements && typeof (elements as any).addEventListener === 'function') {
    return _delegate.apply(null, arguments)
  }

  // Handle Element-less usage, it defaults to global delegation
  if (typeof type === 'function') {
    // Use `document` as the first parameter, then apply arguments
    // This is a short way to .unshift `arguments` without running into deoptimizations
    return _delegate.bind(null, document).apply(null, arguments)
  }

  // Handle Selector-based usage
  if (typeof elements === 'string') {
    elements = document.querySelectorAll(elements) as any
  }

  // Handle Array-like based usage
  return Array.prototype.map.call(elements, function (element: any) {
    return _delegate(element, selector, type, callback, useCapture)
  })
}

/**
 * Finds closest match and invokes callback.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @return {Function}
 */
function listener(element: any, selector: any, type: any, callback: any) {
  return function (e: any) {
    e.delegateTarget = closestElement(e.target, selector)

    if (e.delegateTarget) {
      callback.call(element, e, e.delegateTarget)
    }
  }
}

export default delegateEvent
