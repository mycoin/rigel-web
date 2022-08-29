const lastSeconds = () => {
  let value = 0
  let timer: any = null
  timer = setInterval(() => {
    if (!/hidden/i.test(document.visibilityState)) {
      value++
    }
  }, 1000)
  return (stop?: boolean) => {
    if (stop === true) {
      clearInterval(timer)
    }
    return value
  }
}

export default lastSeconds
