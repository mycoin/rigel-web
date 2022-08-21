const lastSeconds = () => {
  const context = {
    value: 0,
    timer: setInterval(() => {
      if (!/hidden/i.test(document.visibilityState)) {
        context.value++
      }
    }, 1000),
  }
  return (stop?: boolean) => {
    if (stop === true) {
      clearInterval(context.timer)
    }
    return context.value
  }
}

export default lastSeconds
