import { utils } from 'rigel-base'
import { StringifiableRecord } from 'query-string'

/**
 * add params towards history.replaceState
 *
 * @param {StringifiableRecord} params
 * @returns
 */
const replaceStateWith = (params: StringifiableRecord) => {
  if (typeof history.replaceState === 'function') {
    const stateObject = history.state
    const nextUrl = utils.toUrl(location.href, params)

    history.replaceState(stateObject, document.title, nextUrl)
    return true
  } else {
    return false
  }
}

export default replaceStateWith
