/**
 * 请勿将其改为箭头函数
 *
 * @returns
 */
function getCurrentScript(): HTMLScriptElement {
  const descriptor = Object.getOwnPropertyDescriptor(document, 'currentScript')
  // for chrome
  if (!descriptor && 'currentScript' in document && document.currentScript) {
    return document.currentScript as HTMLScriptElement
  }

  // for other browsers with native support for currentScript
  if (descriptor && descriptor.get !== getCurrentScript && document.currentScript) {
    return document.currentScript as HTMLScriptElement
  }

  // IE 8-10 support script readyState
  // IE 11+ & Firefox support stack trace
  try {
    throw new Error()
  } catch (err) {
    // Find the second match for the "at" string to get file src url from stack.
    const ieStackRegExp = /.*at [^(]*\((.*):(.+):(.+)\)$/gi
    const ffStackRegExp = /@([^@]*):(\d+):(\d+)\s*$/gi
    const stackDetails = ieStackRegExp.exec(err.stack) || ffStackRegExp.exec(err.stack)
    const scriptLocation = (stackDetails && stackDetails[1]) || false
    const line: any = (stackDetails && stackDetails[2]) || false
    const currentLocation = document.location.href.replace(document.location.hash, '')
    let pageSource
    let inlineScriptSourceRegExp
    let inlineScriptSource
    const scripts = document.getElementsByTagName('script') // Live NodeList collection

    // try to find the matching external script first
    for (let i = 0; i < scripts.length; i++) {
      // If ready state is interactive, return the script tag
      // @ts-ignore
      if (scripts[i].readyState === 'interactive') {
        return scripts[i]
      }

      // If src matches, return the script tag
      if (scripts[i].src === scriptLocation) {
        return scripts[i]
      }
    }

    // if not found, the current script is likely inline
    if (scriptLocation === currentLocation) {
      pageSource = document.documentElement.outerHTML
      inlineScriptSourceRegExp = new RegExp('(?:[^\\n]+?\\n){0,' + (line - 2) + '}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*', 'i')
      inlineScriptSource = pageSource.replace(inlineScriptSourceRegExp, '$1').trim()

      // find the matching inline script
      for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].innerHTML && scripts[i].innerHTML.trim() === inlineScriptSource) {
          return scripts[i]
        }
      }
    }
    // If no match, return null
    return null
  }
}

export default getCurrentScript
