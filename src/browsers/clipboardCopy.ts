const copyExecCommand = (text: string) => {
  const target = document.body
  const element = document.createElement('textarea')
  const previouslyFocusedElement = document.activeElement as any

  element.value = text

  // Prevent keyboard from showing on mobile
  element.setAttribute('readonly', '')

  element.style.contain = 'strict'
  element.style.position = 'absolute'
  element.style.left = '-9999px'
  element.style.fontSize = '12pt'

  const selection = document.getSelection()
  const originalRange = selection.rangeCount > 0 && selection.getRangeAt(0)

  target.append(element)
  element.select()

  // Explicit selection workaround for iOS
  element.selectionStart = 0
  element.selectionEnd = text.length

  let isSuccess = false
  try {
    isSuccess = document.execCommand('copy')
  } catch {}

  element.remove()

  if (originalRange) {
    selection.removeAllRanges()
    selection.addRange(originalRange)
  }

  // Get the focus back on the previously focused element, if any
  if (previouslyFocusedElement) {
    previouslyFocusedElement.focus()
  }
  return isSuccess
}

const clipboardCopy = (text: string, callback?: (error: Error) => void) => {
  const { clipboard } = navigator
  const doCallback = (error: Error) => {
    if (typeof callback === 'function') {
      callback(error)
    }
  }
  if (clipboard && typeof clipboard.writeText === 'function') {
    clipboard
      .writeText(text)
      .then(() => {
        doCallback(null)
      })
      .catch((e) => {
        doCallback(e)
      })
  } else if (copyExecCommand(text)) {
    doCallback(null)
  } else {
    doCallback(new Error('execCommand `copy` failed'))
  }
}

export default clipboardCopy
