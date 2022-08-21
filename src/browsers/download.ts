const defaultGcTimeout = 1000 * 60 // 60 seconds

/**
 * Save a file from Blob or object url
 * We achieve this by using the HTML5 download attr of <a>.
 * Check https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#Browser_compatibility
 * for browser compatibility.
 *
 * @param data
 * @param filename
 * @param gcTimeout - When to remove the data uri
 */
const download = (data: string | Blob, filename: string, gcTimeout: number) => {
  const isUrl = typeof data === 'string' && /^https?/i.test(data)
  const a = document.createElement('a')
  a.target = '_blank'

  if (isUrl) {
    a.href = data
  } else if (data) {
    a.href = URL.createObjectURL(data instanceof Blob ? data : new Blob([data]))
  } else {
    throw new TypeError('download data invalid.')
  }

  if (filename && typeof filename === 'string') {
    a.download = filename
  }

  // Push the download operation on the next tick
  requestAnimationFrame(() => {
    a.dispatchEvent(new MouseEvent('click'))
  })

  // Revoke the object url later in time
  // when the download of the file is completed (or so we assume)
  if (!isUrl) {
    setTimeout(() => {
      URL.revokeObjectURL(a.href)
    }, gcTimeout || defaultGcTimeout)
  }
}

export default download
