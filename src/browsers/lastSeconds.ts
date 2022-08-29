const lastSeconds = (withFocus?: boolean) => {
  let value = 0
  let timer: any = null
  timer = setInterval(() => {
    if (withFocus && document.hasFocus() === false) {
      return
    } else if (document.hidden) {
      return
    }
    value++
  }, 1000)
  return (stop?: boolean) => {
    if (stop === true) {
      clearInterval(timer)
    }
    return value
  }
}

export default lastSeconds
