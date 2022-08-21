const loadCss = (url: string, callback?: Function) => {
  const link: any = document.createElement('link')
  link.rel = 'stylesheet'
  link.type = 'text/css'
  link.href = url
  link.onload = link.onreadstatechange = () => {
    if (typeof callback === 'function') {
      callback()
    }
  }
  document.getElementsByTagName('head')[0].appendChild(link)
}

export default loadCss
