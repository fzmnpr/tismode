let windowObjectReference = null // global variable
export function openRequestedTab(url, windowName) {
  if (windowObjectReference === null || windowObjectReference.closed) {
    windowObjectReference = window.open(url, windowName)
  } else {
    windowObjectReference.focus()
  }
}
