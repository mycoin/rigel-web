const getElementPath = (element: Element | any): string => {
  if (element.id && typeof element.id === 'string') {
    return '//*[@id="' + element.id + '"]'
  }
  if (element === document.body) {
    return '/html/body'
  }
  let ix = 1
  const { childNodes } = element.parentNode || {}
  for (let i = 0, l = (childNodes || []).length; i < l; i++) {
    const elementNode = childNodes[i]
    if (elementNode === element) {
      return getElementPath(element.parentNode) + '/' + element.tagName.toLowerCase() + '[' + ix + ']'
    } else if (elementNode.nodeType === 1 && elementNode.tagName === element.tagName) {
      ix++
    }
  }
  return ''
}

export default getElementPath
