const normalizeValue = (value: any) => {
  if (value instanceof Blob || value instanceof FormData) {
    return value
  } else if (value && typeof value === 'object') {
    return JSON.stringify(value)
  } else {
    return value
  }
}

const sendBeacon = (targetUrl: string, content?: string | Blob | FormData | any) => {
  const value = normalizeValue(content)

  if (typeof navigator.sendBeacon === 'function') {
    navigator.sendBeacon(targetUrl, value)
  } else {
    const eventType = window.event && window.event.type
    const xhr = 'XMLHttpRequest' in window ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP')

    // 如果是窗口离开则同步打点
    xhr.open('POST', targetUrl, !/unload/.test(eventType))
    xhr.withCredentials = true
    xhr.setRequestHeader('Accept', '*/*')

    if (value && typeof value === 'string') {
      xhr.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8')
      xhr.responseType = 'text'
    } else if (value instanceof Blob && value.type) {
      xhr.setRequestHeader('Content-Type', value.type)
    }
    try {
      xhr.send(value)
    } catch (error) {
      return false
    }
    return true
  }
}
export default sendBeacon
