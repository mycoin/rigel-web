const executeScrollTop = (top: number) => {
  try {
    window.scrollTo({
      top,
      behavior: 'smooth',
    })
  } catch (e: any) {
    if (e instanceof TypeError) {
      window.scroll(0, top)
    }
  }
}

const scrollInView = (element: HTMLElement, compensation?: any) => {
  if (!element || !element.tagName) {
    return
  }
  if (typeof element.getBoundingClientRect === 'function') {
    const { top } = element.getBoundingClientRect()
    const compensationNumber = parseInt(compensation, 10) || 0
    const targetTop = window.pageYOffset + top + compensationNumber || 0

    executeScrollTop(Math.max(targetTop, 0))
  } else if (typeof element.scrollIntoView === 'function') {
    element.scrollIntoView({
      behavior: 'smooth',
    })
  }
}

export default scrollInView
