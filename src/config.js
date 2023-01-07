/* eslint-disable no-undef */
let BASE_URL_API = 'https://backend.tismod.com'
let PRODUCTION_MODE = process.env.NODE_ENV === 'production'

// if (process.env.NODE_ENV === 'production') {
//   BASE_URL_API = window.location.origin
//   PRODUCTION_MODE = false
// } else {
//   BASE_URL_API = 'https://tismod.com'
// }

export { PRODUCTION_MODE, BASE_URL_API }
