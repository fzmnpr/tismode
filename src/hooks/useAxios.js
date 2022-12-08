import React from 'react'
import axios from 'axios'
import { errorHandling } from 'utils/errorHandling'
import { BASE_URL_API } from '../config'
import { request } from 'utils/customAxiosInterceptor'

axios.defaults.baseURL = BASE_URL_API

const useAxios = ({ url, method, body = null, headers = null }) => {
  const [response, setResponse] = React.useState(null)
  const [error, setError] = React.useState('')
  const [loading, setLoading] = React.useState(true)
  React.useEffect(() => {
    const CancelToken = axios.CancelToken
    const source = CancelToken.source()
    request[method](url, JSON.parse(headers), JSON.parse(body), {
      cancelToken: source.token,
    })
      .then((res) => {
        setResponse(res.data)
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log('Request canceled', err.message)
          return
        }
        errorHandling(err)
        setError(err)
      })
      .finally(() => {
        setLoading(false)
      })
    return () => {
      source.cancel('Operation canceled by the user.')
    }
  }, [method, url, body, headers])

  return { response, error, loading }
}

export default useAxios
