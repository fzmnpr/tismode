import { toast } from 'react-toastify'
import { toastConfig } from './toastConfig'

export const errorHandling = (response) => {
  console.log(response.response.data, 'resp')
  console.log(response.response.data.detail === 'Not found')
  if (response.response.data.detail === 'Not found.') {
    window.location.href = '/not-found'

    return
  }
  if (response.message === 'Network Error') {
    toast.error('لطفا اتصال اینترنت خود را بررسی کنید', toastConfig)
    return
  }
  toast.error(response.message, toastConfig)
  return response
}
