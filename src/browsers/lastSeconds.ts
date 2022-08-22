const lastSeconds = () => {
  let value = 0
  let timer: any = null
  timer = setInterval(() => {
    if (!/hidden/i.test(document.visibilityState)) {
      value++
    }
  })
  return (stop?: boolean) => {
    if (stop === true) {
      clearInterval(timer)
    }
    return value
  }
}

export default lastSeconds
