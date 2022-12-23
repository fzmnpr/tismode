import axios from 'axios'
import { BASE_URL_API } from '../../config'
import { errorHandling } from 'utils/errorHandling'
import { readCookie } from 'utils/readCookie'
// eslint-disable-next-line no-undef
const isProduction = process.env.NODE_ENV === 'production'
const csrfToken = readCookie('csrftoken')
const client = (token = null) => {
  // eslint-disable-next-line no-undef
  const defaultOptions = {
    headers: {
      Authorization: token ? `Token ${token}` : '',
      'X-CSRFToken': isProduction ? csrfToken : null,
    },
  }
  const CancelToken = axios.CancelToken
  const source = CancelToken.source()
  const cancelOperation = {
    cancelToken: source.token,
  }
  const rootUrl = `${BASE_URL_API}/api/v1/`
  return {
    get: async (url, options = {}) => {
      try {
        return await axios.get(`${rootUrl}${url}`, { ...defaultOptions, ...options }, cancelOperation)
      } catch (error) {
        console.log(error)
        errorHandling(error)
      }
    },

    redirect: async (url, options = {}) => {
      try {
        return await axios.get(`${url}`, { ...defaultOptions, ...options }, cancelOperation)
      } catch (error) {
        console.log(error)
        errorHandling(error)
      }
    },
    post: (url, data, options = {}) =>
      axios.post(`${rootUrl}${url}`, data, { ...defaultOptions, ...options }, cancelOperation),
    put: (url, data, options = {}) =>
      axios.put(`${rootUrl}${url}`, data, { ...defaultOptions, ...options }, cancelOperation),
    delete: (url, options = {}) =>
      axios.delete(`${rootUrl}${url}`, { ...defaultOptions, ...options }, cancelOperation),
    patch: (url, data, options = {}) =>
      axios.patch(`${rootUrl}${url}`, data, { ...defaultOptions, ...options }, cancelOperation),
  }
}
// token comes from logging in as an admin to server and getting generated token
// eslint-disable-next-line no-undef
/** to log in to server using token in all requests */

export const request = client(process.env.REACT_APP_SECRET_KEY)
