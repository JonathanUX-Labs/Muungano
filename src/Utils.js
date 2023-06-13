import { setUser } from './features/reducers/session'
import { setUserToken } from './features/reducers/main'
import { setDevices } from './features/reducers/devices'


// Format comma separated number
export function fnum(n,d=2) {
    return parseFloat(n).toLocaleString(undefined, {minimumFractionDigits: d, maximumFractionDigits: d});
}
  
// Verify response from server
export function verifyResponse(data, dispatch) {
    if (data.success === true) return true
    if (data.error) {
      if (data.error.message) alert(data.error.message)
      if (data.error.code == -1) {
        clearUserData(dispatch);
      }
    }
    return false
}
  
export function clearUserData(dispatch) {
    dispatch(setUserToken(null));
    dispatch(setUser({}));
    dispatch(setDevices([]));
}
  
export function triggerResize() {
    let agent = window.navigator.userAgent.toLocaleLowerCase();
    if (agent.includes("msie") || agent.includes("trident")) {
      var resizeEvent = window.document.createEvent('UIEvents'); 
      resizeEvent.initUIEvent('resize', true, false, window, 0); 
      window.dispatchEvent(resizeEvent);
    } else window.dispatchEvent(new Event('resize'));
}
  
/**
 * Function to sort alphabetically an array of objects by some specific key.
 *
 * @param {String} property Key of the object to sort.
 */

export function dynamicSort(property) {
    var sortOrder = 1
  
    if (property[0] === '-') {
      sortOrder = -1
      property = property.slice(1)
    }
  
    var deep_value = function (obj, opath) {
      let path = opath.split('.')
      for (let i = 0; i < path.length; i++) {
        obj = obj[path[i]]
      }
      return obj
    }
  
    return function (a, b) {
      let ap = deep_value(a, property)
      let bp = deep_value(b, property)
      if (sortOrder == -1) return bp.localeCompare(ap)
      else return ap.localeCompare(bp)
    }
}