interface ScrollEventResult {
  direction: 'up' | 'down'
  percent: number
  scrollTop: number
  scrollButtom: number
}

/**
 * 绑定监听事件
 *
 * @param {HTMLElement}   target [description]
 * @param {[type]}   type   [description]
 * @param {Function} fn     [description]
 */
const attachEvent = (target: any, type: string, fn: any) => {
  if (target.addEventListener) {
    target.addEventListener(type, fn)
  } else if (target.attachEvent) {
    target.attachEvent('on' + type, fn) // eslint-disable-line
  }
}

/**
 * 监听鼠标滚动事件，主要解决滚到顶部滚到底部这样的逻辑
 *
 * @param  {HTMLElement}   target    [description]
 * @param  {Function} callback       [description]
 */
const attachMousewheel = (target: HTMLElement, callback: Function) => {
  const results: ScrollEventResult = {
    direction: null,
    percent: 0,
    scrollTop: null,
    scrollButtom: null,
  }

  attachEvent(target, 'scroll', (event: Event) => {
    const height = target.clientHeight || target.offsetHeight
    const scrollTop = target.scrollTop
    const scrollButtom = target.scrollHeight - target.scrollTop - height
    const percent = (target.scrollTop / (target.scrollHeight - height)) * 100

    if (percent >= results.percent) {
      results.direction = 'down'
    } else {
      results.direction = 'up'
    }

    results.percent = percent
    results.scrollTop = scrollTop
    results.scrollButtom = scrollButtom

    callback(event, {
      ...results,
    })
  })
}

export default attachMousewheel
